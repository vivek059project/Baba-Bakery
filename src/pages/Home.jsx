
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  MessageCircle,
  CakeSlice,
  Star,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Home() {
  const featuredProducts = products.filter(
    (product) => product.featured
  );

  const reviewsUrl =
    "https://www.google.com/maps/search/?api=1&query=Baba+Bakery+Jagdamba+Nagar+Jaipur";

  return (
    <div className="home">

      {/* HERO */}

      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-location">
              <MapPin size={16} />
              <span>Heerapura, Jaipur</span>
            </div>

            <h1>
              Freshly baked.
              <br />
              <span>Made for every craving.</span>
            </h1>

            <p>
              From comforting bakery favourites to
              delicious snacks and beverages, discover
              something you'll want to come back for.
            </p>

            <div className="hero-actions">
              <Link to="/menu" className="primary-button">
                Explore Menu
                <ArrowRight size={18} />
              </Link>

              <a
                href="https://wa.me/917742286710"
                target="_blank"
                rel="noreferrer"
                className="secondary-button"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-placeholder">
              <span>Freshly baked</span>
              <strong>BABA BAKERY</strong>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INFO */}

      <section className="quick-info">
        <div className="quick-info-container">
          <div className="info-item">
            <strong>Freshly Prepared</strong>
            <span>Made with care</span>
          </div>

          <div className="info-item">
            <strong>Vegetarian</strong>
            <span>Something for everyone</span>
          </div>

          <div className="info-item">
            <strong>Takeaway & Delivery</strong>
            <span>Order your favourites</span>
          </div>

          <div className="info-item">
            <strong>5:30 AM – 11:30 PM</strong>
            <span>Open every day</span>
          </div>
        </div>
      </section>

      {/* POPULAR PICKS */}

      <section className="popular-menu">
        <div className="popular-menu-container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                CUSTOMER FAVOURITES
              </span>

              <h2>Popular picks.</h2>
            </div>

            <p>
              A few favourites to get you started.
            </p>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          <div className="menu-cta">
            <Link
              to="/menu"
              className="outline-button"
            >
              View Full Menu
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}

      <section className="reviews-section">
        <div className="reviews-container">
          <div className="reviews-content">
            <span className="eyebrow">
              CUSTOMER FEEDBACK
            </span>

            <div className="reviews-icon">
              <Star size={23} />
            </div>

            <h2>
              Your experience
              <br />
              matters to us.
            </h2>

            <p>
              Discover what customers are saying about
              Baba Bakery and share your own experience.
            </p>

            <a
              href={reviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="outline-button"
            >
              View Customer Reviews
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* CUSTOM CAKE */}

      <section className="cake-home-cta">
        <div className="cake-home-cta-container">
          <div className="cake-home-cta-icon">
            <CakeSlice size={25} />
          </div>

          <div className="cake-home-cta-content">
            <span className="eyebrow">
              SPECIAL CELEBRATIONS
            </span>

            <h2>
              Planning something special?
            </h2>

            <p>
              Tell us about your celebration and
              enquire about a custom cake made for
              your occasion.
            </p>
          </div>

          <Link
            to="/custom-cake"
            className="outline-button"
          >
            Custom Cake Enquiry
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;