import * as React from "react";

import { useCallback, useContext, useEffect, useState} from "react";
import {useEventListener} from "./form/hooks";
import {parseInput,toPersonData} from './form/utils';

import AppContext from "../AppContext";

import './footer/FooterContainer.css';
import {PersonAccordionData} from "../Constants";

import "./form/PersonField.css";


type Props = {
    formId: string,
};

export const PersonField = (props : Props) => {
    const {formId} = props;
    const context = useContext(AppContext);
    const [text, setText] = useState();
    const textAreaChange = useCallback(
    ( event: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log('TEXT AREA CHANGE');
        if(event && event.target){
            setText(event.target.value);
        }
      }, [setText]
    );
    useEventListener('change', textAreaChange);
    useEffect(() => {
        if(!context.isSubmitButtonClicked) return;
        const inputArr = parseInput(text) || [];
        for(let i =0 ;i < inputArr.length; i++) {
            const currentData = context.data;
            let currentId;
            if(currentData && currentData[currentData.length-1]){
                currentId = currentData[currentData.length-1].id || 0;
            }
            const newData: PersonAccordionData | undefined = toPersonData(inputArr[i]);
            if(newData !== undefined){
                newData.id = currentId ? currentId + 1 : 0;
                context.data.push(newData);
                // @ts-ignore
                context.updateData(context.data);
            }
        }
        context.setSubmitClickValue(false);
    }, [context.isSubmitButtonClicked, text, setText]);
    return (
        <div className="person-field">
            <textarea data-cy="new-person-textarea" name="comment" form={formId} placeholder="Enter text here..."/>
        </div>
    );
};
