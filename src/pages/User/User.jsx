import { useEffect, useState } from "react";
import { fetchUser } from "../../api/apiCalls";
import { useParams } from "react-router-dom";
import ProfileCard from "./ProfileCard/ProfileCard";

const User = () => {
  const params = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await fetchUser(params.id);
      setUser(data);
    })();
  }, []);

  return (
    <div data-testid="user-page">
      <ProfileCard user={user} />
    </div>
  );
};

export default User;
