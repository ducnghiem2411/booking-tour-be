export const bodyEditPlace = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    image: { type: 'string', format: 'binary' }
  }
}

export const bodyCreatePlace = {
  type: 'object',
  properties: {
    countryId: { type: 'string' },
    country: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    image: { type: 'string', format: 'binary' }
  }
}
