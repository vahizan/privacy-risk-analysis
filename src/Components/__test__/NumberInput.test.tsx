import React from "react";
import {shallow} from "enzyme";
import NumberInput from "../NumberInput";

describe('NumberInput', () => {
    let wrapper :any ;
    let keyPressStub = jest.fn();
    beforeEach(() => {
        const requiredProps = {
           id: 'id',
           keyPress: keyPressStub,
        };
        wrapper = shallow(<NumberInput {...requiredProps} />);
    });
   it('should div with data-cy attr', () => {
       wrapper.setProps({
          id: 'coolId',
       });
       expect(wrapper.find('div')).toHaveLength(1);
       expect(wrapper.find('[data-cy="input-coolId"]')).toHaveLength(1);
   });
   it('should render label element', () => {
       wrapper.setProps({
           id: 'coolId',
           additionalLabel: 'ADDITIONAL',
       });
       expect(wrapper.find('label')).toHaveLength(2);
       expect(wrapper.find('label').find('[htmlFor="coolId"]')).toHaveLength(1);
       expect(wrapper.find('[data-cy="additionalLabel"]')).toHaveLength(1);
   });

});
