import React, { useState, useCallback } from 'react';
import { COURSES, SUBJECTS } from './constants';
import type { GeneratedContent } from './types';
import CourseSelector from './components/CourseSelector';
import SubjectSelector from './components/SubjectSelector';
import ContentDisplay from './components/ContentDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { generateEducationalContent } from './services/geminiService';

type AppState = 'selecting_course' | 'selecting_subject' | 'generating' | 'showing_result' | 'error';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('selecting_course');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    setAppState('selecting_subject');
  };

  const handleSubjectSelect = useCallback(async (subject: string) => {
    if (!selectedCourse) return;
    setSelectedSubject(subject);
    setAppState('generating');
    setContent(null);
    setError(null);

    try {
      const generatedContent = await generateEducationalContent(selectedCourse, subject);
      setContent(generatedContent);
      setAppState('showing_result');
    } catch (err) {
      console.error(err);
      setError('No se pudo generar el contenido. Por favor, inténtalo de nuevo más tarde.');
      setAppState('error');
    }
  }, [selectedCourse]);

  const handleBack = () => {
    setSelectedSubject(null);
    setContent(null);
    setError(null);
    setAppState('selecting_course');
  };
  
  const handleBackToCourse = () => {
    setSelectedSubject(null);
    setContent(null);
    setError(null);
    setAppState('selecting_course');
  }

  const renderContent = () => {
    switch (appState) {
      case 'selecting_course':
        return <CourseSelector courses={COURSES} onSelect={handleCourseSelect} />;
      case 'selecting_subject':
        return (
          <SubjectSelector
            subjects={SUBJECTS[selectedCourse!]}
            course={selectedCourse!}
            onSelect={handleSubjectSelect}
            onBack={handleBackToCourse}
          />
        );
      case 'generating':
        return <LoadingSpinner />;
      case 'showing_result':
        return (
          content &&
          selectedCourse &&
          selectedSubject && (
            <ContentDisplay
              content={content}
              course={selectedCourse}
              subject={selectedSubject}
              onReset={handleBack}
            />
          )
        );
      case 'error':
        return (
          <div className="text-center p-8 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-red-600 mb-4">¡Oops! Algo salió mal</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              Volver a empezar
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          Tutor Inteligente <span className="text-blue-600">ESO</span>
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Tu generador de lecciones y ejercicios personalizados.
        </p>
      </header>
      <main className="w-full max-w-4xl">{renderContent()}</main>
      <footer className="text-center mt-8 text-gray-500 text-sm">
        <p>Potenciado por la API de Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
