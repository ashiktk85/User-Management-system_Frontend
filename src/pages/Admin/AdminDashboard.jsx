import React, { useEffect } from 'react';
import { Layout, Typography, Input, Button, Badge, Avatar } from 'antd';
import { SearchOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import Sidebar from '../../components/SideBar';
import UserTable from '../../components/UserTable';
import axios from 'axios';



const { Header, Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {
  return (
    <Layout className="min-h-screen">
      <Sidebar />
      <Layout>
        <Header className="bg-white border-b border-gray-200 p-0 flex items-center justify-between">
          <div className="flex items-center gap-4 px-8">
            <Title level={4} className="m-0">User management</Title>
          </div>
          <div className="flex items-center gap-4 px-8">
            <Avatar src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-13%20123436-6wZXgRpZxPUl5cuFiicefmXpJ17X9F.png" />
          </div>
        </Header>
        <Content className="p-8">
          <div className="mb-8">
          
            
            <Text className="text-gray-500">Manage your team members and their account permissions here.</Text>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Title level={4} className="m-0">All users</Title>
              <Badge count={44} style={{ backgroundColor: '#d9d9d9', color: '#000' }} />
            </div>
            <div className="flex items-center gap-3">
              {/* <Input
                placeholder="Search"
                prefix={<SearchOutlined className="text-gray-400" />}
                style={{ width: 300 }}
              /> */}
              <Button color='blue' icon={<FilterOutlined />} >Filters</Button>
            </div>
          </div>
          <UserTable />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;

