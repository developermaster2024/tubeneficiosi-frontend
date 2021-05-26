export const createCard = (name, children) => ({ name, children });

export const cards = [

  createCard('Tarjetas de Bancos', [
    createCard('Banco Galicia', [
      createCard('Tarjeta debito Eminent'),
      createCard('Eminent American Express Platinum'),
      createCard('Eminent Visa Platinum'),
      createCard('Mastercard Platinum'),
      createCard('Eminent Visa Signature'),
      createCard('Eminent Mastercard Black'),
      createCard('Visa Internacional'),
      createCard('Eminent American Express Black '),
      createCard('American Express Internacional'),
      createCard('Mastercard Internacional'),
      createCard('Tarjeta de Debito'),
    ]),

    createCard('Banco Ciudad', [
      createCard('Visa Gold'),
      createCard('Visa Internacional'),
      createCard('Visa Platinum'),
      createCard('Visa Signature'),
      createCard('Mastercard Gold'),
      createCard('Mastercard Premium'),
      createCard('Mastercard Internacional'),
      createCard('Mastercard Black'),
      createCard('Tarjeta de Debito'),
    ]),

    createCard('Banco Provincia', [
      createCard('Tarjeta de Debito Visa'),
      createCard('Tarjeta de Credito Visa'),
    ]),

    createCard('Banco Patagonia', [
      createCard('Visa Classic'),
      createCard('Visa Gold'),
      createCard('Visa Auto'),
    ]),

    createCard('Banco Credicoop', [
      createCard('Tarjeta de Debito'),
    ]),

    createCard('Banco Santander', [
      createCard('American Express'),
      createCard('American Express Gold'),
      createCard('American Express Platinum'),
      createCard('American Express Black'),
      createCard('Visa Internacional'),
      createCard('Visa Gold'),
      createCard('Visa Platinum'),
      createCard('Visa Black'),
    ]),


    createCard('Banco ICBC', [
      createCard('Mastercard Black'),
      createCard('Mastercard Platinum'),
      createCard('Mastercard Gold'),
      createCard('Mastercard Internacional'),
      createCard('Start Mastercard'),
      createCard('Visa Signature'),
      createCard('Visa Platinum'),
      createCard('Visa Gold'),
      createCard('Visa Internacional'),
      createCard('Start Visa'),
      createCard('Visa Debito'),
    ]),

    createCard('Banco de La Pampa', [
      createCard('Tarjeta de Debito'),
    ]),

    createCard('Banco de Chile', [
      createCard('Tarjeta de Debito'),
    ]),

    createCard('Banco Nación', [
      createCard('Nativa Mastercard'),
      createCard('Nativa Visa'),
      createCard('Mastercard'),
      createCard('Visa'),
    ]),

    createCard('Banco Macro', [
      createCard('Visa Macro'),
      createCard('Visa Gold'),
      createCard('Visa Platinum'),
      createCard('Mastercard Macro'),
      createCard('Mastercard Gold'),
      createCard('Mastercard Platinum'),
      createCard('Visa Signature Macro Selecta'),
      createCard('Mastercard Black Macro Selecta'),
      createCard('American Express Macro Selecta'),
    ]),

    createCard('Banco BBVA', [
      createCard('Latam PASS'),
      createCard('Visa Classic'),
      createCard('Visa Gold'),
      createCard('Visa Platinum Latam PASS'),
      createCard('Visa Signature Latam PASS'),
      createCard('Mastercard'),
      createCard('Mastercard Gold'),
      createCard('Mastercard Platinum Latam PASS'),
      createCard('Mastercard Black Latam PASS'),
    ]),

    createCard('Banco Itau', [
      createCard('Visa Internacional'),
      createCard('Mastercard Internacional'),
      createCard('Visa Gold'),
      createCard('Mastercard Gold'),
      createCard('Visa Platinum'),
      createCard('Mastercar Platinum'),
      createCard('Visa Signature'),
      createCard('Mastercard Black'),
    ]),

    createCard('Banco HSBC', [
      createCard('Visa Internacional'),
      createCard('Visa Gold'),
      createCard('Visa Platinum'),
      createCard('Visa Signature'),
      createCard('Mastercard Internacional'),
      createCard('Mastercard Gold '),
      createCard('Mastercard Premier'),
      createCard('Mastercard Black'),
      createCard('American Express Internacional'),
      createCard('American Express Gold'),
      createCard('American Express Platinum'),
    ]),

    createCard('Banco Comafi', [
      createCard('Visa Internacional'),
      createCard('Visa Gold'),
      createCard('Visa Platinum'),
      createCard('Visa Signature'),
      createCard('Mastercad Internacional'),
      createCard('Mastercard Gold'),
      createCard('Mastercard Platinum'),
      createCard('Mastercard Black'),
    ]),

    createCard('Banco Hipotecario', [
      createCard('Tarjeta de Debito'),
    ]),

    createCard('Banco Supervielle', [
      createCard('Visa Internacional'),
      createCard('Visa Gold'),
      createCard('Visa Signature'),
      createCard('Visa Platinum'),
      createCard('Mastercard Internacional'),
      createCard('Mastercard Gold'),
      createCard('Mastercard Platinum'),
      createCard('Mastercard Black'),
    ]),

    createCard('Tarjeta Naranja', [
      createCard('Visa'),
      createCard('Mastercard'),
      createCard('American Express'),
      createCard('Naranja X'),
    ]),
  ]),

  createCard('Tarjetas de Descuentos', [
    createCard('Club La Nación Black'),
    createCard('Club La Nación Platinum'),
    createCard('Clarin 365'),
    createCard('Clarin 365 Plus'),
    createCard('Club Personal'),
    createCard('YPF Serviclub'),
    createCard('Club Movistar'),
  ]),

  createCard('Tarjetas de Supermercados', [
    createCard('Coto Digital'),
    createCard('Vea Digital'),
    createCard('Tarjeta Disco'),
    createCard('Club Dia'),
    createCard('Jumbo +'),
    createCard('Tarjeta Carrefour'),
  ]),
]