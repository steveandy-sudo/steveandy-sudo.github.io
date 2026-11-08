export interface HomeProjectCopy {
  title: string;
  summary: string;
  result: string;
  resultLabel?: string;
  visual?: {
    src?: string;
    alt?: string;
    title: string;
    caption?: string;
    kind?: 'image' | 'video';
  };
}

export const homeKo = {
  title: 'Junghun Hwang | 자율주행·AI 포트폴리오',
  description: '황정헌의 자율주행, ROS 2 기반 판단, AI 인지, 시스템 통합 프로젝트와 기술 사례를 소개한다.',
  intro: {
    portraitAlt: '황정헌의 프로필 사진',
    graduation: '2028년 학사 졸업 예정',
    affiliation: '스마트운행체공학과 · 건국대학교',
    field: '자율주행 · 인지 · 학습',
    summary: '자율주행 차량의 주행 거동을 개선하기 위해 ROS 2 기반 판단 소프트웨어를 개발하고 주행 로그를 분석한다. 프로젝트에서는 미션 FSM, 장애물 회피 시험, 모방학습 파이프라인을 다뤘다. 이러한 경험을 바탕으로 인지와 학습 기반 주행에 관심을 두고 있다.',
    born: '생년월일',
    basedIn: '거주 지역',
    location: '대한민국 서울',
    exploreProjects: '프로젝트 보기',
  },
  research: {
    lead: '학습 기반·E2E 자율주행을 위한 인지와 판단',
    summary: '학습 데이터의 품질과 주행 시나리오의 범위가 폐루프 E2E 주행에 미치는 영향을 이해하고자 한다. 대회 프로젝트에서는 주행 모델을 학습시키고 Foxglove 로그를 활용해 주행계획·판단 결과와 차량 반응을 비교했다. 졸업 프로젝트에서는 차량·인프라 융합을 검토하고, Camera-only와 V2I 정보 활용 E2E 주행의 비교 계획에 참여하고 있다.',
    topics: [
      { title: '가려진 보행자 인지', description: '인프라 센싱은 가려진 보행자에 더 일찍 대응하는 데 어떻게 도움을 줄 수 있는가?' },
      { title: '판단과 차량 반응', description: '입력 지연과 조향 지연은 주행 거동을 어떻게 바꾸는가?' },
      { title: '학습 기반·E2E 주행', description: '데이터 품질과 주행 시나리오의 범위는 폐루프 E2E 주행에 어떤 영향을 미치는가?' },
    ],
  },
  labels: {
    engineering: '구현과 실험',
    projects: '프로젝트',
    projectsNote: '학습 파이프라인부터 실차 실험까지',
    competitionResult: '대회 결과',
    technologies: '사용 기술',
    competitionRecord: '대회 기록',
    awards: '수상 및 대회',
    toolsUsed: '프로젝트 활용 도구',
    technicalSkills: '기술 역량',
  },
  awards: {
    mobility: {
      title: '대학생 AI·SW 모빌리티 경진대회',
      grandPrize: '대상 · 국토교통부 장관상',
      grandPrizeContext: '자작자율차 · 자율주행구현 부문 · 팀 수상',
      specialAward: '창작기술 부문 특별상',
      specialAwardContext: '자작자율차 · 기술보고서 · 팀 수상',
    },
    kookmin: {
      title: '국민대 AI-Edge 경진대회',
      result: '주차 특별상 · 예선 2위',
      context: '본선 13위·코스 완주 · 팀 성적',
    },
    mobis: {
      title: '현대모비스 기술 특별상',
      result: '자율주행 부문 · Team K.A.I. 수상',
      context: '황우진·황정헌의 판단·제어 발표에 대한 수상',
    },
    drone: {
      title: 'Drone Clash',
      result: '일반부 · 3위',
    },
  },
  skills: [
    { label: '프로그래밍', tools: 'Python, C++' },
    { label: '자율주행·제어', tools: 'ROS 2, FSM 기반 행동 계획, Pure Pursuit–Stanley 경로 추종' },
    { label: '학습·인지', tools: 'PyTorch, 모방학습, YOLO, TorchScript, OpenCV, Roboflow' },
    { label: '시뮬레이션·무인기', tools: 'CARLA, Gazebo, PX4 SITL, QGroundControl' },
    { label: '데이터·개발', tools: 'ROS 2 로그 분석, Foxglove, rosbag2 / MCAP, RViz2, Ubuntu, Git/GitHub' },
  ],
};

