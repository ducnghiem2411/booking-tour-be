export const bodyCreateCountry = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    image: { type: 'string', format: 'binary' }
  }
}

export const bodyEditCountry = {
  type: 'object',
  properties: {
    description: { type: 'string' },
    image: { type: 'string', format: 'binary' }
  }
}