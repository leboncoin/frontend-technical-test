const Message = ({ owned, body }) => {
  return (
    <div
      className={`border border-1 rounded-full p-4 m-2 flex items-center space-x-3 md:space-x-5 hover:border-lbc  ${
        owned ? 'bg-sky-500/100 self-end' : 'bg-slate-200 self-start'
      }`}
    >
      {body}
    </div>
  )
}

export default Message
