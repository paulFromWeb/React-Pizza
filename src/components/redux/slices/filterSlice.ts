import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type Categories = "Все" | "Мясные" | "Вегетарианская" | "Гриль" | "Острые" | "Закрытые"
type SortValue = {
    title: "популярности⬇" | "популярности⬆" | "цене⬇" | "цене⬆" | "алфавиту⬇" | "алфавиту⬆",
    searchTitle: "-rating" | "rating" | "-price" | "price" | "-title" | "title"
}
interface FilterState {
    searchValue: string,
    categories: Categories[],
    activeCategory: number,
    activePage: number,
    checked: SortValue,
    sortValue: SortValue[]
}

const initialState: FilterState = {
    searchValue: "",
    categories: ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"],
    activeCategory: 0,
    activePage: 1,
    checked: { title: "популярности⬇", searchTitle: "-rating" },
    sortValue: [
        { title: "популярности⬇", searchTitle: "-rating" },
        { title: "популярности⬆", searchTitle: "rating" },
        { title: "цене⬇", searchTitle: "-price" },
        { title: "цене⬆", searchTitle: "price" },
        { title: "алфавиту⬇", searchTitle: "-title" },
        { title: "алфавиту⬆", searchTitle: "title" },
    ]
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        setActiveCategory: (state, action: PayloadAction<number>) => {
            state.activeCategory = action.payload
        },
        setChecked: (state, action: PayloadAction<SortValue>) => {
            state.checked = action.payload
        },
        setActivePage: (state, action: PayloadAction<number>) => {
            state.activePage = action.payload
        },
        setFilters(state, action) {
            console.log(action.payload, "this");
            state.activePage = Number(action.payload.activePage);
            state.activeCategory = Number(action.payload.activeCategory);
            state.checked = action.payload.checked;
        },
    },
})

export const { setActiveCategory, setChecked, setActivePage, setFilters, setSearchValue } = filterSlice.actions
export const activePageSelector = ((state: RootState) => state.filter.activePage)
export const filterSelector = ((state: RootState) => state.filter)
export default filterSlice.reducer