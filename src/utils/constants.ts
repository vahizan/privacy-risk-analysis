export const loanRepaymentsHeaders : Array<string> = [
    'Repayment date','Principal','Interest','Total Repayment'
];
export const currentDate: Date = new Date(Date.now());
export const TOTAL_TEXT = 'Total';

export enum LoanType {
    RCF = 'rcf',
    BL = 'bl'
}

export enum InputType {
    RCF = 'rcf',
    BL = 'bl',
    TOTAL_AMOUNT= 'requested_amount',
    DURATION='duration',
}

export const BL = {
    TITLE: 'Business Loan',
    FIRST_MONTH_FEE: 10,
};
export const RCF = {
    TITLE: 'Revolving Credit Facility',
};

export interface LoanRepaymentsData {
    repaymentMonths: Array<Date>;
    principalVal: number;
    interestVals: Array<number>;
    totalRepaymentVals: Array<number>;
};
