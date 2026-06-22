import productCar from "@/assets/product-car.jpg";
import productDoll from "@/assets/product-doll.jpg";
import productPuzzle from "@/assets/product-puzzle.jpg";
import productTeddy from "@/assets/product-teddy.jpg";
import productBlocks from "@/assets/product-blocks.jpg";
import productTrain from "@/assets/product-train.jpg";

export type AgeGroup = "0-3" | "4-7" | "8+";

export interface Product {
  slug: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  age: AgeGroup;
  price: number;
  oldPrice: number | null;
  stock: number;
  specs: string;
  image: string;
  badge: string;
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const products: Product[] = [
  {
    slug: "turbo-race-car",
    name: "Turbo Race Car",
    description:
      "Feel the thrill of the track with the Turbo Race Car — a sleek pull-back vehicle built for speed and stunts. Realistic detailing, smooth wheels and a sturdy diecast frame make it a favorite for racing fans of any age.",
    category: "Cars",
    brand: "SpeedyToys",
    age: "4-7",
    price: 19.99,
    oldPrice: 24.99,
    stock: 24,
    specs: "Material: diecast metal & ABS plastic · Dimensions: 14 × 6 × 4 cm · Weight: 180 g · Age range: 4+ · Pull-back motor, no batteries required",
    image: productCar,
    badge: "Top Deal",
  },
  {
    slug: "rag-doll-lina",
    name: "Rag Doll Lina",
    description:
      "Lina is a cuddly handmade rag doll with embroidered features and a soft cotton dress. The perfect bedtime companion for imaginative play and sweet dreams.",
    category: "Dolls",
    brand: "DreamPlay",
    age: "4-7",
    price: 24.99,
    oldPrice: null,
    stock: 12,
    specs: "Material: 100% cotton outer, hypoallergenic polyester fill · Dimensions: 35 cm tall · Age range: 3+ · Machine washable at 30 °C",
    image: productDoll,
    badge: "Bestseller",
  },
  {
    slug: "animal-puzzle-set",
    name: "Animal Puzzle Set",
    description:
      "A bright, chunky puzzle set featuring forest, jungle and farm animals. Helps develop fine motor skills, shape recognition and early vocabulary.",
    category: "Educational Toys",
    brand: "LearnFun",
    age: "4-7",
    price: 14.99,
    oldPrice: 18.99,
    stock: 37,
    specs: "Material: FSC-certified plywood · 24 pieces, 4 puzzle boards · Dimensions: 30 × 22 cm board · Age range: 3+",
    image: productPuzzle,
    badge: "In Stock",
  },
  {
    slug: "teddy-bear-bruno",
    name: "Teddy Bear Bruno",
    description:
      "Bruno is an extra-soft plush bear with a friendly smile and warm caramel fur. Made for hugs, naps and lifelong friendship.",
    category: "Plush",
    brand: "CuddleCo",
    age: "0-3",
    price: 29.99,
    oldPrice: null,
    stock: 8,
    specs: "Material: ultra-soft polyester plush, recycled PET fill · Dimensions: 30 cm seated · Age range: 0+ · CE-tested, surface washable",
    image: productTeddy,
    badge: "In Stock",
  },
  {
    slug: "colorful-building-blocks",
    name: "Colorful Building Blocks",
    description:
      "A vibrant 80-piece block set that sparks creativity. Stack, sort and build — endless combinations to keep little engineers busy for hours.",
    category: "Educational Toys",
    brand: "BrickWorld",
    age: "0-3",
    price: 22.99,
    oldPrice: 27.99,
    stock: 41,
    specs: "Material: BPA-free ABS plastic · 80 pieces in 6 colors · Storage tub included · Age range: 1.5+",
    image: productBlocks,
    badge: "Top Deal",
  },
  {
    slug: "wooden-train",
    name: "Wooden Train",
    description:
      "Classic wooden train set with magnetic carriages and a curved track. Encourages open-ended play, problem solving and storytelling.",
    category: "Wooden Toys",
    brand: "EcoToys",
    age: "4-7",
    price: 34.99,
    oldPrice: 39.99,
    stock: 15,
    specs: "Material: solid beech wood, water-based non-toxic paint · 22 pieces (engine + 2 carriages + 18 tracks) · Age range: 3+",
    image: productTrain,
    badge: "In Stock",
  },
  {
    slug: "mini-sports-car",
    name: "Mini Sports Car",
    description:
      "A pocket-sized sports car with realistic decals and free-rolling wheels. Great for collectors and on-the-go play.",
    category: "Cars",
    brand: "SpeedyToys",
    age: "8+",
    price: 16.99,
    oldPrice: null,
    stock: 22,
    specs: "Material: diecast metal body, rubber tires · Scale 1:32 · Dimensions: 10 × 4 × 3 cm · Age range: 6+",
    image: productCar,
    badge: "In Stock",
  },
  {
    slug: "princess-doll-mia",
    name: "Princess Doll Mia",
    description:
      "Princess Mia comes dressed in a sparkling gown with brushable hair and posable arms. Inspire fairytale adventures and dress-up play.",
    category: "Dolls",
    brand: "DreamPlay",
    age: "4-7",
    price: 27.99,
    oldPrice: 32.99,
    stock: 0,
    specs: "Material: vinyl body, saran hair · Dimensions: 30 cm tall · Includes gown, tiara and shoes · Age range: 4+",
    image: productDoll,
    badge: "Bestseller",
  },
  {
    slug: "learning-puzzle-pro",
    name: "Learning Puzzle Pro",
    description:
      "An advanced puzzle that combines geography, math and logic challenges. Perfect for school-age kids who love a brain workout.",
    category: "Board Games",
    brand: "LearnFun",
    age: "8+",
    price: 19.99,
    oldPrice: null,
    stock: 30,
    specs: "Material: thick recycled cardboard · 200 pieces · Finished size: 50 × 40 cm · Age range: 7+",
    image: productPuzzle,
    badge: "In Stock",
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export { slugify };
