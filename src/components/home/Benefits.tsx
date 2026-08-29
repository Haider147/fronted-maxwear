const benefits = [
  { title: 'Tela fría', description: 'Respira aunque el día no ayude.' },
  { title: 'Cero rozaduras', description: 'Costuras planas, sin etiquetas.' },
  { title: 'Envío 24-48h', description: 'Colombia entera, sin excusas.' },
  { title: 'Cambios 30 días', description: 'Si no es tu talla, la cambiamos.' },
];

export function Benefits() {
  return (
    <section className="grid grid-cols-2 divide-x divide-y divide-linea border-y border-linea md:grid-cols-4 md:divide-y-0">
      {benefits.map((benefit) => (
        <div key={benefit.title} className="flex flex-col gap-1.5 px-7 py-6.5">
          <strong className="text-sm tracking-[0.06em] text-tinta uppercase">{benefit.title}</strong>
          <span className="text-sm text-texto-muted">{benefit.description}</span>
        </div>
      ))}
    </section>
  );
}
