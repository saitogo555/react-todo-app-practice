import { Link } from 'react-router-dom';
import { Layout, Card } from '../components/layout/Layout';

export const NotFoundPage = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <i className="fas fa-exclamation-triangle text-6xl text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              404
            </h1>
            <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">
              ページが見つかりません
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              お探しのページは存在しないか、移動された可能性があります。
            </p>
            <div className="pt-4">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-home mr-2" />
                ホームに戻る
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
