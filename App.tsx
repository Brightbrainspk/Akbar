
import React, { useState, useCallback } from 'react';
import { Screen } from './types';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import { QuizProvider } from './context/QuizContext';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('splash');

  const handleQuizStart = useCallback(() => {
    setScreen('quiz');
  }, []);

  const handleQuizFinish = useCallback(() => {
    setScreen('results');
  }, []);

  const handleRestart = useCallback(() => {
    setScreen('home');
  }, []);
  
  const handleSplashFinish = useCallback(() => {
    setScreen('home');
  }, []);


  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen onFinish={handleSplashFinish} />;
      case 'home':
        return <HomeScreen onStartQuiz={handleQuizStart} />;
      case 'quiz':
        return <QuizScreen onFinishQuiz={handleQuizFinish} />;
      case 'results':
        return <ResultScreen onRestart={handleRestart} />;
      default:
        return <HomeScreen onStartQuiz={handleQuizStart} />;
    }
  };

  return (
    <QuizProvider>
      <div className="bg-[#1a1a2e] min-h-screen text-white font-sans">
        {renderScreen()}
      </div>
    </QuizProvider>
  );
};

export default App;