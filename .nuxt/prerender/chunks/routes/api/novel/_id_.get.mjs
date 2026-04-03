import { defineEventHandler, getRouterParam, createError } from 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/h3/dist/index.mjs';
import { a as useStorage } from '../../../_/nitro.mjs';
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

const _id__get = defineEventHandler((event) => {
  var _a;
  const id = parseInt(getRouterParam(event, "id"));
  const db = useStorage("data") || { novels: [], chapters: [] };
  const novel = (_a = db.novels) == null ? void 0 : _a.find((n) => n.id === id);
  if (!novel) {
    throw createError({ statusCode: 404, message: "\u5C0F\u8BF4\u4E0D\u5B58\u5728" });
  }
  const chapters = (db.chapters || []).filter((c) => c.novel_id === id).sort((a, b) => a.order_num - b.order_num);
  return { success: true, novel, chapters };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
