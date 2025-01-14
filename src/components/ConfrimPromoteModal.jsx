import React from 'react';
import { Modal } from 'antd';

const ConfirmPromoteModal = ({ confirmVisible, setConfirmVisible, promoteUser, handleConfirmPromote }) => {
  return (
    <Modal
      title="Are you sure?"
      visible={confirmVisible}
      onCancel={() => setConfirmVisible(false)}
      onOk={handleConfirmPromote}
    >
      <p>Are you sure you want to promote {promoteUser?.firstName} {promoteUser?.lastName} to Admin?</p>
    </Modal>
  );
};

export default ConfirmPromoteModal;
