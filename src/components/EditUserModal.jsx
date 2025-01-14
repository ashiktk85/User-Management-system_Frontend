import React from 'react';
import { Modal, Button, Input } from 'antd';
import { Formik, Field, Form } from 'formik';
import { validationSchema } from '../utils/formValidationSchema';


const EditUserModal = ({ isModalVisible, setIsModalVisible, editingUser, onSubmit }) => {
  return (
    <Modal
      title="Edit User"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
    >
      <Formik
        initialValues={{
          firstName: editingUser?.firstName || '',
          lastName: editingUser?.lastName || '',
          email: editingUser?.email || '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form >
            <div className='pb-5'>
            <Field name="firstName" as={Input} placeholder="First Name"  />
            {touched.firstName && errors.firstName && (
              <div className="text-red-500 text-sm">{errors.firstName}</div>
            )}
            </div>
            <div className='pb-5'>
            <Field name="lastName" as={Input} placeholder="Last Name" />
            {touched.lastName && errors.lastName && (
              <div className="text-red-500 text-sm">{errors.lastName}</div>
            )}
            </div>
            <div className='pb-5'>
            <Field name="email" as={Input} placeholder="Email"  />
            {touched.email && errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
            </div>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditUserModal;
