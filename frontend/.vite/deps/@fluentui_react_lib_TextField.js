import {
  AnimationClassNames,
  Async,
  DelayedRender,
  FontWeights,
  HighContrastSelector,
  IconFontSizes,
  KeyCodes,
  __assign,
  __extends,
  __spreadArray,
  classNamesFunction,
  css,
  divProperties,
  getFocusStyle,
  getGlobalClassNames,
  getHighContrastNoAdjustStyle,
  getIcon,
  getId,
  getInputFocusStyle,
  getNativeProps,
  getPlaceholderStyles,
  getWindow,
  htmlElementProperties,
  imgProperties,
  initializeComponentRef,
  inputProperties,
  isControlled,
  isIE11,
  memoizeFunction,
  mergeStyleSets,
  normalize,
  setVersion,
  styled,
  textAreaProperties,
  useIsomorphicLayoutEffect,
  warn,
  warnControlledUsage,
  warnMutuallyExclusive
} from "./chunk-EE257LXQ.js";
import {
  require_react
} from "./chunk-ZAUFE7H7.js";
import {
  __toESM
} from "./chunk-UXIASGQL.js";

// node_modules/@fluentui/react/lib/components/TextField/TextField.base.js
var React25 = __toESM(require_react());

// node_modules/@fluentui/react/lib/components/Label/Label.base.js
var React = __toESM(require_react());
var getClassNames = classNamesFunction({
  // Label is used a lot by other components.
  // It's likely to see expected cases which pass different className to the Label.
  // Therefore setting a larger cache size.
  cacheSize: 100
});
var LabelBase = (
  /** @class */
  function(_super) {
    __extends(LabelBase2, _super);
    function LabelBase2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    LabelBase2.prototype.render = function() {
      var _a = this.props, _b = _a.as, RootType = _b === void 0 ? "label" : _b, children = _a.children, className = _a.className, disabled = _a.disabled, styles = _a.styles, required = _a.required, theme = _a.theme;
      var classNames2 = getClassNames(styles, {
        className,
        disabled,
        required,
        theme
      });
      return React.createElement(RootType, __assign({}, getNativeProps(this.props, divProperties), { className: classNames2.root }), children);
    };
    return LabelBase2;
  }(React.Component)
);

// node_modules/@fluentui/react/lib/components/Label/Label.styles.js
var getStyles = function(props) {
  var _a;
  var theme = props.theme, className = props.className, disabled = props.disabled, required = props.required;
  var semanticColors = theme.semanticColors;
  var labelFontWeight = FontWeights.semibold;
  var labelColor = semanticColors.bodyText;
  var labelDisabledColor = semanticColors.disabledBodyText;
  var labelRequiredStarColor = semanticColors.errorText;
  return {
    root: [
      "ms-Label",
      theme.fonts.medium,
      {
        fontWeight: labelFontWeight,
        color: labelColor,
        boxSizing: "border-box",
        boxShadow: "none",
        margin: 0,
        display: "block",
        padding: "5px 0",
        wordWrap: "break-word",
        overflowWrap: "break-word"
      },
      disabled && {
        color: labelDisabledColor,
        selectors: (_a = {}, _a[HighContrastSelector] = __assign({ color: "GrayText" }, getHighContrastNoAdjustStyle()), _a)
      },
      required && {
        selectors: {
          "::after": {
            content: "' *'",
            color: labelRequiredStarColor,
            paddingRight: 12
          }
        }
      },
      className
    ]
  };
};

// node_modules/@fluentui/react/lib/components/Label/Label.js
var Label = styled(LabelBase, getStyles, void 0, {
  scope: "Label"
});

// node_modules/@fluentui/react/lib/components/Icon/Icon.base.js
var React23 = __toESM(require_react());

// node_modules/@fluentui/react/lib/components/Icon/Icon.types.js
var IconType;
(function(IconType2) {
  IconType2[IconType2["default"] = 0] = "default";
  IconType2[IconType2["image"] = 1] = "image";
  IconType2[IconType2["Default"] = 1e5] = "Default";
  IconType2[IconType2["Image"] = 100001] = "Image";
})(IconType || (IconType = {}));

// node_modules/@fluentui/react/lib/components/Image/Image.base.js
var React21 = __toESM(require_react());

// node_modules/@fluentui/react/lib/components/Image/Image.types.js
var ImageFit;
(function(ImageFit2) {
  ImageFit2[ImageFit2["center"] = 0] = "center";
  ImageFit2[ImageFit2["contain"] = 1] = "contain";
  ImageFit2[ImageFit2["cover"] = 2] = "cover";
  ImageFit2[ImageFit2["none"] = 3] = "none";
  ImageFit2[ImageFit2["centerCover"] = 4] = "centerCover";
  ImageFit2[ImageFit2["centerContain"] = 5] = "centerContain";
})(ImageFit || (ImageFit = {}));
var ImageCoverStyle;
(function(ImageCoverStyle2) {
  ImageCoverStyle2[ImageCoverStyle2["landscape"] = 0] = "landscape";
  ImageCoverStyle2[ImageCoverStyle2["portrait"] = 1] = "portrait";
})(ImageCoverStyle || (ImageCoverStyle = {}));
var ImageLoadState;
(function(ImageLoadState2) {
  ImageLoadState2[ImageLoadState2["notLoaded"] = 0] = "notLoaded";
  ImageLoadState2[ImageLoadState2["loaded"] = 1] = "loaded";
  ImageLoadState2[ImageLoadState2["error"] = 2] = "error";
  ImageLoadState2[ImageLoadState2["errorLoaded"] = 3] = "errorLoaded";
})(ImageLoadState || (ImageLoadState = {}));

// node_modules/@fluentui/react-hooks/lib/version.js
setVersion("@fluentui/react-hooks", "8.6.29");

// node_modules/@fluentui/react-hooks/lib/useAsync.js
var React2 = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/useBoolean.js
var React4 = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/useConst.js
var React3 = __toESM(require_react());
function useConst(initialValue) {
  var ref = React3.useRef();
  if (ref.current === void 0) {
    ref.current = {
      value: typeof initialValue === "function" ? initialValue() : initialValue
    };
  }
  return ref.current.value;
}

// node_modules/@fluentui/react-hooks/lib/useConstCallback.js
var React5 = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/useControllableValue.js
var React6 = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/useEventCallback.js
var React7 = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/useForceUpdate.js
var React8 = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/useId.js
var React9 = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/useMergedRefs.js
var React10 = __toESM(require_react());
function useMergedRefs() {
  var refs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    refs[_i] = arguments[_i];
  }
  var mergedCallback = React10.useCallback(function(value) {
    mergedCallback.current = value;
    for (var _i2 = 0, refs_1 = refs; _i2 < refs_1.length; _i2++) {
      var ref = refs_1[_i2];
      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        ref.current = value;
      }
    }
  }, __spreadArray([], refs, true));
  return mergedCallback;
}

// node_modules/@fluentui/react-hooks/lib/useMount.js
var React11 = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/useMountSync.js
var React12 = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/useOnEvent.js
var React13 = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/usePrevious.js
var import_react = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/useRefEffect.js
var React14 = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/useSetInterval.js
var React15 = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/useSetTimeout.js
var React16 = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/useTarget.js
var React18 = __toESM(require_react());

// node_modules/@fluentui/react-window-provider/lib/WindowProvider.js
var React17 = __toESM(require_react());
var WindowContext = React17.createContext({
  window: typeof window === "object" ? window : void 0
});

// node_modules/@fluentui/react-window-provider/lib/version.js
setVersion("@fluentui/react-window-provider", "2.2.15");

// node_modules/@fluentui/react-hooks/lib/useUnmount.js
var React19 = __toESM(require_react());

// node_modules/@fluentui/react-hooks/lib/useWarnings.js
var React20 = __toESM(require_react());

