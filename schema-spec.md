# 더 골프 여행 플랫폼 — DB Schema Spec
Last updated: 2026-04-28 (CEO Review 반영)

---

## 핵심 결정사항

| 결정 | 이유 |
|------|------|
| `supplier_id` Phase 1부터 포함 | Phase 2 에이전트 마켓플레이스 전환 시 재설계 방지 |
| 여권번호 수집 안 함 | PIPA 법적 리스크 제거, 불필요한 민감정보 최소화 |
| 연락처 정보만 수집 | 예약요청 후 담당자 연락에 필요한 최소 정보만 |
| 결제 없음 (Phase 1) | 예약 요청 → 담당자 오프라인 처리 |

---

## Entities

### User (사용자)

```sql
CREATE TABLE users (
  user_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE,
  name          VARCHAR(100) NOT NULL,
  phone         VARCHAR(20),               -- 담당자 연락용 핵심 필드
  -- oauth_provider 제거 → user_oauth_tokens 테이블로 이동
  oauth_id      VARCHAR(255),
  role          VARCHAR(20) NOT NULL DEFAULT 'customer'
                CHECK (role IN ('customer','staff','admin')),  -- 권한 구분
  handicap_index DECIMAL(4,1),             -- AI 맞춤 추천 핵심 지표 (선택 입력)
  avg_score     INT,                       -- 평균 타수 (선택 입력)
  deleted_at    TIMESTAMPTZ,               -- soft delete (PIPA 탈퇴 요청 대응)
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- 여권번호 수집 안 함 (2026-04-28 결정)
-- 민감정보 PIPA 리스크 제거
-- 해외여행 수속 관련 정보는 담당자가 오프라인으로 처리
-- role: customer(일반), staff(담당자), admin(관리자)
```

### UserOAuthToken (OAuth 토큰 분리 관리)

```sql
CREATE TABLE user_oauth_tokens (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  provider      VARCHAR(50) NOT NULL,     -- 'kakao' | 'naver' | 'google' | 'apple'
  access_token  TEXT NOT NULL,            -- 암호화 저장
  refresh_token TEXT,                     -- 암호화 저장
  expires_at    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, provider)
);

-- User 테이블에 OAuthToken 직접 저장 금지
-- 토큰은 만료/갱신되므로 별도 테이블로 관리
```

### Supplier (공급자 — Phase 2 마켓플레이스 대비)

```sql
CREATE TABLE suppliers (
  supplier_id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(255) NOT NULL,
  type          VARCHAR(50) NOT NULL,     -- 'internal' | 'agent' | 'direct'
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  status        VARCHAR(50) DEFAULT 'active',
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Phase 1: type='internal' 레코드 1개 (비공개 밴드 공급원)
-- Phase 2: 에이전트들이 각자 supplier로 온보딩
```

### Product (상품 — 골프 패키지)

```sql
CREATE TABLE products (
  product_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id   UUID REFERENCES suppliers(supplier_id),  -- Phase 1: internal supplier
  course_id     UUID REFERENCES venues(course_id),
  title         VARCHAR(500) NOT NULL,
  description   TEXT,
  price         DECIMAL(12,2),
  currency      VARCHAR(10) DEFAULT 'KRW',
  destination_id UUID REFERENCES destinations(destination_id),  -- 정규화 FK
  includes_flight  BOOLEAN NOT NULL DEFAULT FALSE,  -- 인덱스 필터용
  includes_hotel   BOOLEAN NOT NULL DEFAULT FALSE,
  includes_caddie  BOOLEAN NOT NULL DEFAULT FALSE,
  inclusions_extra JSONB,                -- 기타 부가서비스 (픽업, 조식 등)
  nights        INT,                      -- 숙박 일수
  rounds        INT,                      -- 라운드 수
  departure_city VARCHAR(100),            -- 'seoul' | 'busan' | ...
  status        VARCHAR(50) DEFAULT 'DRAFT',  -- 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  source_url    TEXT,                     -- 밴드 원본 게시글 URL (관리용)
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- supplier_id: Phase 1에서 NULL 허용, Phase 2에서 NOT NULL로 변경
-- status: 관리자 Draft/Review 워크플로우 통제
```

### PriceHistory (가격 변동 이력)

```sql
CREATE TABLE price_history (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES products(product_id),
  old_price     DECIMAL(12,2),
  new_price     DECIMAL(12,2),
  changed_by    UUID REFERENCES users(user_id),  -- 변경한 관리자
  changed_at    TIMESTAMPTZ DEFAULT now()
);

-- 가격 분쟁 시 근거 자료, 다이나믹 프라이싱 분석용
```

