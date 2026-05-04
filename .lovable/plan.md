캠페인 순서 확인 완료:
1. "터치소리" 안심귀가
2. 먹거리 안전
3. 환경보호
4. **경제생활안정** ← 캠페인 04
5. 병원동행서비스

수정 계획 (`src/components/SubjectsSection.tsx`의 `fallbackImages` 객체 내부만 수정):

1. **20번째 줄**: `"병원동행서비스": campaignEconomy` → `"병원동행서비스": campaignHospital`
2. **추가**: `"경제생활안정": campaignEconomy` 항목 추가 (캠페인 04에 해당)

그 외 어떠한 코드, 텍스트, 디자인, 데이터도 절대 변경하지 않습니다.