## Goal
Remove the hover "Add to Cart" button on catalogue product cards and make each product card clickable, opening a dedicated product detail page that mirrors the fields admins use when creating a listing.

## Changes

### 1. Shared product data
Create `src/lib/products.ts` exporting:
- `Product` type with the same fields as the admin "New Listing" form: `slug`, `name`, `description`, `category`, `price`, `oldPrice`, `stock`, `specs` (technical parameters: material, dimensions, age range), `image`, `badge`, `brand`, `age`.
- A `products` array seeded from the current Catalogue list (Turbo Race Car, Rag Doll Lina, etc.), each enriched with `description` and `specs`. Slugs derived from name (`turbo-race-car`, etc.).
- Helper `getProductBySlug(slug)`.

This replaces the inline `products` array in `Catalogue.tsx` so the detail page and catalogue stay in sync.

### 2. Catalogue card cleanup (`src/pages/Catalogue.tsx`)
- Import products from the new shared module.
- Remove the hover overlay containing the "Add to Cart" button (lines ~89–100). Keep the "Out of Stock" badge.
- Wrap each `ProductCard` in a `<Link to={`/product/${product.slug}`}>` so the whole card navigates to the detail page on click.
- Drop the now-unused `ShoppingCart` and `Button` imports tied to that overlay.

### 3. New product detail page (`src/pages/Product.tsx`)
- Route: `/product/:slug`. Uses `useParams` + `getProductBySlug`; renders `NotFound`-style fallback if missing.
- Layout: `Navbar` + main + `Footer`, consistent with other pages.
- Content (mirrors admin form fields):
  - Large product image (left on desktop, top on mobile).
  - Right column: name, category, brand · age, price (with old price strike-through), stock indicator ("In Stock: 24" or "Out of Stock"), badge chip.
  - "Description" section (full text).
  - "Technical Parameters" section listing the specs (material, dimensions, age range).
  - Single "Add to Cart" button (disabled when out of stock) — primary CTA on the detail page itself, since the user only removed the hover button on the card.
- Framer Motion entrance, rounded cards, brand colors consistent with the rest of the site.

### 4. Routing (`src/App.tsx`)
Add `<Route path="/product/:slug" element={<Product />} />` alongside existing routes.

## Out of scope
- No change to the bestseller `ProductGrid` on the landing page unless you also want the hover button removed there (let me know).
- No backend; data stays in the static `products` module.

## Technical notes
- All product data lives in `src/lib/products.ts` so adding fields later (e.g., from admin) only touches one file.
- Card click uses `<Link>` (not programmatic navigation) for accessibility and keyboard support.
