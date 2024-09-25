"use client";
import Image from "next/image";
import api from "./api/api";
import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import Meme from "./components/meme";
import { MemeGet } from "./interfaces/meme";
import { useRouter } from "next/navigation";
import { log } from "console";
export default function Home() {
  const [listMemes, setListMemes] = useState<MemeGet[]>();
  const getAllMemes = async () => {
    const response: AxiosResponse<MemeGet[]> = await api.get(
      "/meme/compartilhados"
    );
    setListMemes(response.data);
  };
  useEffect(() => {
    getAllMemes();
  }, []);
  const renderFeed = () => {
    if (listMemes === undefined || listMemes.length === 0) {
      return;
    }
    return listMemes.map((meme, key) => {
      return <Meme meme={meme} />;
    });
  };

  return (
    <main>
      <div className="flex flex-col justify-center items-center gap-4">
        {renderFeed()}
      </div>
    </main>
  );
}
