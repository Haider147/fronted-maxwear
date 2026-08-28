export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(amount: number, currency = 'USD', locale = 'es-CO') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}
