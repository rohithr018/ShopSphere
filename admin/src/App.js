import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newuser/NewUser";
import ProductList from "./pages/productlist/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newproduct/NewProduct";
import Login from "./pages/login/Login";
import "./App.css"


function App() {
  //const admin = true
  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin

  //console.log(admin)
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {admin && (
          <>
            <Route path="/" element={
              <>
                <Topbar />
                <div className="container">
                  <Sidebar />
                  <Home />
                </div>
              </>
            }
            />
            <Route path="/users" element={
              <>
                <Topbar />
                <div className="container">
                  <Sidebar />
                  <UserList />
                </div>
              </>
            }
            />
            <Route path="/user/:userId" element={
              <>
                <Topbar />
                <div className="container">
                  <Sidebar />
                  <User />
                </div>
              </>
            }
            />
            <Route path="/newUser" element={
              <>
                <Topbar />
                <div className="container">
                  <Sidebar />
                  <NewUser />
                </div>
              </>
            }
            />
            <Route path="/products" element={
              <>
                <Topbar />
                <div className="container">
                  <Sidebar />
                  <ProductList />
                </div>
              </>
            }
            />
            <Route path="/product/:productId" element={
              <>
                <Topbar />
                <div className="container">
                  <Sidebar />
                  <Product />
                </div>
              </>
            }
            />
            <Route path="/newproduct" element={
              <>
                <Topbar />
                <div className="container">
                  <Sidebar />
                  <NewProduct />
                </div>
              </>
            }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
