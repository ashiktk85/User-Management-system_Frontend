import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { toast } from 'sonner';

import EditUserModal from './EditUserModal';
import ConfirmPromoteModal from './ConfrimPromoteModal';
import { fetchUsers, promoteToAdmin, updateUser } from '../utils/api';
import { columns } from '../utils/colums';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editingUser, setEditingUser] = useState(null);
  const [promoteUser, setPromoteUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handlePromoteAdmin = (user) => {
    setPromoteUser(user);
    setConfirmVisible(true);
  };

  const handleConfirmPromote = async () => {
    try {
      await promoteToAdmin(promoteUser._id);
      fetchUsers(currentPage, pageSize).then(setUsers);
      setConfirmVisible(false);
      toast.success('User promoted to admin');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, pageSize).then(setUsers);
  }, [currentPage, pageSize]);

  return (
    <>
      <Table
        columns={columns(handleEditUser, handlePromoteAdmin)}
        dataSource={users}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          onChange: handlePageChange,
        }}
        rowKey="_id"
      />

      <EditUserModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        editingUser={editingUser}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateUser(editingUser._id, values);
            fetchUsers(currentPage, pageSize).then(setUsers);
            setIsModalVisible(false);
            toast.success("User updated");
          } catch (error) {
            toast.error(error.message);
          } finally {
            setSubmitting(false);
          }
        }}
      />

      <ConfirmPromoteModal
        confirmVisible={confirmVisible}
        setConfirmVisible={setConfirmVisible}
        promoteUser={promoteUser}
        handleConfirmPromote={handleConfirmPromote}
      />
    </>
  );
};

export default UserTable;