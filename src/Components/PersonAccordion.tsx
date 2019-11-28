import * as React from "react";

import './footer/FooterContainer.css';
import {PersonAccordionData} from "../Constants";
import {useContext, useEffect, useState} from "react";

import {AccordionContext} from "./accordion/Context";

import './accordion/PersonAccordion.css';

type Props = {
    data: PersonAccordionData
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
                        <span>Age: </span><span> {age}</span>
                    </div>
                    <div className="person-accordion__content__nationality">
                        <span>Nationality: </span><span> {nationality}</span>
                    </div>
                    <div className="person-accordion__content__privacy-risk">
                        <span>Risk Percentage: </span><span> {risk_percentage}% </span>
                    </div>
                </div>
            )}
        </div>
    );
};
