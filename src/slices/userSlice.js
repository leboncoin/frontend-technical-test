import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: undefined,
  isConnected: false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setConnectedUser: (state, action) => {
      state.user = action.payload
      state.isConnected = true
    },
    disconnectUser: (state) => {
      state.user = undefined
      state.isConnected = false
    }
  }
})

export default userSlice
