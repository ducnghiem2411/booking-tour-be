export const apiBodyCountry = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    image: { type: 'string', format: 'binary' }
  }
}
