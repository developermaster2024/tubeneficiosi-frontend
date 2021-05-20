import ProductCard from "./ProductCard";
import ProductHorizontalCard from "./ProductHorizontalCard";
import ProductsGrid from "./ProductsGrid";

const ProductsCollection = ({products, isInGridView}) => {
  return isInGridView
    ? <ProductsGrid>
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
        />
      </div>)}
    </ProductsGrid>
    : <div className="space-y-4">
      {products.map((product, i) => <ProductHorizontalCard
        key={i}
        name={product.name}
        description={product.description}
        imgSrc={product.mainImgSrc}
        imgAlt={product.mainImgAlt}
        price={product.price}
      />)}
    </div>;
};

export default ProductsCollection;