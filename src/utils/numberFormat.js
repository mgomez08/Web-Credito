import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-numberformat/locale-data/en";

export const numberCurrencyFormat = (number) =>
  new Intl.NumberFormat().format(number);
