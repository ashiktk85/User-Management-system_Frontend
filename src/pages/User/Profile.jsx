import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Form, Avatar, Card, message, Spin, Modal } from "antd";
import { EditOutlined, MenuOutlined, CloseOutlined, SaveOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { apiClient } from "../../config/axiosConfig";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {
  const userData = JSON.parse(localStorage.getItem("user"))
  console.log(userData);
  
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`/api/profile/${userData?.id}` , {accessToken : userData?.accessToken});
      setUser(response.data);
      form.setFieldsValue(response.data);
    } catch (error) {
      message.error('Failed to fetch user data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async() => {
    try {
      await apiClient.post(`/api/logout/${userData?.id}`)
      localStorage.removeItem("user")
      navigate('/login')
    } catch (error) {
      
    }
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancelLogout = () => {
    setIsModalVisible(false)
  }

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const payload = {
        firstName : values?.firstName,
        lastName : values?.lastName,
        id : userData?.id,
        accessToken : userData?.accessToken
      }
      const response = await apiClient.put('/api/edit-profile', payload);
      setUser(response.data);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCollapse = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsEditing(false);
  };

  if (isLoading && !user.firstName) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 h-screen relative overflow-hidden">
    
      <aside
        className={`fixed top-0 left-0 z-20 bg-white border-r p-6 transform h-screen ${
          isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"
        } md:static md:translate-x-0 transition-transform duration-300 w-64 md:w-1/5`}
      >
        <Button
          type="text"
          icon={isSidebarCollapsed ? <MenuOutlined /> : <CloseOutlined />}
          onClick={toggleCollapse}
          className="absolute -right-6 top-4 md:hidden"
        />
        <nav className="space-y-4">
          <h1 className="text-lg font-semibold">My Profile</h1>
          <div className="w-5/6 h-10 p-4 flex bg-blue-50 text-blue-500 gap-3 items-center rounded-lg cursor-pointer">
            <UserOutlined />
            <span className="text-md font-medium">Profile</span>
          </div>
          <div className="w-5/6 h-10 p-4 flex text-red-500 gap-3 items-center rounded-lg cursor-pointer hover:bg-red-50"
          onClick={showModal}
          >
            <LogoutOutlined />
            <span className="text-md font-medium">Logout</span>
          </div>
        </nav>
      </aside>

  
      <main className="flex-1 p-6 md:ml-0 overflow-y-auto h-screen">
    
        <section className="relative w-full h-60 mb-16">
          <img
            src="https://images.pexels.com/photos/2253573/pexels-photo-2253573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full h-full object-cover rounded-lg"
            alt="Banner"
          />
          <Card className="absolute top-[100%] left-6 transform -translate-y-1/2 w-[90%]">
            <div className="flex items-center">
              <Avatar size={100} icon={<UserOutlined />} />
              <div className="ml-4">
                <h1 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h1>
                <p>{user.email}</p>
                <p>{user.role}</p>
              </div>
              <Button
                type="default"
                icon={<EditOutlined />}
                className="ml-auto"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            </div>
          </Card>
        </section>

        <Card className="mb-6 mt-28" title="Personal Information">
          <Spin spinning={isLoading}>
          <Form
           form={form}
          onFinish={handleSubmit}
         layout="vertical"
         initialValues={user}
         >
  <div className="grid grid-cols-2 gap-4">
    <Form.Item
      name="firstName"
      label="First Name"
      rules={[
        { required: true, message: 'First name is required' },
        { min: 2, message: 'First name must be at least 2 characters' }
      ]}
    >
      {isEditing ? (
        <Input />
      ) : (
        <div className="font-medium">{user.firstName}</div>
      )}
    </Form.Item>

    <Form.Item
      name="lastName"
      label="Last Name"
      rules={[
        { required: true, message: 'Last name is required' },
        { min: 2, message: 'Last name must be at least 2 characters' }
      ]}
    >
      {isEditing ? (
        <Input />
      ) : (
        <div className="font-medium">{user.lastName}</div>
      )}
    </Form.Item>

    <Form.Item
      name="email"
      label="Email"
    >
      <div className="font-medium">{user.email}</div>
    </Form.Item>

    <Form.Item
      name="role"
      label="Role"
    >
      <div className="font-medium">{user.role.map((val) => val)}</div>
    </Form.Item>
  </div>

  {isEditing && (
    <div className="flex justify-end gap-2 mt-4">
      <Button onClick={handleCancel}>
        Cancel
      </Button>
      <Button 
        type="primary" 
        icon={<SaveOutlined />} 
        htmlType="submit"
        loading={isLoading}
      >
        Save Changes
      </Button>
    </div>
  )}
</Form>

          </Spin>
        </Card>

        <Modal
        title="Confirm Logout"
        visible={isModalVisible}
        onOk={handleLogout} 
        onCancel={handleCancelLogout}
        okText="Logout"
        cancelText="Cancel"
        
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
      </main>
    </div>
  );
};

export default ProfilePage;