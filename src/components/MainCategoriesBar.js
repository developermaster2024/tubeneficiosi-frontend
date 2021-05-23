import ChevronDownIcon from "./ChevronDownIcon";
import { categories } from "../util/categories";
import { useState } from "react";
const MainCategoriesBar = () => {

  const [isHovered, setHover] = useState('');
  const [isHovered2, setHover2] = useState('');

  const handleClick = (value) => {
    if (isHovered == value) {
      setHover(null);
      return;
    }

    setHover(value);
  }

  const handleClick2 = (value) => {
    if (isHovered2 == value) {
      setHover2(null);
      return;
    }

    setHover2(value);
  }

  return <div className="flex items-center py-2 space-x-4">
    {categories.map((category, i) =>
      <div key={i} style={{ position: 'relative' }}>
        <a href="#" className="inline-flex items-center px-3 py-2 space-x-2 font-semibold text-lg tracking-wide hover:bg-gray-100 rounded">
          <span>{category.name}</span>
          <span onClick={() => { handleClick('category-' + category.name) }}>
            {
              isHovered == 'category-' + category.name ?
                <span style={{ color: 'red' }}>-</span>
                :
                <ChevronDownIcon className="w-4 h-4 text-main" fill="none" />
            }

          </span>
        </a>

        <div className="p-4" style={{ position: 'absolute', background: 'white', transition: 'all .3s', display: isHovered == 'category-' + category.name ? 'block' : 'none', zIndex: '9999999' }}>
          {
            category.children.map((subCategory, i) =>
              <div style={{ position: 'relative' }}>
                <a className="inline-flex items-center px-3 py-2 space-x-2 font-semibold text-lg tracking-wide hover:bg-gray-100 rounded" href="#" style={{ display: 'block', color: '#F04141' }}>
                  <span>{subCategory.name}</span>

                  {
                    subCategory.children ?
                      <span onClick={() => { handleClick2('subcategory-' + subCategory.name) }}>
                        {
                          isHovered2 == 'subcategory-' + subCategory.name ?
                            <span style={{ color: 'red' }}>-</span>
                            :
                            <ChevronDownIcon className="w-4 h-4 text-main" fill="none" />
                        }

                      </span>
                      :
                      null
                  }

                  {
                    subCategory.children ?
                      <div style={{
                        position: 'absolute', left: '100%', top: '0', display: isHovered2 == 'subcategory-' + subCategory.name ? 'block' : 'none', background
                          : 'white'
                      }}>
                        {
                          subCategory.children.map((subSubCategory, i) =>
                            <a href="" className="inline-flex items-center px-3 py-2 space-x-2 font-semibold text-lg tracking-wide hover:bg-gray-100 rounded" href="#" style={{ display: 'block', color: '#F04141' }}>
                              {subSubCategory.name}
                            </a>
                          )
                        }
                      </div>
                      :
                      null
                  }
                </a>
              </div>
            )
          }
        </div>
      </div>
    )}
  </div>
};

export default MainCategoriesBar;