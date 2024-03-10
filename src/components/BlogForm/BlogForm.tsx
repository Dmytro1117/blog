import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { z, ZodError } from 'zod';
import { useAppDispatch, useAppSelector } from 'types/hooks';
import { addBlog } from 'types/operations';
import { InitNotify, MyNotifyOptions } from 'types/notifyInit';
import { Label, Input, ButtonSubmit } from './BlogFormStyled';

type BlogFormValues = {
  name: string;
  about: string;
  phone: string;
};

Notify.init(InitNotify as MyNotifyOptions);

export const schema = z.object({
  name: z
    .string()
    .refine(value => /^\p{Lu}[\p{L}\s.'-]+$/u.test(value), {
      message: 'Назва посту має починатися з великої літери (без цифр)',
    })
    .refine(value => value.length <= 40, 'Максимальна довжина 40 символів')
    .refine(value => value.length > 0, "Назва посту є обов'язковим полем"),
  about: z
    .string()
    .refine(
      value => value.trim().length > 0,
      "Зміст посту є обов'язковим полем",
    ),
  phone: z
    .string()
    .refine(value => /^\d{3}-\d{2}-\d{2}$/.test(value), {
      message: 'Номер має бути в форматі 555-55-55',
    })
    .refine(value => value.length > 0, "Номер є обов'язковим полем"),
});

export const BlogForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.blog);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogFormValues>({
    defaultValues: {
      name: '',
      about: '',
      phone: '',
    },
  });

  const onSubmit: SubmitHandler<BlogFormValues> = async data => {
    try {
      await schema.parseAsync(data);
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach(e => {
          Notify.warning(e.message);
        });
        return;
      }
    }

    const { name, about, phone } = data;

    if (
      items.some(
        num =>
          num.name.toLowerCase() === name.toLowerCase() || num.phone === phone,
      )
    ) {
      Notify.warning(`${name} чи ${phone} вже існує`);
      return;
    }

    dispatch(
      addBlog({
        name,
        about,
        phone,
      }),
    );

    Notify.success(`${name}, ${about}, ${phone} додано успішно`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Label htmlFor="name">
        Назва посту
        <Input placeholder="Введіть тему" type="text" {...register('name')} />
      </Label>
      {errors.name && <div>{errors.name.message}</div>}

      <Label htmlFor="about">
        Зміст посту
        <Input
          placeholder="Напишіть свої думки"
          type="text"
          {...register('about')}
        />
      </Label>
      {errors.about && <div>{errors.about.message}</div>}

      <Label htmlFor="phone">
        Телефон автора
        <Input placeholder="Введіть номер" type="tel" {...register('phone')} />
      </Label>
      {errors.phone && <div>{errors.phone.message}</div>}

      <ButtonSubmit type="submit">Додати</ButtonSubmit>
    </form>
  );
};
