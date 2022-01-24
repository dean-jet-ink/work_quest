declare namespace NodeJS {
  interface ProcessEnv {
    readonly URL: string;
    readonly DB_HOST: string;
    readonly DB_USER: string;
    readonly DB_PASS: string;
    readonly DB_PORT: string;
    readonly DB_DATABASE: string;
  }
}
