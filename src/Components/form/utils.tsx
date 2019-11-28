import {PersonAccordionData} from "../../Constants";

export const MAX_AGE_COUNT = 111;
export const MAX_RISK_PERCENTAGE = 100;
export const removeStringPadding = (value: string) => value.replace(/[\s]+/g,' ').trim();
const validatePersonalDataString = (personData: string) : Array<string> => {
    const regexPattern = /^([a-zA-Z\s]+)[\s]([A-Z]{2})[\s]([\d]{2}\/[\d]{2}\/[\d]{4}|[\d]{1,3})[\s]([\d].[\d]+)$/mg;
    const match = regexPattern.exec(personData);
    return (match) ? match : [];
};
const toPercentage = (value: string) => {
    const num = parseFloat(value);
    if(!num){
        return 0;
    }
    return num*100;
};
const isDateString = (date: string) => {
    const regexPattern = /[\d]{2}\/[\d]{2}\/[\d]{4}/g;
    const match = regexPattern.exec(date);
    return match !== null;
};
const convertDateToAge = (date: string): number => {
    const today = new Date(Date.now());
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
};
export const parseInput = (inputData: string) : Array<string> | undefined => {
    if(!inputData){
        return;
    }
    return inputData.split('\n');
};
export const toPersonData = (submittedValue: string): PersonAccordionData | undefined =>{
    if(!submittedValue){
        return;
    }
    const cleanedString = removeStringPadding(submittedValue);
    const personDataMatches = validatePersonalDataString(cleanedString);
    if(!personDataMatches || personDataMatches.length < 5) {
        return;
    }
    let ageVal = parseInt(personDataMatches[3]);
    if(isDateString(personDataMatches[3])){
        ageVal = convertDateToAge(personDataMatches[3]);
    }
    if(ageVal > MAX_AGE_COUNT) {
        return;
    }
    let riskPercentage = toPercentage(personDataMatches[4]);
    if(riskPercentage > MAX_RISK_PERCENTAGE){
        return;
    }
    return {
        id: -1,
        first_name: personDataMatches[1],
        last_name: '',
        age: ageVal,
        nationality: personDataMatches[2],
        risk_percentage: riskPercentage,
    };
};

