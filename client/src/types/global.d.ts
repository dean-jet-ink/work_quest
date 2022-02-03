declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_ACCESS_KEY: string;
    readonly REACT_APP_SECRET_ACCESS_KEY: string;
    readonly REACT_APP_URL: string;
    readonly SKIP_PREFLIGHT_CHECK: boolean;
  }
}
