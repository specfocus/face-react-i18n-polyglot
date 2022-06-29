import Polyglot from 'node-polyglot';
import type { TranslationMessages } from '@specfocus/view-focus.i18n/translations/';
import type { TranslationContextValue } from '@specfocus/view-focus.i18n/translations/TranslationContext';

type GetMessages = (
  locale: string
) => TranslationMessages | Promise<TranslationMessages>;

/**
 * Build a polyglot-based translator based on a function returning the messages for a locale
 *
 * @example
 *
 * import { useTranslator } from '@specfocus/view-focus.i18n.plyglot/translations/useTranslator';
 * import englishMessages from '@specfocus/locales/en/general';
 * import frenchMessages from '@specfocus/locales/fr/geneal';
 *
 * const messages = {
 *     fr: frenchMessages,
 *     en: englishMessages,
 * };
 * const translator = useTranslator(locale => messages[locale])
 */
export const useTranslator = (
  getMessages: GetMessages,
  initialLocale: string = 'en',
  polyglotOptions: any = {}
): TranslationContextValue => {
  let locale = initialLocale;
  const messages = getMessages(initialLocale);
  if (messages instanceof Promise) {
    throw new Error(
      `The i18nProvider returned a Promise for the messages of the default locale (${initialLocale}). Please update your i18nProvider to return the messages of the default locale in a synchronous way.`
    );
  }
  const polyglot = new Polyglot({
    locale,
    phrases: { '': '', ...messages },
    ...polyglotOptions,
  });
  let translate = polyglot.t.bind(polyglot);

  return {
    translate: (key: string, options: any = {}) => translate(key, options),
    changeLocale: (newLocale: string) =>
      // We systematically return a Promise for the messages because
      // getMessages may return a Promise
      Promise.resolve(getMessages(newLocale as string)).then(
        (messages: TranslationMessages) => {
          locale = newLocale;
          const newPolyglot = new Polyglot({
            locale: newLocale,
            phrases: { '': '', ...messages },
            ...polyglotOptions,
          });
          translate = newPolyglot.t.bind(newPolyglot);
        }
      ),
    getLocale: () => locale,
  };
};
