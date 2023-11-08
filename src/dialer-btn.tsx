export default function DialerBtn({
  value,
  braile,
  handleClick,
}: {
  value: number;
  braile: string;
  handleClick: (value: number) => void;
}) {
  const handleButtonClick = () => {
    if (handleClick) {
      handleClick(value);
    }
  };

  return (
    <button
      value={value}
      onClick={handleButtonClick}
      className="bg-dialer-button flex flex-col justify-center w-14 h-9 rounded-lg pb-2 pl-1 active:pb-1 active:pl-1.5 button-shadow transition-all sm:w-24 sm:h-12 sm:pl-2 sm:active:pl-3"
    >
      <h1 className="text-xl font-[Inter] sm:text-3xl">
        {value}
        <span className="ml-2">{braile}</span>
      </h1>
    </button>
  );
}
