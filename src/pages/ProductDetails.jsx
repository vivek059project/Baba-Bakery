import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  MessageCircle,
} from "lucide-react";

import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    orderType: "Pickup",
    address: "",
    preferredTime: "",
    instructions: "",
  });

  if (!product) {
    return (
      <section className="product-not-found">
        <div>
          <h1>Product not found</h1>

          <p>
            Sorry, we couldn't find the item you're
            looking for.
          </p>

          <Link
            to="/menu"
            className="primary-button"
          >
            Back to Menu
          </Link>
        </div>
      </section>
    );
  }

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleWhatsApp = (event) => {
    event.preventDefault();

    const message = `
Hello Baba Bakery,

I would like to enquire about an order.

Customer Name:
${formData.name || "Not specified"}

Item:
${quantity} × ${product.name}

Order Type:
${formData.orderType}

Preferred Time:
${formData.preferredTime || "Not specified"}

${
  formData.orderType === "Delivery"
    ? `Delivery Address:
${formData.address || "Not specified"}`
    : ""
}

Special Instructions:
${formData.instructions || "None"}

Please confirm availability, total price and ${
      formData.orderType === "Delivery"
        ? "delivery"
        : "pickup"
    } details.

Thank you.
    `.trim();

    const whatsappUrl =
      `https://wa.me/917742286710?text=` +
      encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="product-details-page">

      <div className="product-details-container">

        <Link
          to="/menu"
          className="back-to-menu"
        >
          <ArrowLeft size={17} />
          Back to Menu
        </Link>

        <div className="product-details">

          {/* PRODUCT IMAGE */}

          <div className="product-details-image">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>


          {/* PRODUCT INFORMATION */}

          <div className="product-details-content">

            <span className="eyebrow">
              {product.category}
            </span>

            <h1>
              {product.name}
            </h1>

            <strong className="product-details-price">
              ₹{product.price}
            </strong>

            <p className="product-details-description">
              {product.description}
            </p>


            {/* QUANTITY */}

            <div className="quantity-section">

              <span>
                Quantity
              </span>

              <div className="quantity-control">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>

                <strong>
                  {quantity}
                </strong>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>

              </div>

            </div>


            {/* ORDER ENQUIRY */}

            <form
              className="product-order-form"
              onSubmit={handleWhatsApp}
            >

              <div className="form-group">

                <label htmlFor="name">
                  Your name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label htmlFor="orderType">
                  How would you like to receive it?
                </label>

                <select
                  id="orderType"
                  name="orderType"
                  value={formData.orderType}
                  onChange={handleChange}
                >
                  <option value="Pickup">
                    Pickup from store
                  </option>

                  <option value="Delivery">
                    Delivery
                  </option>
                </select>

              </div>


              {formData.orderType === "Delivery" && (
                <div className="form-group">

                  <label htmlFor="address">
                    Delivery address
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    placeholder="Enter your delivery address"
                    value={formData.address}
                    onChange={handleChange}
                  />

                </div>
              )}


              <div className="form-group">

                <label htmlFor="preferredTime">
                  Preferred time
                </label>

                <input
                  id="preferredTime"
                  type="text"
                  name="preferredTime"
                  placeholder="e.g. 7:30 PM"
                  value={formData.preferredTime}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label htmlFor="instructions">
                  Special instructions
                </label>

                <textarea
                  id="instructions"
                  name="instructions"
                  rows="3"
                  placeholder="Anything else we should know?"
                  value={formData.instructions}
                  onChange={handleChange}
                />

              </div>


              <button
                type="submit"
                className="primary-button product-whatsapp-button"
              >
                <MessageCircle size={19} />
                Enquire on WhatsApp
              </button>

            </form>


            <p className="product-note">
              Your enquiry will open in WhatsApp.
              Baba Bakery will confirm availability,
              price and pickup or delivery details with you.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;