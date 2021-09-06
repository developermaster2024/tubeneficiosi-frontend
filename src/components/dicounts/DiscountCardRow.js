const DiscountCardRow = ({ card }) => {
    return (
        <div className="flex items-center justify-between shadow-xl p-4 rounded text-gray-500">
            <div className="text-center">
                <p>
                    <b>Imagen</b>
                </p>
                {
                    card?.imgPath &&
                    <img className="w-20 h-14 rounded" src={`${process.env.REACT_APP_API_URL}/${card?.imgPath}`} alt={card?.name} />
                }
            </div>
            <div className="text-center">
                <p>
                    <b>Nombre</b>
                </p>
                <p>
                    {
                        card?.name
                    }
                </p>
            </div>
            <div className="text-center">
                <p>
                    <b>Tipo</b>
                </p>
                <p>
                    {
                        card?.cardType?.name
                    }
                </p>
            </div>
            <div className="text-center">
                <p>
                    <b>Emisor</b>
                </p>
                <p>
                    {
                        card?.cardIssuer?.name
                    }
                </p>
            </div>
        </div>
    )
}

export default DiscountCardRow;