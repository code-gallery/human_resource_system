import React from 'react'
import moment from 'moment';

export function gapArray(dateArray, addedYear) {

  let gapArray = []
  let start_date = new Date()
  start_date.setFullYear(start_date.getFullYear() - addedYear)
  start_date = start_date.getTime()
  let end_date = new Date().getTime()

  while (dateArray.length) {
    if (start_date >= end_date) {
      break
    }
    let result = dateArray.reduce((res, obj) => {
      return (obj.from < res.from) ? obj : res;
    })
    if (start_date < result.from) {
      gapArray.push({
        from: new Date(start_date),
        to: moment(new Date(result.from)).subtract('days', 1).toDate()
      })
    }
    dateArray.splice(dateArray.findIndex(obj => obj.from === result.from && obj.to === result.to), 1)
    const toDate = new Date(result.to)
    toDate.setDate(toDate.getDate() + 1)
    start_date = toDate.getTime()
  }
  if (start_date < end_date) {
    gapArray.push({
      from: new Date(start_date),
      to: new Date(end_date)
    })
  }
  return gapArray
}