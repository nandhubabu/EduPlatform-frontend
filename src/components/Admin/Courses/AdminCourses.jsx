import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaBookOpen,
  FaUser,
  FaUsers,
  FaLayerGroup,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllCoursesAPI } from "../../../reactQuery/courses/coursesAPI";
import { useSelector } from "react-redux";

const AdminCourses = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCoursesAPI,
  });

  const { userProfile, loading: userLoading } = useSelector((state) => state.auth);

  // Defensive: userProfile or coursesCreated may be undefined
  const userCourses = userProfile?.coursesCreated ?? [];

  // Loading state
  if (userLoading || isLoading) {
    return (
      <div className="container mx-auto p-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Loading...</h2>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          Error loading courses.
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-gray-100">
      <h2 className="text-6xl font-extrabold mb-12 text-center text-gray-800">
        Explore Our Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Show message if no courses */}
        {userCourses.length === 0 && (
          <h2 className="col-span-3 text-center text-2xl text-gray-500">No Courses Found</h2>
        )}
        {userCourses.map((course) => (
          <Link
            key={course._id}
            to={`/instructor-courses/${course._id}`}
            className="no-underline transform hover:scale-105 transition duration-300"
          >
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="p-8">
                <div className="text-center">
                  <FaBookOpen className="mx-auto text-blue-500 text-7xl mb-6" />
                  <h3 className="text-3xl font-bold mb-4 text-gray-800">
                    {course?.title}
                  </h3>
                  <p className="text-gray-700 mb-6">{course?.description}</p>
                </div>
                <div className="text-sm space-y-4">
                  {/* Instructor */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FaUser className="text-blue-500" />
                      <span>{course?.user?.username ?? "Unknown"}</span>
                    </span>
                    <span className="text-blue-600 font-medium">
                      {course?.difficulty ?? "N/A"}
                    </span>
                  </div>
                  {/* Total students */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FaUsers className="text-blue-500" />
                      <span>{course?.students?.length ?? 0} Students</span>
                    </span>
                    <span className="text-blue-600 font-medium">
                      {course?.createdAt
                        ? new Date(course.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                  {/* Total sections */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FaLayerGroup className="text-blue-500" />
                      <span>{course?.sections?.length ?? 0} Sections</span>
                    </span>
                    <span className="text-green-600 font-bold cursor-pointer hover:text-green-700 transition-colors duration-300">
                      Enroll Now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
