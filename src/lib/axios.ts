import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_GLITCH_SERVER,
});

export default instance;


// axios 인스턴스 생성 (axiosInstance.ts)
// 이 코드는 axios 라이브러리를 사용하여 HTTP 요청을 보낼 수 있는 인스턴스를 생성합니다. axios는 HTTP 클라이언트 라이브러리로, 브라우저와 Node.js에서 모두 사용할 수 있습니다.

// axios.create 메서드를 사용하여 기본 설정이 적용된 새로운 axios 인스턴스를 만듭니다.
// baseURL 설정은 모든 요청의 기본 URL을 설정합니다. 여기서는 환경 변수 REACT_APP_GLITCH_SERVER의 값을 사용합니다.
// 이 인스턴스를 기본 내보내기(default export)로 내보내기 때문에, 다른 파일에서 이 인스턴스를 import하여 HTTP 요청을 보낼 수 있습니다