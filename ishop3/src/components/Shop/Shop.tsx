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
        // не уверен, что это юзкейс key. руководствовался тем, что если выбрать другой продукт, пока открыта форма,
        // то formActive не поменяется, весь этот кусок не перерисуется, и форма останется старой. поэтому заставляю его
        // по-любому перерисовываться, если выбран другой продукт
        <ProductEditForm
          key={selectedProduct?.id ?? 0}
          product={selectedProduct || undefined}
            onDirty={() => setFormDirty(true)}
          onSubmit={formValues => concludeProductEdit(formValues as ProductType, selectedProduct?.id)}
            onCancel={() => { setFormActive(false); setFormDirty(false); }}
          />
      )}
      {!!selectedProduct && !formActive && (
        <Card name={selectedProduct.name} price={selectedProduct.price} />
      )}
    </div>
  )
}