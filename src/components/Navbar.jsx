import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Menu as MenuIcon,
  X,
} from "lucide-react";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* BRAND */}

        <Link
          to="/"
          className="brand"
          onClick={closeMobileMenu}
        >
          <span className="brand-main">
            BABA
          </span>

          <span className="brand-sub">
            BAKERY
          </span>
        </Link>


        {/* DESKTOP NAV */}

        <nav className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/menu">
            Menu
          </Link>

          <Link to="/custom-cake">
            Custom Cake
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </nav>


        {/* DESKTOP CALL */}

        <a
          href="tel:+917742286710"
          className="nav-call"
        >
          <Phone size={17} />
          <span>
            Call Us
          </span>
        </a>


        {/* MOBILE BUTTON */}

        <button
          className="mobile-menu-button"
          aria-label={
            mobileOpen
              ? "Close menu"
              : "Open menu"
          }
          onClick={() =>
            setMobileOpen((current) => !current)
          }
        >
          {mobileOpen ? (
            <X size={24} />
          ) : (
            <MenuIcon size={24} />
          )}
        </button>

      </div>


      {/* MOBILE NAV */}

      {mobileOpen && (
        <div className="mobile-nav">

          <Link
            to="/"
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          <Link
            to="/menu"
            onClick={closeMobileMenu}
          >
            Menu
          </Link>

          <Link
            to="/custom-cake"
            onClick={closeMobileMenu}
          >
            Custom Cake
          </Link>

          <Link
            to="/contact"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>

          <a
            href="tel:+917742286710"
            className="mobile-call"
            onClick={closeMobileMenu}
          >
            <Phone size={17} />
            Call Baba Bakery
          </a>

        </div>
      )}

    </header>
  );
}

export default Navbar;