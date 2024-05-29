import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ResultPage: React.FC = () => {
    const router = useRouter();
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (router.query.data) {
            setResult(JSON.parse(router.query.data as string));
        }
    }, [router.query.data]);

    return (
        <div>
            <h1>Result Page</h1>
            {result && (
                <pre>{JSON.stringify(result, null, 2)}</pre>
            )}
        </div>
    );
};

export default ResultPage;
