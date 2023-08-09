import {
  require_react
} from "./chunk-ZAUFE7H7.js";
import {
  __toESM
} from "./chunk-UXIASGQL.js";

// node_modules/@fluentui/utilities/lib/dom/canUseDOM.js
function canUseDOM() {
  return typeof window !== "undefined" && !!(window.document && // eslint-disable-next-line deprecation/deprecation
  window.document.createElement);
}

// node_modules/@fluentui/utilities/lib/dom/getWindow.js
var _window = void 0;
try {
  _window = window;
} catch (e) {
}
function getWindow(rootElement) {
  if (!canUseDOM() || typeof _window === "undefined") {
    return void 0;
  } else {
    var el = rootElement;
    return el && el.ownerDocument && el.ownerDocument.defaultView ? el.ownerDocument.defaultView : _window;
  }
}

// node_modules/@fluentui/utilities/lib/Async.js
var Async = (
  /** @class */
  function() {
    function Async2(parent, onError) {
      this._timeoutIds = null;
      this._immediateIds = null;
      this._intervalIds = null;
      this._animationFrameIds = null;
      this._isDisposed = false;
      this._parent = parent || null;
      this._onErrorHandler = onError;
      this._noop = function() {
      };
    }
    Async2.prototype.dispose = function() {
      var id;
      this._isDisposed = true;
      this._parent = null;
      if (this._timeoutIds) {
        for (id in this._timeoutIds) {
          if (this._timeoutIds.hasOwnProperty(id)) {
            this.clearTimeout(parseInt(id, 10));
          }
        }
        this._timeoutIds = null;
      }
      if (this._immediateIds) {
        for (id in this._immediateIds) {
          if (this._immediateIds.hasOwnProperty(id)) {
            this.clearImmediate(parseInt(id, 10));
          }
        }
        this._immediateIds = null;
      }
      if (this._intervalIds) {
        for (id in this._intervalIds) {
          if (this._intervalIds.hasOwnProperty(id)) {
            this.clearInterval(parseInt(id, 10));
          }
        }
        this._intervalIds = null;
      }
      if (this._animationFrameIds) {
        for (id in this._animationFrameIds) {
          if (this._animationFrameIds.hasOwnProperty(id)) {
            this.cancelAnimationFrame(parseInt(id, 10));
          }
        }
        this._animationFrameIds = null;
      }
    };
    Async2.prototype.setTimeout = function(callback, duration) {
      var _this = this;
      var timeoutId = 0;
      if (!this._isDisposed) {
        if (!this._timeoutIds) {
          this._timeoutIds = {};
        }
        timeoutId = setTimeout(function() {
          try {
            if (_this._timeoutIds) {
              delete _this._timeoutIds[timeoutId];
            }
            callback.apply(_this._parent);
          } catch (e) {
            _this._logError(e);
          }
        }, duration);
        this._timeoutIds[timeoutId] = true;
      }
      return timeoutId;
    };
    Async2.prototype.clearTimeout = function(id) {
      if (this._timeoutIds && this._timeoutIds[id]) {
        clearTimeout(id);
        delete this._timeoutIds[id];
      }
    };
    Async2.prototype.setImmediate = function(callback, targetElement) {
      var _this = this;
      var immediateId = 0;
      var win = getWindow(targetElement);
      if (!this._isDisposed) {
        if (!this._immediateIds) {
          this._immediateIds = {};
        }
        var setImmediateCallback = function() {
          try {
            if (_this._immediateIds) {
              delete _this._immediateIds[immediateId];
            }
            callback.apply(_this._parent);
          } catch (e) {
            _this._logError(e);
          }
        };
        immediateId = win.setTimeout(setImmediateCallback, 0);
        this._immediateIds[immediateId] = true;
      }
      return immediateId;
    };
    Async2.prototype.clearImmediate = function(id, targetElement) {
      var win = getWindow(targetElement);
      if (this._immediateIds && this._immediateIds[id]) {
        win.clearTimeout(id);
        delete this._immediateIds[id];
      }
    };
    Async2.prototype.setInterval = function(callback, duration) {
      var _this = this;
      var intervalId = 0;
      if (!this._isDisposed) {
        if (!this._intervalIds) {
          this._intervalIds = {};
        }
        intervalId = setInterval(function() {
          try {
            callback.apply(_this._parent);
          } catch (e) {
            _this._logError(e);
          }
        }, duration);
        this._intervalIds[intervalId] = true;
      }
      return intervalId;
    };
    Async2.prototype.clearInterval = function(id) {
      if (this._intervalIds && this._intervalIds[id]) {
        clearInterval(id);
        delete this._intervalIds[id];
      }
    };
    Async2.prototype.throttle = function(func, wait, options) {
      var _this = this;
      if (this._isDisposed) {
        return this._noop;
      }
      var waitMS = wait || 0;
      var leading = true;
      var trailing = true;
      var lastExecuteTime = 0;
      var lastResult;
      var lastArgs;
      var timeoutId = null;
      if (options && typeof options.leading === "boolean") {
        leading = options.leading;
      }
      if (options && typeof options.trailing === "boolean") {
        trailing = options.trailing;
      }
      var callback = function(userCall) {
        var now2 = Date.now();
        var delta = now2 - lastExecuteTime;
        var waitLength = leading ? waitMS - delta : waitMS;
        if (delta >= waitMS && (!userCall || leading)) {
          lastExecuteTime = now2;
          if (timeoutId) {
            _this.clearTimeout(timeoutId);
            timeoutId = null;
          }
          lastResult = func.apply(_this._parent, lastArgs);
        } else if (timeoutId === null && trailing) {
          timeoutId = _this.setTimeout(callback, waitLength);
        }
        return lastResult;
      };
      var resultFunction = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        lastArgs = args;
        return callback(true);
      };
      return resultFunction;
    };
    Async2.prototype.debounce = function(func, wait, options) {
      var _this = this;
      if (this._isDisposed) {
        var noOpFunction = function() {
        };
        noOpFunction.cancel = function() {
          return;
        };
        noOpFunction.flush = function() {
          return null;
        };
        noOpFunction.pending = function() {
          return false;
        };
        return noOpFunction;
      }
      var waitMS = wait || 0;
      var leading = false;
      var trailing = true;
      var maxWait = null;
      var lastCallTime = 0;
      var lastExecuteTime = Date.now();
      var lastResult;
      var lastArgs;
      var timeoutId = null;
      if (options && typeof options.leading === "boolean") {
        leading = options.leading;
      }
      if (options && typeof options.trailing === "boolean") {
        trailing = options.trailing;
      }
      if (options && typeof options.maxWait === "number" && !isNaN(options.maxWait)) {
        maxWait = options.maxWait;
      }
      var markExecuted = function(time) {
        if (timeoutId) {
          _this.clearTimeout(timeoutId);
          timeoutId = null;
        }
        lastExecuteTime = time;
      };
      var invokeFunction = function(time) {
        markExecuted(time);
        lastResult = func.apply(_this._parent, lastArgs);
      };
      var callback = function(userCall) {
        var now2 = Date.now();
        var executeImmediately = false;
        if (userCall) {
          if (leading && now2 - lastCallTime >= waitMS) {
            executeImmediately = true;
          }
          lastCallTime = now2;
        }
        var delta = now2 - lastCallTime;
        var waitLength = waitMS - delta;
        var maxWaitDelta = now2 - lastExecuteTime;
        var maxWaitExpired = false;
        if (maxWait !== null) {
          if (maxWaitDelta >= maxWait && timeoutId) {
            maxWaitExpired = true;
          } else {
            waitLength = Math.min(waitLength, maxWait - maxWaitDelta);
          }
        }
        if (delta >= waitMS || maxWaitExpired || executeImmediately) {
          invokeFunction(now2);
        } else if ((timeoutId === null || !userCall) && trailing) {
          timeoutId = _this.setTimeout(callback, waitLength);
        }
        return lastResult;
      };
      var pending = function() {
        return !!timeoutId;
      };
      var cancel = function() {
        if (pending()) {
          markExecuted(Date.now());
        }
      };
      var flush = function() {
        if (pending()) {
          invokeFunction(Date.now());
        }
        return lastResult;
      };
      var resultFunction = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        lastArgs = args;
        return callback(true);
      };
      resultFunction.cancel = cancel;
      resultFunction.flush = flush;
      resultFunction.pending = pending;
      return resultFunction;
    };
    Async2.prototype.requestAnimationFrame = function(callback, targetElement) {
      var _this = this;
      var animationFrameId = 0;
      var win = getWindow(targetElement);
      if (!this._isDisposed) {
        if (!this._animationFrameIds) {
          this._animationFrameIds = {};
        }
        var animationFrameCallback = function() {
          try {
            if (_this._animationFrameIds) {
              delete _this._animationFrameIds[animationFrameId];
            }
            callback.apply(_this._parent);
          } catch (e) {
            _this._logError(e);
          }
        };
        animationFrameId = win.requestAnimationFrame ? win.requestAnimationFrame(animationFrameCallback) : win.setTimeout(animationFrameCallback, 0);
        this._animationFrameIds[animationFrameId] = true;
      }
      return animationFrameId;
    };
    Async2.prototype.cancelAnimationFrame = function(id, targetElement) {
      var win = getWindow(targetElement);
      if (this._animationFrameIds && this._animationFrameIds[id]) {
        win.cancelAnimationFrame ? win.cancelAnimationFrame(id) : win.clearTimeout(id);
        delete this._animationFrameIds[id];
      }
    };
    Async2.prototype._logError = function(e) {
      if (this._onErrorHandler) {
        this._onErrorHandler(e);
      }
    };
    return Async2;
  }()
);

// node_modules/tslib/tslib.es6.mjs
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign3(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}

// node_modules/@fluentui/utilities/lib/warn/warn.js
var _warningCallback = void 0;
function warn(message) {
  if (_warningCallback && true) {
    _warningCallback(message);
  } else if (console && console.warn) {
    console.warn(message);
  }
}

// node_modules/@fluentui/utilities/lib/warn/warnMutuallyExclusive.js
function warnMutuallyExclusive(componentName, props, exclusiveMap) {
  if (true) {
    for (var propName in exclusiveMap) {
      if (props && props[propName] !== void 0) {
        var propInExclusiveMapValue = exclusiveMap[propName];
        if (propInExclusiveMapValue && props[propInExclusiveMapValue] !== void 0) {
          warn("".concat(componentName, " property '").concat(propName, "' is mutually exclusive with '").concat(exclusiveMap[propName], "'. ") + "Use one or the other.");
        }
      }
    }
  }
}

// node_modules/@fluentui/utilities/lib/warn/warnDeprecations.js
function warnDeprecations(componentName, props, deprecationMap) {
  if (true) {
    for (var propName in deprecationMap) {
      if (props && propName in props) {
        var deprecationMessage = "".concat(componentName, " property '").concat(propName, "' was used but has been deprecated.");
        var replacementPropName = deprecationMap[propName];
        if (replacementPropName) {
          deprecationMessage += " Use '".concat(replacementPropName, "' instead.");
        }
        warn(deprecationMessage);
      }
    }
  }
}

// node_modules/@fluentui/utilities/lib/DelayedRender.js
var React = __toESM(require_react());
var DelayedRender = (
  /** @class */
  function(_super) {
    __extends(DelayedRender2, _super);
    function DelayedRender2(props) {
      var _this = _super.call(this, props) || this;
      _this.state = {
        isRendered: getWindow() === void 0
      };
      return _this;
    }
    DelayedRender2.prototype.componentDidMount = function() {
      var _this = this;
      var delay = this.props.delay;
      this._timeoutId = window.setTimeout(function() {
        _this.setState({
          isRendered: true
        });
      }, delay);
    };
    DelayedRender2.prototype.componentWillUnmount = function() {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
      }
    };
    DelayedRender2.prototype.render = function() {
      return this.state.isRendered ? React.Children.only(this.props.children) : null;
    };
    DelayedRender2.defaultProps = {
      delay: 0
    };
    return DelayedRender2;
  }(React.Component)
);

// node_modules/@fluentui/utilities/lib/KeyCodes.js
var KeyCodes = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  pauseBreak: 19,
  capslock: 20,
  escape: 27,
  space: 32,
  pageUp: 33,
  pageDown: 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  insert: 45,
  del: 46,
  zero: 48,
  one: 49,
  two: 50,
  three: 51,
  four: 52,
  five: 53,
  six: 54,
  seven: 55,
  eight: 56,
  nine: 57,
  colon: 58,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  leftWindow: 91,
  rightWindow: 92,
  select: 93,
  /* eslint-disable @typescript-eslint/naming-convention */
  zero_numpad: 96,
  one_numpad: 97,
  two_numpad: 98,
  three_numpad: 99,
  four_numpad: 100,
  five_numpad: 101,
  six_numpad: 102,
  seven_numpad: 103,
  eight_numpad: 104,
  nine_numpad: 105,
  /* eslint-enable @typescript-eslint/naming-convention */
  multiply: 106,
  add: 107,
  subtract: 109,
  decimalPoint: 110,
  divide: 111,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,
  numlock: 144,
  scrollLock: 145,
  semicolon: 186,
  equalSign: 187,
  comma: 188,
  dash: 189,
  period: 190,
  forwardSlash: 191,
  graveAccent: 192,
  openBracket: 219,
  backSlash: 220,
  closeBracket: 221,
  singleQuote: 222
};

// node_modules/@fluentui/set-version/lib/setVersion.js
var packagesCache = {};
var _win = void 0;
try {
  _win = window;
} catch (e) {
}
function setVersion(packageName, packageVersion) {
  if (typeof _win !== "undefined") {
    var packages = _win.__packages__ = _win.__packages__ || {};
    if (!packages[packageName] || !packagesCache[packageName]) {
      packagesCache[packageName] = packageVersion;
      var versions = packages[packageName] = packages[packageName] || [];
      versions.push(packageVersion);
    }
  }
}

// node_modules/@fluentui/set-version/lib/index.js
setVersion("@fluentui/set-version", "6.0.0");

// node_modules/@fluentui/dom-utilities/lib/version.js
setVersion("@fluentui/dom-utilities", "2.2.11");

// node_modules/@fluentui/utilities/lib/dom/getDocument.js
function getDocument(rootElement) {
  if (!canUseDOM() || typeof document === "undefined") {
    return void 0;
  } else {
    var el = rootElement;
    return el && el.ownerDocument ? el.ownerDocument : document;
  }
}

// node_modules/@fluentui/utilities/lib/dom/getRect.js
function getRect(element) {
  var rect;
  if (element) {
    if (element === window) {
      rect = {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        right: window.innerWidth,
        bottom: window.innerHeight
      };
    } else if (element.getBoundingClientRect) {
      rect = element.getBoundingClientRect();
    }
  }
  return rect;
}

// node_modules/@fluentui/merge-styles/lib/Stylesheet.js
var InjectionMode = {
  /**
   * Avoids style injection, use getRules() to read the styles.
   */
  none: 0,
  /**
   * Inserts rules using the insertRule api.
   */
  insertNode: 1,
  /**
   * Appends rules using appendChild.
   */
  appendChild: 2
};
var STYLESHEET_SETTING = "__stylesheet__";
var REUSE_STYLE_NODE = typeof navigator !== "undefined" && /rv:11.0/.test(navigator.userAgent);
var _global = {};
try {
  _global = window || {};
} catch (_a3) {
}
var _stylesheet;
var Stylesheet = (
  /** @class */
  function() {
    function Stylesheet2(config, serializedStylesheet) {
      var _a3, _b, _c, _d, _e, _f;
      this._rules = [];
      this._preservedRules = [];
      this._counter = 0;
      this._keyToClassName = {};
      this._onInsertRuleCallbacks = [];
      this._onResetCallbacks = [];
      this._classNameToArgs = {};
      this._config = __assign({
        // If there is no document we won't have an element to inject into.
        injectionMode: typeof document === "undefined" ? InjectionMode.none : InjectionMode.insertNode,
        defaultPrefix: "css",
        namespace: void 0,
        cspSettings: void 0
      }, config);
      this._classNameToArgs = (_a3 = serializedStylesheet === null || serializedStylesheet === void 0 ? void 0 : serializedStylesheet.classNameToArgs) !== null && _a3 !== void 0 ? _a3 : this._classNameToArgs;
      this._counter = (_b = serializedStylesheet === null || serializedStylesheet === void 0 ? void 0 : serializedStylesheet.counter) !== null && _b !== void 0 ? _b : this._counter;
      this._keyToClassName = (_d = (_c = this._config.classNameCache) !== null && _c !== void 0 ? _c : serializedStylesheet === null || serializedStylesheet === void 0 ? void 0 : serializedStylesheet.keyToClassName) !== null && _d !== void 0 ? _d : this._keyToClassName;
      this._preservedRules = (_e = serializedStylesheet === null || serializedStylesheet === void 0 ? void 0 : serializedStylesheet.preservedRules) !== null && _e !== void 0 ? _e : this._preservedRules;
      this._rules = (_f = serializedStylesheet === null || serializedStylesheet === void 0 ? void 0 : serializedStylesheet.rules) !== null && _f !== void 0 ? _f : this._rules;
    }
    Stylesheet2.getInstance = function() {
      _stylesheet = _global[STYLESHEET_SETTING];
      if (!_stylesheet || _stylesheet._lastStyleElement && _stylesheet._lastStyleElement.ownerDocument !== document) {
        var fabricConfig = (_global === null || _global === void 0 ? void 0 : _global.FabricConfig) || {};
        var stylesheet3 = new Stylesheet2(fabricConfig.mergeStyles, fabricConfig.serializedStylesheet);
        _stylesheet = stylesheet3;
        _global[STYLESHEET_SETTING] = stylesheet3;
      }
      return _stylesheet;
    };
    Stylesheet2.prototype.serialize = function() {
      return JSON.stringify({
        classNameToArgs: this._classNameToArgs,
        counter: this._counter,
        keyToClassName: this._keyToClassName,
        preservedRules: this._preservedRules,
        rules: this._rules
      });
    };
    Stylesheet2.prototype.setConfig = function(config) {
      this._config = __assign(__assign({}, this._config), config);
    };
    Stylesheet2.prototype.onReset = function(callback) {
      var _this = this;
      this._onResetCallbacks.push(callback);
      return function() {
        _this._onResetCallbacks = _this._onResetCallbacks.filter(function(cb) {
          return cb !== callback;
        });
      };
    };
    Stylesheet2.prototype.onInsertRule = function(callback) {
      var _this = this;
      this._onInsertRuleCallbacks.push(callback);
      return function() {
        _this._onInsertRuleCallbacks = _this._onInsertRuleCallbacks.filter(function(cb) {
          return cb !== callback;
        });
      };
    };
    Stylesheet2.prototype.getClassName = function(displayName) {
      var namespace = this._config.namespace;
      var prefix = displayName || this._config.defaultPrefix;
      return "".concat(namespace ? namespace + "-" : "").concat(prefix, "-").concat(this._counter++);
    };
    Stylesheet2.prototype.cacheClassName = function(className, key, args, rules2) {
      this._keyToClassName[key] = className;
      this._classNameToArgs[className] = {
        args,
        rules: rules2
      };
    };
    Stylesheet2.prototype.classNameFromKey = function(key) {
      return this._keyToClassName[key];
    };
    Stylesheet2.prototype.getClassNameCache = function() {
      return this._keyToClassName;
    };
    Stylesheet2.prototype.argsFromClassName = function(className) {
      var entry = this._classNameToArgs[className];
      return entry && entry.args;
    };
    Stylesheet2.prototype.insertedRulesFromClassName = function(className) {
      var entry = this._classNameToArgs[className];
      return entry && entry.rules;
    };
    Stylesheet2.prototype.insertRule = function(rule, preserve) {
      var injectionMode = this._config.injectionMode;
      var element = injectionMode !== InjectionMode.none ? this._getStyleElement() : void 0;
      if (preserve) {
        this._preservedRules.push(rule);
      }
      if (element) {
        switch (injectionMode) {
          case InjectionMode.insertNode:
            var sheet = element.sheet;
            try {
              sheet.insertRule(rule, sheet.cssRules.length);
            } catch (e) {
            }
            break;
          case InjectionMode.appendChild:
            element.appendChild(document.createTextNode(rule));
            break;
        }
      } else {
        this._rules.push(rule);
      }
      if (this._config.onInsertRule) {
        this._config.onInsertRule(rule);
      }
      this._onInsertRuleCallbacks.forEach(function(callback) {
        return callback();
      });
    };
    Stylesheet2.prototype.getRules = function(includePreservedRules) {
      return (includePreservedRules ? this._preservedRules.join("") : "") + this._rules.join("");
    };
    Stylesheet2.prototype.reset = function() {
      this._rules = [];
      this._counter = 0;
      this._classNameToArgs = {};
      this._keyToClassName = {};
      this._onResetCallbacks.forEach(function(callback) {
        return callback();
      });
    };
    Stylesheet2.prototype.resetKeys = function() {
      this._keyToClassName = {};
    };
    Stylesheet2.prototype._getStyleElement = function() {
      var _this = this;
      if (!this._styleElement && typeof document !== "undefined") {
        this._styleElement = this._createStyleElement();
        if (!REUSE_STYLE_NODE) {
          window.requestAnimationFrame(function() {
            _this._styleElement = void 0;
          });
        }
      }
      return this._styleElement;
    };
    Stylesheet2.prototype._createStyleElement = function() {
      var head = document.head;
      var styleElement = document.createElement("style");
      var nodeToInsertBefore = null;
      styleElement.setAttribute("data-merge-styles", "true");
      var cspSettings = this._config.cspSettings;
      if (cspSettings) {
        if (cspSettings.nonce) {
          styleElement.setAttribute("nonce", cspSettings.nonce);
        }
      }
      if (this._lastStyleElement) {
        nodeToInsertBefore = this._lastStyleElement.nextElementSibling;
      } else {
        var placeholderStyleTag = this._findPlaceholderStyleTag();
        if (placeholderStyleTag) {
          nodeToInsertBefore = placeholderStyleTag.nextElementSibling;
        } else {
          nodeToInsertBefore = head.childNodes[0];
        }
      }
      head.insertBefore(styleElement, head.contains(nodeToInsertBefore) ? nodeToInsertBefore : null);
      this._lastStyleElement = styleElement;
      return styleElement;
    };
    Stylesheet2.prototype._findPlaceholderStyleTag = function() {
      var head = document.head;
      if (head) {
        return head.querySelector("style[data-merge-styles]");
      }
      return null;
    };
    return Stylesheet2;
  }()
);

