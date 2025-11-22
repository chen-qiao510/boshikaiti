export interface Student {
  rank: number;
  name: string;
  topic: string;
  score: number;
}

export type SearchStatus = 'idle' | 'found' | 'not-found' | 'empty';