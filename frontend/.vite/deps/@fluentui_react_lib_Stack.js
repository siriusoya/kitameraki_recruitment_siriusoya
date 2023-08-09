import {
  Customizations,
  CustomizerContext,
  __assign,
  __rest,
  __spreadArray,
  concatStyleSets,
  css,
  getGlobalClassNames,
  getNativeProps,
  getRTL,
  htmlElementProperties,
  memoizeFunction,
  mergeCss,
  setVersion,
  warnDeprecations
} from "./chunk-EE257LXQ.js";
import {
  require_react
} from "./chunk-ZAUFE7H7.js";
import {
  __toESM
} from "./chunk-UXIASGQL.js";

// node_modules/@fluentui/foundation-legacy/lib/createComponent.js
var React2 = __toESM(require_react());

// node_modules/@fluentui/foundation-legacy/lib/slots.js
var React = __toESM(require_react());

// node_modules/@fluentui/foundation-legacy/lib/utilities.js
var assign = __assign;

// node_modules/@fluentui/foundation-legacy/lib/slots.js
function withSlots(type, props) {
  var children = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    children[_i - 2] = arguments[_i];
  }
  var slotType = type;
  if (slotType.isSlot) {
    children = React.Children.toArray(children);
    if (children.length === 0) {
      return slotType(props);
    }
    return slotType(__assign(__assign({}, props), { children }));
  } else {
    return React.createElement.apply(React, __spreadArray([type, props], children, false));
  }
}
function createFactory(DefaultComponent, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.defaultProp, defaultProp = _a === void 0 ? "children" : _a;
  var result = function(componentProps, userProps, userSlotOptions, defaultStyles, theme) {
    if (React.isValidElement(userProps)) {
      return userProps;
    }
    var flattenedUserProps = _translateShorthand(defaultProp, userProps);
    var finalProps = _constructFinalProps(defaultStyles, theme, componentProps, flattenedUserProps);
    if (userSlotOptions) {
      if (userSlotOptions.component) {
        var UserComponent = userSlotOptions.component;
        return React.createElement(UserComponent, __assign({}, finalProps));
      }
      if (userSlotOptions.render) {
        return userSlotOptions.render(finalProps, DefaultComponent);
      }
    }
    return React.createElement(DefaultComponent, __assign({}, finalProps));
  };
  return result;
}
var defaultFactory = memoizeFunction(function(type) {
  return createFactory(type);
});
function getSlots(userProps, slots) {
  var result = {};
  var mixedProps = userProps;
  var _loop_1 = function(name_12) {
    if (slots.hasOwnProperty(name_12)) {
      var slot = function(componentProps) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }
        if (args.length > 0) {
          throw new Error("Any module using getSlots must use withSlots. Please see withSlots javadoc for more info.");
        }
        return _renderSlot(
          slots[name_12],
          // TODO: this cast to any is hiding a relationship issue between the first two args
          componentProps,
          mixedProps[name_12],
          mixedProps.slots && mixedProps.slots[name_12],
          // _defaultStyles should always be present, but a check for existence is added to make view tests
          // easier to use.
          mixedProps._defaultStyles && mixedProps._defaultStyles[name_12],
          mixedProps.theme
        );
      };
      slot.isSlot = true;
      result[name_12] = slot;
    }
  };
  for (var name_1 in slots) {
    _loop_1(name_1);
  }
  return result;
}
function _translateShorthand(defaultProp, slotProps) {
  var _a;
  var transformedProps;
  if (typeof slotProps === "string" || typeof slotProps === "number" || typeof slotProps === "boolean") {
    transformedProps = (_a = {}, _a[defaultProp] = slotProps, _a);
  } else {
    transformedProps = slotProps;
  }
  return transformedProps;
}
function _constructFinalProps(defaultStyles, theme) {
  var allProps = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    allProps[_i - 2] = arguments[_i];
  }
  var finalProps = {};
  var classNames = [];
  for (var _a = 0, allProps_1 = allProps; _a < allProps_1.length; _a++) {
    var props = allProps_1[_a];
    classNames.push(props && props.className);
    assign(finalProps, props);
  }
  finalProps.className = mergeCss([defaultStyles, classNames], { rtl: getRTL(theme) });
  return finalProps;
}
function _renderSlot(ComponentType, componentProps, userProps, slotOptions, defaultStyles, theme) {
  if (ComponentType.create !== void 0) {
    return ComponentType.create(componentProps, userProps, slotOptions, defaultStyles);
  } else {
    return defaultFactory(ComponentType)(componentProps, userProps, slotOptions, defaultStyles, theme);
  }
}

