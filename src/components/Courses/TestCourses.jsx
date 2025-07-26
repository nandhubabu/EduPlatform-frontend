import React, { useEffect, useState } from 'react';
import { getAllCoursesAPI } from '../../reactQuery/courses/coursesAPI';

const TestCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log('Fetching courses...');
        const data = await getAllCoursesAPI();
        console.log('Courses data received:', data);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="p-8">Loading courses...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Test Courses Page</h1>
      <p className="mb-4">Found {courses.length} courses</p>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold">{course.title}</h3>
            <p className="text-gray-600">{course.description}</p>
            <p className="text-sm text-blue-600">
              Difficulty: {course.difficulty} | Duration: {course.duration}
            </p>
            <p className="text-sm text-gray-500">
              Instructor: {course.user?.username || 'Unknown'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCourses;
