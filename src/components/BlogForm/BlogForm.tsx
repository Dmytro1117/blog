import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { z, ZodError } from 'zod';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAppDispatch, useAppSelector } from 'types/hooks';
import { addBlog } from 'types/operations';
import { Label, Input, ButtonSubmit } from './BlogFormStyled';

export type BlogFormValues = {
  name: string;
  about: string;
  phone: string;
};

export const schema = z.object({
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

export const initialValues: BlogFormValues = {
  name: '',
  about: '',
  phone: '',
};

export const BlogForm = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.blog);

  const handleSubmit = async (
    values: BlogFormValues,
    { resetForm }: { resetForm: () => void },
  ) => {
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
      items.some(
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
        <Label htmlFor="name">
          Назва посту
          <Field
            placeholder="Введіть тему"
            as={Input}
            type="text"
            name="name"
          />
          <ErrorMessage name="name" component="div" />
        </Label>
        <Label htmlFor="about">
          Зміст посту
          <Field
            placeholder="Напишіть свої думки"
            as={Input}
            type="text"
            name="about"
          />
          <ErrorMessage name="about" component="div" />
        </Label>
        <Label htmlFor="phone">
          Телефон автора
          <Field
            placeholder="Введіть номер"
            as={Input}
            type="tel"
            name="phone"
          />
          <ErrorMessage name="phone" component="div" />
        </Label>

        <ButtonSubmit type="submit">Додати</ButtonSubmit>
      </Form>
    </Formik>
  );
};
