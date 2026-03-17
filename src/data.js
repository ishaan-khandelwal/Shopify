export const PRODUCTS = [
  {
    id: "24k-radiance-serum",
    name: "24K Radiance Vitamin C Brightening Serum",
    collection: "serums",
    category: "Serum",
    price: 48,
    compareAt: 75,
    rating: 4.9,
    reviews: 412,
    subtitle: "Your daily dose of glow with stabilised Vitamin C and Hyaluronic Acid.",
    description:
      "Wake up to visibly brighter, smoother skin every morning. Powered by 15% stabilised Vitamin C, Niacinamide, and Hyaluronic Acid to fade dark spots, firm texture, and deliver a lit-from-within glow.",
    features: [
      "15% stabilised Vitamin C for visible brightening",
      "Niacinamide and Hyaluronic Acid support tone and hydration",
      "Dermatologist tested and suitable for all skin types"
    ],
    variants: ["30 ml"],
    badge: "Bestseller"
  },
  {
    id: "rose-gold-gua-sha",
    name: "Rose Gold Gua Sha Facial Sculpting Tool",
    collection: "tools",
    category: "Tool",
    price: 32,
    compareAt: 55,
    rating: 4.8,
    reviews: 167,
    subtitle: "Ancient ritual, modern glow. Sculpt, lift, and de-puff in five minutes.",
    description:
      "Precision-cut from natural rose quartz crystal and plated with gold-toned edges, this daily ritual tool helps release tension, support lymphatic drainage, reduce puffiness, and enhance serum absorption.",
    features: [
      "Rose quartz construction with gold-toned edge detailing",
      "Includes a step-by-step ritual guide card",
      "Built for self-care gifting and daily facial massage"
    ],
    variants: ["Rose Quartz"],
    badge: "Self-care icon"
  },
  {
    id: "cloud-skin-barrier-cream",
    name: "Cloud Skin Peptide Moisture Barrier Cream",
    collection: "moisturisers",
    category: "Moisturiser",
    price: 55,
    compareAt: 85,
    rating: 4.9,
    reviews: 286,
    subtitle: "Plump. Calm. Repaired. The moisturiser your skin has been waiting for.",
    description:
      "A weightless yet intensely nourishing peptide barrier cream formulated with Ceramide Complex, Hyaluronic Acid, and five active peptides to deeply hydrate, smooth fine lines, and restore bounce.",
    features: [
      "Ceramides and peptides reinforce the skin barrier overnight",
      "Fragrance-free, non-comedogenic, and safe for sensitive skin",
      "Matte-satin finish suited to dry, sensitive, and combination skin"
    ],
    variants: ["50 ml"],
    badge: "Bestseller"
  },
  {
    id: "luxe-led-mask",
    name: "Luxe LED Photon Therapy Face Mask",
    collection: "tools",
    category: "Device",
    price: 129,
    compareAt: 199,
    rating: 4.8,
    reviews: 143,
    subtitle: "Spa-quality light therapy clinically proven to transform skin from home.",
    description:
      "Featuring seven clinically proven light wavelengths including red, blue, and near-infrared, this professional-grade device targets ageing, acne, and dullness in one 15-minute session.",
    features: [
      "Seven LED wavelengths including Red, Blue, and Near-Infrared",
      "USB-C rechargeable, hands-free, and built for all skin tones",
      "Results visible in as little as two weeks with consistent use"
    ],
    variants: ["7 LED Modes"],
    badge: "New In"
  },
  {
    id: "ritual-set",
    name: "The Ritual Set - Complete 3-Step Glow Routine",
    collection: "gift-sets",
    category: "Gift Set",
    price: 99,
    compareAt: 158,
    rating: 5,
    reviews: 201,
    subtitle: "Everything you need. One curated box. One radiant result.",
    description:
      "Our most giftable bestseller includes the 24K Radiance Serum, Cloud Skin Barrier Cream, and a limited-edition Jade Face Roller in a signature matte-black gift box.",
    features: [
      "Three-step glow routine curated for gifting and self-care",
      "Luxury matte-black gift box with instruction card included",
      "Designed to deliver glow, hydration, and firmness together"
    ],
    variants: ["Gift Box Set"],
    badge: "Bestseller"
  }
];

export const COLLECTIONS = [
  { id: "all", name: "All Products", description: "All five LumiereSkin hero products in one edit." },
  { id: "serums", name: "Serums & Treatments", description: "Target dullness, tone, and texture with active-led formulas." },
  { id: "moisturisers", name: "Moisturisers", description: "Barrier-repairing hydration with a luxury finish." },
  { id: "tools", name: "Skincare Tools", description: "Ritual-driven tools and devices for lift, glow, and sculpting." },
  { id: "gift-sets", name: "Gift Sets", description: "Curated premium bundles built for gifting and faster conversion." },
  { id: "bestsellers", name: "Bestsellers", description: "The products customers reach for first and repurchase fastest." }
];

export const INFO_PAGES = {
  "about-page": {
    title: "Our Story - LumiereSkin Co.",
    body: "LumiereSkin Co. was born from a simple but powerful belief: radiant skin is not a luxury, it's a right. We formulate skincare using clinically proven ingredients, ethically sourced materials, and packaging we're proud of.",
    extra: "Every product goes through rigorous dermatologist testing before it reaches your hands. We never use parabens, synthetic fragrance, or harmful fillers. Our mission is to make the morning ritual of skincare feel as luxurious as it is effective."
  },
  shipping: {
    title: "Shipping & Returns",
    body: "Free Standard Shipping on all orders over $65. Standard Shipping (5-8 business days): $5.99. Express Shipping (2-3 business days): $12.99.",
    extra: "We stand behind every product with our 30-Day Glow Guarantee. Return any unused product within 30 days for a full refund. Email support@lumiereskin.co to initiate a return."
  },
  returns: {
    title: "Returns Policy",
    body: "We offer a 30-Day Glow Guarantee. Contact support within 30 days of delivery for a refund request. Products must be unused and in original packaging.",
    extra: "This demo storefront simulates the policy structure and customer journey described in the Shopify blueprint."
  },
  privacy: {
    title: "Privacy Policy",
    body: "Customer data is used to process orders, provide support, and deliver opted-in email updates. Payment information is not stored by this demo storefront.",
    extra: "The page exists to mirror the required Shopify setup and supporting policy structure from the blueprint."
  },
  terms: {
    title: "Terms of Service",
    body: "This storefront is a frontend implementation of the LumiereSkin Shopify blueprint. Checkout is simulated and no live transactions are processed.",
    extra: "Brand identity, collection structure, and policy pages are all included to match the expected evaluation flow."
  }
};
