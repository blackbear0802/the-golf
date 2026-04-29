// prisma/seed.ts — Phase 1 시드 데이터
// 실행: npm run db:seed
// 멱등성: 모든 upsert는 고정 UUID 사용 → 재실행 안전

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ─── 고정 UUID 테이블 ────────────────────────────────────────────────────────
// 재실행 시 중복 생성 방지. 새 시드 레코드 추가 시 여기서 UUID 먼저 선언.

const IDS = {
  supplier: {
    internal: '00000000-0000-4000-8000-000000000001',
  },
  venue: {
    // 태국
    highlands_chiang_mai: '00000000-0000-4000-8001-000000000001',
    alpine_chiang_mai:    '00000000-0000-4000-8001-000000000002',
    gassan_khuntan:       '00000000-0000-4000-8001-000000000003',
    nikanti_bangkok:      '00000000-0000-4000-8001-000000000004',
    // 베트남
    brg_danang:           '00000000-0000-4000-8002-000000000001',
    ba_na_hills:          '00000000-0000-4000-8002-000000000002',
    laguna_lang_co:       '00000000-0000-4000-8002-000000000003',
    brg_legend_hill:      '00000000-0000-4000-8002-000000000004',
    // 필리핀
    mimosa_clark:         '00000000-0000-4000-8003-000000000001',
    clearwater_clark:     '00000000-0000-4000-8003-000000000002',
    cebu_country_club:    '00000000-0000-4000-8003-000000000003',
    // 말레이시아
    tpc_kl:               '00000000-0000-4000-8004-000000000001',
    klgcc:                '00000000-0000-4000-8004-000000000002',
    // 일본
    hakone_cc:            '00000000-0000-4000-8005-000000000001',
    ibaraki_cc:           '00000000-0000-4000-8005-000000000002',
  },
  product: {
    chiangmai_3n4d_3r:   '00000000-0000-4000-8010-000000000001',
    chiangmai_4n5d_4r:   '00000000-0000-4000-8010-000000000002',
    danang_3n4d_2r:      '00000000-0000-4000-8010-000000000003',
    danang_4n5d_3r:      '00000000-0000-4000-8010-000000000004',
    clark_3n4d_2r:       '00000000-0000-4000-8010-000000000005',
    cebu_4n5d_3r:        '00000000-0000-4000-8010-000000000006',
    kl_3n4d_2r:          '00000000-0000-4000-8010-000000000007',
    japan_3n4d_2r:       '00000000-0000-4000-8010-000000000008',
  },
  user: {
    admin: '00000000-0000-4000-8020-000000000001',
    staff: '00000000-0000-4000-8020-000000000002',
  },
}

// ─── 취소 정책 공통 템플릿 ────────────────────────────────────────────────────
// 4단계: 30일 전 무료 → 14일 50% → 7일 70% → 당일 100%
function cancellationPolicies(productId: string) {
  return [
    { productId, daysBefore: 30, penaltyPct: 0,   description: '출발 30일 전까지 무료 취소' },
    { productId, daysBefore: 14, penaltyPct: 50,  description: '출발 14일 전까지 취소 시 50% 환불' },
    { productId, daysBefore: 7,  penaltyPct: 70,  description: '출발 7일 전까지 취소 시 30% 환불' },
    { productId, daysBefore: 1,  penaltyPct: 100, description: '출발 1일 전 취소 시 환불 불가' },
  ]
}

