import ChevronDoubleRightIcon from "./ChevronDoubleRightIcon";
import ChevronDoubleLeftIcon from "./ChevronDoubleLeftIcon";
import clsx from "clsx";

const PaginationButton = ({children, active}) => {
  return <a
    href="/#"
    className={clsx([
      `inline-flex items-center justify-center
      w-6 h-6
      text-xs font-semibold hover:bg-main hover:text-white
      border border-main
      rounded-full`,
      {
        'bg-main text-white': active,
        'text-gray-700': !active,
      }
    ])}
  >
    {children}
  </a>;
};

const Pagination = () => {
  return <ul className="flex items-center space-x-2">
    <li>
      <PaginationButton>
        <ChevronDoubleLeftIcon className="w-3 h-3" />
      </PaginationButton>
    </li>
    <li>
      <PaginationButton active>1</PaginationButton>
    </li>
    <li>
      <PaginationButton>2</PaginationButton>
    </li>
    <li>
      <PaginationButton>3</PaginationButton>
    </li>
    <li>
      <PaginationButton>4</PaginationButton>
    </li>
    <li>
      <PaginationButton>
        <ChevronDoubleRightIcon className="w-3 h-3" />
      </PaginationButton>
    </li>
  </ul>;
};

export default Pagination;