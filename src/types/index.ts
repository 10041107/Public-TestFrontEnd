export type AnswerType = {
  option: string;
  dialogue: string;
  text: string;
  score: number;
}

export type QuestionType = {
  num: number; // 질문 번호
  q: string; // 질문 내용
  t: string; // 팁 내용
  a: AnswerType[]; // 각 옵션에 대한 응답
}
