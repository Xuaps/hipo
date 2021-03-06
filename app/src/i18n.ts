import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'ns1';
export const resources = {
  es: {
    ns1: {},
  },
};

i18n.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'es',
  debug: false,
  ns: ['ns1'],
  defaultNS,
  resources,
});

export default i18n;
