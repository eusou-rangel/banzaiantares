"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";

const nav = [
  { href: "/", label: "Home" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();
  const count = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/88 backdrop-blur-xl">
        <div className="container-page flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src={siteConfig.logo} alt="Banzai Geek" width={190} height={99} priority className="h-12 w-auto object-contain" />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-white/78 lg:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-electric-green">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/catalogo" className="hidden h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-white/80 hover:text-electric-green md:inline-flex" aria-label="Buscar produtos">
              <Search size={18} />
            </Link>
            <button className="relative h-10 w-10 rounded-md border border-white/10 bg-white/[0.04] text-white/80 hover:text-electric-green" onClick={() => setCartOpen(true)} aria-label="Abrir carrinho">
              <ShoppingBag className="mx-auto" size={18} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-electric-green px-1 text-xs font-black text-ink">
                  {count}
                </span>
              )}
            </button>
            <button className="h-10 w-10 rounded-md border border-white/10 bg-white/[0.04] text-white/80 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Abrir menu">
              {open ? <X className="mx-auto" size={20} /> : <Menu className="mx-auto" size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="container-page grid gap-1 pb-5 text-sm font-semibold text-white/82 lg:hidden">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 hover:bg-white/[0.06]">
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
