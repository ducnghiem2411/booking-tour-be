export const confirmSubscribeMail = (to, url) => {
  return {
    from: 'Tour Nest <tour.nest.team@gmail.com>',
    to: to,
    subject: 'Subscribe confirmation',
    text:
    `
    Tour Nest
    Please click this url to confirm subscribes to our news
    ${url}
    `
  }
}
