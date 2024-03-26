import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'hooks/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { List, BlogLink, Text } from './BlogListStyled';
import { Container } from './BlogListStyled';
import { Img } from 'pages/StarttngPage/StartingPageStyled';
import notFound from 'images/guest-blogging.jpg';

export const BlogList: React.FC = () => {
  const { items } = useAppSelector(state => state.blog);
  const location = useLocation();

  const variants = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0 },
  };

  return items.length === 0 ? (
    <>
      <p>Постів ще не створено</p>
      <Img src={notFound} alt="notFound" />
    </>
  ) : (
    <AnimatePresence mode="wait">
      <List>
        {items.map(({ id, name }) => (
          <motion.div
            initial="hidden"
            key={name}
            animate="visible"
            variants={variants}
            transition={{ duration: 1.2 }}
          >
            <BlogLink to={`/list/details/${id}`} state={{ from: location }} key={id}>
              <Container>
                <Text>{name}</Text>
              </Container>
            </BlogLink>
          </motion.div>
        ))}
      </List>
    </AnimatePresence>
  );
};
