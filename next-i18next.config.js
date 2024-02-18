const path = require('path');

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'de',
    locales: ['de'],
    localePath: path.resolve('./public/locales'),
  },
};
