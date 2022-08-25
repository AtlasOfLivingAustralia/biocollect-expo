import { TouchableOpacityProps, Text } from 'react-native';
import { BioCollectSurvey } from 'types';

import styled from 'styled-components/native';
import Skeleton from 'components/Skeleton';
import Body from 'components/Body';
import { DateTime } from 'luxon';

interface SurveyItemProps extends TouchableOpacityProps {
  survey: BioCollectSurvey | null;
}

const Root = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background.primary};
  border-radius: ${({ theme }) => theme.radius}px;
  margin: 12px;
  margin-top: 0px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.background.tertiary};
`;

const Subheader = styled(Text)`
  font-family: 'RobotoBold';
  font-size: 18px;
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: 6px;
`;

const SurveyItem = ({ survey, ...props }: SurveyItemProps) => {
  return survey ? (
    <Root {...props} activeOpacity={0.6}>
      <Subheader>{survey.name}</Subheader>
      {survey.startDate && (
        <Body>Starts {DateTime.fromISO(survey.startDate).toLocaleString(DateTime.DATE_SHORT)}</Body>
      )}
    </Root>
  ) : (
    <Root>
      <Skeleton.Rect loading width="100%" />
    </Root>
  );
};

export default SurveyItem;
