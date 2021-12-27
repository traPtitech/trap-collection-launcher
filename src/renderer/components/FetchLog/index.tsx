import React from 'react';
import styled from 'styled-components';

const Div = ({ ...props }) => <div {...props} />;

export type Props = {
  log: TraPCollection.Progress;
};

const ProgressLog = styled(Div)`
  position: relative;
  height: auto;
  width: auto;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSize.exSmall};
  transform: rotate(0.03deg);
`;

const FetchLog = ({ log }: Props) => {
  return (
    <ProgressLog>
      【Game 】Unzip({log.fileDecompress.complete}/{log.fileDecompress.total})
      <br />
      【Game 】Download({log.fileDownload.complete}/{log.fileDownload.total})
      <br />
      【Video】Download({log.videoDownload.complete}/{log.videoDownload.total})
      <br />
      【Image】Download({log.posterDownload.complete}/{log.posterDownload.total}
      )
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
