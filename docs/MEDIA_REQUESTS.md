# 필요한 사진·GIF·영상

실제 프로젝트 자료를 받으면 아래 위치에 연결합니다. 공개 화면에는 용도와 `Video forthcoming` / `Image forthcoming`만 표시한 예약 영역을 둡니다. 자세한 요청 문구와 파일 경로는 개발 화면에서만 표시하며, 실제 자료를 추가하면 예약 영역이 사진·영상으로 교체됩니다.

국민대 차량 스틸·주행/주차/연습 영상·YOLO 기록 재생·데이터셋 화면과 AI·SW Foxglove 기록 재생 화면은 이미 연결했습니다. AI·SW 본선 waypoint 주행 및 50 km/h AEB 시험 GIF도 연결했습니다. AEB는 명령 확인 후 하드웨어 제동 이상으로 구간을 넘은 시험입니다. UAV는 이륙과 waypoint 비행 GIF를 연결했습니다. 추가 자료는 **예선 코스 주행 영상과 속도·명령 로그**, **UAV 목표 경로·실제 궤적과 최종 착륙 기록**을 우선합니다. 팀원 단체 사진은 사용하지 않습니다.

| 우선순위 | 프로젝트 / 본문 위치 | 요청 자료 | 예정 경로 (`public` 기준) |
| --- | --- | --- | --- |
| 1 | AI·SW / Evidence and current result | 예선 코스 10 m/s(36 km/h) waypoint 실차 주행 영상 및 두 코스의 속도 로그(본선 영상 수령 완료) | `media/projects/ai-sw-mobility/03_waypoint_venue_practice.mp4` |
| 2 | UAV / 시연 결과 보완 | 이륙과 waypoint 비행 영상 수령 완료. 목표 경로·실제 궤적 로그 및 최종 착륙을 확인할 추가 기록 | 추가 자료 확인 후 지정 |
| 1 | AI·SW / Evidence and current result | 50 km/h AEB 시험의 속도·제동 명령·정지 위치 로그. 차량 영상 수령 완료; 브레이크 2개 작동 불가로 구간 내 정지 미달성 | `media/projects/ai-sw-mobility/04_aeb_stop_venue_practice.mp4` |
| 2 | V2I / 향후 구현 기록 | 4주차 시나리오·비교 설계 슬라이드 수령 완료. 구현 후 카메라 보정 또는 실제 HENES 시험 자료 | 구현 이후 지정 |

파일 이름과 형식은 예시입니다. PNG, JPG, WebP, GIF, MP4, YouTube 링크를 사용할 수 있습니다. 자료를 주실 때 **어느 프로젝트인지, 시뮬레이션인지 실차인지, 어떤 장면인지, 본인 기여가 어느 부분인지**를 함께 알려주세요. 실패나 진동이 보이는 장면도 기술 설명에 도움이 됩니다.

드림학기제는 CARLA 시뮬레이션과 차체를 받친 상태의 바퀴 구동 영상을 받아 GIF로 연결했습니다. 바퀴 시험에서는 사용자가 제어 파트에 별도 명령을 보낸 것으로 확인했습니다. 목표 경로·실제 궤적 로그는 아직 확보하지 못했습니다. 프로젝트 시스템 구조는 확인된 코드에 기반한 흐름 설명으로 제공합니다. 국민대 별도 lane 모델을 직접 학습한 것으로 보이는 캡션은 사용하지 않습니다.

## 연결 방법

1. 해당 `public/media/projects/.../` 폴더에 실제 파일을 저장합니다.
2. `src/data/media.ts`에서 해당 ID의 `src`를 실제 `/media/...` URL로 지정합니다.
3. 영상이면 `kind: 'video'`, 이미지/GIF면 `kind: 'image'`를 지정합니다. GIF에 `gifSrc`와 `poster`를 함께 지정하면 클릭 재생 및 정지 이미지 전환 버튼이 표시됩니다. YouTube는 `src` 대신 `youtubeId`를 지정합니다.
4. 미리 작성한 `alt`와 `caption`이 실제 장면·환경·기여 범위와 맞는지 확인합니다. 문구는 자료 확인 후 수정해야 합니다.
   홈페이지 대표 이미지는 `Home.astro`의 `projectCopy[slug].visual`에서 `src`·`alt`·`caption`으로 지정합니다. 영상이면 대표 포스터를 넣고, 영상 자체는 상세 페이지에서 재생하도록 연결합니다.
5. `npm run check`, `npm run build`, `npm run verify`를 실행합니다. 지정한 파일이 없으면 빌드가 실패합니다.

현재 상세 페이지의 `uav-demo`, `mobility-waypoint`, `mobility-aeb-stop`, `vmodel-simulation`, `vmodel-wheel-test`에는 실제 GIF와 포스터를 연결했습니다. 편집 구간과 출처는 [MEDIA_SOURCES.md](MEDIA_SOURCES.md)에 기록했습니다. V2I는 홈페이지에 4주차 비교 구조를, 상세 페이지에 시나리오·비교 설계 슬라이드를 표시합니다. 국민대 6초 주행 영상과 접촉 장면을 제외한 주차 영상은 현재 편집본을 유지합니다.
