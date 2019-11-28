import * as React from "react";
import './HeaderStatistic.css';
type Props = {
    title: string,
    statValue: number,
};
export const HeaderStatistic = (props : Props) => {
    return (
        <div className="header-statistic">
            <h1 className="header-statistic__value"> {props.statValue} </h1>
            <h1>{props.title}</h1>
        </div>
    );
};