// node_modules/@fluentui/merge-styles/lib/extractStyleParts.js
function extractStyleParts() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var classes = [];
  var objects = [];
  var stylesheet3 = Stylesheet.getInstance();
  function _processArgs(argsList) {
    for (var _i2 = 0, argsList_1 = argsList; _i2 < argsList_1.length; _i2++) {
      var arg = argsList_1[_i2];
      if (arg) {
        if (typeof arg === "string") {
          if (arg.indexOf(" ") >= 0) {
            _processArgs(arg.split(" "));
          } else {
            var translatedArgs = stylesheet3.argsFromClassName(arg);
            if (translatedArgs) {
              _processArgs(translatedArgs);
            } else {
              if (classes.indexOf(arg) === -1) {
                classes.push(arg);
              }
            }
          }
        } else if (Array.isArray(arg)) {
          _processArgs(arg);
        } else if (typeof arg === "object") {
          objects.push(arg);
        }
      }
    }
  }
  _processArgs(args);
  return {
    classes,
    objects
  };
}

// node_modules/@fluentui/merge-styles/lib/StyleOptionsState.js
function setRTL(isRTL) {
  if (_rtl !== isRTL) {
    _rtl = isRTL;
  }
}
function getRTL() {
  if (_rtl === void 0) {
    _rtl = typeof document !== "undefined" && !!document.documentElement && document.documentElement.getAttribute("dir") === "rtl";
  }
  return _rtl;
}
var _rtl;
_rtl = getRTL();
function getStyleOptions() {
  return {
    rtl: getRTL()
  };
}

// node_modules/@fluentui/merge-styles/lib/transforms/kebabRules.js
var rules = {};
function kebabRules(rulePairs, index) {
  var rule = rulePairs[index];
  if (rule.charAt(0) !== "-") {
    rulePairs[index] = rules[rule] = rules[rule] || rule.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
}

// node_modules/@fluentui/merge-styles/lib/getVendorSettings.js
var _vendorSettings;
function getVendorSettings() {
  var _a3;
  if (!_vendorSettings) {
    var doc = typeof document !== "undefined" ? document : void 0;
    var nav = typeof navigator !== "undefined" ? navigator : void 0;
    var userAgent = (_a3 = nav === null || nav === void 0 ? void 0 : nav.userAgent) === null || _a3 === void 0 ? void 0 : _a3.toLowerCase();
    if (!doc) {
      _vendorSettings = {
        isWebkit: true,
        isMoz: true,
        isOpera: true,
        isMs: true
      };
    } else {
      _vendorSettings = {
        isWebkit: !!(doc && "WebkitAppearance" in doc.documentElement.style),
        isMoz: !!(userAgent && userAgent.indexOf("firefox") > -1),
        isOpera: !!(userAgent && userAgent.indexOf("opera") > -1),
        isMs: !!(nav && (/rv:11.0/i.test(nav.userAgent) || /Edge\/\d./i.test(navigator.userAgent)))
      };
    }
  }
  return _vendorSettings;
}

// node_modules/@fluentui/merge-styles/lib/transforms/prefixRules.js
var autoPrefixNames = {
  "user-select": 1
};
function prefixRules(rulePairs, index) {
  var vendorSettings = getVendorSettings();
  var name = rulePairs[index];
  if (autoPrefixNames[name]) {
    var value = rulePairs[index + 1];
    if (autoPrefixNames[name]) {
      if (vendorSettings.isWebkit) {
        rulePairs.push("-webkit-" + name, value);
      }
      if (vendorSettings.isMoz) {
        rulePairs.push("-moz-" + name, value);
      }
      if (vendorSettings.isMs) {
        rulePairs.push("-ms-" + name, value);
      }
      if (vendorSettings.isOpera) {
        rulePairs.push("-o-" + name, value);
      }
    }
  }
}

// node_modules/@fluentui/merge-styles/lib/transforms/provideUnits.js
var NON_PIXEL_NUMBER_PROPS = [
  "column-count",
  "font-weight",
  "flex",
  "flex-grow",
  "flex-shrink",
  "fill-opacity",
  "opacity",
  "order",
  "z-index",
  "zoom"
];
function provideUnits(rulePairs, index) {
  var name = rulePairs[index];
  var value = rulePairs[index + 1];
  if (typeof value === "number") {
    var isNonPixelProp = NON_PIXEL_NUMBER_PROPS.indexOf(name) > -1;
    var isVariableOrPrefixed = name.indexOf("--") > -1;
    var unit = isNonPixelProp || isVariableOrPrefixed ? "" : "px";
    rulePairs[index + 1] = "".concat(value).concat(unit);
  }
}

// node_modules/@fluentui/merge-styles/lib/transforms/rtlifyRules.js
var _a;
var LEFT = "left";
var RIGHT = "right";
var NO_FLIP = "@noflip";
var NAME_REPLACEMENTS = (_a = {}, _a[LEFT] = RIGHT, _a[RIGHT] = LEFT, _a);
var VALUE_REPLACEMENTS = {
  "w-resize": "e-resize",
  "sw-resize": "se-resize",
  "nw-resize": "ne-resize"
};
function rtlifyRules(options, rulePairs, index) {
  if (options.rtl) {
    var name_1 = rulePairs[index];
    if (!name_1) {
      return;
    }
    var value = rulePairs[index + 1];
    if (typeof value === "string" && value.indexOf(NO_FLIP) >= 0) {
      rulePairs[index + 1] = value.replace(/\s*(?:\/\*\s*)?\@noflip\b(?:\s*\*\/)?\s*?/g, "");
    } else if (name_1.indexOf(LEFT) >= 0) {
      rulePairs[index] = name_1.replace(LEFT, RIGHT);
    } else if (name_1.indexOf(RIGHT) >= 0) {
      rulePairs[index] = name_1.replace(RIGHT, LEFT);
    } else if (String(value).indexOf(LEFT) >= 0) {
      rulePairs[index + 1] = value.replace(LEFT, RIGHT);
    } else if (String(value).indexOf(RIGHT) >= 0) {
      rulePairs[index + 1] = value.replace(RIGHT, LEFT);
    } else if (NAME_REPLACEMENTS[name_1]) {
      rulePairs[index] = NAME_REPLACEMENTS[name_1];
    } else if (VALUE_REPLACEMENTS[value]) {
      rulePairs[index + 1] = VALUE_REPLACEMENTS[value];
    } else {
      switch (name_1) {
        case "margin":
        case "padding":
          rulePairs[index + 1] = flipQuad(value);
          break;
        case "box-shadow":
          rulePairs[index + 1] = negateNum(value, 0);
          break;
      }
    }
  }
}
function negateNum(value, partIndex) {
  var parts = value.split(" ");
  var numberVal = parseInt(parts[partIndex], 10);
  parts[0] = parts[0].replace(String(numberVal), String(numberVal * -1));
  return parts.join(" ");
}
function flipQuad(value) {
  if (typeof value === "string") {
    var parts = value.split(" ");
    if (parts.length === 4) {
      return "".concat(parts[0], " ").concat(parts[3], " ").concat(parts[2], " ").concat(parts[1]);
    }
  }
  return value;
}

// node_modules/@fluentui/merge-styles/lib/tokenizeWithParentheses.js
function tokenizeWithParentheses(value) {
  var parts = [];
  var partStart = 0;
  var parens = 0;
  for (var i = 0; i < value.length; i++) {
    switch (value[i]) {
      case "(":
        parens++;
        break;
      case ")":
        if (parens) {
          parens--;
        }
        break;
      case "	":
      case " ":
        if (!parens) {
          if (i > partStart) {
            parts.push(value.substring(partStart, i));
          }
          partStart = i + 1;
        }
        break;
    }
  }
  if (partStart < value.length) {
    parts.push(value.substring(partStart));
  }
  return parts;
}

// node_modules/@fluentui/merge-styles/lib/styleToClassName.js
var DISPLAY_NAME = "displayName";
function getDisplayName(rules2) {
  var rootStyle = rules2 && rules2["&"];
  return rootStyle ? rootStyle.displayName : void 0;
}
var globalSelectorRegExp = /\:global\((.+?)\)/g;
function expandCommaSeparatedGlobals(selectorWithGlobals) {
  if (!globalSelectorRegExp.test(selectorWithGlobals)) {
    return selectorWithGlobals;
  }
  var replacementInfo = [];
  var findGlobal = /\:global\((.+?)\)/g;
  var match = null;
  while (match = findGlobal.exec(selectorWithGlobals)) {
    if (match[1].indexOf(",") > -1) {
      replacementInfo.push([
        match.index,
        match.index + match[0].length,
        // Wrap each of the found selectors in :global()
        match[1].split(",").map(function(v) {
          return ":global(".concat(v.trim(), ")");
        }).join(", ")
      ]);
    }
  }
  return replacementInfo.reverse().reduce(function(selector, _a3) {
    var matchIndex = _a3[0], matchEndIndex = _a3[1], replacement = _a3[2];
    var prefix = selector.slice(0, matchIndex);
    var suffix = selector.slice(matchEndIndex);
    return prefix + replacement + suffix;
  }, selectorWithGlobals);
}
function expandSelector(newSelector, currentSelector) {
  if (newSelector.indexOf(":global(") >= 0) {
    return newSelector.replace(globalSelectorRegExp, "$1");
  } else if (newSelector.indexOf(":") === 0) {
    return currentSelector + newSelector;
  } else if (newSelector.indexOf("&") < 0) {
    return currentSelector + " " + newSelector;
  }
  return newSelector;
}
function extractSelector(currentSelector, rules2, selector, value) {
  if (rules2 === void 0) {
    rules2 = { __order: [] };
  }
  if (selector.indexOf("@") === 0) {
    selector = selector + "{" + currentSelector;
    extractRules([value], rules2, selector);
  } else if (selector.indexOf(",") > -1) {
    expandCommaSeparatedGlobals(selector).split(",").map(function(s) {
      return s.trim();
    }).forEach(function(separatedSelector) {
      return extractRules([value], rules2, expandSelector(separatedSelector, currentSelector));
    });
  } else {
    extractRules([value], rules2, expandSelector(selector, currentSelector));
  }
}
function extractRules(args, rules2, currentSelector) {
  if (rules2 === void 0) {
    rules2 = { __order: [] };
  }
  if (currentSelector === void 0) {
    currentSelector = "&";
  }
  var stylesheet3 = Stylesheet.getInstance();
  var currentRules = rules2[currentSelector];
  if (!currentRules) {
    currentRules = {};
    rules2[currentSelector] = currentRules;
    rules2.__order.push(currentSelector);
  }
  for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
    var arg = args_1[_i];
    if (typeof arg === "string") {
      var expandedRules = stylesheet3.argsFromClassName(arg);
      if (expandedRules) {
        extractRules(expandedRules, rules2, currentSelector);
      }
    } else if (Array.isArray(arg)) {
      extractRules(arg, rules2, currentSelector);
    } else {
      for (var prop in arg) {
        if (arg.hasOwnProperty(prop)) {
          var propValue = arg[prop];
          if (prop === "selectors") {
            var selectors = arg.selectors;
            for (var newSelector in selectors) {
              if (selectors.hasOwnProperty(newSelector)) {
                extractSelector(currentSelector, rules2, newSelector, selectors[newSelector]);
              }
            }
          } else if (typeof propValue === "object") {
            if (propValue !== null) {
              extractSelector(currentSelector, rules2, prop, propValue);
            }
          } else {
            if (propValue !== void 0) {
              if (prop === "margin" || prop === "padding") {
                expandQuads(currentRules, prop, propValue);
              } else {
                currentRules[prop] = propValue;
              }
            }
          }
        }
      }
    }
  }
  return rules2;
}
function expandQuads(currentRules, name, value) {
  var parts = typeof value === "string" ? tokenizeWithParentheses(value) : [value];
  if (parts.length === 0) {
    parts.push(value);
  }
  if (parts[parts.length - 1] === "!important") {
    parts = parts.slice(0, -1).map(function(p) {
      return p + " !important";
    });
  }
  currentRules[name + "Top"] = parts[0];
  currentRules[name + "Right"] = parts[1] || parts[0];
  currentRules[name + "Bottom"] = parts[2] || parts[0];
  currentRules[name + "Left"] = parts[3] || parts[1] || parts[0];
}
function getKeyForRules(options, rules2) {
  var serialized = [options.rtl ? "rtl" : "ltr"];
  var hasProps = false;
  for (var _i = 0, _a3 = rules2.__order; _i < _a3.length; _i++) {
    var selector = _a3[_i];
    serialized.push(selector);
    var rulesForSelector = rules2[selector];
    for (var propName in rulesForSelector) {
      if (rulesForSelector.hasOwnProperty(propName) && rulesForSelector[propName] !== void 0) {
        hasProps = true;
        serialized.push(propName, rulesForSelector[propName]);
      }
    }
  }
  return hasProps ? serialized.join("") : void 0;
}
function repeatString(target, count) {
  if (count <= 0) {
    return "";
  }
  if (count === 1) {
    return target;
  }
  return target + repeatString(target, count - 1);
}
function serializeRuleEntries(options, ruleEntries) {
  if (!ruleEntries) {
    return "";
  }
  var allEntries = [];
  for (var entry in ruleEntries) {
    if (ruleEntries.hasOwnProperty(entry) && entry !== DISPLAY_NAME && ruleEntries[entry] !== void 0) {
      allEntries.push(entry, ruleEntries[entry]);
    }
  }
  for (var i = 0; i < allEntries.length; i += 2) {
    kebabRules(allEntries, i);
    provideUnits(allEntries, i);
    rtlifyRules(options, allEntries, i);
    prefixRules(allEntries, i);
  }
  for (var i = 1; i < allEntries.length; i += 4) {
    allEntries.splice(i, 1, ":", allEntries[i], ";");
  }
  return allEntries.join("");
}
function styleToRegistration(options) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  var rules2 = extractRules(args);
  var key = getKeyForRules(options, rules2);
  if (key) {
    var stylesheet3 = Stylesheet.getInstance();
    var registration = {
      className: stylesheet3.classNameFromKey(key),
      key,
      args
    };
    if (!registration.className) {
      registration.className = stylesheet3.getClassName(getDisplayName(rules2));
      var rulesToInsert = [];
      for (var _a3 = 0, _b = rules2.__order; _a3 < _b.length; _a3++) {
        var selector = _b[_a3];
        rulesToInsert.push(selector, serializeRuleEntries(options, rules2[selector]));
      }
      registration.rulesToInsert = rulesToInsert;
    }
    return registration;
  }
  return void 0;
}
function applyRegistration(registration, specificityMultiplier) {
  if (specificityMultiplier === void 0) {
    specificityMultiplier = 1;
  }
  var stylesheet3 = Stylesheet.getInstance();
  var className = registration.className, key = registration.key, args = registration.args, rulesToInsert = registration.rulesToInsert;
  if (rulesToInsert) {
    for (var i = 0; i < rulesToInsert.length; i += 2) {
      var rules2 = rulesToInsert[i + 1];
      if (rules2) {
        var selector = rulesToInsert[i];
        selector = selector.replace(/&/g, repeatString(".".concat(registration.className), specificityMultiplier));
        var processedRule = "".concat(selector, "{").concat(rules2, "}").concat(selector.indexOf("@") === 0 ? "}" : "");
        stylesheet3.insertRule(processedRule);
      }
    }
    stylesheet3.cacheClassName(className, key, args, rulesToInsert);
  }
}
function styleToClassName(options) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  var registration = styleToRegistration.apply(void 0, __spreadArray([options], args, false));
  if (registration) {
    applyRegistration(registration, options.specificityMultiplier);
    return registration.className;
  }
  return "";
}

// node_modules/@fluentui/merge-styles/lib/mergeStyles.js
function mergeStyles() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return mergeCss(args, getStyleOptions());
}
function mergeCss(args, options) {
  var styleArgs = args instanceof Array ? args : [args];
  var _a3 = extractStyleParts(styleArgs), classes = _a3.classes, objects = _a3.objects;
  if (objects.length) {
    classes.push(styleToClassName(options || {}, objects));
  }
  return classes.join(" ");
}

// node_modules/@fluentui/merge-styles/lib/concatStyleSets.js
function concatStyleSets() {
  var styleSets = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    styleSets[_i] = arguments[_i];
  }
  if (styleSets && styleSets.length === 1 && styleSets[0] && !styleSets[0].subComponentStyles) {
    return styleSets[0];
  }
  var mergedSet = {};
  var workingSubcomponentStyles = {};
  for (var _a3 = 0, styleSets_1 = styleSets; _a3 < styleSets_1.length; _a3++) {
    var currentSet = styleSets_1[_a3];
    if (currentSet) {
      for (var prop in currentSet) {
        if (currentSet.hasOwnProperty(prop)) {
          if (prop === "subComponentStyles" && currentSet.subComponentStyles !== void 0) {
            var currentComponentStyles = currentSet.subComponentStyles;
            for (var subCompProp in currentComponentStyles) {
              if (currentComponentStyles.hasOwnProperty(subCompProp)) {
                if (workingSubcomponentStyles.hasOwnProperty(subCompProp)) {
                  workingSubcomponentStyles[subCompProp].push(currentComponentStyles[subCompProp]);
                } else {
                  workingSubcomponentStyles[subCompProp] = [currentComponentStyles[subCompProp]];
                }
              }
            }
            continue;
          }
          var mergedValue = mergedSet[prop];
          var currentValue = currentSet[prop];
          if (mergedValue === void 0) {
            mergedSet[prop] = currentValue;
          } else {
            mergedSet[prop] = __spreadArray(__spreadArray([], Array.isArray(mergedValue) ? mergedValue : [mergedValue], true), Array.isArray(currentValue) ? currentValue : [currentValue], true);
          }
        }
      }
    }
  }
  if (Object.keys(workingSubcomponentStyles).length > 0) {
    mergedSet.subComponentStyles = {};
    var mergedSubStyles = mergedSet.subComponentStyles;
    var _loop_1 = function(subCompProp2) {
      if (workingSubcomponentStyles.hasOwnProperty(subCompProp2)) {
        var workingSet_1 = workingSubcomponentStyles[subCompProp2];
        mergedSubStyles[subCompProp2] = function(styleProps) {
          return concatStyleSets.apply(void 0, workingSet_1.map(function(styleFunctionOrObject) {
            return typeof styleFunctionOrObject === "function" ? styleFunctionOrObject(styleProps) : styleFunctionOrObject;
          }));
        };
      }
    };
    for (var subCompProp in workingSubcomponentStyles) {
      _loop_1(subCompProp);
    }
  }
  return mergedSet;
}

// node_modules/@fluentui/merge-styles/lib/mergeStyleSets.js
function mergeStyleSets() {
  var styleSets = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    styleSets[_i] = arguments[_i];
  }
  return mergeCssSets(styleSets, getStyleOptions());
}
function mergeCssSets(styleSets, options) {
  var classNameSet = { subComponentStyles: {} };
  var styleSet = styleSets[0];
  if (!styleSet && styleSets.length <= 1) {
    return { subComponentStyles: {} };
  }
  var concatenatedStyleSet = concatStyleSets.apply(void 0, styleSets);
  var registrations = [];
  for (var styleSetArea in concatenatedStyleSet) {
    if (concatenatedStyleSet.hasOwnProperty(styleSetArea)) {
      if (styleSetArea === "subComponentStyles") {
        classNameSet.subComponentStyles = concatenatedStyleSet.subComponentStyles || {};
        continue;
      }
      var styles = concatenatedStyleSet[styleSetArea];
      var _a3 = extractStyleParts(styles), classes = _a3.classes, objects = _a3.objects;
      if (objects === null || objects === void 0 ? void 0 : objects.length) {
        var registration = styleToRegistration(options || {}, { displayName: styleSetArea }, objects);
        if (registration) {
          registrations.push(registration);
          classNameSet[styleSetArea] = classes.concat([registration.className]).join(" ");
        }
      } else {
        classNameSet[styleSetArea] = classes.join(" ");
      }
    }
  }
  for (var _i = 0, registrations_1 = registrations; _i < registrations_1.length; _i++) {
    var registration = registrations_1[_i];
    if (registration) {
      applyRegistration(registration, options === null || options === void 0 ? void 0 : options.specificityMultiplier);
    }
  }
  return classNameSet;
}

// node_modules/@fluentui/merge-styles/lib/concatStyleSetsWithProps.js
function concatStyleSetsWithProps(styleProps) {
  var allStyles = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    allStyles[_i - 1] = arguments[_i];
  }
  var result = [];
  for (var _a3 = 0, allStyles_1 = allStyles; _a3 < allStyles_1.length; _a3++) {
    var styles = allStyles_1[_a3];
    if (styles) {
      result.push(typeof styles === "function" ? styles(styleProps) : styles);
    }
  }
  if (result.length === 1) {
    return result[0];
  } else if (result.length) {
    return concatStyleSets.apply(void 0, result);
  }
  return {};
}

// node_modules/@fluentui/merge-styles/lib/fontFace.js
function fontFace(font) {
  var stylesheet3 = Stylesheet.getInstance();
  var rule = serializeRuleEntries(getStyleOptions(), font);
  var className = stylesheet3.classNameFromKey(rule);
  if (className) {
    return;
  }
  var name = stylesheet3.getClassName();
  stylesheet3.insertRule("@font-face{".concat(rule, "}"), true);
  stylesheet3.cacheClassName(name, rule, [], ["font-face", rule]);
}

// node_modules/@fluentui/merge-styles/lib/keyframes.js
function keyframes(timeline) {
  var stylesheet3 = Stylesheet.getInstance();
  var rulesArray = [];
  for (var prop in timeline) {
    if (timeline.hasOwnProperty(prop)) {
      rulesArray.push(prop, "{", serializeRuleEntries(getStyleOptions(), timeline[prop]), "}");
    }
  }
  var rules2 = rulesArray.join("");
  var className = stylesheet3.classNameFromKey(rules2);
  if (className) {
    return className;
  }
  var name = stylesheet3.getClassName();
  stylesheet3.insertRule("@keyframes ".concat(name, "{").concat(rules2, "}"), true);
  stylesheet3.cacheClassName(name, rules2, [], ["keyframes", rules2]);
  return name;
}

// node_modules/@fluentui/merge-styles/lib/version.js
setVersion("@fluentui/merge-styles", "8.5.12");

