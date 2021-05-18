const Checkbox = ({id, label}) => {
  const finalId = id ?? Math.random().toString(36).substring(7);
  
  return <label
    htmlFor={finalId}
    className="inline-flex items-center space-x-2 cursor-pointer"
  >
    <input
      id={finalId}
      type="checkbox"
      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50 cursor-pointer"
    />
    {label && <span>{label}</span>}
  </label>;
};

export default Checkbox;