import { memo } from 'react';
import './SymbolCard.scss';

export const SymbolCard = memo(({
  name,
  price,
  isSelected,
  isLeaving,
  isEntering,
  onSelect,
  onDelete,
}: {
  name: string;
  price: number | null;
  isEntering: boolean,
  isSelected: boolean,
  isLeaving: boolean,
  onSelect: () => void,
  onDelete: () => void,
}) => {
  return (
    <div
      className={
        'symbol-card'
        + (isSelected ? ' selected' : '')
        + (isLeaving ? ' leaving' : '')
        + (isEntering ? ' entering' : '')
      }
      onClick={() => !isLeaving && onSelect()}
    >
      <div className="card-body">
        <div className="card-header">
          <span className="symbol-name">{name}</span>
          <button
            className="btn-delete"
            onClick={() => onDelete()}
          >×</button>
        </div>
        <div className="card-details">
          {price !== null && (
            <span className="last-price">{price.toFixed(4)}</span>
          )}
        </div>
      </div>
    </div>
  );
});