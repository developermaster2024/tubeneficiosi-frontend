import Container from "../components/Container"
import savings from "../assets/images/alcancia.jpg";
import tresCepas from '../assets/images/3-cepas.png';
import fiveAsec from '../assets/images/5asec.png';
import theKickBack from '../assets/images/thekickback.png';
import tucson from '../assets/images/tucson.png';
import vaqueria from '../assets/images/vaqueria.png';
import zapateriatendencias from '../assets/images/zapateriatendencias.png';
import zensushi from '../assets/images/zensushi.png';
import r301 from '../assets/images/r301.png';
import LeftSidebarLayout from "../components/LeftSidebarLayout";
import BankExpandableButton from "../components/BankExpandableButton";

const Benefits = () => {
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
          <h4 className="mb-6 text-center text-xl font-bold">Bancos</h4>
          
          <div className="space-y-2">
            {[
              'Galicia', 'Santander', 'Patagonia', 'Frances', 'HSBC', 'ICBC', 'Comafi', 'Credicoop', 'La pampa', 'Itaú', 'Superville', 'Hipotecario', 'Tarjeta naranja'
            ].map((banco, i) => <BankExpandableButton key={i} text={banco} />)}
          </div>
        </div>}
      >
        <div className="grid grid-cols-3 gap-8">
          {[
            {imgSrc: tresCepas, imgAlt: '3 cepas', promo: '15%', title: 'De ahorro y cuotas', subtitle: 'Todos los jueves'},
            {imgSrc: fiveAsec, imgAlt: '5 asec', promo: 'Hasta 40%', title: 'De ahorro', subtitle: 'Todos los dias'},
            {imgSrc: fiveAsec, imgAlt: '5 asec', promo: '15%', title: 'De ahorro', subtitle: 'Todos los jueves'},
            {imgSrc: theKickBack, imgAlt: 'The kickback', promo: '20%', title: 'De ahorro y cuotas', subtitle: 'Todos los jueves'},
            {imgSrc: tucson, imgAlt: 'Tucson', promo: '25%', title: 'De ahorro', subtitle: 'Todos los dias'},
            {imgSrc: vaqueria, imgAlt: 'Vaquería', promo: '20%', title: 'De ahorro y cuotas', subtitle: 'Todos los jueves'},
            {imgSrc: zapateriatendencias, imgAlt: 'Zapaterpia tendencias', promo: '20%', title: 'De ahorro y cuotas', subtitle: 'Todos los jueves'},
            {imgSrc: zensushi, imgAlt: 'Zen Sushi', promo: '25%', title: 'De ahorro', subtitle: 'Todos los dias'},
            {imgSrc: r301, imgAlt: 'R301 Jeanswear', promo: '20%', title: 'De ahorro y cuotas', subtitle: 'Todos los jeuves'},
          ].map((promo, i) => <div
            className="flex flex-col justify-center items-center p-8 max-w-[300px] bg-white rounded-md shadow hover:shadow-lg transition"
            key={i}
          >
            <img
              src={promo.imgSrc}
              alt={promo.imgAlt}
              className="h-20"
            />

            <p className="text-orange-500 text-4xl font-semibold my-3">{promo.promo}</p>

            <p className="text-xl leading-none text-gray-600 tracking-tight uppercase">{promo.title}</p>

            <p className="text-xl leading-none text-gray-600 tracking-tight mt-8">{promo.subtitle}</p>
          </div>)}
        </div>
      </LeftSidebarLayout>
    </Container>
  </>;
};

export default Benefits;