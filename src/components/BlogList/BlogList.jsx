import { useSelector } from 'react-redux';
import { getBlogs } from '../../redux/selectors';
import { List, BlogLink, Text } from './BlogList.styled';
import { useLocation } from 'react-router-dom';

export const BlogList = () => {
  const blogs = useSelector(getBlogs);
  const location = useLocation();

  return blogs.length === 0 ? (
    <p>Постів ще не створено</p>
  ) : (
    <List>
      {blogs.map(({ id, name }) => {
        return (
          <BlogLink to={`/details/${id}`} key={id} state={{ from: location }}>
            <Text> {name}</Text>
          </BlogLink>
        );
      })}
    </List>
  );
};
