import * as AV from "leancloud-storage";
import * as adapters from "@leancloud/platform-adapters-browser";
import { APP_ID, APP_KEY, REGION, API_SERVER } from "@/Init";
import * as crypto from "crypto";

// AV.setAdapters(adapters);
// AV.init({
//   appId: APP_ID,
//   appKey: APP_KEY,
//   region: REGION,
//   serverURL: API_SERVER,
// });
// localStorage.setItem("debug", "leancloud*");

// export async function queryEmail(email: string): Promise<boolean> {
//   const query = new AV.Query("_User");
//   query.equalTo("email", email);
//   return query
//     .find()
//     .then((s) => {
//       console.log("TTT");
//       console.log(s);
//       if (s.length > 0) {
//         return true;
//       } else {
//         return false;
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//       return false;
//     });
// }

class BaseObject {
  //   av: string;
  //   constructor(av: string) {
  //     this.init_leancloud();
  //   }
  constructor() {
    this.init_leancloud();
  }

  init_leancloud() {
    AV.setAdapters(adapters);
    AV.init({
      appId: APP_ID,
      appKey: APP_KEY,
      region: REGION,
      serverURL: API_SERVER,
    });
    localStorage.setItem("debug", "leancloud*");
  }
}

export class User extends BaseObject {

  // 通过email 查询用户
  static async queryEmail(email: string): Promise<boolean> {
    const query = new AV.Query("_User");
    query.equalTo("email", email);
    return query
      .find()
      .then((s) => {
        console.log("TTT");
        console.log(s);
        if (s.length > 0) {
          return true;
        } else {
          return false;
        }
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  }

  static async queryByUsername(username: string): Promise<boolean> {
    const query = new AV.Query("_User");
    query.equalTo("username", username);
    return query.find().then((users) => {
        if(users.length > 0) {
            console.log("SS")
            return true;
        } else {
            return false;
        }
    })
  }

  // user signup
  static async signupForEmail(
    email: string,
    password: string,
    username: string,
  ): Promise<AV.User> {
    const user = new AV.User();
    user.setEmail(email);
    user.setUsername(username);
    // 不需要客户端对密码进行加密，leancloud 会密文存储
    user.setPassword(password);

    return user.signUp().then((user) => {
        console.log(`注册成功, ${user.id}`)
        return user
    });
  }
}
