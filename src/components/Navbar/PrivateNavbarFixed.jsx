import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaBookOpen, 
  FaUser, 
  FaChalkboardTeacher, 
  FaGraduationCap, 
  FaCog, 
  FaSignOutAlt,
  FaPlus,
  FaTachometerAlt,
  FaUsers,
  FaChartLine,
  FaHome
} from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  //get the user from store
  const { userProfile } = useSelector((state) => state.auth);
  //isAdmin
  const isAdmin = userProfile?.role === "admin";
  const isInstructor = userProfile?.role === "instructor";
  const isStudent = userProfile?.role === "student";

  //navigate
  const navigate = useNavigate();
  //dispatch
  const dispatch = useDispatch();

  //logout handler
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <FaGraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    EduPlatform
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:space-x-6">
                {/* Universal Home Link - Always Visible */}
                <Link
                  to="/"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200 border-r border-gray-200 mr-2"
                >
                  <FaHome className="text-sm" />
                  <span>Home</span>
                </Link>

                {/* Student Navigation */}
                {isStudent && (
                  <>
                    <Link
                      to="/courses"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
                    >
                      <FaBookOpen className="text-sm" />
                      <span>Browse Courses</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
                    >
                      <FaTachometerAlt className="text-sm" />
                      <span>Dashboard</span>
                    </Link>
                  </>
                )}

                {/* Instructor Navigation */}
                {isInstructor && (
                  <>
                    <Link
                      to="/instructor/courses"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition duration-200"
                    >
                      <FaBookOpen className="text-sm" />
                      <span>My Courses</span>
                    </Link>
                    <Link
                      to="/instructor/courses/new"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition duration-200"
                    >
                      <FaPlus className="text-sm" />
                      <span>Create Course</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition duration-200"
                    >
                      <FaTachometerAlt className="text-sm" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/instructor/analytics"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition duration-200"
                    >
                      <FaChartLine className="text-sm" />
                      <span>Analytics</span>
                    </Link>
                  </>
                )}

                {/* Admin Navigation */}
                {isAdmin && (
                  <>
                    <Link
                      to="/add-course"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition duration-200"
                    >
                      <FaPlus className="text-sm" />
                      <span>Add Course</span>
                    </Link>
                    <Link
                      to="/admin-courses"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition duration-200"
                    >
                      <FaBookOpen className="text-sm" />
                      <span>Manage Courses</span>
                    </Link>
                    <Link
                      to="/admin-course-sections"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition duration-200"
                    >
                      <FaUsers className="text-sm" />
                      <span>Course Sections</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition duration-200"
                    >
                      <FaTachometerAlt className="text-sm" />
                      <span>Admin Panel</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Right side items */}
              <div className="flex items-center space-x-4">
                {/* Mobile menu button */}
                <div className="md:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* User Menu - Desktop */}
                <div className="hidden md:flex md:items-center md:space-x-3">
                  {/* Notifications */}
                  <button className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition duration-200">
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative">
                    <div>
                      <Menu.Button className="relative flex items-center space-x-3 rounded-lg bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-gray-100 transition duration-200">
                        <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <FaUser className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {userProfile?.username || "User"}
                        </span>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isAdmin ? 'bg-purple-100 text-purple-800' :
                          isInstructor ? 'bg-indigo-100 text-indigo-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {userProfile?.role || 'student'}
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-100">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard"
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 font-medium"
                              )}
                            >
                              <FaTachometerAlt className="text-gray-400" />
                              <span>Dashboard</span>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/settings"
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 font-medium"
                              )}
                            >
                              <FaCog className="text-gray-400" />
                              <span>Settings</span>
                            </Link>
                          )}
                        </Menu.Item>
                        <hr className="my-1" />
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutHandler}
                              className={classNames(
                                active ? "bg-red-50" : "",
                                "flex items-center space-x-2 px-4 py-2 text-sm text-red-700 font-medium w-full text-left"
                              )}
                            >
                              <FaSignOutAlt className="text-red-400" />
                              <span>Sign out</span>
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="md:hidden border-t border-gray-200">
            <div className="space-y-1 px-4 py-3 bg-gray-50">
              {/* Universal Home Link - Always Visible */}
              <Link
                to="/"
                className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200 border-b border-gray-200 mb-2"
              >
                <FaHome />
                <span>Home</span>
              </Link>

              {/* Student Mobile Navigation */}
              {isStudent && (
                <>
                  <Link
                    to="/courses"
                    className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                  >
                    <FaBookOpen />
                    <span>Browse Courses</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                  >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                  </Link>
                </>
              )}

              {/* Instructor Mobile Navigation */}
              {isInstructor && (
                <>
                  <Link
                    to="/instructor/courses"
                    className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200"
                  >
                    <FaBookOpen />
                    <span>My Courses</span>
                  </Link>
                  <Link
                    to="/instructor/courses/new"
                    className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200"
                  >
                    <FaPlus />
                    <span>Create Course</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200"
                  >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/instructor/analytics"
                    className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200"
                  >
                    <FaChartLine />
                    <span>Analytics</span>
                  </Link>
                </>
              )}

              {/* Admin Mobile Navigation */}
              {isAdmin && (
                <>
                  <Link
                    to="/add-course"
                    className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition duration-200"
                  >
                    <FaPlus />
                    <span>Add Course</span>
                  </Link>
                  <Link
                    to="/admin-courses"
                    className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition duration-200"
                  >
                    <FaBookOpen />
                    <span>Manage Courses</span>
                  </Link>
                  <Link
                    to="/admin-course-sections"
                    className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition duration-200"
                  >
                    <FaUsers />
                    <span>Course Sections</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition duration-200"
                  >
                    <FaTachometerAlt />
                    <span>Admin Panel</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Profile section */}
            <div className="border-t border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <FaUser className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-base font-medium text-gray-800">
                    {userProfile?.username || "User"}
                  </div>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    isAdmin ? 'bg-purple-100 text-purple-800' :
                    isInstructor ? 'bg-indigo-100 text-indigo-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {userProfile?.role || 'student'}
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <Link
                  to="/settings"
                  className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition duration-200"
                >
                  <FaCog />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={logoutHandler}
                  className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-red-700 hover:bg-red-50 rounded-lg transition duration-200 w-full text-left"
                >
                  <FaSignOutAlt />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
