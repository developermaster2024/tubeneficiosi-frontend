import ProductCard from "./ProductCard";
import ProductHorizontalCard from "./ProductHorizontalCard";
import ProductModal from "./ProductModal";
import ProductsGrid from "./ProductsGrid";
import { useState } from 'react';

const ProductsCollection = ({ products, isInGridView }) => {

  const [productOnModal, setProductOnModal] = useState(null);

  return (
    <div>
      {isInGridView
        ?
        <ProductsGrid>
          {products.map((product, i) => <div
            key={i}
            className="flex justify-center"
          >
            <ProductCard
              name={product.name}
              description={product.description}
              imgSrc={product.mainImgSrc}
              imgAlt={product.mainImgAlt}
              price={product.price}
              onBuy={() => { setProductOnModal(product) }}
            />
          </div>)}
        </ProductsGrid>
        : <div className="space-y-4">
          {products.map((product, i) => <ProductHorizontalCard
            key={i}
            store={product.store}
            name={product.name}
            description={product.description}
            imgSrc={product.mainImgSrc}
            imgAlt={product.mainImgAlt}
            price={product.price}
            onBuy={() => { setProductOnModal(product) }}
          />)}
        </div>
      }
      <ProductModal product={productOnModal} closeModal={() => { setProductOnModal(null) }} />
    </div>
  )
};

export default ProductsCollection;