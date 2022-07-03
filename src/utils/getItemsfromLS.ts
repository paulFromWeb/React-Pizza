export const getItemsfromLS = () => {
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) : []
}