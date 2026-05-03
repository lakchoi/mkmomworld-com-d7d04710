# 메인 페이지에 유튜브 섹션 추가

채널 `https://www.youtube.com/@송우선-e4m` 의 최신 영상(특히 Shorts)을 메인 페이지에 노출합니다.

## 구현 방식

**API 키 없이** 유튜브가 공개 제공하는 RSS 피드를 사용합니다 — 채널 핸들로부터 channel ID를 알아내, 최신 15개 영상을 자동으로 불러와 카드 형태로 표시합니다.

- 비용 0원, 키 0개
- 새 영상이 채널에 올라오면 사이트에도 자동 반영
- 썸네일·제목·게시일을 카드로 표시, 클릭 시 유튜브 새 탭으로 이동

## 섹션 디자인

```text
┌────────────────────────────────────────────────┐
│              유튜브 채널                         │
│         송우선의 영상으로 만나보세요              │
│                                                 │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐       │
│  │썸네일│ │썸네일│ │썸네일│ │썸네일│ │ ▶  │       │
│  │     │ │     │ │     │ │     │ │ +  │       │
│  └────┘  └────┘  └────┘  └────┘  └────┘       │
│  제목     제목     제목     제목   채널방문      │
│  3일전    1주전    ...                          │
│                                                 │
│        [  유튜브 채널 바로가기  ]                │
└────────────────────────────────────────────────┘
```

- 다크 네이비 배경 + 시안 액센트 (사이트 톤 유지)
- `rounded-3xl`, `shadow-2xl` 카드 스타일 (사이트 컨벤션과 일치)
- 데스크톱 5열 / 태블릿 3열 / 모바일 2열 그리드
- 마지막 카드는 "채널 전체 보기"로 채널 페이지 이동
- Shorts 영상은 9:16 비율 썸네일로 표시

## 기술 세부사항

### 1. 유튜브 데이터 가져오기 (Edge Function)

브라우저에서 직접 RSS를 부르면 CORS에 막히므로 **edge function이 프록시** 역할을 합니다.

```text
브라우저
  ↓ GET /functions/v1/youtube-feed
Edge Function (youtube-feed)
  ↓ 1) 채널 핸들 → channel ID 조회 (최초 1회만, 결과는 함수 내부에 하드코딩)
  ↓ 2) https://www.youtube.com/feeds/videos.xml?channel_id=XXX
  ↓ 3) XML 파싱 → JSON 변환 (제목, videoId, 게시일, 썸네일 URL)
  ↓ 4) Cache-Control 헤더로 1시간 캐싱
브라우저
  ↓ 데이터 수신
YoutubeSection 컴포넌트 렌더링
```

- 채널 ID는 채널 페이지 HTML의 `<meta itemprop="identifier">` 또는 `channelId`에서 추출
- 한 번 알아낸 channel ID는 함수 내부 상수로 저장 (매번 조회할 필요 없음)
- `verify_jwt = false`로 공개 호출 가능

### 2. 프론트엔드 구성

```text
src/
├── components/
│   └── YoutubeSection.tsx     ← 신규
├── hooks/
│   └── useYoutubeVideos.ts    ← 신규 (react-query로 1시간 캐싱)
├── pages/
│   └── Index.tsx              ← 수정 (섹션 삽입)
└── supabase/functions/
    └── youtube-feed/
        └── index.ts           ← 신규 edge function
```

### 3. Index 페이지 삽입 위치

현재 Index 구조를 확인해 적절한 위치에 배치 — 보통 **CallToAction 직전** 또는 **DreamsSection 다음**이 자연스럽습니다. 정확한 위치는 구현 시 Index.tsx를 보고 결정합니다.

### 4. 에러 처리 / 폴백

- 영상 로드 실패 시: "유튜브 채널 바로가기" 버튼만 표시 (섹션은 유지)
- 로딩 중: 스켈레톤 UI 5개

## 결과물

- 섹션 1개 추가 (`YoutubeSection`)
- Edge function 1개 추가 (`youtube-feed`)
- Hook 1개 추가 (`useYoutubeVideos`)
- 메인 페이지에 자동 노출
- **새 영상 업로드 시 사이트 자동 갱신** (1시간 이내)

## 범위 외 (필요하면 추후)

- 관리자 페이지에서 유튜브 채널 URL 변경 (지금은 코드 상수)
- 영상 클릭 시 사이트 내 모달로 재생 (지금은 유튜브로 이동)
- Shorts / 일반 영상 구분 필터

진행해도 될까요?