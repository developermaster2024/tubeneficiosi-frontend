import clsx from "clsx";

const DiscountCard = ({ title, subtitle, color }) => {
  return <div
    className={clsx([
      'z-auto relative h-24 w-72 flex flex-col items-center justify-center bg-gradient-to-r text-white',
      {
        'from-blue-600 to-blue-400': color === 'blue',
        'from-red-600 to-red-400': color === 'red',
        'from-pink-600 to-pink-400': color === 'pink',
        'from-yellow-600 to-yellow-400': color === 'yellow',
        'from-green-600 to-green-400': color === 'green',
        'from-indigo-600 to-indigo-400': color === 'indigo',
      },
    ])}
  >
    <span className="absolute w-10 h-10 rounded-full left-0 transform -translate-x-5 bg-gray-50"></span>
    <p className="text-5xl font-semibold">{title}</p>
    <p className="text-lg">{subtitle}</p>
    <span className="absolute w-10 h-10 rounded-full right-0 transform translate-x-5 bg-gray-50"></span>
  </div>;
};

export default DiscountCard;