// node_modules/@fluentui/utilities/lib/sessionStorage.js
function getItem(key) {
  var result = null;
  try {
    var win = getWindow();
    result = win ? win.sessionStorage.getItem(key) : null;
  } catch (e) {
  }
  return result;
}
function setItem(key, data) {
  var _a3;
  try {
    (_a3 = getWindow()) === null || _a3 === void 0 ? void 0 : _a3.sessionStorage.setItem(key, data);
  } catch (e) {
  }
}

// node_modules/@fluentui/utilities/lib/rtl.js
var RTL_LOCAL_STORAGE_KEY = "isRTL";
var _isRTL;
function getRTL2(theme) {
  if (theme === void 0) {
    theme = {};
  }
  if (theme.rtl !== void 0) {
    return theme.rtl;
  }
  if (_isRTL === void 0) {
    var savedRTL = getItem(RTL_LOCAL_STORAGE_KEY);
    if (savedRTL !== null) {
      _isRTL = savedRTL === "1";
      setRTL2(_isRTL);
    }
    var doc = getDocument();
    if (_isRTL === void 0 && doc) {
      _isRTL = (doc.body && doc.body.getAttribute("dir") || doc.documentElement.getAttribute("dir")) === "rtl";
      setRTL(_isRTL);
    }
  }
  return !!_isRTL;
}
function setRTL2(isRTL, persistSetting) {
  if (persistSetting === void 0) {
    persistSetting = false;
  }
  var doc = getDocument();
  if (doc) {
    doc.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  }
  if (persistSetting) {
    setItem(RTL_LOCAL_STORAGE_KEY, isRTL ? "1" : "0");
  }
  _isRTL = isRTL;
  setRTL(_isRTL);
}

// node_modules/@fluentui/utilities/lib/classNamesFunction.js
var MAX_CACHE_COUNT = 50;
var DEFAULT_SPECIFICITY_MULTIPLIER = 5;
var _memoizedClassNames = 0;
var stylesheet = Stylesheet.getInstance();
if (stylesheet && stylesheet.onReset) {
  stylesheet.onReset(function() {
    return _memoizedClassNames++;
  });
}
var retVal = "__retval__";
function classNamesFunction(options) {
  if (options === void 0) {
    options = {};
  }
  var map = /* @__PURE__ */ new Map();
  var styleCalcCount = 0;
  var getClassNamesCount = 0;
  var currentMemoizedClassNames = _memoizedClassNames;
  var getClassNames = function(styleFunctionOrObject, styleProps) {
    var _a3;
    if (styleProps === void 0) {
      styleProps = {};
    }
    if (options.useStaticStyles && typeof styleFunctionOrObject === "function" && styleFunctionOrObject.__noStyleOverride__) {
      return styleFunctionOrObject(styleProps);
    }
    getClassNamesCount++;
    var current = map;
    var theme = styleProps.theme;
    var rtl = theme && theme.rtl !== void 0 ? theme.rtl : getRTL2();
    var disableCaching = options.disableCaching;
    if (currentMemoizedClassNames !== _memoizedClassNames) {
      currentMemoizedClassNames = _memoizedClassNames;
      map = /* @__PURE__ */ new Map();
      styleCalcCount = 0;
    }
    if (!options.disableCaching) {
      current = _traverseMap(map, styleFunctionOrObject);
      current = _traverseMap(current, styleProps);
    }
    if (disableCaching || !current[retVal]) {
      if (styleFunctionOrObject === void 0) {
        current[retVal] = {};
      } else {
        current[retVal] = mergeCssSets([
          typeof styleFunctionOrObject === "function" ? styleFunctionOrObject(styleProps) : styleFunctionOrObject
        ], { rtl: !!rtl, specificityMultiplier: options.useStaticStyles ? DEFAULT_SPECIFICITY_MULTIPLIER : void 0 });
      }
      if (!disableCaching) {
        styleCalcCount++;
      }
    }
    if (styleCalcCount > (options.cacheSize || MAX_CACHE_COUNT)) {
      var win = getWindow();
      if ((_a3 = win === null || win === void 0 ? void 0 : win.FabricConfig) === null || _a3 === void 0 ? void 0 : _a3.enableClassNameCacheFullWarning) {
        console.warn("Styles are being recalculated too frequently. Cache miss rate is ".concat(styleCalcCount, "/").concat(getClassNamesCount, "."));
        console.trace();
      }
      map.clear();
      styleCalcCount = 0;
      options.disableCaching = true;
    }
    return current[retVal];
  };
  return getClassNames;
}
function _traverseEdge(current, value) {
  value = _normalizeValue(value);
  if (!current.has(value)) {
    current.set(value, /* @__PURE__ */ new Map());
  }
  return current.get(value);
}
function _traverseMap(current, inputs) {
  if (typeof inputs === "function") {
    var cachedInputsFromStyled = inputs.__cachedInputs__;
    if (cachedInputsFromStyled) {
      for (var _i = 0, _a3 = inputs.__cachedInputs__; _i < _a3.length; _i++) {
        var input = _a3[_i];
        current = _traverseEdge(current, input);
      }
    } else {
      current = _traverseEdge(current, inputs);
    }
  } else if (typeof inputs === "object") {
    for (var propName in inputs) {
      if (inputs.hasOwnProperty(propName)) {
        current = _traverseEdge(current, inputs[propName]);
      }
    }
  }
  return current;
}
function _normalizeValue(value) {
  switch (value) {
    case void 0:
      return "__undefined__";
    case null:
      return "__null__";
    default:
      return value;
  }
}

// node_modules/@fluentui/utilities/lib/controlled.js
function isControlled(props, valueProp) {
  return props[valueProp] !== void 0 && props[valueProp] !== null;
}

// node_modules/@fluentui/utilities/lib/css.js
function css() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var classes = [];
  for (var _a3 = 0, args_1 = args; _a3 < args_1.length; _a3++) {
    var arg = args_1[_a3];
    if (arg) {
      if (typeof arg === "string") {
        classes.push(arg);
      } else if (arg.hasOwnProperty("toString") && typeof arg.toString === "function") {
        classes.push(arg.toString());
      } else {
        for (var key in arg) {
          if (arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }
  return classes.join(" ");
}

// node_modules/@fluentui/utilities/lib/getId.js
var CURRENT_ID_PROPERTY = "__currentId__";
var DEFAULT_ID_STRING = "id__";
var _global2 = getWindow() || {};
if (_global2[CURRENT_ID_PROPERTY] === void 0) {
  _global2[CURRENT_ID_PROPERTY] = 0;
}
var _initializedStylesheetResets = false;
function getId(prefix) {
  if (!_initializedStylesheetResets) {
    var stylesheet3 = Stylesheet.getInstance();
    if (stylesheet3 && stylesheet3.onReset) {
      stylesheet3.onReset(resetIds);
    }
    _initializedStylesheetResets = true;
  }
  var index = _global2[CURRENT_ID_PROPERTY]++;
  return (prefix === void 0 ? DEFAULT_ID_STRING : prefix) + index;
}
function resetIds(counter) {
  if (counter === void 0) {
    counter = 0;
  }
  _global2[CURRENT_ID_PROPERTY] = counter;
}

// node_modules/@fluentui/utilities/lib/properties.js
var toObjectMap = function() {
  var items = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    items[_i] = arguments[_i];
  }
  var result = {};
  for (var _a3 = 0, items_1 = items; _a3 < items_1.length; _a3++) {
    var item = items_1[_a3];
    var keys = Array.isArray(item) ? item : Object.keys(item);
    for (var _b = 0, keys_1 = keys; _b < keys_1.length; _b++) {
      var key = keys_1[_b];
      result[key] = 1;
    }
  }
  return result;
};
var baseElementEvents = toObjectMap([
  "onCopy",
  "onCut",
  "onPaste",
  "onCompositionEnd",
  "onCompositionStart",
  "onCompositionUpdate",
  "onFocus",
  "onFocusCapture",
  "onBlur",
  "onBlurCapture",
  "onChange",
  "onInput",
  "onSubmit",
  "onLoad",
  "onError",
  "onKeyDown",
  "onKeyDownCapture",
  "onKeyPress",
  "onKeyUp",
  "onAbort",
  "onCanPlay",
  "onCanPlayThrough",
  "onDurationChange",
  "onEmptied",
  "onEncrypted",
  "onEnded",
  "onLoadedData",
  "onLoadedMetadata",
  "onLoadStart",
  "onPause",
  "onPlay",
  "onPlaying",
  "onProgress",
  "onRateChange",
  "onSeeked",
  "onSeeking",
  "onStalled",
  "onSuspend",
  "onTimeUpdate",
  "onVolumeChange",
  "onWaiting",
  "onClick",
  "onClickCapture",
  "onContextMenu",
  "onDoubleClick",
  "onDrag",
  "onDragEnd",
  "onDragEnter",
  "onDragExit",
  "onDragLeave",
  "onDragOver",
  "onDragStart",
  "onDrop",
  "onMouseDown",
  "onMouseDownCapture",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp",
  "onMouseUpCapture",
  "onSelect",
  "onTouchCancel",
  "onTouchEnd",
  "onTouchMove",
  "onTouchStart",
  "onScroll",
  "onWheel",
  "onPointerCancel",
  "onPointerDown",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerMove",
  "onPointerOut",
  "onPointerOver",
  "onPointerUp",
  "onGotPointerCapture",
  "onLostPointerCapture"
]);
var baseElementProperties = toObjectMap([
  "accessKey",
  "children",
  "className",
  "contentEditable",
  "dir",
  "draggable",
  "hidden",
  "htmlFor",
  "id",
  "lang",
  "ref",
  "role",
  "style",
  "tabIndex",
  "title",
  "translate",
  "spellCheck",
  "name"
  // global
]);
var htmlElementProperties = toObjectMap(baseElementProperties, baseElementEvents);
var labelProperties = toObjectMap(htmlElementProperties, [
  "form"
  // button, fieldset, input, label, meter, object, output, select, textarea
]);
var audioProperties = toObjectMap(htmlElementProperties, [
  "height",
  "loop",
  "muted",
  "preload",
  "src",
  "width"
  // canvas, embed, iframe, img, input, object, video
]);
var videoProperties = toObjectMap(audioProperties, [
  "poster"
  // video
]);
var olProperties = toObjectMap(htmlElementProperties, [
  "start"
  // ol
]);
var liProperties = toObjectMap(htmlElementProperties, [
  "value"
  // button, input, li, option, meter, progress, param
]);
var anchorProperties = toObjectMap(htmlElementProperties, [
  "download",
  "href",
  "hrefLang",
  "media",
  "rel",
  "target",
  "type"
  // a, button, input, link, menu, object, script, source, style
]);
var buttonProperties = toObjectMap(htmlElementProperties, [
  "autoFocus",
  "disabled",
  "form",
  "formAction",
  "formEncType",
  "formMethod",
  "formNoValidate",
  "formTarget",
  "type",
  "value"
  // button, input, li, option, meter, progress, param,
]);
var inputProperties = toObjectMap(buttonProperties, [
  "accept",
  "alt",
  "autoCapitalize",
  "autoComplete",
  "checked",
  "dirname",
  "form",
  "height",
  "inputMode",
  "list",
  "max",
  "maxLength",
  "min",
  "minLength",
  "multiple",
  "pattern",
  "placeholder",
  "readOnly",
  "required",
  "src",
  "step",
  "size",
  "type",
  "value",
  "width"
  // canvas, embed, iframe, img, input, object, video
]);
var textAreaProperties = toObjectMap(buttonProperties, [
  "autoCapitalize",
  "cols",
  "dirname",
  "form",
  "maxLength",
  "minLength",
  "placeholder",
  "readOnly",
  "required",
  "rows",
  "wrap"
  // textarea
]);
var selectProperties = toObjectMap(buttonProperties, [
  "form",
  "multiple",
  "required"
  // input, select, textarea
]);
var optionProperties = toObjectMap(htmlElementProperties, [
  "selected",
  "value"
  // button, input, li, option, meter, progress, param
]);
var tableProperties = toObjectMap(htmlElementProperties, [
  "cellPadding",
  "cellSpacing"
  // table
]);
var thProperties = toObjectMap(htmlElementProperties, [
  "rowSpan",
  "scope"
  // th
]);
var tdProperties = toObjectMap(htmlElementProperties, [
  "colSpan",
  "headers",
  "rowSpan",
  "scope"
  // th
]);
var colGroupProperties = toObjectMap(htmlElementProperties, [
  "span"
  // col, colgroup
]);
var colProperties = toObjectMap(htmlElementProperties, [
  "span"
  // col, colgroup
]);
var formProperties = toObjectMap(htmlElementProperties, [
  "acceptCharset",
  "action",
  "encType",
  "encType",
  "method",
  "noValidate",
  "target"
  // form
]);
var iframeProperties = toObjectMap(htmlElementProperties, [
  "allow",
  "allowFullScreen",
  "allowPaymentRequest",
  "allowTransparency",
  "csp",
  "height",
  "importance",
  "referrerPolicy",
  "sandbox",
  "src",
  "srcDoc",
  "width"
  // canvas, embed, iframe, img, input, object, video,
]);
var imgProperties = toObjectMap(htmlElementProperties, [
  "alt",
  "crossOrigin",
  "height",
  "src",
  "srcSet",
  "useMap",
  "width"
  // canvas, embed, iframe, img, input, object, video
]);
var divProperties = htmlElementProperties;
function getNativeProps(props, allowedPropNames, excludedPropNames) {
  var isArray = Array.isArray(allowedPropNames);
  var result = {};
  var keys = Object.keys(props);
  for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
    var key = keys_2[_i];
    var isNativeProp = !isArray && allowedPropNames[key] || isArray && allowedPropNames.indexOf(key) >= 0 || key.indexOf("data-") === 0 || key.indexOf("aria-") === 0;
    if (isNativeProp && (!excludedPropNames || (excludedPropNames === null || excludedPropNames === void 0 ? void 0 : excludedPropNames.indexOf(key)) === -1)) {
      result[key] = props[key];
    }
  }
  return result;
}

// node_modules/@fluentui/utilities/lib/appendFunction.js
function appendFunction(parent) {
  var functions = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    functions[_i - 1] = arguments[_i];
  }
  if (functions.length < 2) {
    return functions[0];
  }
  return function() {
    var args = [];
    for (var _i2 = 0; _i2 < arguments.length; _i2++) {
      args[_i2] = arguments[_i2];
    }
    functions.forEach(function(f) {
      return f && f.apply(parent, args);
    });
  };
}

// node_modules/@fluentui/utilities/lib/extendComponent.js
function extendComponent(parent, methods) {
  for (var name_1 in methods) {
    if (methods.hasOwnProperty(name_1)) {
      parent[name_1] = appendFunction(parent, parent[name_1], methods[name_1]);
    }
  }
}

// node_modules/@fluentui/utilities/lib/initializeComponentRef.js
function initializeComponentRef(obj) {
  extendComponent(obj, {
    componentDidMount: _onMount,
    componentDidUpdate: _onUpdate,
    componentWillUnmount: _onUnmount
  });
}
function _onMount() {
  _setComponentRef(this.props.componentRef, this);
}
function _onUpdate(prevProps) {
  if (prevProps.componentRef !== this.props.componentRef) {
    _setComponentRef(prevProps.componentRef, null);
    _setComponentRef(this.props.componentRef, this);
  }
}
function _onUnmount() {
  _setComponentRef(this.props.componentRef, null);
}
function _setComponentRef(componentRef, value) {
  if (componentRef) {
    if (typeof componentRef === "object") {
      componentRef.current = value;
    } else if (typeof componentRef === "function") {
      componentRef(value);
    }
  }
}

// node_modules/@fluentui/utilities/lib/styled.js
var React4 = __toESM(require_react());

// node_modules/@fluentui/utilities/lib/customizations/useCustomizationSettings.js
var React3 = __toESM(require_react());

// node_modules/@fluentui/utilities/lib/GlobalSettings.js
var GLOBAL_SETTINGS_PROP_NAME = "__globalSettings__";
var CALLBACK_STATE_PROP_NAME = "__callbacks__";
var _counter = 0;
var GlobalSettings = (
  /** @class */
  function() {
    function GlobalSettings2() {
    }
    GlobalSettings2.getValue = function(key, defaultValue) {
      var globalSettings = _getGlobalSettings();
      if (globalSettings[key] === void 0) {
        globalSettings[key] = typeof defaultValue === "function" ? defaultValue() : defaultValue;
      }
      return globalSettings[key];
    };
    GlobalSettings2.setValue = function(key, value) {
      var globalSettings = _getGlobalSettings();
      var callbacks = globalSettings[CALLBACK_STATE_PROP_NAME];
      var oldValue = globalSettings[key];
      if (value !== oldValue) {
        globalSettings[key] = value;
        var changeDescription = {
          oldValue,
          value,
          key
        };
        for (var id in callbacks) {
          if (callbacks.hasOwnProperty(id)) {
            callbacks[id](changeDescription);
          }
        }
      }
      return value;
    };
    GlobalSettings2.addChangeListener = function(cb) {
      var id = cb.__id__;
      var callbacks = _getCallbacks();
      if (!id) {
        id = cb.__id__ = String(_counter++);
      }
      callbacks[id] = cb;
    };
    GlobalSettings2.removeChangeListener = function(cb) {
      var callbacks = _getCallbacks();
      delete callbacks[cb.__id__];
    };
    return GlobalSettings2;
  }()
);
function _getGlobalSettings() {
  var _a3;
  var win = getWindow();
  var globalObj = win || {};
  if (!globalObj[GLOBAL_SETTINGS_PROP_NAME]) {
    globalObj[GLOBAL_SETTINGS_PROP_NAME] = (_a3 = {}, _a3[CALLBACK_STATE_PROP_NAME] = {}, _a3);
  }
  return globalObj[GLOBAL_SETTINGS_PROP_NAME];
}
function _getCallbacks() {
  var globalSettings = _getGlobalSettings();
  return globalSettings[CALLBACK_STATE_PROP_NAME];
}

// node_modules/@fluentui/utilities/lib/customizations/Customizations.js
var CustomizationsGlobalKey = "customizations";
var NO_CUSTOMIZATIONS = { settings: {}, scopedSettings: {}, inCustomizerContext: false };
var _allSettings = GlobalSettings.getValue(CustomizationsGlobalKey, {
  settings: {},
  scopedSettings: {},
  inCustomizerContext: false
});
var _events = [];
var Customizations = (
  /** @class */
  function() {
    function Customizations2() {
    }
    Customizations2.reset = function() {
      _allSettings.settings = {};
      _allSettings.scopedSettings = {};
    };
    Customizations2.applySettings = function(settings) {
      _allSettings.settings = __assign(__assign({}, _allSettings.settings), settings);
      Customizations2._raiseChange();
    };
    Customizations2.applyScopedSettings = function(scopeName, settings) {
      _allSettings.scopedSettings[scopeName] = __assign(__assign({}, _allSettings.scopedSettings[scopeName]), settings);
      Customizations2._raiseChange();
    };
    Customizations2.getSettings = function(properties, scopeName, localSettings) {
      if (localSettings === void 0) {
        localSettings = NO_CUSTOMIZATIONS;
      }
      var settings = {};
      var localScopedSettings = scopeName && localSettings.scopedSettings[scopeName] || {};
      var globalScopedSettings = scopeName && _allSettings.scopedSettings[scopeName] || {};
      for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
        var property = properties_1[_i];
        settings[property] = localScopedSettings[property] || localSettings.settings[property] || globalScopedSettings[property] || _allSettings.settings[property];
      }
      return settings;
    };
    Customizations2.applyBatchedUpdates = function(code, suppressUpdate) {
      Customizations2._suppressUpdates = true;
      try {
        code();
      } catch (_a3) {
      }
      Customizations2._suppressUpdates = false;
      if (!suppressUpdate) {
        Customizations2._raiseChange();
      }
    };
    Customizations2.observe = function(onChange) {
      _events.push(onChange);
    };
    Customizations2.unobserve = function(onChange) {
      _events = _events.filter(function(cb) {
        return cb !== onChange;
      });
    };
    Customizations2._raiseChange = function() {
      if (!Customizations2._suppressUpdates) {
        _events.forEach(function(cb) {
          return cb();
        });
      }
    };
    return Customizations2;
  }()
);

// node_modules/@fluentui/utilities/lib/customizations/CustomizerContext.js
var React2 = __toESM(require_react());
var CustomizerContext = React2.createContext({
  customizations: {
    inCustomizerContext: false,
    settings: {},
    scopedSettings: {}
  }
});

// node_modules/@fluentui/utilities/lib/customizations/useCustomizationSettings.js
function useCustomizationSettings(properties, scopeName) {
  var forceUpdate = useForceUpdate();
  var customizations = React3.useContext(CustomizerContext).customizations;
  var inCustomizerContext = customizations.inCustomizerContext;
  React3.useEffect(function() {
    if (!inCustomizerContext) {
      Customizations.observe(forceUpdate);
    }
    return function() {
      if (!inCustomizerContext) {
        Customizations.unobserve(forceUpdate);
      }
    };
  }, [inCustomizerContext]);
  return Customizations.getSettings(properties, scopeName, customizations);
}
function useForceUpdate() {
  var _a3 = React3.useState(0), setValue = _a3[1];
  return function() {
    return setValue(function(value) {
      return ++value;
    });
  };
}

// node_modules/@fluentui/utilities/lib/styled.js
var DefaultFields = ["theme", "styles"];
function styled(Component6, baseStyles, getProps, customizable2, pure) {
  customizable2 = customizable2 || { scope: "", fields: void 0 };
  var scope = customizable2.scope, _a3 = customizable2.fields, fields = _a3 === void 0 ? DefaultFields : _a3;
  var Wrapped = React4.forwardRef(function(props, forwardedRef) {
    var styles = React4.useRef();
    var settings = useCustomizationSettings(fields, scope);
    var customizedStyles = settings.styles, dir = settings.dir, rest = __rest(settings, ["styles", "dir"]);
    var additionalProps = getProps ? getProps(props) : void 0;
    var cache = styles.current && styles.current.__cachedInputs__ || [];
    var propStyles = props.styles;
    if (!styles.current || customizedStyles !== cache[1] || propStyles !== cache[2]) {
      var concatenatedStyles = function(styleProps) {
        return concatStyleSetsWithProps(styleProps, baseStyles, customizedStyles, propStyles);
      };
      concatenatedStyles.__cachedInputs__ = [
        baseStyles,
        customizedStyles,
        propStyles
      ];
      concatenatedStyles.__noStyleOverride__ = !customizedStyles && !propStyles;
      styles.current = concatenatedStyles;
    }
    return React4.createElement(Component6, __assign({ ref: forwardedRef }, rest, additionalProps, props, { styles: styles.current }));
  });
  Wrapped.displayName = "Styled".concat(Component6.displayName || Component6.name);
  var pureComponent = pure ? React4.memo(Wrapped) : Wrapped;
  if (Wrapped.displayName) {
    pureComponent.displayName = Wrapped.displayName;
  }
  return pureComponent;
}

