import { a as useStorage } from '../../_/nitro.mjs';
import { defineEventHandler } from 'file://C:/Users/86155/exit/birthday-gift-to-cl/node_modules/h3/dist/index.mjs';
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

const init_post = defineEventHandler(() => {
  const db = useStorage("data") || { novels: [], chapters: [] };
  if ((db.novels || []).length > 0) {
    return { success: true, message: "\u6570\u636E\u5DF2\u5B58\u5728" };
  }
  const novel = {
    id: Date.now(),
    title: "\u6D4B\u8BD5\u5C0F\u8BF4",
    author: "\u793A\u4F8B\u4F5C\u8005",
    description: "\u8FD9\u662F\u4E00\u672C\u6D4B\u8BD5\u7528\u7684\u5C0F\u8BF4\uFF0C\u7528\u4E8E\u9A8C\u8BC1\u529F\u80FD\u3002",
    cover: "",
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (!db.novels) db.novels = [];
  db.novels.push(novel);
  if (!db.chapters) db.chapters = [];
  db.chapters.push({
    id: Date.now() + 1,
    novel_id: novel.id,
    title: "\u7B2C\u4E00\u7AE0 \u521D\u5165\u6C5F\u6E56",
    content: "\u8FD9\u662F\u7B2C\u4E00\u7AE0\u7684\u5185\u5BB9\u3002\n\n\u6C5F\u6E56\u8DEF\u8FDC\uFF0C\u4EBA\u5728\u9014\u4E2D\u3002\n\n......\uFF08\u6B64\u5904\u7701\u7565\u4E00\u4E07\u5B57\uFF09",
    order_num: 1,
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  });
  db.chapters.push({
    id: Date.now() + 2,
    novel_id: novel.id,
    title: "\u7B2C\u4E8C\u7AE0 \u98CE\u4E91\u9645\u4F1A",
    content: "\u8FD9\u662F\u7B2C\u4E8C\u7AE0\u7684\u5185\u5BB9\u3002\n\n\u5929\u4E0B\u98CE\u4E91\u51FA\u6211\u8F88\uFF0C\u4E00\u5165\u6C5F\u6E56\u5C81\u6708\u50AC\u3002\n\n......\uFF08\u6B64\u5904\u7701\u7565\u4E24\u4E07\u5B57\uFF09",
    order_num: 2,
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  });
  useStorage("data");
  return { success: true, message: "\u793A\u4F8B\u6570\u636E\u5DF2\u521B\u5EFA" };
});

export { init_post as default };
//# sourceMappingURL=init.post.mjs.map
