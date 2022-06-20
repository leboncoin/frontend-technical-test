import moment from "moment";

export const formatDate = (timestamp:number) => {
  return (
    moment.unix(timestamp).format('LL')
  )
}

export const fromNow = (timestamp:number) => {
    console.log(timestamp) 
    return (
      moment.unix(timestamp).fromNow()
    )
  }
