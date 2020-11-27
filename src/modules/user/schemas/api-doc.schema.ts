export const bodyEditUser = {
    type: 'object',
    properties: {
      bio: { type: 'string' },
      phone: { type: 'string' },
      image: { type: 'string', format: 'binary' }
    }
  }