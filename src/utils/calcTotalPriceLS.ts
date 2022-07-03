import { CartItems } from './../components/redux/slices/cartSlice';
export const totalPrice = (items: CartItems[]) => {
    const total = items.map((item: any) => {
        if (item.count > 1) {
            return item.price * item.count
        } else {
            return item.price
        }

    }).reduce(function (sum: number, current: number) {
        return sum + current;
    }, 0);
    return total
}