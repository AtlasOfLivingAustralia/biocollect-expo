import { useContext } from 'react';
// App contexts
import { AppEnvironmentContext, AppEnvironmentType } from 'helpers/appenv';

// Components
import Modal from 'components/Modal';
import ButtonSelect from 'components/ButtonSelect';

interface SurveyModalProps {
  visible: boolean;
  onClose: () => void;
}

const SurveyModal = ({ visible, onClose }: SurveyModalProps) => {
  const appenv = useContext(AppEnvironmentContext);

  return (
    <Modal visible={visible} onClose={onClose}>
      <ButtonSelect
        options={['prod', 'staging', 'test', 'dev']}
        initial={appenv.type}
        backgroundColor="primary"
        style={{ marginBottom: 18 }}
        onSelect={(newEnv) => appenv.setEnvironment(newEnv as AppEnvironmentType)}
      />
    </Modal>
  );
};

export default SurveyModal;
