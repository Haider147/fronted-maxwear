import Link from 'next/link';

type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex gap-2.5 px-6 py-5 font-mono text-xs tracking-[0.12em] text-texto-soft uppercase md:px-12">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-2.5">
          {item.href ? (
            <Link href={item.href} className="hover:text-terracota">
              {item.label}
            </Link>
          ) : (
            <span className="text-tinta">{item.label}</span>
          )}
          {index < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  );
}
