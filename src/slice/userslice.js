import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    value: JSON.parse(localStorage.getItem('userInfo')) || null,
  },
  reducers: {
    userAmount: (state, action) => {
      state.value = action.payload
    },
  },
})


export const {userAmount} = userSlice.actions

export default userSlice.reducer