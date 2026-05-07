export type MockProduct = {
  id: string
  title: string
  destination: string
  destinationCode: string
  flag: string
  city: string
  nights: number
  rounds: number
  includesFlight: boolean
  includesHotel: boolean
  includesCaddie: boolean
  originalPrice: number
  dealPrice: number
  slotsTotal: number
  slotsRemaining: number
  bg: string
  isDeal: boolean
  departureCity: string
  description: string
  schedule: { day: number; title: string; desc: string }[]
  cancellation: { daysBefore: number; penalty: number; label: string }[]
  reviews: { initial: string; name: string; trip: string; stars: number; text: string }[]
}

export const PRODUCTS: MockProduct[] = [
  {
    id: '10000000-0000-4000-8000-000000000001',
    title: '치앙마이 3박 4일 3라운드 골프 패키지',
    destination: '태국',
    destinationCode: 'thailand',
    flag: '🇹🇭',
    city: '치앙마이',
    nights: 3,
    rounds: 3,
    includesFlight: false,
    includesHotel: true,
    includesCaddie: true,
    originalPrice: 128,
    dealPrice: 89,
    slotsTotal: 10,
    slotsRemaining: 3,
    bg: 'linear-gradient(135deg, #1a6b3a 0%, #0d4a28 100%)',
    isDeal: true,
    departureCity: '인천',
    description:
      '치앙마이 최고의 코스에서 3라운드를 경험하세요. 알파인 골프 리조트와 가산 레거시 등 현지 TOP 코스만 엄선했습니다. 전담 캐디와 4성급 호텔 숙박이 포함된 완성형 패키지입니다.',
    schedule: [
      { day: 1, title: '인천 출발 → 치앙마이 도착', desc: '호텔 체크인 및 웰컴 디너' },
      { day: 2, title: '라운드 1·2 — Alpine Golf Resort', desc: '조식 후 오전·오후 라운드, 캐디 포함' },
      { day: 3, title: '라운드 3 — Gassan Legacy Golf Club', desc: '오전 라운드 후 자유 시간' },
      { day: 4, title: '치앙마이 출발 → 인천 귀국', desc: '호텔 체크아웃 후 공항 이동' },
    ],
    cancellation: [
      { daysBefore: 30, penalty: 0, label: '30일 전 취소 시 전액 환불' },
      { daysBefore: 14, penalty: 30, label: '14일 전 취소 시 30% 위약금' },
      { daysBefore: 7, penalty: 50, label: '7일 전 취소 시 50% 위약금' },
      { daysBefore: 0, penalty: 100, label: '당일 취소 시 환불 불가' },
    ],
    reviews: [
      { initial: '김', name: '김○○ · 52세', trip: '2026.03', stars: 5, text: '코스 컨디션이 최상이었습니다. 캐디도 친절하고 전반적으로 매우 만족스러웠어요.' },
      { initial: '이', name: '이○○ · 47세', trip: '2026.02', stars: 4, text: '숙소와 코스 모두 훌륭했습니다. 담당자가 세심하게 챙겨줬어요.' },
    ],
  },
  {
    id: '10000000-0000-4000-8000-000000000002',
    title: '다낭 4박 5일 프리미엄 골프 패키지',
    destination: '베트남',
    destinationCode: 'vietnam',
    flag: '🇻🇳',
    city: '다낭',
    nights: 4,
    rounds: 3,
    includesFlight: false,
    includesHotel: true,
    includesCaddie: false,
    originalPrice: 168,
    dealPrice: 115,
    slotsTotal: 10,
    slotsRemaining: 5,
    bg: 'linear-gradient(135deg, #1a4d6e 0%, #0d2a40 100%)',
    isDeal: true,
    departureCity: '인천',
    description:
      '다낭 해변가 럭셔리 호텔에서 3개 세계적 코스를 경험하세요. 바나힐스 CC, 몽고 CC, 다낭 GC 등 국제 대회 개최지 코스가 포함됩니다.',
    schedule: [
      { day: 1, title: '인천 출발 → 다낭 도착', desc: '호텔 체크인 및 환영 만찬' },
      { day: 2, title: '라운드 1 — Ba Na Hills Golf Club', desc: '조식 후 오전 라운드, 오후 해변 자유 시간' },
      { day: 3, title: '라운드 2 — Monggo Golf Club', desc: '전일 라운드 및 클럽하우스 만찬' },
      { day: 4, title: '라운드 3 — Danang Golf Club', desc: '오전 라운드, 오후 자유 시간' },
      { day: 5, title: '다낭 출발 → 인천 귀국', desc: '체크아웃 후 공항 이동' },
    ],
    cancellation: [
      { daysBefore: 30, penalty: 0, label: '30일 전 취소 시 전액 환불' },
      { daysBefore: 14, penalty: 30, label: '14일 전 취소 시 30% 위약금' },
      { daysBefore: 7, penalty: 50, label: '7일 전 취소 시 50% 위약금' },
      { daysBefore: 0, penalty: 100, label: '당일 취소 시 환불 불가' },
    ],
    reviews: [
      { initial: '박', name: '박○○ · 48세', trip: '2026.02', stars: 5, text: 'AI에게 조건 알려주고 바로 예약했는데 완벽한 패키지였어요. 코스 퀄리티 최고!' },
      { initial: '최', name: '최○○ · 55세', trip: '2026.01', stars: 5, text: '다낭은 처음인데 이렇게 잘 연결된 패키지가 있을 줄 몰랐습니다. 재방문 의사 100%.' },
    ],
  },
  {
    id: '10000000-0000-4000-8000-000000000003',
    title: '클라크 3박 4일 2라운드 + 캐디 패키지',
    destination: '필리핀',
    destinationCode: 'philippines',
    flag: '🇵🇭',
    city: '클라크',
    nights: 3,
    rounds: 2,
    includesFlight: false,
    includesHotel: true,
    includesCaddie: true,
    originalPrice: 98,
    dealPrice: 72,
    slotsTotal: 8,
    slotsRemaining: 1,
    bg: 'linear-gradient(135deg, #2a3a6e 0%, #151e40 100%)',
    isDeal: true,
    departureCity: '인천',
    description:
      '필리핀 최대 골프 타운 클라크에서 합리적인 비용으로 2라운드를 즐기세요. 잔여 좌석이 단 1자리뿐이니 서둘러 예약하세요.',
    schedule: [
      { day: 1, title: '인천 출발 → 클라크 도착', desc: '리조트 체크인 및 환영 만찬' },
      { day: 2, title: '라운드 1 — Mimosa Golf Estate', desc: '조식 후 전일 라운드, 전담 캐디 제공' },
      { day: 3, title: '라운드 2 — Luisita Golf CC', desc: '오전 라운드 후 자유 시간' },
      { day: 4, title: '클라크 출발 → 인천 귀국', desc: '체크아웃 및 공항 이동' },
    ],
    cancellation: [
      { daysBefore: 21, penalty: 0, label: '21일 전 취소 시 전액 환불' },
      { daysBefore: 7, penalty: 50, label: '7일 전 취소 시 50% 위약금' },
      { daysBefore: 0, penalty: 100, label: '당일 취소 시 환불 불가' },
    ],
    reviews: [
      { initial: '정', name: '정○○ · 50세', trip: '2026.01', stars: 4, text: '가격 대비 최고의 패키지입니다. 캐디 실력도 좋고 코스 관리 상태가 훌륭했어요.' },
    ],
  },
  {
    id: '10000000-0000-4000-8000-000000000004',
    title: '방콕 4박 5일 4라운드 프리미엄 전세버스 투어',
    destination: '태국',
    destinationCode: 'thailand',
    flag: '🇹🇭',
    city: '방콕',
    nights: 4,
    rounds: 4,
    includesFlight: true,
    includesHotel: true,
    includesCaddie: true,
    originalPrice: 189,
    dealPrice: 158,
    slotsTotal: 12,
    slotsRemaining: 7,
    bg: 'linear-gradient(135deg, #2a6b3a 0%, #154a28 100%)',
    isDeal: false,
    departureCity: '인천',
    description:
      '항공·호텔·캐디 ALL-IN 패키지. 방콕 근교 5성급 코스만 엄선했습니다. 전세버스로 이동하여 편하게 이동하세요.',
    schedule: [
      { day: 1, title: '인천 출발 → 방콕 도착', desc: '항공 포함, 5성급 호텔 체크인' },
      { day: 2, title: '라운드 1·2 — Thai CC & Vintage Club', desc: '오전·오후 각 1라운드' },
      { day: 3, title: '라운드 3 — Nikanti Golf Club', desc: '전일 라운드' },
      { day: 4, title: '라운드 4 — Alpine Golf Resort Bangkok', desc: '오전 라운드 후 쇼핑 자유 시간' },
      { day: 5, title: '방콕 출발 → 인천 귀국', desc: '체크아웃 및 항공편 탑승' },
    ],
    cancellation: [
      { daysBefore: 45, penalty: 0, label: '45일 전 취소 시 전액 환불' },
      { daysBefore: 21, penalty: 30, label: '21일 전 취소 시 30% 위약금' },
      { daysBefore: 7, penalty: 70, label: '7일 전 취소 시 70% 위약금' },
      { daysBefore: 0, penalty: 100, label: '당일 취소 시 환불 불가' },
    ],
    reviews: [
      { initial: '윤', name: '윤○○ · 58세', trip: '2026.02', stars: 5, text: '항공까지 포함이라 정말 편했습니다. 방콕 코스 퀄리티는 기대 이상이에요.' },
    ],
  },
  {
    id: '10000000-0000-4000-8000-000000000005',
    title: '호이안 3박 4일 2라운드 리조트 패키지',
    destination: '베트남',
    destinationCode: 'vietnam',
    flag: '🇻🇳',
    city: '호이안',
    nights: 3,
    rounds: 2,
    includesFlight: false,
    includesHotel: true,
    includesCaddie: true,
    originalPrice: 112,
    dealPrice: 95,
    slotsTotal: 10,
    slotsRemaining: 6,
    bg: 'linear-gradient(135deg, #1a5a6e 0%, #0d3040 100%)',
    isDeal: false,
    departureCity: '인천',
    description:
      '유네스코 세계문화유산 호이안 구시가지와 함께하는 골프 여행. 리조트형 코스에서 여유롭게 2라운드를 즐기세요.',
    schedule: [
      { day: 1, title: '인천 출발 → 다낭 도착 → 호이안 이동', desc: '리조트 체크인' },
      { day: 2, title: '라운드 1 — Hoiana Shores Golf Club', desc: '오션뷰 코스에서 전일 라운드' },
      { day: 3, title: '라운드 2 + 호이안 구시가지 투어', desc: '오전 라운드, 오후 문화 탐방' },
      { day: 4, title: '다낭 출발 → 인천 귀국', desc: '체크아웃 및 공항 이동' },
    ],
    cancellation: [
      { daysBefore: 30, penalty: 0, label: '30일 전 취소 시 전액 환불' },
      { daysBefore: 14, penalty: 30, label: '14일 전 취소 시 30% 위약금' },
      { daysBefore: 0, penalty: 100, label: '당일 취소 시 환불 불가' },
    ],
    reviews: [
      { initial: '한', name: '한○○ · 45세', trip: '2026.03', stars: 5, text: '호이안 구시가지 투어가 더해져서 가족과 함께 오기 딱 좋았습니다.' },
    ],
  },
  {
    id: '10000000-0000-4000-8000-000000000006',
    title: '코타키나발루 4박 5일 3라운드 + 항공 패키지',
    destination: '말레이시아',
    destinationCode: 'malaysia',
    flag: '🇲🇾',
    city: '코타키나발루',
    nights: 4,
    rounds: 3,
    includesFlight: true,
    includesHotel: true,
    includesCaddie: false,
    originalPrice: 178,
    dealPrice: 145,
    slotsTotal: 8,
    slotsRemaining: 4,
    bg: 'linear-gradient(135deg, #6e3a2a 0%, #401520 100%)',
    isDeal: false,
    departureCity: '인천',
    description:
      '열대우림과 바다가 어우러진 코타키나발루에서 항공 포함 3라운드 패키지. 세계 100대 코스에 선정된 Sutera Harbour 포함.',
    schedule: [
      { day: 1, title: '인천 출발 → 코타키나발루 도착', desc: '항공 포함, 호텔 체크인' },
      { day: 2, title: '라운드 1 — Sutera Harbour Golf Club', desc: '오션뷰 세계 100대 코스' },
      { day: 3, title: '라운드 2 — Sabah Golf & CC', desc: '전일 라운드' },
      { day: 4, title: '라운드 3 — Dalit Bay Golf Club', desc: '오전 라운드, 오후 섬 투어 옵션' },
      { day: 5, title: '코타키나발루 출발 → 인천 귀국', desc: '체크아웃 및 공항 이동' },
    ],
    cancellation: [
      { daysBefore: 30, penalty: 0, label: '30일 전 취소 시 전액 환불' },
      { daysBefore: 14, penalty: 40, label: '14일 전 취소 시 40% 위약금' },
      { daysBefore: 7, penalty: 70, label: '7일 전 취소 시 70% 위약금' },
      { daysBefore: 0, penalty: 100, label: '당일 취소 시 환불 불가' },
    ],
    reviews: [
      { initial: '오', name: '오○○ · 53세', trip: '2026.01', stars: 4, text: '항공까지 패키지로 처리되니 너무 편했어요. 코스 뷰가 압도적으로 아름다웠습니다.' },
    ],
  },
]
