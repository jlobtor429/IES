import React from 'react';
import BookOpenIcon from './icons/BookOpenIcon';

interface SubjectSelectorProps {
  subjects: string[];
  course: string;
  onSelect: (subject: string) => void;
  onBack: () => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ subjects, course, onSelect, onBack }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Volver
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Asignaturas de <span className="text-blue-600">{course}</span>
        </h2>
        <div className="w-20"></div> {/* Spacer */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => onSelect(subject)}
            className="group flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="p-2 bg-blue-100 rounded-full group-hover:bg-white transition-colors">
              <BookOpenIcon className="h-6 w-6 text-blue-600" />
            </div>
            <span className="ml-4 text-left font-medium text-gray-700 group-hover:text-blue-800">
              {subject}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelector;