// node_modules/@fluentui/utilities/lib/warn/warnControlledUsage.js
var warningsMap;
if (true) {
  warningsMap = {
    valueOnChange: {},
    valueDefaultValue: {},
    controlledToUncontrolled: {},
    uncontrolledToControlled: {}
  };
}
function warnControlledUsage(params) {
  if (true) {
    var componentId = params.componentId, componentName = params.componentName, defaultValueProp = params.defaultValueProp, props = params.props, oldProps = params.oldProps, onChangeProp = params.onChangeProp, readOnlyProp = params.readOnlyProp, valueProp = params.valueProp;
    var oldIsControlled = oldProps ? isControlled(oldProps, valueProp) : void 0;
    var newIsControlled = isControlled(props, valueProp);
    if (newIsControlled) {
      var hasOnChange = !!props[onChangeProp];
      var isReadOnly = !!(readOnlyProp && props[readOnlyProp]);
      if (!(hasOnChange || isReadOnly) && !warningsMap.valueOnChange[componentId]) {
        warningsMap.valueOnChange[componentId] = true;
        warn("Warning: You provided a '".concat(String(valueProp), "' prop to a ").concat(String(componentName), " without an '").concat(String(onChangeProp), "' handler. ") + "This will render a read-only field. If the field should be mutable use '".concat(String(defaultValueProp), "'. ") + "Otherwise, set '".concat(String(onChangeProp), "'").concat(readOnlyProp ? " or '".concat(String(readOnlyProp), "'") : "", "."));
      }
      var defaultValue = props[defaultValueProp];
      if (defaultValue !== void 0 && defaultValue !== null && !warningsMap.valueDefaultValue[componentId]) {
        warningsMap.valueDefaultValue[componentId] = true;
        warn("Warning: You provided both '".concat(String(valueProp), "' and '").concat(String(defaultValueProp), "' to a ").concat(componentName, ". ") + "Form fields must be either controlled or uncontrolled (specify either the '".concat(String(valueProp), "' prop, ") + "or the '".concat(String(defaultValueProp), "' prop, but not both). Decide between using a controlled or uncontrolled ") + "".concat(componentName, " and remove one of these props. More info: https://fb.me/react-controlled-components"));
      }
    }
    if (oldProps && newIsControlled !== oldIsControlled) {
      var oldType = oldIsControlled ? "a controlled" : "an uncontrolled";
      var newType = oldIsControlled ? "uncontrolled" : "controlled";
      var warnMap = oldIsControlled ? warningsMap.controlledToUncontrolled : warningsMap.uncontrolledToControlled;
      if (!warnMap[componentId]) {
        warnMap[componentId] = true;
        warn("Warning: A component is changing ".concat(oldType, " ").concat(componentName, " to be ").concat(newType, ". ") + "".concat(componentName, "s should not switch from controlled to uncontrolled (or vice versa). ") + "Decide between using controlled or uncontrolled for the lifetime of the component. More info: https://fb.me/react-controlled-components");
      }
    }
  }
}

// node_modules/@fluentui/utilities/lib/warn/warnConditionallyRequiredProps.js
function warnConditionallyRequiredProps(componentName, props, requiredProps, conditionalPropName, condition) {
  if (condition === true && true) {
    for (var _i = 0, requiredProps_1 = requiredProps; _i < requiredProps_1.length; _i++) {
      var requiredPropName = requiredProps_1[_i];
      if (!(requiredPropName in props)) {
        warn("".concat(componentName, " property '").concat(requiredPropName, "' is required when '").concat(conditionalPropName, "' is used.'"));
      }
    }
  }
}

// node_modules/@fluentui/utilities/lib/ie11Detector.js
var isIE11 = function() {
  var _a3;
  var win = getWindow();
  if (!((_a3 = win === null || win === void 0 ? void 0 : win.navigator) === null || _a3 === void 0 ? void 0 : _a3.userAgent)) {
    return false;
  }
  return win.navigator.userAgent.indexOf("rv:11.0") > -1;
};

// node_modules/@fluentui/utilities/lib/useIsomorphicLayoutEffect.js
var React5 = __toESM(require_react());
var useIsomorphicLayoutEffect = canUseDOM() ? React5.useLayoutEffect : React5.useEffect;

// node_modules/@fluentui/utilities/lib/object.js
function assign(target) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  return filteredAssign.apply(this, [null, target].concat(args));
}
function filteredAssign(isAllowed, target) {
  var args = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }
  target = target || {};
  for (var _a3 = 0, args_1 = args; _a3 < args_1.length; _a3++) {
    var sourceObject = args_1[_a3];
    if (sourceObject) {
      for (var propName in sourceObject) {
        if (sourceObject.hasOwnProperty(propName) && (!isAllowed || isAllowed(propName))) {
          target[propName] = sourceObject[propName];
        }
      }
    }
  }
  return target;
}

// node_modules/@fluentui/utilities/lib/EventGroup.js
var EventGroup = (
  /** @class */
  function() {
    function EventGroup2(parent) {
      this._id = EventGroup2._uniqueId++;
      this._parent = parent;
      this._eventRecords = [];
    }
    EventGroup2.raise = function(target, eventName, eventArgs, bubbleEvent) {
      var retVal2;
      if (EventGroup2._isElement(target)) {
        if (typeof document !== "undefined" && document.createEvent) {
          var ev = document.createEvent("HTMLEvents");
          ev.initEvent(eventName, bubbleEvent || false, true);
          assign(ev, eventArgs);
          retVal2 = target.dispatchEvent(ev);
        } else if (typeof document !== "undefined" && document.createEventObject) {
          var evObj = document.createEventObject(eventArgs);
          target.fireEvent("on" + eventName, evObj);
        }
      } else {
        while (target && retVal2 !== false) {
          var events = target.__events__;
          var eventRecords = events ? events[eventName] : null;
          if (eventRecords) {
            for (var id in eventRecords) {
              if (eventRecords.hasOwnProperty(id)) {
                var eventRecordList = eventRecords[id];
                for (var listIndex = 0; retVal2 !== false && listIndex < eventRecordList.length; listIndex++) {
                  var record = eventRecordList[listIndex];
                  if (record.objectCallback) {
                    retVal2 = record.objectCallback.call(record.parent, eventArgs);
                  }
                }
              }
            }
          }
          target = bubbleEvent ? target.parent : null;
        }
      }
      return retVal2;
    };
    EventGroup2.isObserved = function(target, eventName) {
      var events = target && target.__events__;
      return !!events && !!events[eventName];
    };
    EventGroup2.isDeclared = function(target, eventName) {
      var declaredEvents = target && target.__declaredEvents;
      return !!declaredEvents && !!declaredEvents[eventName];
    };
    EventGroup2.stopPropagation = function(event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    };
    EventGroup2._isElement = function(target) {
      return !!target && (!!target.addEventListener || typeof HTMLElement !== "undefined" && target instanceof HTMLElement);
    };
    EventGroup2.prototype.dispose = function() {
      if (!this._isDisposed) {
        this._isDisposed = true;
        this.off();
        this._parent = null;
      }
    };
    EventGroup2.prototype.onAll = function(target, events, useCapture) {
      for (var eventName in events) {
        if (events.hasOwnProperty(eventName)) {
          this.on(target, eventName, events[eventName], useCapture);
        }
      }
    };
    EventGroup2.prototype.on = function(target, eventName, callback, options) {
      var _this = this;
      if (eventName.indexOf(",") > -1) {
        var events = eventName.split(/[ ,]+/);
        for (var i = 0; i < events.length; i++) {
          this.on(target, events[i], callback, options);
        }
      } else {
        var parent_1 = this._parent;
        var eventRecord = {
          target,
          eventName,
          parent: parent_1,
          callback,
          options
        };
        var events = target.__events__ = target.__events__ || {};
        events[eventName] = events[eventName] || {
          count: 0
        };
        events[eventName][this._id] = events[eventName][this._id] || [];
        events[eventName][this._id].push(eventRecord);
        events[eventName].count++;
        if (EventGroup2._isElement(target)) {
          var processElementEvent = function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            if (_this._isDisposed) {
              return;
            }
            var result;
            try {
              result = callback.apply(parent_1, args);
              if (result === false && args[0]) {
                var e = args[0];
                if (e.preventDefault) {
                  e.preventDefault();
                }
                if (e.stopPropagation) {
                  e.stopPropagation();
                }
                e.cancelBubble = true;
              }
            } catch (e2) {
            }
            return result;
          };
          eventRecord.elementCallback = processElementEvent;
          if (target.addEventListener) {
            target.addEventListener(eventName, processElementEvent, options);
          } else if (target.attachEvent) {
            target.attachEvent("on" + eventName, processElementEvent);
          }
        } else {
          var processObjectEvent = function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            if (_this._isDisposed) {
              return;
            }
            return callback.apply(parent_1, args);
          };
          eventRecord.objectCallback = processObjectEvent;
        }
        this._eventRecords.push(eventRecord);
      }
    };
    EventGroup2.prototype.off = function(target, eventName, callback, options) {
      for (var i = 0; i < this._eventRecords.length; i++) {
        var eventRecord = this._eventRecords[i];
        if ((!target || target === eventRecord.target) && (!eventName || eventName === eventRecord.eventName) && (!callback || callback === eventRecord.callback) && (typeof options !== "boolean" || options === eventRecord.options)) {
          var events = eventRecord.target.__events__;
          var targetArrayLookup = events[eventRecord.eventName];
          var targetArray = targetArrayLookup ? targetArrayLookup[this._id] : null;
          if (targetArray) {
            if (targetArray.length === 1 || !callback) {
              targetArrayLookup.count -= targetArray.length;
              delete events[eventRecord.eventName][this._id];
            } else {
              targetArrayLookup.count--;
              targetArray.splice(targetArray.indexOf(eventRecord), 1);
            }
            if (!targetArrayLookup.count) {
              delete events[eventRecord.eventName];
            }
          }
          if (eventRecord.elementCallback) {
            if (eventRecord.target.removeEventListener) {
              eventRecord.target.removeEventListener(eventRecord.eventName, eventRecord.elementCallback, eventRecord.options);
            } else if (eventRecord.target.detachEvent) {
              eventRecord.target.detachEvent("on" + eventRecord.eventName, eventRecord.elementCallback);
            }
          }
          this._eventRecords.splice(i--, 1);
        }
      }
    };
    EventGroup2.prototype.raise = function(eventName, eventArgs, bubbleEvent) {
      return EventGroup2.raise(this._parent, eventName, eventArgs, bubbleEvent);
    };
    EventGroup2.prototype.declare = function(event) {
      var declaredEvents = this._parent.__declaredEvents = this._parent.__declaredEvents || {};
      if (typeof event === "string") {
        declaredEvents[event] = true;
      } else {
        for (var i = 0; i < event.length; i++) {
          declaredEvents[event[i]] = true;
        }
      }
    };
    EventGroup2._uniqueId = 0;
    return EventGroup2;
  }()
);

// node_modules/@fluentui/utilities/lib/scroll.js
var DisabledScrollClassName = mergeStyles({
  overflow: "hidden !important"
});
var DATA_IS_SCROLLABLE_ATTRIBUTE = "data-is-scrollable";
function findScrollableParent(startingElement) {
  var el = startingElement;
  var doc = getDocument(startingElement);
  while (el && el !== doc.body) {
    if (el.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) === "true") {
      return el;
    }
    el = el.parentElement;
  }
  el = startingElement;
  while (el && el !== doc.body) {
    if (el.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) !== "false") {
      var computedStyles = getComputedStyle(el);
      var overflowY = computedStyles ? computedStyles.getPropertyValue("overflow-y") : "";
      if (overflowY && (overflowY === "scroll" || overflowY === "auto")) {
        return el;
      }
    }
    el = el.parentElement;
  }
  if (!el || el === doc.body) {
    el = getWindow(startingElement);
  }
  return el;
}

// node_modules/@fluentui/utilities/lib/AutoScroll.js
var SCROLL_ITERATION_DELAY = 16;
var SCROLL_GUTTER = 100;
var MAX_SCROLL_VELOCITY = 15;
var AutoScroll = (
  /** @class */
  function() {
    function AutoScroll2(element) {
      this._events = new EventGroup(this);
      this._scrollableParent = findScrollableParent(element);
      this._incrementScroll = this._incrementScroll.bind(this);
      this._scrollRect = getRect(this._scrollableParent);
      if (this._scrollableParent === window) {
        this._scrollableParent = document.body;
      }
      if (this._scrollableParent) {
        this._events.on(window, "mousemove", this._onMouseMove, true);
        this._events.on(window, "touchmove", this._onTouchMove, true);
      }
    }
    AutoScroll2.prototype.dispose = function() {
      this._events.dispose();
      this._stopScroll();
    };
    AutoScroll2.prototype._onMouseMove = function(ev) {
      this._computeScrollVelocity(ev);
    };
    AutoScroll2.prototype._onTouchMove = function(ev) {
      if (ev.touches.length > 0) {
        this._computeScrollVelocity(ev);
      }
    };
    AutoScroll2.prototype._computeScrollVelocity = function(ev) {
      if (!this._scrollRect) {
        return;
      }
      var clientX;
      var clientY;
      if ("clientX" in ev) {
        clientX = ev.clientX;
        clientY = ev.clientY;
      } else {
        clientX = ev.touches[0].clientX;
        clientY = ev.touches[0].clientY;
      }
      var scrollRectTop = this._scrollRect.top;
      var scrollRectLeft = this._scrollRect.left;
      var scrollClientBottom = scrollRectTop + this._scrollRect.height - SCROLL_GUTTER;
      var scrollClientRight = scrollRectLeft + this._scrollRect.width - SCROLL_GUTTER;
      var scrollRect;
      var clientDirection;
      var scrollClient;
      if (clientY < scrollRectTop + SCROLL_GUTTER || clientY > scrollClientBottom) {
        clientDirection = clientY;
        scrollRect = scrollRectTop;
        scrollClient = scrollClientBottom;
        this._isVerticalScroll = true;
      } else {
        clientDirection = clientX;
        scrollRect = scrollRectLeft;
        scrollClient = scrollClientRight;
        this._isVerticalScroll = false;
      }
      if (clientDirection < scrollRect + SCROLL_GUTTER) {
        this._scrollVelocity = Math.max(-MAX_SCROLL_VELOCITY, -MAX_SCROLL_VELOCITY * ((SCROLL_GUTTER - (clientDirection - scrollRect)) / SCROLL_GUTTER));
      } else if (clientDirection > scrollClient) {
        this._scrollVelocity = Math.min(MAX_SCROLL_VELOCITY, MAX_SCROLL_VELOCITY * ((clientDirection - scrollClient) / SCROLL_GUTTER));
      } else {
        this._scrollVelocity = 0;
      }
      if (this._scrollVelocity) {
        this._startScroll();
      } else {
        this._stopScroll();
      }
    };
    AutoScroll2.prototype._startScroll = function() {
      if (!this._timeoutId) {
        this._incrementScroll();
      }
    };
    AutoScroll2.prototype._incrementScroll = function() {
      if (this._scrollableParent) {
        if (this._isVerticalScroll) {
          this._scrollableParent.scrollTop += Math.round(this._scrollVelocity);
        } else {
          this._scrollableParent.scrollLeft += Math.round(this._scrollVelocity);
        }
      }
      this._timeoutId = setTimeout(this._incrementScroll, SCROLL_ITERATION_DELAY);
    };
    AutoScroll2.prototype._stopScroll = function() {
      if (this._timeoutId) {
        clearTimeout(this._timeoutId);
        delete this._timeoutId;
      }
    };
    return AutoScroll2;
  }()
);

