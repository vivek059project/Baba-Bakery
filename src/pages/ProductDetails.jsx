import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";

import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <section className="product-not-found">

        <div>

          <h1>
            Product not found
          </h1>

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
    setAddedToCart(false);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );

    setAddedToCart(false);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
  };

  return (
    <div className="product-details-page">

      <div className="product-details-container">

        {/* BACK TO MENU */}

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


            {/* ADD TO CART */}

            <button
              type="button"
              className="primary-button product-add-to-cart-button"
              onClick={handleAddToCart}
            >

              {addedToCart ? (
                <>
                  <CheckCircle size={19} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag size={19} />
                  Add to Cart
                </>
              )}

            </button>


            {/* GO TO CART */}

            {addedToCart && (
              <Link
                to="/cart"
                className="product-view-cart-button"
              >
                View Cart
              </Link>
            )}


            <p className="product-note">
              You can continue shopping and review
              your complete order in the cart before
              checkout.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;