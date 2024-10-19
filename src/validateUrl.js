import * as yup from 'yup';

export default (url, urls) => {
  const schema = yup
    .string()
    .required()
    .url('Ссылка должна быть валидным URL')
    .notOneOf(urls, 'URL уже введен');
  return schema.validate(url);
};
