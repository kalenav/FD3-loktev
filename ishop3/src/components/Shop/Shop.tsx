import React, { useCallback, useState } from "react";
import { Product as ProductType } from "../../model/product.interface";
import Card from "../Card/Card";
import Form from "../Form/Form";
import { NonEmptyStringValidator } from "../Form/validators/empty-string.validator";
import { NumberStringValidator } from "../Form/validators/number-string.validator";
import './Shop.scss';
import ProductList from "./subcomponents/ProductList/ProductList";

export default function Shop({ products }: { products: Array<ProductType> }) {
  const [productList, setProductList] = useState(products.slice());
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [formActive, setFormActive] = useState(false);
  const [formDirty, setFormDirty] = useState(false);

  const selectProduct = useCallback((product: ProductType) => {
    if (formActive && formDirty) {
      return;
    }
    setSelectedProduct(product);
    setFormActive(false);
  }, [formActive, formDirty]);

  const startProductEdit = useCallback((product: ProductType) => {
    selectProduct(product);
    setFormActive(true);
    setFormDirty(false);
  }, [selectProduct]);
  const concludeProductEdit = useCallback((editedProduct: ProductType) => {
    setFormActive(false);
    console.log(editedProduct);
  }, []);

  const deleteProduct = useCallback((id: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Are you sure?')) {
      return;
    }
    const newProductList = productList.slice();
    newProductList.splice(newProductList.findIndex(p => p.id === id), 1);
    setProductList(newProductList);
  }, [productList]);

  return (
    <div className="shop">
      <ProductList
        products={productList}
        onSelect={selectProduct}
        onEdit={startProductEdit}
        onDelete={deleteProduct}
        buttonsDisabled={formActive && formDirty}
        forcedSelectedProductId={(formActive && formDirty) ? selectedProduct?.id : undefined}
      />
      {formActive && (
        <React.Fragment key={selectedProduct?.id ?? 0}>
          <h2>Edit product</h2>
          <Form
            fields={[
              {
                name: 'name',
                label: 'Name',
                defaultValue: selectedProduct?.name || '',
                validators: [NonEmptyStringValidator]
              },
              {
                name: 'price',
                label: 'Price',
                defaultValue: `${selectedProduct?.price || ''}`,
                validators: [NonEmptyStringValidator, NumberStringValidator]
              },
              {
                name: 'url',
                label: 'URL',
                defaultValue: selectedProduct?.url || '',
                validators: [NonEmptyStringValidator]
              },
              {
                name: 'quantity',
                label: 'Quantity',
                defaultValue: `${selectedProduct?.quantity || ''}`,
                validators: [NonEmptyStringValidator, NumberStringValidator]
              }
            ]}
            onDirty={() => setFormDirty(true)}
            onSubmit={formValues => concludeProductEdit({
              id: selectedProduct!.id,
              ...formValues
            } as ProductType)}
            onCancel={() => { setFormActive(false); setFormDirty(false); }}
          />
        </React.Fragment>
      )}
      {!!selectedProduct && !formActive && (
        <Card name={selectedProduct.name} price={selectedProduct.price} />
      )}
    </div>
  )
}