import React, { useReducer, useState } from "react";
const initialState = { count: 0 };
const actions = {
  decrement: "decrement",
  increment: "increment",
  double: "multiply",
  half: "half",
  reset: "reset",
  custom: "custom",
};
function reducer(state, action) {
  switch (action.type) {
    case actions.decrement:
      return {
        count: state.count - 1,
      };
    case actions.increment:
      return {
        count: state.count + 1,
      };
    case actions.doulbe:
      return { count: state.count * 2 };

    case actions.half:
      return { count: state.count / 2 };
    case actions.reset:
      return { count: initialState.count };
    case actions.custom:
      return { count: action.payload };
    default:
      return state;
  }
}
export default function Reduce() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [customCount, setCustomCount] = useState(0);
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: actions.custom, payload: customCount });
  }
  return (
    <div>
      <h3>Counter com usestate</h3>
      <button onClick={() => dispatch({ type: actions.decrement })}>-</button>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: actions.increment })}>+</button>
      <button onClick={() => dispatch({ type: actions.multiply })}>
        double
      </button>
      <button onClick={() => dispatch({ type: actions.half })}>half</button>
      <button onClick={() => dispatch({ type: actions.reset })}>reset</button>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="custom_value">Valor personalizado</label>
        <input
          id="custom_value"
          type="text"
          value={customCount}
          onChange={(e) => setCustomCount(e.target.value)}
        ></input>
        <p>Valor</p>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
