import ProfileUserDetail from "components/ProfileUserDetail/ProfileUserDetail";

function Profile() {
  // const [users, setUsers] = useState(null);
  // useEffect(() => {
  //   postService.getPost().then((x) => setUsers(x));
  // }, []);
  const data = {
    name: "USRe name",
    phone: "054821691",
    email: "user@gmail.com",
    gender: "nam",
    address: "Đồng Tháp",
    dateOfBirth: "20/02/1999",
    cccd: "341959796",
  };
  return (
    <>
      <ProfileUserDetail data={data} />
    </>
  );
}
export default Profile;
