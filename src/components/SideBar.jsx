import React, { useState } from 'react';
import { Menu, Layout, Modal } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import { LogOut } from 'lucide-react';

const { Sider } = Layout;

const sidebarItems = [
  {
    title: "GENERAL",
    items: [
      { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    ],
  },
  {
    items: [
      { key: "logout", icon: <LogOut />, label: "Logout" },
    ],
  }
];

const Sidebar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);


  const showModal = () => {
    setIsModalVisible(true);
  };

 
  const handleLogout = () => {
  
    localStorage.removeItem('admin');
 
    window.location.href = '/admin/login';
  };

  
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Sider width={240} className="h-screen bg-white border-r border-gray-200">
      <Menu mode="inline" defaultSelectedKeys={['users']} className="h-[calc(100vh-64px)] overflow-y-auto">
        {sidebarItems.map((section, index) => (
          <Menu.ItemGroup key={index} title={section.title}>
            {section.items.map((item) => (
              item.key === 'logout' ? (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  className="text-red-500 hover:text-red-600 hover:outline-none"
                  onClick={showModal}
                >
                  {item.label}
                </Menu.Item>
              ) : (
                <Menu.Item key={item.key} icon={item.icon}>
                  {item.label}
                </Menu.Item>
              )
            ))}
          </Menu.ItemGroup>
        ))}
      </Menu>

      <Modal
        title="Confirm Logout"
        visible={isModalVisible}
        onOk={handleLogout} 
        onCancel={handleCancel}
        okText="Logout"
        cancelText="Cancel"
        
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </Sider>
  );
};

export default Sidebar;
