export const repaymentDates =  (startingDate: Date, numOfMonths: number) : Array<Date> =>  {
    let consecMonths: Array<Date> = [];

    for(let i=0; i<numOfMonths; i++){
        let newMonth = startingDate.getMonth() + i + 1;
        let newDate = new Date(startingDate);
        newDate.setMonth(newMonth);
        consecMonths.push(newDate);
    }
    return consecMonths;
};
export const isAnyBelowZero = (values :Array<number>) :boolean =>  {
    for(let i =0 ;i< values.length;i++){
        if(values[i] < 0){
            return true;
        }
    }
    return false;
};

export const amountLeft =  (totalAmount: number, amountPaid: number): number =>  {
    return totalAmount - amountPaid;
};

export const principal =  (totalLoan: number, numOfMonths: number) : number =>  {
    if(numOfMonths > totalLoan){
        return -1;
    }
    const principalVal = totalLoan/numOfMonths;
    return Math.round(principalVal);
};

export const applyInterest =  (amountLeft: number, interest: number) : number =>  {
    const rate = interest/100;
    return Math.round(amountLeft*rate);
};

export const applyFees =  (totalLoan: number, percentageFee: number, interest: number) : number =>  {
    return Math.round((applyInterest(totalLoan,percentageFee) + applyInterest(totalLoan,interest)));
};
