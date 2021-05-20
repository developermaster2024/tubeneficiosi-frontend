const LeftSidebarLayout = ({children, leftSide}) => {
  return <div className="flex space-x-6">
    {leftSide && <div className="w-60 space-y-6">{leftSide}</div>}
    <div className="flex-grow">{children}</div>
  </div>;
};

export default LeftSidebarLayout;