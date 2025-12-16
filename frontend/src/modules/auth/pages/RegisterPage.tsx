import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl px-6">
        <RegisterForm />
      </div>
    </div>
  );
}
