interface ProjectHighlight {
  title: string;
  work: string;
  result: string;
  resultLabel: string;
  evidence: { label: string; anchor: string }[];
}

// Reading summaries; the project articles retain the full methods and results.
export const projectHighlights: Record<string, ProjectHighlight> = {
  'kookmin-ai-edge': {
    title: 'Kookmin AI-Edge Autonomous Driving',
    work: 'Developed the ResNet18–LiDAR CNN pipeline, trained and compared YOLOv8n and YOLO11n, and integrated mission transitions, parking waypoints, and reverse recovery.',
    resultLabel: 'Competition result',
    result: 'Team: preliminary 2nd, finals 13th with course completion, and a parking Special Award. Rule-based driving was used in the competition.',
    evidence: [
      { label: 'Learning & evaluation', anchor: 'learning-pipeline-and-evaluation' },
      { label: 'Competition results', anchor: 'validation-and-competition-results' },
    ],
  },
  'ai-sw-mobility': {
    title: 'AI·SW Mobility: Behavior Planning & Control',
    work: 'Designed FSM states and transitions with teammates, collected GNSS route waypoints, and connected PP–Stanley implementation with Foxglove analysis and vehicle operation.',
    resultLabel: 'Vehicle trial results',
    result: 'Both courses reached up to 11 m/s during venue practice. Separate obstacle-avoidance tests confirmed deceleration, collision-free passage, route return, and acceleration.',
    evidence: [
      { label: 'FSM & mission transitions', anchor: 'fsm-based-behavior-planning' },
      { label: 'Vehicle trials', anchor: 'real-vehicle-trials' },
      { label: 'Initial simulation comparison', anchor: 'initial-simulation-results' },
    ],
  },
  'camera-v2i-e2e': {
    title: 'Camera-Based V2I & E2E Driving',
    work: 'Reviewed UniV2X, prepared preliminary-design presentation materials from team discussions, and began investigating V2I communication options.',
    resultLabel: 'Current stage',
    result: 'The preliminary design covers pedestrian risk, braking-aware training targets, and a planned comparison using shared driving records and labels. Communication research is in progress.',
    evidence: [
      { label: 'Literature & scope', anchor: 'literature-review-and-project-scope' },
      { label: 'Planned comparison', anchor: 'planned-e2e-comparison' },
      { label: 'Communication research', anchor: 'v2i-communication-research' },
    ],
  },
  'uav-waypoint': {
    title: 'ROS 2 UAV Waypoint Mission',
    work: 'Developed CSV waypoint sequencing, TF2 arrival checks, coordinate modes, and finish-state controls, and connected pose commands to an existing PX4 offboard controller.',
    resultLabel: 'Simulation result',
    result: 'The integrated PX4 SITL/Gazebo course demonstration completed sequential waypoint flight and final landing. The recording shows takeoff and waypoint flight.',
    evidence: [
      { label: 'Simulation demonstration', anchor: 'simulation-demonstration' },
      { label: 'Mission architecture', anchor: 'mission-architecture' },
    ],
  },
  'vmodel-neuro-symbolic': {
    title: 'Dream Semester: Decision & Control',
    work: 'Implemented Pure Pursuit and longitudinal control in ROS 2/CARLA, investigated steering behavior, and adapted the vehicle-command interface.',
    resultLabel: 'Implementation & experiments',
    result: 'Exercised the ROS 2 control pipeline in CARLA simulation and tested wheel actuation with separate control commands on the raised vehicle.',
    evidence: [
      { label: 'Recorded tests', anchor: 'recorded-tests' },
      { label: 'Controller experiments', anchor: 'steering-behavior-and-controller-tuning' },
    ],
  },
};
