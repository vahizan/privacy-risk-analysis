import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import {BL, currentDate, loanRepaymentsHeaders, LoanType, LoanRepaymentsData, TOTAL_TEXT} from "../utils/constants";
import {applyFees, applyInterest, principal, repaymentDates, isAnyBelowZero} from "../utils/calculator";

class LoanRepaymentsTable extends PureComponent {
    static propTypes = {
        amountRequested: PropTypes.number,
        duration: PropTypes.number,
        interestRate: PropTypes.number,
        title: PropTypes.string,
        type: PropTypes.oneOf(Object.values(LoanType)),
    };

    static defaultProps = {
        amountRequested: -1,
        duration: -1,
        interestRate: -1,
        title: '',
    };
    populateHeaders = () => {
        return loanRepaymentsHeaders.map((header, index) => {
            let headerVal = `${header}-col`;
            return <th key={index} data-cy={headerVal}>{header}</th>
        });
    };
    amendFirstMonthFees = (): number => {
        //@ts-ignore
        const {amountRequested, type, interestRate} = this.props;
        if (type === LoanType.BL) {
            return applyFees(amountRequested, BL.FIRST_MONTH_FEE, interestRate);
        }
        return applyInterest(amountRequested,interestRate);
    };
    createInterestVals = (principal: number) :Array<number> => {
        //@ts-ignore
        const {amountRequested, duration, interestRate} = this.props;
        let interestArr : Array<number> = [];
        let amountLeft :number = amountRequested;
        for(let i = 0; i < duration; i++){
            if(i == 0) {
               interestArr.push(this.amendFirstMonthFees());
            }else {
               interestArr.push(applyInterest(amountLeft,interestRate));
            }
            amountLeft -= principal;
        }
        return interestArr;
    };
    createRepaymentVals = (principal: number) :Array<number> => {
        const interestVals = this.createInterestVals(principal);
        let repaymentVals : Array<number> = [];
        interestVals.forEach((interest) => {
            repaymentVals.push((interest+principal));
        });
        return repaymentVals;
    };

    totalValue = (vals: Array<number>) :number => {
        if(vals && vals.length > 0) {
            return vals.reduce((accumulator, currentValue) => accumulator + currentValue);
        }
        return 0;
    };


    generateTableData = () :LoanRepaymentsData => {
        //@ts-ignore
        const {amountRequested, duration} = this.props;
        const monthlyPayments = repaymentDates( currentDate, duration);
        const monthlyAmount = principal(amountRequested, duration);
        return {
            repaymentMonths: monthlyPayments,
            principalVal: monthlyAmount,
            interestVals: this.createInterestVals(monthlyAmount),
            totalRepaymentVals: this.createRepaymentVals(monthlyAmount)
        };
    };

    populateTable = (tableData : LoanRepaymentsData) :any => {
        return tableData.repaymentMonths.map((date, index) => {
            const principalVal = tableData.principalVal || "-";
            const interestVal = tableData.interestVals[index] || "-";
            const totalRepayment = tableData.totalRepaymentVals[index] || "-";
            return (
                <tr key={index}>
                    <td>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</td>
                    <td>{principalVal}</td>
                    <td>{interestVal}</td>
                    <td>{totalRepayment}</td>
                </tr>
            );
        });
    };

    render() {
        // @ts-ignore
        const {amountRequested, duration, interestRate, title} = this.props;
        if(!isAnyBelowZero([amountRequested,duration,interestRate])) {
            const tableData = this.generateTableData();
            const interestTotal = this.totalValue(tableData.interestVals) || "-";
            const repaymentTotal = this.totalValue(tableData.totalRepaymentVals) || "-";
            return (
                <div data-cy="loan-repayments-table-container">
                    <table>
                        <tbody>
                        <tr>
                            {this.populateHeaders()}
                        </tr>
                        {this.populateTable(tableData)}
                        <tr>
                            <td>{TOTAL_TEXT}</td>
                            <td>{amountRequested}</td>
                            <td>{interestTotal}</td>
                            <td>{repaymentTotal}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div data-cy="table-title">
                        {title}
                    </div>
                </div>
            );
        }
        return (
            <div>LOADING</div>
        );
    };
}

export default LoanRepaymentsTable;
