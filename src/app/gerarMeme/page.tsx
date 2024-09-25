"use client";

import { ChangeEvent, useState } from "react";
import api from "../api/api";
import { MemeGet } from "../interfaces/meme";
import { AxiosResponse } from "axios";
import Meme from "../components/meme";
import { MdInsertPhoto } from "react-icons/md";

export default function gerarMeme() {
  const [meme, setMeme] = useState<MemeGet>();
  const [imagem, setImagem] = useState<File>();
  const buscarMemeGerado = async () => {
    const response: AxiosResponse<MemeGet> = await api.get("/gerador");
    setMeme(response.data);
  };

  const compatilharViaWhatsapp = () => { };

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
    alert("Deu certo")
  };
  const salvarImagem = (img: ChangeEvent<HTMLInputElement>) => {
    setImagem(img.target.files![0]);
  }
  const enviar = (form: FormData) => {
    if(form.get("frase") === "" && imagem != null) {
      enviarImagem()
    }else if(form.get("frase") !== "" && imagem == null) {
      enviarFrase(form.get("frase")!.toString())
    }else if(form.get("frase") !== "" && imagem != null) {
      enviarMeme(form)
    }
    
  }
  const enviarFrase = (frase : string)=>{
    api.post("envio/frase", frase).then((response)=>{
      console.log(response)
      if(response.status === 200){
        alert("Frase criada com sucesso")
      }
    })
    
  }
  const enviarImagem = ()=>{
    let newForm = new FormData();
    if (imagem != null) {
      newForm.append("image", imagem);
    }
    api.post("envio/imagem",newForm).then((response)=>{
      console.log(response)
      if(response.status === 200){
        alert("Imagem enviada com sucesso")
      }
    })
  }
  const enviarMeme = (form : FormData)=>{
    const dto = {
      frase: form.get("frase")

    }
    let blob = new Blob([JSON.stringify(dto)], { type: "application/json" });
    let newForm = new FormData();
    newForm.append("dto", blob);
    if (imagem != null) {
      newForm.append("file", imagem);
    }

    api.post("/meme", newForm).then((response) => {
      if (response.status === 200) {
        alert("Meme criado com sucesso")
        api.get(`/meme/${response.data.id}`).then((response) => {
          setMeme(response.data)
        })
      }
    })
  }

  return (
    <main className="flex flex-col justify-center items-center">


      <form action={(form) => enviar(form)} className="flex justify-center flex-col gap-2 bg-[#a8dadc] w-3/4 p-5 mt-6">
        <h1 className="text-center font-bold text-lg">Gerar meme</h1>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="frase">Crie a frase do meme</label>
          <input type="text" name="frase" className="w-3/4 h-7" />
        </div>

        <label htmlFor="imagem">
          <input
            type="file"
            onChange={(e) => salvarImagem(e)}
            name="imagem"
            id="imagem"
          />

        </label>
        <input type="submit" className="text-center bg-sky-700 rounded p-2 text-white" />
      </form>
      <p>Ou</p>
      <button
        onClick={() => buscarMemeGerado()}
        className="text-center bg-[#a8dadc] rounded p-2"
      >
        Gerar
      </button>

      {meme && (
        <div>
          <Meme meme={meme} />
          <button
            onClick={() => compartilharMemeGerado()}
            className="text-center bg-[#a8dadc] rounded p-2"
          >
            Compartilhar meme gerado
          </button>
        </div>

      )}
    </main>
  );
}
