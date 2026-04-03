import { a as useStorage } from '../../_/nitro.mjs';
import { defineEventHandler, getHeader, createError, readBody } from 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/h3/dist/index.mjs';
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

const bookshelf_post = defineEventHandler(async (event) => {
  const auth = getHeader(event, "authorization");
  if (!auth) {
    throw createError({ statusCode: 401, message: "\u672A\u767B\u5F55" });
  }
  const token = auth.replace("Bearer ", "");
  const decoded = Buffer.from(token, "base64").toString();
  const userId = parseInt(decoded.split(":")[0]);
  const body = await readBody(event);
  const { novelId } = body;
  if (!novelId) {
    throw createError({ statusCode: 400, message: "\u7F3A\u5C11\u5C0F\u8BF4ID" });
  }
  const db = useStorage("data") || { bookshelf: [] };
  if (!db.bookshelf) db.bookshelf = [];
  const existing = db.bookshelf.find((b) => b.user_id === userId && b.novel_id === novelId);
  if (existing) {
    const index = db.bookshelf.indexOf(existing);
    db.bookshelf.splice(index, 1);
    useStorage("data");
    return { success: true, inBookshelf: false };
  } else {
    db.bookshelf.push({ id: Date.now(), user_id: userId, novel_id: novelId, created_at: (/* @__PURE__ */ new Date()).toISOString() });
    useStorage("data");
    return { success: true, inBookshelf: true };
  }
});

export { bookshelf_post as default };
//# sourceMappingURL=bookshelf.post.mjs.map
