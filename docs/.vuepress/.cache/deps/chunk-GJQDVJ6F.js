import {
  isLinkHttp,
  isLinkMailto,
  isLinkTel
} from "./chunk-LS4IQIE6.js";
import {
  client_exports
} from "./chunk-FECFGNAG.js";
import {
  RouterLink,
  useRoute
} from "./chunk-SWJALXVA.js";
import {
  computed,
  defineComponent,
  h,
  resolveComponent,
  toRef
} from "./chunk-3JL2R52N.js";

// node_modules/vuepress-theme-hope/lib/client/components/Icon.js
var Icon = (props) => {
  const { icon = "" } = props;
  return isLinkHttp(icon) ? h("img", { class: "icon", src: icon }) : icon.startsWith("/") ? h("img", { class: "icon", src: (0, client_exports.withBase)(icon) }) : h(resolveComponent("FontIcon"), props);
};
Icon.displayName = "Icon";
var Icon_default = Icon;

// node_modules/vuepress-theme-hope/lib/client/components/AutoLink.js
import { ExternalLinkIcon } from "@vuepress/plugin-external-link-icon/client";
var AutoLink_default = defineComponent({
  name: "AutoLink",
  inheritAttrs: false,
  props: {
    config: {
      type: Object,
      required: true
    },
    exact: Boolean,
    externalLinkIcon: {
      type: Boolean,
      default: true
    }
  },
  emits: ["focusout"],
  setup(props, { attrs, emit, slots }) {
    const route = useRoute();
    const site = (0, client_exports.useSiteData)();
    const config = toRef(props, "config");
    const hasHttpProtocol = computed(() => isLinkHttp(config.value.link));
    const hasNonHttpProtocal = computed(() => isLinkMailto(config.value.link) || isLinkTel(config.value.link));
    const linkTarget = computed(() => hasNonHttpProtocal.value ? void 0 : config.value.target || (hasHttpProtocol.value ? "_blank" : void 0));
    const isBlankTarget = computed(() => linkTarget.value === "_blank");
    const renderRouterLink = computed(() => !hasHttpProtocol.value && !hasNonHttpProtocal.value && !isBlankTarget.value);
    const anchorRel = computed(() => hasNonHttpProtocal.value ? void 0 : config.value.rel || (isBlankTarget.value ? "noopener noreferrer" : void 0));
    const linkAriaLabel = computed(() => config.value.ariaLabel || config.value.text);
    const shouldBeActiveInSubpath = computed(() => {
      if (props.exact)
        return false;
      const localeKeys = Object.keys(site.value.locales);
      return localeKeys.length ? localeKeys.every((key) => key !== config.value.link) : config.value.link !== "/";
    });
    const isActive = computed(() => renderRouterLink.value ? config.value.activeMatch ? new RegExp(config.value.activeMatch).test(route.path) : !shouldBeActiveInSubpath.value ? route.path === config.value.link : route.path.startsWith(config.value.link) : false);
    return () => {
      var _a, _b, _c;
      const { text, icon, link } = config.value;
      return renderRouterLink.value ? h(RouterLink, {
        to: link,
        "aria-label": linkAriaLabel.value,
        ...attrs,
        class: ["nav-link", { active: isActive.value }, attrs["class"]],
        onFocusout: () => emit("focusout")
      }, () => {
        var _a2, _b2, _c2;
        return ((_a2 = slots["default"]) == null ? void 0 : _a2.call(slots)) || [
          ((_b2 = slots["before"]) == null ? void 0 : _b2.call(slots)) || h(Icon_default, { icon }),
          text,
          (_c2 = slots["after"]) == null ? void 0 : _c2.call(slots)
        ];
      }) : h("a", {
        href: link,
        rel: anchorRel.value,
        target: linkTarget.value,
        "aria-label": linkAriaLabel.value,
        ...attrs,
        class: ["nav-link", attrs["class"]],
        onFocusout: () => emit("focusout")
      }, ((_a = slots["default"]) == null ? void 0 : _a.call(slots)) || [
        ((_b = slots["before"]) == null ? void 0 : _b.call(slots)) || h(Icon_default, { icon }),
        text,
        props.externalLinkIcon ? h(ExternalLinkIcon) : null,
        (_c = slots["after"]) == null ? void 0 : _c.call(slots)
      ]);
    };
  }
});

export {
  Icon_default,
  AutoLink_default
};
//# sourceMappingURL=chunk-GJQDVJ6F.js.map