### Venue (골프장/코스)

```sql
CREATE TABLE venues (
  course_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(255) NOT NULL,
  name_en       VARCHAR(255),
  country       VARCHAR(100),
  region        VARCHAR(100),
  holes         INT DEFAULT 18,
  par           INT,
  yardage       INT,
  course_rating DECIMAL(4,1),            -- USGA 코스 레이팅
  slope_rating  INT,                     -- USGA 슬로프 레이팅
  description   TEXT,
  latitude      DECIMAL(10,7),
  longitude     DECIMAL(10,7),
  created_at    TIMESTAMPTZ DEFAULT now()
);
```

### Booking (예약 요청)

```sql
CREATE TABLE bookings (
  booking_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(user_id),
  product_id    UUID NOT NULL REFERENCES products(product_id),
  group_id      UUID REFERENCES booking_groups(group_id),  -- 동행 매칭 연동
  status        VARCHAR(50) NOT NULL DEFAULT 'REQUESTED'
                CHECK (status IN ('REQUESTED','ASSIGNED','CONFIRMED','COMPLETED','CANCELLED')),
  -- 상태: REQUESTED → ASSIGNED → CONFIRMED → COMPLETED | CANCELLED
  traveler_count INT NOT NULL DEFAULT 1,
  special_requests TEXT,
  assigned_staff_id UUID REFERENCES users(user_id),        -- 담당 직원
  assigned_at   TIMESTAMPTZ,
  confirmed_at  TIMESTAMPTZ,
  check_in_date  DATE NOT NULL,
  check_out_date DATE NOT NULL,           -- 예약 시점 일정 명시 저장 (상품 수정 영향 없음)
  idempotency_key VARCHAR(255) UNIQUE,    -- 중복 예약 방지 (클라이언트 생성 UUID)
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- idempotency_key: 더블클릭 방지용, 클라이언트가 생성하여 전송
-- group_id: 동행 매칭으로 함께 예약하는 경우 동일 group_id 공유
```

### BookingGroup (동행 매칭 그룹 예약)

```sql
CREATE TABLE booking_groups (
  group_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID REFERENCES products(product_id),
  travel_date   DATE NOT NULL,
  max_members   INT DEFAULT 4,
  status        VARCHAR(50) NOT NULL DEFAULT 'OPEN'
                CHECK (status IN ('OPEN','FULL','CLOSED')),
  current_members INT NOT NULL DEFAULT 0,  -- 앱 레이어가 업데이트, max_members와 비교
  created_by    UUID REFERENCES users(user_id),
  created_at    TIMESTAMPTZ DEFAULT now()
);
-- current_members >= max_members 시 OPEN → FULL 전환 (앱 레이어 책임)
```

### MatchRequest (동행 매칭 신청)

```sql
CREATE TABLE match_requests (
  request_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id      UUID NOT NULL REFERENCES booking_groups(group_id),
  requester_id  UUID NOT NULL REFERENCES users(user_id),
  status        VARCHAR(50) DEFAULT 'PENDING',  -- 'PENDING' | 'ACCEPTED' | 'REJECTED'
  message       TEXT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  responded_at  TIMESTAMPTZ
);
```

### Review (리뷰 — 확인된 예약자만)

```sql
CREATE TABLE reviews (
  review_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id    UUID NOT NULL REFERENCES bookings(booking_id),
  user_id       UUID NOT NULL REFERENCES users(user_id),
  product_id    UUID NOT NULL REFERENCES products(product_id),
  course_id     UUID REFERENCES venues(course_id),
  rating        INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title         VARCHAR(255),
  body          TEXT,
  photos        TEXT[],                   -- Object Storage URL 배열
  is_verified   BOOLEAN NOT NULL DEFAULT FALSE,  -- 예약 COMPLETED 시 TRUE로 업데이트
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX reviews_booking_unique ON reviews(booking_id);
-- 예약 1건당 리뷰 1개
```

### ScoreCard (스코어카드)

```sql
CREATE TABLE scorecards (
  scorecard_id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(user_id),
  booking_id    UUID REFERENCES bookings(booking_id),  -- NULL 허용 (자유 기록)
  course_id     UUID REFERENCES venues(course_id),
  play_date     DATE NOT NULL,
  total_score   INT,
  handicap_differential DECIMAL(4,1),    -- 이 라운드의 핸디캡 디퍼런셜
  holes         JSONB,                   -- [{"hole":1,"par":4,"score":5}, ...]
  weather       VARCHAR(100),
  share_token   VARCHAR(255) UNIQUE,     -- SNS 공유용 퍼블릭 토큰
  created_at    TIMESTAMPTZ DEFAULT now()
);
```

