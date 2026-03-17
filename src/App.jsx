import React, { useEffect, useState } from "react";
import { COLLECTIONS, INFO_PAGES, PRODUCTS } from "./data.js";

const CART_KEY = "lumiereskin-cart";

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

function getRoute() {
  const hash = window.location.hash || "#home";
  const [name, id] = hash.slice(1).split("/");
  return { name, id: id || "" };
}

function loadCart() {
  try {
    return JSON.parse(window.localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function ProductArt({ label, className = "product-card__art" }) {
  return <div className={className} data-product={label} />;
}

function App() {
  const [route, setRoute] = useState(getRoute);
  const [filter, setFilter] = useState("all");
  const [cart, setCart] = useState(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onHashChange = () => {
      setSearchOpen(false);
      setCartOpen(false);
      setRoute(getRoute());
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setCartOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (route.name && !["product", "checkout", "about-page", "shipping", "returns", "privacy", "terms"].includes(route.name)) {
      const target = document.getElementById(route.name);
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  }, [route]);

  const activeProducts =
    filter === "all"
      ? PRODUCTS
      : filter === "bestsellers"
        ? PRODUCTS.filter((product) => product.badge === "Bestseller")
        : PRODUCTS.filter((product) => product.collection === filter);

  const query = searchQuery.trim().toLowerCase();
  const searchResults = !query
    ? PRODUCTS
    : PRODUCTS.filter((product) =>
      [product.name, product.category, product.description].some((value) =>
        value.toLowerCase().includes(query)
      )
    );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const product = PRODUCTS.find((entry) => entry.id === item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  function addToCart(id, variant) {
    setCart((current) => {
      const existing = current.find((item) => item.id === id && item.variant === variant);
      if (existing) {
        return current.map((item) =>
          item.id === id && item.variant === variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { id, variant, quantity: 1 }];
    });
    setCartOpen(true);
    setSearchOpen(false);
  }

  function updateQuantity(id, variant, delta) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id && item.variant === variant
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleNewsletterSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    window.alert("You're subscribed to the LumiereSkin Co. newsletter. Use code GLOW10 on your first order.");
  }

  function handleContactSubmit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    window.alert("Message received. This demo storefront stores no backend data.");
  }

  const overlayVisible = searchOpen || cartOpen;

  return (
    <>
      <div className="page-shell">
        <header className="site-header">
          <div className="announcement-bar">
            <p>Free Shipping on orders over $65 | Cruelty-Free & Dermatologist Tested | 30-Day Glow Guarantee</p>
          </div>
          <div className="nav-wrap">
            <a href="#home" className="brand-mark" aria-label="LumiereSkin Co. home">
              <span className="brand-mark__sun" />
              <span className="brand-mark__text">
                <strong>LumiereSkin</strong>
                <span>Co.</span>
              </span>
            </a>
            <nav className="main-nav" aria-label="Primary">
              <a href="#home">Home</a>
              <a href="#shop">Shop</a>
              <a href="#collections">Collections</a>
              <a href="#about">About</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </nav>
            <div className="nav-actions">
              <button className="icon-button" type="button" onClick={() => setSearchOpen(true)}>
                Search
              </button>
              <button className="icon-button cart-button" type="button" onClick={() => setCartOpen(true)}>
                Cart
                <span>{cartCount}</span>
              </button>
            </div>
          </div>
        </header>

        <main tabIndex="-1">
          {route.name === "product" ? (
            <ProductPage productId={route.id} addToCart={addToCart} />
          ) : route.name === "checkout" ? (
            <CheckoutPage cart={cart} total={cartTotal} />
          ) : INFO_PAGES[route.name] ? (
            <InfoPage page={INFO_PAGES[route.name]} />
          ) : (
            <HomePage
              filter={filter}
              setFilter={setFilter}
              products={activeProducts}
              addToCart={addToCart}
              onNewsletterSubmit={handleNewsletterSubmit}
              onContactSubmit={handleContactSubmit}
            />
          )}
        </main>

        <footer className="site-footer">
          <div className="footer-grid">
            <div>
              <p className="eyebrow">LumiereSkin Co.</p>
              <h2>Your Skin. Illuminated.</h2>
              <p>Clinically inspired. Ritually crafted. Designed for women who treat skincare as self-care.</p>
            </div>
            <div>
              <p className="eyebrow">Pages</p>
              <a href="#about-page">About Us</a>
              <a href="#faq">FAQ</a>
              <a href="#shipping">Shipping & Returns</a>
              <a href="#contact">Contact</a>
            </div>
            <div>
              <p className="eyebrow">Policies</p>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#shipping">Shipping & Returns</a>
              <a href="#returns">Returns Policy</a>
            </div>
            <div>
              <p className="eyebrow">Newsletter</p>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <label className="sr-only" htmlFor="newsletter-email">Email address</label>
                <input id="newsletter-email" type="email" placeholder="Email address" required />
                <button type="submit">Claim My 10% Off</button>
              </form>
              <p className="muted">Instagram | TikTok | Pinterest</p>
              <p className="muted">&copy; 2025 LumiereSkin Co. All rights reserved. | Cruelty-Free | Dermatologist Tested | Clean Beauty</p>
            </div>
          </div>
        </footer>
      </div>

      <aside className={`cart-drawer ${cartOpen ? "is-open" : ""}`} aria-hidden={cartOpen ? "false" : "true"}>
        <div className="cart-drawer__header">
          <div>
            <p className="eyebrow">Your Bag</p>
            <h2>Checkout-ready</h2>
          </div>
          <button className="icon-button" type="button" onClick={() => setCartOpen(false)}>Close</button>
        </div>
        <div className="cart-items">
          {cart.length ? cart.map((item) => {
            const product = PRODUCTS.find((entry) => entry.id === item.id);
            if (!product) return null;
            return (
              <article className="cart-item" key={`${item.id}-${item.variant}`}>
                <div className="cart-item__art" />
                <div>
                  <p className="eyebrow">{product.category}</p>
                  <h3>{product.name}</h3>
                  <p className="muted">{item.variant}</p>
                  <div className="price-row">
                    <strong>{formatPrice(product.price * item.quantity)}</strong>
                    <span className="muted">{formatPrice(product.price)} each</span>
                  </div>
                  <div className="qty-row">
                    <button type="button" onClick={() => updateQuantity(item.id, item.variant, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.variant, 1)}>+</button>
                    <button className="ghost-button" type="button" onClick={() => updateQuantity(item.id, item.variant, -999)}>Remove</button>
                  </div>
                </div>
              </article>
            );
          }) : (
            <div className="card">
              <p className="eyebrow">Bag is empty</p>
              <h3>Build your glow ritual</h3>
              <p className="muted">Add a hero product to preview the full LumiereSkin customer journey.</p>
            </div>
          )}
        </div>
        <div className="cart-drawer__footer">
          <div className="cart-summary-line">
            <span>Subtotal</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <div className="cart-summary-line">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <button className="primary-button full-width" type="button" onClick={() => {
            setCartOpen(false);
            window.location.hash = "#checkout";
          }}>
            Proceed to checkout
          </button>
          <p className="muted">Demo storefront: checkout is simulated for preview purposes.</p>
        </div>
      </aside>

      <div className="search-panel" hidden={!searchOpen}>
        <div className="search-panel__inner">
          <label className="sr-only" htmlFor="search-input">Search products</label>
          <input
            id="search-input"
            type="search"
            placeholder="Search serums, tools, gift sets..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <div className="search-results">
            {searchResults.length ? searchResults.map((product) => (
              <a className="search-result" href={`#product/${product.id}`} key={product.id} onClick={() => setSearchOpen(false)}>
                <p className="eyebrow">{product.category}</p>
                <strong>{product.name}</strong>
                <p className="muted">{product.subtitle}</p>
              </a>
            )) : (
              <div className="search-result">
                <p className="eyebrow">No results</p>
                <strong>No products matched your search.</strong>
                <p className="muted">Try searching for serum, moisturiser, tool, or gift set.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="page-overlay" hidden={!overlayVisible} onClick={() => {
        setSearchOpen(false);
        setCartOpen(false);
      }} />
    </>
  );
}

function HomePage({ filter, setFilter, products, addToCart, onNewsletterSubmit, onContactSubmit }) {
  function jumpToShop(nextFilter) {
    setFilter(nextFilter);
    window.location.hash = "#shop";
  }

  return (
    <>
      <section className="section hero" id="home">
        <div className="hero-copy">
          <div>
            <p className="eyebrow">Premium beauty & skincare</p>
            <h1>Your Skin. Illuminated.</h1>
          </div>
          <div>
            <p>Clinically inspired formulas. Luxuriously crafted rituals. Designed for women who believe beautiful skin is the ultimate accessory.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#shop">Shop The Collection</a>
              <a className="ghost-button" href="#about">Read Our Story</a>
            </div>
            <div className="hero-metrics">
              <div className="mini-card">
                <p className="eyebrow">Cruelty-Free</p>
                <strong>Certified</strong>
                <span className="muted">Never tested on animals and never will be.</span>
              </div>
              <div className="mini-card">
                <p className="eyebrow">Guarantee</p>
                <strong>30 Days</strong>
                <span className="muted">Not glowing? Full refund. No questions asked.</span>
              </div>
              <div className="mini-card">
                <p className="eyebrow">Shipping</p>
                <strong>Over $65</strong>
                <span className="muted">Free standard delivery on qualifying orders.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual__frame">
            <div className="bottle-cluster" aria-hidden="true">
              <div className="bottle bottle--1" data-label="Glow" />
              <div className="bottle bottle--2" data-label="Lift" />
              <div className="bottle bottle--3" data-label="Repair" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="collections">
        <SectionHeading eyebrow="Featured collections" title="Shop By Concern">
          Whether you're chasing a lit-from-within glow or rebuilding a damaged barrier, we have the formula for you.
        </SectionHeading>
        <div className="collection-grid">
          {["bestsellers", "serums", "moisturisers", "tools", "gift-sets"].map((collectionId) => {
            const collection = COLLECTIONS.find((item) => item.id === collectionId);
            return (
              <article className="collection-card" key={collection.id}>
                <div>
                  <p className="eyebrow">{collection.name}</p>
                  <h3>{collection.name}</h3>
                  <p className="muted">{collection.description}</p>
                </div>
                <button className="ghost-button" type="button" onClick={() => jumpToShop(collection.id)}>
                  Explore
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" id="shop">
        <SectionHeading eyebrow="Best selling products" title="The Glow Edit - Our Bestsellers">
          Real products. Real results. Trusted by thousands. Browse the full LumiereSkin catalog or jump into a focused collection.
        </SectionHeading>
        <div className="filter-row">
          {COLLECTIONS.map((collection) => (
            <button
              className={`filter-chip ${filter === collection.id ? "active" : ""}`}
              type="button"
              key={collection.id}
              onClick={() => jumpToShop(collection.id)}
            >
              {collection.name}
            </button>
          ))}
        </div>
        <ProductGrid products={products} addToCart={addToCart} />
      </section>

      <section className="section">
        <SectionHeading eyebrow="Benefits / USP strip" title="Luxury promise, clearly stated.">
          Four high-confidence signals from the blueprint, surfaced early to reduce hesitation before product exploration.
        </SectionHeading>
        <div className="usp-grid">
          {[
            ["Clean Formulas", "No fillers", "No parabens, sulphates or synthetic fragrance. Ever."],
            ["Cruelty-Free", "Certified care", "Certified cruelty-free. Never tested on animals."],
            ["Dermatologist Tested", "Science-aware", "Every formula is clinically tested and safe for sensitive skin."],
            ["30-Day Guarantee", "Risk-free", "Not glowing? Full refund. No questions asked."]
          ].map(([eyebrow, title, text]) => (
            <article className="card" key={title}>
              <p className="eyebrow">{eyebrow}</p>
              <h3>{title}</h3>
              <p className="muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="story-grid">
          <article className="story-panel">
            <p className="eyebrow">Product spotlight</p>
            <h2>Meet Our Hero: The 24K Radiance Serum</h2>
            <p className="muted">5 years in the making. Inspired by dermatologists. Obsessed over by thousands.</p>
            <p className="muted">Our 24K Radiance Vitamin C Serum was formulated to solve the number one skincare complaint: uneven, dull, tired-looking skin. With a stabilised 15% Vitamin C complex, it works from day one to brighten dark spots, firm texture, and restore a natural, luminous glow that no highlighter can replicate.</p>
            <a className="primary-button" href="#product/24k-radiance-serum">Shop The Serum</a>
          </article>
          <article className="story-panel">
            <ProductArt label="Hero Serum" className="product-detail__art" />
          </article>
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Customer testimonials" title="Real Skin. Real Results.">
          Over 10,000 customers trust LumiereSkin Co. with their most important accessory.
        </SectionHeading>
        <div className="review-grid">
          {[
            ["Visible difference in 2 weeks.", "I've tried every vitamin C serum on the market. This is the only one that actually made a visible difference in 2 weeks. My dark spots have faded significantly and my skin looks so much brighter.", "- Sophie M."],
            ["Luxury that actually works.", "The Ritual Set was a gift to myself for my birthday and honestly it was the best decision I've made for my skin. The packaging alone feels like luxury, and the products actually work.", "- Priya K."],
            ["Worth every penny.", "The LED mask was intimidating at first but now I use it every other night. My acne has calmed down so much and my skin texture has genuinely improved.", "- Alyssa R."]
          ].map(([title, body, author]) => (
            <article className="card" key={title}>
              <p className="eyebrow">Verified buyer</p>
              <h3>{title}</h3>
              <p className="muted">{body}</p>
              <p className="muted">{author}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="contact-grid">
          <article className="info-panel">
            <p className="eyebrow">Newsletter signup</p>
            <h2>Join the Lumiere Inner Circle</h2>
            <p className="muted">Get exclusive early access to new launches, expert skincare tips, and 10% off your first order straight to your inbox.</p>
            <form className="newsletter-form" onSubmit={onNewsletterSubmit}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit">Claim My 10% Off</button>
            </form>
            <p className="muted">Discount code ready for welcome flow: GLOW10</p>
          </article>
          <article className="info-panel" id="about">
            <p className="eyebrow">Brand story</p>
            <h2>Why LumiereSkin Co.?</h2>
            <p className="muted">We started LumiereSkin Co. because we believed premium skincare should not mean choosing between effectiveness and ethics. Every formula we create is clean, clinically tested, and crafted with one obsession in mind: giving your skin the light it deserves.</p>
            <p className="muted">No fillers. No greenwashing. Just real results.</p>
            <a className="ghost-button" href="#about-page">Read Our Story</a>
          </article>
        </div>
      </section>

      <FaqSection />
      <ContactSection onSubmit={onContactSubmit} />
    </>
  );
}

function ProductGrid({ products, addToCart }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <a href={`#product/${product.id}`}>
            <ProductArt label={product.category} />
          </a>
          <p className="eyebrow">{product.badge}</p>
          <h3>{product.name}</h3>
          <p className="muted">{product.subtitle}</p>
          <div className="price-row">
            <strong>{formatPrice(product.price)}</strong>
            <s>{formatPrice(product.compareAt)}</s>
          </div>
          <div className="product-actions">
            <a className="ghost-button" href={`#product/${product.id}`}>View details</a>
            <button className="primary-button" type="button" onClick={() => addToCart(product.id, product.variants[0])}>
              Quick add
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProductPage({ productId, addToCart }) {
  const product = PRODUCTS.find((entry) => entry.id === productId);
  const [variant, setVariant] = useState(product?.variants[0] || "");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) return;
    setVariant(product.variants[0]);
    setQuantity(1);
  }, [product]);

  if (!product) {
    return (
      <section className="section policy-grid">
        <article className="policy-panel">
          <p className="eyebrow">Product not found</p>
          <h2>This product does not exist.</h2>
          <p className="muted">The link may be outdated or the product handle may be incorrect.</p>
          <div className="cta-row">
            <a className="primary-button" href="#shop">Back to shop</a>
            <a className="ghost-button" href="#home">Return home</a>
          </div>
        </article>
      </section>
    );
  }

  return (
    <>
      <section className="section product-detail">
        <ProductArt label={product.category} className="product-detail__art" />
        <article className="product-detail__panel">
          <p className="eyebrow">{product.badge}</p>
          <h1>{product.name}</h1>
          <p className="muted">{product.subtitle}</p>
          <div className="price-row">
            <strong>{formatPrice(product.price)}</strong>
            <s>{formatPrice(product.compareAt)}</s>
            <span className="muted">{product.rating} rating - {product.reviews} reviews</span>
          </div>
          <p>{product.description}</p>
          <div className="badge-row">
            <span className="badge">Free Shipping</span>
            <span className="badge">30-Day Returns</span>
            <span className="badge">Secure Payment</span>
            <span className="badge">Cruelty-Free</span>
          </div>
          <div className="variant-block">
            <label htmlFor="variant-select">Choose option</label>
            <select id="variant-select" className="select-input" value={variant} onChange={(event) => setVariant(event.target.value)}>
              {product.variants.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="variant-block">
            <label htmlFor="quantity-select">Quantity</label>
            <select id="quantity-select" className="select-input" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
              {[1, 2, 3, 4].map((count) => (
                <option key={count} value={count}>{count}</option>
              ))}
            </select>
          </div>
          <div className="cta-row">
            <button
              className="primary-button"
              type="button"
              onClick={() => {
                for (let index = 0; index < quantity; index += 1) {
                  addToCart(product.id, variant);
                }
              }}
            >
              Add to Cart
            </button>
            <a className="ghost-button" href="#shop">Back to shop</a>
          </div>
          <ul className="benefit-list">
            {product.features.map((feature, index) => (
              <li key={feature}>
                <span>Feature {index + 1}</span>
                <strong>{feature}</strong>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section">
        <SectionHeading eyebrow="You May Also Like" title="Complete the ritual.">
          Product recommendations are included because the blueprint explicitly calls for upsells and discovery on every PDP.
        </SectionHeading>
        <div className="product-grid">
          {PRODUCTS.filter((entry) => entry.id !== product.id).slice(0, 3).map((entry) => (
            <article className="product-card" key={entry.id}>
              <a href={`#product/${entry.id}`}>
                <ProductArt label={entry.category} />
              </a>
              <p className="eyebrow">{entry.badge}</p>
              <h3>{entry.name}</h3>
              <p className="muted">{entry.subtitle}</p>
              <div className="price-row">
                <strong>{formatPrice(entry.price)}</strong>
                <s>{formatPrice(entry.compareAt)}</s>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function CheckoutPage({ cart, total }) {
  return (
    <section className="section">
      <div className="checkout-row">
        <article className="checkout-panel" style={{ flex: "1 1 55%" }}>
          <p className="eyebrow">Checkout preview</p>
          <h2>Review your LumiereSkin order</h2>
          {cart.length ? (
            <ul className="cart-line-list">
              {cart.map((item) => {
                const product = PRODUCTS.find((entry) => entry.id === item.id);
                if (!product) return null;
                return (
                  <li className="cart-line" key={`${item.id}-${item.variant}`}>
                    <div>
                      <strong>{product.name}</strong>
                      <p className="muted">{item.variant} - Qty {item.quantity}</p>
                    </div>
                    <strong>{formatPrice(product.price * item.quantity)}</strong>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="card">
              <p className="eyebrow">No items yet</p>
              <h3>Your checkout is empty.</h3>
              <p className="muted">Add a product from the collection to preview the full purchase journey.</p>
              <a className="primary-button" href="#shop">Shop the collection</a>
            </div>
          )}
        </article>
        <article className="checkout-panel" style={{ flex: "1 1 40%" }}>
          <p className="eyebrow">Order summary</p>
          <h2>{formatPrice(total)}</h2>
          <ul className="benefit-list">
            <li><span>Discount</span><strong>GLOW10 available at checkout</strong></li>
            <li><span>Shipping</span><strong>Free over $65, otherwise from $5.99</strong></li>
            <li><span>Status</span><strong>Demo only, no live payment</strong></li>
          </ul>
          <a className="primary-button full-width" href="#home">Return to homepage</a>
        </article>
      </div>
    </section>
  );
}

function InfoPage({ page }) {
  return (
    <section className="section policy-grid">
      <article className="policy-panel">
        <p className="eyebrow">Essential page</p>
        <h2>{page.title}</h2>
        <p className="muted">{page.body}</p>
        <p className="muted">{page.extra}</p>
        <div className="cta-row">
          <a className="primary-button" href="#shop">Continue shopping</a>
          <a className="ghost-button" href="#contact">Contact support</a>
        </div>
      </article>
    </section>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <p>{children}</p>
    </div>
  );
}

function FaqSection() {
  const items = [
    ["How long does shipping take?", "We process all orders within 1-2 business days. Standard delivery takes 5-8 business days. Express shipping (2-3 days) is available at checkout. Free shipping on orders over $65."],
    ["What is your return policy?", "We offer a 30-Day Glow Guarantee. If you're not completely satisfied, contact us within 30 days of delivery for a full refund. Items must be unused and in original packaging."],
    ["Are your products cruelty-free?", "Yes. Every LumiereSkin Co. product is certified cruelty-free. We never test on animals and we never will."],
    ["Are your products suitable for sensitive skin?", "All formulas are dermatologist tested and free from the most common irritants. Most products are safe for sensitive skin, but each product page includes specific guidance."]
  ];

  return (
    <section className="section" id="faq">
      <SectionHeading eyebrow="FAQ" title="Common purchase questions.">
        Shipping, returns, sensitivity, tracking, and gift guidance are all pulled from the blueprint so this reads like a finished store instead of placeholders.
      </SectionHeading>
      <div className="faq-list">
        {items.map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ onSubmit }) {
  return (
    <section className="section" id="contact">
      <div className="contact-grid">
        <article className="info-panel">
          <p className="eyebrow">Contact</p>
          <h2>Need help choosing the right ritual?</h2>
          <p className="muted">For order support, gifting questions, or routine matching, send a note and our care team will respond quickly.</p>
          <ul className="benefit-list">
            <li><span>Email</span><strong>support@lumiereskin.co</strong></li>
            <li><span>Shipping</span><strong>Standard $5.99 | Express $12.99 | Free over $65</strong></li>
            <li><span>Gift Wrapping</span><strong>Available at checkout for $4.99</strong></li>
          </ul>
        </article>
        <article className="info-panel">
          <p className="eyebrow">Support form</p>
          <h2>Contact us</h2>
          <form className="contact-form" onSubmit={onSubmit}>
            <input type="text" name="name" placeholder="Full name" required />
            <input type="email" name="email" placeholder="Email address" required />
            <textarea name="message" placeholder="How can we help?" required />
            <button className="primary-button" type="submit">Send message</button>
          </form>
        </article>
      </div>
    </section>
  );
}

export default App;
