# MIDNIGHT BLUES — GitHub Pages 웹 프레젠테이션

원본 `midnight_blues_spacing_fixed(1).pptx`의 6장 구성과 제공된 이미지/GIF를 바탕으로 제작한 정적 웹사이트입니다.

## 파일 구성

```
midnight_blues_web/
├── index.html
├── style.css
├── script.js
├── README.md
├── .nojekyll
└── assets/
    ├── hero.png
    ├── blues-motion.gif
    └── band.png
```

## 사용 방법

`index.html`을 브라우저에서 열면 됩니다. 별도 서버/빌드/DB/CDN/외부 폰트가 필요하지 않습니다.

- 화면 하단 화살표 또는 점을 클릭해 슬라이드 이동
- 키보드 `←` / `→`, `PageUp` / `PageDown`, `Home` / `End`
- `F` 키 또는 우하단 아이콘으로 전체 화면 전환 (브라우저 정책에 따름)
- 모바일에서 좌우 스와이프
- 4번 슬라이드에서 코드 클릭 및 12마디 순차 강조 재생
- URL 끝 `#slide-4` 같은 해시로 특정 슬라이드 바로 열기

## GitHub Pages 배포

1. GitHub에서 새 저장소를 만듭니다. 예: `midnight-blues`.
2. 이 폴더 **안의 파일과 `assets` 폴더**를 저장소 최상위에 업로드합니다.
3. 저장소의 **Settings → Pages → Build and deployment**에서 **Deploy from a branch**를 선택합니다.
4. Branch: `main` / Folder: `/ (root)`로 설정하고 **Save**합니다.
5. 배포 후 `https://사용자명.github.io/midnight-blues/`에서 확인합니다.

모든 리소스 경로는 `./` 상대경로를 사용하여 GitHub Pages의 프로젝트 저장소 경로에서도 정상적으로 해석됩니다. 오프라인 사용도 가능하며, 음악 재생은 포함하지 않습니다. 4번 슬라이드의 재생 버튼은 소리가 아닌 **코드 순서 강조** 기능입니다.
