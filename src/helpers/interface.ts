import { ReactNode } from 'react';

export type Blog = {
  id: string;
  name: string;
  about: string;
  phone: string;
};

export type BlogsState = {
  items: Blog[];
  isLoading: boolean;
  error: string | null;
};

export type AddBlogArguments = Omit<Blog, 'id'>;

export type BlogFormValues = {
  name: string;
  about: string;
  phone: string;
};

export type SectionProps = {
  title?: string;
  children: ReactNode;
};

export type EditPostProps = {
  blogInfo: Blog;
  setEditMode: Function;
  setBlogInfo: Function;
};
