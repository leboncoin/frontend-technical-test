import type { FC } from 'react'
import ActionButton from './ActionButton'

const Drawer: FC = ({ children }) => {
  return (
    <div className="rounded-lg shadow bg-base-200 drawer drawer-end">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
      ></input>
      <div className="flex flex-col items-center justify-center drawer-content">
        {children}
        <ActionButton
          className="fixed mb-10"
          htmlFor="my-drawer-4"
        ></ActionButton>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 overflow-y-auto w-4/5 bg-base-100 text-base-content">
          <div className="md:flex md:items-center mb-6">
            <label className="label block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4">
              <span className="label-text">
                Trouve un(e) pote ...
              </span>
            </label>
            <input
              type="text"
              autoComplete="off"
              placeholder="identifiant"
              className="input input-primary mr-4"
            ></input>
            <label className="label block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4">
              <span className="label-text">
                ... et commence ton chat !
              </span>
            </label>
            <input
              type="text"
              autoComplete="off"
              placeholder="message"
              className="input input-primary mr-4 w-3/4"
            ></input>
            <ActionButton className="mt-2"></ActionButton>
          </div>
        </ul>
      </div>
    </div>
  )
}
export default Drawer
