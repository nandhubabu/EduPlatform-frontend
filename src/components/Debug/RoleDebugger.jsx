import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile } from "../../redux/slices/authSlice";

const RoleDebugger = () => {
  const { userProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const switchToInstructor = () => {
    dispatch(setUserProfile({
      ...userProfile,
      role: "instructor"
    }));
  };

  const switchToStudent = () => {
    dispatch(setUserProfile({
      ...userProfile,
      role: "student"
    }));
  };

  return (
    <div className="fixed top-4 right-4 bg-white border-2 border-red-500 p-4 rounded-lg shadow-lg z-50">
      <h3 className="font-bold text-red-600 mb-2">DEBUG: Role Switcher</h3>
      <p className="text-sm mb-2">Current Role: <strong>{userProfile?.role}</strong></p>
      <div className="space-x-2">
        <button 
          onClick={switchToInstructor}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          Switch to Instructor
        </button>
        <button 
          onClick={switchToStudent}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Switch to Student
        </button>
      </div>
    </div>
  );
};

export default RoleDebugger;