// node_modules/@fluentui/foundation-legacy/lib/createComponent.js
function createComponent(view, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.factoryOptions, factoryOptions = _a === void 0 ? {} : _a;
  var defaultProp = factoryOptions.defaultProp;
  var ResultComponent = function(componentProps) {
    var settings = _getCustomizations(options.displayName, React2.useContext(CustomizerContext), options.fields);
    var stateReducer = options.state;
    if (stateReducer) {
      componentProps = __assign(__assign({}, componentProps), stateReducer(componentProps));
    }
    var theme = componentProps.theme || settings.theme;
    var tokens = _resolveTokens(componentProps, theme, options.tokens, settings.tokens, componentProps.tokens);
    var styles2 = _resolveStyles(componentProps, theme, tokens, options.styles, settings.styles, componentProps.styles);
    var viewProps = __assign(__assign({}, componentProps), { styles: styles2, tokens, _defaultStyles: styles2, theme });
    return view(viewProps);
  };
  ResultComponent.displayName = options.displayName || view.name;
  if (defaultProp) {
    ResultComponent.create = createFactory(ResultComponent, { defaultProp });
  }
  assign(ResultComponent, options.statics);
  return ResultComponent;
}
function _resolveStyles(props, theme, tokens) {
  var allStyles = [];
  for (var _i = 3; _i < arguments.length; _i++) {
    allStyles[_i - 3] = arguments[_i];
  }
  return concatStyleSets.apply(void 0, allStyles.map(function(styles2) {
    return typeof styles2 === "function" ? styles2(props, theme, tokens) : styles2;
  }));
}
function _resolveTokens(props, theme) {
  var allTokens = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    allTokens[_i - 2] = arguments[_i];
  }
  var tokens = {};
  for (var _a = 0, allTokens_1 = allTokens; _a < allTokens_1.length; _a++) {
    var currentTokens = allTokens_1[_a];
    if (currentTokens) {
      currentTokens = typeof currentTokens === "function" ? currentTokens(props, theme) : currentTokens;
      if (Array.isArray(currentTokens)) {
        currentTokens = _resolveTokens.apply(void 0, __spreadArray([props, theme], currentTokens, false));
      }
      assign(tokens, currentTokens);
    }
  }
  return tokens;
}
function _getCustomizations(displayName, context, fields) {
  var DefaultFields = ["theme", "styles", "tokens"];
  return Customizations.getSettings(fields || DefaultFields, displayName, context.customizations);
}

// node_modules/@fluentui/foundation-legacy/lib/ThemeProvider.js
var React3 = __toESM(require_react());

// node_modules/@fluentui/foundation-legacy/lib/hooks/controlled.js
var React4 = __toESM(require_react());

// node_modules/@fluentui/foundation-legacy/lib/version.js
setVersion("@fluentui/foundation-legacy", "8.2.43");

// node_modules/@fluentui/react/lib/components/Stack/StackItem/StackItem.styles.js
var GlobalClassNames = {
  root: "ms-StackItem"
};
var alignMap = {
  start: "flex-start",
  end: "flex-end"
};
var StackItemStyles = function(props, theme, tokens) {
  var grow = props.grow, shrink = props.shrink, disableShrink = props.disableShrink, align = props.align, verticalFill = props.verticalFill, order = props.order, className = props.className, _a = props.basis, basis = _a === void 0 ? "auto" : _a;
  var classNames = getGlobalClassNames(GlobalClassNames, theme);
  return {
    root: [
      theme.fonts.medium,
      classNames.root,
      {
        flexBasis: basis,
        margin: tokens.margin,
        padding: tokens.padding,
        height: verticalFill ? "100%" : "auto",
        width: "auto"
      },
      grow && {
        flexGrow: grow === true ? 1 : grow
      },
      (disableShrink || !grow && !shrink) && {
        flexShrink: 0
      },
      shrink && !disableShrink && {
        flexShrink: 1
      },
      align && {
        alignSelf: alignMap[align] || align
      },
      order && {
        order
      },
      className
    ]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  };
};

