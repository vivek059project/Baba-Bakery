import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  MapPin,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    cartSubtotal,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    orderType: "pickup",
    address: "",
    landmark: "",
    pincode: "",
    preferredTime: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [orderSuccess, setOrderSuccess] =
    useState(false);

  const [orderNumber, setOrderNumber] =
    useState("");

  const [placedOrder, setPlacedOrder] =
    useState(null);

  // -----------------------------------------
  // EMPTY CART
  // -----------------------------------------

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">

          <div className="checkout-empty">

            <div className="checkout-empty-icon">
              <ShoppingBag size={30} />
            </div>

            <span className="eyebrow">
              CHECKOUT
            </span>

            <h1>
              Your cart is empty.
            </h1>

            <p>
              Add something delicious before
              continuing to checkout.
            </p>

            <Link
              to="/menu"
              className="primary-button"
            >
              Explore Menu
            </Link>

          </div>

        </div>
      </div>
    );
  }

  // -----------------------------------------
  // FORM CHANGE
  // -----------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrorMessage("");
  };

  // -----------------------------------------
  // SUBMIT ORDER
  // -----------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    // ---------------------------------------
    // BASIC VALIDATION
    // ---------------------------------------

    if (!formData.name.trim()) {
      setErrorMessage(
        "Please enter your name."
      );
      return;
    }

    const cleanPhone =
      formData.phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      setErrorMessage(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (
      formData.orderType === "delivery" &&
      !formData.address.trim()
    ) {
      setErrorMessage(
        "Please enter your delivery address."
      );
      return;
    }

    if (
      formData.orderType === "delivery" &&
      formData.pincode.trim() &&
      !/^\d{6}$/.test(formData.pincode.trim())
    ) {
      setErrorMessage(
        "Please enter a valid 6-digit pincode."
      );
      return;
    }

    // ---------------------------------------
    // PREPARE ORDER
    // ---------------------------------------

    const orderData = {
      customer: {
        name: formData.name.trim(),
        phone: cleanPhone,
        email: "",
      },

      orderType: formData.orderType,

      deliveryAddress: {
        addressLine:
          formData.orderType === "delivery"
            ? formData.address.trim()
            : "",

        landmark:
          formData.orderType === "delivery"
            ? formData.landmark.trim()
            : "",

        city: "Jaipur",

        pincode:
          formData.orderType === "delivery"
            ? formData.pincode.trim()
            : "",
      },

      preferredTime:
        formData.preferredTime.trim(),

      notes: formData.notes.trim(),

      items: cartItems.map((item) => ({
        productId: String(item.id),
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
        image: item.image || "",
      })),

      paymentMethod: "cod",
    };

    // ---------------------------------------
    // SEND TO BACKEND
    // ---------------------------------------

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to place your order."
        );
      }

      // -------------------------------------
      // ORDER SUCCESS
      // -------------------------------------

      setOrderNumber(
        data.order.orderNumber
      );

      setPlacedOrder(data.order);

      clearCart();

      setOrderSuccess(true);
    } catch (error) {
      console.error(
        "Checkout order error:",
        error
      );

      setErrorMessage(
        error.message ||
          "Something went wrong while placing your order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // -----------------------------------------
  // SUCCESS SCREEN
  // -----------------------------------------

  if (orderSuccess) {
    return (
      <div className="checkout-page">

        <div className="checkout-container">

          <div className="checkout-success">

            <div className="checkout-success-icon">
              <CheckCircle2 size={42} />
            </div>

            <span className="eyebrow">
              ORDER RECEIVED
            </span>

            <h1>
              Thank you,{" "}
              {placedOrder?.customer?.name}.
            </h1>

            <p>
              Your order has been successfully
              placed with Baba Bakery.
            </p>


            <div className="checkout-success-number">

              <span>
                Order number
              </span>

              <strong>
                {orderNumber}
              </strong>

            </div>


            <div className="checkout-success-details">

              {placedOrder?.items?.map(
                (item) => (
                  <div
                    className="checkout-success-item"
                    key={`${item.productId}-${item.quantity}`}
                  >
                    <span>
                      {item.quantity} ×{" "}
                      {item.name}
                    </span>

                    <strong>
                      ₹
                      {item.price *
                        item.quantity}
                    </strong>
                  </div>
                )
              )}


              <div className="checkout-success-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹
                  {placedOrder?.totalAmount}
                </strong>

              </div>

            </div>


            <div className="checkout-success-type">

              <MapPin size={17} />

              <span>
                {placedOrder?.orderType ===
                "delivery"
                  ? "Delivery"
                  : "Pickup from store"}
              </span>

            </div>


            <p className="checkout-success-note">
              Baba Bakery will confirm your
              order and the pickup or delivery
              details with you.
            </p>


            <div className="checkout-success-actions">

              <Link
                to="/menu"
                className="primary-button"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // -----------------------------------------
  // CHECKOUT PAGE
  // -----------------------------------------

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        {/* HEADER */}

        <div className="checkout-header">

          <Link
            to="/cart"
            className="back-to-menu"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </Link>

          <span className="eyebrow">
            CHECKOUT
          </span>

          <h1>
            Almost there.
          </h1>

          <p>
            Enter your details and choose how
            you'd like to receive your order.
          </p>

        </div>


        <div className="checkout-layout">

          {/* FORM */}

          <section className="checkout-form-section">

            <form
              className="checkout-form"
              onSubmit={handleSubmit}
            >

              {/* CUSTOMER */}

              <div className="checkout-form-block">

                <div className="checkout-block-heading">

                  <span>
                    01
                  </span>

                  <div>
                    <h2>
                      Your details
                    </h2>

                    <p>
                      We need these details to
                      confirm your order.
                    </p>
                  </div>

                </div>


                <div className="checkout-form-grid">

                  <div className="form-group">

                    <label htmlFor="name">
                      Full name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      autoComplete="name"
                      required
                    />

                  </div>


                  <div className="form-group">

                    <label htmlFor="phone">
                      Mobile number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      inputMode="numeric"
                      maxLength="10"
                      autoComplete="tel"
                      required
                    />

                  </div>

                </div>

              </div>


              {/* DELIVERY TYPE */}

              <div className="checkout-form-block">

                <div className="checkout-block-heading">

                  <span>
                    02
                  </span>

                  <div>
                    <h2>
                      How would you like
                      to receive it?
                    </h2>

                    <p>
                      Choose pickup or delivery.
                    </p>
                  </div>

                </div>


                <div className="checkout-type-options">

                  <label
                    className={
                      formData.orderType ===
                      "pickup"
                        ? "checkout-type-option active"
                        : "checkout-type-option"
                    }
                  >

                    <input
                      type="radio"
                      name="orderType"
                      value="pickup"
                      checked={
                        formData.orderType ===
                        "pickup"
                      }
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />

                    <div>
                      <strong>
                        Pickup from store
                      </strong>

                      <span>
                        Collect your order
                        from Baba Bakery.
                      </span>
                    </div>

                  </label>


                  <label
                    className={
                      formData.orderType ===
                      "delivery"
                        ? "checkout-type-option active"
                        : "checkout-type-option"
                    }
                  >

                    <input
                      type="radio"
                      name="orderType"
                      value="delivery"
                      checked={
                        formData.orderType ===
                        "delivery"
                      }
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />

                    <div>
                      <strong>
                        Local delivery
                      </strong>

                      <span>
                        Baba Bakery will
                        confirm delivery
                        details with you.
                      </span>
                    </div>

                  </label>

                </div>

              </div>


              {/* ADDRESS */}

              {formData.orderType ===
                "delivery" && (
                <div className="checkout-form-block">

                  <div className="checkout-block-heading">

                    <span>
                      03
                    </span>

                    <div>
                      <h2>
                        Delivery details
                      </h2>

                      <p>
                        Tell the bakery where to
                        deliver your order.
                      </p>
                    </div>

                  </div>


                  <div className="form-group">

                    <label htmlFor="address">
                      Address
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      rows="3"
                      placeholder="House / flat number, street and area"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      autoComplete="street-address"
                      required
                    />

                  </div>


                  <div className="checkout-form-grid">

                    <div className="form-group">

                      <label htmlFor="landmark">
                        Landmark
                      </label>

                      <input
                        id="landmark"
                        type="text"
                        name="landmark"
                        placeholder="Nearby landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />

                    </div>


                    <div className="form-group">

                      <label htmlFor="pincode">
                        Pincode
                      </label>

                      <input
                        id="pincode"
                        type="text"
                        name="pincode"
                        placeholder="6-digit pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        inputMode="numeric"
                        maxLength="6"
                        autoComplete="postal-code"
                      />

                    </div>

                  </div>

                </div>
              )}


              {/* TIME + NOTES */}

              <div className="checkout-form-block">

                <div className="checkout-block-heading">

                  <span>
                    {formData.orderType ===
                    "delivery"
                      ? "04"
                      : "03"}
                  </span>

                  <div>
                    <h2>
                      Order preferences
                    </h2>

                    <p>
                      Optional information for
                      the bakery.
                    </p>
                  </div>

                </div>


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
                    disabled={isSubmitting}
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="notes">
                    Special instructions
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    placeholder="Anything else the bakery should know?"
                    value={formData.notes}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />

                </div>

              </div>


              {/* PAYMENT */}

              <div className="checkout-form-block">

                <div className="checkout-block-heading">

                  <span>
                    {formData.orderType ===
                    "delivery"
                      ? "05"
                      : "04"}
                  </span>

                  <div>
                    <h2>
                      Payment
                    </h2>

                    <p>
                      Online payment will be
                      added in the next phase.
                    </p>
                  </div>

                </div>


                <div className="checkout-payment-option">

                  <div>

                    <strong>
                      Pay at store / on
                      delivery
                    </strong>

                    <span>
                      No online payment is
                      required for this test
                      ordering flow.
                    </span>

                  </div>

                  <CheckCircle2 size={20} />

                </div>

              </div>


              {/* ERROR */}

              {errorMessage && (
                <div className="form-error">
                  {errorMessage}
                </div>
              )}


              {/* SUBMIT */}

              <button
                type="submit"
                className="primary-button checkout-submit-button"
                disabled={isSubmitting}
              >

                {isSubmitting ? (
                  <>
                    <LoaderCircle
                      size={19}
                      className="loading-spinner"
                    />

                    Placing Order...
                  </>
                ) : (
                  <>
                    Place Order
                  </>
                )}

              </button>

            </form>

          </section>


          {/* ORDER SUMMARY */}

          <aside className="checkout-summary">

            <span className="eyebrow">
              YOUR ORDER
            </span>

            <h2>
              Order summary
            </h2>


            <div className="checkout-summary-items">

              {cartItems.map((item) => (

                <div
                  className="checkout-summary-item"
                  key={item.id}
                >

                  <div>

                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {item.quantity} × ₹
                      {item.price}
                    </span>

                  </div>

                  <strong>
                    ₹
                    {item.price *
                      item.quantity}
                  </strong>

                </div>

              ))}

            </div>


            <div className="checkout-summary-row">

              <span>
                Items
              </span>

              <strong>
                {cartCount}
              </strong>

            </div>


            <div className="checkout-summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{cartSubtotal}
              </strong>

            </div>


            <div className="checkout-summary-row">

              <span>
                Delivery
              </span>

              <span>
                Confirmed later
              </span>

            </div>


            <div className="checkout-summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{cartSubtotal}
              </strong>

            </div>


            <p className="checkout-summary-note">
              Final delivery details, if
              applicable, will be confirmed by
              Baba Bakery.
            </p>

          </aside>

        </div>

      </div>

    </div>
  );
}

export default Checkout;