const CategorySectionCard = ({text, imgSrc}) => {
  return <div className="group w-full relative rounded-md overflow-hidden bg-full shadow-md">
    <div className="absolute inset-0">
      <img
        src={imgSrc}
        alt={text}
        className="h-full w-full transform transition group-hover:scale-125"
      />
    </div>
    <div className="absolute inset-0 bg-black opacity-30" />
    <div className="flex justify-center items-center absolute inset-0 text-white text-5xl font-semibold">
      {text}
    </div>
  </div>;
};

export default CategorySectionCard;