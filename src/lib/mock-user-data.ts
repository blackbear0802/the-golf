export const MOCK_USER = {
  name: '김준혁',
  email: 'junhyuk.kim@email.com',
  phone: '010-1234-5678',
  initial: '김',
  memberSince: '2023-06',
  handicapIndex: 12.4,
  avgScore: 89,
  totalRounds: 24,
  totalTrips: 3,
}

export type BookingStatus = 'REQUESTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'

export interface MockBooking {
  id: string
  productId: string
  productTitle: string
  destination: string
  flag: string
  city: string
  nights: number
  rounds: number
  checkInDate: string
  travelerCount: number
  totalPrice: number
  status: BookingStatus
  createdAt: string
  managerName?: string
  managerPhone?: string
}

export const MOCK_BOOKINGS: MockBooking[] = [
  {
    id: 'BK-001',
    productId: 'product-1',
    productTitle: '치앙마이 핀밸리 3박 2라운드',
    destination: '태국',
    flag: '🇹🇭',
    city: '치앙마이',
    nights: 3,
    rounds: 2,
    checkInDate: '2026-05-15',
    travelerCount: 2,
    totalPrice: 178,
    status: 'CONFIRMED',
    createdAt: '2026-04-20',
    managerName: '이수진',
    managerPhone: '010-9876-5432',
  },
  {
    id: 'BK-002',
    productId: 'product-2',
    productTitle: '다낭 바나힐 리조트 4박 3라운드',
    destination: '베트남',
    flag: '🇻🇳',
    city: '다낭',
    nights: 4,
    rounds: 3,
    checkInDate: '2026-06-10',
    travelerCount: 4,
    totalPrice: 460,
    status: 'REQUESTED',
    createdAt: '2026-04-28',
  },
  {
    id: 'BK-003',
    productId: 'product-4',
    productTitle: '방콕 레이크우드 5박 4라운드',
    destination: '태국',
    flag: '🇹🇭',
    city: '방콕',
    nights: 5,
    rounds: 4,
    checkInDate: '2025-11-20',
    travelerCount: 2,
    totalPrice: 316,
    status: 'COMPLETED',
    createdAt: '2025-10-15',
    managerName: '박지훈',
    managerPhone: '010-5555-4444',
  },
  {
    id: 'BK-004',
    productId: 'product-5',
    productTitle: '호이안 빈펄 리조트 4박 3라운드',
    destination: '베트남',
    flag: '🇻🇳',
    city: '호이안',
    nights: 4,
    rounds: 3,
    checkInDate: '2025-08-05',
    travelerCount: 2,
    totalPrice: 190,
    status: 'COMPLETED',
    createdAt: '2025-07-01',
  },
  {
    id: 'BK-005',
    productId: 'product-3',
    productTitle: '클라크 미모사 3박 2라운드',
    destination: '필리핀',
    flag: '🇵🇭',
    city: '클라크',
    nights: 3,
    rounds: 2,
    checkInDate: '2026-03-10',
    travelerCount: 2,
    totalPrice: 144,
    status: 'CANCELLED',
    createdAt: '2026-02-20',
  },
]

export interface MockScoreCard {
  id: string
  bookingId: string
  courseName: string
  destination: string
  flag: string
  playedAt: string
  totalScore: number
  putts: number
  fairways: number
  gir: number
  holes: { hole: number; par: number; score: number }[]
}

