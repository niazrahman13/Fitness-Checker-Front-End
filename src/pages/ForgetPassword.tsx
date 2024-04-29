import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const ForgetPassword = () => {
  const onFinish = async (values:any) => {
    try {
      // Send a POST request to your backend API
      const response = await axios.post('/api/forget-password', values);

      // Check if the request was successful
      if (response.status === 200) {
        message.success('Password updated successfully');
      } else {
        message.error('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      message.error('Failed to update password');
    }
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  const validatePassword = ({ getFieldValue:any }) => ({
    validator(_:any, value:any) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The two passwords that you entered do not match'));
    },
  });

  return (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <h1>Forgot Password</h1>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: 'Please input your ID!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your new password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your new password!',
            },
            ({ getFieldValue }) => validatePassword({ getFieldValue }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgetPassword;
