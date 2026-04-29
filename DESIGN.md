# 더 골프 여행 플랫폼 — Design System
Created: 2026-04-28 (plan-design-review 반영)

---

## 브랜드 포지셔닝

**프리미엄 + 접근성.** 골프 여행의 고급스러움을 유지하면서 40-50대 골퍼가 쉽게 쓸 수 있어야 한다.
참고 레퍼런스: 에어비앤비 (신뢰 구조), GolfNow (전문성), 카카오페이 (한국 간편함).

---

## Color Tokens

```css
:root {
  /* Primary */
  --color-primary:       #163028;  /* 딥 포레스트 그린 — 골프 코스 */
  --color-primary-hover: #204a3c;
  --color-primary-deep:  #0d1f19;

  /* Accent */
  --color-accent:        #c9a227;  /* 골드 — 프리미엄 포인트 */
  --color-accent-hover:  #b08d1f;
  --color-accent-soft:   #e4c46a;

  /* Surface */
  --color-surface:       #ffffff;
  --color-background:    #f8f6f1;  /* 아이보리 — 고급 인쇄물 */
  --color-paper:         #faf8f3;

  /* Gray Scale */
  --color-gray-50:  #f6f5f1;
  --color-gray-100: #eae8e0;
  --color-gray-200: #d9d6cc;
  --color-gray-500: #6b7280;
  --color-gray-700: #3f4a44;
  --color-gray-900: #111613;

  /* Semantic */
  --color-error:   #dc2626;
  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-info:    #2563eb;

  /* Destination */
  --color-thailand:    #1a6b3a;
  --color-vietnam:     #c9152e;
  --color-philippines: #0038a8;
  --color-malaysia:    #cc0001;
}
```

**규칙:**
- 배경에 단일 평면 색상 금지 — 그라디언트, 이미지, 미세 패턴 사용
- 색상만으로 상태 표현 금지 — 아이콘/텍스트 병행
- 보라/인디고 계열 완전 배제 (AI 슬롭 패턴)

---

## Typography

```css
:root {
  --font-display: 'Noto Serif KR', serif;  /* 헤딩 — 프리미엄 */
  --font-body:    'Pretendard', sans-serif; /* 본문 — 가독성 */
  --font-en:      'Inter', sans-serif;     /* 숫자/영문 (가격, 핸디캡) */

  /* Scale */
  --text-xs:   12px / 1.4;  /* 메타 정보, 캡션 */
  --text-sm:   14px / 1.5;  /* 보조 텍스트 */
  --text-base: 16px / 1.6;  /* 본문 (최소값 — 40-50대 타겟) */
  --text-lg:   18px / 1.5;  /* 카드 제목 */
  --text-xl:   24px / 1.3;  /* 섹션 헤딩 */
  --text-2xl:  32px / 1.2;  /* 히어로 헤딩 */
  --text-3xl:  40px / 1.1;  /* 랜딩 헤딩 */
}
```

**규칙:**
- `system-ui`, `-apple-system`, `Arial` 기본 스택 금지
- 본문 최소 16px (40-50대 가독성)
- 가격/핸디캡 수치는 반드시 `--font-en` (Inter) 사용
- 헤딩은 Noto Serif KR, 인터페이스 텍스트는 Pretendard

---

## Spacing (8px 기준)

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
}
```

---

## Border Radius

```css
:root {
  --radius-sm:   4px;    /* 인풋, 뱃지, 태그 */
  --radius-md:   8px;    /* 카드, 버튼 */
  --radius-lg:   12px;   /* 모달, 바텀시트 */
  --radius-xl:   16px;   /* 히어로 카드 */
  --radius-pill: 9999px; /* 칩, Quick Reply */
}
```

**규칙:** 모든 요소에 동일한 큰 radius 금지 (AI 슬롭 패턴). 요소별 의도적 차별화.

---

## Shadow

```css
:root {
  --shadow-card:        0 1px 2px rgba(22,48,40,.06), 0 2px 8px rgba(22,48,40,.04);
  --shadow-card-hover:  0 8px 28px rgba(22,48,40,.14), 0 2px 6px rgba(22,48,40,.06);
  --shadow-float:       0 10px 28px rgba(201,162,39,.35), 0 4px 10px rgba(0,0,0,.12);
  --shadow-modal:       0 20px 60px rgba(0,0,0,.2);
}
```

---

## Component Library

**Base:** shadcn/ui (Radix UI primitives) + Tailwind CSS v3

```
원자 컴포넌트 (Atoms)
├── Button: primary/secondary/ghost/destructive, 크기 sm/md/lg
├── Input: label 항상 외부, placeholder 보조 역할만
├── Badge: 국가 태그, 상태 뱃지
├── Avatar: 사용자/코스 이미지, 폴백 이니셜
└── Rating: 별점 1-5 (색상 + 아이콘 병행)

