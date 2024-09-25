"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <header className="bg-[#a8dadc] flex flex-row justify-between p-5">
      <div className="w-24">
        <img src="./Memi73.png" alt="A" onClick={() => router.push("/")} />
      </div>
      <div className="flex text-center items-center justify-center">
        <button
          className="text-center bg-[#edf6f9] rounded p-2"
          onClick={() => router.push("/gerarMeme")}
        >
          Criar meme
        </button>
      </div>
    </header>
  );
};

export default Header;
