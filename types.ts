export interface AnalysisResult {
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  painPoint: string;
  highlight: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}