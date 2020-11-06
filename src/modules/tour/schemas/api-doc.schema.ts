export const apiBodyTour = {
  type: 'object',
  properties: {
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