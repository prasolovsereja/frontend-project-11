import i18next from 'i18next';

i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru: {
      translation: {
        success: 'RSS успешно загружен',
        invalidUrl: 'Ссылка должна быть валидным URL',
        existingUrl: 'RSS уже существует',
        notValidRSS: 'Не валидный RSS',
        networkError: 'Ошибка сети',
      },
    },
  },
});