분자 컴포넌트 (Molecules)
├── ProductCard: 이미지 + 제목 + 가격 + 포함사항 + 매치율
├── ChatBubble: user/ai 구분, 스트리밍 지원
├── QuickReplyChip: pill 형태, touch target 44px
├── MatchGroupCard: 코스 + 날짜 + 남은 자리 + 참가자 프로필
└── ScoreHoleInput: 홀별 타수 입력 (터치 최적화)

유기체 (Organisms)
├── ChatInterface: 대화 히스토리 + 입력 + QuickReply
├── ProductComparison: 3개 카드 비교 레이아웃
├── BookingStatusCard: 예약 상태 + 담당자 연락처
└── ScoreCardShare: SNS 공유용 시각적 카드

```

---

## Navigation Structure

```
하단 탭 (모바일 기본 네비게이션)
┌─────────────────────────────────────┐
│ 🏠홈  🔍탐색  📋예약  👥매칭  👤나  │
└─────────────────────────────────────┘
높이: 56px + safe-area-inset-bottom

PC 웹: 상단 네비게이션 바
- 로고 좌측 + 주요 메뉴 + 로그인/프로필 우측
```

---

## AI 응답 패턴

### 즉시검색 모드 (Instant Search)

트리거: 목적지/상품 키워드 입력 후 엔터 또는 검색 버튼 탭

**타이핑 인디케이터 (Typing Indicator)**

```
┌─────────────────────────────────────┐
│  ●  ●  ●                            │  ← AI 말풍선 내부
└─────────────────────────────────────┘
   ↑ bounce 애니메이션, 완료 시 결과 카드로 교체
```

```css
/* 점 3개 bounce */
.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
  animation: typing-bounce 1.2s ease-in-out infinite;
}
.typing-dot:nth-child(2) { animation-delay: 0.16s; }
.typing-dot:nth-child(3) { animation-delay: 0.32s; }

@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0);    opacity: .4; }
  30%            { transform: translateY(-6px); opacity: 1; }
}

/* 결과 카드 진입 */
.search-result-enter {
  animation: fade-slide-up 200ms ease-out forwards;
}
@keyframes fade-slide-up {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

| 단계 | 상태 | UI |
|------|------|-----|
| 요청 중 | 타이핑 인디케이터 노출 | ChatBubble (ai) 내부 dot 3개 |
| 결과 도착 | 인디케이터 → 결과 카드 교체 | fade-slide-up 200ms |
| 오류 | 인디케이터 사라짐 + 에러 메시지 | "잠시 후 다시 시도해주세요" + 직접 문의 버튼 |

---

### 대화형 모드 (Conversational)

트리거: 자연어 질문 ("태국 3박 어때요?", "예산 150만원인데 추천해줘")

**스트리밍 텍스트 (Streaming Text)**

```
┌─────────────────────────────────────────┐
│ 태국 치앙마이는 그린 피가 합리적이고│    │  ← 토큰 단위 실시간 렌더링
│                                         │
└─────────────────────────────────────────┘
                                       ↑ 커서 blink
```

```css
/* 스트리밍 커서 */
.streaming-cursor {
  display: inline-block;
  width: 1px;
  height: 1em;
  background: var(--color-primary);
  margin-left: 1px;
  vertical-align: text-bottom;
  animation: cursor-blink 1s step-end infinite;
}
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* 스트리밍 완료 후 QuickReply 진입 */
.quick-reply-enter {
  animation: fade-in 240ms ease-out forwards;
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

| 단계 | 상태 | UI |
|------|------|-----|
| 스트리밍 중 | 토큰 즉시 렌더링 + 커서 blink | 스크롤 자동 하단 고정 |
| 스트리밍 중 | QuickReply 칩 숨김 | 완료 전까지 hidden |
| 완료 | 커서 사라짐 + QuickReply 등장 | fade-in 240ms |
| 오류 (중단) | 커서 사라짐 + 부분 텍스트 유지 | "응답이 중단됐어요. 다시 물어봐주세요" |

**스크롤 동작:**
- 스트리밍 중: `scrollIntoView({ behavior: 'smooth', block: 'end' })` 토큰마다 호출
- 사용자가 직접 스크롤 올리면 자동 스크롤 일시 중단 (스크롤 위치 감지)
- 스트리밍 완료 후 사용자가 다시 하단으로 내리면 자동 스크롤 재개

---

### 모드 판별 로직

```
입력 분류
├── 키워드형  → 즉시검색 (타이핑 인디케이터)
│   예) "태국", "3박4일 필리핀", "100만원 이하"
└── 문장형   → 대화형 (스트리밍 텍스트)
    예) "태국 어때요?", "예산이 부족한데 어디가 좋을까요?"
