# React + Vite

이 템플릿은 React가 Vite 환경에서 동작하도록 최소한의 설정을 제공합니다.
(HMR(핫 모듈 교체)과 일부 ESLint 규칙 포함)

현재 공식 플러그인 두 가지를 사용할 수 있습니다:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

이 템플릿에서는 React Compiler가 활성화되어 있습니다. 자세한 내용은 관련 문서를 참고하세요. (https://react.dev/learn/react-compiler)

참고:
React Compiler를 사용하면 Vite의 개발(dev) 및 빌드(build) 성능에 영향을 줄 수 있습니다.

## ESLint 설정 확장

실제 서비스용(production) 애플리케이션을 개발한다면,
타입 인식(type-aware) lint 규칙이 활성화된 TypeScript 사용을 권장합니다.
TypeScript 및 typescript-eslint를 프로젝트에 통합하는 방법은
TS 템플릿 문서를 참고하세요.
[TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts), (https://typescript-eslint.io)
