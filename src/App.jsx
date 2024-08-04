import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Pay from "./pages/Pay";
// import Success from "./pages/Success";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Success from "./pages/Success";
const App = () => {
  const user = true;
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
      <Routes>
        <Route path="/products/:category" element={<ProductList />}></Route>
      </Routes>
      <Routes>
        <Route path="/product/:id" element={<Product />}></Route>
      </Routes>
      <Routes>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
      <Routes>
        <Route path="/success" element={<Success />}></Route>
      </Routes>
      <Routes>
        {user ? (<Route path="/login" element={<Home />}></Route>) : (<Route path="/login" element={<Login />}></Route>)}
      </Routes>
      <Routes>
        {user ? (<Route path="/register" element={<Home />}></Route>) : (<Route path="/login" element={<Register />}></Route>)}
      </Routes>

    </Router>
  );
}

export default App;
