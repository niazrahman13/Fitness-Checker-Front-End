import { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('User');
  const [nameVisible, setNameVisible] = useState<boolean>(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    // Set the initial checkbox selection to 'User'
    setSelectedRole('User');
  }, []);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const requestData = {
        id: values.id,
        name: values.name,
        userName: values.username,
        email: values.email,
        password: values.password,
        role: selectedRole,
      };

      if (selectedRole === 'User') {
        requestData.heightFeet = values.heightFeet;
        requestData.heightInches = values.heightInches;
        requestData.weightKgs = values.weightKgs;
      }

      let registrationEndpoint = '';
      if (selectedRole === 'User') {
        registrationEndpoint = 'https://fitnesschecker.vercel.app/api/v1/users/register';
      } else if (selectedRole === 'Nutritionist') {
        registrationEndpoint = 'https://fitnesschecker.vercel.app/api/v1/nutritionists/register';
        requestData.name = values.name;
      }

      const response = await axios.post(registrationEndpoint, requestData);

      setRedirectToLogin(true);
      message.success('Account created successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
      message.warning('Failed to create account. Please check your information or try again later.');
    }
    setLoading(false);
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    if (role === 'Nutritionist') {
      setNameVisible(true);
    } else {
      setNameVisible(false);
    }
  };

  if (redirectToLogin) {
    return (
      <Navigate to="/login" />
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <h1 style={{ textAlign: 'center' }}>Register</h1>
        <Form
          name="registerForm"
          onFinish={onFinish}
          initialValues={{ role: 'User' }}
          layout="vertical"
        >
          
          <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: 'Please enter your ID!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your Name!' }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          {selectedRole === 'User' && (
            <>
              <Form.Item
                label="Height (Feet)"
                name="heightFeet"
                rules={[{ required: true, message: 'Please enter your height (feet)!' }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Height (Inches)"
                name="heightInches"
                rules={[{ required: true, message: 'Please enter your height (inches)!' }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Weight (Kgs)"
                name="weightKgs"
                rules={[{ required: true, message: 'Please enter your weight (kgs)!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Checkbox.Group
              onChange={(checkedValues) => handleRoleChange(checkedValues[0] as string)}
              value={[selectedRole]}
            >
              <Checkbox value="User">User</Checkbox>
              <Checkbox value="Nutritionist">Nutritionist</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
