import { createSlice, createAsyncThunk, Slice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type PizzaItem = {
    category: number
    id: string
    imageUrl: string
    price: number
    rating: number
    sizes: number[]
    title: string
    types: number[]
}
enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error"
}
interface PizzaSliceState {
    items: PizzaItem[]
    status: Status
}
const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}
type FetchParams = {
    activePage: number, checked: { title: string, searchTitle: string }, searchValue: string, activeCategory: number
}
export const fetchPizza = createAsyncThunk('pizza/fetchPizza', async (params: FetchParams) => {
    const { activePage, checked, searchValue, activeCategory } = params
    const searchTitle = checked.searchTitle.replace("-", "")
    const valueActiveCategory = activeCategory > 0 ? `category=` + `${activeCategory}` : ""
    const { data } = await axios.get<PizzaItem[]>(`https://62ac2c6a9fa81d00a7ab3000.mockapi.io/items?page=${activePage}&limit=4&sortBy=${searchTitle}&order=${checked.searchTitle.includes("-") ? "desc" : 'asc'}&${valueActiveCategory}&${searchValue ? `${'search=' + searchValue} ` : ""}`)

    return data
}
)
export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        addItems: (state, action: PayloadAction<PizzaItem[]>) => {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizza.pending, state => {
            state.status = Status.LOADING
            state.items = []
        });
        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.items = action.payload
        });
        builder.addCase(fetchPizza.rejected, (state) => {
            state.status = Status.ERROR
            state.items = []
        });

    },
});

export const { addItems } = pizzaSlice.actions

export default pizzaSlice.reducer