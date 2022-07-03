export const totalCount = (items: any) => {
    const total = items.map((item: any) => {
        return item.count
    }).reduce(function (sum: number, current: number) {
        return sum + current;
    }, 0);
    return total
}