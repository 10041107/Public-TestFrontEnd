import { useState } from 'react';
import { useRouter } from 'next/router';
import { submitQuizAnswers } from '../services/api';

interface FormData {
    sex: string;
    age: string;
    shortAnswers: string[];
    choiceAnswers: number[];
    uid: number;
}

const TestPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        sex: '',
        age: '',
        shortAnswers: ['', '', '', '', ''],
        choiceAnswers: Array(20).fill(0),
        uid: 1, // 임시로 uid 값을 설정합니다. 실제 유저 id로 대체해야 합니다.
    });

    const [result, setResult] = useState(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleChoiceChange = (index: number, value: string) => {
        setFormData((prev) => {
            const newChoices = [...prev.choiceAnswers];
            newChoices[index] = Number(value);
            return { ...prev, choiceAnswers: newChoices };
        });
    };

    const handleShortAnswerChange = (index: number, value: string) => {
        setFormData((prev) => {
            const newShortAnswers = [...prev.shortAnswers];
            newShortAnswers[index] = value;
            return { ...prev, shortAnswers: newShortAnswers };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await submitQuizAnswers(formData);
            setResult(response);
            router.push({
                pathname: '/result',
                query: { data: JSON.stringify(response) },
            });
        } catch (error) {
            console.error('Error submitting test:', error);
        }
    };

    return (
        <div>
            <h1>Test Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Sex:
                    <select name="sex" value={formData.sex} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>
                <br />
                <label>
                    Age:
                    <input type="number" name="age" value={formData.age} onChange={handleChange} />
                </label>
                <br />
                {formData.choiceAnswers.map((choice, index) => (
                    <div key={index}>
                        <label>
                            Choice {index + 1}:
                            <input
                                type="number"
                                value={choice}
                                onChange={(e) => handleChoiceChange(index, e.target.value)}
                            />
                        </label>
                    </div>
                ))}
                <br />
                {formData.shortAnswers.map((answer, index) => (
                    <div key={index}>
                        <label>
                            Short Answer {index + 1}:
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => handleShortAnswerChange(index, e.target.value)}
                            />
                        </label>
                    </div>
                ))}
                <br />
                <button type="submit">Submit</button>
            </form>
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
};

export default TestPage;
