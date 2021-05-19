import ChevronDownIcon from "./ChevronDownIcon";

const MainCategoriesBar = () => {
  return <div className="flex items-center py-2 space-x-4">
    <a href="/#" className="inline-flex items-center px-3 py-2 space-x-2 font-semibold text-lg tracking-wide hover:bg-gray-100 rounded">
      <span>Boliches</span>
      <ChevronDownIcon className="w-4 h-4 text-main" fill="none" />
    </a>
    <a href="/#" className="inline-flex items-center px-3 py-2 space-x-2 font-semibold text-lg tracking-wide hover:bg-gray-100 rounded">
      <span>Supermercados</span>
      <ChevronDownIcon className="w-4 h-4 text-main" fill="none" />
    </a>
    <a href="/#" className="inline-flex items-center px-3 py-2 space-x-2 font-semibold text-lg tracking-wide hover:bg-gray-100 rounded">
      <span>Farmacias</span>
      <ChevronDownIcon className="w-4 h-4 text-main" fill="none" />
    </a>
    <a href="/#" className="inline-flex items-center px-3 py-2 space-x-2 font-semibold text-lg tracking-wide hover:bg-gray-100 rounded">
      <span>Gastronomía</span>
      <ChevronDownIcon className="w-4 h-4 text-main" fill="none" />
    </a>
    <a href="/#" className="inline-flex items-center px-3 py-2 space-x-2 font-semibold text-lg tracking-wide hover:bg-gray-100 rounded">
      <span>Espectaculos</span>
      <ChevronDownIcon className="w-4 h-4 text-main" fill="none" />
    </a>
  </div>
};

export default MainCategoriesBar;