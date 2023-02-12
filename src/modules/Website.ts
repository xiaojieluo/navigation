import * as AV from "leancloud-storage";
import * as adapters from "@leancloud/platform-adapters-browser";
import { APP_ID, APP_KEY, REGION, API_SERVER } from "@/Init";
class ORM {}

// class Website extends AV.Object{
//     id?: string;
//     av: AV.Object = new AV.Object();

//     test(){

//     }

// }

AV.setAdapters(adapters);
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  region: REGION,
  serverURL: API_SERVER,
});
localStorage.setItem("debug", "leancloud*");

class Website extends AV.Object {
  hello(): string {
    return "Hola.";
  }
}

AV.Object.register(Website);
export default Website;
