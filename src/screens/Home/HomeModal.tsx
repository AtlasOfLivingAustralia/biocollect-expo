import { useContext } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from 'helpers/auth';

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
  const isAdmin = (auth.access?.role || []).includes('ROLE_ADMIN');

  return (
    <Modal visible={visible} onClose={onClose}>
      {isAdmin && <ButtonSelect options={['test', 'blah']} style={{ marginBottom: 8 }} />}
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
      {isAdmin && (
        <Button text="Developer Settings" variant="outline" style={{ marginBottom: 8 }} />
      )}
    </Modal>
  );
};

export default HomeModal;
