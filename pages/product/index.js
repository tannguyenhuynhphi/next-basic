import ProductList from "components/ProductList/ProductList";

function Product() {
//   const [data, setData] = useState({});
//   useEffect(() => {
//    const user = JSON.parse(localStorage.getItem("user"))
//     userService.getUser(user.id).then((x) => {
//       setData(x);
//     });
//   }, []);
  return (
    <>
      <ProductList />
    </>
  );
}
export default Product;
