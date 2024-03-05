import { Triangle } from 'react-loader-spinner';
import { ContainerLoader } from './LoaderStyled';

export const Loader: React.FC = () => {
  return (
    <ContainerLoader>
      <Triangle
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        color="skyblue"
      />
    </ContainerLoader>
  );
};