### PreDepartureNotification (출발 전 브리핑 스케줄)

```sql
CREATE TABLE pre_departure_notifications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id    UUID NOT NULL REFERENCES bookings(booking_id),
  type          VARCHAR(50) NOT NULL,    -- 'D-7' | 'D-1'
  status        VARCHAR(50) DEFAULT 'PENDING',  -- 'PENDING' | 'SENT' | 'FAILED'
  scheduled_at  TIMESTAMPTZ NOT NULL,
  sent_at       TIMESTAMPTZ,
  retry_count   INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);
```

### Destination (목적지 정규화)

```sql
CREATE TABLE destinations (
  destination_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code           VARCHAR(50) UNIQUE NOT NULL,   -- 'thailand'
  name_ko        VARCHAR(100) NOT NULL,          -- '태국'
  name_en        VARCHAR(100),                   -- 'Thailand'
  country        VARCHAR(100),
  region         VARCHAR(100)                    -- 'southeast_asia'
);
-- products.destination VARCHAR → destination_id UUID FK로 변경
-- AI가 자연어 입력을 destination.code로 정규화
```

### CancellationPolicy (취소 규정)

```sql
CREATE TABLE cancellation_policies (
  policy_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES products(product_id),
  days_before   INT NOT NULL,      -- 출발 며칠 전까지 적용
  penalty_pct   INT NOT NULL       -- 수수료 % (0 = 무료 취소)
                CHECK (penalty_pct BETWEEN 0 AND 100),
  description   TEXT,
  created_at    TIMESTAMPTZ DEFAULT now()
);
-- 예: days_before=7, penalty_pct=0 → 7일 전까지 무료 취소
-- 예: days_before=3, penalty_pct=50 → 3일 전까지 50% 환불
```

### ExperienceEvent (AI 학습용 이벤트 로그)

```sql
CREATE TABLE experience_events (
  event_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(user_id),
  session_id    VARCHAR(255),
  event_type    VARCHAR(100) NOT NULL,   -- 'search' | 'click' | 'booking' | 'ai_chat'
  payload       JSONB,                   -- 이벤트별 상세 데이터
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- 시계열 데이터 → 추후 TimescaleDB로 전환 고려
-- AI 추천 개선용 원료 데이터
```

---

## ERD 관계 요약

```
Supplier ──< Product >── Venue
                │
                ▼
           Booking >── BookingGroup >── MatchRequest
               │
               ├──▶ Review
               ├──▶ ScoreCard
               └──▶ PreDepartureNotification

User ──< Booking
User ──< UserOAuthToken
User ──< Review
User ──< ScoreCard
User ──< MatchRequest
```

---

## 인덱스 전략

```sql
-- 상품 검색 (destination_id FK 사용, 기존 destination VARCHAR 인덱스 제거)
CREATE INDEX idx_products_destination ON products(destination_id, status);
CREATE INDEX idx_products_supplier    ON products(supplier_id);
CREATE INDEX idx_products_published   ON products(status, published_at DESC);

-- 예약 조회
CREATE INDEX idx_bookings_user  ON bookings(user_id, status);
CREATE INDEX idx_bookings_staff ON bookings(assigned_staff_id, status);

-- 리뷰 조회
CREATE INDEX idx_reviews_product ON reviews(product_id, rating DESC);
CREATE INDEX idx_reviews_course  ON reviews(course_id, rating DESC);

-- 골프장 검색
CREATE INDEX idx_venues_country ON venues(country, region);

-- 스코어카드
CREATE INDEX idx_scorecards_user ON scorecards(user_id, play_date DESC);

-- 동행 매칭 (부분 인덱스 — Prisma @@index로 표현 불가, migration SQL에 직접 추가)
CREATE INDEX idx_booking_groups_open ON booking_groups(status, travel_date)
  WHERE status = 'OPEN';

-- NOTE: 위 부분 인덱스는 prisma/migrations 초기 SQL에 직접 추가 필요
-- prisma migrate 자동 생성 후 migration.sql 파일 끝에 수동 추가
```

---

## Migration 순서 (Phase 1 → Phase 2 전환)

```sql
-- Phase 2 전환 시 supplier_id NOT NULL 제약 추가
-- (Phase 1에서는 nullable, 기존 데이터는 'internal' supplier로 backfill)
UPDATE products SET supplier_id = (
  SELECT supplier_id FROM suppliers WHERE type = 'internal' LIMIT 1
) WHERE supplier_id IS NULL;

ALTER TABLE products ALTER COLUMN supplier_id SET NOT NULL;
```
