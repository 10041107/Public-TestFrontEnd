export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

// 클래스 이름 병합 함수 (classNames.ts) : tailwind코드
// 이 코드는 여러 개의 CSS 클래스 이름을 하나의 문자열로 병합하는 유틸리티 함수입니다.

// 함수 cls는 가변 인자(...classnames)를 받아들이며, 이는 여러 개의 문자열을 배열 형태로 받을 수 있음을 의미합니다.
// classnames.join(" ")는 전달된 클래스 이름들을 공백 한 칸을 사이에 두고 하나의 문자열로 병합합니다.
// 이 함수는 여러 개의 클래스를 조건에 따라 동적으로 적용할 때 유용합니다.
// 예를 들어, cls('btn', 'btn-primary', 'active')를 호출하면 결과는 'btn btn-primary active'가 됩니다.

// 이 두 코드는 각각 HTTP 요청을 간편하게 하기 위한 axios 인스턴스와 CSS 클래스 이름을 효율적으로 병합하기 위한 유틸리티 함수입니다.

