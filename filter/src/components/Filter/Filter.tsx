import { useState } from 'react';
import './Filter.scss';

export default function Filter({ words }: { words: string[] }) {
  const [sorted, setSorted] = useState(false);
  const [freetext, setFreetext] = useState('');

  return (
    <div className="filter">
      <input type="checkbox" className="sort-checkbox" checked={sorted} onChange={e => setSorted(e.target.checked)} />
      <input type="text" className="freetext-input" value={freetext} onChange={e => setFreetext(e.target.value)} />
      <button type="button" className="reset-button" onClick={() => { setSorted(false); setFreetext(''); }}>сброс</button>
      <div className="words">
        {words
          .filter(word => word.includes(freetext))
          .sort((a, b) => sorted ? a.localeCompare(b) : 0)
          .map(word => (
            <div key={word} className="word">
              {word}
            </div>
          ))}
      </div>
    </div>
  );
}