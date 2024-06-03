
import { QuestionType } from "../../types/index";

const getQnAList = async (): Promise<QuestionType[]> => {
    return Promise.resolve([
      {
          num: 1,
          q: "북한에 경제적 지원을 해야 한다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "인도주의적 차원에서 필요하다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "고민은 되지만 필요하다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "북한 정권의 확답이 없다면 안 된다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "절대로 해서는 안 된다.", "score": 4}
          ]
      },
      {
          num: 2,
          q: "미국의 한반도 문제 개입이 도움이 된다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "우리민족끼리 해결해야 한다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "개입은 필요하지만 최소화해야 한다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "어느 정도 개입은 필요하다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "매우 적극적으로 개입해야 한다.", "score": 4},
          ]
      },
      {
          num: 3,
          q: "개성공단 프로젝트가 남북간 화합에 도움이 된다고 보시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "중요한 프로젝트다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "남북 관계 개선에 긍정적이다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "유용하지만 면밀히 고려해야 한다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "국가안보를 위협한다.", "score": 4},
          ]
      },
      {
          num: 4,
          q: "현재 국방비 지출 수준을 어떻게 조정해야 한다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "국방비는 손해다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "현상 유지 정도면 괜찮다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "조금은 늘려야 한다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "다른 예산을 줄이고 늘려야 한다.", "score": 4},
          ]
      },
      {
          num: 5,
          q: "한국에 성차별이 존재한다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "심각할 정도다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "약간 있다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "없다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "오히려 역차별이 존재한다.", "score": 4},
          ]
      },
      {
          num: 6,
          q: "원전 정책에 대해 어떻게 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "원전에 매우 부정적이다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "있는 것은 가동하되 점차 줄여야 한다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "친환경 에너지로 가는 방향성은 옳지만 아직 시기상조다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "원전 효율이 가장 좋으므로 적극적으로 늘려야 한다.", "score": 4},
          ]
      },
      {
          num: 7,
          q: "한국의 공권력이 너무 강하다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "최대한 힘을 빼야 한다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "그렇지만 필요하다고는 생각한다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "그러나 강화시키는 것은 부담스럽다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "오히려 강화시켜야 한다.", "score": 4},
          ]
      },
      {
          num: 8,
          q: "이민자와 난민을 받아들이는 것에 대해 어떻게 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "매우 그렇다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "약간 그렇다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "약간 아니다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "전혀 아니다.", "score": 4},
          ]
      },
      {
          num: 9,
          q: "정부가 사회적 소수자 보호를 위해 개입하는 것이 필요하다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "반드시 필요하다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "어느 정도 필요하다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "약간 부정적이다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "반대한다.", "score": 4},
          ]
      },
      {
          num: 10,
          q: "부자에게 더 많은 세금을 부과해서 대중을 위해 사용해야 한다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "매우 그렇다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "약간 그렇다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "약간 아니다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "전혀 아니다.", "score": 4},
          ]
      },
      {
          num: 11,
          q: "대기업보다 중소기업과 소상공인을 더 지원해야 한다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "매우 그렇다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "약간 그렇다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "약간 아니다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "전혀 아니다.", "score": 4},
          ]
      },
      {
          num: 12,
          q: "한국은 정부의 규제가 너무 많아 기업하기 어려운 환경이라고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "전혀 아니다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "약간 아니다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "약간 그렇다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "매우 그렇다.", "score": 4},
          ]
      },
      {
          num: 13,
          q: "정부가 시장에 적극적으로 개입해서 민생을 안정시키는 것이 중요하다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "매우 그렇다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "약간 그렇다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "약간 아니다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "전혀 아니다.", "score": 4},
          ]
      },
      {
          num: 14,
          q: "최저임금을 올릴 수 있을만큼 최대한 올리는 것이 좋다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "매우 그렇다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "약간 그렇다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "약간 아니다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "전혀 아니다.", "score": 4},
          ]
      },
      {
          num: 15,
          q: "사형제도가 필요하다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "매우 그렇다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "약간 그렇다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "약간 아니다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "전혀 아니다.", "score": 4},
          ]
      },
      {
          num: 16,
          q: "전면적인 무상급식이 필요하다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "매우 그렇다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "약간 그렇다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "약간 아니다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "전혀 아니다.", "score": 4},
          ]
      },
      {
          num: 17,
          q: "법은 엄벌보다 인류의 보편적인 평등을 위해 존재한다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "매우 그렇다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "약간 그렇다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "약간 아니다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "전혀 아니다.", "score": 4},
          ]
      },
      {
          num: 18,
          q: "노조나 단체를 결성하여 파업 및 시위를 하는 것은 당연한 권리라고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "매우 그렇다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "약간 그렇다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "약간 아니다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "전혀 아니다.", "score": 4},
          ]
      },
      {
          num: 19,
          q: "공기업의 민영화가 시장 경쟁력을 증대시키고 효율성을 높일 수 있다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "전혀 아니다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "약간 아니다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "약간 그렇다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "매우 그렇다.", "score": 4},
          ]
      },
      {
          num: 20,
          q: "대기업과 중소기업, 소상공인 간의 경제 지원이 공정하다고 생각하시나요?",
          a: [
              {"option": "1", "dialogue": "그렇다.", "text": "전혀 아니다.", "score": 1},
              {"option": "2", "dialogue": "약간 그렇다.", "text": "약간 아니다.", "score": 2},
              {"option": "3", "dialogue": "약간 아니다.", "text": "약간 그렇다.", "score": 3},
              {"option": "4", "dialogue": "아니다.", "text": "매우 그렇다.", "score": 4},
          ]
      }
    ]);
  };
  
  export { getQnAList };
  