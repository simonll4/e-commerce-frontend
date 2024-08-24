/// <reference types="vite/client" />

//variable de entorno
interface ImportMetaEnv {
  BASE_URL: string;
  
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
