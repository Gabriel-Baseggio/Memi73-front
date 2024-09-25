export interface MemeGet {
  id: number;
  frase: FraseInterface;
  imagem: ImageInterface;
}

export interface ImageInterface {
  id: number;
  url: string;
}

export interface FraseInterface {
  id: number;
  frase: string;
}
