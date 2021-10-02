import type { FC } from 'react'
import '../styles/Home.module.css'

const Home: FC = () => {
  return (
    <>
      <ul className=" overflow-auto">
        <h2 className="ml-2 mb-2 text-gray-600 text-lg my-2">
          Chats
        </h2>
        <li>
          <a className="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt="username"
            />
            <div className="w-full pb-2">
              <div className="flex justify-between">
                <span className="block ml-2 font-semibold text-base text-gray-600 ">
                  Jhon C
                </span>
                <span className="block ml-2 text-sm text-gray-600">
                  5 minutes
                </span>
              </div>
              <span className="block ml-2 text-sm text-gray-600">
                Hello world!!
              </span>
            </div>
          </a>
          <a className="bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt="username"
            />
            <div className="w-full pb-2">
              <div className="flex justify-between">
                <span className="block ml-2 font-semibold text-base text-gray-600 ">
                  Eduard
                </span>
                <span className="block ml-2 text-sm text-gray-600">
                  15 minutes
                </span>
              </div>
              <span className="block ml-2 text-sm text-gray-600">
                I am fine
              </span>
            </div>
          </a>
          <a className="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://images.pexels.com/photos/6238133/pexels-photo-6238133.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt="username"
            />
            <div className="w-full pb-2">
              <div className="flex justify-between">
                <span className="block ml-2 font-semibold text-base text-gray-600 ">
                  Celia
                </span>
                <span className="block ml-2 text-sm text-gray-600">
                  1 hour
                </span>
              </div>
              <span className="block ml-2 text-sm text-gray-600">
                Last message
              </span>
            </div>
          </a>
        </li>
      </ul>
    </>
  )
}

export default Home
