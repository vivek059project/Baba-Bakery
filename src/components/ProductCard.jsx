import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
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

          <Link
            to={`/menu/${product.id}`}
            className="product-arrow"
            aria-label={`View ${product.name}`}
          >
            <ArrowUpRight size={18} />
          </Link>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;