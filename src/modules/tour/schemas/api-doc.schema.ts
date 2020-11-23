export const bodyCreateTour = {
  type: 'object',
  properties: {
    countryId: { type: 'string' },
    country: { type: 'string' },
    placeId: { type: 'string' },
    place: { type: 'string' },
    name: { type: 'string' },
    checkIn: { type: 'Date' },
    checkOut: { type: 'Date' },
    price: { type: 'number' },
    member: { type: 'number' },
    images: { type: 'array', items: { type: 'string', format: 'binary' }}
  }
}

export const bodyEditTour = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    checkIn: { type: 'Date' },
    checkOut: { type: 'Date' },
    price: { type: 'number' },
    member: { type: 'number' },
  }
}