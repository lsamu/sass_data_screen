/// <reference types="vite/client" />

declare namespace layer {}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_PORT: string
  readonly VITE_ROUER_MODE: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_AUTH_TOKEN: string
  readonly VITE_TOKEN_STORAGE: string
  readonly VITE_APP_PROXY: string
  readonly VITE_APP_NO_AUTH: string
  readonly VITE_ALERT_DELAY: string
  readonly VITE_MOCK: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
