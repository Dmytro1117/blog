import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useParams, Link } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ZodError } from 'zod';
import { Loader } from 'components/Loader/Loader';
import { Blog } from 'types/blogsSlice';
import { useAppDispatch } from 'types/hooks';
import {
  deleteBlog,
  fetchBlogById,
  fetchBlogs,
  updateBlog,
} from 'types/operations';
import { schema } from 'components/BlogForm/BlogForm';
import { Section } from 'components/Section/Section';
import { ButtonSubmit, Input, Label } from 'components/BlogForm/BlogFormStyled';
import { Button, Text, IconDelete, IconEdit } from './BlogDetailsStyled';

type BlogFormValues = {
  name: string;
  about: string;
  phone: string;
};

const BlogDetails: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blogInfo, setBlogInfo] = useState<Blog | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogFormValues>();

  useEffect(() => {
    if (blogId) {
      dispatch(fetchBlogById(blogId))
        .then(detailBlog => {
          if (detailBlog.payload && typeof detailBlog.payload === 'object') {
            setBlogInfo(detailBlog.payload);

            reset({
              name: detailBlog.payload.name,
              about: detailBlog.payload.about,
              phone: detailBlog.payload.phone,
            });
          } else {
            console.log('Invalid payload received:', detailBlog.payload);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [dispatch, blogId, reset]);

  const refreshPosts = () => {
    dispatch(fetchBlogs());
  };

  const updateField = (fieldName: keyof Blog) => (value: string) => {
    setBlogInfo(prevState => ({
      ...prevState!,
      [fieldName]: value || '',
    }));
  };

  const handleDeleteBlog = async (id: string) => {
    setDeleteButtonDisabled(true);

    if (editMode) {
      try {
        await schema.parseAsync(blogInfo as Blog);
      } catch (error) {
        if (error instanceof ZodError) {
          const errorMessage = Object.values(error.errors)
            .map(e => e.message)
            .join('\n');
          Notify.warning(errorMessage);
          setDeleteButtonDisabled(false);
          return;
        }
      }

      dispatch(updateBlog(blogInfo as Blog))
        .then(() => {
          Notify.success('Пост оновлено');
          setEditMode(false);
        })
        .catch(error => {
          console.log(error);
          Notify.failure('Помилка при оновленні посту');
        })
        .finally(() => {
          setDeleteButtonDisabled(false);
        });
    } else {
      dispatch(deleteBlog(id))
        .then(() => {
          refreshPosts();
          Notify.failure(`Пост видалено`);
        })
        .catch(error => {
          console.log(error);
          Notify.failure('Помилка при видаленні посту');
        })
        .finally(() => {
          setDeleteButtonDisabled(false);
        });
    }
  };

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

    dispatch(updateBlog(blogInfo as Blog))
      .then(() => {
        Notify.success('Пост оновлено');
        setEditMode(false);
        refreshPosts();
      })
      .catch(error => {
        console.log(error);
        Notify.failure('Помилка при оновленні посту');
      });
  };

  if (!blogInfo) {
    return <Loader />;
  }

  return (
    <>
      <Link to={{ pathname: '/list' }}>
        <Button type="button">Повернутися</Button>
      </Link>

      <Section title={blogInfo.name} key={blogInfo.id}>
        {editMode ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <Label>
                Назва:
                <Input
                  type="text"
                  {...register('name')}
                  value={blogInfo.name}
                  onChange={e => updateField('name')(e.target.value)}
                />
                {errors.name && <div>{errors.name.message}</div>}
              </Label>
              <Label>
                Опис:
                <Input
                  type="text"
                  {...register('about')}
                  value={blogInfo.about}
                  onChange={e => updateField('about')(e.target.value)}
                />
                {errors.about && <div>{errors.about.message}</div>}
              </Label>
              <Label>
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
          </>
        ) : (
          <>
            <Text>Опис: {blogInfo.about}</Text>
            <Text>Телефон: {blogInfo.phone}</Text>
            <IconEdit
              type="button"
              size={24}
              onClick={() => setEditMode(true)}
            />
            {!editMode && (
              <Link to={{ pathname: '/list' }}>
                {!deleteButtonDisabled ? (
                  <IconDelete
                    type="button"
                    size={24}
                    onClick={() => handleDeleteBlog(blogInfo.id)}
                  />
                ) : null}
              </Link>
            )}
          </>
        )}
      </Section>
    </>
  );
};

export default BlogDetails;
