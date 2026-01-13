export enum CaseStatus {
  NEW = 'Mới',
  IN_PROGRESS = 'Đang điều tra',
  SOLVED = 'Đã giải quyết',
}

export enum Difficulty {
  EASY = 'Dễ',
  MEDIUM = 'Trung bình',
  HARD = 'Khó',
}

export interface Case {
  id: string;
  title: string;
  description: string;
  status: CaseStatus;
  difficulty: Difficulty;
  progress: number;
  image: string; // Background image for cards/details
}

export interface Clue {
  id: string;
  title: string;
  description: string;
  status: 'locked' | 'unlocked' | 'viewed';
  cost?: number; // Cost to unlock in XP/Points
  image: string;
  type: 'document' | 'fingerprint' | 'digital' | 'object';
}

export interface HistoryLog {
  id: string;
  caseName: string;
  date: string;
  score: number;
  maxScore: number;
  timeSpent: string;
  accuracy: number;
  hintsUsed: string[];
  finalSolution: string;
  deductionSteps: string[];
}
