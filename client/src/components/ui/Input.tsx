import React from "react";

interface InputProps {
  setValue: (value: string) => void,
  value: string,
  type: string,
  placeholder: string
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      onChange={(event) => props.setValue(event.target.value)}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
    />
  )
}

export default Input
