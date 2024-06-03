import Head from 'next/head';
import { MAIN_TITLE } from '../../utils/quizindex';

interface Props {
  title?: string;
  description?: string;
}

const MetaData: React.FC<Props> = ({ title, description }) => {
  return (
    <Head>
      <title>{title ? `${title} - ${MAIN_TITLE}` : MAIN_TITLE}</title>
      <meta name="description" content={description || ''} />
      <meta property="og:title" content={title ? `${title} - ${MAIN_TITLE}` : MAIN_TITLE} />
      {/* 필요한 다른 메타데이터 추가 */}
    </Head>
  );
};

export default MetaData;
