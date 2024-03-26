import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ZodError } from 'zod';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { schema } from 'helpers/schema';
import { updatePostRequest, updatePostError } from 'storeRedux/blogsSlice';
import { Blog, BlogFormValues, EditPostProps } from 'helpers/interface';
import { useAppDispatch } from 'hooks/hooks';
import { ButtonSubmit, Input, Label } from 'components/BlogForm/BlogFormStyled';

export const EditPost: React.FC<EditPostProps> = ({
  blogInfo,
  setEditMode,
  setBlogInfo,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormValues>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<BlogFormValues> = async data => {
    try {
      await schema.parseAsync(data);
      dispatch(updatePostRequest(blogInfo));
      Notify.success('Пост оновлено');
      setEditMode(false);
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach(e => {
          Notify.warning(e.message);
        });
        Notify.failure('Не оновлено');
        dispatch(updatePostError('Не пройдена валідація'));
        return;
      }
    }
  };

  const updateField = (fieldName: keyof Blog) => (value: string) => {
    setBlogInfo((prevState: Blog) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Label htmlFor="name">
        Назва:
        <Input
          type="text"
          {...register('name')}
          value={blogInfo.name}
          onChange={e => updateField('name')(e.target.value)}
        />
        {errors.name && <div>{errors.name.message}</div>}
      </Label>
      <Label htmlFor="about">
        Опис:
        <Input
          type="text"
          {...register('about')}
          value={blogInfo.about}
          onChange={e => updateField('about')(e.target.value)}
        />
        {errors.about && <div>{errors.about.message}</div>}
      </Label>
      <Label htmlFor="phone">
        Телефон:
        <Input
          type="text"
          {...register('phone')}
          value={blogInfo.phone}
          onChange={e => updateField('phone')(e.target.value)}
        />
        {errors.phone && <div>{errors.phone.message}</div>}
      </Label>
      <ButtonSubmit type="submit">Зберегти</ButtonSubmit>
    </form>
  );
};
