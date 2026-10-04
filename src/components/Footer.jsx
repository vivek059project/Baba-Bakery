import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

function Footer() {
  const whatsappMessage = encodeURIComponent(
    "Hello Baba Bakery, I would like to know more about your menu."
  );

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* TOP */}

        <div className="footer-top">

          <div className="footer-brand">

            <span className="footer-brand-main">
              BABA
            </span>

            <span className="footer-brand-sub">
              BAKERY
            </span>

            <p>
              Freshly baked favourites,
              delicious snacks and
              something for every craving.
            </p>

          </div>


          <div className="footer-column">

            <span className="footer-heading">
              EXPLORE
            </span>

            <a href="/">
              Home
            </a>

            <a href="/menu">
              Menu
            </a>

            <a href="/custom-cake">
              Custom Cake
            </a>

            <a href="/contact">
              Contact
            </a>

          </div>


          <div className="footer-column">

            <span className="footer-heading">
              VISIT
            </span>

            <span>
              Jagdamba Nagar Road
            </span>

            <span>
              Heerapura, Jaipur
            </span>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Baba+Bakery+Jagdamba+Nagar+Jaipur"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              Get Directions
              <ArrowUpRight size={14} />
            </a>

          </div>


          <div className="footer-column">

            <span className="footer-heading">
              CONTACT
            </span>

            <a href="tel:+917742286710">
              <Phone size={15} />
              +91 77422 86710
            </a>

            <span>
              <Clock3 size={15} />
              5:30 AM – 11:30 PM
            </span>

            <a
              href={`https://wa.me/917742286710?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>

          </div>

        </div>


        {/* BOTTOM */}

        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()} Baba Bakery.
            All rights reserved.
          </span>

          <span>
            Made with care in Jaipur.
          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;