// node_modules/@fluentui/react/lib/components/Image/Image.base.js
var getClassNames2 = classNamesFunction();
var SVG_REGEX = /\.svg$/i;
var KEY_PREFIX = "fabricImage";
function useLoadState(props, imageElement) {
  var onLoadingStateChange = props.onLoadingStateChange, onLoad = props.onLoad, onError = props.onError, src = props.src;
  var _a = React21.useState(ImageLoadState.notLoaded), loadState = _a[0], setLoadState = _a[1];
  useIsomorphicLayoutEffect(function() {
    setLoadState(ImageLoadState.notLoaded);
  }, [src]);
  React21.useEffect(function() {
    if (loadState === ImageLoadState.notLoaded) {
      var isLoaded = imageElement.current ? src && imageElement.current.naturalWidth > 0 && imageElement.current.naturalHeight > 0 || imageElement.current.complete && SVG_REGEX.test(src) : false;
      if (isLoaded) {
        setLoadState(ImageLoadState.loaded);
      }
    }
  });
  React21.useEffect(function() {
    onLoadingStateChange === null || onLoadingStateChange === void 0 ? void 0 : onLoadingStateChange(loadState);
  }, [loadState]);
  var onImageLoaded = React21.useCallback(function(ev) {
    onLoad === null || onLoad === void 0 ? void 0 : onLoad(ev);
    if (src) {
      setLoadState(ImageLoadState.loaded);
    }
  }, [src, onLoad]);
  var onImageError = React21.useCallback(function(ev) {
    onError === null || onError === void 0 ? void 0 : onError(ev);
    setLoadState(ImageLoadState.error);
  }, [onError]);
  return [loadState, onImageLoaded, onImageError];
}
var ImageBase = React21.forwardRef(function(props, forwardedRef) {
  var frameElement = React21.useRef();
  var imageElement = React21.useRef();
  var _a = useLoadState(props, imageElement), loadState = _a[0], onImageLoaded = _a[1], onImageError = _a[2];
  var imageProps = getNativeProps(props, imgProperties, [
    "width",
    "height"
  ]);
  var src = props.src, alt = props.alt, width = props.width, height = props.height, _b = props.shouldFadeIn, shouldFadeIn = _b === void 0 ? true : _b, shouldStartVisible = props.shouldStartVisible, className = props.className, imageFit = props.imageFit, role = props.role, maximizeFrame = props.maximizeFrame, styles = props.styles, theme = props.theme, loading = props.loading;
  var coverStyle = useCoverStyle(props, loadState, imageElement, frameElement);
  var classNames2 = getClassNames2(styles, {
    theme,
    className,
    width,
    height,
    maximizeFrame,
    shouldFadeIn,
    shouldStartVisible,
    isLoaded: loadState === ImageLoadState.loaded || loadState === ImageLoadState.notLoaded && props.shouldStartVisible,
    isLandscape: coverStyle === ImageCoverStyle.landscape,
    isCenter: imageFit === ImageFit.center,
    isCenterContain: imageFit === ImageFit.centerContain,
    isCenterCover: imageFit === ImageFit.centerCover,
    isContain: imageFit === ImageFit.contain,
    isCover: imageFit === ImageFit.cover,
    isNone: imageFit === ImageFit.none,
    isError: loadState === ImageLoadState.error,
    isNotImageFit: imageFit === void 0
  });
  return React21.createElement(
    "div",
    { className: classNames2.root, style: { width, height }, ref: frameElement },
    React21.createElement("img", __assign({}, imageProps, { onLoad: onImageLoaded, onError: onImageError, key: KEY_PREFIX + props.src || "", className: classNames2.image, ref: useMergedRefs(imageElement, forwardedRef), src, alt, role, loading }))
  );
});
ImageBase.displayName = "ImageBase";
function useCoverStyle(props, loadState, imageElement, frameElement) {
  var previousLoadState = React21.useRef(loadState);
  var coverStyle = React21.useRef();
  if (coverStyle === void 0 || previousLoadState.current === ImageLoadState.notLoaded && loadState === ImageLoadState.loaded) {
    coverStyle.current = computeCoverStyle(props, loadState, imageElement, frameElement);
  }
  previousLoadState.current = loadState;
  return coverStyle.current;
}
function computeCoverStyle(props, loadState, imageElement, frameElement) {
  var imageFit = props.imageFit, width = props.width, height = props.height;
  if (props.coverStyle !== void 0) {
    return props.coverStyle;
  } else if (loadState === ImageLoadState.loaded && (imageFit === ImageFit.cover || imageFit === ImageFit.contain || imageFit === ImageFit.centerContain || imageFit === ImageFit.centerCover) && imageElement.current && frameElement.current) {
    var desiredRatio = void 0;
    if (typeof width === "number" && typeof height === "number" && imageFit !== ImageFit.centerContain && imageFit !== ImageFit.centerCover) {
      desiredRatio = width / height;
    } else {
      desiredRatio = frameElement.current.clientWidth / frameElement.current.clientHeight;
    }
    var naturalRatio = imageElement.current.naturalWidth / imageElement.current.naturalHeight;
    if (naturalRatio > desiredRatio) {
      return ImageCoverStyle.landscape;
    }
  }
  return ImageCoverStyle.portrait;
}

// node_modules/@fluentui/react/lib/components/Image/Image.styles.js
var GlobalClassNames = {
  root: "ms-Image",
  rootMaximizeFrame: "ms-Image--maximizeFrame",
  image: "ms-Image-image",
  imageCenter: "ms-Image-image--center",
  imageContain: "ms-Image-image--contain",
  imageCover: "ms-Image-image--cover",
  imageCenterContain: "ms-Image-image--centerContain",
  imageCenterCover: "ms-Image-image--centerCover",
  imageNone: "ms-Image-image--none",
  imageLandscape: "ms-Image-image--landscape",
  imagePortrait: "ms-Image-image--portrait"
};
var getStyles2 = function(props) {
  var className = props.className, width = props.width, height = props.height, maximizeFrame = props.maximizeFrame, isLoaded = props.isLoaded, shouldFadeIn = props.shouldFadeIn, shouldStartVisible = props.shouldStartVisible, isLandscape = props.isLandscape, isCenter = props.isCenter, isContain = props.isContain, isCover = props.isCover, isCenterContain = props.isCenterContain, isCenterCover = props.isCenterCover, isNone = props.isNone, isError = props.isError, isNotImageFit = props.isNotImageFit, theme = props.theme;
  var classNames2 = getGlobalClassNames(GlobalClassNames, theme);
  var ImageFitStyles = {
    position: "absolute",
    left: "50% /* @noflip */",
    top: "50%",
    transform: "translate(-50%,-50%)"
    // @todo test RTL renders transform: translate(50%,-50%);
  };
  var window2 = getWindow();
  var supportsObjectFit = window2 !== void 0 && // eslint-disable-next-line @fluentui/max-len
  // cast needed as vendor prefixed `msMaxTouchPoints` api is no longer part of TS lib declaration - introduced with TS 4.4
  window2.navigator.msMaxTouchPoints === void 0;
  var fallbackObjectFitStyles = isContain && isLandscape || isCover && !isLandscape ? { width: "100%", height: "auto" } : { width: "auto", height: "100%" };
  return {
    root: [
      classNames2.root,
      theme.fonts.medium,
      {
        overflow: "hidden"
      },
      maximizeFrame && [
        classNames2.rootMaximizeFrame,
        {
          height: "100%",
          width: "100%"
        }
      ],
      isLoaded && shouldFadeIn && !shouldStartVisible && AnimationClassNames.fadeIn400,
      (isCenter || isContain || isCover || isCenterContain || isCenterCover) && {
        position: "relative"
      },
      className
    ],
    image: [
      classNames2.image,
      {
        display: "block",
        opacity: 0
      },
      isLoaded && [
        "is-loaded",
        {
          opacity: 1
        }
      ],
      isCenter && [classNames2.imageCenter, ImageFitStyles],
      isContain && [
        classNames2.imageContain,
        supportsObjectFit && {
          width: "100%",
          height: "100%",
          objectFit: "contain"
        },
        !supportsObjectFit && fallbackObjectFitStyles,
        !supportsObjectFit && ImageFitStyles
      ],
      isCover && [
        classNames2.imageCover,
        supportsObjectFit && {
          width: "100%",
          height: "100%",
          objectFit: "cover"
        },
        !supportsObjectFit && fallbackObjectFitStyles,
        !supportsObjectFit && ImageFitStyles
      ],
      isCenterContain && [
        classNames2.imageCenterContain,
        isLandscape && {
          maxWidth: "100%"
        },
        !isLandscape && {
          maxHeight: "100%"
        },
        ImageFitStyles
      ],
      isCenterCover && [
        classNames2.imageCenterCover,
        isLandscape && {
          maxHeight: "100%"
        },
        !isLandscape && {
          maxWidth: "100%"
        },
        ImageFitStyles
      ],
      isNone && [
        classNames2.imageNone,
        {
          width: "auto",
          height: "auto"
        }
      ],
      isNotImageFit && [
        !!width && !height && {
          height: "auto",
          width: "100%"
        },
        !width && !!height && {
          height: "100%",
          width: "auto"
        },
        !!width && !!height && {
          height: "100%",
          width: "100%"
        }
      ],
      isLandscape && classNames2.imageLandscape,
      !isLandscape && classNames2.imagePortrait,
      !isLoaded && "is-notLoaded",
      shouldFadeIn && "is-fadeIn",
      isError && "is-error"
    ]
  };
};

