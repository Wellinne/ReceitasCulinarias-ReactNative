export const cpfMask = (value: string) => value
  .replace(/\D/g, '')
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d{1,2})/, '$1-$2')
  .replace(/(-\d{2})\d+?$/, '$1');

export const phoneMask = (value: string) => value
  .replace(/\D+/g, '')
  .replace(/(\d{2})(\d)/, '($1) $2')
  .replace(/(\d{4})(\d)/, '$1-$2')
  .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
  .replace(/(-\d{4})\d+?$/, '$1');

export const caracterCustomizado = (value: string, max: number): string =>
  value.slice(0, max);

export const numeroCustomizadoMask = (value: string, max: number): string =>
  value.replace(/\D/g, '').slice(0, max);
