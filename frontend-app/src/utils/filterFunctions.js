export const filterByGenre = (shows, genre) => {
  return genre ? shows.filter(show => show.genre.includes(genre)) : shows;
};

export const filterByDate = (shows, date) => {
  return date ? shows.filter(show => show.session.some(session => session.date === date)) : shows;
};

export const filterByAvailability = (shows, availability) => {
  const hasAvailableTickets = (session) => session.ticketsAvailability.some(ticket => ticket.remain > 0);
  const isSoldOut = (session) => session.ticketsAvailability.every(ticket => ticket.remain === 0);

  if (availability === 'available') {
    return shows.filter(show => show.session.some(hasAvailableTickets));
  } else if (availability === 'sold-out') {
    return shows.filter(show => show.session.every(isSoldOut));
  }
  return shows;
};

export const sortByPrice = (shows, sortOrder) => {
  return shows.sort((a, b) => {
    if (sortOrder === 'low-high') {
      return a.session[0].ticketsAvailability[0].price - b.session[0].ticketsAvailability[0].price;
    } else if (sortOrder === 'high-low') {
      return b.session[0].ticketsAvailability[0].price - a.session[0].ticketsAvailability[0].price;
    }
    return 0;
  });
};
