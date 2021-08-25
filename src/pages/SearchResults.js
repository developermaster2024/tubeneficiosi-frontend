const SearchResults = () => {

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const storeCategoryId = params.get('storeCategoryId');
        const search = params.get('search');

        setFilters((oldFilters) => {
            return {
                ...oldFilters,
                search: search,
                storeCategoryId: storeCategoryId ? storeCategoryId : null
            }
        })

    }, [location])

    return (
        <div>
            yo soy search results
        </div>
    )
}

export default SearchResults;