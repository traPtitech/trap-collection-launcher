import { createGlobalStyle } from 'styled-components';
import { ReactSlickCSS } from './ReactSlick';

const GlobalStyle = createGlobalStyle`
  ${ReactSlickCSS}

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Audiowide', cursive;
    color: white;
  }

  /* reset */

  /* Box sizing rules */
  /* Box sizingの定義 */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default padding */
  /* デフォルトのpaddingを削除 */
  ul[class],
  ol[class] {
    padding: 0;
  }

  /* Remove default margin */
  /* デフォルトのmarginを削除 */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul[class],
  ol[class],
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  /* Set core body defaults */
  /* bodyのデフォルトを定義 */
  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    font-family: 'Noto Sans JP', sans-serif;
  }

  /* Remove list styles on ul, ol elements with a class attribute */
  /* class属性を持つul、ol要素のリストスタイルを削除 */
  ul[class],
  ol[class] {
    list-style: none;
  }

  /* A elements that don't have a class get default styles */
  /* classを持たない要素はデフォルトのスタイルを取得 */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  /* img要素の扱いを簡単にする */
  img {
    max-width: 100%;
    display: block;
  }

  video {
    padding: 0;
    margin: 0;
  }

  /* Natural flow and rhythm in articles by default */
  /* article要素内の要素に自然な流れとリズムを定義 */
  article > * + * {
    margin-top: 1em;
  }

  /* Inherit fonts for inputs and buttons */
  /* inputやbuttonなどのフォントは継承を定義 */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  /* 見たくない人用に、すべてのアニメーションとトランジションを削除 */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyle;
