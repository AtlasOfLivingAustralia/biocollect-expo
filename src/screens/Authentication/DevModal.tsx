import { useContext } from 'react';
// App contexts
import { AppEnvironmentContext, AppEnvironmentType } from 'helpers/appenv';

// Components
import Modal from 'components/Modal';
import ButtonSelect from 'components/ButtonSelect';

interface DevModalProps {
  visible: boolean;
  onClose: () => void;
}

const DevModal = ({ visible, onClose }: DevModalProps) => {
  const appenv = useContext(AppEnvironmentContext);

  return (
    <Modal visible={visible} onClose={onClose}>
      <ButtonSelect
        options={['prod', 'staging', 'test', 'dev']}
        initial={appenv.type}
        backgroundColor="primary"
        style={{ marginBottom: 18, marginTop: 18 }}
        onSelect={(newEnv) => appenv.setEnvironment(newEnv as AppEnvironmentType)}
      />
    </Modal>
  );
};

export default DevModal;
