import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css";

function Header(props) {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__link">
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>
      </div>
      {props.children}
    </header>
  );
}

export default Header;
