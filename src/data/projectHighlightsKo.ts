import type { projectHighlights } from './projectHighlights';

export const projectHighlightsKo: typeof projectHighlights = {
  'kookmin-ai-edge': {
    title: '국민대 AI-Edge 자율주행',
    work: 'ResNet18–LiDAR CNN 파이프라인을 개발하고, YOLOv8n과 YOLO11n을 학습·비교했으며, 미션 전환·주차 웨이포인트·후진 복구를 통합했다.',
    resultLabel: '대회 성과',
    result: '팀은 예선 2위와 본선 13위를 기록했고, 본선 코스를 완주했다. 주차 부문 특별상도 수상했다. 최종 실차 본선에서는 규칙 기반 차선 추종을 사용했다.',
    evidence: [
      { label: '학습 및 평가', anchor: 'learning-pipeline-and-evaluation' },
      { label: '대회 결과', anchor: 'validation-and-competition-results' },
    ],
  },
  'ai-sw-mobility': {
    title: 'AI·SW 모빌리티: 판단',
    work: 'K-City 실차 시험에서 장애물 회피 중 S자 대체 경로가 반복 선택된 것을 확인했다. 같은 날 별도 주행 로그를 Foxglove에서 분석해 저장 경로의 좌표·시각 불일치를 찾고, odometry 기반 재투영을 구현한 뒤 후속 실차 시험을 진행했다.',
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
    work: '정지 조건에 따른 허용 지연, 측정 경계와 두 모델의 비교시험 계획을 구체화했다. ChatGPT를 활용해 후보 모델 실행시간 측정 시험을 준비하고 직접 실행했다.',
    resultLabel: '현재 단계',
    result: '조사·예비 설계 단계이며, 별도의 소프트웨어 부분시험에서 무작위 초기화한 TCP 후보 모델을 RTX 5070 Laptop GPU에서 FP32로 600회 실행했다. CPU–GPU 전송을 포함한 실행시간의 P95는 21.88 ms였다.',
    evidence: [
      { label: '허용 지연 분석', anchor: 'stopping-based-latency-requirements' },
      { label: '모델 실행시간 측정', anchor: 'candidate-model-runtime-measurement' },
      { label: '비교 계획', anchor: 'planned-e2e-comparison' },
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
