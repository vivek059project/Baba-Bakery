import {
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  ArrowUpRight,
} from "lucide-react";

function Contact() {
  const phoneNumber = "+917742286710";

  const whatsappMessage = encodeURIComponent(
    "Hello Baba Bakery, I would like to know more about your menu."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(
    "+",
    ""
  )}?text=${whatsappMessage}`;

  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=Baba+Bakery+Jagdamba+Nagar+Jaipur";

  return (
    <div className="contact-page">

      {/* HEADER */}

      <section className="contact-header">

        <span className="eyebrow">
          GET IN TOUCH
        </span>

        <h1>
          Come say
          <br />
          hello.
        </h1>

        <p>
          Whether you're picking up your favourites,
          planning a celebration or simply have a
          question, we'd love to hear from you.
        </p>

      </section>


      {/* CONTACT GRID */}

      <section className="contact-section">

        <div className="contact-container">

          <div className="contact-info-grid">


            {/* LOCATION */}

            <div className="contact-info-card">

              <div className="contact-card-icon">
                <MapPin size={21} />
              </div>

              <span className="eyebrow">
                FIND US
              </span>

              <h2>
                Our Bakery
              </h2>

              <p>
                Jagdamba Nagar Road,
                <br />
                Jagdamba Nagar,
                <br />
                Heerapura, Jaipur,
                <br />
                Rajasthan 302021
              </p>

              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Get Directions
                <ArrowUpRight size={16} />
              </a>

            </div>


            {/* HOURS */}

            <div className="contact-info-card">

              <div className="contact-card-icon">
                <Clock3 size={21} />
              </div>

              <span className="eyebrow">
                OPENING HOURS
              </span>

              <h2>
                We're Open
              </h2>

              <p>
                Every day
                <br />
                <strong>5:30 AM – 11:30 PM</strong>
              </p>

              <span className="contact-small-note">
                Hours may vary on special occasions.
              </span>

            </div>


            {/* PHONE */}

            <div className="contact-info-card">

              <div className="contact-card-icon">
                <Phone size={21} />
              </div>

              <span className="eyebrow">
                CONTACT US
              </span>

              <h2>
                Let's Talk
              </h2>

              <p>
                Have a question?
                <br />
                Give us a call.
              </p>

              <a
                href={`tel:${phoneNumber}`}
                className="text-link"
              >
                +91 77422 86710
                <ArrowUpRight size={16} />
              </a>

            </div>

          </div>


          {/* MAP */}

          <div className="contact-map-section">

            <div className="contact-map-content">

              <span className="eyebrow">
                VISIT US
              </span>

              <h2>
                Your next favourite
                <br />
                bite is nearby.
              </h2>

              <p>
                Find Baba Bakery in Heerapura,
                Jaipur and drop by whenever you're
                craving something delicious.
              </p>

              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="primary-button"
              >
                <MapPin size={18} />
                Open in Google Maps
              </a>

            </div>

            <div className="map-placeholder">

              <MapPin size={32} />

              <strong>
                Baba Bakery
              </strong>

              <span>
                Heerapura, Jaipur
              </span>

            </div>

          </div>


          {/* WHATSAPP CTA */}

          <div className="contact-whatsapp">

            <div>

              <span className="eyebrow">
                HAVE A QUESTION?
              </span>

              <h2>
                We're just a message away.
              </h2>

            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="primary-button"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;