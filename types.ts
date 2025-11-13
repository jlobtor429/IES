export interface Question {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface GeneratedContent {
  text: string;
  questions: Question[];
}
