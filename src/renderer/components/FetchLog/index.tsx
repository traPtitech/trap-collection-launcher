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
  width: 16rem;
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

const WithSpinner = styled(Div)`
  display: flex;
  justify-content: end;
  gap: 0.5rem;
  align-items: center;
`;

const makeLogBlock = (
  log: TraPCollection.Progress,
  description: string,
  key: keyof TraPCollection.Progress
) => {
  return (
    <LogBlock>
      <WithSpinner>
        {log[key].complete === log[key].total ? <DoneIcon /> : <UntilIcon />}
        <div>{description}</div>
      </WithSpinner>
      <div>
        ...{log[key].complete}/{log[key].total}
      </div>
    </LogBlock>
  );
};

const FetchLog = ({ log }: Props) => {
  return (
    <ProgressLog>
      {makeLogBlock(log, '【Game】Unzip', 'fileDecompress')}
      {makeLogBlock(log, '【Game】Download', 'fileDownload')}
      {makeLogBlock(log, '【Video】Download', 'videoDownload')}
      {makeLogBlock(log, '【Image】Download', 'posterDownload')}
    </ProgressLog>
  );
};

export default FetchLog;
