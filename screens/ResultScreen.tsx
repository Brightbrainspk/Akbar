import React, { useState, useMemo, useCallback } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { getExplanation } from '../services/geminiService';
import { Spinner } from '../components/Spinner';

interface ResultScreenProps {
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ onRestart }) => {
  const { questions, userAnswers, resetQuiz, startTime, endTime } = useQuiz();
  const [explanations, setExplanations] = useState<{ [key: number]: string }>({});
  const [loadingExplanations, setLoadingExplanations] = useState<{ [key: number]: boolean }>({});

  const score = useMemo(() => {
    return userAnswers.reduce((acc, answer, index) => {
      return answer === questions[index].correctAnswerIndex ? acc + 1 : acc;
    }, 0);
  }, [userAnswers, questions]);

  const timeTaken = useMemo(() => {
    if (!startTime || !endTime) return 'N/A';
    const diff = (endTime - startTime) / 1000;
    const minutes = Math.floor(diff / 60);
    const seconds = Math.floor(diff % 60);
    return `${minutes}m ${seconds}s`;
  }, [startTime, endTime]);

  const percentage = (score / questions.length) * 100;

  const handleRestartQuiz = () => {
    resetQuiz();
    onRestart();
  };

  const handleGetExplanation = useCallback(async (questionIndex: number) => {
    if (explanations[questionIndex]) return; // Don't fetch if already loaded
    
    setLoadingExplanations(prev => ({ ...prev, [questionIndex]: true }));
    try {
      const question = questions[questionIndex];
      const userAnswer = userAnswers[questionIndex];
      const explanationText = await getExplanation(question, userAnswer);
      setExplanations(prev => ({ ...prev, [questionIndex]: explanationText }));
    } catch (error) {
      console.error(error);
      setExplanations(prev => ({ ...prev, [questionIndex]: "Could not load explanation." }));
    } finally {
      setLoadingExplanations(prev => ({ ...prev, [questionIndex]: false }));
    }
  }, [questions, userAnswers, explanations]);

  return (
    <Layout>
      <div className="w-full max-w-4xl text-center">
        <div className="bg-black bg-opacity-30 p-8 rounded-2xl shadow-2xl border border-gray-700 mb-8">
            <h2 className="text-4xl font-extrabold text-yellow-400 mb-2">Test Complete!</h2>
            <p className="text-gray-300 text-lg mb-6">Here's how you performed:</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                <div className="bg-indigo-800 p-4 rounded-lg">
                    <div className="text-sm text-yellow-300">SCORE</div>
                    <div className="text-3xl font-bold">{score}/{questions.length}</div>
                </div>
                <div className="bg-indigo-800 p-4 rounded-lg">
                    <div className="text-sm text-yellow-300">PERCENTAGE</div>
                    <div className="text-3xl font-bold">{percentage.toFixed(1)}%</div>
                </div>
                <div className="bg-indigo-800 p-4 rounded-lg">
                    <div className="text-sm text-yellow-300">TIME TAKEN</div>
                    <div className="text-3xl font-bold">{timeTaken}</div>
                </div>
            </div>
             <Button onClick={handleRestartQuiz} className="mt-8">
                Take Another Test
             </Button>
        </div>

        <div className="w-full max-w-4xl text-left">
            <h3 className="text-2xl font-bold mb-4 text-center">Answer Review</h3>
            <div className="space-y-4">
                {questions.map((q, i) => {
                    const userAnswer = userAnswers[i];
                    const isCorrect = userAnswer === q.correctAnswerIndex;
                    const correctOptionChar = String.fromCharCode(65 + q.correctAnswerIndex);
                    const userOptionChar = userAnswer !== null ? String.fromCharCode(65 + userAnswer) : 'N/A';
                    
                    return (
                        <div key={i} className={`p-4 rounded-lg border-2 ${isCorrect ? 'border-green-500' : 'border-red-500'} bg-black bg-opacity-20`}>
                           <div ref={(el) => { if (el && window.MathJax) { window.MathJax.typesetClear([el]); window.MathJax.typesetPromise([el]); } }}>
                            <p className="font-bold text-lg mb-2">Q{i+1}: {q.questionText}</p>
                            <p className={`text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                Your answer: {userAnswer !== null ? `${userOptionChar}. ${q.options[userAnswer]}` : 'Not answered'}
                            </p>
                            {!isCorrect && (
                                <p className="text-sm text-green-400">Correct answer: {correctOptionChar}. {q.options[q.correctAnswerIndex]}</p>
                            )}
                           </div>
                           <div className="mt-3">
                                {loadingExplanations[i] ? (
                                    <Spinner size="sm" />
                                ) : explanations[i] ? (
                                    <div 
                                        className="text-sm text-gray-300 p-3 bg-gray-800 rounded"
                                        ref={(el) => { if (el && window.MathJax) { window.MathJax.typesetClear([el]); window.MathJax.typesetPromise([el]); } }}
                                    >
                                        {explanations[i]}
                                    </div>
                                ) : (
                                    <Button onClick={() => handleGetExplanation(i)} variant="ghost" className="py-1 px-3 text-xs">
                                        Get Explanation
                                    </Button>
                                )}
                           </div>
                        </div>
                    )
                })}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResultScreen;