import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import assessmentService from "../../services/assessmentService";
import { getEnrolledCourses } from "../../services/courseService";
import EnrolledCourses from "../Courses/EnrolledCourses";
import {
  FaBookOpen,
  FaGraduationCap,
  FaClock,
  FaTrophy,
  FaArrowRight,
  FaPlay,
  FaChartLine,
  FaAward,
  FaFire,
  FaCalendarAlt,
  FaUserGraduate,
  FaPlus,
  FaArrowUp,
  FaStar,
  FaHome,
  FaBrain,
  FaBullseye,
  FaClipboardList,
  FaHistory,
  FaRedo,
} from "react-icons/fa";

const StudentDashboard = () => {
  const { userProfile } = useSelector((state) => state.auth);
  const [assessmentResults, setAssessmentResults] = useState([]);
  const [latestAssessment, setLatestAssessment] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [coursesProgress, setCoursesProgress] = useState([]);

  // Load assessment results and enrolled courses on component mount and when user returns to dashboard
  useEffect(() => {
    loadAssessmentResults();
    loadEnrolledCoursesAndProgress();
    
    // Listen for assessment completion events
    const handleAssessmentComplete = () => {
      console.log('Assessment completed event received, refreshing dashboard...');
      setTimeout(() => {
        loadAssessmentResults();
        loadEnrolledCoursesAndProgress();
      }, 1000); // Small delay to ensure backend has processed the data
    };

    window.addEventListener('assessmentCompleted', handleAssessmentComplete);
    
    // Also reload when component becomes visible (user returns from assessment or other pages)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadAssessmentResults();
        loadEnrolledCoursesAndProgress();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('assessmentCompleted', handleAssessmentComplete);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const loadAssessmentResults = async () => {
    try {
      // Load from localStorage first for immediate display
      const results = JSON.parse(localStorage.getItem('assessmentResults') || '[]');
      const latest = JSON.parse(localStorage.getItem('latestAssessmentResult') || 'null');
      setAssessmentResults(results);
      setLatestAssessment(latest);

      // Then try to fetch from backend API for updated data
      try {
        const allResults = await assessmentService.getAssessmentResults();
        const latestResult = await assessmentService.getLatestAssessmentResult();
        
        // Only update if we got valid data from backend
        if (allResults.results) {
          setAssessmentResults(allResults.results);
        }
        if (latestResult.result) {
          setLatestAssessment(latestResult.result);
        }
      } catch (apiError) {
        console.log('Backend API not available, using localStorage data:', apiError);
      }
    } catch (localError) {
      console.error('Error loading assessment results:', localError);
    }
  };

  const loadEnrolledCoursesAndProgress = async () => {
    try {
      // 1. Fetch enrolled courses
      try {
        const coursesData = await getEnrolledCourses();
        if (coursesData && coursesData.enrolledCourses) {
          setEnrolledCourses(coursesData.enrolledCourses);
        }
      } catch (coursesError) {
        console.error('Error loading enrolled courses:', coursesError);
      }

      // 2. Fetch user profile with progress
      try {
        const profileResponse = await axios.get(`${BASE_URL}/users/profile`, {
          withCredentials: true,
        });
        if (profileResponse?.data?.user?.progress) {
          setCoursesProgress(profileResponse.data.user.progress);
        }
      } catch (profileError) {
        console.error('Error loading user profile progress:', profileError);
      }
    } catch (error) {
      console.error('General error loading dashboard data:', error);
    }
  };

  const getCourseProgress = (courseId) => {
    const progressEntry = coursesProgress.find((p) => {
      const entryCourseId = p.courseId?._id || p.courseId;
      return entryCourseId?.toString() === courseId?.toString();
    });
    if (!progressEntry || !progressEntry.sections || progressEntry.sections.length === 0) {
      return 0;
    }
    const completed = progressEntry.sections.filter(
      (s) => s.status === "Completed"
    ).length;
    return Math.round((completed / progressEntry.sections.length) * 100);
  };

  const getInterestIcon = (interest) => {
    const icons = {
      technology: FaClipboardList,
      creative: FaBrain,
      analytical: FaChartLine,
      education: FaGraduationCap,
      business: FaBullseye
    };
    return icons[interest] || FaClipboardList;
  };

  const getInterestColor = (interest) => {
    const colors = {
      technology: 'blue',
      creative: 'purple',
      analytical: 'green',
      education: 'orange',
      business: 'red'
    };
    return colors[interest] || 'blue';
  };

  // Real stats calculated dynamically
  const studentStats = {
    coursesEnrolled: enrolledCourses.length,
    coursesCompleted: enrolledCourses.filter((c) => getCourseProgress(c._id) === 100).length,
    certificatesEarned: enrolledCourses.filter((c) => getCourseProgress(c._id) === 100).length,
    studyStreak: userProfile?.studyStreak || 0,
    totalHours: enrolledCourses.reduce((sum, c) => {
      const hours = parseFloat(c.estimatedHours) || 0;
      return sum + Math.round(hours * (getCourseProgress(c._id) / 100));
    }, 0),
    weeklyGoal: 5,
    weeklyCompleted: enrolledCourses.filter((c) => getCourseProgress(c._id) === 100).length,
  };

  // Real enrolled courses
  const currentCourses = enrolledCourses.map((course) => ({
    id: course._id,
    title: course.title,
    instructor: course.user?.username || "Instructor",
    progress: getCourseProgress(course._id),
  }));

  const achievements = [];
  const upcomingDeadlines = [];
  const recentActivity = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="h-20 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <FaUserGraduate className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Welcome back, {userProfile?.username || "Student"}!
                </h1>
                <p className="text-gray-600 mt-2 text-lg">Continue your learning journey and achieve your goals</p>
                <div className="flex items-center space-x-4 mt-3">
                  {studentStats.studyStreak > 0 && (
                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <FaFire className="mr-1" />
                      {studentStats.studyStreak} day streak
                    </div>
                  )}
                  {studentStats.coursesEnrolled === 0 && (
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      🚀 New Member — Start your journey!
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-4 py-3 rounded-xl">
                <div className="text-green-700 text-sm font-medium">Weekly Goal</div>
                <div className="text-green-900 text-lg font-bold">{studentStats.weeklyCompleted}/{studentStats.weeklyGoal} courses</div>
              </div>
              <Link
                to="/"
                className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:from-gray-200 hover:to-gray-300 transition duration-200 flex items-center space-x-2 shadow-lg font-medium border border-gray-300"
              >
                <FaHome />
                <span>Back to Home</span>
              </Link>
              <Link
                to="/courses"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-200 flex items-center space-x-2 shadow-lg font-medium"
              >
                <FaPlus />
                <span>Browse Courses</span>
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
                <p className="text-sm font-medium text-gray-600">Courses Enrolled</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{studentStats.coursesEnrolled}</p>
                <p className="text-sm text-gray-400 flex items-center mt-2">
                  {studentStats.coursesEnrolled === 0 ? 'No courses yet' : `${studentStats.coursesEnrolled} active`}
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
                <p className="text-sm font-medium text-gray-600">Completed Courses</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{studentStats.coursesCompleted}</p>
                <p className="text-sm text-gray-400 flex items-center mt-2">
                  {studentStats.coursesEnrolled > 0
                    ? `${Math.round((studentStats.coursesCompleted / studentStats.coursesEnrolled) * 100)}% completion rate`
                    : 'Enroll to get started'}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl group-hover:scale-110 transition duration-300">
                <FaGraduationCap className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Learning Hours</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{studentStats.totalHours}h</p>
                <p className="text-sm text-gray-400 flex items-center mt-2">
                  {studentStats.totalHours === 0 ? 'Start learning today' : `${studentStats.totalHours}h total`}
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl group-hover:scale-110 transition duration-300">
                <FaClock className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Certificates</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{studentStats.certificatesEarned}</p>
                <p className="text-sm text-gray-400 flex items-center mt-2">
                  {studentStats.certificatesEarned === 0 ? 'Complete courses to earn' : `${studentStats.certificatesEarned} earned`}
                </p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-xl group-hover:scale-110 transition duration-300">
                <FaTrophy className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Career Assessment Results Section */}
        {latestAssessment && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-100 p-3 rounded-xl">
                    <FaBrain className="text-indigo-600 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Your Career Assessment</h2>
                    <p className="text-gray-600">Last taken: {assessmentService.formatDate(latestAssessment.completedAt)}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Link
                    to="/assessment"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                  >
                    <FaRedo className="text-sm" />
                    <span>Retake Assessment</span>
                  </Link>
                  {assessmentResults.length > 1 && (
                    <button
                      onClick={() => {/* TODO: Show assessment history modal */}}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200 flex items-center space-x-2"
                    >
                      <FaHistory className="text-sm" />
                      <span>View History ({assessmentResults.length})</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top 3 Interest Areas */}
                {latestAssessment.topInterests && latestAssessment.topInterests.slice(0, 3).map((interest, index) => {
                  const interestInfo = assessmentService.getInterestAreaInfo(interest);
                  return (
                    <div key={interest} className={`${interestInfo.bgColor} rounded-xl p-6 border ${interestInfo.borderColor}`}>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {index === 0 ? 'Primary Interest' : index === 1 ? 'Secondary Interest' : 'Third Interest'}
                      </h3>
                      <div className="flex items-center space-x-3 mb-4">
                        <FaBrain className={`${interestInfo.color} text-2xl`} />
                        <span className="text-lg font-bold text-gray-900">
                          {interestInfo.name}
                        </span>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-3">{interestInfo.description}</p>
                        {latestAssessment.scores && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Interest Score</span>
                            <span className="text-sm font-semibold text-gray-900">
                              {latestAssessment.scores[interest] || 0}/20
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Career Recommendations */}
              {latestAssessment.recommendations && latestAssessment.recommendations.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Career Paths</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {latestAssessment.recommendations.slice(0, 6).map((career, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                        <h4 className="font-semibold text-gray-900 mb-2">{career.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{career.description}</p>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Growth:</span>
                            <span className="text-gray-700">{career.growth}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Education:</span>
                            <span className="text-gray-700">{career.education}</span>
                          </div>
                          {career.matchScore && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">Match Score:</span>
                              <span className="text-blue-600 font-semibold">{career.matchScore}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* No Assessment CTA */}
        {!latestAssessment && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-sm text-white mb-8">
            <div className="p-8 text-center">
              <FaBrain className="text-4xl mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl font-bold mb-3">Discover Your Ideal Career Path</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Take our comprehensive career assessment to receive personalized recommendations 
                based on your interests, skills, and personality. Get insights into careers that 
                truly match who you are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/assessment"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-200 flex items-center space-x-2"
                >
                  <FaBullseye />
                  <span>Take Career Assessment</span>
                </Link>
                <div className="text-blue-100 text-sm">
                  ⏱️ Takes 10-15 minutes • Get instant results
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
                    <p className="text-gray-600 text-sm mt-1">Pick up where you left off</p>
                  </div>
                  <Link
                    to="/my-courses"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                  >
                    View All <FaArrowRight className="ml-1" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {currentCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaBookOpen className="text-blue-400 text-2xl" />
                    </div>
                    <h3 className="text-gray-700 font-semibold mb-2">No courses yet</h3>
                    <p className="text-gray-500 text-sm mb-6">Enroll in a course to start your learning journey.</p>
                    <Link
                      to="/courses"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 inline-flex items-center space-x-2 font-medium"
                    >
                      <FaPlus className="text-sm" />
                      <span>Browse Courses</span>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {currentCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition duration-200 group"
                      >
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                          <FaBookOpen className="text-blue-600 text-2xl" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium text-gray-900">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            {recentActivity.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                  <p className="text-gray-600 text-sm mt-1">Your learning highlights</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'completion' ? 'bg-green-100' :
                          activity.type === 'certificate' ? 'bg-yellow-100' : 'bg-blue-100'
                        }`}>
                          {activity.type === 'completion' && <FaGraduationCap className="text-green-600 text-sm" />}
                          {activity.type === 'certificate' && <FaAward className="text-yellow-600 text-sm" />}
                          {activity.type === 'enrollment' && <FaBookOpen className="text-blue-600 text-sm" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
                <p className="text-gray-600 text-sm mt-1">Your milestones</p>
              </div>
              <div className="p-6">
                {achievements.length === 0 ? (
                  <div className="text-center py-6">
                    <FaTrophy className="text-gray-300 text-3xl mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Complete courses to earn achievements</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {achievements.slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-3">
                        <div className="p-3 rounded-xl bg-yellow-100">
                          <FaTrophy className="text-yellow-600 text-lg" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{achievement.title}</p>
                          <p className="text-xs text-gray-500">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Deadlines — only show if user has real data */}
            {upcomingDeadlines.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
                  <p className="text-gray-600 text-sm mt-1">Stay on track</p>
                </div>
                <div className="p-6 space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{deadline.assignment}</p>
                        <p className="text-xs text-gray-600">{deadline.course}</p>
                        <p className="text-xs text-gray-500 mt-1">{deadline.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enrolled Courses Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6">
                <EnrolledCourses />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Ready to Learn More?</h3>
              <p className="text-blue-100 text-sm mb-4">Explore new courses and expand your skills</p>
              <Link
                to="/courses"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200 inline-flex items-center space-x-2 font-medium"
              >
                <FaPlus />
                <span>Browse Courses</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
