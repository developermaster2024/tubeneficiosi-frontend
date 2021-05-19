const TabsContainer = ({children}) => {
  const finalChildren = Array.isArray(children) ? children : [children];
  
  return <div className="flex">{finalChildren}</div>;
}

export default TabsContainer;