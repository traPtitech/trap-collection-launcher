import React from 'react';
import styled from 'styled-components';

const Div = ({ ...props }) => <div {...props} />;

const Wrapper = styled(Div)`
  position: absolute;
  left: 5.5rem;
  top: 4.875rem;
  right: 32.375rem;
  height: auto;
`;

const Title = styled(Div)`
  width: 100%;
  font-size: ${(props) => props.theme.fontSize.gameTitle};
  font-weight: bold;
  color: ${(props) => props.theme.colors.text.header};
`;

const Primary = styled(Div)`
  width: 100%;
  overflow-wrap: break-word;
  font-size: ${(props) => props.theme.fontSize.medium};
  color: ${(props) => props.theme.colors.text.primary};
`;

export type Props = {
  gameInfo: TraPCollection.GameInfo;
};

const Description = ({ gameInfo }: Props) => {
  return (
    <Wrapper>
      <Title> {gameInfo.name} </Title>
      <Primary> {gameInfo.description} </Primary>
    </Wrapper>
  );
};

export default Description;
