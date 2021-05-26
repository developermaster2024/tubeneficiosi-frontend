import masterCardLogo from '../assets/images/master-card-logo.png';
import visaLogo from '../assets/images/visa-logo.png';
import BurguerKing from '../assets/images/burger-king.png';
import MacDonalds from '../assets/images/macdonalds.png';
import Santander from '../assets/images/santander.png';

export const discounts = [
  { title: '20%', subtitle: 'En la 2da hamburguesa', color: 'blue' },
  { title: '30%', subtitle: 'Compras en efectivo', color: 'red' },
  { title: '15%', subtitle: <span className="inline-flex items-center space-x-2"><span>Compras con</span> <img src={masterCardLogo} alt="Master card" className="h-6" /></span>, color: 'green' },
  { title: '25%', subtitle: <span className="inline-flex items-center space-x-2"><span>Compras con</span> <img src={visaLogo} alt="Master card" className="h-6" /></span>, color: 'indigo' },
  { title: 'Ladies', subtitle: 'Night', color: 'pink' },
  { title: '2x1', subtitle: 'En cervezas', color: 'yellow' },
];

export const storeDiscounts = [
  {
    discount: '20%',
    link: '/stores/burguer-king',
    store: {
      name: 'BurguerKing',
      img: BurguerKing
    }
  },
  {
    discount: '10%',
    link: '/stores/macdonalds',
    store: {
      name: 'Mac Donalds',
      img: MacDonalds
    }
  },

  {
    discount: '30%',
    link: '/stores/macdonalds',
    store: {
      name: 'Mac Donalds',
      img: MacDonalds
    }
  },
  {
    discount: '50%',
    link: '/stores/burguer-king',
    store: {
      name: 'BurguerKing',
      img: BurguerKing
    }
  },
];

export const bankDiscounts = [
  {
    discount: '20%',
    link: '/stores/burguer-king',
    store: {
      name: 'BurguerKing',
      img: BurguerKing
    },
    bank: {
      name: 'Santander',
      img: Santander
    }
  },
  {
    discount: '50%',
    link: '/stores/burguer-king',
    store: {
      name: 'BurguerKing',
      img: BurguerKing
    },
    bank: {
      name: 'Santander',
      img: Santander
    }
  },
];