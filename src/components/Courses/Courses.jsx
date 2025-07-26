import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import {
  FaBookOpen,
  FaUser,
  FaUsers,
  FaLayerGroup,
  FaStar,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaBrain,
  FaHeart,
  FaGraduationCap,
  FaChevronDown,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { getAllCoursesAPI } from "../../reactQuery/courses/coursesAPI";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AlertMessage from "../Alert/AlertMessage";

// Course API functions
import axios from 'axios';
import { BASE_URL } from "../../utils/utils";

const fetchPersonalizedRecommendations = async () => {
  const response = await axios.get(`${BASE_URL}/courses/recommendations/personalized`, {
    withCredentials: true,
  });
  return response.data;
};

const searchCourses = async (query, filters = {}) => {
  const params = new URLSearchParams({
    query: query || "",
    ...filters,
  });
  
  const response = await axios.get(`${BASE_URL}/courses/search?${params}`, {
    withCredentials: true,
  });
  return response.data;
};

const enrollInCourse = async (courseId) => {
  const response = await axios.post(`${BASE_URL}/courses/${courseId}/enroll`, {}, {
    withCredentials: true,
  });
  return response.data;
};

const CourseCard = ({ course, isRecommended = false, onEnroll, currentUser }) => {
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Check if user is already enrolled
  const isEnrolled = currentUser && course?.students?.includes(currentUser._id);
  const isInstructor = currentUser && course?.user?._id === currentUser._id;

  const handleEnroll = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isEnrolled || isInstructor) return;
    
    setIsEnrolling(true);
    try {
      await onEnroll(course._id);
    } catch (error) {
      console.error('Enrollment failed:', error);
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <Link
      to={`/courses/${course._id}`}
      className="no-underline transform hover:scale-105 transition duration-300 relative"
    >
      {isRecommended && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
            <FaBrain className="mr-1" />
            AI Pick
          </div>
        </div>
      )}
      
      <div className={`bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl ${
        isRecommended ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''
      }`}>
        <div className="p-6">
          <div className="text-center">
            <FaBookOpen className={`mx-auto text-7xl mb-6 ${
              isRecommended ? 'text-yellow-500' : 'text-blue-600'
            }`} />
            <h3 className="text-3xl font-bold mb-3 text-gray-800">
              {course?.title}
            </h3>
            <p className="text-gray-700 mb-4 line-clamp-3">{course.description}</p>
          </div>
          
          <div className="text-sm space-y-3">
            {/* Instructor */}
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <FaUser className="text-blue-600" />
                <span>{course?.user?.username}</span>
              </span>
              <span className="text-blue-500 font-medium">
                {course?.difficulty || course?.level}
              </span>
            </div>
            
            {/* Total students and estimated hours */}
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <FaUsers className="text-blue-600" />
                <span>{course?.students?.length || 0} Students</span>
              </span>
              {course?.estimatedHours && (
                <span className="flex items-center space-x-1 text-green-600">
                  <FaClock />
                  <span className="text-xs">{course.estimatedHours}h</span>
                </span>
              )}
            </div>
            
            {/* Category and price */}
            <div className="flex items-center justify-between">
              {course?.category && (
                <span className="text-purple-500 font-medium text-xs bg-purple-100 px-2 py-1 rounded">
                  {course.category}
                </span>
              )}
              {course?.price !== undefined && (
                <span className="text-green-600 font-bold">
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </span>
              )}
            </div>
            
            {/* Total modules and rating */}
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <FaLayerGroup className="text-blue-600" />
                <span>{course?.modules?.length || course?.sections?.length || 0} Modules</span>
              </span>
              {course?.rating > 0 && (
                <span className="flex items-center space-x-1">
                  <FaStar className="text-yellow-500" />
                  <span>{course.rating.toFixed(1)}</span>
                </span>
              )}
            </div>

            {/* Enroll button */}
            <div className="pt-3">
              {isInstructor ? (
                <div className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                  <FaGraduationCap />
                  <span>Your Course</span>
                </div>
              ) : isEnrolled ? (
                <div className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                  <FaCheckCircle />
                  <span>Enrolled</span>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isEnrolling ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Enrolling...</span>
                    </>
                  ) : (
                    <>
                      <FaGraduationCap />
                      <span>Enroll Now</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [enrollmentMessage, setEnrollmentMessage] = useState("");

  const { isAuthenticated, userProfile } = useSelector((state) => state.auth);
  const isLoggedIn = isAuthenticated;

  // Query for all courses
  const { data: coursesData, error, isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCoursesAPI,
    staleTime: 0,
    cacheTime: 0,
  });

  // Query for personalized recommendations (only if logged in)
  const { data: recommendationsData, isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ["personalizedRecommendations"],
    queryFn: fetchPersonalizedRecommendations,
    enabled: !!isLoggedIn,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Query for search results
  const { data: searchResults, isLoading: isSearching } = useQuery({
    queryKey: ["courseSearch", searchQuery, selectedDifficulty, selectedCategory],
    queryFn: () => searchCourses(searchQuery, {
      difficulty: selectedDifficulty,
      category: selectedCategory,
      userInterests: isLoggedIn ? "true" : "false"
    }),
    enabled: !!(searchQuery?.length > 0 || selectedDifficulty || selectedCategory),
    staleTime: 30 * 1000, // 30 seconds
  });

  const handleEnrollment = async (courseId) => {
    if (!isLoggedIn) {
      setEnrollmentMessage("Please log in to enroll in courses");
      return;
    }

    try {
      await enrollInCourse(courseId);
      setEnrollmentMessage("Successfully enrolled! Check your dashboard.");
    } catch (error) {
      console.error('Enrollment error:', error);
      
      // Handle specific error cases
      if (error.response?.status === 409) {
        setEnrollmentMessage("You are already enrolled in this course!");
      } else if (error.response?.status === 403) {
        setEnrollmentMessage("Instructors cannot enroll in their own courses.");
      } else {
        setEnrollmentMessage(error.response?.data?.message || error.message || "Enrollment failed. Please try again.");
      }
    }

    // Clear message after 3 seconds
    setTimeout(() => setEnrollmentMessage(""), 3000);
  };

  // Determine which data to display
  const displayData = searchResults?.courses || coursesData;
  const recommendedCourses = recommendationsData?.recommendedCourses || [];
  const hasAssessment = recommendationsData?.hasAssessment;

  // Show loading
  if (isLoading) {
    return <AlertMessage type="loading" message="Loading courses..." />;
  }

  // Show error
  if (isError) {
    return (
      <AlertMessage
        type="error"
        message={error?.response?.data?.message || error?.message}
      />
    );
  }

  const categories = [
    'Web Development', 'Data Science', 'Digital Marketing', 'Design', 
    'Business', 'Cloud Computing', 'Mobile Development', 'AI/Machine Learning',
    'Cybersecurity', 'DevOps'
  ];

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-5xl font-extrabold mb-4 text-gray-800">
          Explore Our Courses
        </h2>
        <p className="text-lg text-gray-700">
          Discover courses tailored to your career goals and interests
        </p>
      </div>

      {/* Enrollment Message */}
      {enrollmentMessage && (
        <div className={`mb-6 p-4 rounded-lg text-center ${
          enrollmentMessage.includes('Successfully') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {enrollmentMessage}
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            <FaFilter />
            <span>Filters</span>
            <FaChevronDown className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Recommendations Section */}
      {isLoggedIn && showRecommendations && recommendedCourses.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaBrain className="text-yellow-500 mr-3" />
              AI-Powered Recommendations
            </h3>
            <button
              onClick={() => setShowRecommendations(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Hide
            </button>
          </div>
          
          {recommendationsData?.aiRecommendations && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">AI Insights:</h4>
              <p className="text-blue-700 text-sm">{recommendationsData.aiRecommendations}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                isRecommended={true}
                onEnroll={handleEnrollment}
                currentUser={userProfile}
              />
            ))}
          </div>
        </div>
      )}

      {/* Assessment CTA for non-assessed users */}
      {isLoggedIn && !hasAssessment && (
        <div className="mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 text-center">
          <FaHeart className="mx-auto text-4xl mb-4" />
          <h3 className="text-2xl font-bold mb-2">Get Personalized Course Recommendations!</h3>
          <p className="mb-4">Take our career assessment to discover courses perfectly matched to your interests and goals.</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
          >
            <FaBrain />
            <span>Take Assessment</span>
          </Link>
        </div>
      )}

      {/* All Courses Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-bold text-gray-800">
            {searchQuery || selectedDifficulty || selectedCategory ? 'Search Results' : 'All Courses'}
          </h3>
          <p className="text-gray-600">
            {displayData?.length || 0} courses found
          </p>
        </div>

        {/* Loading State */}
        {(isSearching && (searchQuery || selectedDifficulty || selectedCategory)) && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching courses...</p>
          </div>
        )}

        {/* No Courses Found */}
        {displayData && displayData.length === 0 && (
          <div className="text-center py-12">
            <FaBookOpen className="mx-auto text-6xl text-gray-400 mb-4" />
            <h4 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h4>
            <p className="text-gray-500">Try adjusting your search criteria or browse all courses.</p>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayData?.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onEnroll={handleEnrollment}
              currentUser={userProfile}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
