import { useState } from "react";
import {
  ArrowLeft,
  CakeSlice,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

function CakeEnquiry() {
  const [formData, setFormData] = useState({
    occasion: "",
    size: "",
    date: "",
    message: "",
    requirements: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = `
Hello Baba Bakery,

I would like to enquire about a custom cake.

Occasion: ${formData.occasion || "Not specified"}
Cake Size: ${formData.size || "Not specified"}
Preferred Date: ${formData.date || "Not specified"}
Cake Message: ${formData.message || "None"}

Special Requirements:
${formData.requirements || "None"}

Please let me know the availability and price.
    `.trim();

    const whatsappUrl = `https://wa.me/917742286710?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="cake-enquiry-page">

      <div className="cake-enquiry-container">

        <Link
          to="/"
          className="back-to-menu"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>


        <div className="cake-enquiry-header">

          <div className="cake-icon">
            <CakeSlice size={28} />
          </div>

          <span className="eyebrow">
            CUSTOM CAKES
          </span>

          <h1>
            Make it a little
            <br />
            more special.
          </h1>

          <p>
            Tell us what you're looking for and we'll
            help you create the perfect cake for your
            celebration.
          </p>

        </div>


        <form
          className="cake-enquiry-form"
          onSubmit={handleSubmit}
        >

          {/* OCCASION */}

          <div className="form-group">

            <label htmlFor="occasion">
              What's the occasion?
            </label>

            <select
              id="occasion"
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
            >
              <option value="">
                Select an occasion
              </option>

              <option value="Birthday">
                Birthday
              </option>

              <option value="Anniversary">
                Anniversary
              </option>

              <option value="Wedding">
                Wedding
              </option>

              <option value="Engagement">
                Engagement
              </option>

              <option value="Baby Celebration">
                Baby Celebration
              </option>

              <option value="Other">
                Other
              </option>
            </select>

          </div>


          {/* CAKE SIZE */}

          <div className="form-group">

            <label htmlFor="size">
              Preferred cake size
            </label>

            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
            >
              <option value="">
                Select cake size
              </option>

              <option value="500g">
                500g
              </option>

              <option value="1kg">
                1kg
              </option>

              <option value="1.5kg">
                1.5kg
              </option>

              <option value="2kg">
                2kg
              </option>

              <option value="2kg+">
                2kg+
              </option>

            </select>

          </div>


          {/* DATE */}

          <div className="form-group">

            <label htmlFor="date">
              Preferred date
            </label>

            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

          </div>


          {/* CAKE MESSAGE */}

          <div className="form-group">

            <label htmlFor="message">
              Message on the cake
            </label>

            <input
              id="message"
              type="text"
              name="message"
              placeholder="e.g. Happy Birthday Mom!"
              value={formData.message}
              onChange={handleChange}
            />

          </div>


          {/* REQUIREMENTS */}

          <div className="form-group">

            <label htmlFor="requirements">
              Special requirements
            </label>

            <textarea
              id="requirements"
              name="requirements"
              rows="5"
              placeholder="Tell us about the flavour, design, colours or anything else you'd like..."
              value={formData.requirements}
              onChange={handleChange}
            />

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            className="primary-button cake-submit-button"
          >
            <MessageCircle size={19} />
            Enquire on WhatsApp
          </button>

          <p className="cake-form-note">
            Your enquiry will open directly in WhatsApp.
            Baba Bakery can then confirm availability,
            design and pricing with you.
          </p>

        </form>

      </div>

    </div>
  );
}

export default CakeEnquiry;