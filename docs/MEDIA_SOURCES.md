# AI·SW venue-practice media

The participant supplied these files on September 22, 2026. They record venue practice, not official competition runs. Original files remain outside the repository. Excerpts are continuous, without added telemetry, removed objects, or reordered frames. GIF frame-rate reduction preserves elapsed time.

| Asset | Original file | Source interval | Encoding | Context |
| --- | --- | --- | --- | --- |
| `03-final-course-waypoint.gif` | `KakaoTalk_20260920_115912450.mp4` | 00:38–00:55 (17 s) | 480×270, 8 fps | Participant confirmed final course; reported run speed 10 m/s (36 km/h). No onboard speed overlay. |
| `04-aeb-braking-trial.gif` | `KakaoTalk_20260920_155757426.mp4` | 00:13–00:22 (9 s) | 640×360, 10 fps | Includes the participant-identified 00:16–00:20 AEB event and its aftermath. Reported approach speed 50 km/h. The stop command was issued, but two of four brakes were reported inoperative and the vehicle overran the zone. |

Posters are unaltered frames at 00:47 and 00:17, respectively. The home page uses the waypoint poster; the case study provides click-to-play GIFs and downloads. Animations do not start automatically, including for readers who prefer reduced motion.

## Additional Foxglove recording

`05-aeb-foxglove-replay.gif` uses 00:00–00:15 of `KakaoTalk_20260920_203822583.mp4`, encoded at 960×540 and 10 fps. Its poster is the frame at 00:11. The Foxglove window displays an MCAP file and a 2× replay setting; the GIF preserves that recorded playback. The plotted labels are target speed and brake command. They are not measured-speed or stopping-distance evidence. Whether this is real-vehicle or simulation data, and whether it corresponds to the onboard AEB trial, is awaiting participant confirmation; no such association is claimed publicly.

The stated trial speed and hardware condition come from the participant's report. A camera clip alone does not establish an exact speed, command timestamp, stopping distance, or hardware fault diagnosis. Raw time-aligned speed and command logs remain the next evidence to collect.

# UAV waypoint-test recording

The participant supplied `KakaoTalk_20260922_174025079.mp4` on September 22, 2026 as a record of UAV waypoint testing in PX4 SITL / Gazebo. The participant stated that marker recognition was not functioning during this recording.

`01-waypoint-flight.gif` combines two excerpts in source order: 00:19.5–00:23.5 (takeoff) and 00:33.0–00:36.8 (waypoint flight). Each excerpt retains the original playback speed. The GIF is 7.8 seconds long, 768×432, and 10 fps. Labels distinguish the two excerpts.

Both excerpts use the same crop: x=534, y=250, width=536, height=302 in the 1280×720 source. This shows the flight view and excludes the marker-recognition dashboard, desktop, and entity inspector. The poster is the cropped source frame at 00:36.0, exported at 960×540. The recording illustrates takeoff and waypoint flight; it does not provide tracking-error measurements or evidence of a completed landing.

The home page uses the poster, and the UAV case study provides the GIF playback toggle and download. The original recording stays outside the public repository.

# Dream Semester test recordings

The participant identified both recordings as Dream Semester material on September 22, 2026. They show CARLA simulation and a stationary physical wheel test.

| Asset | Original file | Source interval | Encoding | Visible context |
| --- | --- | --- | --- | --- |
| `01-carla-simulation.gif` | `KakaoTalk_20260922_174628729.mp4` | 00:02–00:12 (10 s) | 640×360, 8 fps | Vehicle motion through a curve in CARLA; waypoint, Pure Pursuit, and speed-control terminals remain visible. |
| `02-stationary-wheel-test.gif` | `KakaoTalk_20260922_174630125.mp4` | 00:09–00:15 (6 s) | 576×432, 12 fps | A wheel rotates while the chassis is raised on supports. The participant confirmed issuing separate commands to the control side for this test. |

Both GIFs are continuous excerpts at the recorded playback speed. The CARLA crop is x=4, y=54, width=1184, height=666 from the 1192×720 recording. Its poster uses 00:06 and is exported at 960×540. The physical-test video is automatically oriented to 1080×1920 before cropping at x=8, y=460, width=1056, height=792. Its poster uses 00:12 and is exported at 960×720. The physical crop keeps the wheel and supports in view and excludes the operator's upper body.

The home page uses the CARLA poster. Both GIFs have playback toggles and downloads in the case study. The project outcome remains unresolved tracking instability and no real-vehicle driving run; these clips add implementation and test records. No tracking-error statistics, steering calibration, or causal diagnosis are derived from them. The original recordings remain outside the public repository.
