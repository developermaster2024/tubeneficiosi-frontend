import Container from "../components/Container"
import savings from "../assets/images/alcancia.jpg";
import LeftSidebarLayout from "../components/LeftSidebarLayout";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import CardIssuersList from "../components/CardIssuersList";
import useDiscounts from "../hooks/useDiscounts";
import DiscountStoreCard from "../components/DiscountStoreCard";
import CardsList from "../components/CardsList";
import DiscountModal from "../components/DiscountModal";
import ErrorMsg from "../components/ErrorMsg";

const Benefits = () => {

  const [filters, setFilters] = useState({
    page: 1,
    isActive: true,
    cardIssuerIds: [],
    cardIds: []
  });


  const [cardIssuer, setCardIssuer] = useState(null);

  const [card, setCard] = useState(null);

  const [discount, setDiscount] = useState(null);

  const [{ discounts, error: discountsError, loading: discountsLoading, numberOfPages }, getDiscounts] = useDiscounts({ options: { useCache: false, manual: true } });

  useEffect(() => {
    getDiscounts({
      params: {
        ...filters,
        cardIssuerIds: filters.cardIssuerIds.join(","),
        cardIds: filters.cardIds.join(",")
      }
    })
  }, [filters, getDiscounts]);

  useEffect(() => {
    handleCard(null);
    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        cardIssuerIds: cardIssuer?.id ? [cardIssuer?.id] : [],
        cardIds: []
      }
    })
  }, [cardIssuer])

  useEffect(() => {
    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        cardIssuerIds: card ? [] : oldFilters.cardIssuerIds,
        cardIds: card?.id ? [card?.id] : []
      }
    })
  }, [card]);

  useEffect(() => {
    console.log(discounts);
  }, [discounts]);

  const handleCardIssuer = (cardIssuer) => {
    setCardIssuer(cardIssuer)
  }

  const handleCard = (card) => {
    console.log(card);
    setCard(card);
  }

  const handleDiscount = (discount) => {
    setDiscount(discount);
  }

  const handleChange = (e) => {
    setFilters((oldFilters) => {
      if (e.target.name !== "page") {
        return {
          ...oldFilters,
          [e.target.name]: e.target.value,
          page: 1
        }
      }
      return {
        ...oldFilters,
        [e.target.name]: e.target.value,
      }
    })
  }

  return <>
    <div className="h-80 flex flex-col" style={{
      backgroundImage: `url(${savings})`,
      backgroundSize: '100% 100%',
    }}>
      <Container className="pt-6">
        <h3 className="text-6xl font-semibold">Beneficios</h3>
      </Container>

      <Container className="mt-auto flex space-x-2">
        {[
          'Gastronomía',
          'Farmacias',
          'Supermercados',
          'Boliches',
          'Espectaculos',
        ].map(categoria => <div
          key={categoria}
          className="
            flex items-center justify-center
            w-1/5 py-3
            bg-white hover:bg-main hover:text-white
            border border-main
            text-lg font-semibold
            rounded-md
            transition
            cursor-pointer
          "
        >
          {categoria}
        </div>)}
      </Container>
    </div>

    <Container className="my-10">
      <LeftSidebarLayout
        leftSide={<div>
          <h4 className="mb-2 text-center text-xl font-bold">Bancos</h4>
          <CardIssuersList selectedCardIssuer={cardIssuer} emitCardIssuer={handleCardIssuer} />


          <div className="mt-8">
            <CardsList selectedCard={card} cardIssuer={cardIssuer} emitCard={handleCard} />
          </div>

        </div>}
      >
        <div className="my-4 text-3xl text-gray-500 font-bold">
          Tiendas con descuentos {cardIssuer ? `- Con ${cardIssuer?.name}` : null} {card ? ` - ${card?.name}` : null}
        </div>
        {
          discountsError ?
            <ErrorMsg message="Error al cargar los descuentos. Nuestro equipo ha sido notificado, intente más tarde." />
            :
            discountsLoading ?
              <div style={{ marginTop: 200 }} className="text-center text-gray-500 text-3xl">
                Cargando descuentos...
              </div>
              :
              discounts.length > 0 ?
                <div className="grid grid-cols-3 gap-8">
                  {
                    discounts.map((promo, i) => {
                      return (
                        <DiscountStoreCard key={i} emitDiscount={handleDiscount} discount={promo} />
                      )
                    })
                  }
                </div>
                :
                <div className="text-center text-red-500 text-2xl">
                  No hay descuentos
                </div>
        }
        <div className="flex w-full justify-center items-center mt-10">
          <Pagination pages={numberOfPages} activePage={filters.page} onChange={(e) => { handleChange({ target: { name: "page", value: e, type: "number" } }) }}></Pagination>
        </div>
      </LeftSidebarLayout>
      <DiscountModal discount={discount} onClose={() => { setDiscount(null) }} />
    </Container>
  </>;
};

export default Benefits;