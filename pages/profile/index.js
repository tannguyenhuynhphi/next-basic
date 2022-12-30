import ProfileUserDetail from "components/ProfileUserDetail/ProfileUserDetail";
import { useEffect, useState } from "react";
import { userService } from "services";

function Profile() {
  const [data, setData] = useState({});
  useEffect(() => {
   const user = JSON.parse(localStorage.getItem("user"))
    userService.getUser(user.id).then((x) => {
      setData(x);
    });
  }, []);
  return (
    <>
      <ProfileUserDetail data={data} />
    </>
  );
}
export default Profile;
