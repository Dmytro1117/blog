import React from 'react';
import { List, BlogLink, Text } from './BlogListStyled';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

export const BlogList: React.FC = () => {
  const { items } = useAppSelector(state => state.blog);
  const location = useLocation();

  return items.length === 0 ? (
    <p>Постів ще не створено</p>
  ) : (
    <List>
      {items.map(({ id, name }) => (
        <BlogLink to={`/details/${id}`} key={id} state={{ from: location }}>
          <Text>{name}</Text>
        </BlogLink>
      ))}
    </List>
  );
};
