# Todo App

React, TypeScript, TailwindCSS, Vite 기반의 심플한한 Todo 관리 웹앱입니다.

## 주요 기능
- 할 일 추가/수정/삭제/완료 (최대 20개 추가 가능)
- 마감일 설정
- 다크/라이트 모드 지원
- 반응형 디자인
- 로컬 스토리지 연동(새로고침 후에도 데이터 유지)
- 접근성 및 키보드 네비게이션 지원
- 컴포넌트 단위 테스트 및 Context API 테스트

## 기술 스택
- React
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- React Context API
- Vitest, Testing Library

## 설치 방법
```bash
# 저장소 클론
$ git clone <저장소 주소>
$ cd todoapp

# 패키지 설치
$ npm install

# 개발 서버 실행
$ npm run dev
```

## 사용 방법
1. 할 일을 입력하고 [추가] 버튼을 클릭하면 목록에 추가됩니다.
2. 각 할 일의 체크박스를 클릭해 완료/미완료를 토글할 수 있습니다.
3. 연필 아이콘(수정)을 눌러 제목/마감일을 수정할 수 있습니다.
4. 휴지통 아이콘(삭제)로 할 일을 삭제할 수 있습니다.
5. 우측 상단의 아이콘으로 다크/라이트 모드를 전환할 수 있습니다.

## 커밋 메시지 예시 (Conventional Commits)
- feat: 새로운 기능 추가
- fix: 버그 수정
- style: 스타일/레이아웃 변경
- refactor: 코드 리팩토링
- test: 테스트 코드 추가/수정
- chore: 빌드/설정/환경 등 기타 작업
- docs: 문서 추가/수정

## 라이선스
MIT
