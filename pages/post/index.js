import PostPage from "components/PostPage/PostPage";

function Post() {
  const data = [
    {
      _id: "63ad1733b2490d1ddaa5dbf3",
      title: "MongoDB sắp ( ) sử dụng phương thức",
      content:
        "Khi sắp xếp nhiều trường, bạn nên khai báo các trường sẽ được sắp xếp theo phương thức sắp xếp ( ). Truy vấn sẽ được sắp xếp theo vị trí khai báo của các trường, trong đó thứ tự sắp xếp được đánh giá từ trái sang phải. Để chứng minh điều này, chúng tôi sẽ sử dụng bộ sưu tập “ phương tiện ”.",
      location: "Đồng Tháp",
      image: "http://localhost:3000/api/files/1671436755282-bezkoder-a56fa61c347eec20b56f-removebg-preview.png",
      active: false,
      create: "639c285c6aafdc7542a25c3c",
      createName: "Kbi Nguyên",
      dateCreated: 1672288051828,
      dateUpdate: 1672288051828,
    },
    {
      _id: "63ad1507b2490d1ddaa5dbf2",
      title: "MongoDB sắp xếp ( sử dụng phương 32434 thức",
      content:
        "Khi sắp xếp nhiều trường, bạn nên khai báo các trường sẽ được sắp xếp theo phương thức sắp xếp ( ). Truy vấn sẽ được sắp xếp theo vị trí khai báo của các trường, trong đó thứ tự sắp xếp được đánh giá từ trái sang phải. Để chứng minh điều này, chúng tôi sẽ sử dụng bộ sưu tập “ phương tiện ”.",
      location: "Đồng Tháp",
      image: "http://localhost:3000/api/files/1671436755282-bezkoder-a56fa61c347eec20b56f-removebg-preview.png",
      active: true,
      createName: "Kbi Nguyên",
      create: "639c285c6aafdc7542a25c3c",
      dateCreated: 1672287495749,
      dateUpdate: 1672287495749,
    },
    {
      _id: "63ad1283b2490d1ddaa5dbf1",
      title: "MongoDB sắp xếp ( ) sử dụng phương thức",
      content:
        "Khi sắp xếp nhiều trường, bạn nên khai báo các trường sẽ được sắp xếp theo phương thức sắp xếp ( ). Truy vấn sẽ được sắp xếp theo vị trí khai báo của các trường, trong đó thứ tự sắp xếp được đánh giá từ trái sang phải. Để chứng minh điều này, chúng tôi sẽ sử dụng bộ sưu tập “ phương tiện ”.",
      location: "Đồng Tháp",
      image: "http://localhost:3000/api/files/1671436755282-bezkoder-a56fa61c347eec20b56f-removebg-preview.png",
      active: true,
      createName: "Kbi Nguyên",
      create: "639c285c6aafdc7542a25c3c",
      dateCreated: 1672286851168,
      dateUpdate: 1672286851168,
    },
    {
      _id: "63acf969b2490d1ddaa5dbf0",
      title: "MongoDB sắp xếp sử dụng phương thức",
      content:
        "Khi sắp xếp nhiều trường, bạn nên khai báo các trường sẽ được sắp xếp theo phương thức sắp xếp ( ). Truy vấn sẽ được sắp xếp theo vị trí khai báo của các trường, trong đó thứ tự sắp xếp được đánh giá từ trái sang phải. Để chứng minh điều này, chúng tôi sẽ sử dụng bộ sưu tập “ phương tiện ”.",
      location: "Đồng Tháp",
      image: "http://localhost:3000/api/files/1671436755282-bezkoder-a56fa61c347eec20b56f-removebg-preview.png",
      active: true,
      createName: "Kbi Nguyên",
      create: "639c285c6aafdc7542a25c3c",
      dateCreated: "2022-12-29T02:20:25.536Z",
      dateUpdate: "2022-12-29T02:20:25.536Z",
    },
    {
      _id: "63acf951b2490d1ddaa5dbef",
      title: "Cú pháp cơ bản của 123",
      content:
        "Khi sắp xếp nhiều trường, bạn nên khai báo các trường sẽ được sắp xếp theo phương thức sắp xếp ( ). Truy vấn sẽ được sắp xếp theo vị trí khai báo của các trường, trong đó thứ tự sắp xếp được đánh giá từ trái sang phải. Để chứng minh điều này, chúng tôi sẽ sử dụng bộ sưu tập “ phương tiện ”.",
      location: "Đồng Tháp",
      image: "http://localhost:3000/api/files/1671436755282-bezkoder-a56fa61c347eec20b56f-removebg-preview.png",
      active: true,
      createName: "Kbi Nguyên",
      create: "639c285c6aafdc7542a25c3c",
      dateCreated: "2022-12-29T02:20:01.205Z",
      dateUpdate: "2022-12-29T02:20:01.205Z",
    },
  ];
  return (
    <>
      <PostPage data={data} />
    </>
  );
}
export default Post;
