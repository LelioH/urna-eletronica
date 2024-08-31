import Meme from "../assets/meme.jpeg";

export function WrongVote() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
      <h1 className="text-black text-2xl font-inter">Mona, você é maluca?</h1>
      <img src={Meme} width={400} height={311} alt="Meme" />
      <h1 className="text-black text-2xl font-inter">Com todo respeito</h1>
    </div>
  );
}
