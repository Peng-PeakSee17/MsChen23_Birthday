import { a as useStorage } from '../../_/nitro.mjs';
import { defineEventHandler, readBody, createError } from 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/ofetch/dist/node.mjs';
import 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/ufo/dist/index.mjs';
import 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Users/86155/exit/birthday-gift-to-cl/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/pathe/dist/index.mjs';

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;
  if (!username || !password) {
    throw createError({ statusCode: 400, message: "\u7528\u6237\u540D\u548C\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const db = useStorage("data") || { users: [] };
  if (!db.users) db.users = [];
  const user = db.users.find((u) => u.username === username);
  if (!user) {
    throw createError({ statusCode: 401, message: "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF" });
  }
  const inputHash = Buffer.from(password).toString("base64");
  if (user.password !== inputHash) {
    throw createError({ statusCode: 401, message: "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF" });
  }
  const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64");
  return {
    success: true,
    token,
    user: {
      id: user.id,
      username: user.username,
      avatar: user.avatar || ""
    }
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
