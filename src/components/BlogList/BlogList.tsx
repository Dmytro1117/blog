import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'types/hooks';
import { List, BlogLink, Text } from './BlogListStyled';

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
