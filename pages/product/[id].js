import ProductDetail from "components/ProductDetail/ProductDetail";

function Product() {
  //   const [data, setData] = useState({});
  //   useEffect(() => {
  //    const user = JSON.parse(localStorage.getItem("user"))
  //     userService.getUser(user.id).then((x) => {
  //       setData(x);
  //     });
  //   }, []);
  const data = [
    {
      name: "CÀ PHÊ SỮA hòa tan K Coffee Delight 3 in1, cà phê sữa đá truyền thống 17g",
      detail:
        "Khi sắp xếp nhiều trường, bạn nên khai báo các trường sẽ được sắp xếp theo phương thức sắp xếp ( ). Truy vấn sẽ được sắp xếp theo vị trí khai báo của các trường, trong đó thứ tự sắp xếp được đánh giá từ trái sang phải. Để chứng minh điều này, chúng tôi sẽ sử dụng bộ sưu tập",
      imageUrl: "http://localhost:3000/api/files/1671436755282-bezkoder-a56fa61c347eec20b56f-removebg-preview.png",
      active: false,
      price: "1000000",
      promotion: 10,
      quantity: 10,
      dateCreated: 1672288051828,
      dateUpdate: 1672288051828,
    },
    {
      name: "CÀ PHÊ SỮA hòa tan K Coffee Delight 3 in1, cà phê sữa đá truyền thống 17g",
      detail:
        "Khi sắp xếp nhiều trường, bạn nên khai báo các trường sẽ được sắp xếp theo phương thức sắp xếp ( ). Truy vấn sẽ được sắp xếp theo vị trí khai báo của các trường, trong đó thứ tự sắp xếp được đánh giá từ trái sang phải. Để chứng minh điều này, chúng tôi sẽ sử dụng bộ sưu tập",
      imageUrl: "http://localhost:3000/api/files/1671436755282-bezkoder-a56fa61c347eec20b56f-removebg-preview.png",
      active: false,
      price: "1000000",
      promotion: 10,
      quantity: 10,
      dateCreated: 1672288051828,
      dateUpdate: 1672288051828,
    },
    {
      name: "There is a chance (in your original code) that IE attempts to set the value of the input to a reference to that actual element (ignores the error) but leaves you with no new value.",
      detail:
        "Khi sắp xếp nhiều trường, bạn nên khai báo các trường sẽ được sắp xếp theo phương thức sắp xếp ( ). Truy vấn sẽ được sắp xếp theo vị trí khai báo của các trường, trong đó thứ tự sắp xếp được đánh giá từ trái sang phải. Để chứng minh điều này, chúng tôi sẽ sử dụng bộ sưu tập",
      imageUrl: "http://localhost:3000/api/files/1671436755282-bezkoder-a56fa61c347eec20b56f-removebg-preview.png",
      active: false,
      price: "1000000",
      promotion: 10,
      quantity: 10,
      dateCreated: 1672288051828,
      dateUpdate: 1672288051828,
    },
    {
      name: "There is a chance (in your original code) that IE attempts to set the value of the input to a reference to that actual element (ignores the error) but leaves you with no new value.",
      detail:
        "Khi sắp xếp nhiều trường, bạn nên khai báo các trường sẽ được sắp xếp theo phương thức sắp xếp ( ). Truy vấn sẽ được sắp xếp theo vị trí khai báo của các trường, trong đó thứ tự sắp xếp được đánh giá từ trái sang phải. Để chứng minh điều này, chúng tôi sẽ sử dụng bộ sưu tập",
      imageUrl: "http://localhost:3000/api/files/1671436755282-bezkoder-a56fa61c347eec20b56f-removebg-preview.png",
      active: false,
      price: "1000000",
      promotion: 10,
      quantity: 10,
      dateCreated: 1672288051828,
      dateUpdate: 1672288051828,
    },
    {
      name: "There is a chance (in your original code) that IE attempts to set the value of the input to a reference to that actual element (ignores the error) but leaves you with no new value.",
      detail:
        "Khi sắp xếp nhiều trường, bạn nên khai báo các trường sẽ được sắp xếp theo phương thức sắp xếp ( ). Truy vấn sẽ được sắp xếp theo vị trí khai báo của các trường, trong đó thứ tự sắp xếp được đánh giá từ trái sang phải. Để chứng minh điều này, chúng tôi sẽ sử dụng bộ sưu tập",
      imageUrl: "http://localhost:3000/api/files/1671436755282-bezkoder-a56fa61c347eec20b56f-removebg-preview.png",
      active: false,
      price: "1000000", 
      promotion: 10,
      quantity: 10,
      dateCreated: 1672288051828,
      dateUpdate: 1672288051828,
    },
  ];
  return (
    <>
      <ProductDetail data={data}/>
    </>
  );
}
export default Product;