// node_modules/@fluentui/utilities/lib/BaseComponent.js
var React6 = __toESM(require_react());
var BaseComponent = (
  /** @class */
  function(_super) {
    __extends(BaseComponent2, _super);
    function BaseComponent2(props, context) {
      var _this = _super.call(this, props, context) || this;
      _makeAllSafe(_this, BaseComponent2.prototype, [
        "componentDidMount",
        "shouldComponentUpdate",
        "getSnapshotBeforeUpdate",
        "render",
        "componentDidUpdate",
        "componentWillUnmount"
      ]);
      return _this;
    }
    BaseComponent2.prototype.componentDidUpdate = function(prevProps, prevState) {
      this._updateComponentRef(prevProps, this.props);
    };
    BaseComponent2.prototype.componentDidMount = function() {
      this._setComponentRef(this.props.componentRef, this);
    };
    BaseComponent2.prototype.componentWillUnmount = function() {
      this._setComponentRef(this.props.componentRef, null);
      if (this.__disposables) {
        for (var i = 0, len = this._disposables.length; i < len; i++) {
          var disposable = this.__disposables[i];
          if (disposable.dispose) {
            disposable.dispose();
          }
        }
        this.__disposables = null;
      }
    };
    Object.defineProperty(BaseComponent2.prototype, "className", {
      /**
       * Gets the object's class name.
       */
      get: function() {
        if (!this.__className) {
          var funcNameRegex = /function (.{1,})\(/;
          var results = funcNameRegex.exec(this.constructor.toString());
          this.__className = results && results.length > 1 ? results[1] : "";
        }
        return this.__className;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BaseComponent2.prototype, "_disposables", {
      /**
       * Allows subclasses to push things to this._disposables to be auto disposed.
       */
      get: function() {
        if (!this.__disposables) {
          this.__disposables = [];
        }
        return this.__disposables;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BaseComponent2.prototype, "_async", {
      /**
       * Gets the async instance associated with the component, created on demand. The async instance gives
       * subclasses a way to execute setTimeout/setInterval async calls safely, where the callbacks
       * will be cleared/ignored automatically after unmounting. The helpers within the async object also
       * preserve the this pointer so that you don't need to "bind" the callbacks.
       */
      get: function() {
        if (!this.__async) {
          this.__async = new Async(this);
          this._disposables.push(this.__async);
        }
        return this.__async;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(BaseComponent2.prototype, "_events", {
      /**
       * Gets the event group instance assocaited with the component, created on demand. The event instance
       * provides on/off methods for listening to DOM (or regular javascript object) events. The event callbacks
       * will be automatically disconnected after unmounting. The helpers within the events object also
       * preserve the this reference so that you don't need to "bind" the callbacks.
       */
      get: function() {
        if (!this.__events) {
          this.__events = new EventGroup(this);
          this._disposables.push(this.__events);
        }
        return this.__events;
      },
      enumerable: false,
      configurable: true
    });
    BaseComponent2.prototype._resolveRef = function(refName) {
      var _this = this;
      if (!this.__resolves) {
        this.__resolves = {};
      }
      if (!this.__resolves[refName]) {
        this.__resolves[refName] = function(ref) {
          return _this[refName] = ref;
        };
      }
      return this.__resolves[refName];
    };
    BaseComponent2.prototype._updateComponentRef = function(currentProps, newProps) {
      if (newProps === void 0) {
        newProps = {};
      }
      if (currentProps && newProps && currentProps.componentRef !== newProps.componentRef) {
        this._setComponentRef(currentProps.componentRef, null);
        this._setComponentRef(newProps.componentRef, this);
      }
    };
    BaseComponent2.prototype._warnDeprecations = function(deprecationMap) {
      warnDeprecations(this.className, this.props, deprecationMap);
    };
    BaseComponent2.prototype._warnMutuallyExclusive = function(mutuallyExclusiveMap) {
      warnMutuallyExclusive(this.className, this.props, mutuallyExclusiveMap);
    };
    BaseComponent2.prototype._warnConditionallyRequiredProps = function(requiredProps, conditionalPropName, condition) {
      warnConditionallyRequiredProps(this.className, this.props, requiredProps, conditionalPropName, condition);
    };
    BaseComponent2.prototype._setComponentRef = function(ref, value) {
      if (!this._skipComponentRefResolution && ref) {
        if (typeof ref === "function") {
          ref(value);
        }
        if (typeof ref === "object") {
          ref.current = value;
        }
      }
    };
    return BaseComponent2;
  }(React6.Component)
);
function _makeAllSafe(obj, prototype, methodNames) {
  for (var i = 0, len = methodNames.length; i < len; i++) {
    _makeSafe(obj, prototype, methodNames[i]);
  }
}
function _makeSafe(obj, prototype, methodName) {
  var classMethod = obj[methodName];
  var prototypeMethod = prototype[methodName];
  if (classMethod || prototypeMethod) {
    obj[methodName] = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var retVal2;
      if (prototypeMethod) {
        retVal2 = prototypeMethod.apply(this, args);
      }
      if (classMethod !== prototypeMethod) {
        retVal2 = classMethod.apply(this, args);
      }
      return retVal2;
    };
  }
}

// node_modules/@fluentui/utilities/lib/FabricPerformance.js
var now = function() {
  return typeof performance !== "undefined" && !!performance.now ? performance.now() : Date.now();
};
var RESET_INTERVAL = 3 * 60 * 1e3;
var FabricPerformance = (
  /** @class */
  function() {
    function FabricPerformance2() {
    }
    FabricPerformance2.measure = function(name, func) {
      if (FabricPerformance2._timeoutId) {
        FabricPerformance2.setPeriodicReset();
      }
      var start = now();
      func();
      var end = now();
      var measurement = FabricPerformance2.summary[name] || {
        totalDuration: 0,
        count: 0,
        all: []
      };
      var duration = end - start;
      measurement.totalDuration += duration;
      measurement.count++;
      measurement.all.push({
        duration,
        timeStamp: end
      });
      FabricPerformance2.summary[name] = measurement;
    };
    FabricPerformance2.reset = function() {
      FabricPerformance2.summary = {};
      clearTimeout(FabricPerformance2._timeoutId);
      FabricPerformance2._timeoutId = NaN;
    };
    FabricPerformance2.setPeriodicReset = function() {
      FabricPerformance2._timeoutId = setTimeout(function() {
        return FabricPerformance2.reset();
      }, RESET_INTERVAL);
    };
    FabricPerformance2.summary = {};
    return FabricPerformance2;
  }()
);

// node_modules/@fluentui/utilities/lib/Rectangle.js
var Rectangle = (
  /** @class */
  function() {
    function Rectangle2(left, right, top, bottom) {
      if (left === void 0) {
        left = 0;
      }
      if (right === void 0) {
        right = 0;
      }
      if (top === void 0) {
        top = 0;
      }
      if (bottom === void 0) {
        bottom = 0;
      }
      this.top = top;
      this.bottom = bottom;
      this.left = left;
      this.right = right;
    }
    Object.defineProperty(Rectangle2.prototype, "width", {
      /**
       * Calculated automatically by subtracting the right from left
       */
      get: function() {
        return this.right - this.left;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Rectangle2.prototype, "height", {
      /**
       * Calculated automatically by subtracting the bottom from top.
       */
      get: function() {
        return this.bottom - this.top;
      },
      enumerable: false,
      configurable: true
    });
    Rectangle2.prototype.equals = function(rect) {
      return parseFloat(this.top.toFixed(4)) === parseFloat(rect.top.toFixed(4)) && parseFloat(this.bottom.toFixed(4)) === parseFloat(rect.bottom.toFixed(4)) && parseFloat(this.left.toFixed(4)) === parseFloat(rect.left.toFixed(4)) && parseFloat(this.right.toFixed(4)) === parseFloat(rect.right.toFixed(4));
    };
    return Rectangle2;
  }()
);

// node_modules/@fluentui/utilities/lib/asAsync.js
var React7 = __toESM(require_react());

// node_modules/@fluentui/utilities/lib/componentAs/composeComponentAs.js
var React8 = __toESM(require_react());

// node_modules/@fluentui/utilities/lib/memoize.js
var _initializedStylesheetResets2 = false;
var _resetCounter = 0;
var _emptyObject = { empty: true };
var _dictionary = {};
var _weakMap = typeof WeakMap === "undefined" ? null : WeakMap;
function resetMemoizations() {
  _resetCounter++;
}
function memoizeFunction(cb, maxCacheSize, ignoreNullOrUndefinedResult) {
  if (maxCacheSize === void 0) {
    maxCacheSize = 100;
  }
  if (ignoreNullOrUndefinedResult === void 0) {
    ignoreNullOrUndefinedResult = false;
  }
  if (!_weakMap) {
    return cb;
  }
  if (!_initializedStylesheetResets2) {
    var stylesheet3 = Stylesheet.getInstance();
    if (stylesheet3 && stylesheet3.onReset) {
      Stylesheet.getInstance().onReset(resetMemoizations);
    }
    _initializedStylesheetResets2 = true;
  }
  var rootNode;
  var cacheSize = 0;
  var localResetCounter = _resetCounter;
  return function memoizedFunction() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var currentNode = rootNode;
    if (rootNode === void 0 || localResetCounter !== _resetCounter || maxCacheSize > 0 && cacheSize > maxCacheSize) {
      rootNode = _createNode();
      cacheSize = 0;
      localResetCounter = _resetCounter;
    }
    currentNode = rootNode;
    for (var i = 0; i < args.length; i++) {
      var arg = _normalizeArg(args[i]);
      if (!currentNode.map.has(arg)) {
        currentNode.map.set(arg, _createNode());
      }
      currentNode = currentNode.map.get(arg);
    }
    if (!currentNode.hasOwnProperty("value")) {
      currentNode.value = cb.apply(void 0, args);
      cacheSize++;
    }
    if (ignoreNullOrUndefinedResult && (currentNode.value === null || currentNode.value === void 0)) {
      currentNode.value = cb.apply(void 0, args);
    }
    return currentNode.value;
  };
}
function createMemoizer(getValue) {
  if (!_weakMap) {
    return getValue;
  }
  var cache = new _weakMap();
  function memoizedGetValue(input) {
    if (!input || typeof input !== "function" && typeof input !== "object") {
      return getValue(input);
    }
    if (cache.has(input)) {
      return cache.get(input);
    }
    var value = getValue(input);
    cache.set(input, value);
    return value;
  }
  return memoizedGetValue;
}
function _normalizeArg(val) {
  if (!val) {
    return _emptyObject;
  } else if (typeof val === "object" || typeof val === "function") {
    return val;
  } else if (!_dictionary[val]) {
    _dictionary[val] = { val };
  }
  return _dictionary[val];
}
function _createNode() {
  return {
    map: _weakMap ? new _weakMap() : null
  };
}

// node_modules/@fluentui/utilities/lib/componentAs/composeComponentAs.js
function createComposedComponent(outer) {
  var Outer = outer;
  var outerMemoizer = createMemoizer(function(inner) {
    if (outer === inner) {
      throw new Error("Attempted to compose a component with itself.");
    }
    var Inner = inner;
    var innerMemoizer = createMemoizer(function(defaultRender) {
      var InnerWithDefaultRender = function(innerProps) {
        return React8.createElement(Inner, __assign({}, innerProps, { defaultRender }));
      };
      return InnerWithDefaultRender;
    });
    var OuterWithDefaultRender = function(outerProps) {
      var defaultRender = outerProps.defaultRender;
      return React8.createElement(Outer, __assign({}, outerProps, { defaultRender: defaultRender ? innerMemoizer(defaultRender) : Inner }));
    };
    return OuterWithDefaultRender;
  });
  return outerMemoizer;
}
var componentAsMemoizer = createMemoizer(createComposedComponent);

// node_modules/@fluentui/utilities/lib/customizations/Customizer.js
var React9 = __toESM(require_react());

// node_modules/@fluentui/utilities/lib/customizations/mergeSettings.js
function mergeSettings(oldSettings, newSettings) {
  if (oldSettings === void 0) {
    oldSettings = {};
  }
  var mergeSettingsWith = _isSettingsFunction(newSettings) ? newSettings : _settingsMergeWith(newSettings);
  return mergeSettingsWith(oldSettings);
}
function mergeScopedSettings(oldSettings, newSettings) {
  if (oldSettings === void 0) {
    oldSettings = {};
  }
  var mergeSettingsWith = _isSettingsFunction(newSettings) ? newSettings : _scopedSettingsMergeWith(newSettings);
  return mergeSettingsWith(oldSettings);
}
function _isSettingsFunction(settings) {
  return typeof settings === "function";
}
function _settingsMergeWith(newSettings) {
  return function(settings) {
    return newSettings ? __assign(__assign({}, settings), newSettings) : settings;
  };
}
function _scopedSettingsMergeWith(scopedSettingsFromProps) {
  if (scopedSettingsFromProps === void 0) {
    scopedSettingsFromProps = {};
  }
  return function(oldScopedSettings) {
    var newScopedSettings = __assign({}, oldScopedSettings);
    for (var scopeName in scopedSettingsFromProps) {
      if (scopedSettingsFromProps.hasOwnProperty(scopeName)) {
        newScopedSettings[scopeName] = __assign(__assign({}, oldScopedSettings[scopeName]), scopedSettingsFromProps[scopeName]);
      }
    }
    return newScopedSettings;
  };
}

// node_modules/@fluentui/utilities/lib/customizations/mergeCustomizations.js
function mergeCustomizations(props, parentContext) {
  var _a3 = (parentContext || {}).customizations, customizations = _a3 === void 0 ? { settings: {}, scopedSettings: {} } : _a3;
  return {
    customizations: {
      settings: mergeSettings(customizations.settings, props.settings),
      scopedSettings: mergeScopedSettings(customizations.scopedSettings, props.scopedSettings),
      inCustomizerContext: true
    }
  };
}

// node_modules/@fluentui/utilities/lib/customizations/Customizer.js
var Customizer = (
  /** @class */
  function(_super) {
    __extends(Customizer2, _super);
    function Customizer2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this._onCustomizationChange = function() {
        return _this.forceUpdate();
      };
      return _this;
    }
    Customizer2.prototype.componentDidMount = function() {
      Customizations.observe(this._onCustomizationChange);
    };
    Customizer2.prototype.componentWillUnmount = function() {
      Customizations.unobserve(this._onCustomizationChange);
    };
    Customizer2.prototype.render = function() {
      var _this = this;
      var contextTransform = this.props.contextTransform;
      return React9.createElement(CustomizerContext.Consumer, null, function(parentContext) {
        var newContext = mergeCustomizations(_this.props, parentContext);
        if (contextTransform) {
          newContext = contextTransform(newContext);
        }
        return React9.createElement(CustomizerContext.Provider, { value: newContext }, _this.props.children);
      });
    };
    return Customizer2;
  }(React9.Component)
);

// node_modules/@fluentui/utilities/lib/customizations/customizable.js
var React10 = __toESM(require_react());

// node_modules/@fluentui/utilities/lib/keyboard.js
var _a2;
var DirectionalKeyCodes = (_a2 = {}, _a2[KeyCodes.up] = 1, _a2[KeyCodes.down] = 1, _a2[KeyCodes.left] = 1, _a2[KeyCodes.right] = 1, _a2[KeyCodes.home] = 1, _a2[KeyCodes.end] = 1, _a2[KeyCodes.tab] = 1, _a2[KeyCodes.pageUp] = 1, _a2[KeyCodes.pageDown] = 1, _a2);

// node_modules/@fluentui/utilities/lib/setFocusVisibility.js
var IsFocusVisibleClassName = "ms-Fabric--isFocusVisible";

// node_modules/@fluentui/utilities/lib/FocusRectsProvider.js
var React12 = __toESM(require_react());

// node_modules/@fluentui/utilities/lib/useFocusRects.js
var React11 = __toESM(require_react());
var FocusRectsContext = React11.createContext(void 0);

// node_modules/@fluentui/utilities/lib/localStorage.js
function getItem2(key) {
  var result = null;
  try {
    var win = getWindow();
    result = win ? win.localStorage.getItem(key) : null;
  } catch (e) {
  }
  return result;
}

// node_modules/@fluentui/utilities/lib/language.js
var _language;
var STORAGE_KEY = "language";
function getLanguage(persistenceType) {
  if (persistenceType === void 0) {
    persistenceType = "sessionStorage";
  }
  if (_language === void 0) {
    var doc = getDocument();
    var savedLanguage = persistenceType === "localStorage" ? getItem2(STORAGE_KEY) : persistenceType === "sessionStorage" ? getItem(STORAGE_KEY) : void 0;
    if (savedLanguage) {
      _language = savedLanguage;
    }
    if (_language === void 0 && doc) {
      _language = doc.documentElement.getAttribute("lang");
    }
    if (_language === void 0) {
      _language = "en";
    }
  }
  return _language;
}

// node_modules/@fluentui/utilities/lib/merge.js
function merge(target) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  for (var _a3 = 0, args_1 = args; _a3 < args_1.length; _a3++) {
    var arg = args_1[_a3];
    _merge(target || {}, arg);
  }
  return target;
}
function _merge(target, source, circularReferences) {
  if (circularReferences === void 0) {
    circularReferences = [];
  }
  circularReferences.push(source);
  for (var name_1 in source) {
    if (source.hasOwnProperty(name_1)) {
      if (name_1 !== "__proto__" && name_1 !== "constructor" && name_1 !== "prototype") {
        var value = source[name_1];
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          var isCircularReference = circularReferences.indexOf(value) > -1;
          target[name_1] = isCircularReference ? value : _merge(target[name_1] || {}, value, circularReferences);
        } else {
          target[name_1] = value;
        }
      }
    }
  }
  circularReferences.pop();
  return target;
}

// node_modules/@fluentui/utilities/lib/renderFunction/composeRenderFunction.js
function createComposedRenderFunction(outer) {
  var outerMemoizer = createMemoizer(function(inner) {
    var innerMemoizer = createMemoizer(function(defaultRender) {
      return function(innerProps) {
        return inner(innerProps, defaultRender);
      };
    });
    return function(outerProps, defaultRender) {
      return outer(outerProps, defaultRender ? innerMemoizer(defaultRender) : inner);
    };
  });
  return outerMemoizer;
}
var memoizer = createMemoizer(createComposedRenderFunction);

// node_modules/@fluentui/utilities/lib/selection/Selection.types.js
var SELECTION_CHANGE = "change";
var SELECTION_ITEMS_CHANGE = "items-change";
var SelectionMode;
(function(SelectionMode2) {
  SelectionMode2[SelectionMode2["none"] = 0] = "none";
  SelectionMode2[SelectionMode2["single"] = 1] = "single";
  SelectionMode2[SelectionMode2["multiple"] = 2] = "multiple";
})(SelectionMode || (SelectionMode = {}));
var SelectionDirection;
(function(SelectionDirection2) {
  SelectionDirection2[SelectionDirection2["horizontal"] = 0] = "horizontal";
  SelectionDirection2[SelectionDirection2["vertical"] = 1] = "vertical";
})(SelectionDirection || (SelectionDirection = {}));

// node_modules/@fluentui/utilities/lib/selection/Selection.js
var Selection = (
  /** @class */
  function() {
    function Selection2() {
      var options = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        options[_i] = arguments[_i];
      }
      var _a3 = options[0] || {}, onSelectionChanged = _a3.onSelectionChanged, onItemsChanged = _a3.onItemsChanged, getKey = _a3.getKey, _b = _a3.canSelectItem, canSelectItem = _b === void 0 ? function() {
        return true;
      } : _b, items = _a3.items, _c = _a3.selectionMode, selectionMode = _c === void 0 ? SelectionMode.multiple : _c;
      this.mode = selectionMode;
      this._getKey = getKey || defaultGetKey;
      this._changeEventSuppressionCount = 0;
      this._exemptedCount = 0;
      this._anchoredIndex = 0;
      this._unselectableCount = 0;
      this._onSelectionChanged = onSelectionChanged;
      this._onItemsChanged = onItemsChanged;
      this._canSelectItem = canSelectItem;
      this._keyToIndexMap = {};
      this._isModal = false;
      this.setItems(items || [], true);
      this.count = this.getSelectedCount();
    }
    Selection2.prototype.canSelectItem = function(item, index) {
      if (typeof index === "number" && index < 0) {
        return false;
      }
      return this._canSelectItem(item, index);
    };
    Selection2.prototype.getKey = function(item, index) {
      var key = this._getKey(item, index);
      return typeof key === "number" || key ? "".concat(key) : "";
    };
    Selection2.prototype.setChangeEvents = function(isEnabled, suppressChange) {
      this._changeEventSuppressionCount += isEnabled ? -1 : 1;
      if (this._changeEventSuppressionCount === 0 && this._hasChanged) {
        this._hasChanged = false;
        if (!suppressChange) {
          this._change();
        }
      }
    };
    Selection2.prototype.isModal = function() {
      return this._isModal;
    };
    Selection2.prototype.setModal = function(isModal) {
      if (this._isModal !== isModal) {
        this.setChangeEvents(false);
        this._isModal = isModal;
        if (!isModal) {
          this.setAllSelected(false);
        }
        this._change();
        this.setChangeEvents(true);
      }
    };
    Selection2.prototype.setItems = function(items, shouldClear) {
      if (shouldClear === void 0) {
        shouldClear = true;
      }
      var newKeyToIndexMap = {};
      var newUnselectableIndices = {};
      var hasSelectionChanged = false;
      this.setChangeEvents(false);
      this._unselectableCount = 0;
      var haveItemsChanged = false;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item) {
          var key = this.getKey(item, i);
          if (key) {
            if (!haveItemsChanged && (!(key in this._keyToIndexMap) || this._keyToIndexMap[key] !== i)) {
              haveItemsChanged = true;
            }
            newKeyToIndexMap[key] = i;
          }
        }
        newUnselectableIndices[i] = item && !this.canSelectItem(item);
        if (newUnselectableIndices[i]) {
          this._unselectableCount++;
        }
      }
      if (shouldClear || items.length === 0) {
        this._setAllSelected(false, true);
      }
      var newExemptedIndicies = {};
      var newExemptedCount = 0;
      for (var indexProperty in this._exemptedIndices) {
        if (this._exemptedIndices.hasOwnProperty(indexProperty)) {
          var index = Number(indexProperty);
          var item = this._items[index];
          var exemptKey = item ? this.getKey(item, Number(index)) : void 0;
          var newIndex = exemptKey ? newKeyToIndexMap[exemptKey] : index;
          if (newIndex === void 0) {
            hasSelectionChanged = true;
          } else {
            newExemptedIndicies[newIndex] = true;
            newExemptedCount++;
            hasSelectionChanged = hasSelectionChanged || newIndex !== index;
          }
        }
      }
      if (this._items && this._exemptedCount === 0 && items.length !== this._items.length && this._isAllSelected) {
        hasSelectionChanged = true;
      }
      if (!haveItemsChanged) {
        for (var _i = 0, _a3 = Object.keys(this._keyToIndexMap); _i < _a3.length; _i++) {
          var key = _a3[_i];
          if (!(key in newKeyToIndexMap)) {
            haveItemsChanged = true;
            break;
          }
        }
      }
      this._exemptedIndices = newExemptedIndicies;
      this._exemptedCount = newExemptedCount;
      this._keyToIndexMap = newKeyToIndexMap;
      this._unselectableIndices = newUnselectableIndices;
      this._items = items;
      this._selectedItems = null;
      if (hasSelectionChanged) {
        this._updateCount();
      }
      if (haveItemsChanged) {
        EventGroup.raise(this, SELECTION_ITEMS_CHANGE);
        if (this._onItemsChanged) {
          this._onItemsChanged();
        }
      }
      if (hasSelectionChanged) {
        this._change();
      }
      this.setChangeEvents(true);
    };
    Selection2.prototype.getItems = function() {
      return this._items;
    };
    Selection2.prototype.getSelection = function() {
      if (!this._selectedItems) {
        this._selectedItems = [];
        var items = this._items;
        if (items) {
          for (var i = 0; i < items.length; i++) {
            if (this.isIndexSelected(i)) {
              this._selectedItems.push(items[i]);
            }
          }
        }
      }
      return this._selectedItems;
    };
    Selection2.prototype.getSelectedCount = function() {
      return this._isAllSelected ? this._items.length - this._exemptedCount - this._unselectableCount : this._exemptedCount;
    };
    Selection2.prototype.getSelectedIndices = function() {
      if (!this._selectedIndices) {
        this._selectedIndices = [];
        var items = this._items;
        if (items) {
          for (var i = 0; i < items.length; i++) {
            if (this.isIndexSelected(i)) {
              this._selectedIndices.push(i);
            }
          }
        }
      }
      return this._selectedIndices;
    };
    Selection2.prototype.getItemIndex = function(key) {
      var index = this._keyToIndexMap[key];
      return index !== null && index !== void 0 ? index : -1;
    };
    Selection2.prototype.isRangeSelected = function(fromIndex, count) {
      if (count === 0) {
        return false;
      }
      var endIndex = fromIndex + count;
      for (var i = fromIndex; i < endIndex; i++) {
        if (!this.isIndexSelected(i)) {
          return false;
        }
      }
      return true;
    };
    Selection2.prototype.isAllSelected = function() {
      var selectableCount = this._items.length - this._unselectableCount;
      if (this.mode === SelectionMode.single) {
        selectableCount = Math.min(selectableCount, 1);
      }
      return this.count > 0 && this._isAllSelected && this._exemptedCount === 0 || !this._isAllSelected && this._exemptedCount === selectableCount && selectableCount > 0;
    };
    Selection2.prototype.isKeySelected = function(key) {
      var index = this._keyToIndexMap[key];
      return this.isIndexSelected(index);
    };
    Selection2.prototype.isIndexSelected = function(index) {
      return !!(this.count > 0 && this._isAllSelected && !this._exemptedIndices[index] && !this._unselectableIndices[index] || !this._isAllSelected && this._exemptedIndices[index]);
    };
    Selection2.prototype.setAllSelected = function(isAllSelected) {
      if (isAllSelected && this.mode !== SelectionMode.multiple) {
        return;
      }
      var selectableCount = this._items ? this._items.length - this._unselectableCount : 0;
      this.setChangeEvents(false);
      if (selectableCount > 0 && (this._exemptedCount > 0 || isAllSelected !== this._isAllSelected)) {
        this._exemptedIndices = {};
        if (isAllSelected !== this._isAllSelected || this._exemptedCount > 0) {
          this._exemptedCount = 0;
          this._isAllSelected = isAllSelected;
          this._change();
        }
        this._updateCount();
      }
      this.setChangeEvents(true);
    };
    Selection2.prototype.setKeySelected = function(key, isSelected, shouldAnchor) {
      var index = this._keyToIndexMap[key];
      if (index >= 0) {
        this.setIndexSelected(index, isSelected, shouldAnchor);
      }
    };
    Selection2.prototype.setIndexSelected = function(index, isSelected, shouldAnchor) {
      if (this.mode === SelectionMode.none) {
        return;
      }
      index = Math.min(Math.max(0, index), this._items.length - 1);
      if (index < 0 || index >= this._items.length) {
        return;
      }
      this.setChangeEvents(false);
      var isExempt = this._exemptedIndices[index];
      var canSelect = !this._unselectableIndices[index];
      if (canSelect) {
        if (isSelected && this.mode === SelectionMode.single) {
          this._setAllSelected(false, true);
        }
        if (isExempt && (isSelected && this._isAllSelected || !isSelected && !this._isAllSelected)) {
          delete this._exemptedIndices[index];
          this._exemptedCount--;
        }
        if (!isExempt && (isSelected && !this._isAllSelected || !isSelected && this._isAllSelected)) {
          this._exemptedIndices[index] = true;
          this._exemptedCount++;
        }
        if (shouldAnchor) {
          this._anchoredIndex = index;
        }
      }
      this._updateCount();
      this.setChangeEvents(true);
    };
    Selection2.prototype.setRangeSelected = function(fromIndex, count, isSelected, shouldAnchor) {
      if (this.mode === SelectionMode.none) {
        return;
      }
      fromIndex = Math.min(Math.max(0, fromIndex), this._items.length - 1);
      count = Math.min(Math.max(0, count), this._items.length - fromIndex);
      if (fromIndex < 0 || fromIndex >= this._items.length || count === 0) {
        return;
      }
      this.setChangeEvents(false);
      var anchorIndex = this._anchoredIndex || 0;
      var startIndex = fromIndex;
      var endIndex = fromIndex + count - 1;
      var newAnchorIndex = anchorIndex >= endIndex ? startIndex : endIndex;
      for (; startIndex <= endIndex; startIndex++) {
        this.setIndexSelected(startIndex, isSelected, shouldAnchor ? startIndex === newAnchorIndex : false);
      }
      this.setChangeEvents(true);
    };
    Selection2.prototype.selectToKey = function(key, clearSelection) {
      this.selectToIndex(this._keyToIndexMap[key], clearSelection);
    };
    Selection2.prototype.selectToRange = function(fromIndex, count, clearSelection) {
      if (this.mode === SelectionMode.none) {
        return;
      }
      if (this.mode === SelectionMode.single) {
        if (count === 1) {
          this.setIndexSelected(fromIndex, true, true);
        }
        return;
      }
      var anchorIndex = this._anchoredIndex || 0;
      var startIndex = Math.min(fromIndex, anchorIndex);
      var endIndex = Math.max(fromIndex + count - 1, anchorIndex);
      this.setChangeEvents(false);
      if (clearSelection) {
        this._setAllSelected(false, true);
      }
      for (; startIndex <= endIndex; startIndex++) {
        this.setIndexSelected(startIndex, true, false);
      }
      this.setChangeEvents(true);
    };
    Selection2.prototype.selectToIndex = function(index, clearSelection) {
      if (this.mode === SelectionMode.none) {
        return;
      }
      if (this.mode === SelectionMode.single) {
        this.setIndexSelected(index, true, true);
        return;
      }
      var anchorIndex = this._anchoredIndex || 0;
      var startIndex = Math.min(index, anchorIndex);
      var endIndex = Math.max(index, anchorIndex);
      this.setChangeEvents(false);
      if (clearSelection) {
        this._setAllSelected(false, true);
      }
      for (; startIndex <= endIndex; startIndex++) {
        this.setIndexSelected(startIndex, true, false);
      }
      this.setChangeEvents(true);
    };
    Selection2.prototype.toggleAllSelected = function() {
      this.setAllSelected(!this.isAllSelected());
    };
    Selection2.prototype.toggleKeySelected = function(key) {
      this.setKeySelected(key, !this.isKeySelected(key), true);
    };
    Selection2.prototype.toggleIndexSelected = function(index) {
      this.setIndexSelected(index, !this.isIndexSelected(index), true);
    };
    Selection2.prototype.toggleRangeSelected = function(fromIndex, count) {
      if (this.mode === SelectionMode.none) {
        return;
      }
      var isRangeSelected = this.isRangeSelected(fromIndex, count);
      var endIndex = fromIndex + count;
      if (this.mode === SelectionMode.single && count > 1) {
        return;
      }
      this.setChangeEvents(false);
      for (var i = fromIndex; i < endIndex; i++) {
        this.setIndexSelected(i, !isRangeSelected, false);
      }
      this.setChangeEvents(true);
    };
    Selection2.prototype._updateCount = function(preserveModalState) {
      if (preserveModalState === void 0) {
        preserveModalState = false;
      }
      var count = this.getSelectedCount();
      if (count !== this.count) {
        this.count = count;
        this._change();
      }
      if (!this.count && !preserveModalState) {
        this.setModal(false);
      }
    };
    Selection2.prototype._setAllSelected = function(isAllSelected, preserveModalState) {
      if (preserveModalState === void 0) {
        preserveModalState = false;
      }
      if (isAllSelected && this.mode !== SelectionMode.multiple) {
        return;
      }
      var selectableCount = this._items ? this._items.length - this._unselectableCount : 0;
      this.setChangeEvents(false);
      if (selectableCount > 0 && (this._exemptedCount > 0 || isAllSelected !== this._isAllSelected)) {
        this._exemptedIndices = {};
        if (isAllSelected !== this._isAllSelected || this._exemptedCount > 0) {
          this._exemptedCount = 0;
          this._isAllSelected = isAllSelected;
          this._change();
        }
        this._updateCount(preserveModalState);
      }
      this.setChangeEvents(true);
    };
    Selection2.prototype._change = function() {
      if (this._changeEventSuppressionCount === 0) {
        this._selectedItems = null;
        this._selectedIndices = void 0;
        EventGroup.raise(this, SELECTION_CHANGE);
        if (this._onSelectionChanged) {
          this._onSelectionChanged();
        }
      } else {
        this._hasChanged = true;
      }
    };
    return Selection2;
  }()
);
function defaultGetKey(item, index) {
  var _a3 = (item || {}).key, key = _a3 === void 0 ? "".concat(index) : _a3;
  return key;
}

// node_modules/@fluentui/utilities/lib/version.js
setVersion("@fluentui/utilities", "8.13.18");

// node_modules/@fluentui/react/lib/version.js
setVersion("@fluentui/react", "8.110.12");

// node_modules/@fluentui/theme/lib/fonts/FluentFonts.js
var LocalizedFontNames;
(function(LocalizedFontNames2) {
  LocalizedFontNames2.Arabic = "Segoe UI Web (Arabic)";
  LocalizedFontNames2.Cyrillic = "Segoe UI Web (Cyrillic)";
  LocalizedFontNames2.EastEuropean = "Segoe UI Web (East European)";
  LocalizedFontNames2.Greek = "Segoe UI Web (Greek)";
  LocalizedFontNames2.Hebrew = "Segoe UI Web (Hebrew)";
  LocalizedFontNames2.Thai = "Leelawadee UI Web";
  LocalizedFontNames2.Vietnamese = "Segoe UI Web (Vietnamese)";
  LocalizedFontNames2.WestEuropean = "Segoe UI Web (West European)";
  LocalizedFontNames2.Selawik = "Selawik Web";
  LocalizedFontNames2.Armenian = "Segoe UI Web (Armenian)";
  LocalizedFontNames2.Georgian = "Segoe UI Web (Georgian)";
})(LocalizedFontNames || (LocalizedFontNames = {}));
var LocalizedFontFamilies;
(function(LocalizedFontFamilies2) {
  LocalizedFontFamilies2.Arabic = "'".concat(LocalizedFontNames.Arabic, "'");
  LocalizedFontFamilies2.ChineseSimplified = "'Microsoft Yahei UI', Verdana, Simsun";
  LocalizedFontFamilies2.ChineseTraditional = "'Microsoft Jhenghei UI', Pmingliu";
  LocalizedFontFamilies2.Cyrillic = "'".concat(LocalizedFontNames.Cyrillic, "'");
  LocalizedFontFamilies2.EastEuropean = "'".concat(LocalizedFontNames.EastEuropean, "'");
  LocalizedFontFamilies2.Greek = "'".concat(LocalizedFontNames.Greek, "'");
  LocalizedFontFamilies2.Hebrew = "'".concat(LocalizedFontNames.Hebrew, "'");
  LocalizedFontFamilies2.Hindi = "'Nirmala UI'";
  LocalizedFontFamilies2.Japanese = "'Yu Gothic UI', 'Meiryo UI', Meiryo, 'MS Pgothic', Osaka";
  LocalizedFontFamilies2.Korean = "'Malgun Gothic', Gulim";
  LocalizedFontFamilies2.Selawik = "'".concat(LocalizedFontNames.Selawik, "'");
  LocalizedFontFamilies2.Thai = "'Leelawadee UI Web', 'Kmer UI'";
  LocalizedFontFamilies2.Vietnamese = "'".concat(LocalizedFontNames.Vietnamese, "'");
  LocalizedFontFamilies2.WestEuropean = "'".concat(LocalizedFontNames.WestEuropean, "'");
  LocalizedFontFamilies2.Armenian = "'".concat(LocalizedFontNames.Armenian, "'");
  LocalizedFontFamilies2.Georgian = "'".concat(LocalizedFontNames.Georgian, "'");
})(LocalizedFontFamilies || (LocalizedFontFamilies = {}));
var FontSizes;
(function(FontSizes2) {
  FontSizes2.size10 = "10px";
  FontSizes2.size12 = "12px";
  FontSizes2.size14 = "14px";
  FontSizes2.size16 = "16px";
  FontSizes2.size18 = "18px";
  FontSizes2.size20 = "20px";
  FontSizes2.size24 = "24px";
  FontSizes2.size28 = "28px";
  FontSizes2.size32 = "32px";
  FontSizes2.size42 = "42px";
  FontSizes2.size68 = "68px";
  FontSizes2.mini = "10px";
  FontSizes2.xSmall = "10px";
  FontSizes2.small = "12px";
  FontSizes2.smallPlus = "12px";
  FontSizes2.medium = "14px";
  FontSizes2.mediumPlus = "16px";
  FontSizes2.icon = "16px";
  FontSizes2.large = "18px";
  FontSizes2.xLarge = "20px";
  FontSizes2.xLargePlus = "24px";
  FontSizes2.xxLarge = "28px";
  FontSizes2.xxLargePlus = "32px";
  FontSizes2.superLarge = "42px";
  FontSizes2.mega = "68px";
})(FontSizes || (FontSizes = {}));
var FontWeights;
(function(FontWeights2) {
  FontWeights2.light = 100;
  FontWeights2.semilight = 300;
  FontWeights2.regular = 400;
  FontWeights2.semibold = 600;
  FontWeights2.bold = 700;
})(FontWeights || (FontWeights = {}));
var IconFontSizes;
(function(IconFontSizes2) {
  IconFontSizes2.xSmall = "10px";
  IconFontSizes2.small = "12px";
  IconFontSizes2.medium = "16px";
  IconFontSizes2.large = "20px";
})(IconFontSizes || (IconFontSizes = {}));

// node_modules/@fluentui/theme/lib/utilities/makeSemanticColors.js
function makeSemanticColors(p, e, s, isInverted, depComments) {
  if (depComments === void 0) {
    depComments = false;
  }
  var semanticColors = __assign({
    primaryButtonBorder: "transparent",
    errorText: !isInverted ? "#a4262c" : "#F1707B",
    messageText: !isInverted ? "#323130" : "#F3F2F1",
    messageLink: !isInverted ? "#005A9E" : "#6CB8F6",
    messageLinkHovered: !isInverted ? "#004578" : "#82C7FF",
    infoIcon: !isInverted ? "#605e5c" : "#C8C6C4",
    errorIcon: !isInverted ? "#A80000" : "#F1707B",
    blockingIcon: !isInverted ? "#FDE7E9" : "#442726",
    warningIcon: !isInverted ? "#797775" : "#C8C6C4",
    severeWarningIcon: !isInverted ? "#D83B01" : "#FCE100",
    successIcon: !isInverted ? "#107C10" : "#92C353",
    infoBackground: !isInverted ? "#f3f2f1" : "#323130",
    errorBackground: !isInverted ? "#FDE7E9" : "#442726",
    blockingBackground: !isInverted ? "#FDE7E9" : "#442726",
    warningBackground: !isInverted ? "#FFF4CE" : "#433519",
    severeWarningBackground: !isInverted ? "#FED9CC" : "#4F2A0F",
    successBackground: !isInverted ? "#DFF6DD" : "#393D1B",
    // deprecated
    warningHighlight: !isInverted ? "#ffb900" : "#fff100",
    successText: !isInverted ? "#107C10" : "#92c353"
  }, s);
  var fullSemanticColors = getSemanticColors(p, e, semanticColors, isInverted);
  return _fixDeprecatedSlots(fullSemanticColors, depComments);
}
function getSemanticColors(p, e, s, isInverted, depComments) {
  if (depComments === void 0) {
    depComments = false;
  }
  var result = {};
  var _a3 = p || {}, white = _a3.white, black = _a3.black, themePrimary = _a3.themePrimary, themeDark = _a3.themeDark, themeDarker = _a3.themeDarker, themeDarkAlt = _a3.themeDarkAlt, themeLighter = _a3.themeLighter, neutralLight = _a3.neutralLight, neutralLighter = _a3.neutralLighter, neutralDark = _a3.neutralDark, neutralQuaternary = _a3.neutralQuaternary, neutralQuaternaryAlt = _a3.neutralQuaternaryAlt, neutralPrimary = _a3.neutralPrimary, neutralSecondary = _a3.neutralSecondary, neutralSecondaryAlt = _a3.neutralSecondaryAlt, neutralTertiary = _a3.neutralTertiary, neutralTertiaryAlt = _a3.neutralTertiaryAlt, neutralLighterAlt = _a3.neutralLighterAlt, accent = _a3.accent;
  if (white) {
    result.bodyBackground = white;
    result.bodyFrameBackground = white;
    result.accentButtonText = white;
    result.buttonBackground = white;
    result.primaryButtonText = white;
    result.primaryButtonTextHovered = white;
    result.primaryButtonTextPressed = white;
    result.inputBackground = white;
    result.inputForegroundChecked = white;
    result.listBackground = white;
    result.menuBackground = white;
    result.cardStandoutBackground = white;
  }
  if (black) {
    result.bodyTextChecked = black;
    result.buttonTextCheckedHovered = black;
  }
  if (themePrimary) {
    result.link = themePrimary;
    result.primaryButtonBackground = themePrimary;
    result.inputBackgroundChecked = themePrimary;
    result.inputIcon = themePrimary;
    result.inputFocusBorderAlt = themePrimary;
    result.menuIcon = themePrimary;
    result.menuHeader = themePrimary;
    result.accentButtonBackground = themePrimary;
  }
  if (themeDark) {
    result.primaryButtonBackgroundPressed = themeDark;
    result.inputBackgroundCheckedHovered = themeDark;
    result.inputIconHovered = themeDark;
  }
  if (themeDarker) {
    result.linkHovered = themeDarker;
  }
  if (themeDarkAlt) {
    result.primaryButtonBackgroundHovered = themeDarkAlt;
  }
  if (themeLighter) {
    result.inputPlaceholderBackgroundChecked = themeLighter;
  }
  if (neutralLight) {
    result.bodyBackgroundChecked = neutralLight;
    result.bodyFrameDivider = neutralLight;
    result.bodyDivider = neutralLight;
    result.variantBorder = neutralLight;
    result.buttonBackgroundCheckedHovered = neutralLight;
    result.buttonBackgroundPressed = neutralLight;
    result.listItemBackgroundChecked = neutralLight;
    result.listHeaderBackgroundPressed = neutralLight;
    result.menuItemBackgroundPressed = neutralLight;
    result.menuItemBackgroundChecked = neutralLight;
  }
  if (neutralLighter) {
    result.bodyBackgroundHovered = neutralLighter;
    result.buttonBackgroundHovered = neutralLighter;
    result.buttonBackgroundDisabled = neutralLighter;
    result.buttonBorderDisabled = neutralLighter;
    result.primaryButtonBackgroundDisabled = neutralLighter;
    result.disabledBackground = neutralLighter;
    result.listItemBackgroundHovered = neutralLighter;
    result.listHeaderBackgroundHovered = neutralLighter;
    result.menuItemBackgroundHovered = neutralLighter;
  }
  if (neutralQuaternary) {
    result.primaryButtonTextDisabled = neutralQuaternary;
    result.disabledSubtext = neutralQuaternary;
  }
  if (neutralQuaternaryAlt) {
    result.listItemBackgroundCheckedHovered = neutralQuaternaryAlt;
  }
  if (neutralTertiary) {
    result.disabledBodyText = neutralTertiary;
    result.variantBorderHovered = (s === null || s === void 0 ? void 0 : s.variantBorderHovered) || neutralTertiary;
    result.buttonTextDisabled = neutralTertiary;
    result.inputIconDisabled = neutralTertiary;
    result.disabledText = neutralTertiary;
  }
  if (neutralPrimary) {
    result.bodyText = neutralPrimary;
    result.actionLink = neutralPrimary;
    result.buttonText = neutralPrimary;
    result.inputBorderHovered = neutralPrimary;
    result.inputText = neutralPrimary;
    result.listText = neutralPrimary;
    result.menuItemText = neutralPrimary;
  }
  if (neutralLighterAlt) {
    result.bodyStandoutBackground = neutralLighterAlt;
    result.defaultStateBackground = neutralLighterAlt;
  }
  if (neutralDark) {
    result.actionLinkHovered = neutralDark;
    result.buttonTextHovered = neutralDark;
    result.buttonTextChecked = neutralDark;
    result.buttonTextPressed = neutralDark;
    result.inputTextHovered = neutralDark;
    result.menuItemTextHovered = neutralDark;
  }
  if (neutralSecondary) {
    result.bodySubtext = neutralSecondary;
    result.focusBorder = neutralSecondary;
    result.inputBorder = neutralSecondary;
    result.smallInputBorder = neutralSecondary;
    result.inputPlaceholderText = neutralSecondary;
  }
  if (neutralSecondaryAlt) {
    result.buttonBorder = neutralSecondaryAlt;
  }
  if (neutralTertiaryAlt) {
    result.disabledBodySubtext = neutralTertiaryAlt;
    result.disabledBorder = neutralTertiaryAlt;
    result.buttonBackgroundChecked = neutralTertiaryAlt;
    result.menuDivider = neutralTertiaryAlt;
  }
  if (accent) {
    result.accentButtonBackground = accent;
  }
  if (e === null || e === void 0 ? void 0 : e.elevation4) {
    result.cardShadow = e.elevation4;
  }
  if (!isInverted && (e === null || e === void 0 ? void 0 : e.elevation8)) {
    result.cardShadowHovered = e.elevation8;
  } else if (result.variantBorderHovered) {
    result.cardShadowHovered = "0 0 1px " + result.variantBorderHovered;
  }
  result = __assign(__assign({}, result), s);
  return result;
}
function _fixDeprecatedSlots(s, depComments) {
  var dep = "";
  if (depComments === true) {
    dep = " /* @deprecated */";
  }
  s.listTextColor = s.listText + dep;
  s.menuItemBackgroundChecked += dep;
  s.warningHighlight += dep;
  s.warningText = s.messageText + dep;
  s.successText += dep;
  return s;
}

// node_modules/@fluentui/theme/lib/mergeThemes.js
function mergeThemes(theme, partialTheme) {
  var _a3, _b, _c;
  if (partialTheme === void 0) {
    partialTheme = {};
  }
  var mergedTheme = merge({}, theme, partialTheme, {
    semanticColors: getSemanticColors(partialTheme.palette, partialTheme.effects, partialTheme.semanticColors, partialTheme.isInverted === void 0 ? theme.isInverted : partialTheme.isInverted)
  });
  if (((_a3 = partialTheme.palette) === null || _a3 === void 0 ? void 0 : _a3.themePrimary) && !((_b = partialTheme.palette) === null || _b === void 0 ? void 0 : _b.accent)) {
    mergedTheme.palette.accent = partialTheme.palette.themePrimary;
  }
  if (partialTheme.defaultFontStyle) {
    for (var _i = 0, _d = Object.keys(mergedTheme.fonts); _i < _d.length; _i++) {
      var fontStyle = _d[_i];
      mergedTheme.fonts[fontStyle] = merge(mergedTheme.fonts[fontStyle], partialTheme.defaultFontStyle, (_c = partialTheme === null || partialTheme === void 0 ? void 0 : partialTheme.fonts) === null || _c === void 0 ? void 0 : _c[fontStyle]);
    }
  }
  return mergedTheme;
}

// node_modules/@fluentui/theme/lib/colors/FluentColors.js
var CommunicationColors;
(function(CommunicationColors2) {
  CommunicationColors2.shade30 = "#004578";
  CommunicationColors2.shade20 = "#005a9e";
  CommunicationColors2.shade10 = "#106ebe";
  CommunicationColors2.primary = "#0078d4";
  CommunicationColors2.tint10 = "#2b88d8";
  CommunicationColors2.tint20 = "#c7e0f4";
  CommunicationColors2.tint30 = "#deecf9";
  CommunicationColors2.tint40 = "#eff6fc";
})(CommunicationColors || (CommunicationColors = {}));
var NeutralColors;
(function(NeutralColors2) {
  NeutralColors2.black = "#000000";
  NeutralColors2.gray220 = "#11100f";
  NeutralColors2.gray210 = "#161514";
  NeutralColors2.gray200 = "#1b1a19";
  NeutralColors2.gray190 = "#201f1e";
  NeutralColors2.gray180 = "#252423";
  NeutralColors2.gray170 = "#292827";
  NeutralColors2.gray160 = "#323130";
  NeutralColors2.gray150 = "#3b3a39";
  NeutralColors2.gray140 = "#484644";
  NeutralColors2.gray130 = "#605e5c";
  NeutralColors2.gray120 = "#797775";
  NeutralColors2.gray110 = "#8a8886";
  NeutralColors2.gray100 = "#979593";
  NeutralColors2.gray90 = "#a19f9d";
  NeutralColors2.gray80 = "#b3b0ad";
  NeutralColors2.gray70 = "#bebbb8";
  NeutralColors2.gray60 = "#c8c6c4";
  NeutralColors2.gray50 = "#d2d0ce";
  NeutralColors2.gray40 = "#e1dfdd";
  NeutralColors2.gray30 = "#edebe9";
  NeutralColors2.gray20 = "#f3f2f1";
  NeutralColors2.gray10 = "#faf9f8";
  NeutralColors2.white = "#ffffff";
})(NeutralColors || (NeutralColors = {}));
var SharedColors;
(function(SharedColors2) {
  SharedColors2.pinkRed10 = "#750b1c";
  SharedColors2.red20 = "#a4262c";
  SharedColors2.red10 = "#d13438";
  SharedColors2.redOrange20 = "#603d30";
  SharedColors2.redOrange10 = "#da3b01";
  SharedColors2.orange30 = "#8e562e";
  SharedColors2.orange20 = "#ca5010";
  SharedColors2.orange10 = "#ffaa44";
  SharedColors2.yellow10 = "#fce100";
  SharedColors2.orangeYellow20 = "#986f0b";
  SharedColors2.orangeYellow10 = "#c19c00";
  SharedColors2.yellowGreen10 = "#8cbd18";
  SharedColors2.green20 = "#0b6a0b";
  SharedColors2.green10 = "#498205";
  SharedColors2.greenCyan10 = "#00ad56";
  SharedColors2.cyan40 = "#005e50";
  SharedColors2.cyan30 = "#005b70";
  SharedColors2.cyan20 = "#038387";
  SharedColors2.cyan10 = "#00b7c3";
  SharedColors2.cyanBlue20 = "#004e8c";
  SharedColors2.cyanBlue10 = "#0078d4";
  SharedColors2.blue10 = "#4f6bed";
  SharedColors2.blueMagenta40 = "#373277";
  SharedColors2.blueMagenta30 = "#5c2e91";
  SharedColors2.blueMagenta20 = "#8764b8";
  SharedColors2.blueMagenta10 = "#8378de";
  SharedColors2.magenta20 = "#881798";
  SharedColors2.magenta10 = "#c239b3";
  SharedColors2.magentaPink20 = "#9b0062";
  SharedColors2.magentaPink10 = "#e3008c";
  SharedColors2.gray40 = "#393939";
  SharedColors2.gray30 = "#7a7574";
  SharedColors2.gray20 = "#69797e";
  SharedColors2.gray10 = "#a0aeb2";
})(SharedColors || (SharedColors = {}));

// node_modules/@fluentui/theme/lib/colors/DefaultPalette.js
var DefaultPalette = {
  themeDarker: "#004578",
  themeDark: "#005a9e",
  themeDarkAlt: "#106ebe",
  themePrimary: "#0078d4",
  themeSecondary: "#2b88d8",
  themeTertiary: "#71afe5",
  themeLight: "#c7e0f4",
  themeLighter: "#deecf9",
  themeLighterAlt: "#eff6fc",
  black: "#000000",
  blackTranslucent40: "rgba(0,0,0,.4)",
  neutralDark: "#201f1e",
  neutralPrimary: "#323130",
  neutralPrimaryAlt: "#3b3a39",
  neutralSecondary: "#605e5c",
  neutralSecondaryAlt: "#8a8886",
  neutralTertiary: "#a19f9d",
  neutralTertiaryAlt: "#c8c6c4",
  neutralQuaternary: "#d2d0ce",
  neutralQuaternaryAlt: "#e1dfdd",
  neutralLight: "#edebe9",
  neutralLighter: "#f3f2f1",
  neutralLighterAlt: "#faf9f8",
  accent: "#0078d4",
  white: "#ffffff",
  whiteTranslucent40: "rgba(255,255,255,.4)",
  yellowDark: "#d29200",
  yellow: "#ffb900",
  yellowLight: "#fff100",
  orange: "#d83b01",
  orangeLight: "#ea4300",
  orangeLighter: "#ff8c00",
  redDark: "#a4262c",
  red: "#e81123",
  magentaDark: "#5c005c",
  magenta: "#b4009e",
  magentaLight: "#e3008c",
  purpleDark: "#32145a",
  purple: "#5c2d91",
  purpleLight: "#b4a0ff",
  blueDark: "#002050",
  blueMid: "#00188f",
  blue: "#0078d4",
  blueLight: "#00bcf2",
  tealDark: "#004b50",
  teal: "#008272",
  tealLight: "#00b294",
  greenDark: "#004b1c",
  green: "#107c10",
  greenLight: "#bad80a"
};

// node_modules/@fluentui/theme/lib/effects/FluentDepths.js
var Depths;
(function(Depths2) {
  Depths2.depth0 = "0 0 0 0 transparent";
  Depths2.depth4 = "0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)";
  Depths2.depth8 = "0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132), 0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108)";
  Depths2.depth16 = "0 6.4px 14.4px 0 rgba(0, 0, 0, 0.132), 0 1.2px 3.6px 0 rgba(0, 0, 0, 0.108)";
  Depths2.depth64 = "0 25.6px 57.6px 0 rgba(0, 0, 0, 0.22), 0 4.8px 14.4px 0 rgba(0, 0, 0, 0.18)";
})(Depths || (Depths = {}));

// node_modules/@fluentui/theme/lib/effects/DefaultEffects.js
var DefaultEffects = {
  elevation4: Depths.depth4,
  elevation8: Depths.depth8,
  elevation16: Depths.depth16,
  elevation64: Depths.depth64,
  roundedCorner2: "2px",
  roundedCorner4: "4px",
  roundedCorner6: "6px"
};

// node_modules/@fluentui/theme/lib/spacing/DefaultSpacing.js
var DefaultSpacing = {
  s2: "4px",
  s1: "8px",
  m: "16px",
  l1: "20px",
  l2: "32px"
};

// node_modules/@fluentui/theme/lib/motion/FluentMotion.js
var fadeInAnimationName = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
});
var fadeOutAnimationName = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 }
});
var scaleDownInAnimationName = keyframes({
  from: { transform: "scale3d(1.15, 1.15, 1)" },
  to: { transform: "scale3d(1, 1, 1)" }
});
var scaleDownOutAnimationName = keyframes({
  from: { transform: "scale3d(1, 1, 1)" },
  to: { transform: "scale3d(0.9, 0.9, 1)" }
});
var slideLeftOutAnimationName = keyframes({
  from: { transform: "translate3d(0, 0, 0)" },
  to: { transform: "translate3d(-48px, 0, 0)" }
});
var slideRightOutAnimationName = keyframes({
  from: { transform: "translate3d(0, 0, 0)" },
  to: { transform: "translate3d(48px, 0, 0)" }
});
var slideLeftInAnimationName = keyframes({
  from: { transform: "translate3d(48px, 0, 0)" },
  to: { transform: "translate3d(0, 0, 0)" }
});
var slideRightInAnimationName = keyframes({
  from: { transform: "translate3d(-48px, 0, 0)" },
  to: { transform: "translate3d(0, 0, 0)" }
});
var slideUpOutAnimationName = keyframes({
  from: { transform: "translate3d(0, 0, 0)" },
  to: { transform: "translate3d(0, -48px, 0)" }
});
var slideDownOutAnimationName = keyframes({
  from: { transform: "translate3d(0, 0, 0)" },
  to: { transform: "translate3d(0, 48px, 0)" }
});
var slideUpInAnimationName = keyframes({
  from: { transform: "translate3d(0, 48px, 0)" },
  to: { transform: "translate3d(0, 0, 0)" }
});
var slideDownInAnimationName = keyframes({
  from: { transform: "translate3d(0, -48px, 0)" },
  to: { transform: "translate3d(0, 0, 0)" }
});
var MotionDurations;
(function(MotionDurations2) {
  MotionDurations2.duration1 = "100ms";
  MotionDurations2.duration2 = "200ms";
  MotionDurations2.duration3 = "300ms";
  MotionDurations2.duration4 = "400ms";
})(MotionDurations || (MotionDurations = {}));
var MotionTimings;
(function(MotionTimings2) {
  MotionTimings2.accelerate = "cubic-bezier(0.9, 0.1, 1, 0.2)";
  MotionTimings2.decelerate = "cubic-bezier(0.1, 0.9, 0.2, 1)";
  MotionTimings2.linear = "cubic-bezier(0, 0, 1, 1)";
  MotionTimings2.standard = "cubic-bezier(0.8, 0, 0.2, 1)";
})(MotionTimings || (MotionTimings = {}));
function _createAnimation(animationName, animationDuration, animationTimingFunction) {
  return "".concat(animationName, " ").concat(animationDuration, " ").concat(animationTimingFunction);
}
var MotionAnimations;
(function(MotionAnimations2) {
  MotionAnimations2.fadeIn = _createAnimation(fadeInAnimationName, MotionDurations.duration1, MotionTimings.linear);
  MotionAnimations2.fadeOut = _createAnimation(fadeOutAnimationName, MotionDurations.duration1, MotionTimings.linear);
  MotionAnimations2.scaleDownIn = _createAnimation(scaleDownInAnimationName, MotionDurations.duration3, MotionTimings.decelerate);
  MotionAnimations2.scaleDownOut = _createAnimation(scaleDownOutAnimationName, MotionDurations.duration3, MotionTimings.decelerate);
  MotionAnimations2.slideLeftOut = _createAnimation(slideLeftOutAnimationName, MotionDurations.duration1, MotionTimings.accelerate);
  MotionAnimations2.slideRightOut = _createAnimation(slideRightOutAnimationName, MotionDurations.duration1, MotionTimings.accelerate);
  MotionAnimations2.slideLeftIn = _createAnimation(slideLeftInAnimationName, MotionDurations.duration1, MotionTimings.decelerate);
  MotionAnimations2.slideRightIn = _createAnimation(slideRightInAnimationName, MotionDurations.duration1, MotionTimings.decelerate);
  MotionAnimations2.slideUpOut = _createAnimation(slideUpOutAnimationName, MotionDurations.duration1, MotionTimings.accelerate);
  MotionAnimations2.slideDownOut = _createAnimation(slideDownOutAnimationName, MotionDurations.duration1, MotionTimings.accelerate);
  MotionAnimations2.slideUpIn = _createAnimation(slideUpInAnimationName, MotionDurations.duration1, MotionTimings.decelerate);
  MotionAnimations2.slideDownIn = _createAnimation(slideDownInAnimationName, MotionDurations.duration1, MotionTimings.decelerate);
})(MotionAnimations || (MotionAnimations = {}));

