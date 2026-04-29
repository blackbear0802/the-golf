# TODOS — 더 골프 여행 플랫폼

Last updated: 2026-04-28

---

## P1 — 구현 전 필수

- [ ] **[LEGAL] 한국 PIPA 법무 검토**
  - 여권번호 미수집으로 리스크 대폭 감소했지만, 전화번호·이메일 수집 동의 절차 필요
  - 개인정보 처리방침 및 수집·이용 동의서 작성 (법무사 검토)
  - 예약 확정 후 담당자가 오프라인으로 받는 추가 정보 처리 절차 수립

- [ ] **[INFRA] 네이버 밴드 API 상업적 사용 허가 확인**
  - `band_api_연동가이드_v1.0.docx` 보유하나 상업적 서비스 사용 허가 여부 미확인
  - Band 담당자 직접 문의 또는 파트너 계약 체결
  - 불가 시 공급자와 직접 데이터 공유 계약 대안 검토

- [x] **[DB] Phase 1 시드 데이터 준비 — 완료**
  - destinations 5개국, supplier 1개, venues 15개, products 8개, cancel policies 32개
  - 실행: `npm run db:seed` (멱등 — 재실행 안전)

---

## P1 — 구현 중 추가

- [ ] **[FEATURE] 예약요청 담당자 배정 어드민 CRM** _(Phase 1.5)_
  - 예약 요청 목록, 배정되지 않은 요청 강조
  - 담당자 배정 버튼 → 배정 직원 선택 (role=staff 유저만)
  - 48시간 미배정 알림 (슬랙 또는 카카오 내부 채널)
  - Depends on: bookings 테이블, staff role 구현 완료

- [ ] **[FEATURE] 예약 취소 플로우**
  - 취소 규정(`cancellation_policies`) 기반 환불 안내
  - Phase 1에서는 "담당자에게 문의" 안내로 처리 가능

- [ ] **[FEATURE] 공유 스코어카드 퍼블릭 페이지**
  - `/scorecard/[shareToken]` — 로그인 없이 접근 가능
  - `share_token`은 서버에서 UUID로 생성, 클라이언트 제공 금지

---

## P2 — Phase 2 전환 시

- [ ] **[INFRA] 항공/호텔 GDS 파트너십 사전 협의 시작**
  - Amadeus 또는 Sabre API 계약 (수백만원 보증금 + 수개월 소요)
  - Phase 1 론칭 후 바로 시작 권장 (병렬 진행)
  - Dynamic Packaging 기능 설계 선행 필요

- [ ] **[DB] supplier_id NOT NULL 마이그레이션**
  - Phase 2 진입 전 `products.supplier_id` NOT NULL로 변경
  - 기존 데이터 internal supplier로 backfill 먼저
  - `schema-spec.md`에 migration SQL 포함됨

- [ ] **[FEATURE] 에이전트 셀프 온보딩 어드민**
  - 에이전트가 직접 상품 등록/수정/삭제
  - Multi-tenancy: 에이전트는 자신의 상품만 수정 가능
  - 기획서 Admin 화면 설계 참고

- [ ] **[INFRA] 인앱 결제 연동**
  - 카카오페이 또는 토스페이먼츠 PG 연동
  - Phase 1 예약요청 모델에서 Phase 2 직접결제로 전환
  - Booking 스키마에 `payment_id`, `paid_at`, `amount_paid` 추가 필요

---

## P3 — Phase 3 이후

- [ ] **[FEATURE] 카카오톡 채널 봇**
  - 앱/웹 접속 없이 카카오톡에서 자연어 검색
  - Phase 1 앱/웹 트래픽 확보 후 진행

- [ ] **[INFRA] TimescaleDB 전환 (experience_events)**
  - PostgreSQL `experience_events` 파티션 또는 TimescaleDB로 전환
  - 1M 건 도달 시 검토

- [ ] **[FEATURE] 다국어 지원 (글로벌 확장)**
  - 영어, 중국어, 일본어 최소 지원
  - `destinations.name_en` 등 이미 스키마에 준비됨

---

## P1 — 디자인 리뷰 추가 (2026-04-28)

- [ ] **[UX] 예약 완료 후 대기 화면 상세 설계**
  - 요청 완료 후 담당자 연락까지 사용자가 아무 정보도 없으면 불안 + 이탈
  - 포함 요소: 예약번호, 예상 연락 시간(24h), 담당자 연락처, 카카오 채널 추가 유도
  - Depends on: 예약 요청 API 완성 후

- [x] **[DESIGN] 홈화면 시각적 방향 탐색 — 완료**
  - Variant D (AI챗 + 특가 강조) 확정, 웹 버전 포함
  - 파일: `~/.gstack/projects/TheGolf/designs/home-20260428/variant-D-web.html`

- [ ] **[DESIGN] 스코어카드 SNS 공유 카드 스펙**
  - OG 이미지 형식 1200×630px
  - 포함: 코스명 + 국가 + 총타수 + 핸디캡 + THE GOLF 로고
  - 바이럴 채널 — 브랜딩 노출 효과 큼
  - Depends on: 스코어카드 기록 기능 구현 후

## 해결된 항목 (참고)

- [x] `supplier_id` Phase 1부터 포함 — schema-spec.md 반영 완료
- [x] 여권번호 미수집 결정 — PIPA 리스크 제거
- [x] `is_verified DEFAULT FALSE` 버그 수정
- [x] `users.role` 컬럼 추가 (customer/staff/admin)
- [x] `check_in_date + check_out_date` 분리
- [x] `includes_flight/hotel/caddie` boolean 컬럼 분리
- [x] `CancellationPolicy` 테이블 추가
- [x] `Destination` 정규화 테이블 추가
- [x] Status 컬럼 CHECK constraint 추가