// node_modules/@fluentui/react/lib/components/Image/Image.js
var Image = styled(ImageBase, getStyles2, void 0, {
  scope: "Image"
}, true);
Image.displayName = "Image";

// node_modules/@fluentui/react/lib/components/Icon/FontIcon.js
var React22 = __toESM(require_react());

// node_modules/@fluentui/react/lib/components/Icon/Icon.styles.js
var classNames = mergeStyleSets({
  root: {
    display: "inline-block"
  },
  placeholder: [
    "ms-Icon-placeHolder",
    {
      width: "1em"
    }
  ],
  image: [
    "ms-Icon-imageContainer",
    {
      overflow: "hidden"
    }
  ]
});
var MS_ICON = "ms-Icon";
var getStyles3 = function(props) {
  var className = props.className, iconClassName = props.iconClassName, isPlaceholder = props.isPlaceholder, isImage = props.isImage, styles = props.styles;
  return {
    root: [
      isPlaceholder && classNames.placeholder,
      classNames.root,
      isImage && classNames.image,
      iconClassName,
      className,
      styles && styles.root,
      // eslint-disable-next-line deprecation/deprecation
      styles && styles.imageContainer
    ]
  };
};

// node_modules/@fluentui/react/lib/components/Icon/FontIcon.js
var getIconContent = memoizeFunction(
  function(iconName) {
    var _a = getIcon(iconName) || {
      subset: {},
      code: void 0
    }, code = _a.code, subset = _a.subset;
    if (!code) {
      return null;
    }
    return {
      children: code,
      iconClassName: subset.className,
      fontFamily: subset.fontFace && subset.fontFace.fontFamily,
      mergeImageProps: subset.mergeImageProps
    };
  },
  void 0,
  true
  /*ignoreNullOrUndefinedResult */
);
var FontIcon = function(props) {
  var iconName = props.iconName, className = props.className, _a = props.style, style = _a === void 0 ? {} : _a;
  var iconContent = getIconContent(iconName) || {};
  var iconClassName = iconContent.iconClassName, children = iconContent.children, fontFamily = iconContent.fontFamily, mergeImageProps = iconContent.mergeImageProps;
  var nativeProps = getNativeProps(props, htmlElementProperties);
  var accessibleName = props["aria-label"] || props.title;
  var containerProps = props["aria-label"] || props["aria-labelledby"] || props.title ? {
    role: mergeImageProps ? void 0 : "img"
  } : {
    "aria-hidden": true
  };
  var finalChildren = children;
  if (mergeImageProps) {
    if (typeof children === "object" && typeof children.props === "object" && accessibleName) {
      finalChildren = React22.cloneElement(children, { alt: accessibleName });
    }
  }
  return React22.createElement("i", __assign({ "data-icon-name": iconName }, containerProps, nativeProps, mergeImageProps ? {
    title: void 0,
    "aria-label": void 0
  } : {}, {
    className: css(MS_ICON, classNames.root, iconClassName, !iconName && classNames.placeholder, className),
    // Apply the font family this way to ensure it doesn't get overridden by Fabric Core ms-Icon styles
    // https://github.com/microsoft/fluentui/issues/10449
    style: __assign({ fontFamily }, style)
  }), finalChildren);
};
var getFontIcon = memoizeFunction(function(iconName, className, ariaLabel) {
  return FontIcon({ iconName, className, "aria-label": ariaLabel });
});

// node_modules/@fluentui/react/lib/components/Icon/Icon.base.js
var getClassNames3 = classNamesFunction({
  // Icon is used a lot by other components.
  // It's likely to see expected cases which pass different className to the Icon.
  // Therefore setting a larger cache size.
  cacheSize: 100
});
var IconBase = (
  /** @class */
  function(_super) {
    __extends(IconBase2, _super);
    function IconBase2(props) {
      var _this = _super.call(this, props) || this;
      _this._onImageLoadingStateChange = function(state) {
        if (_this.props.imageProps && _this.props.imageProps.onLoadingStateChange) {
          _this.props.imageProps.onLoadingStateChange(state);
        }
        if (state === ImageLoadState.error) {
          _this.setState({ imageLoadError: true });
        }
      };
      _this.state = {
        imageLoadError: false
      };
      return _this;
    }
    IconBase2.prototype.render = function() {
      var _a = this.props, children = _a.children, className = _a.className, styles = _a.styles, iconName = _a.iconName, imageErrorAs = _a.imageErrorAs, theme = _a.theme;
      var isPlaceholder = typeof iconName === "string" && iconName.length === 0;
      var isImage = (
        // eslint-disable-next-line deprecation/deprecation
        !!this.props.imageProps || this.props.iconType === IconType.image || this.props.iconType === IconType.Image
      );
      var iconContent = getIconContent(iconName) || {};
      var iconClassName = iconContent.iconClassName, iconContentChildren = iconContent.children, mergeImageProps = iconContent.mergeImageProps;
      var classNames2 = getClassNames3(styles, {
        theme,
        className,
        iconClassName,
        isImage,
        isPlaceholder
      });
      var RootType = isImage ? "span" : "i";
      var nativeProps = getNativeProps(this.props, htmlElementProperties, [
        "aria-label"
      ]);
      var imageLoadError = this.state.imageLoadError;
      var imageProps = __assign(__assign({}, this.props.imageProps), { onLoadingStateChange: this._onImageLoadingStateChange });
      var ImageType = imageLoadError && imageErrorAs || Image;
      var ariaLabel = this.props["aria-label"] || this.props.ariaLabel;
      var accessibleName = imageProps.alt || ariaLabel || this.props.title;
      var hasName = !!(accessibleName || this.props["aria-labelledby"] || imageProps["aria-label"] || imageProps["aria-labelledby"]);
      var containerProps = hasName ? {
        role: isImage || mergeImageProps ? void 0 : "img",
        "aria-label": isImage || mergeImageProps ? void 0 : accessibleName
      } : {
        "aria-hidden": true
      };
      var finalIconContentChildren = iconContentChildren;
      if (mergeImageProps && iconContentChildren && typeof iconContentChildren === "object" && accessibleName) {
        finalIconContentChildren = React23.cloneElement(iconContentChildren, {
          alt: accessibleName
        });
      }
      return React23.createElement(RootType, __assign({ "data-icon-name": iconName }, containerProps, nativeProps, mergeImageProps ? {
        title: void 0,
        "aria-label": void 0
      } : {}, { className: classNames2.root }), isImage ? React23.createElement(ImageType, __assign({}, imageProps)) : children || finalIconContentChildren);
    };
    return IconBase2;
  }(React23.Component)
);

// node_modules/@fluentui/react/lib/components/Icon/Icon.js
var Icon = styled(IconBase, getStyles3, void 0, {
  scope: "Icon"
}, true);
Icon.displayName = "Icon";

// node_modules/@fluentui/react/lib/components/Icon/ImageIcon.js
var React24 = __toESM(require_react());

