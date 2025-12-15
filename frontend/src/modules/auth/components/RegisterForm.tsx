import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authApi } from "../api/auth.api";
import Swal from "sweetalert2";

interface RegisterInputs {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),

  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit mobile number"),

  password: yup.string().min(6, "Minimum 6 chars").required("Password required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterInputs) => {
    try {
      await authApi.register({
        fullName: data.name,
        email: data.email,
        password: data.password,
      });

      await Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your account has been created. Please login.",
        confirmButtonColor: "#0d9488",
      });

      window.location.href = "/";
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Error registering user.";

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: message,
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div>
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Join our platform and manage your attendance smartly.
        </p>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Enter your full name"
              className={`block w-full px-3 py-2 border rounded-md shadow-sm mt-1 placeholder-gray-400 
                ${errors.name ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className={`block w-full px-3 py-2 border rounded-md shadow-sm mt-1 placeholder-gray-400 
                ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              {...register("mobile")}
              type="text"
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm mt-1 placeholder-gray-400 
                ${errors.mobile ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.mobile && (
              <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>
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
              placeholder="Enter password"
              className={`block w-full px-3 py-2 border rounded-md shadow-sm mt-1 placeholder-gray-400 
                ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm your password"
              className={`block w-full px-3 py-2 border rounded-md shadow-sm mt-1 placeholder-gray-400 
                ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 rounded-md 
              text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-50"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
        </div>
      </div>

      {/* Login Link */}
      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/" className="font-medium text-teal-600 hover:text-teal-500">
          Login
        </a>
      </p>
    </div>
  );
}
