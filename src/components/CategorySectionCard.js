const CategorySectionCard = ({text, imgSrc}) => {
  return <div
    className="w-full relative rounded-md overflow-hidden bg-full shadow-md"
    style={{backgroundImage: `url(${imgSrc})`, backgroundSize: '100% 100%'}}
  >
    <div className="absolute inset-0 bg-black opacity-30" />
    <div className="flex justify-center items-center absolute inset-0 text-white text-5xl font-semibold">
      {text}
    </div>
  </div>;
};

export default CategorySectionCard;