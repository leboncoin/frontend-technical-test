import { FC } from 'react'
import ConversationSender from './ConversationSender/ConversationSender'
import SendButton from './SendButton'

type DrawerProps = {
  onSend: (newConversation) => void
}

const Drawer: FC<DrawerProps> = ({ children, onSend }) => {
  return (
    <div className="rounded-lg shadow bg-base-200 drawer drawer-end">
      <input
        aria-hidden="true"
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
      ></input>
      <div className="flex flex-col items-center justify-center drawer-content">
        {children}
        <SendButton
          className="fixed mb-10"
          htmlFor="my-drawer-4"
        ></SendButton>
      </div>
      <aside className="drawer-side">
        <label
          aria-hidden="true"
          htmlFor="my-drawer-4"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 overflow-y-auto w-4/5 bg-base-100 text-base-content">
          <ConversationSender onSend={onSend}></ConversationSender>
        </div>
      </aside>
    </div>
  )
}
export default Drawer
