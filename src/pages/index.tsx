import { type GetServerSideProps, type NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index: NextPage = () => {
  return (
    <div>
      <h1>Index</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'de', ['common', 'customer'])),
    },
  };
};

export default Index;
