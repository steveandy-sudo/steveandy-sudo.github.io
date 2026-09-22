# Junghun Hwang — Engineering Portfolio

Astro, TypeScript, MDX 기반의 영문 정적 포트폴리오입니다. 홈페이지에서 5개 프로젝트를 소개하고, 공개 코드가 있는 프로젝트는 각각의 GitHub 저장소로 연결합니다.

사이트 주소: **https://steveandy-sudo.github.io/**

홈페이지는 자기소개, 연구 관심 분야, 프로젝트, 수상, 기술 역량 순서입니다. 연구 관심 분야는 사용자에게 확인한 자율주행 인지·판단 및 딥러닝·학습 기반 방법이며, E2E 자율주행을 직접 구현하고 실험하려는 연구 의지를 포함합니다. `Home.astro`의 영문 문구를 `ResearchInterests.astro`로 표시합니다. 연구 소개는 첫 문장을 강조하고 세 가지 질문을 나란히 보여주며, 프로젝트는 짧은 제목·역할·검증된 결과와 미디어를 함께 표시합니다.

`Home.astro`에는 화면용 영문 요약과 대표 미디어를 둡니다. 국민대와 AI·SW는 실제 이미지, V2I는 4주차 발표의 비교 구조 설계안, UAV와 드림학기제는 시뮬레이션 영상에서 추출한 이미지를 표시합니다. 새 대표 이미지나 영상 포스터를 받으면 해당 `visual.src`, `alt`, `caption`을 추가합니다. 실제 영상은 상세 페이지의 `media.ts` 슬롯에 연결하며, V2I 설계 자료를 실험 결과로 표현하지 않습니다.

홈의 프로젝트 제목과 대표 이미지는 각각 해당 상세 문서로 연결됩니다. 별도의 `Read case study` 링크는 표시하지 않습니다. 국민대, UAV, 드림학기제에는 GitHub 링크를 하나씩 표시하고, AI·SW는 대회 진행 중 비공개라는 상태를 표시합니다. 저장소가 없는 졸업설계에는 GitHub 링크를 표시하지 않습니다.

## 개발과 검증

Node.js 24 이상과 npm을 사용합니다. 의존성 버전은 `package-lock.json`으로 고정합니다.

```sh
npm install
npm run dev
npm run check
npm run build
npm run verify
```

`npm run dev`는 개발 화면을 제공합니다. 실제 파일이 없는 미디어 슬롯 중 `reserve: true`인 슬롯은 공개 화면에도 짧은 제목과 `Video forthcoming` 또는 `Image forthcoming`를 표시해 공간을 확보합니다. 나머지 빈 슬롯의 상세 자료 요청은 개발 화면에서만 보입니다. `npm run build`는 `dist/`에 정적 HTML을 생성합니다.

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

검사는 1440 / 768 / 390 / 320px 화면, 목차 이동과 현재 섹션 강조, 키보드 접근, 영문 페이지와 언어 전환 메뉴 부재, 프로젝트별 GitHub 링크, 200% 글자 확대를 확인합니다. 캡처는 무시되는 `test-results/`에 저장됩니다. HTML·앵커 검사는 실제 화면의 가독성이나 사실관계 검토를 대신하지 않습니다.

## 구조

```text
.
├── .github/workflows/deploy.yml
├── astro.config.mjs
├── package.json / package-lock.json / tsconfig.json
├── src/
│   ├── content.config.ts             # 엄격한 프로젝트 메타데이터 스키마
│   ├── content/projects/en/*.mdx     # 5개 기술 문서
│   ├── components/
│   │   ├── Home.astro
│   │   ├── ResearchInterests.astro
│   │   ├── ProjectToc.astro
│   │   ├── Figure.astro / Video.astro / MediaSlot.astro / ReservedMedia.astro
│   │   ├── Result.astro / Decision.astro / Investigation.astro
│   │   └── StageTimeline.astro
│   ├── layouts/BaseLayout.astro
│   ├── layouts/ProjectCaseStudy.astro
│   ├── data/media.ts
│   ├── lib/projects.ts
│   ├── pages/index.astro / [...route].astro / 404.astro
│   └── styles/global.css
├── public/
│   ├── cv/                          # 기존 PDF 직접 주소 유지; 홈페이지에는 표시하지 않음
│   ├── media/projects/              # 실제 자료를 추가할 위치
│   ├── favicon.svg / robots.txt / .nojekyll
├── docs/MEDIA_REQUESTS.md
├── scripts/verify-site.mjs
└── tests/site.spec.ts / playwright.config.ts
```

`node_modules/`, `.astro/`, `dist/`, 테스트 출력은 버전 관리에서 제외합니다. 서버, 데이터베이스, CMS, 인증은 사용하지 않습니다. 클라이언트 JavaScript는 프로젝트 목차 강조와 모바일 목차 접기에만 사용하며, 본문과 링크는 JavaScript 없이도 읽을 수 있습니다.

## 주소

