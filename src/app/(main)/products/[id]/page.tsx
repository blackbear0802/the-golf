export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return <div>상품 상세: {params.id}</div>
}
