import type { projectHighlights } from './projectHighlights';

export const projectHighlightsKo: typeof projectHighlights = {
  'kookmin-ai-edge': {
    title: '국민대 AI-Edge 자율주행',
    work: 'ResNet18–LiDAR CNN 파이프라인을 개발하고, YOLOv8n과 YOLO11n을 학습·비교했으며, 미션 전환·주차 웨이포인트·후진 복구를 통합했다.',
    resultLabel: '대회 성과',
    result: '팀은 예선 2위와 본선 13위를 기록했고, 본선 코스를 완주했다. 주차 부문 특별상도 수상했다. 본선 경기에서는 규칙 기반 주행을 사용했다.',
    evidence: [
      { label: '학습 및 평가', anchor: 'learning-pipeline-and-evaluation' },
      { label: '대회 결과', anchor: 'validation-and-competition-results' },
    ],
  },
  'ai-sw-mobility': {
    title: 'AI·SW 모빌리티: 판단',
    work: 'ROS 2 미션 FSM을 설계하고, Foxglove 로그로 장애물 회피 문제를 분석했으며, 후속 실차 시험에서 차량을 운용했다. ROS 2에서 Pure Pursuit–Stanley 경로 추종을 구현했다.',
    resultLabel: '대회 성과 및 수상',
    result: '대회 규정에 따라 예선과 본선에서 요구된 모든 미션을 완료했다. 팀은 자작자율차 자율주행구현 부문 대상(국토교통부 장관상)과 기술보고서 관련 자작자율차 창작기술 부문 특별상을 수상했다.',
    evidence: [
      { label: '대회 수상', anchor: 'competition-awards' },
      { label: '디버깅 사례', anchor: 'recorded-drive-analysis-and-debugging' },
      { label: '제어기 비교', anchor: 'initial-simulation-results' },
    ],
  },
  'camera-v2i-e2e': {
    title: '카메라 기반 V2I 및 E2E 주행',
    work: 'UniV2X를 검토하고 예비 설계 발표 자료를 작성했다. 현재 V2I 통신 방식을 조사하고 있다.',
    resultLabel: '현재 단계',
    result: '예비 설계는 보행자 위험도, 제동을 고려한 학습 목표값, 공통 주행 기록과 라벨을 사용하는 비교 계획을 포함한다. 통신 방식 조사를 진행하고 있다.',
    evidence: [
      { label: '관련 연구 및 범위', anchor: 'literature-review-and-project-scope' },
      { label: '비교 계획', anchor: 'planned-e2e-comparison' },
      { label: '통신 방식 조사', anchor: 'v2i-communication-research' },
    ],
  },
  'uav-waypoint': {
    title: 'ROS 2 UAV 웨이포인트 미션',
    work: 'CSV 웨이포인트 순차 처리, TF2 도착 판정, 좌표 모드, 종료 상태 제어를 개발했다. 위치·자세 명령을 기존 PX4 오프보드 제어기에 연결했다.',
    resultLabel: '시뮬레이션 결과',
    result: 'PX4 SITL/Gazebo 수업 통합 시연에서 순차 웨이포인트 비행과 최종 착륙을 완료했다. 아래 영상에는 이륙과 웨이포인트 비행이 담겨 있다.',
    evidence: [
      { label: '시뮬레이션 시연', anchor: 'simulation-demonstration' },
      { label: '미션 구조', anchor: 'mission-architecture' },
    ],
  },
  'vmodel-neuro-symbolic': {
    title: '드림학기제: 판단·제어',
    work: 'ROS 2/CARLA에서 Pure Pursuit과 종방향 제어를 구현하고, 조향 거동을 분석했으며, 차량 명령 인터페이스를 수정했다.',
    resultLabel: '구현 및 실험',
    result: 'CARLA 시뮬레이션에서 ROS 2 제어 파이프라인을 실행하고, 차량을 받침대 위에 올린 상태에서 별도 제어 명령으로 바퀴 구동을 시험했다.',
    evidence: [
      { label: '시험 기록', anchor: 'recorded-tests' },
      { label: '제어기 실험', anchor: 'steering-behavior-and-controller-tuning' },
    ],
  },
};
