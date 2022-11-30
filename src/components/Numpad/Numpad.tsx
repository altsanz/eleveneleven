import "./Numpad.css";

const regularNums = [7, 8, 9, 4, 5, 6, 1, 2, 3];
export const Numpad = ({ ...props }: { onClick: (number: number) => void }) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {regularNums.map((i) => (
        <NumpadKey number={i} {...props} />
      ))}

      <div />
      <NumpadKey number={0} onClick={props.onClick} />
      <div />
    </div>
  );
};

const NumpadKey = ({
  number,
  onClick,
}: {
  number: number;
  onClick: (number: number) => void;
}) => {
  return (
    <button
      onClick={() => onClick(number)}
      className="border border-purple-700 rounded text-pink-600 justify-items-stretch"
    >
      {number}
    </button>
  );
};
