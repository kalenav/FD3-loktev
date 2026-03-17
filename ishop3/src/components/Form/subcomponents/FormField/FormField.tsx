import { useEffect, useMemo, useState } from 'react';
import { TextValidator } from '../../types/text-validator.type';
import './FormField.scss';

export default function FormField({
  defaultValue = '',
  label,
  validators,
  onDirty,
  onChange
}: {
  defaultValue: string,
  label: string,
  validators: Array<TextValidator>,
  onDirty: () => void,
  onChange: (value: string, validationErrors: Array<string>) => void,
}) {
  const [value, setValue] = useState(defaultValue);
  const validationErrors = useMemo(() => {
    return validators.map(validator => validator(value)).filter(Boolean) as Array<string>;
  }, [value, validators]);
  useEffect(() => onChange(value, validationErrors), [value, validationErrors]);

  const [dirty, setDirty] = useState(false);
  useEffect(() => { dirty && onDirty() }, [dirty]);

  return (
    <div className="form-field">
      <label className="label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => {
          setDirty(true); // но почему это работает если two-way binding? разве value={value} не вызывает onChange?
          setValue(e.target.value);
        }}
      />
      {validationErrors.length > 0 && (
        <span className="error">{validationErrors.join(', ')}</span>
      )}
    </div>
  );
}