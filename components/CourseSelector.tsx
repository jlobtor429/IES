import React from 'react';

interface CourseSelectorProps {
  courses: string[];
  onSelect: (course: string) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ courses, onSelect }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        1. Selecciona tu curso
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {courses.map((course) => (
          <button
            key={course}
            onClick={() => onSelect(course)}
            className="p-6 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-transform duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            {course}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseSelector;
