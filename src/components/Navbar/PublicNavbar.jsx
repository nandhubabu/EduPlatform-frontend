import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { 
  FaBookOpen, 
  FaGraduationCap, 
  FaHome,
  FaLightbulb,
  FaTrophy,
  FaSignInAlt,
  FaUserPlus
} from "react-icons/fa";

export default function PublicNavbar() {
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
                <Link
                  to="/"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
                >
                  <FaHome className="text-sm" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/courses"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
                >
                  <FaBookOpen className="text-sm" />
                  <span>Browse Courses</span>
                </Link>
                <Link
                  to="/assessment"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
                >
                  <FaLightbulb className="text-sm" />
                  <span>Career Explorer</span>
                </Link>
                <Link
                  to="/success"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
                >
                  <FaTrophy className="text-sm" />
                  <span>Success Stories</span>
                </Link>
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

                {/* Auth Buttons - Desktop */}
                <div className="hidden md:flex md:items-center md:space-x-3">
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
                  >
                    <FaSignInAlt className="text-sm" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200 shadow-sm"
                  >
                    <FaUserPlus className="text-sm" />
                    <span>Get Started</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="md:hidden border-t border-gray-100">
            <div className="px-4 py-3 space-y-2">
              <Disclosure.Button
                as={Link}
                to="/"
                className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
              >
                <FaHome className="text-sm" />
                <span>Home</span>
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/courses"
                className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
              >
                <FaBookOpen className="text-sm" />
                <span>Browse Courses</span>
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/assessment"
                className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
              >
                <FaLightbulb className="text-sm" />
                <span>Career Explorer</span>
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/success"
                className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
              >
                <FaTrophy className="text-sm" />
                <span>Success Stories</span>
              </Disclosure.Button>
              
              {/* Mobile Auth Buttons */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <Disclosure.Button
                  as={Link}
                  to="/login"
                  className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
                >
                  <FaSignInAlt className="text-sm" />
                  <span>Sign In</span>
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  to="/register"
                  className="flex items-center space-x-3 w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200"
                >
                  <FaUserPlus className="text-sm" />
                  <span>Get Started</span>
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
