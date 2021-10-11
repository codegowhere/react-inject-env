declare global {
  interface Window {
    env: any
  }
}
type EnvType = {
  REACT_APP_COLOR: string,
  REACT_APP_MAIN_TEXT: string,
  REACT_APP_LINK_URL: string,
  REACT_APP_LOGO_URL: string
}
export const env: EnvType = { ...process.env, ...window.env }
