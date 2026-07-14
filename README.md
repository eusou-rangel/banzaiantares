# Banzai Geek

Loja virtual em Next.js para venda de camisetas geek, com catálogo, produto individual, carrinho, checkout, Mercado Pago, painel administrativo e Prisma/PostgreSQL.

## Rodando localmente

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Variáveis principais

- `DATABASE_URL`: conexão PostgreSQL para Supabase, Railway ou outro provider.
- `NEXT_PUBLIC_SITE_URL`: URL pública do site.
- `NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY`: chave pública para Brick/checkout no cliente.
- `MERCADO_PAGO_ACCESS_TOKEN`: token privado da API oficial do Mercado Pago.
- `MERCADO_PAGO_WEBHOOK_SECRET`: segredo para validar webhooks.
- `ADMIN_EMAIL` e `ADMIN_PASSWORD`: credenciais iniciais do seed.

## Estrutura editável

- Textos e contatos: `src/config/site.ts`
- Produtos de exemplo: `src/data/products.ts`
- Schema do banco: `prisma/schema.prisma`
- Assets da marca: `public/brand`
- Imagens dos produtos: `public/products`

## Deploy

- Vercel: configure as variáveis de ambiente e rode `prisma generate` no build.
- Railway: crie PostgreSQL, defina `DATABASE_URL` e rode as migrations.
- Supabase: use a connection string PostgreSQL em `DATABASE_URL`.

O checkout cria pagamentos reais quando `MERCADO_PAGO_ACCESS_TOKEN` está configurado. Sem token, a API responde em modo simulado para facilitar desenvolvimento.
