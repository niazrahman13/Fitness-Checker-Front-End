import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { TUser, setUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PHForm from '../components/form/FitnessCheckForm';
import FitnessCheckInput from '../components/form/FitnessCheckInput';
import styled from 'styled-components';

// Styled component for the register button
const RegisterButton = styled(Button)`
  margin-top: 10px;
  margin-right: 10px;
`;

const ForgotPasswordButton = styled(Button)`
  margin-top: 10px;
`;

const LoginContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  width: 380px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Footer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  // Function to handle form submission
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Logging in');

    try {
      // Extract user info from form data
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      console.log(userInfo)
      // Send login request and unwrap the response
      const res = await login(userInfo).unwrap();

      // Verify the access token and extract user data
      const user = verifyToken(res.data.accessToken) as TUser;

      // Dispatch action to set user data in Redux store
      dispatch(setUser({ user: user, token: res.data.accessToken }));

      // Show success message and navigate to dashboard
      toast.success('Logged in', { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      // Show error message if login fails
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

 

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <LoginContainer>
        
        {/* Login form component */}
        <PHForm onSubmit={onSubmit}>
          <FitnessCheckInput type="text" name="userId" label="ID:" />
          <FitnessCheckInput type="password" name="password" label="Password" />
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
        </PHForm>

        <Footer>
          {/* Register and Forgot Password button components */}
          <RegisterButton type="link" onClick={() => navigate('/register')}>
            Register Now
          </RegisterButton>
          <ForgotPasswordButton type="link" onClick={()=> navigate('/forget-password')}>
            Forgot Password?
          </ForgotPasswordButton>
        </Footer>
      </LoginContainer>
    </Row>
  );
};

export default Login;
