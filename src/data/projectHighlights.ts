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
    work: 'Built the imitation-learning pipeline and YOLO perception, integrated mission commands, and developed parking waypoints and reverse recovery.',
    resultLabel: 'Competition result',
    result: 'Team: preliminary 2nd, finals 13th with course completion, and a parking Special Award. Rule-based driving was used in the competition.',
    evidence: [
      { label: 'Learning & evaluation', anchor: 'learning-pipeline-and-evaluation' },
      { label: 'Competition results', anchor: 'validation-and-competition-results' },
    ],
  },
  'ai-sw-mobility': {
    title: 'AI·SW Mobility: Decision & AEB',
    work: 'Focused on obstacle avoidance: diagnosed a cached-path coordinate error, implemented odometry-based reprojection and regression tests, and combined drive-log analysis with team troubleshooting discussions.',
    resultLabel: 'Software correction & field testing',
    result: 'The path-reuse fix was merged into the team’s main branch. I operated the vehicle during tests of the updated software, confirming successful obstacle avoidance and return to the reference route.',
    evidence: [
      { label: 'Path diagnosis & correction', anchor: 'obstacle-avoidance-diagnosis-and-correction' },
      { label: 'Vehicle trials', anchor: 'real-vehicle-trials' },
      { label: 'Initial simulation comparison', anchor: 'initial-simulation-results' },
    ],
  },
  'camera-v2i-e2e': {
    title: 'Camera-Based V2I & E2E Driving',
    work: 'Reviewed UniV2X, prepared a literature summary, and proposed simplified vehicle–infrastructure fusion and a small-scale closed-loop evaluation direction.',
    resultLabel: 'Current stage',
    result: 'Research and design are in progress. A small-scale closed-loop comparison of camera-only and V2I-assisted E2E driving is planned.',
    evidence: [
      { label: 'Literature & scope', anchor: 'literature-review-and-project-scope' },
      { label: 'Planned comparison', anchor: 'planned-e2e-comparison' },
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
