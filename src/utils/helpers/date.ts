export const getOneMonthAfterDate = (currentDate: Date) => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
}