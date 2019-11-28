import * as React from "react";

import './footer/FooterContainer.css';
import {PersonAccordionInterface} from "./accordion/Constants";
import {useContext, useEffect, useState} from "react";
import {AccordionContext} from "./accordion/Context";

type Props = {
    data: PersonAccordionInterface
};

export const PersonAccordion = (props : Props) => {
    const { id, first_name, last_name, age, nationality, risk_percentage } = props.data;
    const [isVisible, updateVisibility] = useState(false);
    const context = useContext(AccordionContext);
    useEffect(() => {
        updateVisibility(true);
    }, [context.id] );
    const toggleVisibility = () => {
        context.setId(id);
        updateVisibility(!isVisible);
    };

    return (
        <div data-cy-accordion="person-accordion" data-cy={`person-accordion-${id}`} key={id} id={`person-accordion-${id}`} className="person-accordion">
            <div className="person-accordion__header">
                <div className="person-accordion__header__title">
                    {`${first_name} ${last_name}`}
                </div>
                <div onClick={toggleVisibility} data-cy="accordion-toggle" className="person-accordion__header__toggle">
                    {(isVisible && context.id === id)
                        ? <span data-cy="accordion-hide">-</span>
                        : <span data-cy="accordion-show">+</span>
                    }
                </div>
            </div>

            { isVisible && context.id === id && (
                <div data-cy="accordion-content" className="person-accordion__content">
                    <div className="person-accordion__content__age">
                        {age}
                    </div>
                    <div className="person-accordion__content__nationality">
                        {nationality}
                    </div>
                    <div className="person-accordion__content__privacy-risk">
                        {risk_percentage}%
                    </div>
                </div>
            )}
        </div>
    );
};
