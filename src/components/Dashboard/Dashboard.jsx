import React from "react";
import { useSelector } from "react-redux";
import StudentDashboard from "./StudentDashboardNew";
import InstructorDashboard from "./InstructorDashboardNew";

const Dashboard = () => {
  const { userProfile, isAuthenticated, loading } = useSelector((state) => state.auth);

  // Debug logging to help identify the issue
  console.log("Dashboard Debug Info:", {
    userProfile,
    role: userProfile?.role,
    isAuthenticated,
    loading,
    timestamp: new Date().toISOString()
  });

  // Additional specific role check debug
  console.log("Role check details:", {
    roleValue: userProfile?.role,
    roleType: typeof userProfile?.role,
    isExactlyInstructor: userProfile?.role === "instructor",
    isExactlyStudent: userProfile?.role === "student"
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to access your dashboard.</p>
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // Route to appropriate dashboard based on user role
  console.log("Checking user role for dashboard routing:", {
    userRole: userProfile?.role,
    userProfile: userProfile,
    willShowInstructorDashboard: userProfile?.role === "instructor"
  });
  
  if (userProfile?.role === "instructor") {
    console.log("Rendering InstructorDashboard");
    return <InstructorDashboard />;
  } else {
    console.log("Rendering StudentDashboard for role:", userProfile?.role);
    return <StudentDashboard />;
  }
};

export default Dashboard;