// ────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Seeding Phase 1 data...\n')

  // ── 1. 목적지 (5개국) ──────────────────────────────────────────────────────
  const destData = [
    { code: 'thailand',    nameKo: '태국',       nameEn: 'Thailand',    country: 'Thailand',    region: 'southeast_asia' },
    { code: 'vietnam',     nameKo: '베트남',     nameEn: 'Vietnam',     country: 'Vietnam',     region: 'southeast_asia' },
    { code: 'philippines', nameKo: '필리핀',     nameEn: 'Philippines', country: 'Philippines', region: 'southeast_asia' },
    { code: 'malaysia',    nameKo: '말레이시아', nameEn: 'Malaysia',    country: 'Malaysia',    region: 'southeast_asia' },
    { code: 'japan',       nameKo: '일본',       nameEn: 'Japan',       country: 'Japan',       region: 'east_asia' },
  ]

  for (const d of destData) {
    await prisma.destination.upsert({
      where:  { code: d.code },
      update: {},
      create: d,
    })
  }

  // 이후 FK에서 사용하기 위해 조회
  const dest = Object.fromEntries(
    await Promise.all(
      destData.map(async (d) => {
        const row = await prisma.destination.findUniqueOrThrow({ where: { code: d.code } })
        return [d.code, row.destinationId] as [string, string]
      })
    )
  )
  console.log(`✅ Destinations: ${destData.length}개`)

  // ── 2. 내부 공급자 ─────────────────────────────────────────────────────────
  await prisma.supplier.upsert({
    where:  { supplierId: IDS.supplier.internal },
    update: {},
    create: {
      supplierId:   IDS.supplier.internal,
      name:         '더 골프 내부 공급',
      type:         'internal',
      contactEmail: 'supply@thegolf.co.kr',
      status:       'active',
    },
  })
  console.log('✅ Supplier: 내부 공급자 1개')

  // ── 3. 골프장 (Venues) ────────────────────────────────────────────────────
  const venueData = [
    // 태국 ─ 치앙마이
    {
      courseId: IDS.venue.highlands_chiang_mai,
      name: '하이랜드 골프 & 스파 리조트',
      nameEn: 'Highlands Golf & Spa Resort',
      country: 'Thailand', region: 'Chiang Mai',
      holes: 18, par: 72, yardage: 6850,
      courseRating: 73.2, slopeRating: 131,
      description: '치앙마이 북부 산악 지형의 도전적인 파72 코스. 원숭이 해저드로 유명.',
      latitude: 18.7883, longitude: 98.9853,
    },
    {
      courseId: IDS.venue.alpine_chiang_mai,
      name: '알파인 골프 리조트 치앙마이',
      nameEn: 'Alpine Golf Resort Chiang Mai',
      country: 'Thailand', region: 'Chiang Mai',
      holes: 18, par: 72, yardage: 7150,
      courseRating: 74.1, slopeRating: 135,
      description: '치앙마이 최고 시설로 꼽히는 산악 코스. 전동 카트 기본 제공.',
      latitude: 18.8012, longitude: 98.9741,
    },
    {
      courseId: IDS.venue.gassan_khuntan,
      name: '가산 컨탄 골프 & 리조트',
      nameEn: 'Gassan Khuntan Golf & Resort',
      country: 'Thailand', region: 'Chiang Mai',
      holes: 18, par: 72, yardage: 6620,
      courseRating: 71.8, slopeRating: 126,
      description: '1000m 고지대 코스. 서늘한 날씨와 파노라마 뷰가 특징.',
      latitude: 18.5621, longitude: 99.1032,
    },
    // 태국 ─ 방콕
    {
      courseId: IDS.venue.nikanti_bangkok,
      name: '니칸티 골프 클럽',
      nameEn: 'Nikanti Golf Club',
      country: 'Thailand', region: 'Bangkok',
      holes: 18, par: 72, yardage: 7130,
      courseRating: 74.5, slopeRating: 138,
      description: '방콕 인근 최고급 멤버십 코스. 방문객 그린피 프리미엄.',
      latitude: 13.8567, longitude: 100.3421,
    },
    // 베트남 ─ 다낭
    {
      courseId: IDS.venue.brg_danang,
      name: 'BRG 다낭 골프 리조트',
      nameEn: 'BRG Danang Golf Resort',
      country: 'Vietnam', region: 'Da Nang',
      holes: 18, par: 72, yardage: 7046,
      courseRating: 73.9, slopeRating: 133,
      description: '콜린 몽고메리 설계. 해변 인접, 바다 전망 홀 다수.',
      latitude: 15.9767, longitude: 108.2563,
    },
    {
      courseId: IDS.venue.ba_na_hills,
      name: '바나 힐스 골프 클럽',
      nameEn: 'Ba Na Hills Golf Club',
      country: 'Vietnam', region: 'Da Nang',
      holes: 18, par: 71, yardage: 6950,
      courseRating: 73.0, slopeRating: 128,
      description: '1,500m 산악 코스. 기온 15°C 내외로 여름에도 쾌적.',
      latitude: 15.9893, longitude: 107.9812,
    },
    {
      courseId: IDS.venue.laguna_lang_co,
      name: '라구나 랑코 골프 클럽',
      nameEn: 'Laguna Golf Lang Co',
      country: 'Vietnam', region: 'Da Nang',
      holes: 18, par: 71, yardage: 6955,
      courseRating: 73.2, slopeRating: 130,
      description: '닉 팔도 설계. 다낭-후에 사이 해안 리조트 코스.',
      latitude: 16.2341, longitude: 108.0921,
    },
    // 베트남 ─ 하노이
    {
      courseId: IDS.venue.brg_legend_hill,
      name: 'BRG 레전드 힐 골프 리조트',
      nameEn: 'BRG Legend Hill Golf Resort',
      country: 'Vietnam', region: 'Hanoi',
      holes: 18, par: 72, yardage: 6900,
      courseRating: 72.8, slopeRating: 129,
      description: '하노이 인근 구릉 지형 코스. 공항에서 45분.',
      latitude: 21.1234, longitude: 105.7823,
    },
    // 필리핀 ─ 클라크
    {
      courseId: IDS.venue.mimosa_clark,
      name: '미모사 골프 & 컨트리 클럽',
      nameEn: 'Mimosa Golf & Country Club',
      country: 'Philippines', region: 'Clark',
      holes: 27, par: 72, yardage: 7020,
      courseRating: 73.5, slopeRating: 132,
      description: '클라크 자유무역지대 내 27홀. 페어웨이 넓고 관리 우수.',
      latitude: 15.1745, longitude: 120.5672,
    },
    {
      courseId: IDS.venue.clearwater_clark,
      name: '클리어워터 골프 코스',
      nameEn: 'Clearwater Golf Course',
      country: 'Philippines', region: 'Clark',
      holes: 18, par: 72, yardage: 6750,
      courseRating: 71.9, slopeRating: 124,
      description: '물 해저드 중심 레이아웃. 초보자도 즐길 수 있는 난이도.',
      latitude: 15.1890, longitude: 120.5521,
    },
    // 필리핀 ─ 세부
    {
      courseId: IDS.venue.cebu_country_club,
      name: '세부 컨트리 클럽',
      nameEn: 'Cebu Country Club',
      country: 'Philippines', region: 'Cebu',
      holes: 18, par: 72, yardage: 6520,
      courseRating: 71.2, slopeRating: 122,
      description: '세부 시내 인접. 역사 있는 퍼블릭 코스.',
      latitude: 10.3156, longitude: 123.9024,
    },
    // 말레이시아 ─ 쿠알라룸푸르
    {
      courseId: IDS.venue.tpc_kl,
      name: 'TPC 쿠알라룸푸르',
      nameEn: 'TPC Kuala Lumpur',
      country: 'Malaysia', region: 'Kuala Lumpur',
      holes: 36, par: 72, yardage: 7005,
      courseRating: 73.7, slopeRating: 134,
      description: '말레이시아 투어 정규 대회 코스. 36홀 구성.',
      latitude: 3.1478, longitude: 101.6823,
    },
    {
      courseId: IDS.venue.klgcc,
      name: '쿠알라룸푸르 골프 & 컨트리 클럽',
      nameEn: 'Kuala Lumpur Golf & Country Club',
      country: 'Malaysia', region: 'Kuala Lumpur',
      holes: 18, par: 72, yardage: 6878,
      courseRating: 73.3, slopeRating: 130,
      description: '1921년 개장, 말레이시아 최고 명문 코스 중 하나.',
      latitude: 3.1612, longitude: 101.6912,
    },
    // 일본
    {
      courseId: IDS.venue.hakone_cc,
      name: '하코네 컨트리 클럽',
      nameEn: 'Hakone Country Club',
      country: 'Japan', region: 'Kanagawa',
      holes: 18, par: 72, yardage: 6680,
      courseRating: 72.1, slopeRating: 127,
      description: '후지산 전망. 봄 벚꽃 시즌 최고 인기 코스.',
      latitude: 35.2324, longitude: 139.0712,
    },
    {
      courseId: IDS.venue.ibaraki_cc,
      name: '이바라키 컨트리 클럽',
      nameEn: 'Ibaraki Country Club',
      country: 'Japan', region: 'Ibaraki',
      holes: 36, par: 72, yardage: 6990,
      courseRating: 73.8, slopeRating: 136,
      description: '도쿄 근교 명문 36홀. 역대 일본 오픈 개최.',
      latitude: 36.3912, longitude: 140.2134,
    },
  ]

  for (const v of venueData) {
    await prisma.venue.upsert({
      where:  { courseId: v.courseId },
      update: {},
      create: v,
    })
  }
  console.log(`✅ Venues: ${venueData.length}개`)

  // ── 4. 상품 (Products) ────────────────────────────────────────────────────
  const productData = [
    {
      productId:     IDS.product.chiangmai_3n4d_3r,
      supplierId:    IDS.supplier.internal,
      courseId:      IDS.venue.highlands_chiang_mai,
      destinationId: dest.thailand,
      title:         '치앙마이 3박 4일 3라운드 골프 패키지',
      description:   '치앙마이 산악 코스 3곳을 한 번에. 그린피+캐디+숙박 완전 포함 패키지.',
      price:         890000,
      includesFlight: false,
      includesHotel:  true,
      includesCaddie: true,
      nights:        3,
      rounds:        3,
      departureCity: '인천',
      status:        'PUBLISHED',
      publishedAt:   new Date('2026-04-01'),
    },
    {
      productId:     IDS.product.chiangmai_4n5d_4r,
      supplierId:    IDS.supplier.internal,
      courseId:      IDS.venue.alpine_chiang_mai,
      destinationId: dest.thailand,
      title:         '치앙마이 4박 5일 4라운드 프리미엄 패키지',
      description:   '알파인 리조트 베이스캠프, 4코스 정복. 프리미엄 객실 포함.',
      price:         1250000,
      includesFlight: false,
      includesHotel:  true,
      includesCaddie: true,
      nights:        4,
      rounds:        4,
      departureCity: '인천',
      status:        'PUBLISHED',
      publishedAt:   new Date('2026-04-01'),
    },
    {
      productId:     IDS.product.danang_3n4d_2r,
      supplierId:    IDS.supplier.internal,
      courseId:      IDS.venue.brg_danang,
      destinationId: dest.vietnam,
      title:         '다낭 3박 4일 2라운드 해변 골프',
      description:   'BRG 다낭 + 라구나 랑코. 해변 리조트 숙박, 캐디 포함.',
      price:         950000,
      includesFlight: false,
      includesHotel:  true,
      includesCaddie: true,
      nights:        3,
      rounds:        2,
      departureCity: '인천',
      status:        'PUBLISHED',
      publishedAt:   new Date('2026-04-01'),
    },
    {
      productId:     IDS.product.danang_4n5d_3r,
      supplierId:    IDS.supplier.internal,
      courseId:      IDS.venue.ba_na_hills,
      destinationId: dest.vietnam,
      title:         '다낭 4박 5일 3라운드 — 바나 힐스 포함',
      description:   'BRG + 바나 힐스 + 라구나. 다낭 3대 코스 완전 정복.',
      price:         1350000,
      includesFlight: false,
      includesHotel:  true,
      includesCaddie: true,
      nights:        4,
      rounds:        3,
      departureCity: '인천',
      status:        'PUBLISHED',
      publishedAt:   new Date('2026-04-01'),
    },
    {
      productId:     IDS.product.clark_3n4d_2r,
      supplierId:    IDS.supplier.internal,
      courseId:      IDS.venue.mimosa_clark,
      destinationId: dest.philippines,
      title:         '클라크 3박 4일 2라운드 패키지',
      description:   '미모사 + 클리어워터. 클라크 자유무역지대 코스, 넓은 페어웨이.',
      price:         720000,
      includesFlight: false,
      includesHotel:  true,
      includesCaddie: true,
      nights:        3,
      rounds:        2,
      departureCity: '인천',
      status:        'PUBLISHED',
      publishedAt:   new Date('2026-04-01'),
    },
    {
      productId:     IDS.product.cebu_4n5d_3r,
      supplierId:    IDS.supplier.internal,
      courseId:      IDS.venue.cebu_country_club,
      destinationId: dest.philippines,
      title:         '세부 4박 5일 3라운드 리조트 골프',
      description:   '세부 컨트리 클럽 + 인근 2코스. 해변 리조트 숙박 포함.',
      price:         980000,
      includesFlight: false,
      includesHotel:  true,
      includesCaddie: true,
      nights:        4,
      rounds:        3,
      departureCity: '인천',
      status:        'PUBLISHED',
      publishedAt:   new Date('2026-04-01'),
    },
    {
      productId:     IDS.product.kl_3n4d_2r,
      supplierId:    IDS.supplier.internal,
      courseId:      IDS.venue.tpc_kl,
      destinationId: dest.malaysia,
      title:         '쿠알라룸푸르 3박 4일 2라운드 패키지',
      description:   'TPC KL + KLGCC. 말레이시아 투어 코스 직접 체험.',
      price:         1080000,
      includesFlight: false,
      includesHotel:  true,
      includesCaddie: false,
      nights:        3,
      rounds:        2,
      departureCity: '인천',
      status:        'PUBLISHED',
      publishedAt:   new Date('2026-04-01'),
    },
    {
      productId:     IDS.product.japan_3n4d_2r,
      supplierId:    IDS.supplier.internal,
      courseId:      IDS.venue.hakone_cc,
      destinationId: dest.japan,
      title:         '일본 하코네 3박 4일 2라운드',
      description:   '하코네 컨트리 클럽 + 이바라키. 후지산 뷰 코스.',
      price:         1350000,
      includesFlight: false,
      includesHotel:  true,
      includesCaddie: false,
      nights:        3,
      rounds:        2,
      departureCity: '인천',
      status:        'PUBLISHED',
      publishedAt:   new Date('2026-04-01'),
    },
  ]

  for (const p of productData) {
    await prisma.product.upsert({
      where:  { productId: p.productId },
      update: {},
      create: p,
    })
  }
  console.log(`✅ Products: ${productData.length}개`)

  // ── 5. 취소 정책 (각 상품에 4단계) ───────────────────────────────────────
  // 기존 정책 삭제 후 재생성 (upsert 미지원 → 멱등 처리)
  const allProductIds = Object.values(IDS.product)
  await prisma.cancellationPolicy.deleteMany({
    where: { productId: { in: allProductIds } },
  })

  const policies = allProductIds.flatMap(cancellationPolicies)
  await prisma.cancellationPolicy.createMany({ data: policies })
  console.log(`✅ CancellationPolicies: ${policies.length}개 (상품당 4단계)`)

  // ── 6. 운영 계정 ──────────────────────────────────────────────────────────
  await prisma.user.upsert({
    where:  { userId: IDS.user.admin },
    update: {},
    create: {
      userId: IDS.user.admin,
      email:  'admin@thegolf.co.kr',
      name:   '관리자',
      role:   'admin',
    },
  })

  await prisma.user.upsert({
    where:  { userId: IDS.user.staff },
    update: {},
    create: {
      userId: IDS.user.staff,
      email:  'staff01@thegolf.co.kr',
      name:   '담당자 1',
      role:   'staff',
    },
  })
  console.log('✅ Users: admin + staff 2개')

  console.log('\n🎉 Seeding complete!')
  console.log(`   - Destinations : ${destData.length}개`)
  console.log(`   - Suppliers    : 1개 (internal)`)
  console.log(`   - Venues       : ${venueData.length}개`)
  console.log(`   - Products     : ${productData.length}개 (PUBLISHED)`)
  console.log(`   - Cancel Policies: ${policies.length}개`)
  console.log(`   - Users        : admin + staff01`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
