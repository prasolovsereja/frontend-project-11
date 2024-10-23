import * as yup from 'yup';

export default (url, urls, i18n) => {
  yup.setLocale({
    string: {
      url: i18n.t('form.errors.invalidUrl'),
    },
    mixed: {
      required: i18n.t('form.errors.required'),
      notOneOf: i18n.t('form.errors.existingUrl'),
    },
  });

  const schema = yup
    .string()
    .required()
    .url()
    .notOneOf(urls);
  return schema.validate(url);
};
