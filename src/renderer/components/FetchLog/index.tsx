import React from 'react';
import styled from 'styled-components';

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
`;

const FetchLog = ({ log }: Props) => {
  return (
    <ProgressLog>
      <LogBlock>
        <div>【Game】Unzip </div>
        <div>
          {log.fileDecompress.complete}/{log.fileDecompress.total}
        </div>
      </LogBlock>
      <LogBlock>
        <div>【Game】Download </div>
        <div>
          {log.fileDownload.complete}/{log.fileDownload.total}
        </div>
      </LogBlock>
      <LogBlock>
        <div>【Video】Download </div>
        <div>
          {log.videoDownload.complete}/{log.videoDownload.total}
        </div>
      </LogBlock>
      <LogBlock>
        <div>【Image】Download </div>
        <div>
          {log.posterDownload.complete}/{log.posterDownload.total}
        </div>
      </LogBlock>
    </ProgressLog>
  );
};

`
【Game 】Unzip    (=>       |1/8)
【Game 】Download (===>     |3/8)
【Video】Download (=====>   |5/8)
【Image】Download (========>|8/8)
`;

export default FetchLog;
