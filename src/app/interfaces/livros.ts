export interface Livro {
  _id: string;
  titulo: string;
  autor: string;
  editora?: string;
  anoPublicacao?: number;
  isbn?: string;
  preco: number;
  precoPromocional?: number;
  estoque?: number;
  categoria: string;
  descricao?: string;
  imagemCapa?: string;
  avaliacao?: number;
  destaque?: boolean;
  dataCadastro?: Date;
}