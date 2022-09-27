import {
  Ft,
  K,
  Pt,
  Zt,
  st
} from "./chunk-RAI7ZBPW.js";
import {
  client_exports
} from "./chunk-FECFGNAG.js";
import {
  useRoute,
  useRouter
} from "./chunk-SWJALXVA.js";
import {
  useEventListener
} from "./chunk-I5UX3BFI.js";
import {
  computed,
  inject,
  onMounted,
  reactive,
  ref
} from "./chunk-3JL2R52N.js";

// node_modules/vuepress-theme-hope/lib/client/composables/themeData.js
import { useThemeData as _useThemeData, useThemeLocaleData as _useThemeLocaleData } from "@vuepress/plugin-theme-data/client";
var useThemeData = () => _useThemeData();
var useThemeLocaleData = () => _useThemeLocaleData();
var useThemeAuthor = () => {
  const themeLocale = useThemeLocaleData();
  return computed(() => Zt(themeLocale.value.author, false));
};
var usePure = () => computed(() => Boolean(useThemeData().value.pure));

// node_modules/vuepress-theme-hope/lib/client/composables/mobile.js
var useMobile = () => {
  const themeData = useThemeData();
  const isMobile = ref(false);
  const mobileHandler = () => {
    isMobile.value = window.innerWidth < (themeData.value.mobileBreakPoint || 719);
  };
  onMounted(() => {
    mobileHandler();
    useEventListener("resize", mobileHandler, false);
    useEventListener("orientationchange", mobileHandler, false);
  });
  return isMobile;
};

// node_modules/vuepress-theme-hope/lib/client/composables/navigate.js
var useNavigate = () => {
  const router = useRouter();
  const route = useRoute();
  return (url) => {
    if (url) {
      if (url.startsWith("/")) {
        if (route.path !== url)
          void router.push(url);
      } else if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:")) {
        if (window)
          window.open(url);
      } else {
        const base = route.path.slice(0, route.path.lastIndexOf("/"));
        void router.push(`${base}/${encodeURI(url)}`);
      }
    }
  };
};

// node_modules/vuepress-theme-hope/lib/client/composables/navLink.js
var useAutoLink = (item, preferFull = false) => {
  const router = useRouter();
  const { fullPath, meta, name } = st(router, encodeURI(item));
  return {
    text: !preferFull && meta.shortTitle ? meta.shortTitle : meta.title || item,
    link: name === "404" ? item : fullPath,
    ...meta.icon ? { icon: meta.icon } : {}
  };
};

// node_modules/vuepress-theme-hope/lib/client/composables/pageInfo.js
var usePageAuthor = () => {
  const themeLocale = useThemeLocaleData();
  const frontmatter = (0, client_exports.usePageFrontmatter)();
  return computed(() => {
    const { author } = frontmatter.value;
    if (author)
      return Zt(author);
    if (author === false)
      return [];
    return Zt(themeLocale.value.author, false);
  });
};
var usePageCategory = () => {
  const frontmatter = (0, client_exports.usePageFrontmatter)();
  return computed(() => Ft(frontmatter.value.category).map((name) => {
    var _a, _b;
    return {
      name,
      path: ENABLE_BLOG ? ((_b = (_a = inject(Symbol.for("categoryMap"))) == null ? void 0 : _a.value.map[name]) == null ? void 0 : _b.path) || "" : ""
    };
  }));
};
var usePageTag = () => {
  const frontmatter = (0, client_exports.usePageFrontmatter)();
  return computed(() => Pt(frontmatter.value.tag).map((name) => {
    var _a, _b;
    return {
      name,
      path: ENABLE_BLOG ? ((_b = (_a = inject(Symbol.for("tagMap"))) == null ? void 0 : _a.value.map[name]) == null ? void 0 : _b.path) || "" : ""
    };
  }));
};
var usePageDate = () => {
  const frontmatter = (0, client_exports.usePageFrontmatter)();
  const page = (0, client_exports.usePageData)();
  return computed(() => {
    const { date } = frontmatter.value;
    if (date)
      return K(date);
    const { createdTime } = page.value.git || {};
    if (createdTime)
      return K(new Date(createdTime));
    return null;
  });
};
var usePageInfo = () => {
  const themeLocale = useThemeLocaleData();
  const page = (0, client_exports.usePageData)();
  const frontmatter = (0, client_exports.usePageFrontmatter)();
  const author = usePageAuthor();
  const category = usePageCategory();
  const tag = usePageTag();
  const date = usePageDate();
  const config = reactive({
    author: author.value,
    category: category.value,
    date: date.value,
    localizedDate: page.value.localizedDate,
    tag: tag.value,
    isOriginal: frontmatter.value.isOriginal || false,
    readingTime: page.value.readingTime,
    pageview: ENABLE_VISITOR ? "pageview" in frontmatter.value ? frontmatter.value.pageview : true : false
  });
  const items = computed(() => "pageInfo" in frontmatter.value ? frontmatter.value.pageInfo : "pageInfo" in themeLocale.value ? themeLocale.value.pageInfo : null);
  return { config, items };
};

// node_modules/vuepress-theme-hope/lib/client/composables/scrollPromise.js
var promise = null;
var promiseResolve = null;
var scrollPromise = {
  wait: () => promise,
  pending: () => {
    promise = new Promise((resolve) => promiseResolve = resolve);
  },
  resolve: () => {
    promiseResolve == null ? void 0 : promiseResolve();
    promise = null;
    promiseResolve = null;
  }
};
var useScrollPromise = () => scrollPromise;

export {
  useThemeData,
  useThemeLocaleData,
  useThemeAuthor,
  usePure,
  useMobile,
  useNavigate,
  useAutoLink,
  usePageAuthor,
  usePageCategory,
  usePageTag,
  usePageDate,
  usePageInfo,
  useScrollPromise
};
//# sourceMappingURL=chunk-BZSFT4HU.js.map
