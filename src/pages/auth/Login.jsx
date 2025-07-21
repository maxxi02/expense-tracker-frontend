import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components//inputs//Input";
import { useContext, useState } from "react";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axios-instance";
import { API_PATHS } from "../../utils/api-paths";
import UserContext from "../../context/user-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { updateUser, user } = useContext(UserContext);
  console.log("user from context: ", user);
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a valid password.");
      return;
    }
    setError(""); //clear error

    //api logic here
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      // console.log("User logged in as:", user);
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={"Email Address"}
            placeholder="nivekamures@gmail.com"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder="••••••••"
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don&#39;t have an account?{" "}
            <Link className="font-medium text-primary underline" to={"/signup"}>
              Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
