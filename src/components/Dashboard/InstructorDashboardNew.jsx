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
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 relative overflow-hidden py-0">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Enhanced Header */}
      <div className="bg-white/3 backdrop-blur-xl border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="h-20 w-20 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                <FaChalkboardTeacher className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Hello, {userProfile?.username || "Instructor"}!
                </h1>
                <p className="text-slate-400 mt-2 text-lg">Inspire and educate your students today</p>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-[0_0_10px_rgba(16,185,129,0.05)]">
                    <FaDollarSign className="mr-1" />
                    ${instructorStats.monthlyEarnings} this month
                  </div>
                  <div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-[0_0_10px_rgba(245,158,11,0.05)]">
                    <FaStar className="mr-1" />
                    {instructorStats.averageRating} rating
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/3 border border-white/5 px-4 py-3 rounded-xl hidden lg:block text-center min-w-[120px]">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Students</div>
                <div className="text-white text-lg font-bold mt-0.5">{instructorStats.totalStudents.toLocaleString()}</div>
              </div>
              <Link
                to="/"
                className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-5 py-3 rounded-xl transition duration-200 flex items-center space-x-2 border border-white/10 font-semibold text-sm"
              >
                <FaHome />
                <span>Back to Home</span>
              </Link>
              <Link
                to="/instructor-add-course"
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 text-white px-5 py-3 rounded-xl transition duration-200 flex items-center space-x-2 shadow-[0_0_20px_rgba(124,58,237,0.3)] font-semibold text-sm"
              >
                <FaPlus />
                <span>Create Course</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/3 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl hover:border-purple-500/20 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] transition duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-400">Total Courses</p>
                <p className="text-3xl font-bold text-white mt-1">{instructorStats.totalCourses}</p>
                <p className="text-xs text-purple-400 flex items-center mt-2 font-medium">
                  <FaArrowUp className="mr-1" />
                  +2 this month
                </p>
              </div>
              <div className="bg-purple-500/10 p-4 rounded-xl group-hover:scale-110 transition duration-300">
                <FaBookOpen className="text-purple-400 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/3 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl hover:border-cyan-500/20 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-400">Total Students</p>
                <p className="text-3xl font-bold text-white mt-1">{instructorStats.totalStudents.toLocaleString()}</p>
                <p className="text-xs text-cyan-400 flex items-center mt-2 font-medium">
                  <FaArrowUp className="mr-1" />
                  +156 this month
                </p>
              </div>
              <div className="bg-cyan-500/10 p-4 rounded-xl group-hover:scale-110 transition duration-300">
                <FaUsers className="text-cyan-400 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/3 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl hover:border-emerald-500/20 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-400">Total Earnings</p>
                <p className="text-3xl font-bold text-white mt-1">${instructorStats.totalEarnings.toLocaleString()}</p>
                <p className="text-xs text-emerald-400 flex items-center mt-2 font-medium">
                  <FaArrowUp className="mr-1" />
                  +12% this month
                </p>
              </div>
              <div className="bg-emerald-500/10 p-4 rounded-xl group-hover:scale-110 transition duration-300">
                <FaDollarSign className="text-emerald-400 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white/3 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl hover:border-amber-500/20 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-400">Average Rating</p>
                <p className="text-3xl font-bold text-white mt-1">{instructorStats.averageRating}</p>
                <p className="text-xs text-amber-400 flex items-center mt-2 font-medium">
                  <FaStar className="mr-1 text-xs" />
                  {instructorStats.totalReviews} reviews
                </p>
              </div>
              <div className="bg-amber-500/10 p-4 rounded-xl group-hover:scale-110 transition duration-300">
                <FaStar className="text-amber-400 text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Courses */}
            <div className="bg-white/3 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl">
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">My Courses</h2>
                    <p className="text-slate-400 text-sm mt-1">Manage and track your course performance</p>
                  </div>
                  <Link
                    to="/instructor-courses"
                    className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center transition duration-200"
                  >
                    View All <FaArrowUp className="ml-1 rotate-45 text-xs" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {myCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 border border-white/5 bg-[#090b11]/30 rounded-xl hover:border-purple-500/20 hover:bg-[#090b11]/50 transition duration-200 group"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                          <FaBookOpen className="text-purple-400 text-2xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <h3 className="font-semibold text-white truncate text-base">{course.title}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                              course.status === 'published'
                                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            }`}>
                              {course.status}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                              course.difficulty === 'Beginner' ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' :
                              course.difficulty === 'Intermediate' ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' :
                              'bg-rose-500/10 text-rose-300 border-rose-500/20'
                            }`}>
                              {course.difficulty}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-400">
                            <span className="flex items-center">
                              <FaUsers className="mr-1 text-slate-500" />
                              {course.students} students
                            </span>
                            <span className="flex items-center">
                              <FaStar className="mr-1 text-amber-400" />
                              {course.rating} rating
                            </span>
                            <span className="flex items-center">
                              <FaDollarSign className="mr-1 text-slate-500" />
                              ${course.earnings}
                            </span>
                            <span className="flex items-center">
                              <FaClock className="mr-1 text-slate-500" />
                              {course.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 md:w-1/4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-slate-400">Completion</span>
                            <span className="font-semibold text-white">{course.completion}%</span>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full rounded-full transition-all duration-300"
                              style={{ width: `${course.completion}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Link
                          to={`/instructor-update-course/${course.id}`}
                          className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition duration-200 text-sm"
                        >
                          <FaEdit />
                        </Link>
                        <Link
                          to={`/courses/${course.id}`}
                          className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-lg transition duration-200 text-sm"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          to="/dashboard"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition duration-200 text-sm"
                        >
                          <FaChartBar />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/3 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl">
              <div className="p-6 border-b border-white/5">
                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                <p className="text-slate-400 text-sm mt-1">Latest updates from your courses</p>
              </div>
              <div className="p-6">
                <div className="space-y-5">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className={`p-2.5 rounded-xl border flex-shrink-0 ${
                        activity.type === 'enrollment' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        activity.type === 'review' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        activity.type === 'completion' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      }`}>
                        {activity.type === 'enrollment' && <FaUsers className="text-sm" />}
                        {activity.type === 'review' && <FaStar className="text-sm" />}
                        {activity.type === 'completion' && <FaGraduationCap className="text-sm" />}
                        {activity.type === 'earning' && <FaDollarSign className="text-sm" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-200 font-medium leading-relaxed">{activity.message}</p>
                        <div className="flex items-center space-x-2 mt-1.5 text-xs text-slate-400">
                          <p>{activity.time}</p>
                          <span className="text-slate-600">•</span>
                          <p className="text-indigo-400 font-semibold">{activity.course}</p>
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
            <div className="bg-white/3 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl">
              <div className="p-6 border-b border-white/5">
                <h3 className="text-lg font-bold text-white">Monthly Performance</h3>
                <p className="text-slate-400 text-sm mt-1">Track your growth</p>
              </div>
              <div className="p-6 space-y-4">
                {monthlyStats.map((stat, index) => (
                  <div key={stat.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                      <span className="font-semibold text-slate-200 text-sm">{stat.month}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">{stat.students} students</p>
                      <p className="text-xs text-slate-400 mt-0.5">${stat.earnings}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white/3 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl">
              <div className="p-6 border-b border-white/5">
                <h3 className="text-lg font-bold text-white">Upcoming Tasks</h3>
                <p className="text-slate-400 text-sm mt-1">Stay organized</p>
              </div>
              <div className="p-6 space-y-5">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-3">
                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border tracking-wider mt-1 ${
                      task.priority === 'high' ? 'bg-rose-500/10 text-rose-300 border-rose-500/20' :
                      task.priority === 'medium' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                    }`}>
                      {task.priority}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm truncate">{task.task}</p>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">{task.course}</p>
                      <p className="text-xs text-purple-400 font-semibold mt-1">Due: {task.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-900/60 to-cyan-900/60 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 text-white shadow-xl shadow-purple-900/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
              <h3 className="text-lg font-bold mb-1.5">Ready to Create?</h3>
              <p className="text-slate-300 text-xs mb-5 leading-relaxed">Share your knowledge and inspire students worldwide</p>
              <div className="space-y-3">
                <Link
                  to="/instructor-add-course"
                  className="bg-white text-slate-900 px-4 py-2.5 rounded-xl hover:bg-slate-100 transition duration-200 flex items-center space-x-2 font-bold text-sm w-full justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  <FaPlus className="text-xs" />
                  <span>New Course</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl transition duration-200 flex items-center space-x-2 font-bold text-sm border border-white/10 w-full justify-center"
                >
                  <FaChartLine className="text-xs" />
                  <span>View Dashboard</span>
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
