# 다빈치 코드 게임 (프론트엔드)

## 개요

이 프로젝트는 유명한 보드 게임인 **다빈치 코드**를 기반으로 한 웹 기반 멀티플레이어 퍼즐 게임입니다. 사용자는 고유한 게임 방에 입장하여 협력하고 수수께끼를 풀어 비밀을 해독하게 됩니다. 이 프로젝트는 **React**와 **React Three Fiber**(R3F)를 사용하여 게임의 프론트엔드를 구현했습니다.

## 주요 기능

- **게임 방 입장**: URL을 통해 고유한 UUID로 게임 방에 입장합니다.
- **퍼즐 해결**: 플레이어들은 협력하여 다빈치 코드의 테마를 기반으로 한 퍼즐을 해결합니다.
- **3D 그래픽**: React Three Fiber를 사용하여 게임 내 일부 요소에 3D 그래픽을 구현했습니다.

## 기술 스택

- **프론트엔드**: React, React Three Fiber (R3F)
- **상태 관리**: React Context API, useState
- **스타일링**: CSS, Styled-components
- **빌드 도구**: Babel

## 시작하기

### 필수 사항

- Node.js 14.x 이상
- npm 또는 yarn
- **프로젝트 버전**: v20.16.0

### 설치 방법

1. **저장소 클론:** <br/>
   ``` bash
   git clone https://github.com/DavinchWeb/Client.git
   
   cd Client
   ```
2. **의존성 설치** <br/>
   npm인 경우
   ```bash
   npm install
   ```
   yarn인 경우
   ```bash
   yarn install
   ```
3. **build**<br/>
   npm인 경우
   ```bash
   npm run build
   ```
   yarn인 경우
   ```bash
   yarn build
   ```
## 디렉터리 구조
```bash
Client
├── build/                  # (build 후 생성된 파일들)
│   ├── asset-manifest.json
│   ├── index.css
│   ├── index.html
│   └── static/
│       ├── css/
│       ├── js/
│       └── media/ 
├── public/
│   ├── index.css
│   └── index.html
├── src/                    # 소스 코드
│   ├── 3Dcomponents/       # 3D 컴포넌트들
│   ├── App.js              # 루트
│   ├── assets/             # 이미지 및 기타 자원들
│   ├── components/         # 컴포넌트들
│   ├── index.js 
│   ├── pages/              # 페이지 컴포넌트
│   └── styles/             # 스타일시트 (CSS파일들)
├── .gitignore  
├── package-lock.json       # 의존성 관리 파일
├── package.json            # 프로젝트 설정 및 의존성
├── README.md               # 프로젝트 설명 파일
└── yarn.lock               # 의존성 버전 고정 파일
```
