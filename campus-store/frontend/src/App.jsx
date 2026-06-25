import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import LoginFlipCard from './pages/LoginFlipCard';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import './App.css';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a2e',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '0.88rem',
            },
            success: { iconTheme: { primary: '#c9a84c', secondary: '#1a1a2e' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-flip" element={<LoginFlipCard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={
              <ProtectedRoute><Checkout /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute>
            } />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
