// @ts-ignore
import React, {PureComponent} from 'react';
import LoanRepaymentsTable from "./Components/LoanRepaymentsTable";
import './App.css';
import NumberInput from "./Components/NumberInput";
import {BL,RCF, InputType, LoanType} from "./utils/constants";
import PropTypes from "prop-types";
import {isAnyBelowZero} from "./utils/calculator";

//import PropTypes from "prop-types";
class App extends PureComponent{
  constructor(props: Readonly<{}>) {
    super(props);
  }
  state = {
    amountRequested: -1,
    duration: -1,
    interestRCF: -1,
    interestBL: -1,
  };

  onType = (type: InputType) => (event: any) => {
      const value = parseInt(event.target.value);
      switch (type) {
          case InputType.BL:
              this.setState({
                  interestBL: value,
              });
              break;

          case InputType.RCF:
              this.setState({
                  interestRCF: value,
              });
              break;

          case InputType.TOTAL_AMOUNT:
              this.setState({
                  amountRequested: value,
              });
              break;

          case InputType.DURATION:
              this.setState({
                  duration: value,
              });
              break;
      }
  };


  render() {
    const { interestRCF, interestBL,duration, amountRequested } = this.state;
    console.log('interestRCF', interestRCF);
    console.log('interestBL', interestBL);
    const isAnyRCFValuesBelowZero = isAnyBelowZero([interestRCF, duration, amountRequested]);
    const isAnyBLValuesBelowZero = isAnyBelowZero([interestBL, duration, amountRequested]);
    return (
      <div className="App">
          <div className="content">
              <div className="price-duration-input-container">
                  <div className="input-total-amount">
                      <NumberInput id="requested-amount" label="Amount Requested" keyPress={this.onType(InputType.TOTAL_AMOUNT)}/>
                  </div>
                  <div className="input-duration">
                      <NumberInput id="duration" label="Duration" keyPress={this.onType(InputType.DURATION)}/>
                  </div>
              </div>
              <div className="table-container">
                 <div className="rcf-table-container">
                     <div>{RCF.TITLE}</div>
                    <div className="input-rcf">
                        <NumberInput id="rcf" label="Interest Rate" keyPress={this.onType(InputType.RCF)}/>
                    </div>
                     { !isAnyRCFValuesBelowZero &&
                        (<div data-cy="rcf-table">
                             <LoanRepaymentsTable type={LoanType.RCF} amountRequested={amountRequested} duration={duration} interestRate={interestRCF}/>
                         </div>
                        )
                     }
                 </div>
                <div className="bl-table-container">
                    <div>{BL.TITLE}</div>
                    <div className="input-bl">
                        <NumberInput id="bl" label="Interest Rate" keyPress={this.onType(InputType.BL)}/>
                    </div>
                    { !isAnyBLValuesBelowZero && (
                        <div data-cy="bl-table">
                            <LoanRepaymentsTable type={LoanType.BL} amountRequested={amountRequested} duration={duration} interestRate={interestBL}/>
                        </div>
                    )}
                </div>
              </div>
          </div>
      </div>
    )
  };
}

export default App;
