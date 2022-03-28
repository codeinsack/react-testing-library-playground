import { useEffect, useState } from "react";
import { activate } from "../../api/apiCalls";
import { useParams } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import Spinner from "../../components/Spinner/Spinner";

const AccountActivation = () => {
  const [result, setResult] = useState("");
  const params = useParams();

  useEffect(() => {
    (async () => {
      try {
        await activate(params.token);
        setResult("success");
      } catch {
        setResult("fail");
      }
    })();
  }, [params.token]);

  return (
    <div data-testid="activation-page">
      {result === "success" && <Alert>Account is activated</Alert>}
      {result === "fail" && <Alert type="danger">Activation failure</Alert>}
      {!result && (
        <Alert type="secondary" center>
          <Spinner size="big" />
        </Alert>
      )}
    </div>
  );
};

export default AccountActivation;
