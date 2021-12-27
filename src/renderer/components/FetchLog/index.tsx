import React from 'react';
import { MdDone } from 'react-icons/md';
import { BounceLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';

const Div = ({ ...props }) => <div {...props} />;

export type Props = {
  log: TraPCollection.Progress;
};

const ProgressLog = styled(Div)`
  padding: 0.8rem;
  position: relative;
  height: auto;
  width: auto;
  border-radius: 0.5rem;
  box-shadow: 0px 3px 10px ${(props) => props.theme.colors.shadow.dot};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LogBlock = styled(Div)`
  position: relative;
  height: auto;
  width: 18rem;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSize.exSmall};
  transform: rotate(0.03deg);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DoneIcon = styled(MdDone)`
  color: ${(props) => props.theme.colors.button.information.fill};
  height: 1.2rem;
  width: 1.2rem;
`;

const UntilIconUntilIcon = styled(Div)`
  width: 1.2rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UntilIcon = () => {
  const theme = useTheme();

  return (
    <UntilIconUntilIcon>
      <BounceLoader
        size='0.9rem'
        color={theme.colors.button.information.fill}
      />
    </UntilIconUntilIcon>
  );
};

const RightBlock = styled(Div)`
  display: flex;
  justify-content: end;
  gap: 0.5rem;
  align-items: center;
`;

const FetchLog = ({ log }: Props) => {
  return (
    <ProgressLog>
      <LogBlock>
        <div>【Game】Unzip </div>
        <RightBlock>
          {log.fileDecompress.complete === log.fileDecompress.total ? (
            <DoneIcon />
          ) : (
            <UntilIcon />
          )}
          {log.fileDecompress.complete}/{log.fileDecompress.total}
        </RightBlock>
      </LogBlock>
      <LogBlock>
        <div>【Game】Download </div>
        <RightBlock>
          {log.fileDownload.complete === log.fileDownload.total ? (
            <DoneIcon />
          ) : (
            <UntilIcon />
          )}
          {log.fileDownload.complete}/{log.fileDownload.total}
        </RightBlock>
      </LogBlock>
      <LogBlock>
        <div>【Video】Download </div>
        <RightBlock>
          {log.videoDownload.complete === log.videoDownload.total ? (
            <DoneIcon />
          ) : (
            <UntilIcon />
          )}
          {log.videoDownload.complete}/{log.videoDownload.total}
        </RightBlock>
      </LogBlock>
      <LogBlock>
        <div>【Image】Download </div>
        <RightBlock>
          {log.posterDownload.complete === log.posterDownload.total ? (
            <DoneIcon />
          ) : (
            <UntilIcon />
          )}
          {log.posterDownload.complete}/{log.posterDownload.total}
        </RightBlock>
      </LogBlock>
    </ProgressLog>
  );
};

export default FetchLog;
