import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css";

function Header(props) {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="логотип" />
      </Link>
      {props.children}
    </header>
  );
}

export default Header;
