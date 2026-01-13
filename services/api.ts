const API_BASE_URL = 'https://localhost:7029/api';

// Types for API requests and responses
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
  username: string;
  userId: string;
}

export interface UserProfile {
  userId: string;
  username: string;
  email: string;
  points: number;
  role: string;
  totalCasesSolved: number;
  joinedAt: string;
}

export interface CaseListItem {
  id: string;
  title: string;
  description: string;
  difficultyLevel: string;
  imageUrl: string | null;
  isSolved: boolean;
}

export interface Clue {
  id: string;
  title: string;
  content: string;
  unlockCost: number;
  imageUrl: string | null;
  isUnlocked: boolean;
}

export interface Solution {
  correctAnswer: string;
  detailedExplanation: string;
}

export interface CaseDetail {
  id: string;
  title: string;
  description: string;
  fullNarrative: string;
  difficultyLevel: string;
  imageUrl: string | null;
  clues: Clue[];
  userPoints: number;
  cluesFoundCount: number;
  hasBeenSolved: boolean;
  solution?: Solution;
}

export interface CaseProgress {
  unlockedCluesCount: number;
  viewedSuspectsCount: number;
  viewedEvidenceCount: number;
  isSaved: boolean;
  lastSavedAt: string | null;
  totalSuspects: number;
  totalEvidence: number;
  unlockedClueIds: string[];
  viewedSuspectIds: string[];
  viewedEvidenceIds: string[];
}

export interface SaveProgressRequest {
  progressData: string;
  notesData: string | null;
}

export interface SaveProgressResponse {
  isSuccess: boolean;
  message: string;
  savedAt: string;
}

export interface SubmitAnswerRequest {
  caseId: string;
  submittedAnswer: string;
}

export interface SubmitAnswerResponse {
  isCorrect: boolean;
  scoreEarned: number;
  message: string;
  detailedSolution: string | null;
}

export interface SubmitInferenceRequest {
  suspectedPerpetrator: string;
  perpetrationReasoning: string;
  aliasUsed: string | null;
  additionalNotes: string | null;
}

export interface SubmitInferenceResponse {
  id: string;
  suspectedPerpetrator: string;
  perpetrationReasoning: string;
  relatedEvidence: string[];
  aliasUsed: string;
  additionalNotes: string;
  submittedAt: string;
  inferenceStatus: string;
  isCorrect: boolean;
  pointsEarned: number;
}

export interface Suspect {
  id: string;
  suspectId: string;
  fullName: string;
  alias: string | null;
  age: number;
  portraitImageUrl: string | null;
  isCleared: boolean;
  isPrimarySuspect: boolean;
  dangerLevel: string;
}

export interface SuspectDetail {
  id: string;
  suspectId: string;
  basicInfo: {
    fullName: string;
    alias: string | null;
    gender: string;
    age: number;
    birthDate: string | null;
    nationality: string;
    residenceCity: string;
    residenceDistrict: string;
    occupation: string;
    maritalStatus: string;
    portraitImageUrl: string | null;
  };
  physicalAppearance: {
    heightCm: number | null;
    weightKg: number | null;
    hairColor: string;
    hairStyle: string;
    skinColor: string;
    distinctiveFeatures: string[];
    voiceDescription: string;
    typicalClothing: string;
  };
  behaviorProfile: {
    personalityTraits: string[];
    habits: string[];
    interests: string[];
    psychologicalNotes: string;
    modusOperandi: string;
  };
  caseRelation: {
    lastSeenDateTime: string | null;
    relationToVictim: string;
    indirectEvidence: string[];
    alibiStatus: string;
    alibiStatement: string;
    alibiVerificationNotes: string;
    suspicions: string[];
    relatedItems: string[];
  };
  backgroundInfo: {
    financialStress: string;
    socialConflicts: string[];
    residenceHistory: string[];
    backgroundNotes: string;
  };
  digitalFootprint: {
    socialMediaStatus: Record<string, any>;
    typicalOnlineHours: string;
    recentInteractionsWithVictim: string[];
    devices: string[];
    locationClues: string;
  };
  assets: {
    vehicles: string[];
    personalItems: string[];
  };
  riskAssessment: {
    dangerLevel: string;
    cooperationLevel: string;
    flightRisk: string;
    riskAssessmentNotes: string;
  };
  isCleared: boolean;
  isPrimarySuspect: boolean;
}

export interface LeaderboardEntry {
  caseId: string;
  caseTitle: string;
  username: string;
  timeToSolve: string;
}

// Helper function to get auth token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth token
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Helper function to remove auth token
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Generic fetch wrapper with error handling
const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  // Ensure endpoint starts with /
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `https://localhost:7029${path}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return null as T;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication endpoints
export const authApi = {
  register: async (data: RegisterRequest): Promise<string> => {
    return apiFetch<string>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return apiFetch<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// User endpoints
export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    return apiFetch<UserProfile>('/profile');
  },
};

// Case endpoints
export const caseApi = {
  getAllCases: async (): Promise<CaseListItem[]> => {
    return apiFetch<CaseListItem[]>('/api/cases');
  },

  getCaseDetail: async (caseId: string): Promise<CaseDetail> => {
    return apiFetch<CaseDetail>(`/cases/${caseId}`);
  },

  getCaseProgress: async (caseId: string): Promise<CaseProgress> => {
    return apiFetch<CaseProgress>(`/cases/${caseId}/progress`);
  },

  saveProgress: async (
    caseId: string,
    data: SaveProgressRequest
  ): Promise<SaveProgressResponse> => {
    return apiFetch<SaveProgressResponse>(`/cases/${caseId}/save-progress`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  submitAnswer: async (data: SubmitAnswerRequest): Promise<SubmitAnswerResponse> => {
    return apiFetch<SubmitAnswerResponse>('/cases/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  submitInference: async (
    caseId: string,
    data: SubmitInferenceRequest
  ): Promise<SubmitInferenceResponse> => {
    return apiFetch<SubmitInferenceResponse>(`/cases/${caseId}/submit-inference`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Suspect endpoints
export const suspectApi = {
  getSuspects: async (caseId: string): Promise<Suspect[]> => {
    return apiFetch<Suspect[]>(`/cases/${caseId}/suspects`);
  },

  getSuspectDetail: async (suspectId: string): Promise<SuspectDetail> => {
    return apiFetch<SuspectDetail>(`/suspects/${suspectId}`);
  },
};

// Clue endpoints
export const clueApi = {
  unlockClue: async (clueId: string): Promise<Clue> => {
    return apiFetch<Clue>(`/clues/${clueId}/unlock`, {
      method: 'POST',
    });
  },
};

// Leaderboard endpoints
export const leaderboardApi = {
  getLeaderboard: async (): Promise<LeaderboardEntry[]> => {
    return apiFetch<LeaderboardEntry[]>('/leaderboard');
  },
};

// Admin endpoints
export const adminApi = {
  createCase: async (data: any): Promise<string> => {
    return apiFetch<string>('/admin/cases', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateCase: async (caseId: string, data: any): Promise<string> => {
    return apiFetch<string>(`/admin/cases/${caseId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteCase: async (caseId: string): Promise<void> => {
    return apiFetch<void>(`/admin/cases/${caseId}`, {
      method: 'DELETE',
    });
  },
};

