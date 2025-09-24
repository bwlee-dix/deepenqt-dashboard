## 1. 핵심 지표 정의 (North Star Metric + 보조 지표)

PRD에 언급된 목표(10월까지 QT 완료율 1% → 10%)를 기준으로, **사용자 Retention/Engagement 중심 지표**가 필요해.

- **NSM (North Star Metric):**
  → _월간 QT 완료율_ (전체 사용자 대비 QT 1회 이상 완료한 사용자 비율)
- **핵심 보조 지표**
  1. **DAU/WAU/MAU** (활성 사용자)
     - 활성의 정의: `QT_START` 이후 1회 이상 interaction 발생한 사용자
  2. **신규 가입자 수** (월간/주간)
  3. **QT 관련 지표**
     - 1인 평균 QT 완료 횟수
     - 2일 이상 QT 완료율
     - QT 진행 중 질문(챗) 평균 횟수
  4. **참여도 지표**
     - 좋아요/싫어요 비율
     - QT 세션 중단율

---

## 2. 데이터 취합 전략

PRD에 나온 Firestore 구조 기준으로 데이터 소스를 매핑하면 이렇게 돼:

- **회원 정보 (u_info, u_setting)**
  - 가입일, 알림 여부, 언어, 테마 → 사용자 세그먼트 구분용
- **QT 세션 (q_chat, q_chat_history)**
  - `action_list`에서 `QT_START`, `QT_BIBLE`, `QT_END` 추적
  - `question`/`answer` → 챗봇과의 상호작용 횟수
  - `is_like`, `is_dislike` → 만족도 지표
- **사용자 활동 (qt_status_list)**
  - QT 플로우 단계별 이탈율 계산 가능
- **GA (Google Analytics)**
  - 현재 데이터 수집 안 됨 → Firestore 기반으로 우선 대시보드 구성 후, GA 이벤트 트래킹 개선해야 함.

👉 우선순위: **Firestore 기반 지표 산출 → GA 이벤트 정의 보완 → 두 데이터 통합**

---

## 3. 대시보드 설계 전략

**대시보드는 운영자 입장에서 빠르게 현황 파악 + 문제점 탐지**에 목적이 있어야 해.

따라서 **3단 레벨**로 나누는 걸 추천해:

1. **Top-level (한눈에 보는 현황)**
   - DAU, 신규 가입자 수, QT 완료율
   - 전월 대비 증감률 (%)
2. **Mid-level (사용자 참여)**
   - 1인당 평균 QT 횟수, 질문 수
   - 2일 이상 QT 완료율
   - 좋아요/싫어요 비율
3. **Deep-dive (행동 분석)**
   - `QT_START → QT_BIBLE → QT_END` 단계별 Funnel
   - 세그먼트별(신규 vs 기존, 알림 설정 on/off, 언어별) 이탈율 비교

---

## 4. 실행 단계 (Step by Step)

1. **데이터 스키마 정의**
   - Firestore 쿼리 기준으로 각 지표 SQL-like 정의 문서화
   - 예: `QT 완료율 = count(uid with QT_END) / count(total uid)`
2. **데이터 파이프라인 구축**
   - Firebase Functions + BigQuery (추천)
   - Firestore 데이터를 주기적으로 export → 집계
3. **시각화 도구 선택**
   - 초기: Google Data Studio (무료 & Firebase 친화적)
   - 성장 후: Metabase, Redash, 혹은 자체 Nuxt3 대시보드
4. **GA 이벤트 트래킹 재정의**
   - `QT_START`, `QT_END`, `QNA`, `LIKE/DISLIKE` → 커스텀 이벤트 세팅
   - 현재 GA가 활성화만 돼 있고 데이터 없음 → Firebase Analytics와 연결 재점검 필요
5. **MVP 대시보드 오픈 후 → 개선**
   - 초반엔 _“기초 지표만”_ 보여주고
   - 이후 코호트 분석, 리텐션 분석 추가

---

## 5. 당장 시작할 액션 플랜

- [ ] **Firestore 기준으로 첫 지표 정의 문서화** (엑셀/노션에 간단히)
- [ ] **Firebase Functions로 주기적 데이터 export → BigQuery** 설정
- [ ] **Google Data Studio로 MVP 대시보드 제작**
- [ ] **GA 이벤트 스키마 재설계 및 적용**
- [ ] **목표 지표(10월 QT 완료율 10%) 달성 추적 대시보드 오픈**

---

👉 정리하면:

처음부터 너무 방대하게 가지 말고, **Firestore 로그 → BigQuery → Data Studio** 흐름으로 MVP 대시보드를 빠르게 띄워. 거기서 핵심 지표만 먼저 확인하면서, GA 이벤트를 제대로 심고 보조 지표들을 추가해나가면 돼.
