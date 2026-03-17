import { Product } from "../../../../model/product.interface";
import Form from "../../../Form/Form";
import { NonEmptyStringValidator } from "../../../Form/validators/empty-string.validator";
import { NumberStringValidator } from "../../../Form/validators/number-string.validator";

export default function ProductEditForm({
  product,
  onDirty,
  onSubmit,
  onCancel,
}: {
  product?: Product,
  onDirty: () => void,
  onSubmit: (formValues: Omit<Product, 'id'>) => void,
  onCancel: () => void
}) {
  return <>
    <h2>{product ? 'Edit' : 'Add'} product</h2>
    <Form
      fields={[
        {
          name: 'name',
          label: 'Name',
          defaultValue: product?.name || '',
          validators: [NonEmptyStringValidator]
        },
        {
          name: 'price',
          label: 'Price',
          defaultValue: `${product?.price || ''}`,
          validators: [NonEmptyStringValidator, NumberStringValidator]
        },
        {
          name: 'url',
          label: 'URL',
          defaultValue: product?.url || '',
          validators: [NonEmptyStringValidator]
        },
        {
          name: 'quantity',
          label: 'Quantity',
          defaultValue: `${product?.quantity || ''}`,
          validators: [NonEmptyStringValidator, NumberStringValidator]
        }
      ]}
      onDirty={onDirty}
      onSubmit={formValues => onSubmit({ ...formValues } as unknown as Omit<Product, 'id'>)}
      onCancel={onCancel}
    />
  </>
}