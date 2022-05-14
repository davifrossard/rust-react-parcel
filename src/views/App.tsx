import React, { useEffect, useState } from 'react';
import { Coverer, get_random } from '@rustlib';

const getsum = () => {
  const arr = Array.from({ length: 10000 * 10000 }, () => Math.random() * 100);
  return arr.reduce((a, b) => a + b, 0);
};
export default function App(): React.ReactElement {
  const [ans, setAns] = useState<Array<string>>([]);
  const [randNum, setRandNum] = useState<number | null>(null);
  const [randNumJs, setRandNumJs] = useState<number | null>(null);
  const [coverer, setCoverer] = useState<Coverer | null>(null);

  useEffect(() => {
    setCoverer(new Coverer(16, 100));
  }, []);

  useEffect(() => {
    if (!coverer) return;
    setAns(
      coverer.get_covering(
        40.703402470455444,
        -74.01386369728586,
        40.704576403299384,
        -74.01134929734303
      )
    );
  }, [coverer]);

  return (
    <div className="flex justify-center bg-zinc-400 dark:bg-black h-screen p-8 prose-h1:text-center">
      <article className="prose lg:prose-xl prose-stone dark:prose-invert">
        <h1>S2</h1>
        <p>
          The cells between <span className="font-mono">(40.7034N, 74.0140W)</span> and{' '}
          <span className="font-mono">(40.7046N, 74.01135W)</span> are:
        </p>
        <p className="text-center">{ans.join(', ')}</p>
        <h1>Rust</h1>
        The sum of all elements in a <span className="font-mono">10000 x 10000</span> matrix of{' '}
        <span className="font-mono">U(0, 100)</span> is:
        <p className="text-center">{randNum || '?'}</p>
        <p className="text-center">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => setRandNum(get_random(10000, 10000, 0, 100))}
          >
            Compute
          </button>
        </p>
        <h1>Javascript</h1>
        The sum of all elements in a <span className="font-mono">10000 x 10000</span> matrix of{' '}
        <span className="font-mono">U(0, 100)</span> is:
        <p className="text-center">{randNumJs || '?'}</p>
        <p className="text-center">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => setRandNumJs(getsum())}
          >
            Compute
          </button>
        </p>
      </article>
    </div>
  );
}
