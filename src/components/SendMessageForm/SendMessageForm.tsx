import { css } from "@emotion/css";

const inputStyles = css`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
`

const SendMessageForm = () => {
  return (
    <div>
      <input type="text" placeholder="Send message, not implemented yet" className={inputStyles} />
    </div>
  )
}

export default SendMessageForm;