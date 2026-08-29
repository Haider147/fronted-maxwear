'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

const navLinks = ['Boxers', 'Packs', 'Tela fría', 'Max'];

export function Header() {
  const { itemCount } = useCart();

  return (
    <header>
      <div className="bg-marron px-4 py-3 text-center text-[13px] tracking-[0.1em] text-crema-3 uppercase">
        Envío gratis desde $150.000 · Cambios sin drama por 30 días
      </div>
      <div className="flex items-center justify-between border-b border-linea px-6 py-5.5 md:px-12">
        <nav className="hidden gap-8 text-sm font-semibold tracking-[0.06em] text-marron uppercase md:flex">
          {navLinks.map((label) => (
            <a key={label} href="#" className="hover:text-terracota">
              {label}
            </a>
          ))}
        </nav>
        <Link href="/" className="shrink-0">
          <Image src="/images/logo-maxwear.png" alt="MAXWEAR" width={612} height={500} className="h-[74px] w-auto" priority />
        </Link>
        <div className="flex items-center gap-6 text-sm font-semibold tracking-[0.06em] text-marron uppercase">
          <a href="#" className="hover:text-terracota">
            Buscar
          </a>
          <a href="#" className="hover:text-terracota">
            Cuenta
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-terracota">
            Bolsa
            <span className="inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-terracota text-xs text-crema-2">
              {itemCount}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
