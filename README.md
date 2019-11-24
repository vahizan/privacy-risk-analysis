# Privacy Risk Analysis


## Choices Made
- Using react - seemed like the right framework for the task.
- Using Typescript - helped with type checking - less unit tests needed to be written.
- Calculator.ts API - one source of truth - this file contains the most important functions used by the loan calculator
- Three view components will do 
    - NumberInput(for user input), 
    - LoanRepaymentsTable (to show repayments data)
    - App.ts (the main file).
- Jest and Enzyme for unit testing - easy to set up with create-react-app project
