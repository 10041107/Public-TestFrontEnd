import { QuestionType } from "../../types/index";

const getQnAList = async (): Promise<QuestionType[]> => {
  return Promise.resolve([
    {
    num: 1,
    q: "북한과의 종전선언은 해야한다.",
    t: "여기서의 북한과의 종전선언은, 한국과 북한이 전쟁을 끝내고 평화협정을 맺는 것을 의미합니다.",
    a: [
        { "option": "1", "text": "전혀 아니다.", "score": 1 },
        { "option": "2", "text": "약간 아니다.", "score": 2 },
        { "option": "3", "text": "약간 그렇다.", "score": 3 },
        { "option": "4", "text": "매우 그렇다.", "score": 4 }
      ]
    },
    {
    num: 2,
    q: "대북 유화정책은 대북 제재정책보다 효과적이다.",
    t:"대북 유화정책이란, 북한과의 관계를 개선하기 위해 경제적, 외교적으로 협력하는 정책이고, 대북 제재정책이란, 북한의 비핵화와 같은 목표를 달성하기 위해 경제적, 외교적으로 압박을 가하는 정책입니다.",
    a: [
        { "option": "1", "text": "매우 그렇다.", "score": 1 },
        { "option": "2", "text": "약간 그렇다.", "score": 2 },
        { "option": "3", "text": "약간 아니다.", "score": 3 },
        { "option": "4", "text": "전혀 아니다.", "score": 4 }
      ]
    },
    {
    num: 3,
    q: "양안 전쟁은 우리와 무관하다.",
    t:"양안 전쟁이란, 중국과 대만 사이의 전쟁을 의미합니다. '양안'은 중국과 대만을 가리키는 표현입니다.",
    a: [
        { "option": "1", "text": "매우 그렇다.", "score": 1 },
        { "option": "2", "text": "약간 그렇다.", "score": 2 },
        { "option": "3", "text": "약간 아니다.", "score": 3 },
        { "option": "4", "text": "전혀 아니다.", "score": 4 }
      ]
    },
    {
    num: 4,
    q: "한국과 일본과의 군사협력을 강화해야한다.",
    t:" ",
    a: [
        { "option": "1", "text": "전혀 아니다.", "score": 1 },
        { "option": "2", "text": "약간 아니다.", "score": 2 },
        { "option": "3", "text": "약간 그렇다.", "score": 3 },
        { "option": "4", "text": "매우 그렇다.", "score": 4 }
      ]
    },
    {
    num: 5,
    q: "3불(不) 정책은 외교적으로 이득이 된다.",
    t:"3불(不) 정책이란, 한국이 사드 추가 배치, 미국의 미사일 방어체계 편입, 한미일 군사동맹을 하지 않겠다는 정책입니다.",
    a: [
        { "option": "1", "text": "매우 그렇다.", "score": 1 },
        { "option": "2", "text": "약간 그렇다.", "score": 2 },
        { "option": "3", "text": "약간 아니다.", "score": 3 },
        { "option": "4", "text": "전혀 아니다.", "score": 4 }
      ]
    },
    {
    num: 6,
    q: "한국에는 구조적인 성차별이 존재한다.",
    t:"구조적인 성차별은, 사회의 구조 속에 깊이 자리 잡은 성차별을 의미합니다. 예를 들어, 유리천장(여성이 승진에서 차별받는 현상)과 기울어진 운동장(성별에 따른 불평등한 출발점)이 있습니다.",
    a: [
        { "option": "1", "text": "매우 그렇다.", "score": 1 },
        { "option": "2", "text": "약간 그렇다.", "score": 2 },
        { "option": "3", "text": "약간 아니다.", "score": 3 },
        { "option": "4", "text": "전혀 아니다.", "score": 4 }
      ]
    },
    {
    num: 7,
    q: "소형모듈원전은 개발, 도입되어야 한다.",
    t:"300MWe 규모 이하의 소형 원자로입니다. 대형 원전에 비해 원자로를 비롯한 기자재의 크기가 작아 차량 이동 및 조립이 용이한 장점이 있으나, 방사성 폐기물이 발생한다는 문제가 있습니다.",
    a: [
        { "option": "1", "text": "전혀 아니다.", "score": 1 },
        { "option": "2", "text": "약간 아니다.", "score": 2 },
        { "option": "3", "text": "약간 그렇다.", "score": 3 },
        { "option": "4", "text": "매우 그렇다.", "score": 4 }
      ]
    },
    {
    num: 8,
    q: "종합부동산세를 완화해야한다.",
    t:"종합부동산세란, 일정 금액 이상의 부동산을 소유한 사람들에게 부과되는 세금입니다.",
    a: [
        { "option": "1", "text": "전혀 아니다.", "score": 1 },
        { "option": "2", "text": "약간 아니다.", "score": 2 },
        { "option": "3", "text": "약간 그렇다.", "score": 3 },
        { "option": "4", "text": "매우 그렇다.", "score": 4 }
      ]
    },
    {
    num: 9,
    q: "주4일근무제는 비현실적이다.",
    t:"주4일 근무제란, 일주일에 4일만 근무하고 3일은 쉬는 제도를 의미합니다.",
    a: [
        { "option": "1", "text": "전혀 아니다.", "score": 1 },
        { "option": "2", "text": "약간 아니다.", "score": 2 },
        { "option": "3", "text": "약간 그렇다.", "score": 3 },
        { "option": "4", "text": "매우 그렇다.", "score": 4 }
      ]
    },
    {
    num: 10,
    q: "50인 미만 사업장에 대해서도 중대재해처벌법이 적용되어야 한다.",
    t:"중대재해처벌법이란, 사업주가 안전 확보 의무를 소홀히 하여 중대한 산업재해나 시민재해가 발생할 경우 사업주를 처벌하는 법률입니다.",
    a: [
        { "option": "1", "text": "매우 그렇다.", "score": 1 },
        { "option": "2", "text": "약간 그렇다.", "score": 2 },
        { "option": "3", "text": "약간 아니다.", "score": 3 },
        { "option": "4", "text": "전혀 아니다.", "score": 4 }
      ]
    },
    {
    num: 11,
    q: "전세사기특별법은 추진되어야 한다.",
    t:"전세사기특별법이란, 전세 사기를 당한 사람들을 보호하고 지원하기 위한 특별 법안입니다.",
    a: [
        { "option": "1", "text": "매우 그렇다.", "score": 1 },
        { "option": "2", "text": "약간 그렇다.", "score": 2 },
        { "option": "3", "text": "약간 아니다.", "score": 3 },
        { "option": "4", "text": "전혀 아니다.", "score": 4 }
      ]
    },
    {
    num: 12,
    q: "상속,증여세율을 낮춰야 한다.",
    t:"상속, 증여세율이란, 상속이나 증여를 받을 때 부과되는 세금의 비율을 의미합니다.",
    a: [
        { "option": "1", "text": "전혀 아니다.", "score": 1 },
        { "option": "2", "text": "약간 아니다.", "score": 2 },
        { "option": "3", "text": "약간 그렇다.", "score": 3 },
        { "option": "4", "text": "매우 그렇다.", "score": 4 }
      ]
    },
    {
    num: 13,
    q: "민생회복지원금을 지급하는 것이 국민에게 이득이 된다.",
    t:"민생회복지원금이란, 정부가 국민에게 경제적 지원을 하기 위해 25만원씩 지급하는 것을 의미합니다.",
    a: [
        { "option": "1", "text": "매우 그렇다.", "score": 1 },
        { "option": "2", "text": "약간 그렇다.", "score": 2 },
        { "option": "3", "text": "약간 아니다.", "score": 3 },
        { "option": "4", "text": "전혀 아니다.", "score": 4 }
      ]
    },
    {
    num: 14,
    q: "현행 3천억 원의 지역화폐 예산을 더욱 늘려야 한다.",
    t:"지역화폐란, 특정 지역 내에서만 사용할 수 있는 화폐로, 지역 경제 활성화를 목적으로 합니다.",
    a: [
        { "option": "1", "text": "매우 그렇다.", "score": 1 },
        { "option": "2", "text": "약간 그렇다.", "score": 2 },
        { "option": "3", "text": "약간 아니다.", "score": 3 },
        { "option": "4", "text": "전혀 아니다.", "score": 4 }
      ]
    },
    {
    num: 15,
    q: "공기업의 민영화는 시장 경쟁력을 증대시키고 효율성을 높일 수 있다.",
    t:"공기업을 민간 기업으로 전환하는 것을 의미합니다.",
    a: [
        { "option": "1", "text": "전혀 아니다.", "score": 1 },
        { "option": "2", "text": "약간 아니다.", "score": 2 },
        { "option": "3", "text": "약간 그렇다.", "score": 3 },
        { "option": "4", "text": "매우 그렇다.", "score": 4 }
      ]
    },
    {
    num: 16,
    q: "민주유공자법은 시행되어야 한다.",
    t:"민주유공자법이란, 민주화 운동 관련 부상자와 그 가족들을 유공자로 예우하는 법입니다.",
    a: [
        { "option": "1", "text": "매우 그렇다.", "score": 1 },
        { "option": "2", "text": "약간 그렇다.", "score": 2 },
        { "option": "3", "text": "약간 아니다.", "score": 3 },
        { "option": "4", "text": "전혀 아니다.", "score": 4 }
      ]
    },
    {
    num: 17,
    q: "농산물 가격안정제는 시행되어야 한다.",
    t:"농산물 가격안정제란, 농산물 가격이 일정 기준 이하로 하락할 경우 생산자에게 차액을 지원하는 제도입니다.",
    a: [
        { "option": "1", "text": "매우 그렇다.", "score": 1 },
        { "option": "2", "text": "약간 그렇다.", "score": 2 },
        { "option": "3", "text": "약간 아니다.", "score": 3 },
        { "option": "4", "text": "전혀 아니다.", "score": 4 }
      ]
    },
    {
    num: 18,
    q: "가맹사업법은 시행되어야 한다.",
    t:"가맹사업법이란, 프랜차이즈 가맹점주가 본사를 상대로 단체 교섭할 수 있도록 하는 법입니다.",
    a: [
        { "option": "1", "text": "매우 그렇다.", "score": 1 },
        { "option": "2", "text": "약간 그렇다.", "score": 2 },
        { "option": "3", "text": "약간 아니다.", "score": 3 },
        { "option": "4", "text": "전혀 아니다.", "score": 4 }
      ]
    },
    {
    num: 19,
    q: "노란봉투법은 시행되어야 한다.",
    t:"노란봉투법이란, 사용자의 범위를 확대하고, 노동쟁의 범위를 확대하며, 손해배상 청구를 제한하는 법입니다.",
    a: [
        { "option": "1", "text": "매우 그렇다.", "score": 1 },
        { "option": "2", "text": "약간 그렇다.", "score": 2 },
        { "option": "3", "text": "약간 아니다.", "score": 3 },
        { "option": "4", "text": "전혀 아니다.", "score": 4 }
      ]
    },
    {
    num: 20,
    q: "한국은 공권력의 힘이 강하므로 제한 혹은 축소시켜야 한다.",
    t:"공권력이란, 군, 경찰, 검찰과 같은 국가의 권력을 의미합니다.",
    a: [
        { "option": "1", "text": "매우 그렇다.", "score": 1 },
        { "option": "2", "text": "약간 그렇다.", "score": 2 },
        { "option": "3", "text": "약간 아니다.", "score": 3 },
        { "option": "4", "text": "전혀 아니다.", "score": 4 }
      ]
    }
  ]);
};

export { getQnAList };