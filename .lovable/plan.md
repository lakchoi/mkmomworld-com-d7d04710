## 목표
유튜브 썸네일을 클릭하면 **새 탭으로 이동하는 대신**, 홈페이지 안에서 바로 영상이 재생되도록 변경합니다.

## 구현 방식
**모달(Dialog) + iframe 임베드 방식** — 썸네일 클릭 시 화면 중앙에 어두운 오버레이와 함께 9:16 세로 플레이어가 뜨고, 자동 재생됩니다. 바깥 클릭 또는 X 버튼으로 닫힙니다.

### 변경 파일
**`src/components/YoutubeSection.tsx`**
- `<a target="_blank">` → `<button onClick>`로 변경
- `useState`로 선택된 비디오 ID 관리
- shadcn `Dialog` 컴포넌트 추가 → 내부에 YouTube iframe 임베드
  - `https://www.youtube.com/embed/{id}?autoplay=1&rel=0`
  - `allow="autoplay; encrypted-media; picture-in-picture"`, `allowFullScreen`
  - 9:16 비율 컨테이너 (Shorts 영상에 최적화)
- "유튜브 채널 바로가기" 버튼은 그대로 유지 (외부 이동)

### 참고 사항
- 일부 영상은 채널 소유자가 외부 임베드를 차단해두면 플레이어 안에 "동영상 소유자가 외부 사이트에서 재생을 사용 중지함" 메시지가 뜰 수 있습니다. 이 경우를 대비해 모달 하단에 **"YouTube에서 보기"** 링크 버튼을 함께 제공합니다.
- 모바일에서는 `max-w-sm`, 데스크톱에서는 `max-w-md` 정도의 좁은 너비로 Shorts 비율을 유지합니다.
