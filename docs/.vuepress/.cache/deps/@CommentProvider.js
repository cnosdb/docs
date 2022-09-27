import {
  Dt
} from "./chunk-RAI7ZBPW.js";
import {
  client_exports
} from "./chunk-FECFGNAG.js";
import {
  useRoute
} from "./chunk-SWJALXVA.js";
import "./chunk-YACYAO4R.js";
import {
  computed,
  defineComponent,
  h,
  onMounted,
  watch
} from "./chunk-3JL2R52N.js";
import "./chunk-XYQ66V4O.js";
import "./chunk-5E3NKPRU.js";

// node_modules/vuepress-plugin-comment2/lib/client/components/Waline.js
import { Waline as w } from "@waline/client/dist/component.mjs";
import { pageviewCount as d } from "@waline/client/dist/pageview.mjs";
import "/Users/hsm/code/vuepress-theme-hope/node_modules/@waline/client/dist/waline.css";
import "/Users/hsm/code/vuepress-theme-hope/node_modules/vuepress-plugin-comment2/lib/client/styles/waline.scss";
var e = COMMENT_OPTIONS;
var k = WALINE_LOCALES;
var i = Boolean(e.serverURL);
WALINE_META && import("/Users/hsm/code/vuepress-theme-hope/node_modules/@waline/client/dist/waline-meta.css");
var A = defineComponent({ name: "WalineComment", setup() {
  const a = useRoute(), l = (0, client_exports.usePageFrontmatter)(), p = (0, client_exports.usePageLang)(), s = Dt(k);
  let t;
  const c = computed(() => {
    if (!i)
      return false;
    const n = e.comment !== false, o = l.value.comment;
    return Boolean(o) || n !== false && o !== false;
  }), v = computed(() => {
    if (!i)
      return false;
    const n = e.pageview !== false, o = l.value.pageview;
    return Boolean(o) || n !== false && o !== false;
  }), f = computed(() => ({ lang: p.value === "zh-CN" ? "zh-CN" : "en", locale: { ...s.value, ...e.locale || {} }, emoji: ["//unpkg.com/@waline/emojis@1.1.0/weibo", "//unpkg.com/@waline/emojis@1.1.0/bilibili"], dark: "html.dark", ...e, path: (0, client_exports.withBase)(a.path) }));
  return onMounted(() => {
    watch(() => a.path, () => {
      t == null || t(), v.value && setTimeout(() => {
        t = d({ serverURL: e.serverURL, path: (0, client_exports.withBase)(a.path) });
      }, e.delay || 500);
    }, { immediate: true });
  }), () => c.value ? h("div", { class: "waline-wrapper" }, i ? h(w, f.value) : []) : null;
} });

// dep:@CommentProvider
var CommentProvider_default = A;
export {
  CommentProvider_default as default
};
//# sourceMappingURL=@CommentProvider.js.map
