import { a as useStorage } from '../../_/nitro.mjs';
import { defineEventHandler, getHeader, createError } from 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/h3/dist/index.mjs';
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

const bookshelf_get = defineEventHandler((event) => {
  const auth = getHeader(event, "authorization");
  if (!auth) {
    throw createError({ statusCode: 401, message: "\u672A\u767B\u5F55" });
  }
  const token = auth.replace("Bearer ", "");
  const decoded = Buffer.from(token, "base64").toString();
  const userId = parseInt(decoded.split(":")[0]);
  const db = useStorage("data") || { bookshelf: [], novels: [] };
  const bookshelf = (db.bookshelf || []).filter((b) => b.user_id === userId).map((b) => (db.novels || []).find((n) => n.id === b.novel_id)).filter(Boolean);
  return { success: true, bookshelf };
});

export { bookshelf_get as default };
//# sourceMappingURL=bookshelf.get.mjs.map
