
import React, { useEffect, useRef, useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';

interface QuizScreenProps {
  onFinishQuiz: () => void;
}

declare global {
    interface Window {
        MathJax: any;
    }
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onFinishQuiz }) => {
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    finishQuiz,
    timer,
    setTimer
  } = useQuiz();

  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerId);
          finishQuiz();
          onFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishQuiz, onFinishQuiz, setTimer]);

  useEffect(() => {
    if (questionRef.current && window.MathJax) {
      window.MathJax.typesetClear([questionRef.current]);
      window.MathJax.typesetPromise([questionRef.current]);
    }
  }, [currentQuestionIndex, questions]);
  
  const currentQuestion = questions[currentQuestionIndex];
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  
  const progressPercentage = useMemo(() => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  }, [currentQuestionIndex, questions.length]);

  if (!currentQuestion) {
    return (
      <Layout>
        <p>Loading quiz...</p>
      </Layout>
    );
  }

  const handleFinish = () => {
      finishQuiz();
      onFinishQuiz();
  }

  return (
    <Layout>
      <div 
        className="w-full max-w-4xl p-8 rounded-3xl shadow-2xl border border-gray-700 bg-center"
        style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(15, 52, 96, 0.7), rgba(26, 26, 46, 0.9))',
            backgroundBlendMode: 'overlay',
            backgroundColor: '#1a1a2e'
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-bold text-gray-300">Question {currentQuestionIndex + 1}/{questions.length}</div>
          <div className="text-2xl font-bold text-yellow-400 tabular-nums">
            <span className="inline-block w-8">{String(minutes).padStart(2, '0')}</span>:<span className="inline-block w-8">{String(seconds).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
          <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        
        {/* Question */}
        <div ref={questionRef} className="text-2xl font-semibold mb-8 min-h-[100px] text-center flex items-center justify-center p-4 bg-black bg-opacity-20 rounded-lg">
          {currentQuestion.questionText}
        </div>
        
        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => selectAnswer(currentQuestionIndex, index)}
              className={`
                p-4 rounded-lg text-left text-lg font-medium border-2 transition-all duration-200 
                ${userAnswers[currentQuestionIndex] === index 
                  ? 'bg-yellow-500 border-yellow-400 text-black scale-105 shadow-lg' 
                  : 'bg-indigo-900 bg-opacity-50 border-blue-700 hover:bg-opacity-80 hover:border-blue-500'}
              `}
            >
              <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
              <span ref={(el) => { if (el && window.MathJax) { window.MathJax.typesetClear([el]); window.MathJax.typesetPromise([el]); } }}>{option}</span>
            </button>
          ))}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <Button variant="secondary" onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          
          {currentQuestionIndex === questions.length - 1 ? (
             <Button variant="primary" onClick={handleFinish}>
               Submit Test
             </Button>
          ) : (
            <Button variant="secondary" onClick={nextQuestion}>
              Next
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QuizScreen;