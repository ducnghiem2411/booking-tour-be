export const apiBodyPlace = {
  type: 'object',
  properties: {
    countryId: { type: 'string' },
    country: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    image: { type: 'string', format: 'binary' }
  }
}