// node_modules/@fluentui/react/lib/components/TextField/TextField.base.js
var getClassNames4 = classNamesFunction();
var DEFAULT_STATE_VALUE = "";
var COMPONENT_NAME = "TextField";
var REVEAL_ICON_NAME = "RedEye";
var HIDE_ICON_NAME = "Hide";
var TextFieldBase = (
  /** @class */
  function(_super) {
    __extends(TextFieldBase2, _super);
    function TextFieldBase2(props) {
      var _this = _super.call(this, props) || this;
      _this._textElement = React25.createRef();
      _this._onFocus = function(ev) {
        if (_this.props.onFocus) {
          _this.props.onFocus(ev);
        }
        _this.setState({ isFocused: true }, function() {
          if (_this.props.validateOnFocusIn) {
            _this._validate(_this.value);
          }
        });
      };
      _this._onBlur = function(ev) {
        if (_this.props.onBlur) {
          _this.props.onBlur(ev);
        }
        _this.setState({ isFocused: false }, function() {
          if (_this.props.validateOnFocusOut) {
            _this._validate(_this.value);
          }
        });
      };
      _this._onRenderLabel = function(props2) {
        var label = props2.label, required = props2.required;
        var labelStyles = _this._classNames.subComponentStyles ? _this._classNames.subComponentStyles.label : void 0;
        if (label) {
          return React25.createElement(Label, { required, htmlFor: _this._id, styles: labelStyles, disabled: props2.disabled, id: _this._labelId }, props2.label);
        }
        return null;
      };
      _this._onRenderDescription = function(props2) {
        if (props2.description) {
          return React25.createElement("span", { className: _this._classNames.description }, props2.description);
        }
        return null;
      };
      _this._onRevealButtonClick = function(event) {
        _this.setState(function(prevState) {
          return { isRevealingPassword: !prevState.isRevealingPassword };
        });
      };
      _this._onInputChange = function(event) {
        var _a2, _b;
        var element = event.target;
        var value = element.value;
        var previousValue = _getValue(_this.props, _this.state) || "";
        if (value === void 0 || value === _this._lastChangeValue || value === previousValue) {
          _this._lastChangeValue = void 0;
          return;
        }
        _this._lastChangeValue = value;
        (_b = (_a2 = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a2, event, value);
        if (!_this._isControlled) {
          _this.setState({ uncontrolledValue: value });
        }
      };
      initializeComponentRef(_this);
      _this._async = new Async(_this);
      if (true) {
        warnMutuallyExclusive(COMPONENT_NAME, props, {
          errorMessage: "onGetErrorMessage"
        });
      }
      _this._fallbackId = getId(COMPONENT_NAME);
      _this._descriptionId = getId(COMPONENT_NAME + "Description");
      _this._labelId = getId(COMPONENT_NAME + "Label");
      _this._prefixId = getId(COMPONENT_NAME + "Prefix");
      _this._suffixId = getId(COMPONENT_NAME + "Suffix");
      _this._warnControlledUsage();
      var _a = props.defaultValue, defaultValue = _a === void 0 ? DEFAULT_STATE_VALUE : _a;
      if (typeof defaultValue === "number") {
        defaultValue = String(defaultValue);
      }
      _this.state = {
        uncontrolledValue: _this._isControlled ? void 0 : defaultValue,
        isFocused: false,
        errorMessage: ""
      };
      _this._delayedValidate = _this._async.debounce(_this._validate, _this.props.deferredValidationTime);
      _this._lastValidation = 0;
      return _this;
    }
    Object.defineProperty(TextFieldBase2.prototype, "value", {
      /**
       * Gets the current value of the text field.
       */
      get: function() {
        return _getValue(this.props, this.state);
      },
      enumerable: false,
      configurable: true
    });
    TextFieldBase2.prototype.componentDidMount = function() {
      this._adjustInputHeight();
      if (this.props.validateOnLoad) {
        this._validate(this.value);
      }
    };
    TextFieldBase2.prototype.componentWillUnmount = function() {
      this._async.dispose();
    };
    TextFieldBase2.prototype.getSnapshotBeforeUpdate = function(prevProps, prevState) {
      return {
        selection: [this.selectionStart, this.selectionEnd]
      };
    };
    TextFieldBase2.prototype.componentDidUpdate = function(prevProps, prevState, snapshot) {
      var props = this.props;
      var _a = (snapshot || {}).selection, selection = _a === void 0 ? [null, null] : _a;
      var start = selection[0], end = selection[1];
      if (!!prevProps.multiline !== !!props.multiline && prevState.isFocused) {
        this.focus();
        if (start !== null && end !== null && start >= 0 && end >= 0) {
          this.setSelectionRange(start, end);
        }
      }
      if (prevProps.value !== props.value) {
        this._lastChangeValue = void 0;
      }
      var prevValue = _getValue(prevProps, prevState);
      var value = this.value;
      if (prevValue !== value) {
        this._warnControlledUsage(prevProps);
        if (this.state.errorMessage && !props.errorMessage) {
          this.setState({ errorMessage: "" });
        }
        this._adjustInputHeight();
        if (_shouldValidateAllChanges(props)) {
          this._delayedValidate(value);
        }
      }
    };
    TextFieldBase2.prototype.render = function() {
      var _a = this.props, borderless = _a.borderless, className = _a.className, disabled = _a.disabled, invalid = _a.invalid, iconProps = _a.iconProps, inputClassName = _a.inputClassName, label = _a.label, multiline = _a.multiline, required = _a.required, underlined = _a.underlined, prefix = _a.prefix, resizable = _a.resizable, suffix = _a.suffix, theme = _a.theme, styles = _a.styles, autoAdjustHeight = _a.autoAdjustHeight, canRevealPassword = _a.canRevealPassword, revealPasswordAriaLabel = _a.revealPasswordAriaLabel, type = _a.type, _b = _a.onRenderPrefix, onRenderPrefix = _b === void 0 ? this._onRenderPrefix : _b, _c = _a.onRenderSuffix, onRenderSuffix = _c === void 0 ? this._onRenderSuffix : _c, _d = _a.onRenderLabel, onRenderLabel = _d === void 0 ? this._onRenderLabel : _d, _e = _a.onRenderDescription, onRenderDescription = _e === void 0 ? this._onRenderDescription : _e;
      var _f = this.state, isFocused = _f.isFocused, isRevealingPassword = _f.isRevealingPassword;
      var errorMessage = this._errorMessage;
      var isInvalid = typeof invalid === "boolean" ? invalid : !!errorMessage;
      var hasRevealButton = !!canRevealPassword && type === "password" && _browserNeedsRevealButton();
      var classNames2 = this._classNames = getClassNames4(styles, {
        theme,
        className,
        disabled,
        focused: isFocused,
        required,
        multiline,
        hasLabel: !!label,
        hasErrorMessage: isInvalid,
        borderless,
        resizable,
        hasIcon: !!iconProps,
        underlined,
        inputClassName,
        autoAdjustHeight,
        hasRevealButton
      });
      return (
        // eslint-disable-next-line deprecation/deprecation
        React25.createElement(
          "div",
          { ref: this.props.elementRef, className: classNames2.root },
          React25.createElement(
            "div",
            { className: classNames2.wrapper },
            onRenderLabel(this.props, this._onRenderLabel),
            React25.createElement(
              "div",
              { className: classNames2.fieldGroup },
              (prefix !== void 0 || this.props.onRenderPrefix) && React25.createElement("div", { className: classNames2.prefix, id: this._prefixId }, onRenderPrefix(this.props, this._onRenderPrefix)),
              multiline ? this._renderTextArea() : this._renderInput(),
              iconProps && React25.createElement(Icon, __assign({ className: classNames2.icon }, iconProps)),
              hasRevealButton && // Explicitly set type="button" since the default button type within a form is "submit"
              React25.createElement(
                "button",
                { "aria-label": revealPasswordAriaLabel, className: classNames2.revealButton, onClick: this._onRevealButtonClick, "aria-pressed": !!isRevealingPassword, type: "button" },
                React25.createElement(
                  "span",
                  { className: classNames2.revealSpan },
                  React25.createElement(Icon, { className: classNames2.revealIcon, iconName: isRevealingPassword ? HIDE_ICON_NAME : REVEAL_ICON_NAME })
                )
              ),
              (suffix !== void 0 || this.props.onRenderSuffix) && React25.createElement("div", { className: classNames2.suffix, id: this._suffixId }, onRenderSuffix(this.props, this._onRenderSuffix))
            )
          ),
          this._isDescriptionAvailable && React25.createElement(
            "span",
            { id: this._descriptionId },
            onRenderDescription(this.props, this._onRenderDescription),
            errorMessage && React25.createElement(
              "div",
              { role: "alert" },
              React25.createElement(DelayedRender, null, this._renderErrorMessage())
            )
          )
        )
      );
    };
    TextFieldBase2.prototype.focus = function() {
      if (this._textElement.current) {
        this._textElement.current.focus();
      }
    };
    TextFieldBase2.prototype.blur = function() {
      if (this._textElement.current) {
        this._textElement.current.blur();
      }
    };
    TextFieldBase2.prototype.select = function() {
      if (this._textElement.current) {
        this._textElement.current.select();
      }
    };
    TextFieldBase2.prototype.setSelectionStart = function(value) {
      if (this._textElement.current) {
        this._textElement.current.selectionStart = value;
      }
    };
    TextFieldBase2.prototype.setSelectionEnd = function(value) {
      if (this._textElement.current) {
        this._textElement.current.selectionEnd = value;
      }
    };
    Object.defineProperty(TextFieldBase2.prototype, "selectionStart", {
      /**
       * Gets the selection start of the text field
       */
      get: function() {
        return this._textElement.current ? this._textElement.current.selectionStart : -1;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(TextFieldBase2.prototype, "selectionEnd", {
      /**
       * Gets the selection end of the text field
       */
      get: function() {
        return this._textElement.current ? this._textElement.current.selectionEnd : -1;
      },
      enumerable: false,
      configurable: true
    });
    TextFieldBase2.prototype.setSelectionRange = function(start, end) {
      if (this._textElement.current) {
        this._textElement.current.setSelectionRange(start, end);
      }
    };
    TextFieldBase2.prototype._warnControlledUsage = function(prevProps) {
      warnControlledUsage({
        componentId: this._id,
        componentName: COMPONENT_NAME,
        props: this.props,
        oldProps: prevProps,
        valueProp: "value",
        defaultValueProp: "defaultValue",
        onChangeProp: "onChange",
        readOnlyProp: "readOnly"
      });
      if (this.props.value === null && !this._hasWarnedNullValue) {
        this._hasWarnedNullValue = true;
        warn("Warning: 'value' prop on '".concat(COMPONENT_NAME, "' should not be null. Consider using an ") + "empty string to clear the component or undefined to indicate an uncontrolled component.");
      }
    };
    Object.defineProperty(TextFieldBase2.prototype, "_id", {
      /** Returns `props.id` if available, or a fallback if not. */
      get: function() {
        return this.props.id || this._fallbackId;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(TextFieldBase2.prototype, "_isControlled", {
      get: function() {
        return isControlled(this.props, "value");
      },
      enumerable: false,
      configurable: true
    });
    TextFieldBase2.prototype._onRenderPrefix = function(props) {
      var prefix = props.prefix;
      return React25.createElement("span", { style: { paddingBottom: "1px" } }, prefix);
    };
    TextFieldBase2.prototype._onRenderSuffix = function(props) {
      var suffix = props.suffix;
      return React25.createElement("span", { style: { paddingBottom: "1px" } }, suffix);
    };
    Object.defineProperty(TextFieldBase2.prototype, "_errorMessage", {
      /**
       * Current error message from either `props.errorMessage` or the result of `props.onGetErrorMessage`.
       *
       * - If there is no validation error or we have not validated the input value, errorMessage is an empty string.
       * - If we have done the validation and there is validation error, errorMessage is the validation error message.
       */
      get: function() {
        var _a = this.props.errorMessage, errorMessage = _a === void 0 ? this.state.errorMessage : _a;
        return errorMessage || "";
      },
      enumerable: false,
      configurable: true
    });
    TextFieldBase2.prototype._renderErrorMessage = function() {
      var errorMessage = this._errorMessage;
      return errorMessage ? typeof errorMessage === "string" ? React25.createElement(
        "p",
        { className: this._classNames.errorMessage },
        React25.createElement("span", { "data-automation-id": "error-message" }, errorMessage)
      ) : React25.createElement("div", { className: this._classNames.errorMessage, "data-automation-id": "error-message" }, errorMessage) : null;
    };
    Object.defineProperty(TextFieldBase2.prototype, "_isDescriptionAvailable", {
      /**
       * If a custom description render function is supplied then treat description as always available.
       * Otherwise defer to the presence of description or error message text.
       */
      get: function() {
        var props = this.props;
        return !!(props.onRenderDescription || props.description || this._errorMessage);
      },
      enumerable: false,
      configurable: true
    });
    TextFieldBase2.prototype._renderTextArea = function() {
      var _a = this.props.invalid, invalid = _a === void 0 ? !!this._errorMessage : _a;
      var textAreaProps = getNativeProps(this.props, textAreaProperties, ["defaultValue"]);
      var ariaLabelledBy = this.props["aria-labelledby"] || (this.props.label ? this._labelId : void 0);
      return React25.createElement("textarea", __assign({ id: this._id }, textAreaProps, { ref: this._textElement, value: this.value || "", onInput: this._onInputChange, onChange: this._onInputChange, className: this._classNames.field, "aria-labelledby": ariaLabelledBy, "aria-describedby": this._isDescriptionAvailable ? this._descriptionId : this.props["aria-describedby"], "aria-invalid": invalid, "aria-label": this.props.ariaLabel, readOnly: this.props.readOnly, onFocus: this._onFocus, onBlur: this._onBlur }));
    };
    TextFieldBase2.prototype._renderInput = function() {
      var _a = this.props, ariaLabel = _a.ariaLabel, _b = _a.invalid, invalid = _b === void 0 ? !!this._errorMessage : _b, onRenderPrefix = _a.onRenderPrefix, onRenderSuffix = _a.onRenderSuffix, prefix = _a.prefix, suffix = _a.suffix, _c = _a.type, type = _c === void 0 ? "text" : _c, label = _a.label;
      var labelIds = [];
      label && labelIds.push(this._labelId);
      (prefix !== void 0 || onRenderPrefix) && labelIds.push(this._prefixId);
      (suffix !== void 0 || onRenderSuffix) && labelIds.push(this._suffixId);
      var inputProps = __assign(__assign({ type: this.state.isRevealingPassword ? "text" : type, id: this._id }, getNativeProps(this.props, inputProperties, ["defaultValue", "type"])), { "aria-labelledby": this.props["aria-labelledby"] || (labelIds.length > 0 ? labelIds.join(" ") : void 0), ref: this._textElement, value: this.value || "", onInput: this._onInputChange, onChange: this._onInputChange, className: this._classNames.field, "aria-label": ariaLabel, "aria-describedby": this._isDescriptionAvailable ? this._descriptionId : this.props["aria-describedby"], "aria-invalid": invalid, onFocus: this._onFocus, onBlur: this._onBlur });
      var defaultRender = function(updatedInputProps) {
        return React25.createElement("input", __assign({}, updatedInputProps));
      };
      var onRenderInput = this.props.onRenderInput || defaultRender;
      return onRenderInput(inputProps, defaultRender);
    };
    TextFieldBase2.prototype._validate = function(value) {
      var _this = this;
      if (this._latestValidateValue === value && _shouldValidateAllChanges(this.props)) {
        return;
      }
      this._latestValidateValue = value;
      var onGetErrorMessage = this.props.onGetErrorMessage;
      var result = onGetErrorMessage && onGetErrorMessage(value || "");
      if (result !== void 0) {
        if (typeof result === "string" || !("then" in result)) {
          this.setState({ errorMessage: result });
          this._notifyAfterValidate(value, result);
        } else {
          var currentValidation_1 = ++this._lastValidation;
          result.then(function(errorMessage) {
            if (currentValidation_1 === _this._lastValidation) {
              _this.setState({ errorMessage });
            }
            _this._notifyAfterValidate(value, errorMessage);
          });
        }
      } else {
        this._notifyAfterValidate(value, "");
      }
    };
    TextFieldBase2.prototype._notifyAfterValidate = function(value, errorMessage) {
      if (value === this.value && this.props.onNotifyValidationResult) {
        this.props.onNotifyValidationResult(errorMessage, value);
      }
    };
    TextFieldBase2.prototype._adjustInputHeight = function() {
      if (this._textElement.current && this.props.autoAdjustHeight && this.props.multiline) {
        var textField = this._textElement.current;
        textField.style.height = "";
        textField.style.height = textField.scrollHeight + "px";
      }
    };
    TextFieldBase2.defaultProps = {
      resizable: true,
      deferredValidationTime: 200,
      validateOnLoad: true
    };
    return TextFieldBase2;
  }(React25.Component)
);
function _getValue(props, state) {
  var _a = props.value, value = _a === void 0 ? state.uncontrolledValue : _a;
  if (typeof value === "number") {
    return String(value);
  }
  return value;
}
function _shouldValidateAllChanges(props) {
  return !(props.validateOnFocusIn || props.validateOnFocusOut);
}
var __browserNeedsRevealButton;
function _browserNeedsRevealButton() {
  if (typeof __browserNeedsRevealButton !== "boolean") {
    var win = getWindow();
    if (win === null || win === void 0 ? void 0 : win.navigator) {
      var isEdge = /Edg/.test(win.navigator.userAgent || "");
      __browserNeedsRevealButton = !(isIE11() || isEdge);
    } else {
      __browserNeedsRevealButton = true;
    }
  }
  return __browserNeedsRevealButton;
}

// node_modules/@fluentui/react/lib/components/TextField/TextField.styles.js
var globalClassNames = {
  root: "ms-TextField",
  description: "ms-TextField-description",
  errorMessage: "ms-TextField-errorMessage",
  field: "ms-TextField-field",
  fieldGroup: "ms-TextField-fieldGroup",
  prefix: "ms-TextField-prefix",
  suffix: "ms-TextField-suffix",
  wrapper: "ms-TextField-wrapper",
  revealButton: "ms-TextField-reveal",
  multiline: "ms-TextField--multiline",
  borderless: "ms-TextField--borderless",
  underlined: "ms-TextField--underlined",
  unresizable: "ms-TextField--unresizable",
  required: "is-required",
  disabled: "is-disabled",
  active: "is-active"
};
function getLabelStyles(props) {
  var underlined = props.underlined, disabled = props.disabled, focused = props.focused, theme = props.theme;
  var palette = theme.palette, fonts = theme.fonts;
  return function() {
    var _a;
    return {
      root: [
        underlined && disabled && {
          color: palette.neutralTertiary
        },
        underlined && {
          fontSize: fonts.medium.fontSize,
          marginRight: 8,
          paddingLeft: 12,
          paddingRight: 0,
          lineHeight: "22px",
          height: 32
        },
        underlined && focused && {
          selectors: (_a = {}, _a[HighContrastSelector] = {
            height: 31
            // -1px to prevent jumpiness in HC with the increased border-width to 2px
          }, _a)
        }
      ]
    };
  };
}
function getStyles4(props) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
  var theme = props.theme, className = props.className, disabled = props.disabled, focused = props.focused, required = props.required, multiline = props.multiline, hasLabel = props.hasLabel, borderless = props.borderless, underlined = props.underlined, hasIcon = props.hasIcon, resizable = props.resizable, hasErrorMessage = props.hasErrorMessage, inputClassName = props.inputClassName, autoAdjustHeight = props.autoAdjustHeight, hasRevealButton = props.hasRevealButton;
  var semanticColors = theme.semanticColors, effects = theme.effects, fonts = theme.fonts;
  var classNames2 = getGlobalClassNames(globalClassNames, theme);
  var fieldPrefixSuffix = {
    // Suffix/Prefix are not editable so the disabled slot perfectly fits.
    background: semanticColors.disabledBackground,
    color: !disabled ? semanticColors.inputPlaceholderText : semanticColors.disabledText,
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    lineHeight: 1,
    whiteSpace: "nowrap",
    flexShrink: 0,
    selectors: (_a = {}, _a[HighContrastSelector] = {
      background: "Window",
      color: disabled ? "GrayText" : "WindowText"
    }, _a)
  };
  var placeholderStyles = [
    {
      color: semanticColors.inputPlaceholderText,
      opacity: 1,
      selectors: (_b = {}, _b[HighContrastSelector] = {
        color: "GrayText"
      }, _b)
    }
  ];
  var disabledPlaceholderStyles = {
    color: semanticColors.disabledText,
    selectors: (_c = {}, _c[HighContrastSelector] = {
      color: "GrayText"
    }, _c)
  };
  return {
    root: [
      classNames2.root,
      fonts.medium,
      required && classNames2.required,
      disabled && classNames2.disabled,
      focused && classNames2.active,
      multiline && classNames2.multiline,
      borderless && classNames2.borderless,
      underlined && classNames2.underlined,
      normalize,
      {
        position: "relative"
      },
      className
    ],
    wrapper: [
      classNames2.wrapper,
      underlined && [
        {
          display: "flex",
          borderBottom: "1px solid ".concat(!hasErrorMessage ? semanticColors.inputBorder : semanticColors.errorText),
          width: "100%"
        },
        disabled && {
          borderBottomColor: semanticColors.disabledBackground,
          selectors: (_d = {}, _d[HighContrastSelector] = __assign({ borderColor: "GrayText" }, getHighContrastNoAdjustStyle()), _d)
        },
        !disabled && {
          selectors: {
            ":hover": {
              borderBottomColor: !hasErrorMessage ? semanticColors.inputBorderHovered : semanticColors.errorText,
              selectors: (_e = {}, _e[HighContrastSelector] = __assign({ borderBottomColor: "Highlight" }, getHighContrastNoAdjustStyle()), _e)
            }
          }
        },
        focused && [
          {
            position: "relative"
          },
          getInputFocusStyle(!hasErrorMessage ? semanticColors.inputFocusBorderAlt : semanticColors.errorText, 0, "borderBottom")
        ]
      ]
    ],
    fieldGroup: [
      classNames2.fieldGroup,
      normalize,
      {
        border: "1px solid ".concat(semanticColors.inputBorder),
        borderRadius: effects.roundedCorner2,
        background: semanticColors.inputBackground,
        cursor: "text",
        height: 32,
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        position: "relative"
      },
      multiline && {
        minHeight: "60px",
        height: "auto",
        display: "flex"
      },
      !focused && !disabled && {
        selectors: {
          ":hover": {
            borderColor: semanticColors.inputBorderHovered,
            selectors: (_f = {}, _f[HighContrastSelector] = __assign({ borderColor: "Highlight" }, getHighContrastNoAdjustStyle()), _f)
          }
        }
      },
      focused && !underlined && getInputFocusStyle(!hasErrorMessage ? semanticColors.inputFocusBorderAlt : semanticColors.errorText, effects.roundedCorner2),
      disabled && {
        borderColor: semanticColors.disabledBackground,
        selectors: (_g = {}, _g[HighContrastSelector] = __assign({ borderColor: "GrayText" }, getHighContrastNoAdjustStyle()), _g),
        cursor: "default"
      },
      borderless && {
        border: "none"
      },
      borderless && focused && {
        border: "none",
        selectors: {
          ":after": {
            border: "none"
          }
        }
      },
      underlined && {
        flex: "1 1 0px",
        border: "none",
        textAlign: "left"
      },
      underlined && disabled && {
        backgroundColor: "transparent"
      },
      hasErrorMessage && !underlined && {
        borderColor: semanticColors.errorText,
        selectors: {
          "&:hover": {
            borderColor: semanticColors.errorText
          }
        }
      },
      !hasLabel && required && {
        selectors: (_h = {
          ":before": {
            content: "'*'",
            color: semanticColors.errorText,
            position: "absolute",
            top: -5,
            right: -10
          }
        }, _h[HighContrastSelector] = {
          selectors: {
            ":before": {
              color: "WindowText",
              right: -14
              // moving the * 4 pixel to right to alleviate border clipping in HC mode.
            }
          }
        }, _h)
      }
    ],
    field: [
      fonts.medium,
      classNames2.field,
      normalize,
      {
        borderRadius: 0,
        border: "none",
        background: "none",
        backgroundColor: "transparent",
        color: semanticColors.inputText,
        padding: "0 8px",
        width: "100%",
        minWidth: 0,
        textOverflow: "ellipsis",
        outline: 0,
        selectors: (_j = {
          "&:active, &:focus, &:hover": { outline: 0 },
          "::-ms-clear": {
            display: "none"
          }
        }, _j[HighContrastSelector] = {
          background: "Window",
          color: disabled ? "GrayText" : "WindowText"
        }, _j)
      },
      getPlaceholderStyles(placeholderStyles),
      multiline && !resizable && [
        classNames2.unresizable,
        {
          resize: "none"
        }
      ],
      multiline && {
        minHeight: "inherit",
        lineHeight: 17,
        flexGrow: 1,
        paddingTop: 6,
        paddingBottom: 6,
        overflow: "auto",
        width: "100%"
      },
      multiline && autoAdjustHeight && {
        overflow: "hidden"
      },
      hasIcon && !hasRevealButton && {
        paddingRight: 24
      },
      multiline && hasIcon && {
        paddingRight: 40
      },
      disabled && [
        {
          backgroundColor: semanticColors.disabledBackground,
          color: semanticColors.disabledText,
          borderColor: semanticColors.disabledBackground
        },
        getPlaceholderStyles(disabledPlaceholderStyles)
      ],
      underlined && {
        textAlign: "left"
      },
      focused && !borderless && {
        selectors: (_k = {}, _k[HighContrastSelector] = {
          paddingLeft: 11,
          paddingRight: 11
        }, _k)
      },
      focused && multiline && !borderless && {
        selectors: (_l = {}, _l[HighContrastSelector] = {
          paddingTop: 4
          // take into consideration the 2px increased border-width (not when borderless).
        }, _l)
      },
      inputClassName
    ],
    icon: [
      multiline && {
        paddingRight: 24,
        alignItems: "flex-end"
      },
      {
        pointerEvents: "none",
        position: "absolute",
        bottom: 6,
        right: 8,
        top: "auto",
        fontSize: IconFontSizes.medium,
        lineHeight: 18
      },
      disabled && {
        color: semanticColors.disabledText
      }
    ],
    description: [
      classNames2.description,
      {
        color: semanticColors.bodySubtext,
        fontSize: fonts.xSmall.fontSize
      }
    ],
    errorMessage: [
      classNames2.errorMessage,
      AnimationClassNames.slideDownIn20,
      fonts.small,
      {
        color: semanticColors.errorText,
        margin: 0,
        paddingTop: 5,
        display: "flex",
        alignItems: "center"
      }
    ],
    prefix: [classNames2.prefix, fieldPrefixSuffix],
    suffix: [classNames2.suffix, fieldPrefixSuffix],
    revealButton: [
      classNames2.revealButton,
      "ms-Button",
      "ms-Button--icon",
      getFocusStyle(theme, { inset: 1 }),
      {
        height: 30,
        width: 32,
        border: "none",
        padding: "0px 4px",
        backgroundColor: "transparent",
        color: semanticColors.link,
        selectors: {
          ":hover": {
            outline: 0,
            color: semanticColors.primaryButtonBackgroundHovered,
            backgroundColor: semanticColors.buttonBackgroundHovered,
            selectors: (_m = {}, _m[HighContrastSelector] = {
              borderColor: "Highlight",
              color: "Highlight"
            }, _m)
          },
          ":focus": { outline: 0 }
        }
      },
      hasIcon && {
        marginRight: 28
      }
    ],
    revealSpan: {
      display: "flex",
      height: "100%",
      alignItems: "center"
    },
    revealIcon: {
      margin: "0px 4px",
      pointerEvents: "none",
      bottom: 6,
      right: 8,
      top: "auto",
      fontSize: IconFontSizes.medium,
      lineHeight: 18
    },
    subComponentStyles: {
      label: getLabelStyles(props)
    }
  };
}

// node_modules/@fluentui/react/lib/components/TextField/TextField.js
var TextField = styled(TextFieldBase, getStyles4, void 0, {
  scope: "TextField"
});

// node_modules/@fluentui/react/lib/components/TextField/MaskedTextField/MaskedTextField.js
var React26 = __toESM(require_react());

// node_modules/@fluentui/react/lib/components/TextField/MaskedTextField/inputMask.js
var DEFAULT_MASK_FORMAT_CHARS = {
  "9": /[0-9]/,
  a: /[a-zA-Z]/,
  "*": /[a-zA-Z0-9]/
};
function parseMask(mask, formatChars) {
  if (formatChars === void 0) {
    formatChars = DEFAULT_MASK_FORMAT_CHARS;
  }
  if (!mask) {
    return [];
  }
  var maskCharData = [];
  var escapedChars = 0;
  for (var i = 0; i + escapedChars < mask.length; i++) {
    var maskChar = mask.charAt(i + escapedChars);
    if (maskChar === "\\") {
      escapedChars++;
    } else {
      var maskFormat = formatChars[maskChar];
      if (maskFormat) {
        maskCharData.push({
          /**
           * Do not add escapedChars to the displayIndex.
           * The index refers to a position in the mask's displayValue.
           * Since the backslashes don't appear in the displayValue,
           * we do not add them to the charData displayIndex.
           */
          displayIndex: i,
          format: maskFormat
        });
      }
    }
  }
  return maskCharData;
}
function getMaskDisplay(mask, maskCharData, maskChar) {
  var maskDisplay = mask;
  if (!maskDisplay) {
    return "";
  }
  maskDisplay = maskDisplay.replace(/\\/g, "");
  var lastDisplayIndex = 0;
  if (maskCharData.length > 0) {
    lastDisplayIndex = maskCharData[0].displayIndex - 1;
  }
  for (var _i = 0, maskCharData_1 = maskCharData; _i < maskCharData_1.length; _i++) {
    var charData = maskCharData_1[_i];
    var nextChar = " ";
    if (charData.value) {
      nextChar = charData.value;
      if (charData.displayIndex > lastDisplayIndex) {
        lastDisplayIndex = charData.displayIndex;
      }
    } else {
      if (maskChar) {
        nextChar = maskChar;
      }
    }
    maskDisplay = maskDisplay.slice(0, charData.displayIndex) + nextChar + maskDisplay.slice(charData.displayIndex + 1);
  }
  if (!maskChar) {
    maskDisplay = maskDisplay.slice(0, lastDisplayIndex + 1);
  }
  return maskDisplay;
}
function getRightFormatIndex(maskCharData, index) {
  for (var i = 0; i < maskCharData.length; i++) {
    if (maskCharData[i].displayIndex >= index) {
      return maskCharData[i].displayIndex;
    }
  }
  return maskCharData[maskCharData.length - 1].displayIndex;
}
function getLeftFormatIndex(maskCharData, index) {
  for (var i = maskCharData.length - 1; i >= 0; i--) {
    if (maskCharData[i].displayIndex < index) {
      return maskCharData[i].displayIndex;
    }
  }
  return maskCharData[0].displayIndex;
}
function clearRange(maskCharData, selectionStart, selectionCount) {
  for (var i = 0; i < maskCharData.length; i++) {
    if (maskCharData[i].displayIndex >= selectionStart) {
      if (maskCharData[i].displayIndex >= selectionStart + selectionCount) {
        break;
      }
      maskCharData[i].value = void 0;
    }
  }
  return maskCharData;
}
function clearNext(maskCharData, selectionStart) {
  for (var i = 0; i < maskCharData.length; i++) {
    if (maskCharData[i].displayIndex >= selectionStart) {
      maskCharData[i].value = void 0;
      break;
    }
  }
  return maskCharData;
}
function clearPrev(maskCharData, selectionStart) {
  for (var i = maskCharData.length - 1; i >= 0; i--) {
    if (maskCharData[i].displayIndex < selectionStart) {
      maskCharData[i].value = void 0;
      break;
    }
  }
  return maskCharData;
}
function insertString(maskCharData, selectionStart, newString) {
  var stringIndex = 0;
  var nextIndex = 0;
  var isStringInserted = false;
  for (var i = 0; i < maskCharData.length && stringIndex < newString.length; i++) {
    if (maskCharData[i].displayIndex >= selectionStart) {
      isStringInserted = true;
      nextIndex = maskCharData[i].displayIndex;
      while (stringIndex < newString.length) {
        if (maskCharData[i].format.test(newString.charAt(stringIndex))) {
          maskCharData[i].value = newString.charAt(stringIndex++);
          if (i + 1 < maskCharData.length) {
            nextIndex = maskCharData[i + 1].displayIndex;
          } else {
            nextIndex++;
          }
          break;
        }
        stringIndex++;
      }
    }
  }
  return isStringInserted ? nextIndex : selectionStart;
}

// node_modules/@fluentui/react/lib/components/TextField/MaskedTextField/MaskedTextField.js
var COMPONENT_NAME2 = "MaskedTextField";
var useComponentRef = function(componentRef, internalState, textField) {
  React26.useImperativeHandle(componentRef, function() {
    return {
      get value() {
        var value = "";
        for (var i = 0; i < internalState.maskCharData.length; i++) {
          if (!internalState.maskCharData[i].value) {
            return void 0;
          }
          value += internalState.maskCharData[i].value;
        }
        return value;
      },
      get selectionStart() {
        return textField.current && textField.current.selectionStart !== null ? textField.current.selectionStart : -1;
      },
      get selectionEnd() {
        return textField.current && textField.current.selectionEnd ? textField.current.selectionEnd : -1;
      },
      focus: function() {
        textField.current && textField.current.focus();
      },
      blur: function() {
        textField.current && textField.current.blur();
      },
      select: function() {
        textField.current && textField.current.select();
      },
      setSelectionStart: function(value) {
        textField.current && textField.current.setSelectionStart(value);
      },
      setSelectionEnd: function(value) {
        textField.current && textField.current.setSelectionEnd(value);
      },
      setSelectionRange: function(start, end) {
        textField.current && textField.current.setSelectionRange(start, end);
      }
    };
  }, [internalState, textField]);
};
var DEFAULT_MASK_CHAR = "_";
var MaskedTextField = React26.forwardRef(function(props, ref) {
  var textField = React26.useRef(null);
  var componentRef = props.componentRef, onFocus = props.onFocus, onBlur = props.onBlur, onMouseDown = props.onMouseDown, onMouseUp = props.onMouseUp, onChange = props.onChange, onPaste = props.onPaste, onKeyDown = props.onKeyDown, mask = props.mask, _a = props.maskChar, maskChar = _a === void 0 ? DEFAULT_MASK_CHAR : _a, _b = props.maskFormat, maskFormat = _b === void 0 ? DEFAULT_MASK_FORMAT_CHARS : _b, value = props.value;
  var internalState = useConst(function() {
    return {
      maskCharData: parseMask(mask, maskFormat),
      isFocused: false,
      moveCursorOnMouseUp: false,
      changeSelectionData: null
    };
  });
  var _c = React26.useState(), maskCursorPosition = _c[0], setMaskCursorPosition = _c[1];
  var _d = React26.useState(function() {
    return getMaskDisplay(mask, internalState.maskCharData, maskChar);
  }), displayValue = _d[0], setDisplayValue = _d[1];
  var setValue = React26.useCallback(function(newValue) {
    var valueIndex = 0;
    var charDataIndex = 0;
    while (valueIndex < newValue.length && charDataIndex < internalState.maskCharData.length) {
      var testVal = newValue[valueIndex];
      if (internalState.maskCharData[charDataIndex].format.test(testVal)) {
        internalState.maskCharData[charDataIndex].value = testVal;
        charDataIndex++;
      }
      valueIndex++;
    }
  }, [internalState]);
  var handleFocus = React26.useCallback(function(ev) {
    onFocus === null || onFocus === void 0 ? void 0 : onFocus(ev);
    internalState.isFocused = true;
    for (var i = 0; i < internalState.maskCharData.length; i++) {
      if (!internalState.maskCharData[i].value) {
        setMaskCursorPosition(internalState.maskCharData[i].displayIndex);
        break;
      }
    }
  }, [internalState, onFocus]);
  var handleBlur = React26.useCallback(function(ev) {
    onBlur === null || onBlur === void 0 ? void 0 : onBlur(ev);
    internalState.isFocused = false;
    internalState.moveCursorOnMouseUp = true;
  }, [internalState, onBlur]);
  var handleMouseDown = React26.useCallback(function(ev) {
    onMouseDown === null || onMouseDown === void 0 ? void 0 : onMouseDown(ev);
    if (!internalState.isFocused) {
      internalState.moveCursorOnMouseUp = true;
    }
  }, [internalState, onMouseDown]);
  var handleMouseUp = React26.useCallback(function(ev) {
    onMouseUp === null || onMouseUp === void 0 ? void 0 : onMouseUp(ev);
    if (internalState.moveCursorOnMouseUp) {
      internalState.moveCursorOnMouseUp = false;
      for (var i = 0; i < internalState.maskCharData.length; i++) {
        if (!internalState.maskCharData[i].value) {
          setMaskCursorPosition(internalState.maskCharData[i].displayIndex);
          break;
        }
      }
    }
  }, [internalState, onMouseUp]);
  var handleInputChange = React26.useCallback(function(ev, inputValue) {
    if (internalState.changeSelectionData === null && textField.current) {
      internalState.changeSelectionData = {
        changeType: "default",
        selectionStart: textField.current.selectionStart !== null ? textField.current.selectionStart : -1,
        selectionEnd: textField.current.selectionEnd !== null ? textField.current.selectionEnd : -1
      };
    }
    if (!internalState.changeSelectionData) {
      return;
    }
    var cursorPos = 0;
    var _a2 = internalState.changeSelectionData, changeType = _a2.changeType, selectionStart = _a2.selectionStart, selectionEnd = _a2.selectionEnd;
    if (changeType === "textPasted") {
      var charsSelected = selectionEnd - selectionStart;
      var charCount = inputValue.length + charsSelected - displayValue.length;
      var startPos = selectionStart;
      var pastedString = inputValue.substr(startPos, charCount);
      if (charsSelected) {
        internalState.maskCharData = clearRange(internalState.maskCharData, selectionStart, charsSelected);
      }
      cursorPos = insertString(internalState.maskCharData, startPos, pastedString);
    } else if (changeType === "delete" || changeType === "backspace") {
      var isDel = changeType === "delete";
      var charCount = selectionEnd - selectionStart;
      if (charCount) {
        internalState.maskCharData = clearRange(internalState.maskCharData, selectionStart, charCount);
        cursorPos = getRightFormatIndex(internalState.maskCharData, selectionStart);
      } else {
        if (isDel) {
          internalState.maskCharData = clearNext(internalState.maskCharData, selectionStart);
          cursorPos = getRightFormatIndex(internalState.maskCharData, selectionStart);
        } else {
          internalState.maskCharData = clearPrev(internalState.maskCharData, selectionStart);
          cursorPos = getLeftFormatIndex(internalState.maskCharData, selectionStart);
        }
      }
    } else if (inputValue.length > displayValue.length) {
      var charCount = inputValue.length - displayValue.length;
      var startPos = selectionEnd - charCount;
      var enteredString = inputValue.substr(startPos, charCount);
      cursorPos = insertString(internalState.maskCharData, startPos, enteredString);
    } else if (inputValue.length <= displayValue.length) {
      var charCount = 1;
      var selectCount = displayValue.length + charCount - inputValue.length;
      var startPos = selectionEnd - charCount;
      var enteredString = inputValue.substr(startPos, charCount);
      internalState.maskCharData = clearRange(internalState.maskCharData, startPos, selectCount);
      cursorPos = insertString(internalState.maskCharData, startPos, enteredString);
    }
    internalState.changeSelectionData = null;
    var newValue = getMaskDisplay(mask, internalState.maskCharData, maskChar);
    setDisplayValue(newValue);
    setMaskCursorPosition(cursorPos);
    onChange === null || onChange === void 0 ? void 0 : onChange(ev, newValue);
  }, [displayValue.length, internalState, mask, maskChar, onChange]);
  var handleKeyDown = React26.useCallback(function(ev) {
    onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(ev);
    internalState.changeSelectionData = null;
    if (textField.current && textField.current.value) {
      var keyCode = ev.keyCode, ctrlKey = ev.ctrlKey, metaKey = ev.metaKey;
      if (ctrlKey || metaKey) {
        return;
      }
      if (keyCode === KeyCodes.backspace || keyCode === KeyCodes.del) {
        var selectionStart = ev.target.selectionStart;
        var selectionEnd = ev.target.selectionEnd;
        if (!(keyCode === KeyCodes.backspace && selectionEnd && selectionEnd > 0) && !(keyCode === KeyCodes.del && selectionStart !== null && selectionStart < textField.current.value.length)) {
          return;
        }
        internalState.changeSelectionData = {
          changeType: keyCode === KeyCodes.backspace ? "backspace" : "delete",
          selectionStart: selectionStart !== null ? selectionStart : -1,
          selectionEnd: selectionEnd !== null ? selectionEnd : -1
        };
      }
    }
  }, [internalState, onKeyDown]);
  var handlePaste = React26.useCallback(function(ev) {
    onPaste === null || onPaste === void 0 ? void 0 : onPaste(ev);
    var selectionStart = ev.target.selectionStart;
    var selectionEnd = ev.target.selectionEnd;
    internalState.changeSelectionData = {
      changeType: "textPasted",
      selectionStart: selectionStart !== null ? selectionStart : -1,
      selectionEnd: selectionEnd !== null ? selectionEnd : -1
    };
  }, [internalState, onPaste]);
  React26.useEffect(function() {
    internalState.maskCharData = parseMask(mask, maskFormat);
    value !== void 0 && setValue(value);
    setDisplayValue(getMaskDisplay(mask, internalState.maskCharData, maskChar));
  }, [mask, value]);
  useIsomorphicLayoutEffect(function() {
    if (maskCursorPosition !== void 0 && textField.current) {
      textField.current.setSelectionRange(maskCursorPosition, maskCursorPosition);
    }
  }, [maskCursorPosition]);
  React26.useEffect(function() {
    if (internalState.isFocused && maskCursorPosition !== void 0 && textField.current) {
      textField.current.setSelectionRange(maskCursorPosition, maskCursorPosition);
    }
  });
  useComponentRef(componentRef, internalState, textField);
  return React26.createElement(TextField, __assign({}, props, { elementRef: ref, onFocus: handleFocus, onBlur: handleBlur, onMouseDown: handleMouseDown, onMouseUp: handleMouseUp, onChange: handleInputChange, onKeyDown: handleKeyDown, onPaste: handlePaste, value: displayValue || "", componentRef: textField }));
});
MaskedTextField.displayName = COMPONENT_NAME2;
export {
  DEFAULT_MASK_CHAR,
  MaskedTextField,
  TextField,
  TextFieldBase,
  getStyles4 as getTextFieldStyles
};
//# sourceMappingURL=@fluentui_react_lib_TextField.js.map
