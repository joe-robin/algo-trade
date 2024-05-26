/**
 * This is the interval value in which the get trade
 * all trade api is exected until the certain time
 *  limit is reached
 */
export const MIN_INTERVAL = 500 // Milliseconds
export const MAX_INTERVAL = 4 * 60 * 60 * 1000 // Hours * Minutes * Seconds * Milliseconds

/**
 * The above mentioned time limit.
 * How long will the get all trade api will get executed
 */
export const MAX_LIMIT = 60 // Minutes

export const BASE_URL = process.env.DHAN_URL
export const TOKEN = process.env.TOKEN