// node_modules/@fluentui/theme/lib/motion/AnimationStyles.js
var EASING_FUNCTION_1 = "cubic-bezier(.1,.9,.2,1)";
var EASING_FUNCTION_2 = "cubic-bezier(.1,.25,.75,.9)";
var DURATION_1 = "0.167s";
var DURATION_2 = "0.267s";
var DURATION_3 = "0.367s";
var DURATION_4 = "0.467s";
var FADE_IN = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
});
var FADE_OUT = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0, visibility: "hidden" }
});
var SLIDE_RIGHT_IN10 = _createSlideInX(-10);
var SLIDE_RIGHT_IN20 = _createSlideInX(-20);
var SLIDE_RIGHT_IN40 = _createSlideInX(-40);
var SLIDE_RIGHT_IN400 = _createSlideInX(-400);
var SLIDE_LEFT_IN10 = _createSlideInX(10);
var SLIDE_LEFT_IN20 = _createSlideInX(20);
var SLIDE_LEFT_IN40 = _createSlideInX(40);
var SLIDE_LEFT_IN400 = _createSlideInX(400);
var SLIDE_UP_IN10 = _createSlideInY(10);
var SLIDE_UP_IN20 = _createSlideInY(20);
var SLIDE_DOWN_IN10 = _createSlideInY(-10);
var SLIDE_DOWN_IN20 = _createSlideInY(-20);
var SLIDE_RIGHT_OUT10 = _createSlideOutX(10);
var SLIDE_RIGHT_OUT20 = _createSlideOutX(20);
var SLIDE_RIGHT_OUT40 = _createSlideOutX(40);
var SLIDE_RIGHT_OUT400 = _createSlideOutX(400);
var SLIDE_LEFT_OUT10 = _createSlideOutX(-10);
var SLIDE_LEFT_OUT20 = _createSlideOutX(-20);
var SLIDE_LEFT_OUT40 = _createSlideOutX(-40);
var SLIDE_LEFT_OUT400 = _createSlideOutX(-400);
var SLIDE_UP_OUT10 = _createSlideOutY(-10);
var SLIDE_UP_OUT20 = _createSlideOutY(-20);
var SLIDE_DOWN_OUT10 = _createSlideOutY(10);
var SLIDE_DOWN_OUT20 = _createSlideOutY(20);
var SCALE_UP100 = keyframes({
  from: { transform: "scale3d(.98,.98,1)" },
  to: { transform: "scale3d(1,1,1)" }
});
var SCALE_DOWN98 = keyframes({
  from: { transform: "scale3d(1,1,1)" },
  to: { transform: "scale3d(.98,.98,1)" }
});
var SCALE_DOWN100 = keyframes({
  from: { transform: "scale3d(1.03,1.03,1)" },
  to: { transform: "scale3d(1,1,1)" }
});
var SCALE_UP103 = keyframes({
  from: { transform: "scale3d(1,1,1)" },
  to: { transform: "scale3d(1.03,1.03,1)" }
});
var ROTATE90 = keyframes({
  from: { transform: "rotateZ(0deg)" },
  to: { transform: "rotateZ(90deg)" }
});
var ROTATE_N90 = keyframes({
  from: { transform: "rotateZ(0deg)" },
  to: { transform: "rotateZ(-90deg)" }
});
var AnimationStyles = {
  slideRightIn10: _createAnimation2("".concat(FADE_IN, ",").concat(SLIDE_RIGHT_IN10), DURATION_3, EASING_FUNCTION_1),
  slideRightIn20: _createAnimation2("".concat(FADE_IN, ",").concat(SLIDE_RIGHT_IN20), DURATION_3, EASING_FUNCTION_1),
  slideRightIn40: _createAnimation2("".concat(FADE_IN, ",").concat(SLIDE_RIGHT_IN40), DURATION_3, EASING_FUNCTION_1),
  slideRightIn400: _createAnimation2("".concat(FADE_IN, ",").concat(SLIDE_RIGHT_IN400), DURATION_3, EASING_FUNCTION_1),
  slideLeftIn10: _createAnimation2("".concat(FADE_IN, ",").concat(SLIDE_LEFT_IN10), DURATION_3, EASING_FUNCTION_1),
  slideLeftIn20: _createAnimation2("".concat(FADE_IN, ",").concat(SLIDE_LEFT_IN20), DURATION_3, EASING_FUNCTION_1),
  slideLeftIn40: _createAnimation2("".concat(FADE_IN, ",").concat(SLIDE_LEFT_IN40), DURATION_3, EASING_FUNCTION_1),
  slideLeftIn400: _createAnimation2("".concat(FADE_IN, ",").concat(SLIDE_LEFT_IN400), DURATION_3, EASING_FUNCTION_1),
  slideUpIn10: _createAnimation2("".concat(FADE_IN, ",").concat(SLIDE_UP_IN10), DURATION_3, EASING_FUNCTION_1),
  slideUpIn20: _createAnimation2("".concat(FADE_IN, ",").concat(SLIDE_UP_IN20), DURATION_3, EASING_FUNCTION_1),
  slideDownIn10: _createAnimation2("".concat(FADE_IN, ",").concat(SLIDE_DOWN_IN10), DURATION_3, EASING_FUNCTION_1),
  slideDownIn20: _createAnimation2("".concat(FADE_IN, ",").concat(SLIDE_DOWN_IN20), DURATION_3, EASING_FUNCTION_1),
  slideRightOut10: _createAnimation2("".concat(FADE_OUT, ",").concat(SLIDE_RIGHT_OUT10), DURATION_3, EASING_FUNCTION_1),
  slideRightOut20: _createAnimation2("".concat(FADE_OUT, ",").concat(SLIDE_RIGHT_OUT20), DURATION_3, EASING_FUNCTION_1),
  slideRightOut40: _createAnimation2("".concat(FADE_OUT, ",").concat(SLIDE_RIGHT_OUT40), DURATION_3, EASING_FUNCTION_1),
  slideRightOut400: _createAnimation2("".concat(FADE_OUT, ",").concat(SLIDE_RIGHT_OUT400), DURATION_3, EASING_FUNCTION_1),
  slideLeftOut10: _createAnimation2("".concat(FADE_OUT, ",").concat(SLIDE_LEFT_OUT10), DURATION_3, EASING_FUNCTION_1),
  slideLeftOut20: _createAnimation2("".concat(FADE_OUT, ",").concat(SLIDE_LEFT_OUT20), DURATION_3, EASING_FUNCTION_1),
  slideLeftOut40: _createAnimation2("".concat(FADE_OUT, ",").concat(SLIDE_LEFT_OUT40), DURATION_3, EASING_FUNCTION_1),
  slideLeftOut400: _createAnimation2("".concat(FADE_OUT, ",").concat(SLIDE_LEFT_OUT400), DURATION_3, EASING_FUNCTION_1),
  slideUpOut10: _createAnimation2("".concat(FADE_OUT, ",").concat(SLIDE_UP_OUT10), DURATION_3, EASING_FUNCTION_1),
  slideUpOut20: _createAnimation2("".concat(FADE_OUT, ",").concat(SLIDE_UP_OUT20), DURATION_3, EASING_FUNCTION_1),
  slideDownOut10: _createAnimation2("".concat(FADE_OUT, ",").concat(SLIDE_DOWN_OUT10), DURATION_3, EASING_FUNCTION_1),
  slideDownOut20: _createAnimation2("".concat(FADE_OUT, ",").concat(SLIDE_DOWN_OUT20), DURATION_3, EASING_FUNCTION_1),
  scaleUpIn100: _createAnimation2("".concat(FADE_IN, ",").concat(SCALE_UP100), DURATION_3, EASING_FUNCTION_1),
  scaleDownIn100: _createAnimation2("".concat(FADE_IN, ",").concat(SCALE_DOWN100), DURATION_3, EASING_FUNCTION_1),
  scaleUpOut103: _createAnimation2("".concat(FADE_OUT, ",").concat(SCALE_UP103), DURATION_1, EASING_FUNCTION_2),
  scaleDownOut98: _createAnimation2("".concat(FADE_OUT, ",").concat(SCALE_DOWN98), DURATION_1, EASING_FUNCTION_2),
  fadeIn100: _createAnimation2(FADE_IN, DURATION_1, EASING_FUNCTION_2),
  fadeIn200: _createAnimation2(FADE_IN, DURATION_2, EASING_FUNCTION_2),
  fadeIn400: _createAnimation2(FADE_IN, DURATION_3, EASING_FUNCTION_2),
  fadeIn500: _createAnimation2(FADE_IN, DURATION_4, EASING_FUNCTION_2),
  fadeOut100: _createAnimation2(FADE_OUT, DURATION_1, EASING_FUNCTION_2),
  fadeOut200: _createAnimation2(FADE_OUT, DURATION_2, EASING_FUNCTION_2),
  fadeOut400: _createAnimation2(FADE_OUT, DURATION_3, EASING_FUNCTION_2),
  fadeOut500: _createAnimation2(FADE_OUT, DURATION_4, EASING_FUNCTION_2),
  rotate90deg: _createAnimation2(ROTATE90, "0.1s", EASING_FUNCTION_2),
  rotateN90deg: _createAnimation2(ROTATE_N90, "0.1s", EASING_FUNCTION_2)
  // expandCollapse 100/200/400, delay 100/200
};
function _createAnimation2(animationName, animationDuration, animationTimingFunction) {
  return {
    animationName,
    animationDuration,
    animationTimingFunction,
    animationFillMode: "both"
  };
}
function _createSlideInX(fromX) {
  return keyframes({
    from: { transform: "translate3d(".concat(fromX, "px,0,0)"), pointerEvents: "none" },
    to: { transform: "translate3d(0,0,0)", pointerEvents: "auto" }
  });
}
function _createSlideInY(fromY) {
  return keyframes({
    from: { transform: "translate3d(0,".concat(fromY, "px,0)"), pointerEvents: "none" },
    to: { transform: "translate3d(0,0,0)", pointerEvents: "auto" }
  });
}
function _createSlideOutX(toX) {
  return keyframes({
    from: { transform: "translate3d(0,0,0)" },
    to: { transform: "translate3d(".concat(toX, "px,0,0)") }
  });
}
function _createSlideOutY(toY) {
  return keyframes({
    from: { transform: "translate3d(0,0,0)" },
    to: { transform: "translate3d(0,".concat(toY, "px,0)") }
  });
}

