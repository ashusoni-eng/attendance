
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl px-6">
        <LoginForm onSuccess={() => navigate("/dashboard")} />
      </div>
    </div>
  );
};

export default LoginPage;
