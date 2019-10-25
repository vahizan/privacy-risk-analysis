// eslint-disable-next-line import/no-unresolved

import {repaymentDates, amountLeft, principal, applyInterest, applyFees, isAnyBelowZero} from '../calculator';
import {defaultDate} from '../../stubs/date_stubs';

describe('calculator', () => {
    let totalAmount: number = 10000;
    let interest: number = 3;
    describe('isAnyBelowZero function', () => {
        //the starting month will be current month
        it('should return true when a single value is negative', () => {
            expect(isAnyBelowZero([1,-2,32,44,123,22])).toEqual(true);
        });
        it('should return true when a single value is negative', () => {
            expect(isAnyBelowZero([1,-2,-39,-121])).toEqual(true);
        });
        it('should return false when all values are positive ', () => {
            expect(isAnyBelowZero([1,2,39,121])).toEqual(false);
        });
    });

    describe('repaymentDates function', () => {
        //the starting month will be current month
        it('should return array of dates with a length of 3', () => {
            expect(repaymentDates(defaultDate, 3)).toHaveLength(3);
        });
        it('should return correct array of dates for stubbed Date value', () => {
            const actualArray: Array<Date> = repaymentDates(defaultDate, 3);
            const expectedArray = [ new Date(2019,11,24),  new Date(2019,12,24), new Date(2020,1,24)];
            expect(actualArray).toHaveLength(3);
            expect(actualArray).toEqual(expectedArray);
        });
        it('should return correct array of dates for actual Date value', () => {
            const actualArray: Array<Date> = repaymentDates(defaultDate, 10);
            const expectedArray = [
                new Date(defaultDate.getFullYear(), defaultDate.getMonth()+1,defaultDate.getDate()),
                new Date(defaultDate.getFullYear(), defaultDate.getMonth()+2,defaultDate.getDate()),
                new Date(defaultDate.getFullYear(), defaultDate.getMonth()+3,defaultDate.getDate()),
                new Date(defaultDate.getFullYear(), defaultDate.getMonth()+4,defaultDate.getDate()),
                new Date(defaultDate.getFullYear(), defaultDate.getMonth()+5,defaultDate.getDate()),
                new Date(defaultDate.getFullYear(), defaultDate.getMonth()+6,defaultDate.getDate()),
                new Date(defaultDate.getFullYear(), defaultDate.getMonth()+7,defaultDate.getDate()),
                new Date(defaultDate.getFullYear(), defaultDate.getMonth()+8,defaultDate.getDate()),
                new Date(defaultDate.getFullYear(), defaultDate.getMonth()+9,defaultDate.getDate()),
                new Date(defaultDate.getFullYear(), defaultDate.getMonth()+10,defaultDate.getDate()),
            ];
            expect(actualArray).toHaveLength(10);
            expect(actualArray).toEqual(expectedArray);
        });
        // it('should return correct array of dates for current Date value', () => {
        //     const actualArray: Array<Date> = repaymentDates(new Date(Date.now()), 3);
        //     const expectedArray = consecMonths(new Date(Date.now()),3);
        //     expect(actualArray).toHaveLength(3);
        //     expect(actualArray).toEqual(expectedArray);
        // });
    });
    describe('amountLeft function', () => {
        let amountPaid: number = 2500;
        it('return correct remaining amount', () => {
            expect(amountLeft(totalAmount,amountPaid)).toEqual(7500);
        });
        it('should return 0 if both argument values are equal', () => {
            expect(amountLeft(amountPaid,amountPaid)).toEqual(0);
            expect(amountLeft(totalAmount,totalAmount)).toEqual(0);
        });
    });


    describe('principal function', () => {
        let months :number = 5;
        it('should return the correct number', () => {
            expect(principal(totalAmount,months)).toEqual(totalAmount/months);
        });
        it('should return the nearest whole number', () => {
            months = 122;
            expect(principal(totalAmount,months)).toEqual(82);
        });
        it('should return 1', () => {
            months = 10000;
            expect(principal(totalAmount,months)).toEqual(1);
        });
        it('should return -1 when months are greater than totalAmount', () => {
            months = 100000;
            expect(principal(totalAmount,months)).toEqual(-1);
        });
        it('should return -1 when months are greater than totalAmount', () => {
            months = 100000;
            expect(principal(totalAmount,months)).toEqual(-1);
        });
    });
    describe('applyInterest function', () => {
        it('should return the correct amount after interest', () => {
            expect(applyInterest(totalAmount,interest)).toEqual(300);
            expect(applyInterest(7500,interest)).toEqual(225);
            expect(applyInterest(5000,interest)).toEqual(150);
            expect(applyInterest(2500,interest)).toEqual(75);
            expect(applyInterest(0,interest)).toEqual(0);
        });
    });
    describe('applyFees function', () => {
        it('should return correct amount', () => {
            expect(applyFees(totalAmount,10, interest)).toEqual(1300);
            expect(applyFees(totalAmount,15, interest)).toEqual(1800);
            expect(applyFees(totalAmount,15, interest)).toEqual(1800);
        });

    });
});
