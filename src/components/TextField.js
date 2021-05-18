import clsx from "clsx";

const TextField = ({
  id,
  type = 'text',
  className,
  inputClassName,
  placeHolder,
}) => {
  const finalId = id ?? Math.random().toString(36).substring(7);
  
  return <div className={clsx('flex items-center', className)}>
    <label htmlFor={finalId}></label>
    <input
      type={type}
      id={finalId}
      className={clsx([
        `block w-full
        leading-4 text-sm
        border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
        rounded-md shadow-sm`,
        inputClassName,
      ])}
      placeholder={placeHolder}
    />
  </div>;
};

export default TextField;