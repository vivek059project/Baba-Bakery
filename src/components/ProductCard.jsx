import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <article className="product-card">

      <div className="product-image">

        <img
          src={product.image}
          alt={product.name}
        />

        <span className="product-category">
          {product.category}
        </span>

      </div>


      <div className="product-content">

        <div>

          <h3>
            {product.name}
          </h3>

          <p>
            {product.description}
          </p>

        </div>


        <div className="product-bottom">

          <strong>
            ₹{product.price}
          </strong>

          <div className="product-card-actions">

            <button
              type="button"
              className="product-add-button"
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag size={16} />
              Add
            </button>

            <Link
              to={`/menu/${product.id}`}
              className="product-arrow"
              aria-label={`View ${product.name}`}
            >
              <ArrowUpRight size={18} />
            </Link>

          </div>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;