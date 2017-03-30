export default {
  name: 'i18n',
  initialize: function({ container }) {
    let i18n = container.lookup('service:i18n');

    i18n.set('locale', calculateLocale(i18n.get('locales')));
  }
};

function calculateLocale(locales) {
  // whatever you do to pick a locale for the user:
  const language = navigator.language || navigator.userLanguage;

  return  locales.includes(language) ? language : 'ko-KR';//'en-GB';//
}
