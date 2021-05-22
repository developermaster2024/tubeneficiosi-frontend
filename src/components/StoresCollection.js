import StoreCard from "./StoreCard";
import StoreHorizontalCard from "./StoreHorizontalCard";

const StoresCollection = ({isInGridView, stores}) => {
  return isInGridView
    ? <div className="grid grid-cols-3 gap-8">
      {stores.map((store, i) => <div
        key={i}
        className="flex justify-center"
      >
        <StoreCard
          imgSrc={store.imgSrc}
          imgAlt={store.imgAlt}
          name={store.name}
          description={store.shortDescription}
          rating={store.rating}
        />
      </div>)}
    </div>
    : <div className="space-y-4">
      {stores.map((store, i) =>  <StoreHorizontalCard
        key={i}
        imgSrc={store.imgSrc}
        imgAlt={store.imgAlt}
        name={store.name}
        description={store.description}
        rating={store.rating}
      />)}
    </div>;
};

export default StoresCollection;