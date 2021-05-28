import transferencia from '../assets/images/transferencia.jpg';
import MacDonalds from '../assets/images/macdonalds.png';
import BurguerKing from '../assets/images/burger-king.png';

export const conversations = [
  {
    id: 1,
    subject: 'Error en pago de la Orden #12',
    store: {
      id: 1,
      name: 'BurguerKing',
      img: BurguerKing,
      slug: 'burguer-king'
    },
    status: {
      title: 'Abierto',
      id: 2
    },
    messages: [
      {
        text: 'Hola buen dia estoy aca para informale que ha habido un error en el pago de la orden #12',
        user: {
          id: 1,
          name: 'administrador',
        },
        createdAt: new Date()
      },
      {
        text: 'Hola si disculpe ya rectifico el pago.',
        user: {
          id: 2,
          name: 'Jeyver Vegas',
        },
        createdAt: new Date()
      },
      {
        text: 'Buen dia aca esta el faltante disculpe la molestia.',
        user: {
          id: 2,
          name: 'Jeyver Vegas',
        },
        createdAt: new Date(),
        attachment: [
          {
            id: 1,
            name: 'transferencia.jpg',
            src: transferencia,
          }
        ]
      }
    ]
  },
  {
    id: 2,
    subject: 'Soporte Tecnico',
    status: {
      title: 'Cerrado',
      id: 1
    },
    messages: [
      {
        text: 'Buenos dias en que podemos ayudarle.',
        user: {
          id: 1,
          name: 'administrador',
        },
        createdAt: new Date()
      },
      {
        text: 'Hola buen dias por favor me podria ayudar a completar una compra?.',
        user: {
          id: 2,
          name: 'Jeyver Vegas',
        },
        createdAt: new Date()
      },
      {
        text: 'Por su puesto que si. digame ¿en que podemos ayudarle?.',
        user: {
          id: 1,
          name: 'administrador',
        },
        createdAt: new Date(),
      }
    ]
  }
]