export const MOCK_SCORECARDS: MockScoreCard[] = [
  {
    id: 'SC-001',
    bookingId: 'BK-003',
    courseName: 'Lakewood Country Club',
    destination: '태국',
    flag: '🇹🇭',
    playedAt: '2025-11-21',
    totalScore: 86,
    putts: 32,
    fairways: 9,
    gir: 8,
    holes: [
      { hole: 1, par: 4, score: 5 }, { hole: 2, par: 3, score: 3 },
      { hole: 3, par: 5, score: 6 }, { hole: 4, par: 4, score: 4 },
      { hole: 5, par: 4, score: 5 }, { hole: 6, par: 3, score: 4 },
      { hole: 7, par: 5, score: 5 }, { hole: 8, par: 4, score: 5 },
      { hole: 9, par: 4, score: 4 }, { hole: 10, par: 4, score: 5 },
      { hole: 11, par: 3, score: 3 }, { hole: 12, par: 5, score: 6 },
      { hole: 13, par: 4, score: 4 }, { hole: 14, par: 4, score: 5 },
      { hole: 15, par: 3, score: 3 }, { hole: 16, par: 5, score: 5 },
      { hole: 17, par: 4, score: 4 }, { hole: 18, par: 4, score: 5 },
    ],
  },
  {
    id: 'SC-002',
    bookingId: 'BK-003',
    courseName: 'Summit Windmill Golf Club',
    destination: '태국',
    flag: '🇹🇭',
    playedAt: '2025-11-22',
    totalScore: 88,
    putts: 34,
    fairways: 8,
    gir: 7,
    holes: [
      { hole: 1, par: 4, score: 5 }, { hole: 2, par: 3, score: 4 },
      { hole: 3, par: 5, score: 6 }, { hole: 4, par: 4, score: 5 },
      { hole: 5, par: 4, score: 4 }, { hole: 6, par: 3, score: 3 },
      { hole: 7, par: 5, score: 6 }, { hole: 8, par: 4, score: 5 },
      { hole: 9, par: 4, score: 5 }, { hole: 10, par: 4, score: 4 },
      { hole: 11, par: 3, score: 4 }, { hole: 12, par: 5, score: 5 },
      { hole: 13, par: 4, score: 5 }, { hole: 14, par: 4, score: 4 },
      { hole: 15, par: 3, score: 3 }, { hole: 16, par: 5, score: 6 },
      { hole: 17, par: 4, score: 5 }, { hole: 18, par: 4, score: 5 },
    ],
  },
  {
    id: 'SC-003',
    bookingId: 'BK-004',
    courseName: 'Vinpearl Golf Nam Hoi An',
    destination: '베트남',
    flag: '🇻🇳',
    playedAt: '2025-08-06',
    totalScore: 91,
    putts: 36,
    fairways: 7,
    gir: 6,
    holes: [
      { hole: 1, par: 4, score: 5 }, { hole: 2, par: 3, score: 4 },
      { hole: 3, par: 5, score: 7 }, { hole: 4, par: 4, score: 5 },
      { hole: 5, par: 4, score: 5 }, { hole: 6, par: 3, score: 4 },
      { hole: 7, par: 5, score: 6 }, { hole: 8, par: 4, score: 5 },
      { hole: 9, par: 4, score: 5 }, { hole: 10, par: 4, score: 5 },
      { hole: 11, par: 3, score: 3 }, { hole: 12, par: 5, score: 6 },
      { hole: 13, par: 4, score: 5 }, { hole: 14, par: 4, score: 5 },
      { hole: 15, par: 3, score: 4 }, { hole: 16, par: 5, score: 6 },
      { hole: 17, par: 4, score: 4 }, { hole: 18, par: 4, score: 6 },
    ],
  },
]

export interface MockReview {
  id: string
  bookingId: string
  productTitle: string
  destination: string
  flag: string
  stars: number
  text: string
  createdAt: string
}

export const MOCK_REVIEWS: MockReview[] = [
  {
    id: 'RV-001',
    bookingId: 'BK-003',
    productTitle: '방콕 레이크우드 5박 4라운드',
    destination: '태국',
    flag: '🇹🇭',
    stars: 5,
    text: '레이크우드 코스 컨디션이 정말 훌륭했습니다. 캐디분들도 프로페셔널하고 담당 매니저님 덕분에 일정이 너무 매끄럽게 진행됐어요. 내년에도 꼭 다시 가고 싶은 코스입니다.',
    createdAt: '2025-12-01',
  },
  {
    id: 'RV-002',
    bookingId: 'BK-004',
    productTitle: '호이안 빈펄 리조트 4박 3라운드',
    destination: '베트남',
    flag: '🇻🇳',
    stars: 4,
    text: '빈펄 코스가 바다 뷰와 함께 정말 아름다웠어요. 다만 여름이라 습도가 높아서 체력 관리가 중요했습니다. 리조트 시설은 최고였고 직원들도 친절했어요.',
    createdAt: '2025-08-20',
  },
]
