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
  const [failedMessage, setFailedMessage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await fetchUser(params.id);
        setUser(data);
      } catch (error) {
        setFailedMessage(error.response.data.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  let content = (
    <Alert type="secondary" center>
      <Spinner size="big" />
    </Alert>
  );

  if (!loading) {
    if (failedMessage) {
      content = (
        <Alert type="secondary" center>
          {failedMessage}
        </Alert>
      );
    } else {
      content = <ProfileCard user={user} />;
    }
  }

  return <div data-testid="user-page">{content}</div>;
};

export default User;
