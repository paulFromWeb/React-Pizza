import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import cart from './slices/cartSlice'
import pizza from './slices/pizzaSlice'
import { useDispatch } from 'react-redux'

const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart,
        pizza
    },
})
export default store;
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch