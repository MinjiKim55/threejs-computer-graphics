Three.js를 사용하여 컴퓨터 그래픽스 기초 개념을 연습한 레포지터리입니다.  
지오메트리, 애니메이션, 계층 구조, 카메라 제어, 조명과 그림자까지 단계적으로 구현했습니다.

## 목적
컴퓨터 그래픽스 기초 개념을 직접 구현하며  
Three.js의 Scene 구성, 변환, 카메라, 조명 시스템 등을 이해하는 것을 목표로 합니다.

## 각 파일 구성

### 01. Basic Geometry & Animation
- 2개의 지오메트리 생성
- 서로 다른 material 적용
- 기본 애니메이션 구현

### 02. Hierarchical Animation & Controls
- 부모–자식 계층 구조 적용
- 변환 상속 애니메이션
- Perspective / Orthographic 카메라 전환
- 키보드 입력 처리

### 03. Lighting & Shadows
- 다양한 Light 설정
- 그림자 (cast / receive) 처리
- 바닥 Plane 추가
- 키보드로 라이트 제어


## 실행 방법
```bash
npm install
npm run dev
```

index.html에서 <script type="module" src="..."> 경로를 변경하여 각 파일을 실행할 수 있습니다.

## 사용 기술
1. JavaScript (ES Modules)
2. Three.js
3. Vite
4. Node.js / npm
