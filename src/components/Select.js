const Select = ({children}) => {
  return <select
    className="block w-full text-sm leading-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  >
    {children}
  </select>;
};

export default Select;