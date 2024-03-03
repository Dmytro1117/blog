import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch } from 'react-redux';
import { addBlog } from '../../redux/operations';
import { useSelector } from 'react-redux';
import { getBlogs } from '../../redux/selectors';
import { z, ZodError } from 'zod';
import css from './BlogForm.module.css';
import { Formik, Form, Field } from 'formik';

const schema = z.object({
  name: z
    .string()
    .refine(value => /^\p{Lu}[\p{L}\s.'-]+$/u.test(value), {
      message: 'Назва посту має починатися з великої літери (без цифр)',
    })
    .refine(value => value.length <= 40, {
      message: 'Максимальна довжина 40 символів',
    })
    .refine(value => value.length > 0, {
      message: "Назва посту є обов'язковим полем",
    }),
  about: z.string(),
  phone: z
    .string()
    .refine(value => /^\d{3}-\d{2}-\d{2}$/.test(value), {
      message: 'Номер має бути в форматі 555-55-55',
    })
    .refine(value => value.length > 0, {
      message: "Номер є обов'язковим полем",
    }),
});

const initialValues = {
  name: '',
  about: '',
  phone: '',
};

export const BlogForm = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(getBlogs);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await schema.parseAsync(values);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = Object.values(error.errors)
          .map(e => e.message)
          .join('\n');
        return Notify.warning(errorMessage);
      }
    }

    const { name, about, phone } = values;

    if (
      blogs.some(
        num =>
          num.name.toLowerCase() === name.toLowerCase() || num.phone === phone,
      )
    ) {
      return Notify.warning(`${name} чи ${phone} вже існує`);
    }

    dispatch(
      addBlog({
        name,
        about,
        phone,
      }),
    );

    Notify.success(`${name}, ${about}, ${phone} додано успішно`);
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form autoComplete="off">
        <label className={css.labelName} htmlFor="name">
          Назва посту
          <Field placeholder="Введіть тему" type="text" name="name" />
        </label>
        <label className={css.labelName} htmlFor="about">
          Зміст посту
          <Field placeholder="Напишіть свої думки" type="text" name="about" />
        </label>
        <label className={css.labelName} htmlFor="phone">
          Телефон автора
          <Field placeholder="Введіть номер" type="tel" name="phone" />
        </label>

        <button className={css.buttonAddBlog} type="submit">
          Додати
        </button>
      </Form>
    </Formik>
  );
};
