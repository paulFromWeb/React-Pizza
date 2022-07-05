import { getItemsfromLS } from '../../../utils/getItemsfromLS';
import { RootState } from './../store';
import { createSlice } from '@reduxjs/toolkit'
import { totalCount } from '../../../utils/calcTotalCountLS';
import { totalPrice } from '../../../utils/calcTotalPriceLS';

export type CartItems = {
    title: string, price: number, imageUrl: string, size: number, type: string, id: string, count: number
}

interface CartSliceState {
    totalPrice: number,
    items: CartItems[],
    totalCount: number
}
const initialState: CartSliceState = {
    totalPrice: totalPrice(getItemsfromLS()),
    items: getItemsfromLS(),
    totalCount: totalCount(getItemsfromLS())

}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems: (state, action) => {
            const findItem = state.items.find(obj => {
                if (obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size) {
                    return obj
                }
            })
            if (findItem) {
                findItem.count++
                state.totalPrice += findItem.price
                state.totalCount++
            } else {
                state.items.push({ ...action.payload, count: 1 });
                state.totalPrice += action.payload.price;
                state.totalCount++
            }

        },
        minusItem: (state, action) => {
            const findItemRemove = state.items.find(obj => {
                if (obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size) {
                    return obj
                }
            })
            if (findItemRemove) {
                findItemRemove.count--
                state.totalPrice -= findItemRemove.price
                state.totalCount--
            }
        },
        removeItems: (state, action) => {
            state.items = state.items.filter((item) => {
                if (item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size) {
                    state.totalPrice -= (item.price * item.count);
                    state.totalCount -= item.count

                } else {
                    return item
                }
            })
        },
        clearItems: (state) => {
            state.items = [];
            state.totalCount = 0;
            state.totalPrice = 0
        },
    },
})
export const cartSelector = ((state: RootState) => state.cart)
export const cartItemsSelector = ((state: RootState) => state.cart.items)
export const { addItems, removeItems, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer