import { css } from 'styled-components';

/*
 * Edited version of
 *  - https://github.com/kenwheeler/slick/blob/master/slick/slick.scss
 *  - https://github.com/kenwheeler/slick/blob/master/slick/slick-theme.scss
 */
export const ReactSlickCSS = css`
  .slick-slider {
    position: relative;
    display: block;
    box-sizing: border-box;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }
  .slick-list {
    position: relative;
    overflow: hidden;
    display: block;
    margin: 0;
    padding: 0;

    &:focus {
      outline: none;
    }
  }
  .slick-slider .slick-track,
  .slick-slider .slick-list {
    transform: translate3d(0, 0, 0);
  }

  .slick-track {
    position: relative;
    left: 0;
    top: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;

    &:before,
    &:after {
      content: '';
      display: table;
    }

    &:after {
      clear: both;
    }
  }
  .slick-slide {
    float: left;
    height: 100%;
    min-height: 1px;
    img {
      display: block;
    }

    display: none;

    .slick-initialized & {
      display: block;
    }
  }
  .slick-arrow.slick-hidden {
    display: none;
  }

  /* Arrows */

  .slick-prev,
  .slick-next {
    position: absolute;
    display: block;
    height: 20px;
    width: 20px;
    line-height: 0px;
    font-size: 0px;
    cursor: pointer;
    background: transparent;
    color: transparent;
    top: 50%;
    transform: translate(0, -50%);
    padding: 0;
    border: none;
    outline: none;
    &:hover,
    &:focus {
      outline: none;
      background: transparent;
      color: transparent;
      &:before {
        opacity: 1;
      }
    }
    &:before {
      font-size: 20px;
      line-height: 1;
      color: white;
      opacity: 0.75;
      -webkit-font-smoothing: antialiased;
    }
  }

  .slick-prev {
    left: -25px;
    &:before {
      content: '←';
    }
  }

  .slick-next {
    right: -25px;
    &:before {
      content: '→';
    }
  }

  .slick-dotted.slick-slider {
    margin-bottom: 30px;
  }

  .slick-dots {
    position: absolute;
    bottom: -25px;
    list-style: none;
    display: block;
    text-align: center;
    padding: 0;
    margin: 0;
    width: 100%;
    li {
      position: relative;
      display: inline-block;
      height: 20px;
      width: 20px;
      margin: 0 5px;
      padding: 0;
      cursor: pointer;
      button {
        border: 0;
        background: transparent;
        display: block;
        height: 20px;
        width: 20px;
        outline: none;
        line-height: 0px;
        font-size: 0px;
        color: transparent;
        padding: 5px;
        cursor: pointer;
        &:hover,
        &:focus {
          outline: none;
          &:before {
            opacity: 1;
          }
        }
        &:before {
          position: absolute;
          top: 0;
          left: 0;
          content: '•';
          width: 20px;
          height: 20px;
          font-size: 18px;
          line-height: 20px;
          text-align: center;
          color: white;
          opacity: 0.4;
          -webkit-font-smoothing: antialiased;
        }
      }
      &.slick-active button:before {
        opacity: 1;
      }
    }
  }
`;
