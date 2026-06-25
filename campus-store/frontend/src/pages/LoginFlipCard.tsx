import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FlipCard, { FlipCardField } from '@/components/ui/flip-card';
import { FaStore, FaCheckCircle } from 'react-icons/fa';

const LoginFlipCard = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const handleLogin = async (data: Record<string, string>) => {
    try {
      // Map flip card fields to auth context expectations
      await login({ 
        username: data.email || data.username, 
        password: data.password 
      });
      
      // Navigate after successful login
      setTimeout(() => {
        navigate(redirect, { replace: true });
      }, 1500);
      
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    }
  };

  const fields: FlipCardField[] = [
    { 
      name: "email", 
      type: "text", 
      label: "Username or Email", 
      placeholder: "your_username" 
    },
    { 
      name: "password", 
      type: "password", 
      label: "Password", 
      placeholder: "••••••••" 
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <FlipCard
        frontTitle="Welcome to Swahilipot Hub 🛍️"
        frontDescription="Your lifestyle merchandise marketplace"
        frontIllustration={
          <div className="w-20 h-20 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
            <FaStore className="text-white text-3xl" />
          </div>
        }
        backTitle="Sign In"
        backDescription="Enter your credentials to continue"
        successTitle="Login Successful! 🎉"
        successDescription="Redirecting to your account..."
        successIllustration={
          <div className="w-20 h-20 bg-green-500 rounded-full mb-4 flex items-center justify-center">
            <FaCheckCircle className="text-white text-3xl" />
          </div>
        }
        fields={fields}
        onLogin={handleLogin}
        loginButtonText="Sign In"
        backButtonText="Back"
        successButtonText="Continue to Store"
        cardWidth={380}
        cardHeight={480}
      />
    </div>
  );
};

export default LoginFlipCard;