// node_modules/@fluentui/react/lib/components/Stack/StackItem/StackItem.js
var StackItemView = function(props) {
  var children = props.children;
  var nativeProps = getNativeProps(props, htmlElementProperties);
  if (children == null) {
    return null;
  }
  var Slots = getSlots(props, {
    root: "div"
  });
  return withSlots(Slots.root, __assign({}, nativeProps), children);
};
var StackItem = createComponent(StackItemView, {
  displayName: "StackItem",
  styles: StackItemStyles
});

// node_modules/@fluentui/react/lib/components/Stack/Stack.js
var React5 = __toESM(require_react());

// node_modules/@fluentui/react/lib/components/Stack/StackUtils.js
var _getThemedSpacing = function(space, theme) {
  if (theme.spacing.hasOwnProperty(space)) {
    return theme.spacing[space];
  }
  return space;
};
var _getValueUnitGap = function(gap) {
  var numericalPart = parseFloat(gap);
  var numericalValue = isNaN(numericalPart) ? 0 : numericalPart;
  var numericalString = isNaN(numericalPart) ? "" : numericalPart.toString();
  var unitPart = gap.substring(numericalString.toString().length);
  return {
    value: numericalValue,
    unit: unitPart || "px"
  };
};
var parseGap = function(gap, theme) {
  if (gap === void 0 || gap === "") {
    return {
      rowGap: {
        value: 0,
        unit: "px"
      },
      columnGap: {
        value: 0,
        unit: "px"
      }
    };
  }
  if (typeof gap === "number") {
    return {
      rowGap: {
        value: gap,
        unit: "px"
      },
      columnGap: {
        value: gap,
        unit: "px"
      }
    };
  }
  var splitGap = gap.split(" ");
  if (splitGap.length > 2) {
    return {
      rowGap: {
        value: 0,
        unit: "px"
      },
      columnGap: {
        value: 0,
        unit: "px"
      }
    };
  }
  if (splitGap.length === 2) {
    return {
      rowGap: _getValueUnitGap(_getThemedSpacing(splitGap[0], theme)),
      columnGap: _getValueUnitGap(_getThemedSpacing(splitGap[1], theme))
    };
  }
  var calculatedGap = _getValueUnitGap(_getThemedSpacing(gap, theme));
  return {
    rowGap: calculatedGap,
    columnGap: calculatedGap
  };
};
var parsePadding = function(padding, theme) {
  if (padding === void 0 || typeof padding === "number" || padding === "") {
    return padding;
  }
  var paddingValues = padding.split(" ");
  if (paddingValues.length < 2) {
    return _getThemedSpacing(padding, theme);
  }
  return paddingValues.reduce(function(padding1, padding2) {
    return _getThemedSpacing(padding1, theme) + " " + _getThemedSpacing(padding2, theme);
  });
};

