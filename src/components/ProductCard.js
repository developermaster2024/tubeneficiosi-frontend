import Button from "./Button"

const ProductCard = ({
  name,
  description,
  rating,
  price,
  imgSrc,
  imgAlt,
}) => {
  return <div className="p-4 max-w-[250px] space-y-4 w-full rounded-md bg-white shadow hover:shadow-lg">
    <img
      src={imgSrc}
      alt={imgAlt}
      className="w-full h-36 rounded-md"
    />

    <div className="space-y-2">
      <p className="font-semibold">{name}</p>

      <p className="opacity-75 text-xs text-gray-800">{description}</p>

      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(n => <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill={n === 5 ? 'none' : 'currentColor'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          key={n}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>)}
      </div>
    </div>

    <div className="flex items-center justify-between space-x-1">
      <div>
        <p className="font-semibold">{price} USD</p>
        <span className="text-xs text-gray-600">40.59</span>
      </div>
      <Button color="main">Comprar ahora</Button>
    </div>
  </div>
};

export default ProductCard;