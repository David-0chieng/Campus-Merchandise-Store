import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FlipCard from '../components/ui/flip-card';
import { FaStore, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const iconStyle = (bg) => ({
  width: 80, height: 80, borderRadius: '50%',
  background: bg, display: 'flex', alignItems: 'center',
  justifyContent: 'center', marginBottom: 16, flexShrink: 0,
});

const LoginFlipCard = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const handleLogin = async (data) => {
    try {
      await login({ username: data.email || data.username, password: data.password });
      toast.success('Welcome back!');
      setTimeout(() => navigate(redirect, { replace: true }), 1500);
      return true;
    } catch (err) {
      toast.error('Invalid credentials. Please try again.');
      return false;
    }
  };

  const fields = [
    { name: 'email', type: 'text', label: 'Username or Email', placeholder: 'your_username' },
    { name: 'password', type: 'password', label: 'Password', placeholder: '••••••••' },
  ];

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--off-white)', padding: 16,
    }}>
      <FlipCard
        frontTitle="Welcome to Swahilipot Hub 🛍️"
        frontDescription="Your lifestyle merchandise marketplace"
        frontIllustration={
          <div style={iconStyle('#3b82f6')}>
            <FaStore color="white" size={32} />
          </div>
        }
        backTitle="Sign In"
        backDescription="Enter your credentials to continue"
        successTitle="Login Successful! 🎉"
        successDescription="Redirecting to your account..."
        successIllustration={
          <div style={iconStyle('#22c55e')}>
            <FaCheckCircle color="white" size={32} />
          </div>
        }
        fields={fields}
        onLogin={handleLogin}
        loginButtonText="Sign In"
        backButtonText="Back"
        successButtonText="Continue to Store"
        cardWidth={380}
        cardHeight={500}
      />
    </div>
  );
};

export default LoginFlipCard;
