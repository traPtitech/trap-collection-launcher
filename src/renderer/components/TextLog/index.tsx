import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const Div = ({ ...props }) => <div {...props} />;
const Ul = ({ ...props }) => <ul {...props} />;

const Wrapper = styled(Div)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSize.exSmall};
  transform: rotate(0.03deg);
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-wrap: break-word;
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background.scrollbar};
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.text.primary};
    border-radius: 0.25rem;
  }

  .line-enter {
    opacity: 0;
  }
  .line-enter-active {
    opacity: 1;
    transition: opacity 200ms ease-in;
  }
`;

const NoneUl = styled(Ul)`
  list-style: none;
`;

export type Props = {
  log: string[];
};

const TextLog = ({ log }: Props) => {
  return (
    <Wrapper>
      <NoneUl>
        <TransitionGroup>
          {log
            .map((line, i) => (
              <CSSTransition key={`${i}`} timeout={200} classNames='line'>
                <li>{line}</li>
              </CSSTransition>
            ))
            .reverse()}
        </TransitionGroup>
      </NoneUl>
    </Wrapper>
  );
};

export default TextLog;
