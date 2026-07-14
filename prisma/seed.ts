import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { categories, products } from "../src/data/products";

const prisma = new PrismaClient();

async function main() {
  for (const name of categories) {
    await prisma.category.upsert({
      where: { slug: name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") },
      update: {},
      create: {
        name,
        slug: name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      }
    });
  }

  for (const product of products) {
    const category = await prisma.category.findUniqueOrThrow({
      where: {
        slug: product.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      }
    });

    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: {
        name: product.name,
        slug: product.slug,
        price: product.price,
        description: product.description,
        images: product.images,
        stock: product.stock,
        sizes: product.sizes,
        colors: product.colors,
        sku: product.sku,
        active: product.active,
        categoryId: category.id
      }
    });
  }

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL ?? "loja.banzai.geek.1@gmail.com" },
    update: {},
    create: {
      name: "Admin Banzai",
      email: process.env.ADMIN_EMAIL ?? "loja.banzai.geek.1@gmail.com",
      passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "troque-esta-senha", 10),
      role: "ADMIN"
    }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
