const footerLinks = ['Guía de tallas', 'Envíos', 'Cambios', 'Instagram'];

export function Footer() {
  return (
    <footer>
      <div className="flex flex-wrap items-center justify-between gap-10 border-t border-linea bg-crema-2 px-6 py-14 md:px-12">
        <div className="flex flex-col gap-2">
          <strong className="text-[26px] tracking-[-0.01em] text-tinta">10% en tu primer pedido</strong>
          <span className="text-base text-texto-muted">Déjanos tu correo. Prometemos escribir poco.</span>
        </div>
        {/* TODO(api): conectar con el endpoint de newsletter cuando backend-maxwear lo exponga */}
        <div className="flex min-w-[280px] flex-1 sm:min-w-[420px] sm:flex-none">
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            className="flex-1 border border-linea-fuerte bg-crema px-4.5 py-4 text-[15px] text-tinta"
          />
          <button
            type="button"
            className="bg-tinta px-7 py-4 text-sm font-bold tracking-[0.08em] text-crema-3 uppercase hover:bg-terracota"
          >
            Quiero
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-4 border-t border-linea px-6 py-8 font-mono text-xs text-texto-soft md:px-12">
        <span>© 2026 MAXWEAR · Bogotá, Colombia</span>
        <div className="flex gap-5">
          {footerLinks.map((label) => (
            <a key={label} href="#" className="hover:text-terracota">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
