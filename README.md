# Junghun Hwang — Engineering Portfolio

Astro, TypeScript, MDX 기반의 영어·한국어 정적 포트폴리오입니다. 영어를 기본 언어로 유지하고 `/ko/`에서 한국어 홈페이지와 5개 프로젝트 상세 페이지를 제공합니다. 각 언어의 홈페이지에서 5개 프로젝트를 소개하고, 공개 코드가 있는 프로젝트는 각각의 GitHub 저장소로 연결합니다.

사이트 주소: [영어 홈페이지](https://steveandy-sudo.github.io/) · [한국어 홈페이지](https://steveandy-sudo.github.io/ko/)

홈페이지는 자기소개, 연구 관심 분야, 프로젝트, 수상, 기술 역량 순서입니다. 연구 관심 분야는 자율주행 인지·판단과 학습 기반 주행이며, 데이터 품질과 시나리오 범위가 폐루프 E2E 주행에 미치는 영향을 살펴보려는 관심을 설명합니다. `Home.astro`의 영문 문구와 `src/data/homeKo.ts`의 한국어 문구를 언어에 따라 선택하고, 연구 소개는 `ResearchInterests.astro`로 표시합니다. 프로젝트는 역할·결과 또는 현재 설계 단계와 미디어를 함께 보여줍니다.

`Home.astro`에는 화면용 영문 요약과 대표 미디어를 두고, `homeKo.ts`에는 대응하는 한국어 제목·요약·결과·대체 텍스트·캡션을 둡니다. 국민대와 AI·SW는 실제 이미지, V2I는 기존 발표의 비교 구조 설계안, UAV와 드림학기제는 시뮬레이션 영상에서 추출한 이미지를 표시합니다. 새 대표 자료를 추가할 때는 양쪽 `visual.src`, `alt`, `caption`을 함께 확인합니다. 상세 페이지의 미디어 경로와 영문 설명은 `media.ts`, 한국어 설명은 같은 슬롯 ID의 `mediaKo.ts`에서 관리합니다. 기존 발표 이미지와 영상 자체는 공통 자료로 유지하며, V2I 설계 자료는 설계 단계의 자료로 설명합니다.

홈의 프로젝트 제목과 대표 이미지는 각각 현재 언어의 상세 문서로 연결됩니다. 별도의 `Read case study` 링크는 표시하지 않습니다. 국민대, AI·SW, UAV, 드림학기제에는 공개 GitHub 링크를 하나씩 표시합니다. 저장소가 없는 졸업 프로젝트에는 GitHub 링크를 표시하지 않습니다.

## 개발과 검증

Node.js 24 이상과 npm을 사용합니다. 의존성 버전은 `package-lock.json`으로 고정합니다.

```sh
npm install
npm run dev
npm run check
npm run build
npm run verify
```

`npm run dev`는 개발 화면을 제공합니다. 실제 파일이 없는 미디어 슬롯 중 `reserve: true`인 슬롯은 공개 화면에도 현재 언어의 짧은 제목과 준비 중 안내를 표시해 공간을 확보합니다. 나머지 빈 슬롯의 상세 자료 요청은 개발 화면에서만 보입니다. `npm run build`는 `dist/`에 영어 6개, 한국어 6개, 공통 404 페이지 1개로 구성된 총 13개 HTML 페이지를 생성합니다. `npm run verify`로 생성된 경로, 링크·자산·앵커, 메타데이터, 언어 대응 관계, CV 공개 제외 정책을 확인합니다.

배포 결과와 같은 화면을 확인하려면:

```sh
npm run preview
```

브라우저 검사는 실행 중인 미리보기(`http://127.0.0.1:4321`)를 대상으로 합니다.

```sh
npx playwright install chromium
npm run test:ui
```

별도 브라우저 실행 파일을 쓰려면 `BROWSER_PATH`, 다른 미리보기 주소를 쓰려면 `SITE_URL` 환경변수를 설정합니다. 예를 들어 Windows PowerShell에서는:

```powershell
$env:BROWSER_PATH = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
npm run test:ui
```

브라우저 검사 대상은 영어·한국어의 12개 콘텐츠 경로와 1440 / 768 / 390 / 320px 화면입니다. 언어 전환과 대응 섹션 이동, 현재 언어를 유지하는 메뉴·프로젝트 링크, 목차 이동과 현재 섹션 강조, 키보드 접근, 프로젝트별 GitHub 링크, 한국어 GIF 조작 문구, 200% 글자 확대를 확인합니다. 캡처는 무시되는 `test-results/`에 저장됩니다. 실행 절차와 수동 검토 항목은 [VALIDATION.md](docs/VALIDATION.md)를 따릅니다. 검사 결과는 실제 실행 후 기록하며, 화면 가독성과 번역의 사실관계는 별도로 검토합니다.

## 구조

```text
.
├── .github/workflows/deploy.yml
├── astro.config.mjs
├── package.json / package-lock.json / tsconfig.json
├── src/
│   ├── content.config.ts             # 엄격한 프로젝트 메타데이터 스키마
│   ├── content/projects/en/*.mdx     # 영문 기술 문서 5개
│   ├── content/projects/ko/*.mdx     # 대응하는 한국어 기술 문서 5개
│   ├── components/
│   │   ├── Home.astro
│   │   ├── ResearchInterests.astro
│   │   ├── ProjectToc.astro
│   │   ├── Figure.astro / Video.astro / MediaSlot.astro / ReservedMedia.astro
│   │   ├── Result.astro / Decision.astro / Investigation.astro
│   │   └── StageTimeline.astro
│   ├── layouts/BaseLayout.astro
│   ├── layouts/ProjectCaseStudy.astro
│   ├── data/homeKo.ts               # 한국어 홈 문구·프로젝트 카드
│   ├── data/media.ts / mediaKo.ts   # 공통 미디어 경로·언어별 설명
│   ├── data/projectHighlights.ts / projectHighlightsKo.ts
│   ├── lib/projects.ts
│   ├── pages/index.astro / ko/index.astro / [...route].astro / 404.astro
│   └── styles/global.css
├── public/
│   ├── media/projects/              # 실제 자료를 추가할 위치
│   ├── favicon.svg / robots.txt / .nojekyll
├── docs/MEDIA_REQUESTS.md
├── scripts/verify-site.mjs
└── tests/site.spec.ts / playwright.config.ts
```

`node_modules/`, `.astro/`, `dist/`, 테스트 출력은 버전 관리에서 제외합니다. 서버, 데이터베이스, CMS, 인증은 사용하지 않습니다. 클라이언트 JavaScript는 목차 강조·접기, 언어 전환 시 섹션 앵커 대응, GIF 재생 전환 등의 화면 동작에 사용합니다. 본문과 기본 링크는 JavaScript 없이도 읽을 수 있습니다.

## 주소

| 영어 주소 | 한국어 주소 | 내용 |
| --- | --- | --- |
| `/` | `/ko/` | 홈페이지 |
| `/projects/kookmin-ai-edge/` | `/ko/projects/kookmin-ai-edge/` | 국민대 AI-Edge 자율주행 |
| `/projects/ai-sw-mobility/` | `/ko/projects/ai-sw-mobility/` | 대학생 AI·SW 모빌리티 |
| `/projects/camera-v2i-e2e/` | `/ko/projects/camera-v2i-e2e/` | 카메라 기반 V2I·E2E 졸업 프로젝트 |
| `/projects/uav-waypoint/` | `/ko/projects/uav-waypoint/` | 무인기 웨이포인트 임무 |
| `/projects/vmodel-neuro-symbolic/` | `/ko/projects/vmodel-neuro-symbolic/` | 드림학기제 판단·제어 |

`/404.html`은 공통 오류 안내 페이지이며 별도 한국어 404 경로는 생성하지 않습니다.

상단의 `English`·`한국어` 링크로 같은 콘텐츠의 언어를 전환합니다. 홈의 공통 섹션과 상세 문서의 대응 제목으로 이동할 때 현재 섹션을 유지합니다. 각 상세 문서 위쪽에는 기간·역할·팀·상태·결과를 표시하고, 개인 기여 영역에서 팀 시스템과 본인 작업을 구분합니다. 데스크톱 목차는 고정되며, 모바일에서는 펼칠 수 있는 목차로 전환됩니다. 목차는 실제 존재하는 2단계 제목(`##`)에서 만들어집니다.

## 프로젝트 추가와 수정

본문은 `src/content/projects/en/<slug>.mdx`와 `src/content/projects/ko/<slug>.mdx`를 한 쌍으로 관리합니다. `src/content.config.ts`의 스키마가 잘못된 값과 알 수 없는 필드를 빌드 단계에서 차단합니다. `src/lib/projects.ts`는 언어별 중복·누락과 양쪽 메타데이터의 사실값 불일치를 확인합니다.

메타데이터 필드는 다음과 같습니다.

| 필드 | 용도 |
| --- | --- |
| `slug`, `lang`, `order` | 주소, 콘텐츠 언어(`en` 또는 `ko`), 노출 순서. 같은 언어 안에서 slug 중복 금지 |
| `title`, `titleEn` | 표시 제목과 영어 제목 |
| `context`, `period`, `team`, `role` | 프로젝트 맥락, 기간, 선택적 팀 정보, 개인 역할 |
| `status` | `completed`, `ended`, `ongoing`, `design` 중 하나 |
| `summary`, `outcome` | 요약과 현재 결과. 계획을 완료로 서술하지 않음 |
| `teamScope`, `contributions` | 팀 전체 범위와 개인 기여 목록. 모든 프로젝트에서 필수 |
| `technologies` | 3–5개의 실제 사용 기술 |
| `github`, `githubVisibility`, `githubPrivateReason`, `demo` | 선택적 링크. 비공개 저장소는 링크 대신 비공개 상태와 사유를 표시 |
| `thumbnail` | 선택적 `src`, `alt`, `caption`. 실제 이미지가 있을 때만 지정 |
| `featured` | 홈페이지 표시 여부 |

새 프로젝트는 실제 확인된 내용으로 영어·한국어 문서를 함께 작성하고 같은 `slug`와 `order`를 지정합니다. `titleEn`, `period`, `team`, `status`, `technologies`, 저장소·시연 링크, 공개 상태, `featured`의 사실값은 양쪽에서 유지합니다. 기간·팀 인원·기술 명칭의 한국어 화면 표기는 표시 계층에서 처리합니다.

홈의 영문 요약·대표 미디어는 `Home.astro`, 한국어 대응 문구는 `homeKo.ts`에 추가합니다. 상세 페이지 상단 요약과 바로가기 문구는 `projectHighlights.ts`·`projectHighlightsKo.ts`에서 관리합니다. `##`·`###` 제목의 개수·깊이·순서는 두 언어에서 같아야 하며, 이 대응 관계로 언어 전환 시 제목 앵커를 연결합니다. `projectHighlightsKo.ts`의 바로가기 앵커는 영문 기준 ID를 유지하고 표시 시 한국어 제목 ID로 변환합니다. 내용이 없는 구간이나 빈 Gallery 제목은 만들지 않습니다. `overview`, `my-contribution`, `links`는 공통 레이아웃에서 사용하는 ID이므로 본문 제목으로 중복하지 않습니다.

주간 업데이트는 양쪽 MDX의 `outcome`, 상태, 실험 내용과 관련 요약부터 함께 바꿉니다. 측정값은 환경·시험 조건·의미를 함께 기입하고, 추정 원인은 가설로 유지합니다. 번역에서도 개인·팀의 수행 범위, 설계·구현·실험 단계, 수치와 조건을 보존합니다.

## 기여와 결과의 경계

- 국민대: 데이터·학습 파이프라인, 통합 YOLO 모델, 미션 통합, 주차 웨이포인트와 후진 복구 등 직접 맡은 역할을 구체적으로 설명합니다. 수상과 순위는 팀 결과로 표시합니다.
- AI·SW: 2026년 9월 19–20일 대회장 개방 연습의 실차 결과는 예선·본선 코스 waypoint 주행 10 m/s(36 km/h), 50 km/h에서 AEB 정지 명령 확인입니다. 브레이크 4개 중 2개 작동 불가로 요구 구간 내 정지는 달성하지 못했습니다(대회 요구 30 km/h). AEB는 빨간 콘 시작점에서 제동해 구간 끝 이전에 완전히 정지하는 기준입니다. 공식 대회 결과와 구분하며 정확한 반복 횟수·성공률·조향 오차 개선량은 추가하지 않습니다.
- V2I: 5명 팀의 이번 학기 범위는 관련 연구 조사와 예비 설계입니다. 개인 기여는 UniV2X 일부 검토·요약, 단순화한 융합 방식 제안, 팀 논의를 반영한 중간발표 자료 작성, 진행 중인 통신 방식 조사로 설명합니다. 모델 학습과 축소 차량 폐루프 비교는 후속 계획으로 유지하고, 기존 발표 이미지는 작성 당시의 설계 자료로 구분합니다.
- UAV: waypoint 패키지 개발과 기존 offboard controller 연동을 본인 역할로 설명하고, 시뮬레이션에서의 경로 추종·착륙 결과를 제시합니다.
- 드림학기제: ROS 2 / CARLA 구현·폐루프 실험과, 차량을 받침대 위에 올리고 별도 제어 명령으로 수행한 바퀴 구동 시험을 구분합니다.

국민대 프로젝트 상세 페이지는 상단의 GitHub 링크 하나로 `steveandy-sudo/kookmin-autonomous-portfolio` 저장소에 연결합니다. 본인 역할과 팀 시스템을 구체적으로 설명하며, 하지 않은 일을 나열하는 표현은 생략합니다.

## 이미지·GIF·아키텍처 그림

자료 요청과 정확한 슬롯 위치는 [MEDIA_REQUESTS.md](docs/MEDIA_REQUESTS.md)에 있습니다. 실제 사진, 영상, 아키텍처 그림이 없는 상태에서 가상의 실험 자료를 만들지 않았습니다.

```text
public/media/projects/
├── kookmin-ai-edge/
├── ai-sw-mobility/
├── camera-v2i/
├── uav-waypoint/
└── vmodel-neuro-symbolic/
```

파일명은 `01_system_architecture.webp`, `02_gazebo_test.webp`, `03_real_vehicle.mp4`처럼 순서와 내용을 표현합니다. 대문자·공백 대신 소문자와 밑줄을 사용합니다. 사진은 JPG/WebP, 선과 글자가 많은 그림은 PNG/SVG, 짧은 동작은 MP4를 권장합니다. GIF도 이미지로 지원합니다.

기존 슬롯은 `src/data/media.ts`에 `src`와 `kind`를 추가하면 연결됩니다. 한국어 제목·대체 텍스트·캡션은 `src/data/mediaKo.ts`의 동일한 슬롯 ID에 작성합니다. `target`은 제안 경로이며 링크가 아닙니다. 캡션은 반드시 받은 자료의 실제 장면과 맞춰 검토합니다. 존재하지 않는 경로를 지정하면 빌드를 실패시켜 깨진 이미지를 방지합니다. 한국어 MDX에서 `MediaSlot`, `Video`, `AnimatedFigure`를 사용할 때는 `lang="ko"`를 전달합니다.

AI·SW의 `mobility-waypoint`·`mobility-aeb-stop`, UAV의 `uav-demo`, 드림학기제의 `vmodel-simulation`·`vmodel-wheel-test`에는 클릭 재생 GIF와 포스터를 연결했습니다. `kind: image`에 `gifSrc`와 `poster`를 함께 지정하면 `AnimatedFigure`가 표시됩니다. 편집 구간은 [미디어 출처](docs/MEDIA_SOURCES.md)에 기록합니다. 예약 슬롯에 자료를 추가할 때는 실제 `src`와 필요 시 `poster`를 지정합니다. 예약 상자는 자동으로 실제 사진·영상으로 교체됩니다. 공개 예약 상자에는 파일명·업로드 버튼·재생 버튼을 표시하지 않습니다.

홈페이지 등에서 공간만 예약할 때는 `ReservedMedia.astro`에 현재 언어의 `title`, `kind` (`image` 또는 `video`), `lang`을 전달합니다. 상태 문구도 해당 언어로 표시합니다. GIF는 재생·정지 이미지 전환을 유지하고 다운로드 버튼은 표시하지 않습니다.

직접 그림을 배치할 수도 있습니다. 아래는 **실제 파일을 준비한 뒤** 사용하는 예시이며, 이 경로에 가짜 그림을 생성하지 않습니다.

```mdx
import Figure from '../../../components/Figure.astro';

<Figure
  src="/media/projects/kookmin-ai-edge/01_system_architecture.webp"
  alt="확인된 실제 시스템의 모듈과 연결을 설명하는 대체 텍스트"
  number={1}
  caption="실제 그림의 의미와 개인·팀 기여 범위를 설명하는 캡션"
  width={1200}
  height={700}
/>
```

`srcset`과 `sizes`로 여러 해상도를 지정할 수 있습니다. `source={{ label: '자료 출처', href: '실제 확인한 주소' }}`는 출처가 있을 때만 추가합니다. 아키텍처는 확인된 노드·토픽·데이터 흐름을 사용하고 팀 시스템과 개인 구현 범위를 캡션에 명시합니다.

## 동영상

`Video`는 MP4와 YouTube를 지원합니다. 자동 재생은 없으며 MP4는 재생 컨트롤과 선택적 WebVTT 자막을 제공합니다.

```mdx
import Video from '../../../components/Video.astro';

<Video
  src="/media/projects/uav-waypoint/01_waypoint_landing.mp4"
  title="실제 시연 내용을 설명하는 제목"
  caption="시뮬레이션 환경과 본인 패키지의 역할을 설명하는 캡션"
  lang="ko"
/>
```

실제 YouTube 영상이 있으면 `src` 대신 `youtubeId`에 11자리 영상 ID를 지정합니다. `poster`, `captionsSrc`, `captionsLang`도 선택적으로 사용할 수 있습니다. 파일을 추가하기 전에는 컴포넌트를 렌더링하지 않거나 기존 `MediaSlot`을 유지합니다.

## 결과·설계 판단·개발 단계

`Result`는 `label`, `value`, `context`를 모두 요구합니다. 예를 들어 국민대 순위의 `context`에는 대회와 팀 결과임을 포함합니다. 속도는 시뮬레이션/실차, 초기 시험/최종 검증 등 측정 맥락을 함께 씁니다.

`Decision`은 `title`, `considered`, `observation`, `choice`, `reason`으로 선택의 근거를 설명합니다. `Investigation`은 `problem`, `observation`, `investigation`, `status`로 미해결 문제를 기록합니다. `StageTimeline`은 각 단계의 `state`를 `complete`, `current`, `planned`로 구분합니다. 미래 단계를 완료로 표시하지 않습니다.

## 사이트 언어

기본 경로는 영어이며 `/ko/` 접두사로 한국어 홈페이지와 상세 문서를 제공합니다. 화면 문구, 이미지 대체 텍스트, 캡션, 접근성 이름, 메타데이터도 각 언어에 맞춰 작성합니다. `canonical`은 현재 페이지를 가리키고 `hreflang`의 `en`·`ko`는 대응 페이지를, `x-default`는 영어 페이지를 가리킵니다. 공통 404 페이지에는 언어 전환 메뉴와 대응 언어 링크를 표시하지 않습니다.

한국어 제목·카드·역할은 명사형을 기본으로 하고, 상세 설명은 `-다`·`-했다`, 진행 중인 작업은 현재형을 사용합니다. `판단`, `행동 계획`, `주행 거동`, `계획 경로`, `기준 경로`, `타임스탬프`, `경로 추종`, `폐루프`의 용어를 일관되게 사용합니다. `Camera-only`는 모델 명칭을 유지하고, `V2I-assisted`는 `V2I 정보 활용`으로 옮깁니다. 고유 모델·도구 이름, 수식, 코드·토픽·파일 경로는 원문을 보존합니다. 기존 발표 이미지와 영상 내부 문구는 원본 자료로 유지하고 주변 설명을 번역합니다.

## CV PDF

CV는 개인 로컬 폴더에서 관리하며 공개 사이트와 저장소의 현재 버전에 포함하지 않습니다. 홈페이지에 CV 메뉴나 다운로드 링크를 추가하지 않습니다.

`public/cv/`는 Git 추적 대상에서 제외하고, 배포 검사는 빌드 결과에 CV PDF가 포함되면 중단합니다. 기존 영문·국문 CV 직접 주소는 HTTP 404를 반환해야 합니다.

## GitHub Pages 배포

저장소 이름은 `steveandy-sudo.github.io`, 사이트 주소는 `https://steveandy-sudo.github.io`입니다. Astro 설정에 저장소 이름을 `base`로 추가하지 않습니다.

1. GitHub 저장소의 **Settings → Pages → Source**를 **GitHub Actions**로 설정합니다.
2. `main`에 변경을 push합니다. `.github/workflows/deploy.yml`이 설치, 타입 검사, 정적 빌드, 링크 검사를 수행한 뒤 배포합니다.
3. Pull request에서는 검사만 수행하고 공개 배포하지 않습니다.
4. Actions에서 배포 완료를 확인한 뒤 실제 주소를 열고 기존 CV 직접 주소가 HTTP 404를 반환하는지 확인합니다.

```sh
npm run verify -- --live https://steveandy-sudo.github.io
```

생성 결과 `dist/`를 직접 수정하거나 커밋하지 않습니다. 콘텐츠와 원본 자산을 수정하고 다시 배포합니다. Pages 배포 권한은 배포 작업에만 부여하며 별도 비밀 토큰을 저장하지 않습니다.

## 참고 범위

[Avionics 기술 문서 사이트](https://graduationproject-team3-avionics.github.io/)의 개요·시스템·하위 모듈·검증으로 이어지는 상세 문서 구조를 참고했습니다. 해당 사이트의 코드, CSS, 문장, 그림, 시각 정체성은 가져오지 않았습니다.

기술 참고: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/), [Astro GitHub Pages 배포](https://docs.astro.build/en/guides/deploy/github/).