// node_modules/@fluentui/theme/lib/fonts/createFontStyles.js
var FontFamilyFallbacks = "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif";
var defaultFontFamily = "'Segoe UI', '".concat(LocalizedFontNames.WestEuropean, "'");
var LanguageToFontMap = {
  ar: LocalizedFontFamilies.Arabic,
  bg: LocalizedFontFamilies.Cyrillic,
  cs: LocalizedFontFamilies.EastEuropean,
  el: LocalizedFontFamilies.Greek,
  et: LocalizedFontFamilies.EastEuropean,
  he: LocalizedFontFamilies.Hebrew,
  hi: LocalizedFontFamilies.Hindi,
  hr: LocalizedFontFamilies.EastEuropean,
  hu: LocalizedFontFamilies.EastEuropean,
  ja: LocalizedFontFamilies.Japanese,
  kk: LocalizedFontFamilies.EastEuropean,
  ko: LocalizedFontFamilies.Korean,
  lt: LocalizedFontFamilies.EastEuropean,
  lv: LocalizedFontFamilies.EastEuropean,
  pl: LocalizedFontFamilies.EastEuropean,
  ru: LocalizedFontFamilies.Cyrillic,
  sk: LocalizedFontFamilies.EastEuropean,
  "sr-latn": LocalizedFontFamilies.EastEuropean,
  th: LocalizedFontFamilies.Thai,
  tr: LocalizedFontFamilies.EastEuropean,
  uk: LocalizedFontFamilies.Cyrillic,
  vi: LocalizedFontFamilies.Vietnamese,
  "zh-hans": LocalizedFontFamilies.ChineseSimplified,
  "zh-hant": LocalizedFontFamilies.ChineseTraditional,
  hy: LocalizedFontFamilies.Armenian,
  ka: LocalizedFontFamilies.Georgian
};
function _fontFamilyWithFallbacks(fontFamily) {
  return "".concat(fontFamily, ", ").concat(FontFamilyFallbacks);
}
function _getLocalizedFontFamily(language) {
  for (var lang in LanguageToFontMap) {
    if (LanguageToFontMap.hasOwnProperty(lang) && language && lang.indexOf(language) === 0) {
      return LanguageToFontMap[lang];
    }
  }
  return defaultFontFamily;
}
function _createFont(size, weight, fontFamily) {
  return {
    fontFamily,
    MozOsxFontSmoothing: "grayscale",
    WebkitFontSmoothing: "antialiased",
    fontSize: size,
    fontWeight: weight
  };
}
function createFontStyles(localeCode) {
  var localizedFont = _getLocalizedFontFamily(localeCode);
  var fontFamilyWithFallback = _fontFamilyWithFallbacks(localizedFont);
  var fontStyles = {
    tiny: _createFont(FontSizes.mini, FontWeights.regular, fontFamilyWithFallback),
    xSmall: _createFont(FontSizes.xSmall, FontWeights.regular, fontFamilyWithFallback),
    small: _createFont(FontSizes.small, FontWeights.regular, fontFamilyWithFallback),
    smallPlus: _createFont(FontSizes.smallPlus, FontWeights.regular, fontFamilyWithFallback),
    medium: _createFont(FontSizes.medium, FontWeights.regular, fontFamilyWithFallback),
    mediumPlus: _createFont(FontSizes.mediumPlus, FontWeights.regular, fontFamilyWithFallback),
    large: _createFont(FontSizes.large, FontWeights.regular, fontFamilyWithFallback),
    xLarge: _createFont(FontSizes.xLarge, FontWeights.semibold, fontFamilyWithFallback),
    xLargePlus: _createFont(FontSizes.xLargePlus, FontWeights.semibold, fontFamilyWithFallback),
    xxLarge: _createFont(FontSizes.xxLarge, FontWeights.semibold, fontFamilyWithFallback),
    xxLargePlus: _createFont(FontSizes.xxLargePlus, FontWeights.semibold, fontFamilyWithFallback),
    superLarge: _createFont(FontSizes.superLarge, FontWeights.semibold, fontFamilyWithFallback),
    mega: _createFont(FontSizes.mega, FontWeights.semibold, fontFamilyWithFallback)
  };
  return fontStyles;
}

