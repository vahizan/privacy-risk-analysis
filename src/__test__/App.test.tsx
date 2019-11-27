import React from 'react';
import {shallow} from "enzyme";
import App from '../App';
import {HeaderStatistic} from "../Components/header/HeaderStatistic";
import {FooterContainer} from "../Components/FooterContainer";
import {AccordionList} from "../Components/AccordionList";
import {PersonField} from "../Components/PersonField";

describe('App', () => {
    let wrapper :any ;
    let instance:any;
    beforeEach(() => {
        const requiredProps = {

        };
        wrapper = shallow(<App {...requiredProps} />);
        instance = wrapper.instance();
    });
    it('should render a header element', () => {
        expect(wrapper.find('header')).toHaveLength(1);
    });

    it('should render HeaderStatistic', () => {
        expect(wrapper.find(HeaderStatistic)).toHaveLength(1);
    });

    it('should render AccordionList', () => {
        expect(wrapper.find(AccordionList)).toHaveLength(1);
    });

    it('should render FooterContainer', () => {
        expect(wrapper.find(FooterContainer)).toHaveLength(1);
    });

    it('should render PersonField', () => {
        expect(wrapper.find(PersonField)).toHaveLength(1);
    });

    it('should render button', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });
});
