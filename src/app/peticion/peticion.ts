export interface Peticion {
  id: number;
  titulo: string;  
  descripcion: string;
  destinatario: string;
  file: {
    file_path: string;
    file_name: string;
  }
  files: any;
}