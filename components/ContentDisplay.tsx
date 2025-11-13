import React from 'react';
import type { GeneratedContent } from '../types';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface ContentDisplayProps {
  content: GeneratedContent;
  course: string;
  subject: string;
  onReset: () => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, course, subject, onReset }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in w-full max-w-4xl mx-auto">
      <header className="mb-6 border-b pb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Lección de <span className="text-blue-600">{subject}</span>
        </h2>
        <p className="text-md text-gray-500">{course}</p>
      </header>

      <article className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Texto de la lección</h3>
        <div className="prose max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
          {content.text}
        </div>
      </article>

      <section>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Preguntas de Comprensión</h3>
        <div className="space-y-6">
          {content.questions.map((q, qIndex) => (
            <div key={qIndex} className="p-4 border border-gray-200 rounded-lg">
              <p className="font-semibold text-gray-800 mb-3">{qIndex + 1}. {q.questionText}</p>
              <ul className="space-y-2">
                {q.options.map((option, oIndex) => {
                  const isCorrect = oIndex === q.correctAnswerIndex;
                  return (
                    <li
                      key={oIndex}
                      className={`flex items-center p-3 rounded-md transition-colors ${
                        isCorrect
                          ? 'bg-green-100 border-l-4 border-green-500'
                          : 'bg-gray-50'
                      }`}
                    >
                      {isCorrect && <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />}
                      <span className={`flex-grow ${isCorrect ? 'font-bold text-green-800' : 'text-gray-700'}`}>
                        {option}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-8 text-center">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors"
        >
          Crear otra lección
        </button>
      </footer>
    </div>
  );
};

export default ContentDisplay;
