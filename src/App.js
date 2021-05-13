import HomeSlider from './components/HomeSlider';
import Navbar from './components/Navbar';
import events from './assets/images/espectaculos.jpg';
import events2 from './assets/images/espectaculos2.jpg';
import gastronomy from './assets/images/gastronomia.jpg';
import supermarkets from './assets/images/supermercados.jpg';
import bars from './assets/images/boliches.jpg';
import pharmacy from './assets/images/farmacias.jpg';
import motorola from './assets/images/motorola.jpg';
import aires from './assets/images/aires.jpg';
import burger from './assets/images/hamburguesa.jpg';
import harina from './assets/images/harina.jpg';
import tapaboca from './assets/images/tapaboca.jpg';
import ecology from './assets/images/ecology.jpg';
import ecologyBanner from './assets/images/ecology-banner.jpg';
import dell from './assets/images/dell.jpg';
import dellBanner from './assets/images/dell-banner.jpg';
import wix from './assets/images/wix.jpg';
import wixBanner from './assets/images/wix-banner.jpg';
import amaDeCasa from './assets/images/ama-de-casa.jpg';
import amaDeCasaBanner from './assets/images/ama-de-casa-banner.jpg';
import tresCepas from './assets/images/3-cepas.png';
import fiveAsec from './assets/images/5asec.png';
import shield from './assets/images/shield.png';
import callCenterAgent from './assets/images/call-center-agent.png';
import rent from './assets/images/rent.png';
import smartphone from './assets/images/smartphone.png';
import appBg from './assets/images/app-bg.jpg';
import downloadAndroidApp from './assets/images/download-android-app.svg';
import partner from './assets/images/partner.jpg';
import clients from './assets/images/clients.jpg';
import SectionHeading from './components/SectionHeading';
import ProductAdCard from './components/ProductAdCard';
import ProductCard from './components/ProductCard';
import CategorySectionCard from './components/CategorySectionCard';
import FacebookIcon from './components/FacebookIcon';
import InstagramIcon from './components/InstagramIcon';
import WhatsappIcon from './components/WhatsappIcon';

