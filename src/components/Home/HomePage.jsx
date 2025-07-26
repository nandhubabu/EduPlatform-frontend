import React from "react";
import {
  FaLaptopCode,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBrain,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Homepage = () => {
  const { userProfile } = useSelector((state) => state.auth);
  const isStudent = userProfile?.role === "student";

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center p-12">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to the Learning Platform
        </h1>
        <p className="text-xl mb-8">
          Empower your skills with our comprehensive courses and discover your perfect career path
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            to="/courses"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors no-underline"
          >
            Explore Courses
          </Link>
          {isStudent && (
            <Link 
              to="/assessment"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2 no-underline"
            >
              <FaBrain className="text-lg" />
              <span>Explore Career Paths</span>
            </Link>
          )}
        </div>
      </div>

      {/* Assessment CTA Section for Students */}
      {isStudent && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <FaBrain className="text-6xl text-purple-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Discover Your Ideal Career Path
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Take our comprehensive career interest assessment to discover careers that align with your passions. 
              Based on proven methodology used by career counselors and trusted by millions worldwide.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <FaBrain className="text-3xl text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Smart Assessment</h3>
                <p className="text-gray-600 text-sm">Interactive questions designed to reveal your true interests</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <FaLaptopCode className="text-3xl text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Proven Method</h3>
                <p className="text-gray-600 text-sm">Based on Holland's research-backed career interest model</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <FaUserGraduate className="text-3xl text-purple-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Personalized Results</h3>
                <p className="text-gray-600 text-sm">Get matched with careers tailored to your unique profile</p>
              </div>
            </div>
            <Link 
              to="/assessment"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg no-underline"
            >
              Discover Your Career Match
            </Link>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl text-center font-bold mb-10">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center">
            <FaLaptopCode className="text-blue-600 mx-auto text-6xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Latest Technologies</h3>
            <p>
              Learn with the latest tools and technologies in the field of web
              development.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="text-center">
            <FaUserGraduate className="text-green-600 mx-auto text-6xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
            <p>
              Guidance from industry professionals with real-world experience.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="text-center">
            <FaChalkboardTeacher className="text-red-600 mx-auto text-6xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Interactive Learning</h3>
            <p>
              Engaging and interactive lessons to enhance your learning
              experience.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section - Only show for non-authenticated users */}
      {!userProfile && (
        <div className="bg-gray-100 text-center py-12">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Learning Journey Today
          </h2>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold">
            Sign Up Now
          </button>
        </div>
      )}

      {/* Welcome Back Section - Show for authenticated users */}
      {userProfile && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 text-center py-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Welcome Back, {userProfile.name}!
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            {userProfile.role === 'student' 
              ? 'Continue your learning journey and explore new courses' 
              : 'Manage your courses and help students achieve their goals'
            }
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/courses"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors no-underline"
            >
              {userProfile.role === 'student' ? 'Browse Courses' : 'View All Courses'}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
