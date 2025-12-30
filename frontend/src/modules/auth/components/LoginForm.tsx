import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authApi } from "../api/auth.api";
import { useAuth } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onSuccess?: () => void;
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
  const navigate = useNavigate();
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
      const { user, accessToken, refreshToken } = response.data.data;

      // save user
      login(accessToken, refreshToken, user);

      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back 👋",
        timer: 1000,
        showConfirmButton: false,
      });

      // ✅ SAFE CALL
      onSuccess?.();

    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Invalid credentials. Please try again.";

      setApiError(message);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back!</h2>
      <p className="mt-2 text-sm text-gray-600">
        Please login to your account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        {apiError && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
            {apiError}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            {...register("email")}
            type="email"
            className="block w-full px-3 py-2 border rounded-lg shadow-sm mt-1"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            className="block w-full px-3 py-2 border rounded-lg shadow-sm mt-1"
          />
          {errors.password && (
            <p className="text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-teal-600 text-white rounded"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          className="font-medium text-teal-600 hover:text-teal-500"
        >
          Register Now
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