// node_modules/@fluentui/theme/lib/fonts/DefaultFontStyles.js
var DefaultBaseUrl = "https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/assets";
var DefaultFontStyles = createFontStyles(getLanguage());
function _registerFontFace(fontFamily, url, fontWeight, localFontName) {
  fontFamily = "'".concat(fontFamily, "'");
  var localFontSrc = localFontName !== void 0 ? "local('".concat(localFontName, "'),") : "";
  fontFace({
    fontFamily,
    src: localFontSrc + "url('".concat(url, ".woff2') format('woff2'),") + "url('".concat(url, ".woff') format('woff')"),
    fontWeight,
    fontStyle: "normal",
    fontDisplay: "swap"
  });
}
function _registerFontFaceSet(baseUrl, fontFamily, cdnFolder, cdnFontName, localFontName) {
  if (cdnFontName === void 0) {
    cdnFontName = "segoeui";
  }
  var urlBase = "".concat(baseUrl, "/").concat(cdnFolder, "/").concat(cdnFontName);
  _registerFontFace(fontFamily, urlBase + "-light", FontWeights.light, localFontName && localFontName + " Light");
  _registerFontFace(fontFamily, urlBase + "-semilight", FontWeights.semilight, localFontName && localFontName + " SemiLight");
  _registerFontFace(fontFamily, urlBase + "-regular", FontWeights.regular, localFontName);
  _registerFontFace(fontFamily, urlBase + "-semibold", FontWeights.semibold, localFontName && localFontName + " SemiBold");
  _registerFontFace(fontFamily, urlBase + "-bold", FontWeights.bold, localFontName && localFontName + " Bold");
}
function registerDefaultFontFaces(baseUrl) {
  if (baseUrl) {
    var fontUrl = "".concat(baseUrl, "/fonts");
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Thai, "leelawadeeui-thai", "leelawadeeui");
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Arabic, "segoeui-arabic");
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Cyrillic, "segoeui-cyrillic");
    _registerFontFaceSet(fontUrl, LocalizedFontNames.EastEuropean, "segoeui-easteuropean");
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Greek, "segoeui-greek");
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Hebrew, "segoeui-hebrew");
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Vietnamese, "segoeui-vietnamese");
    _registerFontFaceSet(fontUrl, LocalizedFontNames.WestEuropean, "segoeui-westeuropean", "segoeui", "Segoe UI");
    _registerFontFaceSet(fontUrl, LocalizedFontFamilies.Selawik, "selawik", "selawik");
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Armenian, "segoeui-armenian");
    _registerFontFaceSet(fontUrl, LocalizedFontNames.Georgian, "segoeui-georgian");
    _registerFontFace("Leelawadee UI Web", "".concat(fontUrl, "/leelawadeeui-thai/leelawadeeui-semilight"), FontWeights.light);
    _registerFontFace("Leelawadee UI Web", "".concat(fontUrl, "/leelawadeeui-thai/leelawadeeui-bold"), FontWeights.semibold);
  }
}
function _getFontBaseUrl() {
  var _a3, _b;
  var fabricConfig = (_a3 = getWindow()) === null || _a3 === void 0 ? void 0 : _a3.FabricConfig;
  return (_b = fabricConfig === null || fabricConfig === void 0 ? void 0 : fabricConfig.fontBaseUrl) !== null && _b !== void 0 ? _b : DefaultBaseUrl;
}
registerDefaultFontFaces(_getFontBaseUrl());

// node_modules/@fluentui/theme/lib/createTheme.js
function createTheme(theme, depComments) {
  if (theme === void 0) {
    theme = {};
  }
  if (depComments === void 0) {
    depComments = false;
  }
  var isInverted = !!theme.isInverted;
  var baseTheme = {
    palette: DefaultPalette,
    effects: DefaultEffects,
    fonts: DefaultFontStyles,
    spacing: DefaultSpacing,
    isInverted,
    disableGlobalClassNames: false,
    semanticColors: makeSemanticColors(DefaultPalette, DefaultEffects, void 0, isInverted, depComments),
    rtl: void 0
  };
  return mergeThemes(baseTheme, theme);
}

// node_modules/@fluentui/theme/lib/FluentTheme.js
var FluentTheme = createTheme({});

// node_modules/@fluentui/theme/lib/version.js
setVersion("@fluentui/theme", "2.6.34");

// node_modules/@fluentui/style-utilities/lib/styles/CommonStyles.js
var HighContrastSelector = "@media screen and (-ms-high-contrast: active), screen and (forced-colors: active)";
var ScreenWidthMinMedium = 480;
var ScreenWidthMinLarge = 640;
var ScreenWidthMinXLarge = 1024;
var ScreenWidthMinXXLarge = 1366;
var ScreenWidthMinXXXLarge = 1920;
var ScreenWidthMaxSmall = ScreenWidthMinMedium - 1;
var ScreenWidthMaxMedium = ScreenWidthMinLarge - 1;
var ScreenWidthMaxLarge = ScreenWidthMinXLarge - 1;
var ScreenWidthMaxXLarge = ScreenWidthMinXXLarge - 1;
var ScreenWidthMaxXXLarge = ScreenWidthMinXXXLarge - 1;
function getHighContrastNoAdjustStyle() {
  return {
    forcedColorAdjust: "none",
    MsHighContrastAdjust: "none"
  };
}

// node_modules/@fluentui/style-utilities/lib/styles/zIndexes.js
var ZIndexes;
(function(ZIndexes2) {
  ZIndexes2.Nav = 1;
  ZIndexes2.ScrollablePane = 1;
  ZIndexes2.FocusStyle = 1;
  ZIndexes2.Coachmark = 1e3;
  ZIndexes2.Layer = 1e6;
  ZIndexes2.KeytipLayer = 1000001;
})(ZIndexes || (ZIndexes = {}));

// node_modules/@fluentui/style-utilities/lib/styles/getFocusStyle.js
function getFocusStyle(theme, insetOrOptions, position, highContrastStyle, borderColor, outlineColor, isFocusedOnly, borderRadius) {
  if (typeof insetOrOptions === "number" || !insetOrOptions) {
    return _getFocusStyleInternal(theme, {
      inset: insetOrOptions,
      position,
      highContrastStyle,
      borderColor,
      outlineColor,
      isFocusedOnly,
      borderRadius
    });
  } else {
    return _getFocusStyleInternal(theme, insetOrOptions);
  }
}
function _getFocusStyleInternal(theme, options) {
  var _a3, _b;
  if (options === void 0) {
    options = {};
  }
  var borderRadius = options.borderRadius, _c = options.inset, inset = _c === void 0 ? 0 : _c, _d = options.width, width = _d === void 0 ? 1 : _d, _e = options.position, position = _e === void 0 ? "relative" : _e, highContrastStyle = options.highContrastStyle, _f = options.borderColor, borderColor = _f === void 0 ? theme.palette.white : _f, _g = options.outlineColor, outlineColor = _g === void 0 ? theme.palette.neutralSecondary : _g, _h = options.isFocusedOnly, isFocusedOnly = _h === void 0 ? true : _h, pointerEvents = options.pointerEvents;
  return {
    // Clear browser-specific focus styles and use 'transparent' as placeholder for focus style.
    outline: "transparent",
    // Requirement because pseudo-element is absolutely positioned.
    position,
    selectors: (_a3 = {
      // Clear the focus border in Firefox.
      // Reference: http://stackoverflow.com/a/199319/1436671
      "::-moz-focus-inner": {
        border: "0"
      }
    }, // When the element that uses this mixin is in a :focus state, add a pseudo-element to
    // create a border.
    _a3[".".concat(IsFocusVisibleClassName, " &").concat(isFocusedOnly ? ":focus" : "", ":after")] = {
      content: '""',
      position: "absolute",
      pointerEvents,
      left: inset + 1,
      top: inset + 1,
      bottom: inset + 1,
      right: inset + 1,
      border: "".concat(width, "px solid ").concat(borderColor),
      outline: "".concat(width, "px solid ").concat(outlineColor),
      zIndex: ZIndexes.FocusStyle,
      borderRadius,
      selectors: (_b = {}, _b[HighContrastSelector] = highContrastStyle, _b)
    }, _a3)
  };
}
var getInputFocusStyle = function(borderColor, borderRadius, borderType, borderPosition) {
  var _a3, _b, _c;
  if (borderType === void 0) {
    borderType = "border";
  }
  if (borderPosition === void 0) {
    borderPosition = -1;
  }
  var isBorderBottom = borderType === "borderBottom";
  return {
    borderColor,
    selectors: {
      ":after": (_a3 = {
        pointerEvents: "none",
        content: "''",
        position: "absolute",
        left: isBorderBottom ? 0 : borderPosition,
        top: borderPosition,
        bottom: borderPosition,
        right: isBorderBottom ? 0 : borderPosition
      }, _a3[borderType] = "2px solid ".concat(borderColor), _a3.borderRadius = borderRadius, _a3.width = borderType === "borderBottom" ? "100%" : void 0, _a3.selectors = (_b = {}, _b[HighContrastSelector] = (_c = {}, _c[borderType === "border" ? "borderColor" : "borderBottomColor"] = "Highlight", _c), _b), _a3)
    }
  };
};

// node_modules/@fluentui/style-utilities/lib/styles/getGlobalClassNames.js
var _getGlobalClassNames = memoizeFunction(function(classNames, disableGlobalClassNames) {
  var styleSheet = Stylesheet.getInstance();
  if (disableGlobalClassNames) {
    return Object.keys(classNames).reduce(function(acc, className) {
      acc[className] = styleSheet.getClassName(classNames[className]);
      return acc;
    }, {});
  }
  return classNames;
});
function getGlobalClassNames(classNames, theme, disableGlobalClassNames) {
  return _getGlobalClassNames(classNames, disableGlobalClassNames !== void 0 ? disableGlobalClassNames : theme.disableGlobalClassNames);
}

// node_modules/@fluentui/style-utilities/lib/styles/GeneralStyles.js
var normalize = {
  boxShadow: "none",
  margin: 0,
  padding: 0,
  boxSizing: "border-box"
};

// node_modules/@fluentui/style-utilities/lib/styles/getPlaceholderStyles.js
function getPlaceholderStyles(styles) {
  return {
    selectors: {
      "::placeholder": styles,
      ":-ms-input-placeholder": styles,
      "::-ms-input-placeholder": styles
      // Edge
    }
  };
}

// node_modules/@microsoft/load-themed-styles/lib-es6/index.js
var __assign2 = function() {
  __assign2 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
var _root = typeof window === "undefined" ? global : window;
var _styleNonce = _root && _root.CSPSettings && _root.CSPSettings.nonce;
var _themeState = initializeThemeState();
function initializeThemeState() {
  var state = _root.__themeState__ || {
    theme: void 0,
    lastStyleElement: void 0,
    registeredStyles: []
  };
  if (!state.runState) {
    state = __assign2(__assign2({}, state), { perf: {
      count: 0,
      duration: 0
    }, runState: {
      flushTimer: 0,
      mode: 0,
      buffer: []
    } });
  }
  if (!state.registeredThemableStyles) {
    state = __assign2(__assign2({}, state), { registeredThemableStyles: [] });
  }
  _root.__themeState__ = state;
  return state;
}
function applyThemableStyles(stylesArray, styleRecord) {
  if (_themeState.loadStyles) {
    _themeState.loadStyles(resolveThemableArray(stylesArray).styleString, stylesArray);
  } else {
    registerStyles(stylesArray);
  }
}
function loadTheme(theme) {
  _themeState.theme = theme;
  reloadStyles();
}
function clearStyles(option) {
  if (option === void 0) {
    option = 3;
  }
  if (option === 3 || option === 2) {
    clearStylesInternal(_themeState.registeredStyles);
    _themeState.registeredStyles = [];
  }
  if (option === 3 || option === 1) {
    clearStylesInternal(_themeState.registeredThemableStyles);
    _themeState.registeredThemableStyles = [];
  }
}
function clearStylesInternal(records) {
  records.forEach(function(styleRecord) {
    var styleElement = styleRecord && styleRecord.styleElement;
    if (styleElement && styleElement.parentElement) {
      styleElement.parentElement.removeChild(styleElement);
    }
  });
}
function reloadStyles() {
  if (_themeState.theme) {
    var themableStyles = [];
    for (var _i = 0, _a3 = _themeState.registeredThemableStyles; _i < _a3.length; _i++) {
      var styleRecord = _a3[_i];
      themableStyles.push(styleRecord.themableStyle);
    }
    if (themableStyles.length > 0) {
      clearStyles(
        1
        /* ClearStyleOptions.onlyThemable */
      );
      applyThemableStyles([].concat.apply([], themableStyles));
    }
  }
}
function resolveThemableArray(splitStyleArray) {
  var theme = _themeState.theme;
  var themable = false;
  var resolvedArray = (splitStyleArray || []).map(function(currentValue) {
    var themeSlot = currentValue.theme;
    if (themeSlot) {
      themable = true;
      var themedValue = theme ? theme[themeSlot] : void 0;
      var defaultValue = currentValue.defaultValue || "inherit";
      if (theme && !themedValue && console && !(themeSlot in theme) && typeof DEBUG !== "undefined" && DEBUG) {
        console.warn('Theming value not provided for "'.concat(themeSlot, '". Falling back to "').concat(defaultValue, '".'));
      }
      return themedValue || defaultValue;
    } else {
      return currentValue.rawString;
    }
  });
  return {
    styleString: resolvedArray.join(""),
    themable
  };
}
function registerStyles(styleArray) {
  if (typeof document === "undefined") {
    return;
  }
  var head = document.getElementsByTagName("head")[0];
  var styleElement = document.createElement("style");
  var _a3 = resolveThemableArray(styleArray), styleString = _a3.styleString, themable = _a3.themable;
  styleElement.setAttribute("data-load-themed-styles", "true");
  if (_styleNonce) {
    styleElement.setAttribute("nonce", _styleNonce);
  }
  styleElement.appendChild(document.createTextNode(styleString));
  _themeState.perf.count++;
  head.appendChild(styleElement);
  var ev = document.createEvent("HTMLEvents");
  ev.initEvent(
    "styleinsert",
    true,
    false
    /* cancelable */
  );
  ev.args = {
    newStyle: styleElement
  };
  document.dispatchEvent(ev);
  var record = {
    styleElement,
    themableStyle: styleArray
  };
  if (themable) {
    _themeState.registeredThemableStyles.push(record);
  } else {
    _themeState.registeredStyles.push(record);
  }
}

// node_modules/@fluentui/style-utilities/lib/styles/theme.js
var _theme = createTheme({});
var _onThemeChangeCallbacks = [];
var ThemeSettingName = "theme";
function initializeThemeInCustomizations() {
  var _a3;
  var _b, _c;
  var win = getWindow();
  if ((_b = win === null || win === void 0 ? void 0 : win.FabricConfig) === null || _b === void 0 ? void 0 : _b.legacyTheme) {
    loadTheme2(win.FabricConfig.legacyTheme);
  } else if (!Customizations.getSettings([ThemeSettingName]).theme) {
    if ((_c = win === null || win === void 0 ? void 0 : win.FabricConfig) === null || _c === void 0 ? void 0 : _c.theme) {
      _theme = createTheme(win.FabricConfig.theme);
    }
    Customizations.applySettings((_a3 = {}, _a3[ThemeSettingName] = _theme, _a3));
  }
}
initializeThemeInCustomizations();
function getTheme(depComments) {
  if (depComments === void 0) {
    depComments = false;
  }
  if (depComments === true) {
    _theme = createTheme({}, depComments);
  }
  return _theme;
}
function loadTheme2(theme, depComments) {
  var _a3;
  if (depComments === void 0) {
    depComments = false;
  }
  _theme = createTheme(theme, depComments);
  loadTheme(__assign(__assign(__assign(__assign({}, _theme.palette), _theme.semanticColors), _theme.effects), _loadFonts(_theme)));
  Customizations.applySettings((_a3 = {}, _a3[ThemeSettingName] = _theme, _a3));
  _onThemeChangeCallbacks.forEach(function(callback) {
    try {
      callback(_theme);
    } catch (e) {
    }
  });
  return _theme;
}
function _loadFonts(theme) {
  var lines = {};
  for (var _i = 0, _a3 = Object.keys(theme.fonts); _i < _a3.length; _i++) {
    var fontName = _a3[_i];
    var font = theme.fonts[fontName];
    for (var _b = 0, _c = Object.keys(font); _b < _c.length; _b++) {
      var propName = _c[_b];
      var name_1 = fontName + propName.charAt(0).toUpperCase() + propName.slice(1);
      var value = font[propName];
      if (propName === "fontSize" && typeof value === "number") {
        value = value + "px";
      }
      lines[name_1] = value;
    }
  }
  return lines;
}

// node_modules/@fluentui/style-utilities/lib/utilities/buildClassMap.js
function buildClassMap(styles) {
  var classes = {};
  var _loop_1 = function(styleName2) {
    if (styles.hasOwnProperty(styleName2)) {
      var className_1;
      Object.defineProperty(classes, styleName2, {
        get: function() {
          if (className_1 === void 0) {
            className_1 = mergeStyles(styles[styleName2]).toString();
          }
          return className_1;
        },
        enumerable: true,
        configurable: true
      });
    }
  };
  for (var styleName in styles) {
    _loop_1(styleName);
  }
  return classes;
}

// node_modules/@fluentui/style-utilities/lib/utilities/icons.js
var ICON_SETTING_NAME = "icons";
var _iconSettings = GlobalSettings.getValue(ICON_SETTING_NAME, {
  __options: {
    disableWarnings: false,
    warnOnMissingIcons: true
  },
  __remapped: {}
});
var stylesheet2 = Stylesheet.getInstance();
if (stylesheet2 && stylesheet2.onReset) {
  stylesheet2.onReset(function() {
    for (var name_1 in _iconSettings) {
      if (_iconSettings.hasOwnProperty(name_1) && !!_iconSettings[name_1].subset) {
        _iconSettings[name_1].subset.className = void 0;
      }
    }
  });
}
var normalizeIconName = function(name) {
  return name.toLowerCase();
};
function getIcon(name) {
  var icon = void 0;
  var options = _iconSettings.__options;
  name = name ? normalizeIconName(name) : "";
  name = _iconSettings.__remapped[name] || name;
  if (name) {
    icon = _iconSettings[name];
    if (icon) {
      var subset = icon.subset;
      if (subset && subset.fontFace) {
        if (!subset.isRegistered) {
          fontFace(subset.fontFace);
          subset.isRegistered = true;
        }
        if (!subset.className) {
          subset.className = mergeStyles(subset.style, {
            fontFamily: subset.fontFace.fontFamily,
            fontWeight: subset.fontFace.fontWeight || "normal",
            fontStyle: subset.fontFace.fontStyle || "normal"
          });
        }
      }
    } else {
      if (!options.disableWarnings && options.warnOnMissingIcons) {
        warn('The icon "'.concat(name, '" was used but not registered. See https://github.com/microsoft/fluentui/wiki/Using-icons for more information.'));
      }
    }
  }
  return icon;
}

// node_modules/@fluentui/style-utilities/lib/classNames/AnimationClassNames.js
var AnimationClassNames = buildClassMap(AnimationStyles);

// node_modules/@fluentui/style-utilities/lib/classNames/FontClassNames.js
var FontClassNames = buildClassMap(DefaultFontStyles);

// node_modules/@fluentui/style-utilities/lib/classNames/ColorClassNames.js
var ColorClassNames = {};
for (colorName in DefaultPalette) {
  if (DefaultPalette.hasOwnProperty(colorName)) {
    _defineGetter(ColorClassNames, colorName, "", false, "color");
    _defineGetter(ColorClassNames, colorName, "Hover", true, "color");
    _defineGetter(ColorClassNames, colorName, "Background", false, "background");
    _defineGetter(ColorClassNames, colorName, "BackgroundHover", true, "background");
    _defineGetter(ColorClassNames, colorName, "Border", false, "borderColor");
    _defineGetter(ColorClassNames, colorName, "BorderHover", true, "borderColor");
  }
}
var colorName;
function _defineGetter(obj, colorName, suffix, isHover, cssProperty) {
  Object.defineProperty(obj, colorName + suffix, {
    get: function() {
      var _a3;
      var style = (_a3 = {}, _a3[cssProperty] = getTheme().palette[colorName], _a3);
      return mergeStyles(isHover ? { selectors: { ":hover": style } } : style).toString();
    },
    enumerable: true,
    configurable: true
  });
}

// node_modules/@fluentui/style-utilities/lib/version.js
setVersion("@fluentui/style-utilities", "8.9.16");

// node_modules/@fluentui/style-utilities/lib/index.js
initializeThemeInCustomizations();

export {
  setVersion,
  getWindow,
  Async,
  __extends,
  __assign,
  __rest,
  __spreadArray,
  mergeCss,
  concatStyleSets,
  mergeStyleSets,
  warn,
  warnMutuallyExclusive,
  warnDeprecations,
  DelayedRender,
  KeyCodes,
  getRTL2 as getRTL,
  classNamesFunction,
  memoizeFunction,
  isControlled,
  css,
  Customizations,
  CustomizerContext,
  getId,
  htmlElementProperties,
  inputProperties,
  textAreaProperties,
  imgProperties,
  divProperties,
  getNativeProps,
  initializeComponentRef,
  styled,
  warnControlledUsage,
  isIE11,
  useIsomorphicLayoutEffect,
  getIcon,
  FontWeights,
  IconFontSizes,
  HighContrastSelector,
  getHighContrastNoAdjustStyle,
  getFocusStyle,
  getInputFocusStyle,
  getGlobalClassNames,
  normalize,
  getPlaceholderStyles,
  AnimationClassNames
};
//# sourceMappingURL=chunk-EE257LXQ.js.map
