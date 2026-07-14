export const siteConfig = {
  name: "Banzai Geek",
  slogan: "Camisetas geek para quem vive cultura pop de verdade.",
  description:
    "Loja virtual de camisetas geek criativas para fãs de anime, filmes e séries.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  instagram: "https://www.instagram.com/banzaigeekoficial/",
  email: "loja.banzai.geek.1@gmail.com",
  logo: "/brand/banzai-logo-original.png",
  heroImage: "/brand/banzai-hero.png",
  freeShippingText: "Frete grátis acima de R$ 249 para todo o Brasil",
  institutional:
    "A Banzai Geek nasceu para transformar cultura pop em camisetas estilosas, confortáveis e cheias de personalidade. Criamos estampas para quem acompanha animes, filmes e séries e quer vestir essa paixão no dia a dia."
};

export const orderStatuses = [
  "Aguardando pagamento",
  "Pago",
  "Em produção",
  "Enviado",
  "Entregue",
  "Cancelado"
] as const;

export type OrderStatus = (typeof orderStatuses)[number];
