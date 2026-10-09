import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // -----------------------------------------
  // EMPTY CART
  // -----------------------------------------

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">

          <div className="cart-empty">

            <div className="cart-empty-icon">
              <ShoppingBag size={30} />
            </div>

            <span className="eyebrow">
              YOUR CART
            </span>

            <h1>
              Your cart is empty.
            </h1>

            <p>
              Add something delicious from our
              menu and it will appear here.
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
  // CART
  // -----------------------------------------

  return (
    <div className="cart-page">

      <div className="cart-container">

        {/* HEADER */}

        <div className="cart-header">

          <Link
            to="/menu"
            className="back-to-menu"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <span className="eyebrow">
            YOUR CART
          </span>

          <h1>
            Your order.
          </h1>

          <p>
            Review your items before
            continuing to checkout.
          </p>

        </div>


        {/* CART CONTENT */}

        <div className="cart-layout">

          {/* ITEMS */}

          <section className="cart-items">

            <div className="cart-items-header">
              <strong>
                {cartCount}{" "}
                {cartCount === 1
                  ? "item"
                  : "items"}
              </strong>
            </div>


            {cartItems.map((item) => (

              <article
                className="cart-item"
                key={item.id}
              >

                {/* IMAGE */}

                <div className="cart-item-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                </div>


                {/* DETAILS */}

                <div className="cart-item-details">

                  <span className="cart-item-category">
                    {item.category}
                  </span>

                  <h2>
                    {item.name}
                  </h2>

                  <strong className="cart-item-price">
                    ₹{item.price}
                  </strong>


                  {/* QUANTITY */}

                  <div className="cart-item-bottom">

                    <div className="cart-quantity">

                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(
                            item.id
                          )
                        }
                        aria-label={`Decrease ${item.name}`}
                      >
                        <Minus size={15} />
                      </button>

                      <strong>
                        {item.quantity}
                      </strong>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(
                            item.id
                          )
                        }
                        aria-label={`Increase ${item.name}`}
                      >
                        <Plus size={15} />
                      </button>

                    </div>


                    <strong className="cart-item-total">
                      ₹
                      {item.price *
                        item.quantity}
                    </strong>

                  </div>

                </div>


                {/* REMOVE */}

                <button
                  type="button"
                  className="cart-remove-button"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={17} />
                </button>

              </article>

            ))}

          </section>


          {/* SUMMARY */}

          <aside className="cart-summary">

            <span className="eyebrow">
              ORDER SUMMARY
            </span>

            <h2>
              Your total
            </h2>


            <div className="cart-summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{cartSubtotal}
              </strong>

            </div>


            <div className="cart-summary-row">

              <span>
                Delivery
              </span>

              <span>
                Confirmed at checkout
              </span>

            </div>


            <div className="cart-summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{cartSubtotal}
              </strong>

            </div>


            <Link
              to="/checkout"
              className="primary-button cart-checkout-button"
            >
              Proceed to Checkout
            </Link>


            <p className="cart-note">
              You can choose pickup or delivery
              during checkout.
            </p>

          </aside>

        </div>

      </div>

    </div>
  );
}

export default Cart;