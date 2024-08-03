import Home from "./pages/Home";
// import ProductList from "./pages/ProductList";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Product from "./pages/Product";
// import Pay from "./pages/Pay";
// import Success from "./pages/Success";
// import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/success">
          <Success />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
