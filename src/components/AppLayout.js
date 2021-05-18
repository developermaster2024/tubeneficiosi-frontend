import FacebookIcon from "./FacebookIcon";
import InstagramIcon from "./InstagramIcon";
import Navbar from "./Navbar";
import WhatsappIcon from "./WhatsappIcon";

const AppLayout = ({children}) => {
  return <div className="min-h-screen bg-gray-50 text-sm open-sans">
    <Navbar />

    {children}

    {/* FOOTER */}
    <footer className="h-14 bg-gray-800 text-white mt-auto">
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
  </div>;
};

export default AppLayout;