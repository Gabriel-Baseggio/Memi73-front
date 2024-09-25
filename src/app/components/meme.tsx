import { Card, CardContent } from "@/components/ui/card";
import { MemeGet } from "../interfaces/meme";

interface CardProps {
  meme: MemeGet;
}

export default function Meme(props: CardProps) {
  return (
    <>
      <Card>
        <CardContent>
          <img src={props.meme.imagem.url} alt="" />
          <p>{props.meme.frase.frase}</p>
          <a href="https://wa.me/?text=Veja%20o%20meme" target="_blank">
            Compartilhar pelo Whatsapp
          </a>
        </CardContent>
      </Card>
    </>
  );
}
