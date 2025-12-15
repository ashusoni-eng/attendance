import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authApi } from "../api/auth.api";
import { useAuth } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

interface LoginFormProps {
  onSuccess: () => void;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 chars").required("Password required"),
});

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setApiError(null);

    try {
      const response = await authApi.login(data);

      // Extract token & user from NestJS backend
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      const user = response.data.user;

      // Update AuthContext
      login(accessToken, refreshToken, user);

      // SUCCESS POPUP
      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back 👋",
        // confirmButtonColor: "#0d9488",
        timer: 1000,
      });

      onSuccess(); 
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Invalid credentials. Please try again.";

      setApiError(message);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back!</h2>
        <p className="mt-2 text-sm text-gray-600">Please login to your account</p>
      </div>

      <div className="mt-8">
        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* API Error */}
            {apiError && (
              <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
                {apiError}
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/Register" className="font-medium text-teal-600 hover:text-teal-500">
          Register Now
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
