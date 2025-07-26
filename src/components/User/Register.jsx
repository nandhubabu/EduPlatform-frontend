import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../Alert/AlertMessage";
import { registerAPI } from "../../reactQuery/user/usersAPI";
import { checkUserAuthStatus, setUserProfile } from "../../redux/slices/authSlice";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  role: Yup.string()
    .oneOf(["student", "instructor"], "Please select a valid role")
    .required("Role is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //react querys
  //mutation
  const mutation = useMutation({ mutationFn: registerAPI });
  
  // Formik setup for form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      role: "student", // Default to student
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("=== REGISTRATION DEBUG START ===");
        console.log("Registration values being sent:", values);
        console.log("Selected role:", values.role);
        console.log("Role type:", typeof values.role);
        
        const data = await mutation.mutateAsync(values);
        console.log("Registration response from server:", data);
        console.log("Server returned role:", data.role);
        console.log("Server role type:", typeof data.role);
        
        // IMPORTANT: Set user profile immediately after registration
        console.log("Setting user profile in Redux...");
        dispatch(setUserProfile(data));
        
        // Also update auth state from server
        console.log("Checking auth status...");
        await dispatch(checkUserAuthStatus());
        
        console.log("=== REGISTRATION DEBUG END ===");
        
        // Navigate to dashboard after successful registration
        navigate("/dashboard");
      } catch (error) {
        console.log("Registration error:", error);
      }
    },
  });
  
  //get the auth from store
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  //Redirect if a user is login
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            <FaUserGraduate className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
          <p className="text-gray-600">Join thousands of learners and educators worldwide</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Alerts */}
            {mutation.isPending && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-blue-700">Creating your account...</span>
              </div>
            )}
            
            {mutation.isError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <div className="h-5 w-5 text-red-500 mr-3">⚠️</div>
                <span className="text-red-700">
                  {mutation.error.response?.data?.message || mutation.error.message}
                </span>
              </div>
            )}
            
            {mutation.isSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                <div className="h-5 w-5 text-green-500 mr-3">✅</div>
                <span className="text-green-700">Account created successfully!</span>
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <AiOutlineUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white"
                  {...formik.getFieldProps("username")}
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="mr-1">⚠️</span>
                  {formik.errors.username}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <AiOutlineMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white"
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
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Create a secure password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50 focus:bg-white"
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

            {/* Role Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Choose Your Path</label>
              <p className="text-xs text-gray-500 mb-3">
                Currently selected: <span className="font-semibold text-blue-600">{formik.values.role}</span>
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`cursor-pointer rounded-xl p-5 text-center transition-all duration-300 border-2 ${
                    formik.values.role === "student"
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-lg transform scale-105"
                      : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:shadow-md"
                  }`}
                  onClick={() => {
                    console.log("Student role selected");
                    formik.setFieldValue("role", "student");
                    console.log("Current form values after selection:", formik.values);
                  }}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    formik.values.role === "student" ? "bg-blue-100" : "bg-gray-100"
                  }`}>
                    <FaUserGraduate className="text-2xl" />
                  </div>
                  <h3 className="font-semibold text-lg">Student</h3>
                  <p className="text-sm mt-1 opacity-80">Learn from expert instructors</p>
                  <div className="mt-3 text-xs opacity-60">
                    Access courses, track progress, earn certificates
                  </div>
                </div>
                
                <div
                  className={`cursor-pointer rounded-xl p-5 text-center transition-all duration-300 border-2 ${
                    formik.values.role === "instructor"
                      ? "border-green-500 bg-green-50 text-green-700 shadow-lg transform scale-105"
                      : "border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:shadow-md"
                  }`}
                  onClick={() => {
                    console.log("Instructor role selected");
                    formik.setFieldValue("role", "instructor");
                    console.log("Current form values after selection:", formik.values);
                  }}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    formik.values.role === "instructor" ? "bg-green-100" : "bg-gray-100"
                  }`}>
                    <FaChalkboardTeacher className="text-2xl" />
                  </div>
                  <h3 className="font-semibold text-lg">Instructor</h3>
                  <p className="text-sm mt-1 opacity-80">Share your knowledge with others</p>
                  <div className="mt-3 text-xs opacity-60">
                    Create courses, earn revenue, build community
                  </div>
                </div>
              </div>
              {formik.touched.role && formik.errors.role && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="mr-1">⚠️</span>
                  {formik.errors.role}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {mutation.isPending ? "Creating Account..." : "Create Account"}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-100">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700 transition duration-200"
              >
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
