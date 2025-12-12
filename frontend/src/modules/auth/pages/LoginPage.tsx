
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl px-6">
        <LoginForm onSuccess={() => {}} />
      </div>
    </div>
  );
};

export default LoginPage;
