"use client";

import { useState } from "react";
import api from "../api/api";
import { MemeGet } from "../interfaces/meme";
import { AxiosResponse } from "axios";
import Meme from "../components/meme";

export default function gerarMeme() {
  const [meme, setMeme] = useState<MemeGet>();

  const buscarMemeGerado = async () => {
    const response: AxiosResponse<MemeGet> = await api.get("/gerador");
    setMeme(response.data);
  };

  const compatilharViaWhatsapp = () => {};

  const compartilharMemeGerado = async () => {
    if (meme === undefined) {
      alert("Gere um meme antes!");
      return;
    }
    let dto = {
      frase: {
        id: meme.frase.id,
      },
      imagem: {
        id: meme.imagem.id,
      },
    };

    api.post("/meme/compartilhar", dto);
  };

  return (
    <main>
      {" "}
      <button
        onClick={() => buscarMemeGerado()}
        className="text-center bg-[#a8dadc] rounded p-2"
      >
        Gerar
      </button>
      <button
        onClick={() => compartilharMemeGerado()}
        className="text-center bg-[#a8dadc] rounded p-2"
      >
        Compartilhar meme gerado
      </button>
      {meme && <Meme meme={meme} />}
    </main>
  );
}