```

서버에서 `X-Response-Mode: search | chat` 헤더로 전달, 클라이언트는 헤더 수신 시점에 렌더 모드 전환.

---

## Interaction States (전체 화면 매트릭스)

| 화면 | 로딩 | 빈 상태 | 에러 | 성공 |
|------|------|---------|------|------|
| 홈/AI채팅 | 타이핑 인디케이터 | "이번 주말 어디 가세요? 저 도와드릴게요!" | "잠시 후 다시 시도해주세요" + 직접 문의 버튼 | 결과 카드 3개 |
| 상품 목록 | 스켈레톤 카드 3개 | "조건 바꿔볼까요?" + 대안 제안 | 재시도 버튼 | 카드 목록 |
| 상품 상세 | 이미지 스켈레톤 + 텍스트 스켈레톤 | N/A | 404 페이지 | 전체 표시 |
| 예약 요청 | 버튼 로딩 스피너 | N/A | "이미 요청된 예약" 메시지 | 요청 완료 + SLA 안내 |
| 동행 매칭 | 스켈레톤 | "먼저 팀 만들기" CTA | 재시도 버튼 | 그룹 목록 |
| 리뷰 작성 | 제출 중 스피너 | N/A | 저장 실패 + 재시도 | 감사 메시지 + 포인트 |
| 스코어카드 | 저장 중 | "첫 라운드를 기록해보세요!" | 부분 저장 안내 | 완료 + 공유 버튼 |

---

## Mobile Specifications

**기준 뷰포트:** 375px (iPhone SE3) — 최소 보장
**최적 뷰포트:** 390px (iPhone 15) — 주요 테스트 기준

```
터치 타겟 최소값: 44×44px (40-50대 타겟 → 가능하면 48px)
예약 버튼 높이:  56px (중요 CTA는 더 크게)
하단 탭 높이:   56px + safe-area
헤더 높이:      56px
폼 필드 높이:   48px
아이콘 최소:    24×24px
```

**키보드 올라올 때:**
- 채팅 입력창: `100dvh` 사용, 키보드 위로 자동 이동
- 예약 폼: 활성 필드가 항상 가시 영역 유지

---

## Accessibility Requirements

| 항목 | 기준 |
|------|------|
| 본문 대비 | 최소 4.5:1 (WCAG AA) |
| 헤딩/큰 텍스트 | 최소 3:1 |
| 포커스 링 | 2px solid --color-accent, 오프셋 2px |
| ARIA 랜드마크 | `main`, `nav`, `region` 필수 |
| 이미지 alt | 골프장 이미지 → 코스명 + 국가 |
| 아이콘 버튼 | `aria-label` 필수 |
| 폼 라벨 | 인풋 외부에 항상 표시 (placeholder만 금지) |
| 색맹 지원 | 상태 표현 = 색 + 아이콘/텍스트 병행 |

---

## AI Slop Blacklist (이 프로젝트에서 금지)

- 보라/인디고 그라디언트 배경 — 골프 감성과 미스매치
- 아이콘-in-원형-배경 3열 그리드 (SaaS 카드 패턴)
- "AI로 골프 여행을 새롭게 경험하세요" 류 카피 — 구체적으로 재작성
- 모든 요소 동일 border-radius — 의도적 차별화 필요
- 데코레이티브 블롭/웨이브 SVG 구분선
- 캐러셀 안에 캐러셀
- 카카오 로그인과 구글/네이버/애플을 동일 크기로 나열

---

## Design Decisions (확정)

| # | 결정 | 선택 | 비고 |
|---|------|------|------|
| 1 | AI 응답 표시 | **Mode별 적응형 확정** — 즉시검색: 타이핑 인디케이터, 대화형: 스트리밍 텍스트 | AI 응답 패턴 섹션 참고 |
| 2 | 소셜 로그인 | 카카오 primary 전면 배치, 나머지 수납 | |
| 3 | 동행 매칭 신뢰 | **핸디캡 + 이름만** (Phase 1 심플) | Phase 2에서 리뷰 배지 추가 |
| 4 | 스코어카드 공유 | **단순 텍스트 카드** (타수 + 핸디캡 + 코스명) | 시각적 카드는 Phase 2 |
| 5 | 가격 표시 | 한국 원화: "120만원" (숫자 18px Bold, Inter) | |
| 6 | 다크모드 | Phase 1 미지원, 시스템 설정 무시 (light only) | |