// node_modules/@fluentui/react/lib/components/Stack/Stack.styles.js
var nameMap = {
  start: "flex-start",
  end: "flex-end"
};
var GlobalClassNames2 = {
  root: "ms-Stack",
  inner: "ms-Stack-inner",
  child: "ms-Stack-child"
};
var styles = function(props, theme, tokens) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
  var className = props.className, disableShrink = props.disableShrink, enableScopedSelectors = props.enableScopedSelectors, grow = props.grow, horizontal = props.horizontal, horizontalAlign = props.horizontalAlign, reversed = props.reversed, verticalAlign = props.verticalAlign, verticalFill = props.verticalFill, wrap = props.wrap;
  var classNames = getGlobalClassNames(GlobalClassNames2, theme);
  var childrenGap = tokens && tokens.childrenGap ? tokens.childrenGap : props.gap;
  var maxHeight = tokens && tokens.maxHeight ? tokens.maxHeight : props.maxHeight;
  var maxWidth = tokens && tokens.maxWidth ? tokens.maxWidth : props.maxWidth;
  var padding = tokens && tokens.padding ? tokens.padding : props.padding;
  var _p = parseGap(childrenGap, theme), rowGap = _p.rowGap, columnGap = _p.columnGap;
  var horizontalMargin = "".concat(-0.5 * columnGap.value).concat(columnGap.unit);
  var verticalMargin = "".concat(-0.5 * rowGap.value).concat(rowGap.unit);
  var childStyles = {
    textOverflow: "ellipsis"
  };
  var childSelector = "> " + (enableScopedSelectors ? "." + GlobalClassNames2.child : "*");
  var disableShrinkStyles = (_a = {}, // flexShrink styles are applied by the StackItem
  _a["".concat(childSelector, ":not(.").concat(GlobalClassNames.root, ")")] = {
    flexShrink: 0
  }, _a);
  if (wrap) {
    return {
      root: [
        classNames.root,
        {
          flexWrap: "wrap",
          maxWidth,
          maxHeight,
          width: "auto",
          overflow: "visible",
          height: "100%"
        },
        horizontalAlign && (_b = {}, _b[horizontal ? "justifyContent" : "alignItems"] = nameMap[horizontalAlign] || horizontalAlign, _b),
        verticalAlign && (_c = {}, _c[horizontal ? "alignItems" : "justifyContent"] = nameMap[verticalAlign] || verticalAlign, _c),
        className,
        {
          // not allowed to be overridden by className
          // since this is necessary in order to prevent collapsing margins
          display: "flex"
        },
        horizontal && {
          height: verticalFill ? "100%" : "auto"
        }
      ],
      inner: [
        classNames.inner,
        (_d = {
          display: "flex",
          flexWrap: "wrap",
          marginLeft: horizontalMargin,
          marginRight: horizontalMargin,
          marginTop: verticalMargin,
          marginBottom: verticalMargin,
          overflow: "visible",
          boxSizing: "border-box",
          padding: parsePadding(padding, theme),
          // avoid unnecessary calc() calls if horizontal gap is 0
          width: columnGap.value === 0 ? "100%" : "calc(100% + ".concat(columnGap.value).concat(columnGap.unit, ")"),
          maxWidth: "100vw"
        }, _d[childSelector] = __assign({ margin: "".concat(0.5 * rowGap.value).concat(rowGap.unit, " ").concat(0.5 * columnGap.value).concat(columnGap.unit) }, childStyles), _d),
        disableShrink && disableShrinkStyles,
        horizontalAlign && (_e = {}, _e[horizontal ? "justifyContent" : "alignItems"] = nameMap[horizontalAlign] || horizontalAlign, _e),
        verticalAlign && (_f = {}, _f[horizontal ? "alignItems" : "justifyContent"] = nameMap[verticalAlign] || verticalAlign, _f),
        horizontal && (_g = {
          flexDirection: reversed ? "row-reverse" : "row",
          // avoid unnecessary calc() calls if vertical gap is 0
          height: rowGap.value === 0 ? "100%" : "calc(100% + ".concat(rowGap.value).concat(rowGap.unit, ")")
        }, _g[childSelector] = {
          maxWidth: columnGap.value === 0 ? "100%" : "calc(100% - ".concat(columnGap.value).concat(columnGap.unit, ")")
        }, _g),
        !horizontal && (_h = {
          flexDirection: reversed ? "column-reverse" : "column",
          height: "calc(100% + ".concat(rowGap.value).concat(rowGap.unit, ")")
        }, _h[childSelector] = {
          maxHeight: rowGap.value === 0 ? "100%" : "calc(100% - ".concat(rowGap.value).concat(rowGap.unit, ")")
        }, _h)
      ]
    };
  }
  return {
    root: [
      classNames.root,
      (_j = {
        display: "flex",
        flexDirection: horizontal ? reversed ? "row-reverse" : "row" : reversed ? "column-reverse" : "column",
        flexWrap: "nowrap",
        width: "auto",
        height: verticalFill ? "100%" : "auto",
        maxWidth,
        maxHeight,
        padding: parsePadding(padding, theme),
        boxSizing: "border-box"
      }, _j[childSelector] = childStyles, _j),
      disableShrink && disableShrinkStyles,
      grow && {
        flexGrow: grow === true ? 1 : grow
      },
      horizontalAlign && (_k = {}, _k[horizontal ? "justifyContent" : "alignItems"] = nameMap[horizontalAlign] || horizontalAlign, _k),
      verticalAlign && (_l = {}, _l[horizontal ? "alignItems" : "justifyContent"] = nameMap[verticalAlign] || verticalAlign, _l),
      horizontal && columnGap.value > 0 && (_m = {}, // apply gap margin to every direct child except the first direct child if the direction is not reversed,
      // and the last direct one if it is
      _m[reversed ? "".concat(childSelector, ":not(:last-child)") : "".concat(childSelector, ":not(:first-child)")] = {
        marginLeft: "".concat(columnGap.value).concat(columnGap.unit)
      }, _m),
      !horizontal && rowGap.value > 0 && (_o = {}, // apply gap margin to every direct child except the first direct child if the direction is not reversed,
      // and the last direct one if it is
      _o[reversed ? "".concat(childSelector, ":not(:last-child)") : "".concat(childSelector, ":not(:first-child)")] = {
        marginTop: "".concat(rowGap.value).concat(rowGap.unit)
      }, _o),
      className
    ]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  };
};

