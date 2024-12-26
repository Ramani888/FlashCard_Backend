"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneMonthAfterDate = void 0;
const getOneMonthAfterDate = (currentDate) => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
};
exports.getOneMonthAfterDate = getOneMonthAfterDate;
