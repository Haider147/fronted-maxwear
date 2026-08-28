export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Maxwear</h1>
      <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">
        Proyecto inicializado. Empieza a construir la tienda desde{' '}
        <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono dark:bg-white/[.08]">
          src/app/page.tsx
        </code>
        .
      </p>
    </main>
  );
}
