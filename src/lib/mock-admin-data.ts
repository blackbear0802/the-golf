export type { BookingStatus } from './mock-user-data'
import type { BookingStatus } from './mock-user-data'

export interface AdminBooking {
  id: string
  productId: string
  productTitle: string
  destination: string
  flag: string
  checkInDate: string
  travelerCount: number
  totalPrice: number
  status: BookingStatus
  createdAt: string
  guestName: string
  guestPhone: string
  specialRequests?: string
  managerName?: string
}

export const ADMIN_BOOKINGS: AdminBooking[] = [
  {
    id: 'BK-001', productId: 'product-1',
    productTitle: '치앙마이 핀밸리 3박 2라운드',
    destination: '태국', flag: '🇹🇭',
    checkInDate: '2026-05-15', travelerCount: 2, totalPrice: 178,
    status: 'CONFIRMED', createdAt: '2026-04-20',
    guestName: '김준혁', guestPhone: '010-1234-5678',
    managerName: '이수진',
  },
  {
    id: 'BK-002', productId: 'product-2',
    productTitle: '다낭 바나힐 리조트 4박 3라운드',
    destination: '베트남', flag: '🇻🇳',
    checkInDate: '2026-06-10', travelerCount: 4, totalPrice: 460,
    status: 'REQUESTED', createdAt: '2026-04-28',
    guestName: '이민수', guestPhone: '010-2222-3333',
    specialRequests: '캐디 영어 가능한 분으로 부탁드립니다.',
  },
  {
    id: 'BK-006', productId: 'product-1',
    productTitle: '치앙마이 핀밸리 3박 2라운드',
    destination: '태국', flag: '🇹🇭',
    checkInDate: '2026-05-22', travelerCount: 3, totalPrice: 267,
    status: 'REQUESTED', createdAt: '2026-04-27',
    guestName: '박서준', guestPhone: '010-5555-7777',
  },
  {
    id: 'BK-007', productId: 'product-6',
    productTitle: '코타키나발루 넥서스 4박 3라운드',
    destination: '말레이시아', flag: '🇲🇾',
    checkInDate: '2026-07-01', travelerCount: 2, totalPrice: 290,
    status: 'REQUESTED', createdAt: '2026-04-26',
    guestName: '최지훈', guestPhone: '010-8888-2222',
    specialRequests: '항공 좌석 창가로 요청합니다.',
  },
  {
    id: 'BK-008', productId: 'product-3',
    productTitle: '클라크 미모사 3박 2라운드',
    destination: '필리핀', flag: '🇵🇭',
    checkInDate: '2026-05-30', travelerCount: 4, totalPrice: 288,
    status: 'CONFIRMED', createdAt: '2026-04-22',
    guestName: '정다은', guestPhone: '010-3333-9999',
    managerName: '김태양',
  },
  {
    id: 'BK-003', productId: 'product-4',
    productTitle: '방콕 레이크우드 5박 4라운드',
    destination: '태국', flag: '🇹🇭',
    checkInDate: '2025-11-20', travelerCount: 2, totalPrice: 316,
    status: 'COMPLETED', createdAt: '2025-10-15',
    guestName: '김준혁', guestPhone: '010-1234-5678',
    managerName: '박지훈',
  },
  {
    id: 'BK-004', productId: 'product-5',
    productTitle: '호이안 빈펄 리조트 4박 3라운드',
    destination: '베트남', flag: '🇻🇳',
    checkInDate: '2025-08-05', travelerCount: 2, totalPrice: 190,
    status: 'COMPLETED', createdAt: '2025-07-01',
    guestName: '한승우', guestPhone: '010-6666-1111',
  },
  {
    id: 'BK-005', productId: 'product-3',
    productTitle: '클라크 미모사 3박 2라운드',
    destination: '필리핀', flag: '🇵🇭',
    checkInDate: '2026-03-10', travelerCount: 2, totalPrice: 144,
    status: 'CANCELLED', createdAt: '2026-02-20',
    guestName: '김준혁', guestPhone: '010-1234-5678',
  },
]

export const ADMIN_STATS = {
  pendingCount: ADMIN_BOOKINGS.filter(b => b.status === 'REQUESTED').length,
  confirmedCount: ADMIN_BOOKINGS.filter(b => b.status === 'CONFIRMED').length,
  completedCount: ADMIN_BOOKINGS.filter(b => b.status === 'COMPLETED').length,
  cancelledCount: ADMIN_BOOKINGS.filter(b => b.status === 'CANCELLED').length,
  monthlyRevenue: ADMIN_BOOKINGS
    .filter(b => b.status === 'CONFIRMED' || b.status === 'COMPLETED')
    .reduce((s, b) => s + b.totalPrice, 0),
  totalBookings: ADMIN_BOOKINGS.length,
}
