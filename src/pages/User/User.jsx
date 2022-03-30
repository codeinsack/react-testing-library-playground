import { useEffect, useState } from "react";
import { fetchUser } from "../../api/apiCalls";
import { useParams } from "react-router-dom";
import ProfileCard from "./ProfileCard/ProfileCard";
import Spinner from "../../components/Spinner/Spinner";
import Alert from "../../components/Alert/Alert";

const User = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await fetchUser(params.id);
      setLoading(false);
      setUser(data);
    })();
  }, []);

  return (
    <div data-testid="user-page">
      {!loading && <ProfileCard user={user} />}
      {loading && (
        <Alert type="secondary" center>
          <Spinner size="big" />
        </Alert>
      )}
    </div>
  );
};

export default User;
