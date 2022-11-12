import React from 'react'


interface NumberWrapperProps {
  number: number;
}
const  NumberWrapper: React.FC<NumberWrapperProps> = ({number}: NumberWrapperProps) => {
  const digits = number.toString(10).split('').map((digit)=> <Digit>{parseInt(digit, 10)}</Digit>);
  return (<>
    {digits}
  </>
    
  )
}

export default NumberWrapper;

export function Digit({children}: { children: number}) {
  return (
    <div>{children}</div>
  )
}

