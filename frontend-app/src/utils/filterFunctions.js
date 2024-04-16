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
  // creating a new array for immutability
  return [...shows].sort((a, b) => {
    /*
      a.session.flatMap(s => s) => [{date: "", ticketsAvailability: [{price: 55, remain: 1 }, {}]}, {}]
      a.session.flatMap(s => s.ticketsAvailability.map(t => t.price)) => [55, 60, 65, 70]
      Math.min(...a.session.flatMap(s => s.ticketsAvailability.map(t => t.price))) => 55
      getting the minimum price from all tickets in a session and sorting based on that
    */
    const minPriceA = Math.min(...a.session.flatMap(s => s.ticketsAvailability.map(t => t.price)));
    const minPriceB = Math.min(...b.session.flatMap(s => s.ticketsAvailability.map(t => t.price)));
    return sortOrder === 'low-high' ? minPriceA - minPriceB : minPriceB - minPriceA;
  });
};
