import { cn } from '@/lib/utils';

const columns = ['Talla', 'Cintura (cm)', 'Cadera (cm)', 'Pantalón', 'Estatura ref.'];

const rows = [
  { size: 'S', waist: '71 – 76', hip: '86 – 91', pants: '28 – 30', height: '1,60 – 1,70 m' },
  { size: 'M', waist: '77 – 84', hip: '92 – 99', pants: '30 – 32', height: '1,68 – 1,78 m' },
  { size: 'L', waist: '85 – 92', hip: '100 – 107', pants: '32 – 34', height: '1,73 – 1,83 m' },
  { size: 'XL', waist: '93 – 101', hip: '108 – 115', pants: '34 – 36', height: '1,78 – 1,88 m' },
  { size: 'XXL', waist: '102 – 112', hip: '116 – 124', pants: '36 – 40', height: '1,80 – 1,95 m' },
];

// TODO(api): tabla genérica para boxers; si el backend define tallas por
// producto/categoría, reemplazar por datos reales.
export function SizeGuide() {
  return (
    <section id="tallas" className="flex flex-col gap-9 px-6 py-16 md:px-12 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-xs tracking-[0.22em] text-terracota uppercase">Sin adivinar</span>
          <h2 className="text-[32px] leading-none font-extrabold tracking-[-0.02em] text-tinta md:text-[44px]">
            Guía de tallas
          </h2>
        </div>
        <span className="max-w-[360px] text-[15px] text-texto">
          Mide tu cintura donde usas el pantalón. Si estás entre dos tallas, sube una.
        </span>
      </div>
      <div className="border border-[#E2D7CC]">
        <div className="grid grid-cols-5 border-b border-[#E2D7CC] bg-crema-2 text-[13px] font-bold tracking-[0.08em] uppercase">
          {columns.map((label) => (
            <span key={label} className="px-5 py-4">
              {label}
            </span>
          ))}
        </div>
        {rows.map((row, index) => (
          <div
            key={row.size}
            className={cn(
              'grid grid-cols-5 font-mono text-sm text-texto',
              index < rows.length - 1 && 'border-b border-linea'
            )}
          >
            <span className="px-5 py-4 font-medium text-tinta">{row.size}</span>
            <span className="px-5 py-4">{row.waist}</span>
            <span className="px-5 py-4">{row.hip}</span>
            <span className="px-5 py-4">{row.pants}</span>
            <span className="px-5 py-4">{row.height}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
