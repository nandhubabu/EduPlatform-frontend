import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaEdit, FaArrowLeft, FaSpinner } from "react-icons/fa";
import AlertMessage from "../../Alert/AlertMessage";
import {
  getSingleCourseAPI,
  updateCourseAPI,
} from "../../../reactQuery/courses/coursesAPI";

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .required("Description is required"),
  difficulty: Yup.string()
    .oneOf(["easy", "medium", "hard"], "Please select a valid difficulty")
    .required("Difficulty is required"),
  duration: Yup.number()
    .positive("Duration must be a positive number")
    .integer("Duration must be a whole number")
    .min(1, "Duration must be at least 1 hour")
    .max(1000, "Duration must be less than 1000 hours")
    .required("Duration is required"),
});

const UpdateCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  // Fetch course data
  const {
    data: courseDetails,
    error: fetchError,
    isLoading: isFetching,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getSingleCourseAPI(courseId),
    enabled: !!courseId,
  });

  // Update mutation
  const mutation = useMutation({
    mutationFn: updateCourseAPI,
    onSuccess: () => {
      navigate(`/instructor-courses/${courseId}`);
    },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: courseDetails?.title || "",
      description: courseDetails?.description || "",
      difficulty: courseDetails?.difficulty || "",
      duration: courseDetails?.duration || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const courseData = {
        ...values,
        courseId,
        duration: Number(values.duration),
      };
      mutation.mutate(courseData);
    },
  });

  // Loading state
  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <FaSpinner className="animate-spin text-blue-500 text-3xl mx-auto mb-4" />
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Course</h2>
          <p className="text-gray-600 mb-4">
            {fetchError?.response?.data?.message || "Unable to load course details"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                <FaEdit className="inline mr-3 text-blue-600" />
                Update Course
              </h1>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-8">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Alert Messages */}
              {mutation.isPending && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <div className="flex items-center">
                    <FaSpinner className="animate-spin text-blue-400 mr-3" />
                    <p className="text-blue-700">Updating course...</p>
                  </div>
                </div>
              )}
              
              {mutation.isError && (
                <AlertMessage
                  type="error"
                  message={
                    mutation?.error?.response?.data?.message ||
                    mutation?.error?.message ||
                    "An error occurred while updating the course"
                  }
                />
              )}
              
              {mutation.isSuccess && (
                <AlertMessage
                  type="success"
                  message="Course updated successfully! Redirecting..."
                />
              )}

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="title">
                  Course Title *
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter course title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  {...formik.getFieldProps("title")}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
                )}
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
                  Course Description *
                </label>
                <textarea
                  id="description"
                  placeholder="Enter course description"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-vertical"
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
                )}
              </div>

              {/* Difficulty and Duration Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Difficulty Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="difficulty">
                    Difficulty Level *
                  </label>
                  <select
                    id="difficulty"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    {...formik.getFieldProps("difficulty")}
                  >
                    <option value="">Select difficulty level</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  {formik.touched.difficulty && formik.errors.difficulty && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.difficulty}</p>
                  )}
                </div>

                {/* Duration Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="duration">
                    Duration (hours) *
                  </label>
                  <input
                    id="duration"
                    type="number"
                    min="1"
                    max="1000"
                    placeholder="Enter duration in hours"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    {...formik.getFieldProps("duration")}
                  />
                  {formik.touched.duration && formik.errors.duration && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.duration}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={mutation.isPending || !formik.isValid}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {mutation.isPending ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaEdit className="mr-2" />
                      Update Course
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
