import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div className="pt-3 position-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/stores">
                Stores
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Menu;
