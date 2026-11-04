import type { MediaEntry } from './media';

export const mediaKo: Record<string, Pick<MediaEntry, 'title' | 'alt' | 'caption'>> = {
  'mobility-final-replay': {
    title: '공식 본선 동기화 재생 영상',
    alt: '차량 탑재 카메라 영상, 차량 기록 데이터, 대회 중계 영상을 동기화한 공식 본선 재생 영상',
    caption: '공식 본선의 카메라 영상, 차량 기록 데이터, 대회 중계 영상을 동기화했다. 가운데 화면에는 추종 경로와 차량 폭 표시가 겹쳐 나타난다.',
  },
  'mobility-final-obstacle': {
    title: '공식 본선 장애물 구간',
    alt: '공식 본선에서 빨간색 방벽 구간을 주행하는 Team KAI 대회 차량',
    caption: '공식 본선의 장애물 구간 주행 장면이다.',
  },
  'mobility-final-signal': {
    title: '공식 본선 신호등 대응',
    alt: '공식 본선에서 신호 대기 후 교차로를 통과하는 대회 차량',
    caption: '공식 본선의 신호 대기 후 출발 장면이다.',
  },
  'v2i-comparison': {
    title: 'Camera-only 및 V2I 정보 활용 E2E 비교',
    alt: '웨이포인트와 목표 속도를 출력하는 Camera-only 및 V2I 정보 활용 E2E 주행계획을 보여주는 팀 설계안',
    caption: '동일한 차량, 운용 조건, 학습 설정, 제어기를 사용한 향후 비교를 위한 팀 설계안이다.',
  },
  'mobility-aeb-replay': {
    title: 'AEB 기록 데이터 검토',
    alt: '콘 배치와 목표 속도·제동 명령 그래프를 보여주는 Foxglove MCAP 재생 화면',
    caption: '콘 배치, 속도 명령, 제동 요청을 보여주는 Foxglove MCAP 재생 화면이다.',
  },
  'mobility-waypoint': {
    title: '본선 코스 웨이포인트 주행',
    alt: '본선 코스 웨이포인트 주행 중 선회 구간에서 직선 구간으로 진입하는 차량 탑재 카메라 시점',
    caption: '대회장 연습 중 본선 코스에서 진행한 웨이포인트 주행 장면이다.',
  },
  'mobility-aeb-stop': {
    title: 'AEB 명령 시험',
    alt: '빨간 콘 AEB 명령 시험의 차량 탑재 카메라 시점',
    caption: '실차 시험에서 빨간 콘을 감지하고 정지 명령이 발생한 장면이다.',
  },
  'mobility-monitor': {
    title: 'Foxglove 주행 기록 모니터',
    alt: '경로 정보, 카메라 영상, 목표값과 실측값의 비교를 보여주는 Foxglove 주행 기록 모니터',
    caption: 'MCAP 재생 중 경로 정보, 카메라 영상, 목표값과 실측값의 비교를 보여주는 Foxglove 화면이다. 표시된 판단 상태는 WAITING이다.',
  },
  'kookmin-vehicle': {
    title: '코스 위의 Team KAI 대회 차량',
    alt: '코스 위의 Team KAI 대회 차량',
    caption: 'Team KAI / 건국대학교 현수막과 함께 보이는 XYCAR 대회 차량이다. 제9회 국민대학교 자율주행 경진대회 중계 영상에서 가져왔다.',
  },
  'kookmin-annotation': {
    title: '예선 시뮬레이션 데이터셋의 Roboflow 신호등·콘 주석',
    alt: '예선 시뮬레이션 데이터셋의 Roboflow 신호등·콘 주석',
    caption: 'Roboflow에서 예선 데이터셋의 시뮬레이션 이미지에 신호등과 콘 라벨을 표시한 화면이다. 표시된 이미지는 검증 데이터에 속한다.',
  },
  'kookmin-yolo': {
    title: '오프라인 rosbag 재생 중 YOLOv8n 콘 검출',
    alt: '오프라인 rosbag 재생 중 YOLOv8n 콘 검출',
    caption: '오프라인 rosbag 재생 중 YOLOv8n으로 콘을 검출한 장면이다.',
  },
  'kookmin-driving': {
    title: '콘 구간에 진입하는 대회 차량',
    alt: '콘 구간에 진입하는 대회 차량',
    caption: '콘 구간을 주행하는 차량의 모습이다. 제9회 국민대학교 자율주행 경진대회 중계 영상에서 가져왔다.',
  },
  'kookmin-parking': {
    title: '주차 부문 코스를 주행하는 차량',
    alt: '주차 부문 코스를 주행하는 차량',
    caption: '주차 부문에서 주차 구역으로 접근하는 차량의 모습이다. 제9회 국민대학교 자율주행 경진대회 중계 영상에서 가져왔다.',
  },
  'kookmin-practice': {
    title: '대회 전 연습·튜닝 중 차량 선회',
    alt: '대회 전 연습·튜닝 중 선회하는 차량',
    caption: '대회 전 실내 트랙에서 연습과 튜닝을 진행하며 곡선 구간을 주행하는 차량의 모습이다.',
  },
  'kookmin-finish': {
    title: '체커 무늬 선을 통과하는 대회 차량',
    alt: '체커 무늬 선을 통과하는 대회 차량',
    caption: '차량이 코스의 체커 무늬 선을 통과하는 장면이다. 제9회 국민대학교 자율주행 경진대회 중계 영상에서 가져왔다.',
  },
  'mobility-simulation': {
    title: 'Gazebo 시뮬레이션',
    alt: 'AEB 경로와 주행 거동을 보여주는 Gazebo 또는 Foxglove 화면',
    caption: 'Gazebo와 Foxglove를 활용한 AEB 개발 장면이다.',
  },
  'mobility-vehicle': {
    title: '초기 실차 시험',
    alt: 'AEB 개발을 위한 초기 실차 시험',
    caption: '조향 응답과 명령 통합을 확인하는 초기 실차 시험 장면이다.',
  },
  'v2i-scenario': {
    title: '차폐 시나리오 및 운용 영역',
    alt: '주차 차량에 의한 보행자 차폐와 제안한 인프라 카메라 위치를 보여주는 팀 시나리오 설계 슬라이드',
    caption: '주차 차량 때문에 차량 카메라에 보이지 않는 보행자를 도로변 카메라로 관측하는 팀 시나리오 제안이다.',
  },
  'uav-demo': {
    title: 'UAV 이륙 및 웨이포인트 비행',
    alt: 'PX4 SITL / Gazebo 웨이포인트 시험에서 이륙한 뒤 건물 옆을 비행하는 UAV',
    caption: 'PX4 SITL / Gazebo에서의 이륙 및 웨이포인트 비행 장면이다.',
  },
  'vmodel-simulation': {
    title: 'CARLA 시뮬레이션 시험',
    alt: 'ROS 2 제어 터미널이 보이는 CARLA 화면에서 곡선 도로를 따라 주행하는 차량',
    caption: '드림학기제 프로젝트의 CARLA 시뮬레이션으로, 웨이포인트·Pure Pursuit·속도 제어 터미널이 보인다.',
  },
  'vmodel-wheel-test': {
    title: '정지 상태 바퀴 시험',
    alt: '드림학기제 차량을 받침대 위에 올린 상태에서 회전하는 바퀴',
    caption: '차량을 받침대 위에 올린 상태에서 직접 내린 별도 제어 명령으로 바퀴 회전을 시험한 장면이다.',
  },
};