| 주소 | 내용 |
| --- | --- |
| `/` | 영어 홈페이지 |
| `/projects/kookmin-ai-edge/` | 국민대 AI-엣지 챌린지 |
| `/projects/ai-sw-mobility/` | 대학생 AI·SW 모빌리티 |
| `/projects/camera-v2i-e2e/` | Camera V2I E2E 졸업설계 |
| `/projects/uav-waypoint/` | UAV waypoint 미션 |
| `/projects/vmodel-neuro-symbolic/` | V-Model 드림학기제 |
| `/404.html` | 없는 페이지 안내 |

사이트는 영어로 제공하며 한국어 페이지와 언어 전환 메뉴는 없습니다. 각 상세 문서의 기간·역할·팀·상태·결과를 위쪽에 표시합니다. `My contribution`에서 팀 시스템과 본인 작업을 구분합니다. 데스크톱 목차는 고정되며, 모바일에서는 펼칠 수 있는 목차로 전환됩니다. 목차는 실제 존재하는 2단계 제목(`##`)에서 만들어집니다.

## 프로젝트 추가와 수정

본문은 `src/content/projects/en/<slug>.mdx`에서 관리합니다. `src/content.config.ts`의 스키마가 잘못된 값과 알 수 없는 필드를 빌드 단계에서 차단합니다.

메타데이터 필드는 다음과 같습니다.

| 필드 | 용도 |
| --- | --- |
| `slug`, `lang`, `order` | 주소, 콘텐츠 언어(`en`), 노출 순서. slug 중복 금지 |
| `title`, `titleEn` | 표시 제목과 영어 제목 |
| `context`, `period`, `team`, `role` | 프로젝트 맥락, 기간, 선택적 팀 정보, 개인 역할 |
| `status` | `completed`, `ended`, `ongoing`, `design` 중 하나 |
| `summary`, `outcome` | 요약과 현재 결과. 계획을 완료로 서술하지 않음 |
| `teamScope`, `contributions` | 팀 전체 범위와 개인 기여 목록. 모든 프로젝트에서 필수 |
| `technologies` | 3–5개의 실제 사용 기술 |
| `github`, `githubVisibility`, `githubPrivateReason`, `demo` | 선택적 링크. 비공개 저장소는 링크 대신 비공개 상태와 사유를 표시 |
| `thumbnail` | 선택적 `src`, `alt`, `caption`. 실제 이미지가 있을 때만 지정 |
| `featured` | 홈페이지 표시 여부 |

새 프로젝트는 기존 영문 문서를 복사한 뒤 실제 확인된 내용으로 바꾸고, `slug`와 `order`를 지정합니다. 홈에 사용할 요약과 대표 미디어는 `Home.astro`에 추가합니다. `##` 제목으로 필요한 문서 구간만 작성합니다. 내용이 없는 구간이나 빈 Gallery 제목은 만들지 않습니다. `overview`, `my-contribution`, `links`는 공통 레이아웃에서 사용하는 ID이므로 본문 제목으로 중복하지 않습니다.

주간 업데이트는 해당 MDX의 `outcome`, 상태, 실험 내용부터 바꿉니다. 측정값은 환경·시험 조건·의미를 함께 기입하고, 추정 원인은 `hypothesis`로 유지합니다.

## 기여와 결과의 경계

- 국민대: 데이터·학습 파이프라인, 통합 YOLO 모델, 미션 통합, 주차 웨이포인트와 후진 복구 등 직접 맡은 역할을 구체적으로 설명합니다. 수상과 순위는 팀 결과로 표시합니다.
- AI·SW: 2026년 9월 19–20일 대회장 개방 연습의 실차 결과는 예선·본선 코스 waypoint 주행 10 m/s(36 km/h), 50 km/h에서 AEB 정지 명령 확인입니다. 브레이크 4개 중 2개 작동 불가로 요구 구간 내 정지는 달성하지 못했습니다(대회 요구 30 km/h). AEB는 빨간 콘 시작점에서 제동해 구간 끝 이전에 완전히 정지하는 기준입니다. 공식 대회 결과와 구분하며 정확한 반복 횟수·성공률·조향 오차 개선량은 추가하지 않습니다.
- V2I: 4주차 발표 기준 1/5 크기 실험 차량의 사용자 요구·ODD 정의 완료, 시스템 요구·상위 설계 진행 중입니다. Homography, 직접 객체 상태 전송, 동일 조건의 E2E 비교, 최소 인지거리 식과 단계별 지연시간 평가 계획을 반영했습니다. 구현·실차 검증 및 수치 결과는 아직 없습니다.
- UAV: waypoint 패키지 개발과 기존 offboard controller 연동을 본인 역할로 설명하고, 시뮬레이션에서의 경로 추종·착륙 결과를 제시합니다.
- V-Model: 안정적인 자율주행을 달성하지 못했다는 결과를 유지합니다.

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

기존 슬롯은 `src/data/media.ts`에 `src`와 `kind`를 추가하면 연결됩니다. `target`은 제안 경로이며 링크가 아닙니다. 캡션은 반드시 받은 자료의 실제 장면과 맞춰 검토합니다. 존재하지 않는 경로를 지정하면 빌드를 실패시켜 깨진 이미지를 방지합니다.

