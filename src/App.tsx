import "./App.css";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route } from "react-router-dom";
import Users from "./pages/users/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserCreate from "./pages/users/UserCreate";
import UserEdit from "./pages/users/UserEdit";
import Stores from "./pages/stores/Stores";
import StoreEdit from "./pages/stores/StoreEdit";
import Products from "./pages/products/Products";
import ProductCreate from "./pages/products/ProductCreate";
import ProductEdit from "./pages/products/ProductEdit";
import Orders from "./pages/orders/Orders";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={"/"} exact component={Dashboard} />
        <Route path={"/profile"} exact component={Profile} />
        <Route path={"/register"} component={Register} />
        <Route path={"/login"} component={Login} />
        <Route path={"/users"} exact component={Users} />
        <Route path={"/users/create"} component={UserCreate} />
        <Route path={"/users/:id/edit"} component={UserEdit} />
        <Route path={"/stores"} exact component={Stores} />
        <Route path={"/stores/:id/edit"} component={StoreEdit} />
        <Route path={"/products"} exact component={Products} />
        <Route path={"/products/create"} component={ProductCreate} />
        <Route path={"/products/:id/edit"} component={ProductEdit} />
        <Route path={"/orders"} exact component={Orders} />
      </BrowserRouter>
    </div>
  );
}

export default App;
