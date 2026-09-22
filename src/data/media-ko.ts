import type { MediaEntry } from './media';

// Asset paths and playback settings come from media.ts in both languages.
export const mediaKo: Record<string, Pick<MediaEntry, 'title' | 'alt' | 'caption'>> = {
  'v2i-comparison': {
    title: 'Camera-only와 V2I-assisted E2E 비교',
    alt: '차량 카메라만 사용하는 E2E와 영상 및 객체 상태를 결합하는 E2E의 4주차 비교 설계. 두 모델 모두 waypoint와 목표 속도를 출력한다.',
    caption: '4주차 비교 설계(발표 7쪽). 두 모델은 같은 차량, 운행 조건, 주행 속도, 학습 조건과 제어기를 사용할 예정입니다.',
  },
  'v2i-scenario': {
    title: '4주차 가림 시나리오와 운행 조건',
    alt: '주간 어린이보호구역의 보행자 가림 상황과 인프라 카메라 설치 후보 위치를 설명하는 4주차 설계 자료',
    caption: '4주차 시나리오 설계(발표 3쪽). 주정차 차량에 의해 시야가 가려지는 상황과 도로 맞은편의 인프라 카메라 설치 후보 위치를 표시했습니다.',
  },
  'mobility-aeb-replay': {
    title: 'AEB 기록 데이터 확인',
    alt: '콘 배치, 목표 속도와 브레이크 명령 그래프를 표시한 Foxglove MCAP 재생 화면',
    caption: 'Foxglove에서 MCAP을 재생하며 콘 배치, 속도 명령과 브레이크 요청을 확인한 화면입니다. 15초 화면 녹화에는 원본의 2배속 재생 설정이 유지되어 있습니다.',
  },
  'mobility-waypoint': {
    title: '본선 코스 waypoint 주행',
    alt: '본선 코스의 곡선 구간을 지나 직선 구간으로 진입하는 차량 탑승 시점 영상',
    caption: '2026년 9월 20일 본선 코스 대회장 연습입니다. 00:38–00:55 구간을 원래 속도로 연속 발췌했습니다. 참가자가 확인한 주행 속도는 10 m/s(36 km/h)입니다.',
  },
  'mobility-aeb-stop': {
    title: '50 km/h AEB 명령 시험',
    alt: '빨간 콘에 접근한 뒤 정지 구간을 넘어 이동하는 AEB 시험 차량의 탑승 시점 영상',
    caption: '2026년 9월 20일 AEB 시험입니다. 참가자가 확인한 속도는 50 km/h이며, 00:13–00:22 구간을 원래 속도로 발췌했습니다. 빨간 콘에서 정지 명령을 내렸으나, 브레이크 4개 중 2개가 작동하지 않아 차량이 정지 구간을 넘었습니다.',
  },
  'mobility-monitor': {
    title: 'Foxglove 주행 기록 모니터',
    alt: '경로, 카메라 영상, 목표값과 측정값을 함께 표시한 Foxglove 주행 기록 화면',
    caption: 'MCAP 재생 중 경로, 카메라 영상, 목표 신호와 측정 신호를 함께 확인한 Foxglove 화면입니다. 표시된 판단 상태는 WAITING입니다.',
  },
  'kookmin-vehicle': {
    title: '대회 코스 위의 Team KAI 차량',
    alt: '국민대 대회 코스 위의 Team KAI 차량',
    caption: 'Team KAI / 건국대학교 배너와 함께 보이는 XYCAR 대회 차량입니다. 제9회 국민대학교 자율주행 경진대회 중계에서 발췌했습니다.',
  },
  'kookmin-annotation': {
    title: '예선 시뮬레이션 데이터의 신호등과 콘 라벨링',
    alt: 'Roboflow에서 신호등과 콘에 라벨을 붙인 예선 시뮬레이션 데이터 이미지',
    caption: 'Roboflow에서 예선 시뮬레이션 이미지의 신호등과 콘에 라벨을 붙인 화면입니다. 표시된 이미지는 검증용 데이터에 포함됩니다.',
  },
  'kookmin-yolo': {
    title: 'rosbag 재생 중 YOLO 콘 검출',
    alt: '오프라인 rosbag 재생 영상에서 YOLO가 콘을 검출한 결과',
    caption: '오프라인으로 rosbag을 재생하며 hjh_model_5로 콘을 검출한 결과입니다.',
  },
  'kookmin-driving': {
    title: '대회 차량의 콘 구간 주행',
    alt: '콘 구간에 진입하는 대회 차량',
    caption: '차량이 콘 구간을 통과하는 6초 장면입니다. 제9회 국민대학교 자율주행 경진대회 중계에서 발췌했습니다.',
  },
  'kookmin-parking': {
    title: '주차 경기 코스 주행',
    alt: '주차 경기 코스에서 이동하는 차량',
    caption: '주차 경기에서 차량이 주차 구역으로 접근하는 8초 장면입니다. 제9회 국민대학교 자율주행 경진대회 중계에서 발췌했습니다.',
  },
  'kookmin-practice': {
    title: '대회 전 연습과 튜닝',
    alt: '대회 전 실내 트랙에서 곡선을 주행하는 차량',
    caption: '대회 전 실내 트랙에서 연습하고 튜닝하던 중 차량이 곡선을 주행하는 장면입니다.',
  },
  'kookmin-finish': {
    title: '대회 코스의 체크무늬 선 통과',
    alt: '체크무늬 코스 선을 통과하는 대회 차량',
    caption: '차량이 코스의 체크무늬 선을 통과하는 장면입니다. 제9회 국민대학교 자율주행 경진대회 중계에서 발췌했습니다.',
  },
  'mobility-simulation': {
    title: 'Gazebo 시뮬레이션',
    alt: 'AEB 경로와 차량 움직임을 표시한 Gazebo 또는 Foxglove 화면',
    caption: 'Gazebo와 Foxglove를 활용한 AEB 개발 과정입니다.',
  },
  'mobility-vehicle': {
    title: '초기 실차 시험',
    alt: 'AEB 개발 초기의 실차 시험',
    caption: '초기 실차 시험입니다. 당시 조향 진동의 원인을 조사하고 있었습니다.',
  },
  'uav-demo': {
    title: '드론 이륙과 waypoint 비행',
    alt: 'PX4 SITL / Gazebo waypoint 시험에서 이륙 후 건물 옆을 비행하는 드론',
    caption: 'PX4 SITL / Gazebo의 이륙 및 waypoint 비행 장면입니다. 제공된 시험 영상의 19.5–23.5초와 33.0–36.8초 구간을 원래 속도로 발췌하고 비행 화면만 잘랐습니다.',
  },
  'vmodel-simulation': {
    title: 'CARLA 시뮬레이션 시험',
    alt: 'ROS 2 제어 터미널과 함께 보이는 CARLA 차량의 곡선 주행',
    caption: '드림학기제 CARLA 시뮬레이션 시험입니다. Waypoint, Pure Pursuit와 속도 제어 터미널이 함께 보입니다. 00:02–00:12 구간을 원래 속도로 연속 발췌했습니다.',
  },
  'vmodel-wheel-test': {
    title: '받침대 위 바퀴 구동 시험',
    alt: '받침대에 올린 드림학기제 차량의 바퀴가 회전하는 장면',
    caption: '차량을 받침대에 올리고, 제가 별도로 보낸 제어 명령으로 바퀴를 구동한 시험입니다. 00:09–00:15 구간을 원래 속도로 연속 발췌하고 바퀴와 받침대가 보이도록 잘랐습니다.',
  },
};
