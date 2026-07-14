export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  shortDescription: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  sku: string;
  stock: number;
  active: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  rating: number;
};

export const commonSizes = ["P", "M", "G", "GG", "XG", "G1", "G2", "G3"];

export const sizeChart = [
  { size: "P", cintura: "48 cm", tronco: "51 cm", altura: "68 cm" },
  { size: "M", cintura: "51 cm", tronco: "54 cm", altura: "71 cm" },
  { size: "G", cintura: "54 cm", tronco: "57 cm", altura: "74 cm" },
  { size: "GG", cintura: "57 cm", tronco: "60 cm", altura: "77 cm" },
  { size: "XG", cintura: "60 cm", tronco: "63 cm", altura: "80 cm" },
  { size: "G1", cintura: "63 cm", tronco: "66 cm", altura: "82 cm" },
  { size: "G2", cintura: "66 cm", tronco: "69 cm", altura: "84 cm" },
  { size: "G3", cintura: "69 cm", tronco: "72 cm", altura: "86 cm" }
];

export const categories = [
  "Anime",
  "Filmes e Séries"
];

export const products: Product[] = [
  {
    id: "prod_anime_01",
    slug: "camiseta-yuji-itadori",
    name: "Camiseta Yuji Itadori",
    price: 65,
    category: "Anime",
    shortDescription: "Camiseta preta com estampa anime em alta definição.",
    description:
      "Camiseta preta com estampa Yuji Itadori, visual marcante e acabamento confortável para fãs de anime.",
    images: ["/products/jujutsu-yuji-frente.png"],
    colors: ["Preta"],
    sizes: commonSizes,
    sku: "BG-ANI-YUJ-001",
    stock: 42,
    active: true,
    featured: true,
    bestSeller: true,
    rating: 4.9
  },
  {
    id: "prod_anime_03",
    slug: "camiseta-toji-costas",
    name: "Camiseta Toji Costas",
    price: 65,
    category: "Anime",
    shortDescription: "Camiseta preta com estampa nas costas em arte anime.",
    description:
      "Camiseta preta com estampa Toji nas costas, ideal para quem prefere visual forte e detalhado.",
    images: ["/products/jujutsu-toji-costas.png"],
    colors: ["Preta"],
    sizes: commonSizes,
    sku: "BG-ANI-TOJ-009",
    stock: 40,
    active: true,
    featured: true,
    rating: 4.8
  },
  {
    id: "prod_anime_04",
    slug: "camiseta-tatsumaki",
    name: "Camiseta Tatsumaki",
    price: 65,
    category: "Anime",
    shortDescription: "Camiseta preta com arte verde inspirada em anime.",
    description:
      "Camiseta preta com estampa Tatsumaki em tons de verde, com visual moderno para fãs de anime.",
    images: ["/products/one-punch-tatsumaki.png"],
    colors: ["Preta"],
    sizes: commonSizes,
    sku: "BG-ANI-TAT-010",
    stock: 40,
    active: true,
    featured: true,
    rating: 4.8
  },
  {
    id: "prod_series_02",
    slug: "camiseta-scooby-doo",
    name: "Camiseta Scooby-Doo",
    price: 65,
    category: "Filmes e Séries",
    shortDescription: "Camiseta preta com estampa cartoon colorida.",
    description:
      "Camiseta preta com estampa Scooby-Doo em estilo cartoon, divertida e cheia de nostalgia.",
    images: ["/products/scooby-doo.png"],
    colors: ["Preta"],
    sizes: commonSizes,
    sku: "BG-SER-SCO-011",
    stock: 40,
    active: true,
    featured: true,
    rating: 4.8
  },
  {
    id: "prod_series_03",
    slug: "camiseta-stranger-bike",
    name: "Camiseta Stranger Bike",
    price: 65,
    category: "Filmes e Séries",
    shortDescription: "Camiseta branca com arte Stranger em preto e vermelho.",
    description:
      "Camiseta branca com estampa inspirada em Stranger Things, com contraste limpo e impacto visual.",
    images: ["/products/stranger-things-bike.png"],
    colors: ["Branca"],
    sizes: commonSizes,
    sku: "BG-SER-STB-012",
    stock: 40,
    active: true,
    rating: 4.7
  },
  {
    id: "prod_series_04",
    slug: "camiseta-tom-e-jerry",
    name: "Camiseta Tom e Jerry",
    price: 65,
    category: "Filmes e Séries",
    shortDescription: "Camiseta preta com estampa cartoon clássica.",
    description:
      "Camiseta preta com arte Tom e Jerry nas costas, com composição divertida em estilo quadrinhos.",
    images: ["/products/tom-e-jerry.png"],
    colors: ["Preta"],
    sizes: commonSizes,
    sku: "BG-SER-TJY-013",
    stock: 40,
    active: true,
    rating: 4.7
  },
  {
    id: "prod_series_05",
    slug: "camiseta-eddie-munson",
    name: "Camiseta Eddie Munson",
    price: 65,
    category: "Filmes e Séries",
    shortDescription: "Camiseta preta com arte vermelha estilo rock.",
    description:
      "Camiseta preta com estampa Eddie Munson em vermelho, visual marcante para fãs de séries e rock.",
    images: ["/products/eddie-munson-hellfire.png"],
    colors: ["Preta"],
    sizes: commonSizes,
    sku: "BG-SER-EDM-014",
    stock: 40,
    active: true,
    featured: true,
    rating: 4.9
  }
];

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug && product.active);

export const getRelatedProducts = (product: Product) =>
  products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 4);

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);

