import React, {useState} from 'react';
import AppContext from "./AppContext";

import {HeaderLinks} from "./Components/HeaderLinks";
import {HeaderStatistic} from "./Components/header/HeaderStatistic";
import {FooterContainer} from "./Components/FooterContainer";
import {AccordionList} from "./Components/AccordionList";
import {AccordionType} from "./Components/accordion/Constants";
import {PersonField} from "./Components/PersonField";

import './App.css';

export const App = () => {
      const [isClicked, updateClicked] = useState(false);
      const [personData, updatePersonData] = useState([
          {
              "id": 23,
              "first_name": "Pearl",
              "last_name": "Mendoza",
              "age": 65,
              "nationality": "Bahrain",
              "risk_percentage": 39
          },
          {
              "id": 24,
              "first_name": "Wing",
              "last_name": "Glass",
              "age": 54,
              "nationality": "Iran",
              "risk_percentage": 68
          },
          {
              "id": 25,
              "first_name": "Rudyard",
              "last_name": "Hubbard",
              "age": 2,
              "nationality": "Rwanda",
              "risk_percentage": 75
          }]);
      const store = {
          data: personData,
          isSubmitButtonClicked: isClicked,
          updateData: updatePersonData,
          setSubmitClickValue: updateClicked,
      };
      const buttonClick = () => {
          updateClicked(true);
      };
      return (
          <div className="app">
              <header className="app__header">
                 <div className="app__header--left">
                   <h1 className="app__header__title">Privitar Privacy Protector</h1>
                   <HeaderLinks>
                     <div>LINK ONE</div>
                     <div>LINK TWO</div>
                     <div>LINK THREE</div>
                   </HeaderLinks>
                 </div>
                 <div className="app__header--right">
                     <HeaderStatistic title="people protected" statValue={0}/>
                 </div>
              </header>
              <div className="app__content-wrapper">
              <div className="app__content">
                <AppContext.Provider value={store}>
                  <AccordionList accordionType={AccordionType.Person} data={store.data}/>
                  <PersonField formId="new-person"/>
                  <button data-cy="new-person-form-submit-button" onClick={buttonClick}>Add Person(s)</button>
                </AppContext.Provider>
              </div>
              </div>
              <div className="app__footer">
                 <FooterContainer title="Privitar"/>
              </div>
          </div>
      );
};

export default App;