// node_modules/@fluentui/react/lib/components/Stack/Stack.js
var StackView = function(props) {
  var _a = props.as, RootType = _a === void 0 ? "div" : _a, _b = props.disableShrink, disableShrink = _b === void 0 ? false : _b, _c = props.enableScopedSelectors, enableScopedSelectors = _c === void 0 ? false : _c, wrap = props.wrap, rest = __rest(props, ["as", "disableShrink", "enableScopedSelectors", "wrap"]);
  warnDeprecations("Stack", props, {
    gap: "tokens.childrenGap",
    maxHeight: "tokens.maxHeight",
    maxWidth: "tokens.maxWidth",
    padding: "tokens.padding"
  });
  var stackChildren = _processStackChildren(props.children, { disableShrink, enableScopedSelectors });
  var nativeProps = getNativeProps(rest, htmlElementProperties);
  var Slots = getSlots(props, {
    root: RootType,
    inner: "div"
  });
  if (wrap) {
    return withSlots(
      Slots.root,
      __assign({}, nativeProps),
      withSlots(Slots.inner, null, stackChildren)
    );
  }
  return withSlots(Slots.root, __assign({}, nativeProps), stackChildren);
};
function _processStackChildren(children, _a) {
  var disableShrink = _a.disableShrink, enableScopedSelectors = _a.enableScopedSelectors;
  var childrenArray = React5.Children.toArray(children);
  childrenArray = React5.Children.map(childrenArray, function(child) {
    if (!child || !React5.isValidElement(child)) {
      return child;
    }
    if (child.type === React5.Fragment) {
      return child.props.children ? _processStackChildren(child.props.children, { disableShrink, enableScopedSelectors }) : null;
    }
    var childAsReactElement = child;
    var defaultItemProps = {};
    if (_isStackItem(child)) {
      defaultItemProps = { shrink: !disableShrink };
    }
    var childClassName = childAsReactElement.props.className;
    return React5.cloneElement(childAsReactElement, __assign(__assign(__assign(__assign({}, defaultItemProps), childAsReactElement.props), childClassName && { className: childClassName }), enableScopedSelectors && { className: css(GlobalClassNames2.child, childClassName) }));
  });
  return childrenArray;
}
function _isStackItem(item) {
  return !!item && typeof item === "object" && !!item.type && // StackItem is generated by createComponent, so we need to check its displayName instead of name
  item.type.displayName === StackItem.displayName;
}
var StackStatics = {
  Item: StackItem
};
var Stack = createComponent(StackView, {
  displayName: "Stack",
  styles,
  statics: StackStatics
});
export {
  Stack,
  StackItem
};
//# sourceMappingURL=@fluentui_react_lib_Stack.js.map
