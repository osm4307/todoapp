I built it using Vibe coding.

# Todo App

React, TypeScript, TailwindCSS, Vite 기반의 심플한한 Todo 관리 웹앱입니다.
This is a simple Todo management web application built with React, TypeScript, TailwindCSS, and Vite.

## 주요 기능 Key Features
- 할 일 추가/수정/삭제/완료 (최대 20개 추가 가능) Add, edit, delete, and complete tasks (up to 20 tasks can be added)
- 마감일 설정 Set due dates
- 다크/라이트 모드 지원 Dark/Light mode support
- 반응형 디자인 Responsive design
- 로컬 스토리지 연동(새로고침 후에도 데이터 유지) Local storage integration (data persists after refresh)
- 접근성 및 키보드 네비게이션 지원 Accessibility and keyboard navigation support
- 컴포넌트 단위 테스트 및 Context API 테스트 Component unit testing and Context API testing

## 기술 스택 Tech Stack
- React
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- React Context API
- Vitest, Testing Library

## 설치 방법
```bash
# 저장소 클론 Clone the repository
$ git clone <repository URL>
$ cd todoapp

# 패키지 설치 Install dependencies
$ npm install

# 개발 서버 실행 Run the development server
$ npm run dev
```

## 사용 방법 How to Use
1. 할 일을 입력하고 [+] 버튼을 클릭하면 목록에 추가됩니다. Enter a task and click the [+] button to add it to the list.
2. 각 할 일의 체크박스를 클릭해 완료/미완료를 토글할 수 있습니다. Click the checkbox for each task to toggle its completion status (completed/incomplete).
3. 연필 아이콘(수정)을 눌러 제목/마감일을 수정할 수 있습니다. Click the pencil icon (edit) to modify the title/due date.
4. 휴지통 아이콘(삭제)로 할 일을 삭제할 수 있습니다. Use the trash can icon (delete) to remove a task.
5. 우측 상단의 아이콘으로 다크/라이트 모드를 전환할 수 있습니다. Toggle between dark/light mode using the icon in the top right corner.

## 라이선스 License
MIT