const categories = [
  {name: 'Espectaculos', img: events},
  {name: 'Gastronomía', img: gastronomy},
  {name: 'Supermercados', img: supermarkets},
  {name: 'Boliches', img: bars},
  {name: 'Farmacias', img: pharmacy},
];

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-sm open-sans">
      <Navbar />
      <HomeSlider />

      {/* CATEGORIES */}
      <div className="container mt-20">
        <div className="flex space-x-4">
          {categories.map((category, index) => <a
            key={index}
            href="/#"
            className="
              flex items-center justify-center
              relative w-full py-8
              bg-blue-500 text-white font-semibold text-2xl
              rounded-md overflow-hidden shadow
              transform
              hover:-translate-y-1 hover:shadow-2xl
            "
            style={{
              backgroundImage: `url(${category.img})`,
              backgroundSize: 'cover',
            }}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <span className="relative">{category.name}</span>
          </a>)}
        </div>
      </div>

      <div className="container mt-20">
        <SectionHeading>Descrubrí</SectionHeading>
      </div>

      {/* PRODUCT ADS */}
      <div className="container mt-20">
        <div className="flex space-x-4">
          <ProductAdCard
            title={<>
              <p>lo último</p>
              <p>en celurares</p>
            </>}
            subtitle="black friday"
            btnText="Ver más"
            href="/#"
            imgSrc={motorola}
            imgAlt="Celulares"
          />
          <ProductAdCard
            title={<>
              <p>Refrescá tus</p>
              <p>espacios</p>
            </>}
            subtitle="black friday"
            btnText="Ver más"
            href="/#"
            imgSrc={aires}
            imgAlt="Aires acondicionados"
          />
        </div>
      </div>

      {/* HAGAMOSLO JUNTOS */}
      <div className="container mt-20">
        <h3 className="text-5xl text-center font-semibold">Hagámoslo juntos</h3>
        
        <div className="flex space-x-4 mt-20">
          {[
            {imgSrc: partner, imgAlt: 'Socio', title: 'Hazte Partner', content: '¡Crece con BeneficioSi! ¡Nuestra tecnología y base de usuarios puede ayudarte a aumentar las ventas y descubrir nuevas oportunidades!'},
            {imgSrc: clients, imgAlt: 'Clientes', title: 'Registrate como cliente', content: 'Pedí online rápido y fácil a reconocidas marcas y +10.000 restaurantes'},
          ].map((item, i) => <div
            key={i}
            className="w-1/2 flex flex-col items-center"
          >
            <div className="flex flex-col items-center space-y-6 mb-6">
              <img
                src={item.imgSrc}
                alt={item.imgAlt}
                className="h-60 w-60 rounded-full shadow"
              />
              <h4 className="text-3xl font-semibold">{item.title}</h4>
              <p className="max-w-[350px] text-center text-base">
                {item.content}
              </p>
            </div>
            
            <button className="
              inline-flex items-center justify-center
              mt-auto px-6 py-4 space-x-2
              leading-4
              border border-white rounded-lg shadow
              bg-green-500 text-white text-xl font-semibold
            ">
              Únete
            </button>
          </div>)}
        </div>
      </div>
      
      <div className="container mt-20">
        <SectionHeading>Explorá</SectionHeading>
      </div>

      {/* GASTRONOMIA */}
      <div className="container mt-20">
        <div className="flex space-x-4">
          <div className="w-full">
            <h4 className="mb-4 text-center text-3xl font-semibold">Mejores productos</h4>

            <div className="flex justify-evenly space-x-3">
              {[1, 2].map(n => <ProductCard
                key={n}
                name="Product name"
                description="Space for a small product description"
                imgSrc={burger}
                imgAlt="Hamburguesas"
                price="12.00"
              />)}
            </div>
          </div>

          <CategorySectionCard
            text="Gastronomia"
            imgSrc={gastronomy}
          />
        </div>
      </div>
      
      {/* ESPECTACULOS */}
      <div className="container mt-20">
        <div className="flex space-x-4">
          <CategorySectionCard
            text="Espectaculos"
            imgSrc={events}
          />

          <div className="w-full">
            <h4 className="mb-4 text-center text-3xl font-semibold">Mejores productos</h4>

            <div className="flex justify-evenly space-x-3">
              {[1, 2].map(n => <ProductCard
                key={n}
                name="Product name"
                description="Space for a small product description"
                imgSrc={events2}
                imgAlt="Espectaculos"
                price="12.00"
              />)}
            </div>
          </div>
        </div>
      </div>

      {/* Supermercados */}
      <div className="container mt-20">
        <div className="flex space-x-4">
          <div className="w-full">
            <h4 className="mb-4 text-center text-3xl font-semibold">Mejores productos</h4>

            <div className="flex justify-evenly space-x-3">
              {[1, 2].map(n => <ProductCard
                key={n}
                name="Product name"
                description="Space for a small product description"
                imgSrc={harina}
                imgAlt="Harina"
                price="12.00"
              />)}
            </div>
          </div>

          <CategorySectionCard
            text="Supermercados"
            imgSrc={supermarkets}
          />
        </div>
      </div>
      
      {/* Boliches */}
      <div className="container mt-20">
        <div className="flex space-x-4">
          <CategorySectionCard
            text="Boliches"
            imgSrc={bars}
          />

          <div className="w-full">
            <h4 className="mb-4 text-center text-3xl font-semibold">Mejores productos</h4>

            <div className="flex justify-evenly space-x-3">
              {[1, 2].map(n => <ProductCard
                key={n}
                name="Product name"
                description="Space for a small product description"
                imgSrc={events2}
                imgAlt="Espectaculos"
                price="12.00"
              />)}
            </div>
          </div>
        </div>
      </div>

      {/* Farmcias */}
      <div className="container mt-20">
        <div className="flex space-x-4">
          <div className="w-full">
            <h4 className="mb-4 text-center text-3xl font-semibold">Mejores productos</h4>

            <div className="flex justify-evenly space-x-3">
              {[1, 2].map(n => <ProductCard
                key={n}
                name="Product name"
                description="Space for a small product description"
                imgSrc={tapaboca}
                imgAlt="Tapa boca"
                price="12.00"
              />)}
            </div>
          </div>

          <CategorySectionCard
            text="Farmacia"
            imgSrc={pharmacy}
          />
        </div>
      </div>

      <div className="container mt-20">
        <SectionHeading>Las Mejores tiendas te esperan</SectionHeading>
      </div>

      {/* TIENDA DESTACADAS */}
      <div className="container mt-20">
        <div className="flex justify-between space-x-4">
          {[
            {name: 'Ecology', bannerSrc: ecologyBanner, logoSrc: ecology},
            {name: 'Dell', bannerSrc: dellBanner, logoSrc: dell},
            {name: 'Wix', bannerSrc: wixBanner, logoSrc: wix},
            {name: 'Ama de Casa', bannerSrc: amaDeCasaBanner, logoSrc: amaDeCasa},
          ].map(tienda => <div
            key={tienda.name}
            className="relative bg-white max-w-xs w-full rounded-md overflow-hidden shadow"
          >
            <img
              src={tienda.bannerSrc}
              alt={tienda.name}
              className="h-20 w-full"
            />

            <img
              src={tienda.logoSrc}
              alt={tienda.name}
              className="absolute left-1/2 top-[40px] h-20 w-20 transform -translate-x-1/2 rounded shadow-md"
            />
            
            <div className="p-4 pt-16 space-y-7">
              <h4 className="text-2xl text-center">{tienda.name}</h4>

              <div className="flex justify-evenly space-x-2">
                {[1, 2, 3].map(n => <img
                  key={n}
                  src={tapaboca}
                  alt=""
                  className="w-14 h-14 border border-gray-200 rounded"
                />)}
              </div>

              <div className="text-center">
                <a href="/#" className="opacity-75">Ver tienda</a>
              </div>
            </div>
          </div>)}
        </div>
      </div>

      <div className="container mt-20">
        <SectionHeading>Beneficios por banco</SectionHeading>
      </div>

      {/* BENEFICIOS POR BANCO */}
      <div className="container mt-20">
        <div className="flex justify-center space-x-4">
          {[
            {imgSrc: tresCepas, imgAlt: '3 cepas', promo: '15%', title: 'De ahorro y cuotas', subtitle: 'Todos los jueves'},
            {imgSrc: fiveAsec, imgAlt: '3 cepas', promo: 'Hasta 40%', title: 'De ahorro', subtitle: 'Todos los dias'},
            {imgSrc: fiveAsec, imgAlt: '3 cepas', promo: '15%', title: 'De ahorro', subtitle: 'Todos los jueves'},
          ].map((promo, i) => <div
            className="flex flex-col justify-center items-center p-8 max-w-[300px] bg-white rounded-md shadow"
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
      </div>
      
      {/* MOBILE APP SECTION */}
      <div className="relative py-32 mt-20 bg-main bg-gradient-to-r from-main to-main-light text-white">
        <div className="container">
          <div className="absolute inset-y-0 right-0">
            <img
              src={appBg}
              alt="App"
              className="h-full"
            />
          </div>
          <div className="flex">
            <div className="w-1/2 flex flex-col items-center space-y-6">
              <img
                src={smartphone}
                alt="Smartphone"
                className="w-32 h-32"
              />

              <h4 className="text-5xl font-bold">Descárgate  la app</h4>

              <p>Pide lo que sea y síguelo en tiempo real con la app BeneficioSi.</p>

              <a href="/#">
                <img
                  src={downloadAndroidApp}
                  alt="Descargar app para android"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT WE OFFER */}
      <div className="container my-20">
          <div className="flex justify-evenly">
            {[
              {imgSrc: shield, title: 'Publicaciones verificadas', content: 'Nuestras publicaciones requieren una validación por datos y controlamos lo publicado'},
              {imgSrc: rent, title: 'Compra protegida', content: 'Podés señar el auto que quieras y si la compra no se hace efectiva se te devuelve el importe al 100%'},
              {imgSrc: callCenterAgent, title: 'Soporte', content: 'Acompañamos el proceso asegurandonos de que todo salga correctamente'},
            ].map(item => <div
              className="flex flex-col items-center space-y-4 w-full max-w-xs"
              key={item.title}
            >
              <img
                src={item.imgSrc}
                alt={item.title}
                className="h-20 w-20"
              />

              <h4 className="text-xl font-semibold">{item.title}</h4>
              
              <p className="text-center">{item.content}</p>
            </div>)}
          </div>
      </div>

      {/* FOOTER */}
      <footer className="h-14 bg-gray-800 text-white">
        <div className="container h-full">
          <div className="flex justify-between items-center h-full">
              <nav className="space-x-6">
                <a href="/#">Nosotros</a>
                <a href="/#">Política de privacidad</a>
                <a href="/#">Ayuda</a>
              </nav>

              <div className="flex items-center space-x-3">
                {[FacebookIcon, InstagramIcon, WhatsappIcon].map((Icon, i) => <a
                  key={i}
                  href="/#"
                  className="inline-flex items-center justify-center h-7 w-7 bg-gray-700 rounded-md"
                >
                  <Icon className="h-4 w-4" />
                </a>)}
              </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
