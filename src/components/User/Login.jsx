import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginAPI } from "../../reactQuery/user/usersAPI";
import AlertMessage from "../Alert/AlertMessage";
import { useDispatch } from "react-redux";
import { FiMail, FiLock } from "react-icons/fi";
import { checkUserAuthStatus, setUserProfile } from "../../redux/slices/authSlice";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //---mutation
  const mutation = useMutation({ mutationFn: loginAPI });
  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await mutation.mutateAsync(values);
        console.log("Login successful:", data);
        
        // IMPORTANT: Set user profile immediately after login
        dispatch(setUserProfile(data));
        
        // Also update auth state from server
        await dispatch(checkUserAuthStatus());
        
        // Always navigate to dashboard - it will route based on role
        navigate("/dashboard");
      } catch (error) {
        console.log("Login error:", error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
            <FiLock className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Alerts */}
            {mutation.isPending && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-blue-700">Signing you in...</span>
              </div>
            )}

            {mutation.isError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <div className="h-5 w-5 text-red-500 mr-3">⚠️</div>
                <span className="text-red-700">
                  {mutation.error.response?.data?.message || "Login failed"}
                </span>
              </div>
            )}

            {mutation.isSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                <div className="h-5 w-5 text-green-500 mr-3">✅</div>
                <span className="text-green-700">Login successful! Redirecting...</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white"
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="mr-1">⚠️</span>
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-700 transition duration-200"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white"
                  {...formik.getFieldProps("password")}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="mr-1">⚠️</span>
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {mutation.isPending ? "Signing In..." : "Sign In"}
            </button>

            {/* Register Link */}
            <div className="text-center pt-4 border-t border-gray-100">
              <span className="text-gray-600">New to our platform? </span>
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition duration-200"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>

        {/* Features */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">Join over 10,000+ learners worldwide</p>
          <div className="flex justify-center space-x-6 text-xs text-gray-400">
            <span>✓ Expert-led courses</span>
            <span>✓ Progress tracking</span>
            <span>✓ Certificates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
