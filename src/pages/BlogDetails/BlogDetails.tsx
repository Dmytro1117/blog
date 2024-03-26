import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Blog, BlogFormValues } from 'helpers/interface';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { Section } from 'components/Section/Section';
import { EditPost } from 'components/EditPost/EditPost';
import { Loader } from 'components/Loader/Loader';
import { InitNotify, MyNotifyOptions } from 'features/notifyInit';
import { fetchBlogByIdRequest, deleteBlogRequest } from 'storeRedux/blogsSlice';
import { Button, Text, IconDelete, IconEdit } from './BlogDetailsStyled';

Notify.init(InitNotify as MyNotifyOptions);

const BlogDetails: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blogInfo, setBlogInfo] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { reset } = useForm<BlogFormValues>();
  const blogItems = useAppSelector(state => state.blog.items);

  useEffect(() => {
    dispatch(fetchBlogByIdRequest(blogId));
  }, [dispatch]);

  useEffect(() => {
    const selectedBlog = blogItems.find(blog => blog.id === blogId);

    if (selectedBlog) {
      setBlogInfo(selectedBlog);
      setLoading(false);
      reset({
        name: selectedBlog.name,
        about: selectedBlog.about,
        phone: selectedBlog.phone,
      });
    }
  }, [blogItems, reset]);

  useEffect(() => {
    const isBlogDeleted = !blogItems.some(blog => blog.id === blogId);

    if (isBlogDeleted) {
      Notify.success(`Пост видалено`);
      navigate('/list');
    }
  }, [blogItems]);

  if (loading) {
    return <Loader />;
  }

  if (!blogInfo) {
    return <div>Дані про блог не знайдено</div>;
  }

  const handleDeleteBlog = (id: string) => {
    dispatch(deleteBlogRequest(id));
  };

  return (
    <>
      <Button type="button" onClick={() => navigate('/list')}>
        Повернутися
      </Button>

      <Section title={blogInfo.name}>
        {editMode ? (
          <EditPost
            blogInfo={blogInfo}
            setEditMode={setEditMode}
            setBlogInfo={setBlogInfo}
          />
        ) : (
          <>
            <Text>Опис: {blogInfo.about}</Text>
            <Text>Телефон: {blogInfo.phone}</Text>
            <IconEdit type="button" size={24} onClick={() => setEditMode(true)} />
            <IconDelete
              type="button"
              size={24}
              onClick={() => handleDeleteBlog(blogInfo.id)}
            />
          </>
        )}
      </Section>
    </>
  );
};

export default BlogDetails;
