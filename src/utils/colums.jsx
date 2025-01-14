import { MoreOutlined } from '@ant-design/icons';
import { Tag, Dropdown, Menu, Button, Avatar } from 'antd';
import moment from 'moment';

export const columns = (handleEditUser, handlePromoteAdmin) => [
  {
    title: 'User name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <div className="flex items-center gap-3">
        <Avatar src={record.avatar} />
        <div>
          <div className="font-medium">{`${record.firstName} ${record.lastName}`}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      </div>
    ),
  },
  {
    title: 'Access',
    dataIndex: 'role',
    render: (role) => (
      <>
        {role.includes('Admin') && (
          <Tag color="green" style={{ marginRight: 8 }}>
            Admin
          </Tag>
        )}
        {role.includes('User') && (
          <Tag color="blue">
            User
          </Tag>
        )}
      </>
    ),
  },
  {
    title: 'Last active',
    dataIndex: 'lastLogin',
    key: 'lastActive',
    render: (lastLogin) => (
      <div>{lastLogin ? moment(lastLogin).format('YYYY-MM-DD HH:mm') : 'N/A'}</div>
    ),
  },
  {
    title: 'Date added',
    dataIndex: 'dateAdded',
    key: 'dateAdded',
    render: (joinedat) => (
      <div>{joinedat ? moment(joinedat).format('YYYY-MM-DD') : 'N/A'}</div>
    ),
  },
  {
    key: 'action',
    render: (text, record) => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="edit" onClick={() => handleEditUser(record)}>
              Edit User
            </Menu.Item>
            <Menu.Item key="promote" onClick={() => handlePromoteAdmin(record)}>
              Promote to Admin
            </Menu.Item>
          </Menu>
        }
      >
        <Button type="text" icon={<MoreOutlined />} />
      </Dropdown>
    ),
  },
];
