export default function BookingPage({ params }: { params: { id: string } }) {
  return <div>예약 요청: {params.id}</div>
}
