import React from 'react'

import CalcButton from '../CalcButton/CalcButton';

import './Calculator.css';

const keys = [ 
  {id:'clear', value:'AC'},
  {id:'decimal', value:'.'},
  {id:'zero', value:'0'},
  {id:'seven', value:'7'},
  {id:'eight', value:'8'},
  {id:'nine', value:'9'},
  {id:'four', value:'4'},
  {id:'five', value:'5'},
  {id:'six', value:'6'},
  {id:'one', value:'1'},
  {id:'two', value:'2'},
  {id:'three', value:'3'},
  
  
]

const operators = [
  {id:'add', value:'+'},
  {id:'subtract', value:'-'},
  {id:'multiply', value:'*'},
  {id:'divide', value:'/'},
  {id:'equals', value:'='},
]

const replacableInputs = "0/*-+"
const ops = "/*-+"

class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentValue: "0",
      heldValue: "0",
      operator: "",
    }
  }

  onKeyClick = (value) => {
    switch (value) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ".":
        return this.addToNumberState(value);
      case "+":
      case "-":
      case "/":
      case "*":
      case "AC":
        return this.processOperator(value);
      case "=":
        return this.doCalculation("=");
      default:
        return;
    }
  }


  // User Story #9: In any order, I should be able to add,
  // subtract, multiply and divide a chain of numbers of any length,
   // and when I hit =, the correct result should be shown in the element 
   // with the id of display.
  doCalculation = (operator) => {
    let num1;
    let num2;
    if (this.state.currentValue.indexOf(".") !== -1) {
      num2 = parseFloat(this.state.currentValue);
    } else {
      num2 = parseInt(this.state.currentValue);
    }
    // User Story #12: I should be able to perform any operation 
    //(+, -, *, /) on numbers containing decimal points.
    if (this.state.heldValue.indexOf(".") !== -1) {
      num1 = parseFloat(this.state.heldValue);
    } else {
      num1 = parseInt(this.state.heldValue);
    }
    let stateOp = this.state.operator;
    let result;
    // User Story #15: My calculator should have several decimal places of precision
    // when it comes to rounding (note that there is no exact standard, 
    //but you should be able to handle calculations like 2 / 7 with
    // reasonable precision to at least 4 decimal places).
    switch(stateOp) {
      case "+":
          result = (num1+num2)
          break;
      case "-":
          result = (num1-num2)
          break;
      case "*":
          result = (num1*num2)
          break;
      case "/":
          result = (num1/num2)
          break;
      default:
          return;
    }
    // User Story #14: Pressing an operator immediately following 
    //= should start a new calculation 
    //that operates on the result of the previous evaluation.
    if (operator === "=") {
      this.setState({currentValue: result.toString(), heldValue: result.toString(), operator:""})
    } else {
      this.setState({heldValue: result.toString()})
    }
  }

  processOperator = (operator) => {
    if (operator === "AC") {
      return this.setState({ currentValue: "0", heldValue:"0"});
    } else if (this.state.operator === "") {
      return this.setState({ currentValue: operator, heldValue: this.state.currentValue, operator: operator })
    } else if (ops.indexOf(this.state.currentValue) !== -1) {
      // User Story #13: If 2 or more operators are entered consecutively, 
      // the operation performed should be the last operator entered.
      return (this.setState({currentValue: operator, operator: operator}))
    } else {
      this.doCalculation(this.state.operator);
      return this.setState({ currentValue: operator, operator: operator });
    }
  }

  // User Story #8: As I input numbers, I should be able to see my input in the element
  // with the id of "display"
  addToNumberState = (value) => {
    // User Story #11: When the decimal element is clicked, a . should append 
    //to the currently displayed value; two . in one number should not be accepted.
    if (value === ".") {
      if (this.state.currentValue.indexOf('.') < 0) {
        return this.setState({ currentValue:this.state.currentValue+value})
      }
    // User Story #10: When inputting numbers, my calculator should not allow a number to begin with multiple zeros.
    } else if (replacableInputs.indexOf(this.state.currentValue) >= 0) {
      return this.setState({ currentValue: value});
    }else {
      return this.setState({ currentValue:this.state.currentValue+value})
    }
  }


  render() {
    return(
      <div className='calculator'>
        <div className="display" id="display">{this.state.currentValue}</div>
        <div className="keys-container">
          {keys.map(item => 
            <CalcButton 
              key={item.id} 
              keyId={item.id} 
              displayed={item.value}
              onClick={this.onKeyClick}
            />
          )}
        </div>
        <div className='operator-container'>
          {operators.map(item => 
            <CalcButton 
              key={item.id} 
              keyId={item.id} 
              displayed={item.value}
              onClick={this.onKeyClick}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Calculator;