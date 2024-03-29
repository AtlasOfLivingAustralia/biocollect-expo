import { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BioCollectSurvey } from 'types';
import { FontAwesome5 } from '@expo/vector-icons';
import styled, { useTheme } from 'styled-components/native';
import { AppEnvironmentContext } from 'helpers/appenv';

// Components
import Modal from 'components/Modal';
import Body from 'components/Body';

// Local components
import SurveyItem from './SurveyItem';
import { RootStackParamList } from '../../../App';

interface SurveyModalProps {
  visible: boolean;
  surveys: BioCollectSurvey[] | null;
  navigate: (to: keyof RootStackParamList, args: RootStackParamList['WebView']) => void;
  onClose: () => void;
}

const HeaderView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.defaults.viewPadding}px;
`;

const ErrorView = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-top: ${({ theme }) => theme.defaults.viewPadding * 1.5}px;
`;

const Subheader = styled(Text)`
  font-family: 'RobotoBold';
  font-size: 22px;
  color: ${({ theme }) => theme.text.secondary};
`;

const SurveyModal = ({ visible, surveys, navigate, onClose }: SurveyModalProps) => {
  const { type: env } = useContext(AppEnvironmentContext);
  const theme = useTheme();

  return (
    <Modal visible={visible} onClose={onClose}>
      {(() => {
        if (surveys) {
          return surveys.length > 0 ? (
            <>
              <HeaderView>
                <FontAwesome5
                  name="pie-chart"
                  size={32}
                  color={theme.text.secondary}
                  style={{ marginRight: 16, marginLeft: -8 }}
                />
                <Subheader>Project Surveys</Subheader>
              </HeaderView>
              <ScrollView style={{ maxHeight: 425 }}>
                {surveys.map((survey) => (
                  <SurveyItem
                    key={survey.id}
                    survey={survey}
                    onPress={() => {
                      const uri = `https://biocollect-${env}.ala.org.au/bioActivity/mobileCreate/${survey.projectActivityId}`;
                      console.log(`[APP : Project] Opening ${uri}`);
                      onClose();
                      navigate('WebView', { uri });
                    }}
                  />
                ))}
              </ScrollView>
            </>
          ) : (
            <ErrorView>
              <Body primary>No surveys available</Body>
            </ErrorView>
          );
        }

        return [0, 1, 2, 3, 4, 5].map((num) => <SurveyItem key={num} survey={null} />);
      })()}
    </Modal>
  );
};

export default SurveyModal;
