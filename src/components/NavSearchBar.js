import useCategories from "../hooks/useCategories";

const NavSearchBar = ({ onChange, onSubmit, data }) => {

    const [{ categories, error: errorCategories, loading: categoriesLoading }] = useCategories();

    return (
        <form className="hidden md:flex items-center px-10 space-x-4 flex-grow" onSubmit={onSubmit}>
            <select
                name="storeCategoryId"
                value={data.storeCategoryId}
                onChange={onChange}
                disabled={errorCategories || categoriesLoading ? true : false}
                className="w-40 capitalize rounded border-gray-300 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 bg-transparent text-sm leading-4"
            >
                <option value="">Seleccione una categoria</option>
                {categories.map((category, i) => {
                    return (
                        <option className="text-black capitalize" value={category.id} key={i}>{category.name}</option>
                    )
                })}
            </select>
            <input
                name="search"
                value={data.search}
                onChange={onChange}
                placeholder="Nombre de tienda, producto..."
                className="w-full rounded border-gray-300 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 bg-transparent text-sm leading-4"
                type="text"
            />
        </form>
    )
}

export default NavSearchBar;