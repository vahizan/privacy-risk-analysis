import React from "react";
import {shallow} from "enzyme";
import LoanRepaymentsTable from "../LoanRepaymentsTable";
import PropTypes from "prop-types";
import {currentDate, LoanType} from "../../utils/constants";
import {repaymentDates} from "../../utils/calculator";

describe('LoanRepaymentsTable', () => {
    let wrapper :any ;
    let instance:any;
    let keyPressStub = jest.fn();
    beforeEach(() => {
        const requiredProps = {
            amountRequested: 10000,
            duration: 4,
            interestRate: 3,
            type: LoanType.RCF
        };
        wrapper = shallow(<LoanRepaymentsTable {...requiredProps} />);
        instance = wrapper.instance();
    });
    it('should renderdiv with correct data-cy attrs', () => {
        expect(wrapper.find('[data-cy="loan-repayments-table-container"]')).toHaveLength(1);
        expect(wrapper.find('[data-cy="table-title"]')).toHaveLength(1);
    });

    it('should render table title', () => {

        expect(wrapper.find('[data-cy="table-title"]')).toHaveLength(1);
    });
    it('should not render table title when props have invalid values', () => {
        wrapper.setProps({
            amountRequested: -10000,
        });
        expect(wrapper.find('[data-cy="table-title"]')).toHaveLength(0);
    });

    it('should render a table with correct number of header columns', () => {

        expect(wrapper.find('table th')).toHaveLength(4);
    });
    it('should not render a table when required values are invalid', () => {
        wrapper.setProps({
            amountRequested: -1,
        });
        expect(wrapper.find('table th')).toHaveLength(0);
    });

    describe('func createInterestVals', () => {
        it('should create correct RCF array of interest payments', () => {
            const expectedObject: Array<number> = [300, 225, 150, 75];
            expect(instance.createInterestVals(2500)).toEqual(expectedObject);
        });
        it('should create correct BL array of interest payments ', () => {
            wrapper.setProps({
                type: LoanType.BL
            });
            const expectedObject: Array<number> = [1300, 225, 150, 75];
            expect(instance.createInterestVals(2500)).toEqual(expectedObject);
        });
    });
    describe('func createRepaymentVals', () => {
        it('should create correct RCF array of repayments', () => {
            const expectedObject: Array<number> =  [2800, 2725, 2650, 2575];
            expect(instance.createRepaymentVals(2500)).toEqual(expectedObject);
        });
        it('should create correct BL array of repayments ', () => {
            wrapper.setProps({
                type: LoanType.BL
            });
            const expectedObject: Array<number> = [3800, 2725, 2650, 2575];
            expect(instance.createRepaymentVals(2500)).toEqual(expectedObject);
        });
    });
    describe('func generateTableData', () => {
        it('should create correct RCF data object, needed to fill the table', () => {
            const expectedObject: object = {
                repaymentMonths: repaymentDates(currentDate,4),
                principalVal: 2500,
                interestVals: [300, 225, 150, 75],
                totalRepaymentVals: [2800, 2725, 2650, 2575]
            };
            expect(instance.generateTableData()).toEqual(expectedObject);
        });
        it('should create correct BL data object, needed to fill the table', () => {
            wrapper.setProps({
                type: LoanType.BL
            });
            const expectedObject: object = {
                repaymentMonths: repaymentDates(currentDate,4),
                principalVal: 2500,
                interestVals: [1300, 225, 150, 75],
                totalRepaymentVals: [3800, 2725, 2650, 2575]
            };
            expect(instance.generateTableData()).toEqual(expectedObject);
        });
    });

    it('should render correct data in all columns', () => {
        wrapper.setProps({
            title: 'title',
        });
        expect(wrapper.find('table tr')).toHaveLength(6);
    });

    it('should not render any data when props are invalid', () => {
        wrapper.setProps({
            amountRequested: -10000,
            title: 'title',
        });
        expect(wrapper.find('table tr')).toHaveLength(0);
    });
});
