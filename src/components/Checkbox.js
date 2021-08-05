const Checkbox = ({id, name, label, checked, value, onChange}) => {
  const finalId = id ?? Math.random().toString(36).substring(7);
  
  return <label
    htmlFor={finalId}
    className="inline-flex items-center space-x-2 cursor-pointer"
  >
    <input
      id={finalId}
      name={name}
      type="checkbox"
      value={value}
      checked={checked}
      onChange={onChange}
      className="rounded border-gray-300 text-main shadow-sm focus:border-main-light focus:ring focus:ring-offset-0 focus:ring-main-light focus:ring-opacity-50 cursor-pointer"
    />
    {label && <span>{label}</span>}
  </label>;
};

export default Checkbox;