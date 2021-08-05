const ProductFeatureCheckbox = ({
  id,
  name,
  price,
  value,
  isSelectable,
}) => {
  return <div className="flex">
    <input
      className="text-main ring-main border-main focus:ring-main"
      type="checkbox"
      name=""
      id={`${name}-${id}`}
      readOnly={!isSelectable}
    />
    <label htmlFor={`${name}-${id}`} className="flex ml-4 space-x-3">
      <span className="block">{name} ({value})</span>
      <span className="block">{price}</span>
    </label>
  </div>;
};

export default ProductFeatureCheckbox;