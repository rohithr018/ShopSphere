import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from './components/loadingSpinner';
import Profile from './pages/Profile';

const Home = React.lazy(() => import('./pages/Home'));
const ProductList = React.lazy(() => import('./pages/ProductList'));
const Product = React.lazy(() => import('./pages/Product'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Success = React.lazy(() => import('./pages/Success'));

const App = () => {
  const user = useSelector(state => state.user.currentUser);

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/success" element={<Success />} />
          {user
            ? (
              <>
                <Route path="/login" element={<Home />} />
                <Route path="/register" element={<Home />} />
              </>
            )
            : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
