import * as yup from 'yup';

export const userReviewValidationSchemas = yup.object().shape({
  comment: yup.string().required('Required'),
});
