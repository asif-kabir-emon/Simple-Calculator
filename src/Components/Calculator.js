import React, { useState } from "react";
import { FaBackspace } from "react-icons/fa";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("0");
  const [previousOutput, setPreviousOutput] = useState("0");

  // Function: add Number
  const addNumber = (text) => {
    const t = input.split("");
    if (input === "0") {
      setInput(text);
    } else {
      const temp = input;
      const newInput = temp + text;
      setInput(newInput);
    }
  };

  // Function: add %
  const addPercentage = () => {
    const t = input.split("");
    if (t[t.length - 1] !== "%" && t[t.length - 1] !== ".") {
      const temp = input;
      const newInput = temp + "%";
      setInput(newInput);
    }
  };

  // Function: add Decimal Point
  const addDecimalPoint = () => {
    const t = input.split("");
    if (input === "0" && input.length === 1) {
      setInput("0.1");
      return;
    }
    if (t[t.length - 1] !== "%" && t[t.length - 1] !== ".") {
      const temp = input;
      const newInput = temp + ".";
      setInput(newInput);
    }
  };

  // Function: add Operator Sign (+, -, *, /)
  const addOperationSign = (sign) => {
    console.log(input);
    const t = input.split("");
    const isBeforeSign =
      t[t.length - 1] === "/" ||
      t[t.length - 1] === "x" ||
      t[t.length - 1] === "-" ||
      t[t.length - 1] === "+";

    if (input !== "0" && input.length >= 1 && !isBeforeSign) {
      const temp = input;
      const newInput = temp + sign;
      setInput(newInput);
    } else if (isBeforeSign) {
      const temp = input.slice(0, input.length - 1);
      const newInput = temp + sign;
      setInput(newInput);
    }
  };

  // Function: set output as input
  const setAnswerAsInput = () => {
    setInput(previousOutput);
    setOutput("0");
  };

  // Function: backspace one character before
  const removeFromRight = () => {
    const t = input.split("");
    if (input.length === 1) {
      setInput("0");
      return;
    } else if (input.length === 3 && t[0] === "0" && t[1] === ".") {
      setInput("0");
      return;
    }
    const temp = input.slice(0, input.length - 1);
    setInput(temp);
  };

  // Function: clear input and output
  const clear = () => {
    setInput("0");
    setOutput("0");
  };

  // Function: calculate output
  const result = () => {
    const formate = (input) => {
      const input_line_replace_x = input.replaceAll("x", "*");
      const input_line = input_line_replace_x.replaceAll("%", "*0.01");

      return input_line;
    };

    try {
      const final_result = eval(formate(input));
      if (typeof final_result === "number") {
        setOutput(final_result.toFixed(2));
        setPreviousOutput(final_result.toFixed(2));
      }
    } catch {
      setOutput("Error");
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="input-box text-right">{input}</div>
        <div className="output-box text-right">{output}</div>
      </div>
      <div className="grid">
        <div className="flex">
          <button className="button" onClick={() => clear()}>
            AC
          </button>
          <button
            className="button"
            id="icon-size"
            onClick={() => removeFromRight()}
          >
            <FaBackspace></FaBackspace>
          </button>
          <button className="button" onClick={() => addPercentage()}>
            %
          </button>
          <button className="button" onClick={() => addOperationSign("/")}>
            &divide;
          </button>
        </div>
        <div className="flex">
          <button className="button" onClick={() => addNumber("7")}>
            7
          </button>
          <button className="button" onClick={() => addNumber("8")}>
            8
          </button>
          <button className="button" onClick={() => addNumber("9")}>
            9
          </button>
          <button className="button" onClick={() => addOperationSign("x")}>
            &times;
          </button>
        </div>
        <div className="flex">
          <button className="button" onClick={() => addNumber("4")}>
            4
          </button>
          <button className="button" onClick={() => addNumber("5")}>
            5
          </button>
          <button className="button" onClick={() => addNumber("6")}>
            6
          </button>
          <button className="button" onClick={() => addOperationSign("-")}>
            -
          </button>
        </div>
        <div className="flex">
          <button className="button" onClick={() => addNumber("1")}>
            1
          </button>
          <button className="button" onClick={() => addNumber("2")}>
            2
          </button>
          <button className="button" onClick={() => addNumber("3")}>
            3
          </button>
          <button className="button" onClick={() => addOperationSign("+")}>
            +
          </button>
        </div>
        <div className="flex">
          <button className="button" onClick={() => addNumber("0")}>
            0
          </button>
          <button className="button" onClick={() => addDecimalPoint()}>
            &middot;
          </button>
          <button className="button" onClick={() => setAnswerAsInput()}>
            Ans
          </button>
          <button className="button" onClick={() => result()}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
