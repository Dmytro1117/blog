import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { deleteBlog, fetchBlogById } from '../../redux/operations';
import { Section } from '../../components/Section/Section';
import { Button, Text, IconDelete } from './BlogDetails.styled';
import { Loader } from '../../components/Loader/Loader';

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blogInfo, setblogInfo] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const detailBlog = await dispatch(fetchBlogById(blogId));
        setblogInfo(detailBlog.payload);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogDetails();
  }, [dispatch, blogId]);

  const handleDeleteBlog = id => {
    dispatch(deleteBlog(id));
    Notify.failure(`Пост видалено`);
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
        <Text>Опис:{blogInfo.about}</Text>
        <Text>Телефон:{blogInfo.phone}</Text>
        <Link to={{ pathname: '/home' }}>
          <IconDelete
            type="button"
            size={24}
            onClick={() => handleDeleteBlog(blogInfo.id)}
          />
        </Link>
      </Section>
    </>
  );
};

export default BlogDetails;
