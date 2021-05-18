import StarIcon from "./StarIcon";

const StoreCard = ({imgSrc, imgAlt, name, description, rating}) => {
  const finalImgAlt = imgAlt ?? name;
  
  return <div className="p-4 bg-white max-w-[240px] shadow rounded">
    <img
      src={imgSrc}
      alt={finalImgAlt}
      className="h-36 w-full mt-4 object-contain"
    />

    <div className="space-y-2">
      <h4 className="font-semibold">{name}</h4>
      <p className="text-xs text-gray-800 opacity-75">{description}</p>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(n => <StarIcon
          key={n}
          className="w-4 h-4 text-yellow-400"
        />)}
      </div>
    </div>
  </div>;
};

export default StoreCard;