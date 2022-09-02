import { useContext } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

// App contexts
import { AuthContext } from 'helpers/auth';
import { AppEnvironmentContext, AppEnvironmentType } from 'helpers/appenv';

// Components
import Modal from 'components/Modal';
import Button from 'components/Modal/Button';
import ButtonSelect from 'components/ButtonSelect';

interface HomeModalProps {
  visible: boolean;
  navigate: (to: string) => void;
  onClose: () => void;
}

const EnvView = styled.View`
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.background.tertiary};
  padding: 16px;
`;

const HomeModal = ({ visible, navigate, onClose }: HomeModalProps) => {
  const auth = useContext(AuthContext);
  const appenv = useContext(AppEnvironmentContext);

  return (
    <Modal visible={visible} onClose={onClose}>
      {auth.admin && (
        <EnvView>
          <ButtonSelect
            options={['prod', 'staging', 'test', 'dev']}
            backgroundColor="primary"
            initial={appenv.type}
            onSelect={(newEnv) => appenv.setEnvironment(newEnv as AppEnvironmentType)}
          />
        </EnvView>
      )}
      {/* {auth.admin && (
        <Button
          text="GOTO VIEW"
          onPress={() => {
            navigate('Projects');
            onClose();
          }}
        />
      )} */}
      <Button
        first={!auth.admin}
        text="MY PROFILE"
        onPress={() => console.log('Profile Button Pressed')}
      />
      <Button
        text="SIGN OUT"
        onPress={() => {
          Alert.alert('Confirmation', 'Are you sure you wish to sign out?', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: async () => {
                onClose();
                await auth.signOut();
                navigate('Authentication');
              },
            },
          ]);
        }}
      />
    </Modal>
  );
};

export default HomeModal;
