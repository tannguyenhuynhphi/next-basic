import ProductDetail from "components/ProductDetail/ProductDetail";
import { useRouter } from 'next/router'
function Product() {
  const router = useRouter()
  const {id} = router.query
  console.log("id",id)
  return (
    <>
      <ProductDetail id={id}/>
    </>
  );
}
export default Product;
