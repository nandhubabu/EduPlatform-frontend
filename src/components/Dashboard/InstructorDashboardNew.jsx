import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaUsers,
  FaChartLine,
  FaDollarSign,
  FaPlus,
  FaPlay,
  FaStar,
  FaEye,
  FaComments,
  FaCalendarAlt,
  FaClock,
  FaAward,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaArrowUp,
  FaArrowDown,
  FaEdit,
  FaChartBar,
  FaHome,
} from "react-icons/fa";

const InstructorDashboard = () => {
  const { userProfile } = useSelector((state) => state.auth);

  // Mock data - replace with real data from API
  const instructorStats = {
    totalCourses: 8,
    totalStudents: 2847,
    totalEarnings: 15420,
    monthlyEarnings: 3200,
    averageRating: 4.7,
    totalReviews: 456,
    completionRate: 78,
    totalHours: 124,
  };

  const myCourses = [
    {
      id: 1,
      title: "Complete React Developer Course",
      students: 1245,
      rating: 4.8,
      earnings: 4850,
      status: "published",
      completion: 85,
      lastUpdated: "2024-01-20",
      thumbnail: "/api/placeholder/300/200",
      difficulty: "Intermediate",
      duration: "32h",
    },
    {
      id: 2,
      title: "Advanced Node.js Development",
      students: 892,
      rating: 4.6,
      earnings: 3220,
      status: "published",
      completion: 72,
      lastUpdated: "2024-01-18",
      thumbnail: "/api/placeholder/300/200",
      difficulty: "Advanced",
      duration: "28h",
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      students: 710,
      rating: 4.9,
      earnings: 2890,
      status: "draft",
      completion: 40,
      lastUpdated: "2024-01-15",
      thumbnail: "/api/placeholder/300/200",
      difficulty: "Beginner",
      duration: "18h",
    },
  ];

  const recentActivity = [
    { id: 1, type: "enrollment", message: "15 new students enrolled in React Course", time: "2 hours ago", course: "React Developer Course" },
    { id: 2, type: "review", message: "New 5-star review on Node.js Course", time: "4 hours ago", course: "Node.js Development" },
    { id: 3, type: "completion", message: "32 students completed JavaScript Fundamentals", time: "1 day ago", course: "JavaScript Fundamentals" },
    { id: 4, type: "earning", message: "Monthly earnings reached $3,200", time: "2 days ago", course: "All Courses" },
  ];

  const upcomingTasks = [
    { id: 1, task: "Update React Course Module 5", priority: "high", dueDate: "2024-02-01", course: "React Course" },
    { id: 2, task: "Record new video lessons", priority: "medium", dueDate: "2024-02-05", course: "Node.js Course" },
    { id: 3, task: "Review student submissions", priority: "medium", dueDate: "2024-02-03", course: "JavaScript Course" },
    { id: 4, task: "Create course certificate", priority: "low", dueDate: "2024-02-10", course: "New Course" },
  ];

  const monthlyStats = [
    { month: "Jan", students: 324, earnings: 2840 },
    { month: "Feb", students: 298, earnings: 3200 },
    { month: "Mar", students: 445, earnings: 4100 },
    { month: "Apr", students: 523, earnings: 4850 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="h-20 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <FaChalkboardTeacher className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Hello, {userProfile?.username || "Instructor"}!
                </h1>
                <p className="text-gray-600 mt-2 text-lg">Inspire and educate your students today</p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <FaDollarSign className="mr-1" />
                    ${instructorStats.monthlyEarnings} this month
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <FaStar className="mr-1" />
                    {instructorStats.averageRating} rating
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 px-4 py-3 rounded-xl">
                <div className="text-purple-700 text-sm font-medium">Total Students</div>
                <div className="text-purple-900 text-lg font-bold">{instructorStats.totalStudents.toLocaleString()}</div>
              </div>
              <Link
                to="/"
                className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:from-gray-200 hover:to-gray-300 transition duration-200 flex items-center space-x-2 shadow-lg font-medium border border-gray-300"
              >
                <FaHome />
                <span>Back to Home</span>
              </Link>
              <Link
                to="/instructor/courses/new"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition duration-200 flex items-center space-x-2 shadow-lg font-medium"
              >
                <FaPlus />
                <span>Create Course</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{instructorStats.totalCourses}</p>
                <p className="text-sm text-blue-600 flex items-center mt-2">
                  <FaArrowUp className="mr-1" />
                  +2 this month
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl group-hover:scale-110 transition duration-300">
                <FaBookOpen className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{instructorStats.totalStudents.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center mt-2">
                  <FaArrowUp className="mr-1" />
                  +156 this month
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl group-hover:scale-110 transition duration-300">
                <FaUsers className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">${instructorStats.totalEarnings.toLocaleString()}</p>
                <p className="text-sm text-purple-600 flex items-center mt-2">
                  <FaArrowUp className="mr-1" />
                  +12% this month
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl group-hover:scale-110 transition duration-300">
                <FaDollarSign className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{instructorStats.averageRating}</p>
                <p className="text-sm text-yellow-600 flex items-center mt-2">
                  <FaStar className="mr-1" />
                  {instructorStats.totalReviews} reviews
                </p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-xl group-hover:scale-110 transition duration-300">
                <FaStar className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Courses */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
                    <p className="text-gray-600 text-sm mt-1">Manage and track your course performance</p>
                  </div>
                  <Link
                    to="/instructor/courses"
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
                  >
                    View All <FaArrowUp className="ml-1 rotate-45" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {myCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition duration-200 group"
                    >
                      <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <FaBookOpen className="text-indigo-600 text-2xl" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {course.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.difficulty === 'Beginner' ? 'bg-blue-100 text-blue-800' :
                            course.difficulty === 'Intermediate' ? 'bg-purple-100 text-purple-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {course.difficulty}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center">
                            <FaUsers className="mr-1 text-xs" />
                            {course.students} students
                          </span>
                          <span className="flex items-center">
                            <FaStar className="mr-1 text-yellow-400 text-xs" />
                            {course.rating} rating
                          </span>
                          <span className="flex items-center">
                            <FaDollarSign className="mr-1 text-xs" />
                            ${course.earnings}
                          </span>
                          <span className="flex items-center">
                            <FaClock className="mr-1 text-xs" />
                            {course.duration}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Completion</span>
                              <span className="font-medium text-gray-900">{course.completion}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.completion}%` }}
                              ></div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">Updated: {course.lastUpdated}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition duration-200">
                          <FaEdit />
                        </button>
                        <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200">
                          <FaEye />
                        </button>
                        <button className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition duration-200">
                          <FaChartBar />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <p className="text-gray-600 text-sm mt-1">Latest updates from your courses</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'enrollment' ? 'bg-blue-100' :
                        activity.type === 'review' ? 'bg-yellow-100' :
                        activity.type === 'completion' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        {activity.type === 'enrollment' && <FaUsers className="text-blue-600 text-sm" />}
                        {activity.type === 'review' && <FaStar className="text-yellow-600 text-sm" />}
                        {activity.type === 'completion' && <FaGraduationCap className="text-green-600 text-sm" />}
                        {activity.type === 'earning' && <FaDollarSign className="text-purple-600 text-sm" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <p className="text-xs text-gray-500">{activity.time}</p>
                          <span className="text-xs text-gray-400">•</span>
                          <p className="text-xs text-indigo-600 font-medium">{activity.course}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Monthly Performance */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Performance</h3>
                <p className="text-gray-600 text-sm mt-1">Track your growth</p>
              </div>
              <div className="p-6 space-y-4">
                {monthlyStats.map((stat, index) => (
                  <div key={stat.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                      <span className="font-medium text-gray-900">{stat.month}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{stat.students} students</p>
                      <p className="text-xs text-gray-600">${stat.earnings}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
                <p className="text-gray-600 text-sm mt-1">Stay organized</p>
              </div>
              <div className="p-6 space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{task.task}</p>
                      <p className="text-xs text-gray-600">{task.course}</p>
                      <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Ready to Create?</h3>
              <p className="text-indigo-100 text-sm mb-4">Share your knowledge with the world</p>
              <div className="space-y-2">
                <Link
                  to="/instructor/courses/new"
                  className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200 inline-flex items-center space-x-2 font-medium w-full justify-center"
                >
                  <FaPlus />
                  <span>New Course</span>
                </Link>
                <Link
                  to="/instructor/analytics"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-400 transition duration-200 inline-flex items-center space-x-2 font-medium w-full justify-center"
                >
                  <FaChartLine />
                  <span>View Analytics</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
