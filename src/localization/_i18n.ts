import {I18n} from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import tr from './tr.json';
import en from './en.json';

const i18n = new I18n();

const locales = RNLocalize.getLocales();

i18n.locale = locales[0].languageTag;

console.log(locales);
i18n.enableFallback = true;
i18n.defaultLocale = 'tr';
i18n.translations = {
  'en-US': en,
  'tr-TR': tr,
};

export default i18n;
