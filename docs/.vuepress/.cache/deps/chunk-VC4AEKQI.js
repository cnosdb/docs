import {
  Transition,
  TransitionGroup,
  defineComponent,
  h
} from "./chunk-3JL2R52N.js";

// node_modules/vuepress-theme-hope/lib/client/components/transitions/DropTransition.js
var DropTransition_default = defineComponent({
  name: "DropTransition",
  components: {
    Transition,
    TransitionGroup
  },
  props: {
    type: { type: String, default: "single" },
    delay: { type: Number, default: 0 },
    duration: { type: Number, default: 0.25 },
    appear: Boolean
  },
  setup(props, { slots }) {
    const setStyle = (item) => {
      item.style.transition = `transform ${props.duration}s ease-in-out ${props.delay}s, opacity ${props.duration}s ease-in-out ${props.delay}s`;
      item.style.transform = "translateY(-20px)";
      item.style.opacity = "0";
    };
    const unsetStyle = (item) => {
      item.style.transform = "translateY(0)";
      item.style.opacity = "1";
    };
    return () => h(
      props.type === "single" ? Transition : TransitionGroup,
      {
        name: "drop",
        appear: props.appear,
        onAppear: setStyle,
        onAfterAppear: unsetStyle,
        onEnter: setStyle,
        onAfterEnter: unsetStyle,
        onBeforeLeave: setStyle
      },
      () => {
        var _a;
        return (_a = slots["default"]) == null ? void 0 : _a.call(slots);
      }
    );
  }
});

export {
  DropTransition_default
};
//# sourceMappingURL=chunk-VC4AEKQI.js.map
