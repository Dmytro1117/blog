import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ZodError } from 'zod';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Loader } from 'components/Loader/Loader';
import { Blog } from 'types/blogsSlice';
import { useAppDispatch } from 'types/hooks';
import {
  deleteBlog,
  fetchBlogById,
  fetchBlogs,
  updateBlog,
} from 'types/operations';
import { initialValues, schema } from 'components/BlogForm/BlogForm';
import { Section } from 'components/Section/Section';
import { ButtonSubmit, Input, Label } from 'components/BlogForm/BlogFormStyled';
import { Button, Text, IconDelete, IconEdit } from './BlogDetailsStyled';

const BlogDetails: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blogInfo, setBlogInfo] = useState<Blog | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (blogId) {
      dispatch(fetchBlogById(blogId))
        .then(detailBlog => {
          if (detailBlog.payload && typeof detailBlog.payload === 'object') {
            setBlogInfo(detailBlog.payload);
          } else {
            console.log('Invalid payload received:', detailBlog.payload);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [dispatch, blogId]);

  const refreshPosts = () => {
    dispatch(fetchBlogs());
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
          Notify.failure('Помилка при оновленні поста');
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
        })
        .finally(() => {
          setDeleteButtonDisabled(false);
        });
    }
  };

  const handleSave = async () => {
    try {
      await schema.parseAsync(blogInfo as Blog);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = Object.values(error.errors)
          .map(e => e.message)
          .join('\n');
        return Notify.warning(errorMessage);
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
        Notify.failure('Помилка при оновленні поста');
      });
  };

  if (!blogInfo) {
    return <Loader />;
  }

  return (
    <>
      <Link to={{ pathname: '/home' }}>
        <Button type="button">Повернутися</Button>
      </Link>

      <Section title={blogInfo.name} key={blogInfo.id}>
        {editMode ? (
          <>
            <Formik initialValues={initialValues} onSubmit={handleSave}>
              <Form autoComplete="off">
                <Label>
                  Назва:
                  <Field
                    type="text"
                    as={Input}
                    name="name"
                    value={blogInfo.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBlogInfo({ ...blogInfo, name: e.target.value })
                    }
                  />
                  <ErrorMessage name="name" component="div" />
                </Label>
                <Label>
                  Опис:
                  <Field
                    type="text"
                    as={Input}
                    name="about"
                    value={blogInfo.about}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBlogInfo({ ...blogInfo, about: e.target.value })
                    }
                  />
                  <ErrorMessage name="about" component="div" />
                </Label>
                <Label>
                  Телефон:
                  <Field
                    type="text"
                    as={Input}
                    name="phone"
                    value={blogInfo.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBlogInfo({ ...blogInfo, phone: e.target.value })
                    }
                  />
                  <ErrorMessage name="phone" component="div" />
                </Label>
                <ButtonSubmit type="submit">Зберегти</ButtonSubmit>
              </Form>
            </Formik>
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
              <Link to={{ pathname: '/home' }}>
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
