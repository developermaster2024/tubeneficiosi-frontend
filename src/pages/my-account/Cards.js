import { IoCard } from "react-icons/io5";
import SelectCardsList from "../../components/SelectCardsList";

const Cards = () => {
    return (
        <div className="p-4">
            <div className="text-2xl font-bold text-gray-500 mb-4 flex items-center space-x-4">
                <IoCard />
                <p>Mis tarjetas</p>
            </div>

            <SelectCardsList />

        </div>
    )
}

export default Cards;