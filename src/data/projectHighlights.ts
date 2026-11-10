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
    result: 'Team result: 2nd in the preliminary round, 13th in the final round with course completion, and a Parking Special Award. The final competition run used rule-based driving.',
    evidence: [
      { label: 'Learning & evaluation', anchor: 'learning-pipeline-and-evaluation' },
      { label: 'Competition results', anchor: 'validation-and-competition-results' },
    ],
  },
  'ai-sw-mobility': {
    title: 'AI·SW Mobility: Decision-Making',
    work: 'Designed ROS 2 mission FSMs, investigated obstacle-avoidance problems using Foxglove logs, and operated follow-up vehicle trials. Implemented Pure Pursuit–Stanley tracking in ROS 2.',
    resultLabel: 'Competition result & awards',
    result: 'All required missions completed in both preliminary and final rounds under the competition rules. Team: Grand Prize in Autonomous Driving Implementation (Minister of Land, Infrastructure and Transport Award) and Creative Technology Special Award for the technical report.',
    evidence: [
      { label: 'Competition awards', anchor: 'competition-awards' },
      { label: 'Debugging case', anchor: 'recorded-drive-analysis-and-debugging' },
      { label: 'Controller comparison', anchor: 'initial-simulation-results' },
    ],
  },
  'camera-v2i-e2e': {
    title: 'Camera-Based V2I & E2E Driving',
    work: 'Analyzed stopping-based latency requirements, defined measurement boundaries, and refined the paired-model test plan. Used ChatGPT to prepare a candidate-model runtime test and ran it myself.',
    resultLabel: 'Current stage',
    result: 'Research and preliminary design, with a separate software timing result: the randomly initialized TCP candidate recorded a P95 of 21.88 ms in 600 FP32 runs on an RTX 5070 Laptop GPU, including CPU–GPU transfers.',
    evidence: [
      { label: 'Latency requirements', anchor: 'stopping-based-latency-requirements' },
      { label: 'Model runtime test', anchor: 'candidate-model-runtime-measurement' },
      { label: 'Planned comparison', anchor: 'planned-e2e-comparison' },
    ],
  },
  'uav-waypoint': {
    title: 'ROS 2 UAV Waypoint Mission',
    work: 'Developed CSV waypoint sequencing, TF2 arrival checks, coordinate modes, and finish-state controls. Connected pose commands to an existing PX4 offboard controller.',
    resultLabel: 'Simulation result',
    result: 'The integrated course system completed sequential waypoint flight and final landing in PX4 SITL/Gazebo. The recording below shows takeoff and waypoint flight.',
    evidence: [
      { label: 'Simulation demonstration', anchor: 'simulation-demonstration' },
      { label: 'Mission architecture', anchor: 'mission-architecture' },
    ],
  },
  'vmodel-neuro-symbolic': {
    title: 'Dream Semester: Decision & Control',
    work: 'Implemented Pure Pursuit and longitudinal control in ROS 2/CARLA, investigated steering behavior, and adapted the vehicle-command interface.',
    resultLabel: 'Implementation & experiments',
    result: 'Ran the ROS 2 control pipeline in CARLA simulation and tested wheel actuation with separate control commands on the raised vehicle.',
    evidence: [
      { label: 'Recorded tests', anchor: 'recorded-tests' },
      { label: 'Controller experiments', anchor: 'steering-behavior-and-controller-tuning' },
    ],
  },
};
