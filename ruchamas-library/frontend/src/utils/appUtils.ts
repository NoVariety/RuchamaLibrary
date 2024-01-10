const getRandomPrice = (): number => {
  const MAX_BOOK_PRICE = 20
  const MIN_BOOK_PRICE = 3
  return (
    Math.floor(Math.random() * (MAX_BOOK_PRICE - MIN_BOOK_PRICE + 0.99)) +
    MIN_BOOK_PRICE
  )
}

export { getRandomPrice }
