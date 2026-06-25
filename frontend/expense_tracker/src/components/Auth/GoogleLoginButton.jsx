import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post(
        API_PATHS.AUTH.GOOGLE_LOGIN,
        {
          credential: credentialResponse.credential,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Google Login Failed"
      );
    }
  };

  const handleError = () => {
    console.log("Google Login Failed");
    alert("Google Login Failed");
  };

  return (
    <div className="w-full flex justify-center mt-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="outline"
        size="large"
        shape="rectangular"
        text="signin_with"
        width="320"
      />
    </div>
  );
};

export default GoogleLoginButton;