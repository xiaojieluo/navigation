import * as AV from "leancloud-storage";
import * as adapters from "@leancloud/platform-adapters-browser";

export const APP_ID = process.env.REACT_APP_APP_ID || "";
export const APP_KEY = process.env.REACT_APP_APP_KEY || "";
export const REGION = process.env.REGION || "cn";
export const API_SERVER = process.env.REACT_APP_API_SERVER || "";

export function init_leancloud() {
  AV.setAdapters(adapters);
  AV.init({
    appId: APP_ID,
    appKey: APP_KEY,
    region: REGION,
    serverURL: API_SERVER,
  });
  localStorage.setItem("debug", "leancloud*");
}