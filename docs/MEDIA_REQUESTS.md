# 필요한 사진·GIF·영상

실제 프로젝트 자료를 받으면 아래 본문 위치에 연결합니다. `npm run dev`에서는 각 위치에 요청 상자가 표시됩니다. 공개 빌드에서는 빈 자리와 요청 상자가 숨겨집니다. 실제 자료가 연결되면 캡션과 함께 공개됩니다.

가장 먼저 **국민대 본선 차량 사진**, **AEB Gazebo/Foxglove 화면**, **UAV waypoint·착륙 시연 영상**을 주시면 세 프로젝트의 내용을 빠르게 보완할 수 있습니다.

| 우선순위 | 프로젝트 / 본문 위치 | 요청 자료 | 예정 경로 (`public` 기준) |
| --- | --- | --- | --- |
| 1 | 국민대 / Competition context | 본선 차량 전체 사진 1장. 촬영 행사·시점 포함 | `media/projects/kookmin-ai-edge/01_competition_vehicle.webp` |
| 1 | AI·SW / Simulation & debugging | Gazebo 또는 Foxglove에서 중심 경로·차량 궤적·정지 상태가 보이는 화면 | `media/projects/ai-sw-mobility/01_gazebo_foxglove.webp` |
| 1 | UAV / Final demonstration | waypoint 순차 추종부터 최종 착륙까지 실제 시연 영상 또는 연속 캡처 | `media/projects/uav-waypoint/01_waypoint_landing.mp4` |
| 2 | 국민대 / YOLO & Roboflow | 직접 학습한 통합 검출 모델의 실제 검출 화면. 표시 클래스 설명 | `media/projects/kookmin-ai-edge/02_yolo_detection.webp` |
| 2 | 국민대 / Parking event | 주차·후진 복구가 보이는 10–20초 영상/GIF. 본인 구현 구간 설명 | `media/projects/kookmin-ai-edge/03_parking_recovery.mp4` |
| 2 | AI·SW / Initial vehicle testing | 약 7 km/h 초기 실차 시험 영상. 조향 진동 구간과 속도 확인 방법 | `media/projects/ai-sw-mobility/02_initial_vehicle_test.mp4` |
| 2 | V2I / Research question | 이미 작성한 차량·주정차 차량·보행자·인프라 카메라 배치도. 설계안 표시 | `media/projects/camera-v2i/01_scenario_design.webp` |
| 2 | V-Model / Debugging work | CARLA 목표 경로와 실제 주행이 보이는 화면 또는 실패 구간 영상 | `media/projects/vmodel-neuro-symbolic/01_tracking_debug.webp` |

파일 이름과 형식은 예시입니다. PNG, JPG, WebP, GIF, MP4, YouTube 링크를 사용할 수 있습니다. 자료를 주실 때 **어느 프로젝트인지, 시뮬레이션인지 실차인지, 어떤 장면인지, 본인 기여가 어느 부분인지**를 함께 알려주세요. 실패나 진동이 보이는 장면도 기술 설명에 도움이 됩니다.

전체 아키텍처 그림은 현재 보유하지 않아 만들어 넣지 않았습니다. 실제 노드·토픽·인터페이스가 확인되는 기존 그림이 있으면 시스템 설명 구간에 추가할 수 있습니다. 국민대 별도 lane 모델을 직접 학습한 것으로 보이는 캡션은 사용하지 않습니다.

## 연결 방법

1. 해당 `public/media/projects/.../` 폴더에 실제 파일을 저장합니다.
2. `src/data/media.ts`에서 해당 ID의 `src`를 실제 `/media/...` URL로 지정합니다.
3. 영상이면 `kind: 'video'`, 이미지/GIF면 `kind: 'image'`를 지정합니다. YouTube는 `src` 대신 `youtubeId`를 지정합니다.
4. 미리 작성한 `alt`와 `caption`이 실제 장면·환경·기여 범위와 맞는지 확인합니다. 문구는 자료 확인 후 수정해야 합니다.
5. `npm run check`, `npm run build`, `npm run verify`를 실행합니다. 지정한 파일이 없으면 빌드가 실패합니다.

슬롯 ID: `kookmin-vehicle`, `kookmin-yolo`, `kookmin-parking`, `mobility-simulation`, `mobility-vehicle`, `v2i-scenario`, `uav-demo`, `vmodel-debug`.
