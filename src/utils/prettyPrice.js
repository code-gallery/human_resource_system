/** :: number -> string */
const prettyPrice = price => `£${(price / 100).toFixed(2)}`

export default prettyPrice
