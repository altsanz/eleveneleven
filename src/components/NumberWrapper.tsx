import React from 'react'


interface NumberWrapperProps {
  number: number;
}
const  NumberWrapper: React.FC<NumberWrapperProps> = ({number}: NumberWrapperProps) => {
  const digits = number.toString(10).split('').map((digit, i)=> <Digit key={parseInt(digit, 10) + `${i}`}>{parseInt(digit, 10)}</Digit>);
  return (<>
    {digits}
  </>
    
  )
}

export default NumberWrapper;

export function Digit({reveal=false, children}: { children: number, reveal?: boolean}) {
  return (
    <div>{reveal? children: '*'}</div>
  )
}

