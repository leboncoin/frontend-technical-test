import moment from "moment";

export const formatDate = (timestamp:number) => {
  return (
    moment.unix(timestamp).format('LLL')
  )
}

export const fromNow = (timestamp:number) => {
    return (
      moment.unix(timestamp).fromNow()
    )
  }