export const homeProjectsKo: Record<string, HomeProjectCopy> = {
  'kookmin-ai-edge': {
    title: '국민대 AI-Edge 경진대회',
    summary: 'ResNet18–LiDAR CNN 모방학습 파이프라인 개발, YOLOv8n·YOLO11n 검출기 비교, 대회 차량의 미션 전환·주차 로직 통합',
    result: '팀 성적: 예선 2위, 본선 13위 및 코스 완주, 주차 특별상. 본선 대회 주행에는 규칙 기반 주행 적용.',
    visual: {
      src: '/media/projects/kookmin-ai-edge/01-competition-vehicle.jpg',
      alt: '국민대 대회 코스의 Team KAI 대회 차량',
      title: '대회 차량',
      caption: '대회 중계 · Team KAI 차량',
    },
  },
  'ai-sw-mobility': {
    title: 'AI·SW 모빌리티: 판단',
    summary: 'ROS 2 미션 FSM 설계, Foxglove 로그 기반 장애물 회피 문제 분석, 후속 실차 시험 운용',
    result: '팀 수상: 대상(국토교통부 장관상)·창작기술 부문 특별상. 예선·본선의 모든 필수 미션 완료.',
    resultLabel: '대회 결과 및 수상',
    visual: {
      src: '/media/projects/ai-sw-mobility/06-official-final-driving.jpg',
      alt: '공식 본선 주행 중인 Team KAI 대회 차량',
      title: '공식 본선 주행',
      caption: '대회 차량 · 공식 본선',
    },
  },
  'camera-v2i-e2e': {
    title: '카메라 기반 V2I 협력 E2E 자율주행',
    summary: 'UniV2X 검토 및 보행자 위험도와 Camera-only·V2I 정보 활용 E2E 주행 비교 계획에 관한 중간발표 자료 작성.',
    result: '조사·설계 범위: Camera-only와 V2I 정보 활용 E2E 주행 비교, 제동을 고려한 학습 목표값, V2I 통신 방식.',
    resultLabel: '조사·설계',
    visual: {
      src: '/media/projects/camera-v2i/02-week4-e2e-comparison.png',
      alt: 'Camera-only와 V2I 정보 활용 E2E 주행계획을 비교하기 위한 팀 설계안',
      title: 'E2E 비교 제안',
      caption: '팀 설계안 · Camera-only와 V2I 정보 활용 E2E 주행계획',
      kind: 'image',
    },
  },
  'uav-waypoint': {
    title: 'UAV 웨이포인트 미션',
    summary: 'TF2 도착 판정 및 PX4 오프보드 연동을 포함한 ROS 2 웨이포인트 미션 패키지 개발.',
    result: 'PX4 SITL/Gazebo 수업 시연에서 모의 무인기의 순차 웨이포인트 비행 및 최종 착륙 완료.',
    resultLabel: '시뮬레이션 결과',
    visual: {
      src: '/media/projects/uav-waypoint/01-waypoint-flight-poster.jpg',
      alt: '웨이포인트 비행 시뮬레이션 시험 중 건물 옆을 지나는 무인기',
      title: '무인기 웨이포인트 비행',
      caption: 'PX4 SITL / Gazebo · 웨이포인트 비행',
      kind: 'image',
    },
  },
  'vmodel-neuro-symbolic': {
    title: '드림학기제: 판단·제어',
    summary: 'ROS 2 / CARLA 기반 Pure Pursuit·종방향 제어 구현 및 후속 차량 명령 인터페이스 수정·연동.',
    result: 'CARLA 폐루프 제어기 실험 및 받침대 위에 올린 차량에 별도 제어 명령을 전달한 바퀴 구동 시험.',
    resultLabel: '구현 및 실험',
    visual: {
      src: '/media/projects/vmodel-neuro-symbolic/01-carla-simulation-poster.jpg',
      alt: 'ROS 2 제어 터미널이 표시된 드림학기제 CARLA 시뮬레이션',
      title: 'CARLA 시뮬레이션 시험',
      caption: '드림학기제 · CARLA 시뮬레이션 시험',
      kind: 'image',
    },
  },
};

export const homeTechnologyKo: Record<string, string> = {
  'FSM Behavior Planning': 'FSM 행동 계획',
  'Camera V2I Design': '카메라 기반 V2I 설계',
  'E2E Planning': 'E2E 주행계획',
  'Experiment Design': '실험 설계',
  'Spatial / Temporal Alignment': '공간·시간 정렬',
  'Control Integration': '제어 통합',
};
