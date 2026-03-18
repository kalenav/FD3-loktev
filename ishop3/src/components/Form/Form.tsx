import { useCallback, useEffect, useMemo, useState } from 'react';
import './Form.scss';
import FormField from './subcomponents/FormField/FormField';
import { FormTextField } from './types/form-text-field.interface';

export default function Form({
  fields,
  onDirty,
  onSubmit,
  onCancel,
}: {
  fields: Array<FormTextField>,
  onDirty: () => void,
  onSubmit: (data: Record<string, string>) => void,
  onCancel: () => void,
}) {
  const [state, setState] = useState<Record<string, { value: string, validationErrors: Array<string> }>>(
    Object.fromEntries(
      fields.map(field => [field.name, { value: field.defaultValue, validationErrors: [] }])
    )
  );
  const stateAsArray = useMemo(() => Object.entries(state)
    .map(([name, { value, validationErrors }]) => ({
      name,
      value,
      validationErrors
    })), [state]);

  const valid = useMemo(() => stateAsArray.every(({ validationErrors }) => validationErrors.length === 0), [stateAsArray]);

  const [dirty, setDirty] = useState(false);
  useEffect(() => { dirty && onDirty() }, [dirty]);

  const submit = useCallback(() => {
    const data = Object.fromEntries(stateAsArray.map(({ name, value }) => [name, value]));
    onSubmit(data);
  }, [stateAsArray, onSubmit]);

  return (
    <form className="form">
      {fields.map(field => (
        <FormField
          key={field.name}
          defaultValue={field.defaultValue}
          label={field.label}
          validators={field.validators}
          onDirty={() => setDirty(true)}
          onChange={(value: string, validationErrors: Array<string>) => {
            setState(prevState => ({
              ...prevState,
              [field.name]: { value, validationErrors },
            }));
          }}
        />
      ))}
      <div className="buttons">
        <button
          type="button"
          className="submit-button"
          disabled={!valid}
          onClick={submit}
        >Submit</button>
        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
        >Cancel</button>
      </div>
    </form>
  );
}