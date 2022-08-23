import { useContext } from 'react';
import { Alert } from 'react-native';

// App contexts
import { AuthContext } from 'helpers/auth';
import { AppEnvironmentContext, AppEnvironmentType } from 'helpers/appenv';

// Components
import Button from 'components/Button';
import Modal from 'components/Modal';
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
          initial={appenv.type}
          style={{ marginBottom: 18 }}
          onSelect={(newEnv) => appenv.setEnvironment(newEnv as AppEnvironmentType)}
        />
      )}
      <Button text="My Profile" variant="outline" style={{ marginBottom: 8 }} />
      <Button
        text="Sign Out"
        variant="outline"
        style={{ marginBottom: 8 }}
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
      {/* {auth.admin && (
        <Button text="Developer Settings" variant="outline" style={{ marginBottom: 8 }} />
      )} */}
    </Modal>
  );
};

export default HomeModal;
