import './button.css';
import DialerBtn from './dialer-btn';
import React, { useEffect, useState } from 'react';
import Lara from '../public/lara-crente.jpg';
import TSH from '../public/jh-logo.png';
import Meme from '../public/meme.jpeg';

export default function Home() {
  const numbers = [
    { value: 1, braile: '⠃' },
    { value: 2, braile: '⠉' },
    { value: 3, braile: '⠙' },
    { value: 4, braile: '⠑' },
    { value: 5, braile: '⠋' },
    { value: 6, braile: '⠛' },
    { value: 7, braile: '⠓' },
    { value: 8, braile: '⠊' },
    { value: 9, braile: '⠚' },
    { value: 0, braile: '⠁' },
  ];

  const [inputValues, setInputValues] = useState<number[]>([]);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isentVote, setIsentVote] = useState<boolean>(false);
  const confirmSound = new Audio('./confirma-urna.mp3');

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < 5; i++) {
      inputs.push(
        <React.Fragment key={i}>
          <input
            type="text"
            maxLength={1}
            onChange={() => {}}
            value={inputValues[i] ? inputValues[i] : ''}
            className="border-black text-black flex justify-center items-center border w-10 h-14 rounded-md text-2xl font-[Inter] p-3"
          />
        </React.Fragment>
      );
    }
    return inputs;
  };

  const handleDialerClick = (value: number) => {
    const counselorArray = [...inputValues];
    if (counselorArray.length < 5) {
      counselorArray.push(value);
      setInputValues(counselorArray);
    }
  };

  const isentVoteFnc = () => {
    setIsentVote(true);
  };

  const emptyInput = () => {
    setInputValues([]);
    setIsentVote(false);
  };

  const confirmVote = () => {
    setIsConfirmed(true);
    confirmSound.play();
  };

  const prepareNewVote = () => {
    setIsConfirmed(false);
    confirmSound.currentTime = 0;
    setIsentVote(false);
    emptyInput();
  };

  useEffect(() => {
    if (isConfirmed) {
      setTimeout(() => {
        prepareNewVote();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed]);

  return (
    <div className="flex h-screen">
      <div
        className="bg-gray-300 flex flex-col m-auto rounded-xl py-2 pl-16 pr-20 sm:pl-8 sm:pr-10"
        style={{ boxShadow: '-32px -8px 3px 1px rgba(107, 114, 128, 0.5) inset' }}
      >
        <div className="border-gray-400 border-2 border-b-0 rounded-sm">
          <div className="bg-black h-[436px] px-8 py-4">
            <div className="bg-slate-100 w-full h-full p-2 flex flex-col items-center">
              {isentVote ? (
                <React.Fragment>
                  <div className="flex items-center justify-center w-full h-full">
                    <h1 className="text-slate-500 font-[Inter] text-9xl text-center break-words max-w-[607px]">
                      ISENTÃO DE MERDA
                    </h1>
                  </div>
                </React.Fragment>
              ) : isConfirmed ? (
                <React.Fragment>
                  <div className="flex items-center justify-center w-full h-full">
                    <h1 className="text-slate-500 font-[Inter] text-9xl text-center break-words max-w-[607px]">FIM</h1>
                  </div>
                </React.Fragment>
              ) : inputValues.map((num) => Math.floor(num)).join('') !== '12123' && inputValues.length === 5 ? (
                <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                  <h1 className="text-black text-2xl font-[Inter]">Mona, você é maluca?</h1>
                  <img src={Meme} width={400} height={311} alt="Meme" />
                  <h1 className="text-black text-2xl font-[Inter]">Com todo respeito</h1>
                </div>
              ) : (
                <React.Fragment>
                  <div className="flex flex-row w-full h-full justify-between p-2 sm:gap-4">
                    <div className="flex flex-col justify-evenly">
                      {inputValues && inputValues.length === 5 && (
                        <h1 className="text-black text-lg font-[Inter]">SEU VOTO PARA</h1>
                      )}
                      <h1 className="text-black text-3xl font-[Inter]">VEREADORA</h1>
                      <div>
                        <label className="text-black text-lg font-[Inter]">NÚMERO:</label>
                        <div className="flex flex-row gap-2">{renderInputs()}</div>
                      </div>
                      {inputValues && inputValues.length === 5 && (
                        <React.Fragment>
                          <h1 className="text-black text-lg font-[Inter]">NOME: LARA CARVALHO</h1>
                          <h1 className="text-black text-lg font-[Inter]">PARTIDO: MEU CORAÇÃO</h1>
                        </React.Fragment>
                      )}
                    </div>
                    <div className="bg-slate-50 w-[200px] h-[240px] sm:w-[140px] sm:h-[180px] sm:p-0">
                      {inputValues && inputValues.length === 5 && (
                        <img
                          src={Lara}
                          width={200}
                          height={240}
                          alt="Lara Carvalho"
                          style={{ objectFit: 'cover', maxWidth: '100%', maxHeight: '100%' }}
                        />
                      )}
                    </div>
                  </div>

                  {inputValues && inputValues.length === 5 && (
                    <React.Fragment>
                      <hr className="border border-black w-full" />
                      <div className="self-start">
                        <h1 className="text-black text-lg font-[Inter]">APERTE A TECLA:</h1>
                        {inputValues.map((num) => Math.floor(num)).join('') === '12123' && (
                          <h1 className="text-black text-lg font-[Inter]">
                            <span className="text-green-500">VERDE</span> para CONFIRMAR este voto
                          </h1>
                        )}
                        <h1 className="text-black text-lg font-[Inter]">
                          <span className="text-red-500">VERMELHO</span> para REINICIAR este voto
                        </h1>
                      </div>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="bg-green-300 flex flex-row pt-24 gap-x-5 sm:flex-col sm:items-center sm:gap-y-5 sm:pt-0">
            <div className="flex flex-wrap items-center max-h-[224px]">
              <img src={TSH} width={209} height={132} alt="JH" />
            </div>
            <div className=" max-w-[270px] max-h-[224px] flex flex-wrap flex-row items-center justify-center gap-x-4 gap-y-3 p-2">
              {numbers.map((number, index) => (
                <DialerBtn
                  key={index}
                  value={number.value}
                  braile={number.braile}
                  handleClick={() => handleDialerClick(number.value)}
                />
              ))}
            </div>
            <div className="flex flex-col gap-y-4 py-3 mb-24 px-9 sm:flex-row sm:mb-4">
              <button
                disabled={inputValues.length === 5}
                onClick={isentVoteFnc}
                className="bg-white w-24 h-9 rounded-lg text-left justify-center pb-1 pl-2 active:pb-0 active:pl-3 btn-shadow-white transition-all"
              >
                <h1 className="text-black text-sm font-[Inter] leading-none">BRANCO ⠃⠗⠁⠝⠉⠕</h1>
              </button>
              <button
                onClick={emptyInput}
                className="bg-red-400 w-24 h-9 rounded-lg text-left justify-center pb-1 pl-2 active:pb-0 active:pl-3 btn-shadow-correct transition-all"
              >
                <h1 className="text-black text-sm font-[Inter] leading-none">CORRIGE ⠉⠕⠗⠗⠊⠑⠑</h1>
              </button>
              <button
                disabled={inputValues.length < 5}
                onClick={confirmVote}
                className="bg-green-400 w-24 h-24 rounded-lg text-left justify-center pb-14 pl-2 active:pb-12 active:pl-3 btn-shadow-confirm transition-all cursor-pointer"
              >
                <h1 className="text-black text-sm font-[Inter] leading-none">CONFIRMA ⠉⠕⠝⠋⠗⠍⠁</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
