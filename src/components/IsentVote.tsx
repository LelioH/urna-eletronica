import React from "react";

export function IsentVote() {
  return (
    <React.Fragment>
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center text-black font-inter">
          <h1 className="text-5xl break-words max-w-[607px] sm:text-4xl">
            VOTO EM BRANCO
          </h1>
          <p className="mt-6 text-xl sm:text-base">
            Aperte CONFIRMA para confirmar ou CORRIGE para voltar.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
