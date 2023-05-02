import {getRandomArrayElement, getRandomNumber} from '../utils';

const offersByTypes = [
  {
    'type': 'taxi',
    'offers': [{
      'id': 1,
      'title': 'Choose the radio',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Order Uber',
      'price': 20
    }]
  },

  {
    'type': 'bus',
    'offers': [{
      'id': 1,
      'title': 'Choose the radio',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Order Uber',
      'price': 20
    }]
  },

  {
    'type': 'flight',
    'offers': [
      {
        'id': 1,
        'title': 'Add luggage',
        'price': 30
      },
      {
        'id': 2,
        'title': 'Switch to comfort',
        'price': 100
      },
      {
        'id': 3,
        'title': 'Add meal',
        'price': 15
      },
      {
        'id': 4,
        'title': 'Choose seats',
        'price': 5
      },
      {
        'id': 5,
        'title': 'Travel by train',
        'price': 40
      },
    ]
  },

  {
    'type': 'train',
    'offers': [{
      'id': 1,
      'title': 'Choose the radio',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Order Uber',
      'price': 20
    }]
  },

  {
    'type': 'ship',
    'offers': []
  },

  {
    'type': 'drive',
    'offers': [{
      'id': 1,
      'title': 'Choose the radio',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Order Uber',
      'price': 20
    }]
  },

  {
    'type': 'check-in',
    'offers': [{
      'id': 1,
      'title': 'Choose the radio',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Order Uber',
      'price': 20
    }]
  },

  {
    'type': 'sightseeing',
    'offers': [{
      'id': 1,
      'title': 'Choose the radio',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Order Uber',
      'price': 20
    }]
  },

  {
    'type': 'restaurant',
    'offers': [{
      'id': 1,
      'title': 'Choose the radio',
      'price': 120
    },
    {
      'id': 2,
      'title': 'Order Uber',
      'price': 20
    }]
  },
];

const tripDestinations = [
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1,10)}`,
      }
    ]
  },
  {
    id: 2,
    description: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    name: 'Geneve',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1,10)}`,
      }
    ]
  },
  {
    id: 3,
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1,10)}`,
      }
    ]
  }
];

const MOCK_POINTS = [
  {
    id: 0,
    type: 'taxi',
    offers: [1, 2],
    destination: tripDestinations[0].name,
    description: tripDestinations[0].description,
    pictures: tripDestinations[0].pictures.src,
    basePrice: 500,
    dateFrom: '2019-07-11T20:35:56.845Z',
    dateTo: '2019-07-12T11:25:13.375Z',
    timeFrom: '10:30',
    timeTo: '11:00',
    isFavorite: true
  },
  {
    id: 1,
    type: 'bus',
    offers: [1, 2],
    destination: tripDestinations[1].name,
    description: tripDestinations[1].description,
    basePrice: 40,
    dateFrom: '2019-07-11T20:35:56.845Z',
    dateTo: '2019-07-12T11:25:13.375Z',
    timeFrom: '10:30',
    timeTo: '11:00',
    isFavorite: true
  },
  {
    id: 2,
    type: 'train',
    offers: [1, 2],
    destination: tripDestinations[2].name,
    description: tripDestinations[2].description,
    basePrice: 200,
    dateFrom: '2019-07-11T20:35:56.845Z',
    dateTo: '2019-07-12T11:25:13.375Z',
    timeFrom: '10:30',
    timeTo: '11:00',
    isFavorite: true
  },
  {
    id: 3,
    type: 'ship',
    offers: [1, 2],
    destination: tripDestinations[0].name,
    description: tripDestinations[0].description,
    basePrice: 80,
    dateFrom: '2019-07-11T20:35:56.845Z',
    dateTo: '2019-07-12T11:25:13.375Z',
    timeFrom: '10:30',
    timeTo: '11:00',
    isFavorite: true
  },
  {
    id: 4,
    type: 'drive',
    offers: [1, 2],
    destination: tripDestinations[1].name,
    description: tripDestinations[1].description,
    basePrice: 90,
    dateFrom: '2019-07-11T20:35:56.845Z',
    dateTo: '2019-07-12T11:25:13.375Z',
    timeFrom: '10:30',
    timeTo: '11:00',
    isFavorite: true
  },
  {
    id: 5,
    type: 'flight',
    offers: [1, 2, 3],
    destination: tripDestinations[2].name,
    description: tripDestinations[2].description,
    basePrice: 150,
    dateFrom: '2019-07-11T20:35:56.845Z',
    dateTo: '2019-07-12T11:25:13.375Z',
    timeFrom: '10:30',
    timeTo: '11:00',
    isFavorite: true
  },
  {
    id: 6,
    type: 'check-in',
    offers: [1, 2],
    destination: tripDestinations[0].name,
    description: tripDestinations[0].description,
    basePrice: 150,
    dateFrom: '2019-07-11T20:35:56.845Z',
    dateTo: '2019-07-12T11:25:13.375Z',
    timeFrom: '10:30',
    timeTo: '11:00',
    isFavorite: false
  },
  {
    id: 7,
    type: 'sightseeing',
    offers: [1, 2],
    destination: tripDestinations[1].name,
    description: tripDestinations[1].description,
    basePrice: 100,
    dateFrom: '2019-07-11T20:35:56.845Z',
    dateTo: '2019-07-12T11:25:13.375Z',
    timeFrom: '10:30',
    timeTo: '11:00',
    isFavorite: false
  },
  {
    id: 8,
    type: 'restaurant',
    offers: [1, 2],
    destination: tripDestinations[2].name,
    description: tripDestinations[2].description,
    basePrice: 100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    timeFrom: '10:30',
    timeTo: '11:00',
    isFavorite: false
  }
];

const getRandomPoint = () => (getRandomArrayElement(MOCK_POINTS));

export { tripDestinations, offersByTypes, getRandomPoint};
