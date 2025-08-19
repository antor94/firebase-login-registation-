import { configureStore } from '@reduxjs/toolkit'
import  userSlice from './slice/UserSlice'

export default configureStore({
  reducer: { 
   currentUserId: userSlice 
  },
})