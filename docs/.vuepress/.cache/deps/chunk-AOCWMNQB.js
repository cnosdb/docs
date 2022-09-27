import {
  w
} from "./chunk-BGOVVDTY.js";
import {
  useThemeData,
  useThemeLocaleData
} from "./chunk-BZSFT4HU.js";
import {
  nt
} from "./chunk-RAI7ZBPW.js";
import {
  client_exports
} from "./chunk-FECFGNAG.js";
import {
  useRoute
} from "./chunk-SWJALXVA.js";
import {
  useSessionStorage,
  useStorage
} from "./chunk-I5UX3BFI.js";
import {
  computed,
  defineComponent,
  h,
  nextTick,
  ref
} from "./chunk-3JL2R52N.js";

// node_modules/vuepress-theme-hope/lib/client/modules/encrypt/components/icons.js
var LockIcon = () => h(nt, { name: "lock" }, () => h("path", {
  d: "M787.168 952.268H236.832c-30.395 0-55.033-24.638-55.033-55.033V429.45c0-30.395 24.638-55.034 55.033-55.034h82.55V264.35c0-106.38 86.238-192.618 192.618-192.618S704.618 157.97 704.618 264.35v110.066h82.55c30.395 0 55.033 24.639 55.033 55.034v467.785c0 30.395-24.639 55.033-55.033 55.033zM484.483 672.046v115.122h55.034V672.046c31.99-11.373 55.033-41.605 55.033-77.496 0-45.592-36.958-82.55-82.55-82.55s-82.55 36.958-82.55 82.55c0 35.89 23.042 66.123 55.033 77.496zM622.067 264.35c0-60.788-49.28-110.067-110.067-110.067s-110.067 49.28-110.067 110.067v110.066h220.135V264.35z"
}));
LockIcon.displayName = "LockIcon";

// node_modules/vuepress-theme-hope/lib/client/modules/encrypt/components/PasswordModal.js
import "/Users/hsm/code/vuepress-theme-hope/node_modules/vuepress-theme-hope/lib/client/modules/encrypt/styles/password-modal.scss";
var PasswordModal_default = defineComponent({
  name: "PasswordModal",
  props: {
    full: Boolean
  },
  emits: ["verify"],
  setup(props, { emit }) {
    const frontmatter = (0, client_exports.usePageFrontmatter)();
    const themeLocale = useThemeLocaleData();
    const password = ref("");
    const hasTried = ref(false);
    const remember = ref(false);
    const locale = computed(() => themeLocale.value.encryptLocales);
    let hintHandler = null;
    const verify = () => {
      if (hintHandler)
        clearTimeout(hintHandler);
      hasTried.value = false;
      emit("verify", password.value, remember.value);
      void nextTick().then(() => {
        hasTried.value = true;
        hintHandler = setTimeout(() => {
          hasTried.value = false;
        }, 1e3);
      });
    };
    return () => h("div", {
      class: [
        "password-layer",
        { expand: props.full || frontmatter.value["home"] }
      ]
    }, h("div", { class: "password-modal" }, [
      h("div", { class: ["hint", { tried: hasTried.value }] }, hasTried.value ? locale.value.errorHint : h(LockIcon, { "aria-label": locale.value.iconLabel })),
      h("div", { class: "password" }, [
        h("input", {
          type: "password",
          value: password.value,
          placeholder: locale.value.placeholder,
          onInput: ({ target }) => {
            password.value = target.value;
          },
          onKeydown: ({ key }) => {
            if (key === "Enter")
              verify();
          }
        })
      ]),
      h("div", { class: "remember-password" }, [
        h("input", {
          type: "checkbox",
          value: remember.value,
          onChange: () => remember.value = !remember.value
        }),
        h("span", locale.value.remember)
      ]),
      h("button", { class: "submit", onClick: () => verify() }, "OK")
    ]));
  }
});

// node_modules/vuepress-theme-hope/lib/client/modules/encrypt/composables/utils.js
var useEncryptData = () => {
  const themeData = useThemeData();
  return computed(() => themeData.value.encrypt || {});
};

// node_modules/vuepress-theme-hope/lib/client/modules/encrypt/composables/global.js
var STORAGE_KEY = "VUEPRESS_HOPE_GLOBAL_TOKEN";
var useGlobalEcrypt = () => {
  const encryptData = useEncryptData();
  const localToken = useStorage(STORAGE_KEY, "");
  const sessionToken = useSessionStorage(STORAGE_KEY, "");
  const isGlobalEncrypted = computed(() => {
    if (encryptData.value.global && encryptData.value.admin) {
      if (localToken.value)
        return encryptData.value.admin.every((hash) => !w(localToken.value, hash));
      if (sessionToken.value)
        return encryptData.value.admin.every((hash) => !w(sessionToken.value, hash));
      return true;
    }
    return false;
  });
  const validateGlobalToken = (inputToken, keep = false) => {
    (keep ? localToken : sessionToken).value = inputToken;
  };
  return {
    isGlobalEncrypted,
    validateGlobalToken
  };
};

// node_modules/vuepress-theme-hope/lib/client/modules/encrypt/utils/checkToken.js
var checkToken = (token = "", hash) => Boolean(token) && w(token, hash);

// node_modules/vuepress-theme-hope/lib/client/modules/encrypt/composables/path.js
var STORAGE_KEY2 = "VUEPRESS_HOPE_PATH_TOKEN";
var usePathEncrypt = () => {
  const route = useRoute();
  const encryptData = useEncryptData();
  const localToken = useStorage(STORAGE_KEY2, {});
  const sessionToken = useSessionStorage(STORAGE_KEY2, {});
  const getPathMatchedKeys = (path) => typeof encryptData.value.config === "object" ? Object.keys(encryptData.value.config).filter((key) => decodeURI(path).startsWith(key)).sort((a, b) => b.length - a.length) : [];
  const getPathEncryptStatus = (path) => {
    const matchedKeys = getPathMatchedKeys(path);
    if (matchedKeys.length !== 0) {
      const { config = {} } = encryptData.value;
      return !matchedKeys.some((key) => localToken.value[key] && config[key].some((token) => checkToken(localToken.value[key], token)) || sessionToken.value[key] && config[key].some((token) => checkToken(sessionToken.value[key], token)));
    }
    return false;
  };
  const isEncrypted = computed(() => getPathEncryptStatus(route.path));
  const validateToken = (inputToken, keep = false) => {
    const { config = {} } = encryptData.value;
    const matchedKeys = getPathMatchedKeys(route.path);
    for (const hitKey of matchedKeys) {
      if (config[hitKey].filter((token) => checkToken(inputToken, token))) {
        (keep ? localToken : sessionToken).value[hitKey] = inputToken;
        break;
      }
    }
  };
  return {
    isEncrypted,
    getPathEncryptStatus,
    validateToken
  };
};

export {
  PasswordModal_default,
  useGlobalEcrypt,
  usePathEncrypt
};
//# sourceMappingURL=chunk-AOCWMNQB.js.map
