import { useState } from "react";
import { Search } from "lucide-react";

import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-page">

      {/* MENU HERO */}

      <section className="menu-hero">

        <div className="menu-hero-container">

          <span className="eyebrow">
            BABA BAKERY
          </span>

          <h1>
            Something delicious
            <br />
            is waiting for you.
          </h1>

          <p>
            Explore our selection of bakery favourites,
            snacks, beverages and more.
          </p>

        </div>

      </section>


      {/* MENU */}

      <section className="menu-section">

        <div className="menu-container">

          {/* Search */}

          <div className="menu-tools">

            <div className="search-box">

              <Search size={18} />

              <input
                type="text"
                placeholder="Search the menu..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

            </div>

          </div>


          {/* Categories */}

          <div className="category-list">

            {categories.map((category) => (

              <button
                key={category}
                className={
                  activeCategory === category
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </button>

            ))}

          </div>


          {/* Products */}

          {filteredProducts.length > 0 ? (

            <div className="menu-products-grid">

              {filteredProducts.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          ) : (

            <div className="empty-menu">

              <h3>
                No items found
              </h3>

              <p>
                Try searching for something else.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default Menu;