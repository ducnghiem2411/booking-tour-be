export const newTourMail = (to, sub, content) => {
    return {
      from: 'Tour Nest <tour.nest.team@gmail.com>',
      to: to,
      subject: `${sub}`,
      text:
      `
      Tour Nest
      ${content}
      `
    }
  }