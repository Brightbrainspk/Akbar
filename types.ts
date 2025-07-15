
export interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

export type QuizStatus = 'idle' | 'fetching'| 'active' | 'finished';

export type Screen = 'splash' | 'home' | 'quiz' | 'results';
