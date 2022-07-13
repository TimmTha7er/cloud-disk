import React from "react";
import './input.css'

// interface InputProps {
//   onChange: (event: React.FormEvent<HTMLInputElement>) => void,
//   value: string,
//   type: string,
//   placeholder: string
// }

const Input: React.FC<any> = (props) => {
  return (
    <input
    // @ts-ignore: Unreachable code error
      onChange={(event) => props.setValue(event.target.value)}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
    />
  )
}

export default Input
