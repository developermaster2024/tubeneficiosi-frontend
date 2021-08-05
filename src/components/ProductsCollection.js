import ProductCard from "./ProductCard";
import ProductHorizontalCard from "./ProductHorizontalCard";
import ProductModal from "./ProductModal";
import ProductsGrid from "./ProductsGrid";
import { useState } from 'react';
import { generateImageUrl } from "../helpers/url";

const ProductsCollection = ({ products, isInGridView, isStore }) => {

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
              slug={product.slug}
              description={product.shortDescription || 'Sin descripción'}
              quantity={product.quantity}
              imgSrc={generateImageUrl(product.productImages?.[0]?.path)}
              imgAlt={product.name}
              price={product.price}
              onBuy={() => { setProductOnModal(product) }}
              buttonText={isStore ? "Añadir al carrito" : "Comprar"}
            />
          </div>)}
        </ProductsGrid>
        : <div className="space-y-4">
          {products.map((product, i) => <ProductHorizontalCard
            key={i}
            name={product.name}
            slug={product.slug}
            description={product.shortDescription}
            quantity={product.quantity}
            imgSrc={generateImageUrl(product.productImages?.[0]?.path)}
            imgAlt={product.name}
            price={product.price}
            onBuy={() => { setProductOnModal(product) }}
            storeName={product.store.name}
            storeImageSrc={generateImageUrl(product.store?.storeProfile?.logo)}
            storeImageAlt={product.store.name}
            storeSlug={product?.store?.slug}
            deliveryMethodTypes={product.deliveryMethodTypes.map(item => item.name)}

          />)}
        </div>
      }
      <ProductModal product={productOnModal} closeModal={() => { setProductOnModal(null) }} />
    </div>
  )
};

export default ProductsCollection;