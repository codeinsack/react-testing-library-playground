import { useEffect, useState } from "react";
import { activate } from "../../api/apiCalls";
import { useParams } from "react-router-dom";

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
  }, []);

  return (
    <div data-testid="activation-page">
      {result === "success" && (
        <div className="alert alert-success mt-3">Account is activated</div>
      )}
      {result === "fail" && (
        <div className="alert alert-danger mt-3">Activation failure</div>
      )}
    </div>
  );
};

export default AccountActivation;
