import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import './NumberInput.css';

class NumberInput extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        keyPress: PropTypes.func,
        label: PropTypes.string,
        additionalLabel: PropTypes.string,
    };

    static defaultProps = {
        keyPress: () => {},
        label: '',
        additionalLabel: '',
    };

    render() {
        // @ts-ignore
        const {keyPress,label, additionalLabel, id} = this.props;
        return (
            <div className="number-input" data-cy={`input-${id}`}>
                <label htmlFor={id}>{label}</label>
                <input id={id} type="number" onInput={keyPress}/>
                <label data-cy="additionalLabel">{additionalLabel}</label>
            </div>
        );
    };
}

export default NumberInput;
