import masterCardLogo from '../assets/images/master-card-logo.png';
import visaLogo from '../assets/images/visa-logo.png';

export const discounts = [
  {title: '20%', subtitle: 'En la 2da hamburguesa', color: 'blue'},
  {title: '30%', subtitle: 'Compras en efectivo', color: 'red'},
  {title: '15%', subtitle: <span className="inline-flex items-center space-x-2"><span>Compras con</span> <img src={masterCardLogo} alt="Master card" className="h-6" /></span>, color: 'green'},
  {title: '25%', subtitle: <span className="inline-flex items-center space-x-2"><span>Compras con</span> <img src={visaLogo} alt="Master card" className="h-6" /></span>, color: 'indigo'},
  {title: 'Ladies', subtitle: 'Night', color: 'pink'},
  {title: '2x1', subtitle: 'En cervezas', color: 'yellow'},
];