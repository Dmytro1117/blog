import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ZodError } from 'zod';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { InitNotify, MyNotifyOptions } from 'features/notifyInit';
import { fetchBlogsRequest } from 'storeRedux/blogsSlice';
import { BlogFormValues } from 'helpers/interface';
import { schema } from 'helpers/schema';
import { addBlogSuccess, addBlogRequest, fetchBlogsError } from 'storeRedux/blogsSlice';
import { Label, Input, ButtonSubmit } from './BlogFormStyled';

Notify.init(InitNotify as MyNotifyOptions);

export const BlogForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.blog);

  useEffect(() => {
    dispatch(fetchBlogsRequest());
  }, [dispatch]);

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
    dispatch(addBlogRequest());
    try {
      await schema.parseAsync(data);
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach(e => {
          Notify.warning(e.message);
        });
        dispatch(fetchBlogsError('Не пройдена валідація'));
        return;
      }
    }

    const { name, about, phone } = data;

    if (
      items.some(
        num => num.name.toLowerCase() === name.toLowerCase() || num.phone === phone,
      )
    ) {
      Notify.warning(`${name} чи ${phone} вже існує`);
      dispatch(fetchBlogsError(`${name} чи ${phone} вже існує`));
      return;
    }

    dispatch(
      addBlogSuccess({
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
        <Input placeholder="Напишіть свої думки" type="text" {...register('about')} />
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
