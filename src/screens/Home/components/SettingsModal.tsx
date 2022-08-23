import { useContext } from 'react';
import { Alert } from 'react-native';

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

const HomeModal = ({ visible, navigate, onClose }: HomeModalProps) => {
  const auth = useContext(AuthContext);
  const appenv = useContext(AppEnvironmentContext);

  return (
    <Modal visible={visible} onClose={onClose}>
      {auth.admin && (
        <ButtonSelect
          options={['prod', 'staging', 'test', 'dev']}
          backgroundColor="primary"
          initial={appenv.type}
          style={{ marginBottom: 2, marginTop: 8 }}
          onSelect={(newEnv) => appenv.setEnvironment(newEnv as AppEnvironmentType)}
        />
      )}
      <Button text="MY PROFILE" />
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