AI·SW의 `mobility-waypoint`·`mobility-aeb-stop`, UAV의 `uav-demo`, 드림학기제의 `vmodel-simulation`·`vmodel-wheel-test`에는 클릭 재생 GIF와 포스터를 연결했습니다. `kind: image`에 `gifSrc`와 `poster`를 함께 지정하면 `AnimatedFigure`가 표시됩니다. 편집 구간은 [미디어 출처](docs/MEDIA_SOURCES.md)에 기록합니다. 예약 슬롯에 자료를 추가할 때는 실제 `src`와 필요 시 `poster`를 지정합니다. 예약 상자는 자동으로 실제 사진·영상으로 교체됩니다. 공개 예약 상자에는 파일명·업로드 버튼·재생 버튼을 표시하지 않습니다.

홈페이지 등에서 공간만 예약할 때는 `ReservedMedia.astro`에 영문 `title`과 `kind` (`image` 또는 `video`)를 전달합니다. 상태 문구는 영어로 표시됩니다.

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
/>
```

실제 YouTube 영상이 있으면 `src` 대신 `youtubeId`에 11자리 영상 ID를 지정합니다. `poster`, `captionsSrc`, `captionsLang`도 선택적으로 사용할 수 있습니다. 파일을 추가하기 전에는 컴포넌트를 렌더링하지 않거나 기존 `MediaSlot`을 유지합니다.

## 결과·설계 판단·개발 단계

`Result`는 `label`, `value`, `context`를 모두 요구합니다. 예를 들어 국민대 순위의 `context`에는 대회와 팀 결과임을 포함합니다. 속도는 시뮬레이션/실차, 초기 시험/최종 검증 등 측정 맥락을 함께 씁니다.

`Decision`은 `title`, `considered`, `observation`, `choice`, `reason`으로 선택의 근거를 설명합니다. `Investigation`은 `problem`, `observation`, `investigation`, `status`로 미해결 문제를 기록합니다. `StageTimeline`은 각 단계의 `state`를 `complete`, `current`, `planned`로 구분합니다. 미래 단계를 완료로 표시하지 않습니다.

## 사이트 언어

홈페이지와 상세 문서는 영어로 관리합니다. 화면 문구, 이미지 대체 텍스트, 캡션도 영어로 작성합니다. 한국어 웹페이지와 언어 전환 메뉴는 제공하지 않습니다. 한국어 CV PDF는 별도 문서로 유지합니다.

## CV PDF

`public/cv/`에 다음 이름으로 실제 PDF를 넣습니다.

- `Junghun_Hwang_CV_V1_EN.pdf` — 영어, 학점 포함
- `Junghun_Hwang_CV_V1_KO.pdf` — 한국어, 학점 포함
- `Junghun_Hwang_CV_V2_EN.pdf` — 영어, 학점 미표기
- `Junghun_Hwang_CV_V2_KO.pdf` — 한국어, 학점 미표기

홈페이지의 CV 섹션과 상단 CV 메뉴는 제거했습니다. V2 PDF 2종은 직접 주소로 접근할 수 있도록 유지합니다. V1은 학점 미확정 때문에 포함하지 않았습니다. 공통 GitHub 링크 대신 프로젝트별 저장소를 홈과 상세 페이지에서 안내합니다. AI·SW 저장소는 대회 진행 중 비공개이므로 `githubVisibility: private`와 `githubPrivateReason`으로 사유를 표시하며, 공개 페이지에 접근 불가능한 저장소 링크를 만들지 않습니다. 상태 표시는 `RepositoryAccess.astro`에서 공통으로 관리합니다.

## GitHub Pages 배포

저장소 이름은 `steveandy-sudo.github.io`, 사이트 주소는 `https://steveandy-sudo.github.io`입니다. Astro 설정에 저장소 이름을 `base`로 추가하지 않습니다.

1. GitHub 저장소의 **Settings → Pages → Source**를 **GitHub Actions**로 설정합니다.
2. `main`에 변경을 push합니다. `.github/workflows/deploy.yml`이 설치, 타입 검사, 정적 빌드, 링크 검사를 수행한 뒤 배포합니다.
3. Pull request에서는 검사만 수행하고 공개 배포하지 않습니다.
4. Actions에서 배포 완료를 확인한 뒤 실제 주소와 PDF를 열어 확인합니다.

```sh
npm run verify -- --live https://steveandy-sudo.github.io
```

생성 결과 `dist/`를 직접 수정하거나 커밋하지 않습니다. 콘텐츠와 원본 자산을 수정하고 다시 배포합니다. Pages 배포 권한은 배포 작업에만 부여하며 별도 비밀 토큰을 저장하지 않습니다.

## 참고 범위

[Avionics 기술 문서 사이트](https://graduationproject-team3-avionics.github.io/)의 개요·시스템·하위 모듈·검증으로 이어지는 상세 문서 구조를 참고했습니다. 해당 사이트의 코드, CSS, 문장, 그림, 시각 정체성은 가져오지 않았습니다.

기술 참고: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/), [Astro GitHub Pages 배포](https://docs.astro.build/en/guides/deploy/github/).
