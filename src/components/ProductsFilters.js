import Button from "./Button";
import ChevronRightIcon from "./ChevronRightIcon";
import RatingsFilter from "./RatingsFilter";
import StoreCategoryFilter from "./StoreCategoryFilter";
import TagsFilter from "./TagsFilters";

const ProductsFilters = ({ onChange, filters }) => {
    return (
        <div className="space-y-5">

            <StoreCategoryFilter
                name="storeCategoryIds"
                values={filters?.storeCategoryIds}
                onChange={onChange} />

            {/* Rating */}
            <RatingsFilter
                className="my-8"
                onChange={onChange}
                name="minRating"
                values={filters?.minRating}
            />

            <TagsFilter
                name="tagIds"
                values={filters?.tagIds}
                onChange={onChange}
                filters={filters} />
        </div>
    )
}

export default ProductsFilters;