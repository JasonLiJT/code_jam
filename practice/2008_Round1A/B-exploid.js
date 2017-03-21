var goog = goog || {},
	goog$global = this,
	goog$isDef = function(a) {
		return void 0 !== a
	},
	goog$getObjectByName = function(a, b) {
		a = a.split(".");
		b = b || goog$global;
		for (var c; c = a.shift();)
			if (null != b[c]) b = b[c];
			else return null;
		return b
	},
	goog$nullFunction = function() {},
	goog$addSingletonGetter = function(a) {
		a.instance_ = void 0;
		a.getInstance = function() {
			return a.instance_ ? a.instance_ : a.instance_ = new a
		}
	},
	goog$typeOf = function(a) {
		var b = typeof a;
		if ("object" == b)
			if (a) {
				if (a instanceof Array) return "array";
				if (a instanceof Object) return b;
				var c = Object.prototype.toString.call(a);
				if ("[object Window]" == c) return "object";
				if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
				if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
			} else return "null";
		else if ("function" == b && "undefined" == typeof a.call) return "object";
		return b
	},
	goog$isArray =
	function(a) {
		return "array" == goog$typeOf(a)
	},
	goog$isArrayLike = function(a) {
		var b = goog$typeOf(a);
		return "array" == b || "object" == b && "number" == typeof a.length
	},
	goog$isString = function(a) {
		return "string" == typeof a
	},
	goog$isNumber = function(a) {
		return "number" == typeof a
	},
	goog$isFunction = function(a) {
		return "function" == goog$typeOf(a)
	},
	goog$isObject = function(a) {
		var b = typeof a;
		return "object" == b && null != a || "function" == b
	},
	goog$UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0),
	goog$uidCounter_ = 0,
	goog$cloneObject = function(a) {
		var b =
			goog$typeOf(a);
		if ("object" == b || "array" == b) {
			if (a.clone) return a.clone();
			var b = "array" == b ? [] : {},
				c;
			for (c in a) b[c] = goog$cloneObject(a[c]);
			return b
		}
		return a
	},
	goog$bindNative_ = function(a, b, c) {
		return a.call.apply(a.bind, arguments)
	},
	goog$bindJs_ = function(a, b, c) {
		if (!a) throw Error();
		if (2 < arguments.length) {
			var d = Array.prototype.slice.call(arguments, 2);
			return function() {
				var c = Array.prototype.slice.call(arguments);
				Array.prototype.unshift.apply(c, d);
				return a.apply(b, c)
			}
		}
		return function() {
			return a.apply(b, arguments)
		}
	},
	goog$bind = function(a, b, c) {
		goog$bind = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog$bindNative_ : goog$bindJs_;
		return goog$bind.apply(null, arguments)
	},
	goog$partial = function(a, b) {
		var c = Array.prototype.slice.call(arguments, 1);
		return function() {
			var b = c.slice();
			b.push.apply(b, arguments);
			return a.apply(this, b)
		}
	},
	goog$now = Date.now || function() {
		return +new Date
	},
	goog$inherits = function(a, b) {
		function c() {}
		c.prototype = b.prototype;
		a.superClass_ = b.prototype;
		a.prototype =
			new c;
		a.prototype.constructor = a;
		a.base = function(a, c, f) {
			for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
			return b.prototype[c].apply(a, d)
		}
	};
var goog$debug$fnNameResolver_, goog$debug$Error = function(a) {
	if (Error.captureStackTrace) Error.captureStackTrace(this, goog$debug$Error);
	else {
		var b = Error().stack;
		b && (this.stack = b)
	}
	a && (this.message = String(a))
};
goog$inherits(goog$debug$Error, Error);
goog$debug$Error.prototype.name = "CustomError";
var goog$dom$defaultDomHelper_;
var goog$string$subs = function(a, b) {
		for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
		return d + c.join("%s")
	},
	goog$string$trim = String.prototype.trim ? function(a) {
		return a.trim()
	} : function(a) {
		return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
	},
	goog$string$urlDecode = function(a) {
		return decodeURIComponent(a.replace(/\+/g, " "))
	},
	goog$string$htmlEscape = function(a, b) {
		if (b) a = a.replace(goog$string$AMP_RE_, "&amp;").replace(goog$string$LT_RE_, "&lt;").replace(goog$string$GT_RE_,
			"&gt;").replace(goog$string$QUOT_RE_, "&quot;").replace(goog$string$SINGLE_QUOTE_RE_, "&#39;").replace(goog$string$NULL_RE_, "&#0;");
		else {
			if (!goog$string$ALL_RE_.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(goog$string$AMP_RE_, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(goog$string$LT_RE_, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(goog$string$GT_RE_, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(goog$string$QUOT_RE_, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(goog$string$SINGLE_QUOTE_RE_, "&#39;")); - 1 !=
				a.indexOf("\x00") && (a = a.replace(goog$string$NULL_RE_, "&#0;"))
		}
		return a
	},
	goog$string$AMP_RE_ = /&/g,
	goog$string$LT_RE_ = /</g,
	goog$string$GT_RE_ = />/g,
	goog$string$QUOT_RE_ = /"/g,
	goog$string$SINGLE_QUOTE_RE_ = /'/g,
	goog$string$NULL_RE_ = /\x00/g,
	goog$string$ALL_RE_ = /[\x00&<>"']/,
	goog$string$repeat = String.prototype.repeat ? function(a, b) {
		return a.repeat(b)
	} : function(a, b) {
		return Array(b + 1).join(a)
	},
	goog$string$compareElements_ = function(a, b) {
		return a < b ? -1 : a > b ? 1 : 0
	},
	goog$string$toCamelCase = function(a) {
		return String(a).replace(/\-([a-z])/g,
			function(a, c) {
				return c.toUpperCase()
			})
	},
	goog$string$toTitleCase = function(a, b) {
		b = (b = goog$isString(b) ? String(b).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s") ? "|[" + b + "]+" : "";
		b = new RegExp("(^" + b + ")([a-z])", "g");
		return a.replace(b, function(a, b, e) {
			return b + e.toUpperCase()
		})
	};
var goog$asserts$AssertionError = function(a, b) {
	b.unshift(a);
	goog$debug$Error.call(this, goog$string$subs.apply(null, b));
	b.shift()
};
goog$inherits(goog$asserts$AssertionError, goog$debug$Error);
goog$asserts$AssertionError.prototype.name = "AssertionError";
var goog$asserts$DEFAULT_ERROR_HANDLER = function(a) {
		throw a;
	},
	goog$asserts$errorHandler_ = goog$asserts$DEFAULT_ERROR_HANDLER,
	goog$asserts$doAssertFailure_ = function(a, b, c, d) {
		var e = "Assertion failed";
		if (c) var e = e + (": " + c),
			f = d;
		else a && (e += ": " + a, f = b);
		a = new goog$asserts$AssertionError("" + e, f || []);
		goog$asserts$errorHandler_(a)
	},
	goog$asserts$assert = function(a, b, c) {
		a || goog$asserts$doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
		return a
	},
	goog$asserts$fail = function(a, b) {
		goog$asserts$errorHandler_(new goog$asserts$AssertionError("Failure" +
			(a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
	},
	goog$asserts$assertNumber = function(a, b, c) {
		goog$isNumber(a) || goog$asserts$doAssertFailure_("Expected number but got %s: %s.", [goog$typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
		return a
	},
	goog$asserts$assertString = function(a, b, c) {
		goog$isString(a) || goog$asserts$doAssertFailure_("Expected string but got %s: %s.", [goog$typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
		return a
	},
	goog$asserts$assertFunction = function(a, b, c) {
		goog$isFunction(a) ||
			goog$asserts$doAssertFailure_("Expected function but got %s: %s.", [goog$typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
		return a
	},
	goog$asserts$assertInstanceof = function(a, b, c, d) {
		a instanceof b || goog$asserts$doAssertFailure_("Expected instanceof %s but got %s.", [goog$asserts$getType_(b), goog$asserts$getType_(a)], c, Array.prototype.slice.call(arguments, 3));
		return a
	},
	goog$asserts$getType_ = function(a) {
		return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName ||
			a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
	};
var goog$array$indexOf = Array.prototype.indexOf ? function(a, b, c) {
		goog$asserts$assert(null != a.length);
		return Array.prototype.indexOf.call(a, b, c)
	} : function(a, b, c) {
		c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
		if (goog$isString(a)) return goog$isString(b) && 1 == b.length ? a.indexOf(b, c) : -1;
		for (; c < a.length; c++)
			if (c in a && a[c] === b) return c;
		return -1
	},
	goog$array$forEach = Array.prototype.forEach ? function(a, b, c) {
		goog$asserts$assert(null != a.length);
		Array.prototype.forEach.call(a, b, c)
	} : function(a, b, c) {
		for (var d = a.length,
				e = goog$isString(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
	},
	goog$array$filter = Array.prototype.filter ? function(a, b, c) {
		goog$asserts$assert(null != a.length);
		return Array.prototype.filter.call(a, b, c)
	} : function(a, b, c) {
		for (var d = a.length, e = [], f = 0, g = goog$isString(a) ? a.split("") : a, h = 0; h < d; h++)
			if (h in g) {
				var k = g[h];
				b.call(c, k, h, a) && (e[f++] = k)
			}
		return e
	},
	goog$array$map = Array.prototype.map ? function(a, b, c) {
		goog$asserts$assert(null != a.length);
		return Array.prototype.map.call(a, b, c)
	} : function(a, b, c) {
		for (var d =
				a.length, e = Array(d), f = goog$isString(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
		return e
	},
	goog$array$find = function(a, b, c) {
		var d;
		a: {
			d = a;
			for (var e = d.length, f = goog$isString(d) ? d.split("") : d, g = 0; g < e; g++)
				if (g in f && b.call(c, f[g], g, d)) {
					d = g;
					break a
				}
			d = -1
		}
		return 0 > d ? null : goog$isString(a) ? a.charAt(d) : a[d]
	},
	goog$array$contains = function(a, b) {
		return 0 <= goog$array$indexOf(a, b)
	},
	goog$array$remove = function(a, b) {
		b = goog$array$indexOf(a, b);
		var c;
		(c = 0 <= b) && goog$array$removeAt(a, b);
		return c
	},
	goog$array$removeAt =
	function(a, b) {
		goog$asserts$assert(null != a.length);
		return 1 == Array.prototype.splice.call(a, b, 1).length
	},
	goog$array$concat = function(a) {
		return Array.prototype.concat.apply([], arguments)
	},
	goog$array$toArray = function(a) {
		var b = a.length;
		if (0 < b) {
			for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
			return c
		}
		return []
	},
	goog$array$extend = function(a, b) {
		for (var c = 1; c < arguments.length; c++) {
			var d = arguments[c];
			if (goog$isArrayLike(d)) {
				var e = a.length || 0,
					f = d.length || 0;
				a.length = e + f;
				for (var g = 0; g < f; g++) a[e + g] = d[g]
			} else a.push(d)
		}
	},
	goog$array$slice = function(a, b, c) {
		goog$asserts$assert(null != a.length);
		return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
	},
	goog$array$defaultCompare = function(a, b) {
		return a > b ? 1 : a < b ? -1 : 0
	};
var goog$object$forEach = function(a, b, c) {
		for (var d in a) b.call(c, a[d], d, a)
	},
	goog$object$some = function(a, b, c) {
		for (var d in a)
			if (b.call(c, a[d], d, a)) return !0;
		return !1
	},
	goog$object$getValues = function(a) {
		var b = [],
			c = 0,
			d;
		for (d in a) b[c++] = a[d];
		return b
	},
	goog$object$getKeys = function(a) {
		var b = [],
			c = 0,
			d;
		for (d in a) b[c++] = d;
		return b
	},
	goog$object$PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
	goog$object$extend = function(a, b) {
		for (var c,
				d, e = 1; e < arguments.length; e++) {
			d = arguments[e];
			for (c in d) a[c] = d[c];
			for (var f = 0; f < goog$object$PROTOTYPE_FIELDS_.length; f++) c = goog$object$PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
		}
	};
var goog$dom$tags$VOID_TAGS_ = {
	area: !0,
	base: !0,
	br: !0,
	col: !0,
	command: !0,
	embed: !0,
	hr: !0,
	img: !0,
	input: !0,
	keygen: !0,
	link: !0,
	meta: !0,
	param: !0,
	source: !0,
	track: !0,
	wbr: !0
};
var goog$labs$userAgent$util$userAgent_;
a: {
	var navigator$jscomp$inline_518 = goog$global.navigator;
	if (navigator$jscomp$inline_518) {
		var userAgent$jscomp$inline_519 = navigator$jscomp$inline_518.userAgent;
		if (userAgent$jscomp$inline_519) {
			goog$labs$userAgent$util$userAgent_ = userAgent$jscomp$inline_519;
			break a
		}
	}
	goog$labs$userAgent$util$userAgent_ = ""
}
var goog$labs$userAgent$util$matchUserAgent = function(a) {
		var b = goog$labs$userAgent$util$userAgent_;
		return -1 != b.indexOf(a)
	},
	goog$labs$userAgent$util$matchUserAgentIgnoreCase = function(a) {
		var b = goog$labs$userAgent$util$userAgent_;
		return -1 != b.toLowerCase().indexOf(a.toLowerCase())
	};
var goog$string$Const = function() {
	this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = "";
	this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog$string$Const$TYPE_MARKER_
};
goog$string$Const.prototype.implementsGoogStringTypedString = !0;
goog$string$Const.prototype.getTypedStringValue = function() {
	return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_
};
goog$string$Const.prototype.toString = function() {
	return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}"
};
var goog$string$Const$unwrap = function(a) {
		if (a instanceof goog$string$Const && a.constructor === goog$string$Const && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog$string$Const$TYPE_MARKER_) return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
		goog$asserts$fail("expected object of type Const, got '" + a + "'");
		return "type_error:Const"
	},
	goog$string$Const$TYPE_MARKER_ = {},
	goog$string$Const$create__googStringSecurityPrivate_ = function(a) {
		var b = new goog$string$Const;
		b.stringConstValueWithSecurityContract__googStringSecurityPrivate_ =
			a;
		return b
	};
goog$string$Const$create__googStringSecurityPrivate_("");
var goog$html$SafeStyle = function() {
	this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
	this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog$html$SafeStyle$TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog$html$SafeStyle.prototype.implementsGoogStringTypedString = !0;
var goog$html$SafeStyle$TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog$html$SafeStyle.prototype.getTypedStringValue = function() {
	return this.privateDoNotAccessOrElseSafeStyleWrappedValue_
};
goog$html$SafeStyle.prototype.toString = function() {
	return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}"
};
goog$html$SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
	this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
	return this
};
var goog$html$SafeStyle$EMPTY = (new goog$html$SafeStyle).initSecurityPrivateDoNotAccessOrElse_(""),
	goog$html$SafeStyle$VALUE_RE_ = /^([-,."'%_!# a-zA-Z0-9]+|(?:rgb|hsl)a?\([0-9.%, ]+\))$/;
var goog$html$TrustedResourceUrl = function() {
	this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = "";
	this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog$html$TrustedResourceUrl$TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog$html$TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0;
goog$html$TrustedResourceUrl.prototype.getTypedStringValue = function() {
	return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_
};
goog$html$TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog$html$TrustedResourceUrl.prototype.getDirection = function() {
	return 1
};
goog$html$TrustedResourceUrl.prototype.toString = function() {
	return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}"
};
var goog$html$TrustedResourceUrl$unwrap = function(a) {
		if (a instanceof goog$html$TrustedResourceUrl && a.constructor === goog$html$TrustedResourceUrl && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog$html$TrustedResourceUrl$TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
		goog$asserts$fail("expected object of type TrustedResourceUrl, got '" + a + "' of type " + goog$typeOf(a));
		return "type_error:TrustedResourceUrl"
	},
	goog$html$TrustedResourceUrl$TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {},
	goog$html$TrustedResourceUrl$createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function(a) {
		var b = new goog$html$TrustedResourceUrl;
		b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a;
		return b
	};
var goog$html$SafeUrl = function() {
	this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
	this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog$html$SafeUrl$TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
};
goog$html$SafeUrl.prototype.implementsGoogStringTypedString = !0;
goog$html$SafeUrl.prototype.getTypedStringValue = function() {
	return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
};
goog$html$SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog$html$SafeUrl.prototype.getDirection = function() {
	return 1
};
goog$html$SafeUrl.prototype.toString = function() {
	return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
};
var goog$html$SafeUrl$unwrap = function(a) {
		if (a instanceof goog$html$SafeUrl && a.constructor === goog$html$SafeUrl && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog$html$SafeUrl$TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
		goog$asserts$fail("expected object of type SafeUrl, got '" + a + "' of type " + goog$typeOf(a));
		return "type_error:SafeUrl"
	},
	goog$html$SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i,
	goog$html$SafeUrl$sanitize =
	function(a) {
		if (a instanceof goog$html$SafeUrl) return a;
		a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
		goog$html$SAFE_URL_PATTERN_.test(a) || (a = "about:invalid#zClosurez");
		return goog$html$SafeUrl$createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
	},
	goog$html$SafeUrl$TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {},
	goog$html$SafeUrl$createSafeUrlSecurityPrivateDoNotAccessOrElse = function(a) {
		var b = new goog$html$SafeUrl;
		b.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
		return b
	};
goog$html$SafeUrl$createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");
var goog$html$SafeHtml = function() {
	this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
	this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog$html$SafeHtml$TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
	this.dir_ = null
};
goog$html$SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog$html$SafeHtml.prototype.getDirection = function() {
	return this.dir_
};
goog$html$SafeHtml.prototype.implementsGoogStringTypedString = !0;
goog$html$SafeHtml.prototype.getTypedStringValue = function() {
	return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
};
goog$html$SafeHtml.prototype.toString = function() {
	return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
};
var goog$html$SafeHtml$unwrap = function(a) {
		if (a instanceof goog$html$SafeHtml && a.constructor === goog$html$SafeHtml && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog$html$SafeHtml$TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
		goog$asserts$fail("expected object of type SafeHtml, got '" + a + "' of type " + goog$typeOf(a));
		return "type_error:SafeHtml"
	},
	goog$html$SafeHtml$htmlEscape = function(a) {
		if (a instanceof goog$html$SafeHtml) return a;
		var b = null;
		a.implementsGoogI18nBidiDirectionalString &&
			(b = a.getDirection());
		a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
		return goog$html$SafeHtml$createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog$string$htmlEscape(a), b)
	},
	goog$html$SafeHtml$htmlEscapePreservingNewlinesAndSpaces = function(a) {
		if (a instanceof goog$html$SafeHtml) return a;
		a = goog$html$SafeHtml$htmlEscape(a);
		var b;
		b = goog$html$SafeHtml$unwrap(a);
		b = b.replace(/  /g, " &#160;");
		b = b.replace(/(\r\n|\r|\n)/g, "<br>");
		return goog$html$SafeHtml$createSafeHtmlSecurityPrivateDoNotAccessOrElse(b,
			a.getDirection())
	},
	goog$html$SafeHtml$VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/,
	goog$html$SafeHtml$URL_ATTRIBUTES_ = {
		action: !0,
		cite: !0,
		data: !0,
		formaction: !0,
		href: !0,
		manifest: !0,
		poster: !0,
		src: !0
	},
	goog$html$SafeHtml$NOT_ALLOWED_TAG_NAMES_ = {
		APPLET: !0,
		BASE: !0,
		EMBED: !0,
		IFRAME: !0,
		LINK: !0,
		MATH: !0,
		META: !0,
		OBJECT: !0,
		SCRIPT: !0,
		STYLE: !0,
		SVG: !0,
		TEMPLATE: !0
	},
	goog$html$SafeHtml$create = function(a, b, c) {
		var d = String(a);
		if (!goog$html$SafeHtml$VALID_NAMES_IN_TAG_.test(d)) throw Error("Invalid tag name <" + d + ">.");
		if (d.toUpperCase() in
			goog$html$SafeHtml$NOT_ALLOWED_TAG_NAMES_) throw Error("Tag name <" + d + "> is not allowed for SafeHtml.");
		return goog$html$SafeHtml$createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(String(a), b, c)
	},
	goog$html$SafeHtml$concat = function(a) {
		var b = 0,
			c = "",
			d = function(a) {
				goog$isArray(a) ? goog$array$forEach(a, d) : (a = goog$html$SafeHtml$htmlEscape(a), c += goog$html$SafeHtml$unwrap(a), a = a.getDirection(), 0 == b ? b = a : 0 != a && b != a && (b = null))
			};
		goog$array$forEach(arguments, d);
		return goog$html$SafeHtml$createSafeHtmlSecurityPrivateDoNotAccessOrElse(c,
			b)
	},
	goog$html$SafeHtml$TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {},
	goog$html$SafeHtml$createSafeHtmlSecurityPrivateDoNotAccessOrElse = function(a, b) {
		return (new goog$html$SafeHtml).initSecurityPrivateDoNotAccessOrElse_(a, b)
	};
goog$html$SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a, b) {
	this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
	this.dir_ = b;
	return this
};
var goog$html$SafeHtml$createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function(a, b, c) {
	var d = null,
		e = "<" + a,
		f, g = a,
		h = b,
		k = "";
	if (h)
		for (f in h) {
			if (!goog$html$SafeHtml$VALID_NAMES_IN_TAG_.test(f)) throw Error('Invalid attribute name "' + f + '".');
			var m = h[f];
			if (null != m) {
				var p, n = g;
				p = f;
				var l = m;
				if (l instanceof goog$string$Const) l = goog$string$Const$unwrap(l);
				else if ("style" == p.toLowerCase()) {
					m = void 0;
					n = l;
					if (!goog$isObject(n)) throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' +
						typeof n + " given: " + n);
					if (!(n instanceof goog$html$SafeStyle)) {
						l = n;
						n = "";
						for (m in l) {
							if (!/^[-_a-zA-Z0-9]+$/.test(m)) throw Error("Name allows only [-_a-zA-Z0-9], got: " + m);
							var q = l[m];
							if (null != q) {
								if (q instanceof goog$string$Const) q = goog$string$Const$unwrap(q), goog$asserts$assert(!/[{;}]/.test(q), "Value does not allow [{;}].");
								else if (goog$html$SafeStyle$VALUE_RE_.test(q)) {
									for (var r, t = r = !0, u = 0; u < q.length; u++) {
										var v = q.charAt(u);
										"'" == v && t ? r = !r : '"' == v && r && (t = !t)
									}
									r = r && t;
									r || (goog$asserts$fail("String value requires balanced quotes, got: " +
										q), q = "zClosurez")
								} else goog$asserts$fail("String value allows only [-,.\"'%_!# a-zA-Z0-9], rgb() and rgba(), got: " + q), q = "zClosurez";
								n += m + ":" + q + ";"
							}
						}
						n ? (m = n, goog$asserts$assert(!/[<>]/.test(m), "Forbidden characters in style string: " + m), n = (new goog$html$SafeStyle).initSecurityPrivateDoNotAccessOrElse_(n)) : n = goog$html$SafeStyle$EMPTY
					}
					n instanceof goog$html$SafeStyle && n.constructor === goog$html$SafeStyle && n.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog$html$SafeStyle$TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ ?
						m = n.privateDoNotAccessOrElseSafeStyleWrappedValue_ : (goog$asserts$fail("expected object of type SafeStyle, got '" + n + "' of type " + goog$typeOf(n)), m = "type_error:SafeStyle");
					l = m
				} else {
					if (/^on/i.test(p)) throw Error('Attribute "' + p + '" requires goog.string.Const value, "' + l + '" given.');
					if (p.toLowerCase() in goog$html$SafeHtml$URL_ATTRIBUTES_)
						if (l instanceof goog$html$TrustedResourceUrl) l = goog$html$TrustedResourceUrl$unwrap(l);
						else if (l instanceof goog$html$SafeUrl) l = goog$html$SafeUrl$unwrap(l);
					else if (goog$isString(l)) l =
						goog$html$SafeUrl$sanitize(l).getTypedStringValue();
					else throw Error('Attribute "' + p + '" on tag "' + n + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + l + '" given.');
				}
				l.implementsGoogStringTypedString && (l = l.getTypedStringValue());
				goog$asserts$assert(goog$isString(l) || goog$isNumber(l), "String or number value expected, got " + typeof l + " with value: " + l);
				p = p + '="' + goog$string$htmlEscape(String(l)) + '"';
				k += " " + p
			}
		}
	f = k;
	e += f;
	null == c ? c = [] : goog$isArray(c) || (c = [c]);
	!0 === goog$dom$tags$VOID_TAGS_[a.toLowerCase()] ?
		(goog$asserts$assert(!c.length, "Void tag <" + a + "> does not allow content."), e += ">") : (d = goog$html$SafeHtml$concat(c), e += ">" + goog$html$SafeHtml$unwrap(d) + "</" + a + ">", d = d.getDirection());
	(a = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(a) ? 0 : null);
	return goog$html$SafeHtml$createSafeHtmlSecurityPrivateDoNotAccessOrElse(e, d)
};
goog$html$SafeHtml$createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", 0);
goog$html$SafeHtml$createSafeHtmlSecurityPrivateDoNotAccessOrElse("", 0);
goog$html$SafeHtml$createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>", 0);
var goog$html$uncheckedconversions$safeHtmlFromStringKnownToSatisfyTypeContract = function(a, b, c) {
	goog$asserts$assertString(goog$string$Const$unwrap(a), "must provide justification");
	goog$asserts$assert(!/^[\s\xa0]*$/.test(goog$string$Const$unwrap(a)), "must provide non-empty justification");
	return goog$html$SafeHtml$createSafeHtmlSecurityPrivateDoNotAccessOrElse(b, c || null)
};
var goog$reflect$sinkValue = function(a) {
	goog$reflect$sinkValue[" "](a);
	return a
};
goog$reflect$sinkValue[" "] = goog$nullFunction;
var goog$reflect$canAccessProperty = function(a, b) {
		try {
			return goog$reflect$sinkValue(a[b]), !0
		} catch (c) {}
		return !1
	},
	goog$reflect$cache = function(a, b, c, d) {
		d = d ? d(b) : b;
		return Object.prototype.hasOwnProperty.call(a, d) ? a[d] : a[d] = c(b)
	};
var goog$userAgent$OPERA = goog$labs$userAgent$util$matchUserAgent("Opera"),
	goog$userAgent$IE = goog$labs$userAgent$util$matchUserAgent("Trident") || goog$labs$userAgent$util$matchUserAgent("MSIE"),
	goog$userAgent$EDGE = goog$labs$userAgent$util$matchUserAgent("Edge"),
	goog$userAgent$GECKO = goog$labs$userAgent$util$matchUserAgent("Gecko") && !(goog$labs$userAgent$util$matchUserAgentIgnoreCase("WebKit") && !goog$labs$userAgent$util$matchUserAgent("Edge")) && !(goog$labs$userAgent$util$matchUserAgent("Trident") || goog$labs$userAgent$util$matchUserAgent("MSIE")) &&
	!goog$labs$userAgent$util$matchUserAgent("Edge"),
	goog$userAgent$WEBKIT = goog$labs$userAgent$util$matchUserAgentIgnoreCase("WebKit") && !goog$labs$userAgent$util$matchUserAgent("Edge"),
	goog$userAgent$getVersionRegexResult_ = function() {
		var a = goog$labs$userAgent$util$userAgent_;
		if (goog$userAgent$GECKO) return /rv\:([^\);]+)(\)|;)/.exec(a);
		if (goog$userAgent$EDGE) return /Edge\/([\d\.]+)/.exec(a);
		if (goog$userAgent$IE) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
		if (goog$userAgent$WEBKIT) return /WebKit\/(\S+)/.exec(a);
		if (goog$userAgent$OPERA) return /(?:Version)[ \/]?(\S+)/.exec(a)
	},
	goog$userAgent$getDocumentMode_ = function() {
		var a = goog$global.document;
		return a ? a.documentMode : void 0
	},
	JSCompiler_inline_result$jscomp$21;
a: {
	var version$jscomp$inline_142 = "",
		arr$jscomp$inline_143 = goog$userAgent$getVersionRegexResult_();arr$jscomp$inline_143 && (version$jscomp$inline_142 = arr$jscomp$inline_143 ? arr$jscomp$inline_143[1] : "");
	if (goog$userAgent$IE) {
		var docMode$jscomp$inline_144 = goog$userAgent$getDocumentMode_();
		if (null != docMode$jscomp$inline_144 && docMode$jscomp$inline_144 > parseFloat(version$jscomp$inline_142)) {
			JSCompiler_inline_result$jscomp$21 = String(docMode$jscomp$inline_144);
			break a
		}
	}
	JSCompiler_inline_result$jscomp$21 = version$jscomp$inline_142
}
var goog$userAgent$VERSION = JSCompiler_inline_result$jscomp$21,
	goog$userAgent$isVersionOrHigherCache_ = {},
	goog$userAgent$isVersionOrHigher = function(a) {
		return goog$reflect$cache(goog$userAgent$isVersionOrHigherCache_, a, function() {
			var b, c = a,
				d = 0;
			b = goog$string$trim(String(goog$userAgent$VERSION)).split(".");
			for (var c = goog$string$trim(String(c)).split("."), e = Math.max(b.length, c.length), f = 0; 0 == d && f < e; f++) {
				var g = b[f] || "",
					h = c[f] || "";
				do {
					g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
					h = /(\d*)(\D*)(.*)/.exec(h) || ["",
						"", "", ""
					];
					if (0 == g[0].length && 0 == h[0].length) break;
					var d = 0 == g[1].length ? 0 : parseInt(g[1], 10),
						k = 0 == h[1].length ? 0 : parseInt(h[1], 10),
						d = goog$string$compareElements_(d, k) || goog$string$compareElements_(0 == g[2].length, 0 == h[2].length) || goog$string$compareElements_(g[2], h[2]),
						g = g[3],
						h = h[3]
				} while (0 == d)
			}
			b = d;
			return 0 <= b
		})
	},
	JSCompiler_inline_result$jscomp$22;
var doc$jscomp$inline_146 = goog$global.document,
	mode$jscomp$inline_147 = goog$userAgent$getDocumentMode_();
JSCompiler_inline_result$jscomp$22 = doc$jscomp$inline_146 && goog$userAgent$IE ? mode$jscomp$inline_147 || ("CSS1Compat" == doc$jscomp$inline_146.compatMode ? parseInt(goog$userAgent$VERSION, 10) : 5) : void 0;
var goog$userAgent$DOCUMENT_MODE = JSCompiler_inline_result$jscomp$22;
var goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES = !goog$userAgent$IE || 9 <= Number(goog$userAgent$DOCUMENT_MODE),
	goog$dom$BrowserFeature$CAN_USE_CHILDREN_ATTRIBUTE = !goog$userAgent$GECKO && !goog$userAgent$IE || goog$userAgent$IE && 9 <= Number(goog$userAgent$DOCUMENT_MODE) || goog$userAgent$GECKO && goog$userAgent$isVersionOrHigher("1.9.1"),
	goog$dom$BrowserFeature$CAN_USE_INNER_TEXT = goog$userAgent$IE && !goog$userAgent$isVersionOrHigher("9");
var goog$dom$safe$SET_INNER_HTML_DISALLOWED_TAGS_ = {
	MATH: !0,
	SCRIPT: !0,
	STYLE: !0,
	SVG: !0,
	TEMPLATE: !0
};
var goog$dom$getDomHelper = function(a) {
		return a ? new goog$dom$DomHelper(goog$dom$getOwnerDocument(a)) : goog$dom$defaultDomHelper_ || (goog$dom$defaultDomHelper_ = new goog$dom$DomHelper)
	},
	goog$dom$getElement = function(a) {
		return goog$isString(a) ? document.getElementById(a) : a
	},
	goog$dom$getElementsByTagName = function(a, b) {
		b = b || document;
		return b.getElementsByTagName(String(a))
	},
	goog$dom$getElementsByClass = function(a, b) {
		var c = b || document;
		return c.querySelectorAll && c.querySelector ? c.querySelectorAll("." + a) : goog$dom$getElementsByTagNameAndClass_(document,
			"*", a, b)
	},
	goog$dom$getElementByClass = function(a, b) {
		var c = b || document;
		return (a = c.getElementsByClassName ? c.getElementsByClassName(a)[0] : c.querySelectorAll && c.querySelector ? c.querySelector("." + a) : goog$dom$getElementsByTagNameAndClass_(document, "*", a, b)[0]) || null
	},
	goog$dom$getElementsByTagNameAndClass_ = function(a, b, c, d) {
		a = d || a;
		b = b && "*" != b ? String(b).toUpperCase() : "";
		if (a.querySelectorAll && a.querySelector && (b || c)) return c = b + (c ? "." + c : ""), a.querySelectorAll(c);
		if (c && a.getElementsByClassName) {
			a = a.getElementsByClassName(c);
			if (b) {
				d = {};
				for (var e = 0, f = 0, g; g = a[f]; f++) b == g.nodeName && (d[e++] = g);
				d.length = e;
				return d
			}
			return a
		}
		a = a.getElementsByTagName(b || "*");
		if (c) {
			d = {};
			for (f = e = 0; g = a[f]; f++) b = g.className, "function" == typeof b.split && goog$array$contains(b.split(/\s+/), c) && (d[e++] = g);
			d.length = e;
			return d
		}
		return a
	},
	goog$dom$setProperties = function(a, b) {
		goog$object$forEach(b, function(b, d) {
			"style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : goog$dom$DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(d) ? a.setAttribute(goog$dom$DIRECT_ATTRIBUTE_MAP_[d],
				b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
		})
	},
	goog$dom$DIRECT_ATTRIBUTE_MAP_ = {
		cellpadding: "cellPadding",
		cellspacing: "cellSpacing",
		colspan: "colSpan",
		frameborder: "frameBorder",
		height: "height",
		maxlength: "maxLength",
		nonce: "nonce",
		role: "role",
		rowspan: "rowSpan",
		type: "type",
		usemap: "useMap",
		valign: "vAlign",
		width: "width"
	},
	goog$dom$createDom = function(a, b, c) {
		return goog$dom$createDom_(document, arguments)
	},
	goog$dom$createDom_ = function(a, b) {
		var c = String(b[0]),
			d = b[1];
		if (!goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
			c = ["<", c];
			d.name && c.push(' name="', goog$string$htmlEscape(d.name), '"');
			if (d.type) {
				c.push(' type="', goog$string$htmlEscape(d.type), '"');
				var e = {};
				goog$object$extend(e, d);
				delete e.type;
				d = e
			}
			c.push(">");
			c = c.join("")
		}
		c = a.createElement(c);
		d && (goog$isString(d) ? c.className = d : goog$isArray(d) ? c.className = d.join(" ") : goog$dom$setProperties(c, d));
		2 < b.length && goog$dom$append_(a, c, b, 2);
		return c
	},
	goog$dom$append_ = function(a, b, c, d) {
		function e(c) {
			c &&
				b.appendChild(goog$isString(c) ? a.createTextNode(c) : c)
		}
		for (; d < c.length; d++) {
			var f = c[d];
			!goog$isArrayLike(f) || goog$isObject(f) && 0 < f.nodeType ? e(f) : goog$array$forEach(goog$dom$isNodeList(f) ? goog$array$toArray(f) : f, e)
		}
	},
	goog$dom$canHaveChildren = function(a) {
		if (1 != a.nodeType) return !1;
		switch (a.tagName) {
			case "APPLET":
			case "AREA":
			case "BASE":
			case "BR":
			case "COL":
			case "COMMAND":
			case "EMBED":
			case "FRAME":
			case "HR":
			case "IMG":
			case "INPUT":
			case "IFRAME":
			case "ISINDEX":
			case "KEYGEN":
			case "LINK":
			case "NOFRAMES":
			case "NOSCRIPT":
			case "META":
			case "OBJECT":
			case "PARAM":
			case "SCRIPT":
			case "SOURCE":
			case "STYLE":
			case "TRACK":
			case "WBR":
				return !1
		}
		return !0
	},
	goog$dom$appendChild = function(a, b) {
		a.appendChild(b)
	},
	goog$dom$append = function(a, b) {
		goog$dom$append_(goog$dom$getOwnerDocument(a), a, arguments, 1)
	},
	goog$dom$removeChildren = function(a) {
		for (var b; b = a.firstChild;) a.removeChild(b)
	},
	goog$dom$removeNode = function(a) {
		return a && a.parentNode ? a.parentNode.removeChild(a) : null
	},
	goog$dom$getChildren = function(a) {
		return goog$dom$BrowserFeature$CAN_USE_CHILDREN_ATTRIBUTE && void 0 != a.children ? a.children : goog$array$filter(a.childNodes, function(a) {
			return 1 == a.nodeType
		})
	},
	goog$dom$getFirstElementChild = function(a) {
		return goog$isDef(a.firstElementChild) ? a.firstElementChild : goog$dom$getNextElementNode_(a.firstChild, !0)
	},
	goog$dom$getNextElementNode_ = function(a, b) {
		for (; a && 1 != a.nodeType;) a = b ? a.nextSibling : a.previousSibling;
		return a
	},
	goog$dom$contains = function(a, b) {
		if (!a || !b) return !1;
		if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
		if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
		for (; b && a != b;) b = b.parentNode;
		return b ==
			a
	},
	goog$dom$getOwnerDocument = function(a) {
		goog$asserts$assert(a, "Node cannot be null or undefined.");
		return 9 == a.nodeType ? a : a.ownerDocument || a.document
	},
	goog$dom$getFrameContentDocument = function(a) {
		return a.contentDocument || a.contentWindow.document
	},
	goog$dom$TAGS_TO_IGNORE_ = {
		SCRIPT: 1,
		STYLE: 1,
		HEAD: 1,
		IFRAME: 1,
		OBJECT: 1
	},
	goog$dom$PREDEFINED_TAG_VALUES_ = {
		IMG: " ",
		BR: "\n"
	},
	goog$dom$getTextContent_ = function(a, b, c) {
		if (!(a.nodeName in goog$dom$TAGS_TO_IGNORE_))
			if (3 == a.nodeType) c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,
				"")) : b.push(a.nodeValue);
			else if (a.nodeName in goog$dom$PREDEFINED_TAG_VALUES_) b.push(goog$dom$PREDEFINED_TAG_VALUES_[a.nodeName]);
		else
			for (a = a.firstChild; a;) goog$dom$getTextContent_(a, b, c), a = a.nextSibling
	},
	goog$dom$isNodeList = function(a) {
		if (a && "number" == typeof a.length) {
			if (goog$isObject(a)) return "function" == typeof a.item || "string" == typeof a.item;
			if (goog$isFunction(a)) return "function" == typeof a.item
		}
		return !1
	},
	goog$dom$getAncestorByTagNameAndClass = function(a, b, c, d) {
		if (!b && !c) return null;
		var e = b ? String(b).toUpperCase() :
			null;
		return goog$dom$getAncestor(a, function(a) {
			return (!e || a.nodeName == e) && (!c || goog$isString(a.className) && goog$array$contains(a.className.split(/\s+/), c))
		}, !0, d)
	},
	goog$dom$getAncestor = function(a, b, c, d) {
		a && !c && (a = a.parentNode);
		for (c = 0; a && (null == d || c <= d);) {
			goog$asserts$assert("parentNode" != a.name);
			if (b(a)) return a;
			a = a.parentNode;
			c++
		}
		return null
	},
	goog$dom$DomHelper = function(a) {
		this.document_ = a || goog$global.document || document
	};
goog$dom$DomHelper.prototype.getElement = function(a) {
	return goog$isString(a) ? this.document_.getElementById(a) : a
};
goog$dom$DomHelper.prototype.getElementsByTagName = function(a, b) {
	b = b || this.document_;
	return b.getElementsByTagName(String(a))
};
goog$dom$DomHelper.prototype.createDom = function(a, b, c) {
	return goog$dom$createDom_(this.document_, arguments)
};
goog$dom$DomHelper.prototype.createElement = function(a) {
	return this.document_.createElement(String(a))
};
goog$dom$DomHelper.prototype.createTextNode = function(a) {
	return this.document_.createTextNode(String(a))
};
goog$dom$DomHelper.prototype.appendChild = goog$dom$appendChild;
goog$dom$DomHelper.prototype.append = goog$dom$append;
goog$dom$DomHelper.prototype.canHaveChildren = goog$dom$canHaveChildren;
goog$dom$DomHelper.prototype.removeNode = goog$dom$removeNode;
goog$dom$DomHelper.prototype.getChildren = goog$dom$getChildren;
goog$dom$DomHelper.prototype.contains = goog$dom$contains;
var goog$debug$entryPointRegistry$monitors_ = [],
	goog$debug$entryPointRegistry$monitorsMayExist_ = !1,
	goog$debug$entryPointRegistry$register = function(a) {
		if (goog$debug$entryPointRegistry$monitorsMayExist_)
			for (var b = 0; b < goog$debug$entryPointRegistry$monitors_.length; b++) a(goog$bind(goog$debug$entryPointRegistry$monitors_[b].wrap, goog$debug$entryPointRegistry$monitors_[b]))
	};
var goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT = !goog$userAgent$IE || 9 <= Number(goog$userAgent$DOCUMENT_MODE),
	goog$events$BrowserFeature$SET_KEY_CODE_TO_PREVENT_DEFAULT = goog$userAgent$IE && !goog$userAgent$isVersionOrHigher("9");
!goog$userAgent$WEBKIT || goog$userAgent$isVersionOrHigher("528");
goog$userAgent$GECKO && goog$userAgent$isVersionOrHigher("1.9b") || goog$userAgent$IE && goog$userAgent$isVersionOrHigher("8") || goog$userAgent$OPERA && goog$userAgent$isVersionOrHigher("9.5") || goog$userAgent$WEBKIT && goog$userAgent$isVersionOrHigher("528");
goog$userAgent$GECKO && !goog$userAgent$isVersionOrHigher("8") || goog$userAgent$IE && goog$userAgent$isVersionOrHigher("9");
var goog$Disposable = function() {
	this.disposed_ = this.disposed_;
	this.onDisposeCallbacks_ = this.onDisposeCallbacks_
};
goog$Disposable.prototype.disposed_ = !1;
goog$Disposable.prototype.dispose = function() {
	this.disposed_ || (this.disposed_ = !0, this.disposeInternal())
};
goog$Disposable.prototype.registerDisposable = function(a) {
	this.addOnDisposeCallback(goog$partial(goog$dispose, a))
};
goog$Disposable.prototype.addOnDisposeCallback = function(a, b) {
	this.disposed_ ? goog$isDef(b) ? a.call(b) : a() : (this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []), this.onDisposeCallbacks_.push(goog$isDef(b) ? goog$bind(a, b) : a))
};
goog$Disposable.prototype.disposeInternal = function() {
	if (this.onDisposeCallbacks_)
		for (; this.onDisposeCallbacks_.length;) this.onDisposeCallbacks_.shift()()
};
var goog$dispose = function(a) {
	a && "function" == typeof a.dispose && a.dispose()
};
var goog$events$EventId = function(a) {
	this.id = a
};
goog$events$EventId.prototype.toString = function() {
	return this.id
};
var goog$events$Event = function(a, b) {
	this.type = a instanceof goog$events$EventId ? String(a) : a;
	this.currentTarget = this.target = b;
	this.defaultPrevented = this.propagationStopped_ = !1;
	this.returnValue_ = !0
};
goog$events$Event.prototype.stopPropagation = function() {
	this.propagationStopped_ = !0
};
goog$events$Event.prototype.preventDefault = function() {
	this.defaultPrevented = !0;
	this.returnValue_ = !1
};
var goog$events$BrowserEvent = function(a, b) {
	goog$events$Event.call(this, a ? a.type : "");
	this.relatedTarget = this.currentTarget = this.target = null;
	this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
	this.key = "";
	this.charCode = this.keyCode = 0;
	this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
	this.event_ = this.state = null;
	a && this.init(a, b)
};
goog$inherits(goog$events$BrowserEvent, goog$events$Event);
goog$events$BrowserEvent.prototype.init = function(a, b) {
	var c = this.type = a.type,
		d = a.changedTouches ? a.changedTouches[0] : null;
	this.target = a.target || a.srcElement;
	this.currentTarget = b;
	(b = a.relatedTarget) ? goog$userAgent$GECKO && (goog$reflect$canAccessProperty(b, "nodeName") || (b = null)): "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
	this.relatedTarget = b;
	null !== d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY =
		d.screenY || 0) : (this.offsetX = goog$userAgent$WEBKIT || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY = goog$userAgent$WEBKIT || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
	this.button = a.button;
	this.keyCode = a.keyCode || 0;
	this.key = a.key || "";
	this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
	this.ctrlKey = a.ctrlKey;
	this.altKey = a.altKey;
	this.shiftKey = a.shiftKey;
	this.metaKey = a.metaKey;
	this.state = a.state;
	this.event_ = a;
	a.defaultPrevented && this.preventDefault()
};
goog$events$BrowserEvent.prototype.stopPropagation = function() {
	goog$events$BrowserEvent.superClass_.stopPropagation.call(this);
	this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
};
goog$events$BrowserEvent.prototype.preventDefault = function() {
	goog$events$BrowserEvent.superClass_.preventDefault.call(this);
	var a = this.event_;
	if (a.preventDefault) a.preventDefault();
	else if (a.returnValue = !1, goog$events$BrowserFeature$SET_KEY_CODE_TO_PREVENT_DEFAULT) try {
		if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
	} catch (b) {}
};
var goog$events$Listenable$IMPLEMENTED_BY_PROP = "closure_listenable_" + (1E6 * Math.random() | 0),
	goog$events$Listenable$isImplementedBy = function(a) {
		return !(!a || !a[goog$events$Listenable$IMPLEMENTED_BY_PROP])
	},
	goog$events$ListenableKey$counter_ = 0;
var goog$events$Listener = function(a, b, c, d, e, f) {
	this.listener = a;
	this.proxy = b;
	this.src = c;
	this.type = d;
	this.capture = !!e;
	this.handler = f;
	this.key = ++goog$events$ListenableKey$counter_;
	this.removed = this.callOnce = !1
};
goog$events$Listener.prototype.markAsRemoved = function() {
	this.removed = !0;
	this.handler = this.src = this.proxy = this.listener = null
};
var goog$events$ListenerMap = function(a) {
	this.src = a;
	this.listeners = {};
	this.typeCount_ = 0
};
goog$events$ListenerMap.prototype.add = function(a, b, c, d, e) {
	var f = a.toString();
	a = this.listeners[f];
	a || (a = this.listeners[f] = [], this.typeCount_++);
	var g = goog$events$ListenerMap$findListenerIndex_(a, b, d, e); - 1 < g ? (b = a[g], c || (b.callOnce = !1)) : (b = new goog$events$Listener(b, null, this.src, f, !!d, e), b.callOnce = c, a.push(b));
	return b
};
goog$events$ListenerMap.prototype.remove = function(a, b, c, d) {
	a = a.toString();
	if (!(a in this.listeners)) return !1;
	var e = this.listeners[a];
	b = goog$events$ListenerMap$findListenerIndex_(e, b, c, d);
	return -1 < b ? (c = e[b], c.markAsRemoved(), goog$array$removeAt(e, b), 0 == e.length && (delete this.listeners[a], this.typeCount_--), !0) : !1
};
goog$events$ListenerMap.prototype.removeByKey = function(a) {
	var b = a.type;
	if (!(b in this.listeners)) return !1;
	var c = goog$array$remove(this.listeners[b], a);
	c && (a.markAsRemoved(), 0 == this.listeners[b].length && (delete this.listeners[b], this.typeCount_--));
	return c
};
goog$events$ListenerMap.prototype.removeAll = function(a) {
	a = a && a.toString();
	var b = 0,
		c;
	for (c in this.listeners)
		if (!a || c == a) {
			for (var d = this.listeners[c], e = 0; e < d.length; e++) ++b, d[e].markAsRemoved();
			delete this.listeners[c];
			this.typeCount_--
		}
	return b
};
goog$events$ListenerMap.prototype.getListener = function(a, b, c, d) {
	a = this.listeners[a.toString()];
	var e = -1;
	a && (e = goog$events$ListenerMap$findListenerIndex_(a, b, c, d));
	return -1 < e ? a[e] : null
};
goog$events$ListenerMap.prototype.hasListener = function(a, b) {
	var c = goog$isDef(a),
		d = c ? a.toString() : "",
		e = goog$isDef(b);
	return goog$object$some(this.listeners, function(a) {
		for (var f = 0; f < a.length; ++f)
			if (!(c && a[f].type != d || e && a[f].capture != b)) return !0;
		return !1
	})
};
var goog$events$ListenerMap$findListenerIndex_ = function(a, b, c, d) {
	for (var e = 0; e < a.length; ++e) {
		var f = a[e];
		if (!f.removed && f.listener == b && f.capture == !!c && f.handler == d) return e
	}
	return -1
};
var goog$events$LISTENER_MAP_PROP_ = "closure_lm_" + (1E6 * Math.random() | 0),
	goog$events$onStringMap_ = {},
	goog$events$listenerCountEstimate_ = 0,
	goog$events$listen = function(a, b, c, d, e) {
		if (goog$isArray(b)) {
			for (var f = 0; f < b.length; f++) goog$events$listen(a, b[f], c, d, e);
			return null
		}
		c = goog$events$wrapListener(c);
		return goog$events$Listenable$isImplementedBy(a) ? a.listen(b, c, d, e) : goog$events$listen_(a, b, c, !1, d, e)
	},
	goog$events$listen_ = function(a, b, c, d, e, f) {
		if (!b) throw Error("Invalid event type");
		var g = !!e,
			h = goog$events$getListenerMap_(a);
		h || (a[goog$events$LISTENER_MAP_PROP_] = h = new goog$events$ListenerMap(a));
		c = h.add(b, c, d, e, f);
		if (c.proxy) return c;
		d = goog$events$getProxy();
		c.proxy = d;
		d.src = a;
		d.listener = c;
		if (a.addEventListener) a.addEventListener(b.toString(), d, g);
		else if (a.attachEvent) a.attachEvent(goog$events$getOnString_(b.toString()), d);
		else throw Error("addEventListener and attachEvent are unavailable.");
		goog$events$listenerCountEstimate_++;
		return c
	},
	goog$events$getProxy = function() {
		var a = goog$events$handleBrowserEvent_,
			b = goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT ?
			function(c) {
				return a.call(b.src, b.listener, c)
			} : function(c) {
				c = a.call(b.src, b.listener, c);
				if (!c) return c
			};
		return b
	},
	goog$events$listenOnce = function(a, b, c, d, e) {
		if (goog$isArray(b)) {
			for (var f = 0; f < b.length; f++) goog$events$listenOnce(a, b[f], c, d, e);
			return null
		}
		c = goog$events$wrapListener(c);
		return goog$events$Listenable$isImplementedBy(a) ? a.listenOnce(b, c, d, e) : goog$events$listen_(a, b, c, !0, d, e)
	},
	goog$events$unlisten = function(a, b, c, d, e) {
		if (goog$isArray(b)) {
			for (var f = 0; f < b.length; f++) goog$events$unlisten(a, b[f],
				c, d, e);
			return null
		}
		c = goog$events$wrapListener(c);
		if (goog$events$Listenable$isImplementedBy(a)) return a.unlisten(b, c, d, e);
		if (!a) return !1;
		d = !!d;
		if (a = goog$events$getListenerMap_(a))
			if (b = a.getListener(b, c, d, e)) return goog$events$unlistenByKey(b);
		return !1
	},
	goog$events$unlistenByKey = function(a) {
		if (goog$isNumber(a) || !a || a.removed) return !1;
		var b = a.src;
		if (goog$events$Listenable$isImplementedBy(b)) return b.unlistenByKey(a);
		var c = a.type,
			d = a.proxy;
		b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent &&
			b.detachEvent(goog$events$getOnString_(c), d);
		goog$events$listenerCountEstimate_--;
		(c = goog$events$getListenerMap_(b)) ? (c.removeByKey(a), 0 == c.typeCount_ && (c.src = null, b[goog$events$LISTENER_MAP_PROP_] = null)) : a.markAsRemoved();
		return !0
	},
	goog$events$removeAll = function(a, b) {
		if (!a) return 0;
		if (goog$events$Listenable$isImplementedBy(a)) return a.removeAllListeners(b);
		a = goog$events$getListenerMap_(a);
		if (!a) return 0;
		var c = 0;
		b = b && b.toString();
		for (var d in a.listeners)
			if (!b || d == b)
				for (var e = a.listeners[d].concat(),
						f = 0; f < e.length; ++f) goog$events$unlistenByKey(e[f]) && ++c;
		return c
	},
	goog$events$getOnString_ = function(a) {
		return a in goog$events$onStringMap_ ? goog$events$onStringMap_[a] : goog$events$onStringMap_[a] = "on" + a
	},
	goog$events$fireListeners_ = function(a, b, c, d) {
		var e = !0;
		if (a = goog$events$getListenerMap_(a))
			if (b = a.listeners[b.toString()])
				for (b = b.concat(), a = 0; a < b.length; a++) {
					var f = b[a];
					f && f.capture == c && !f.removed && (f = goog$events$fireListener(f, d), e = e && !1 !== f)
				}
			return e
	},
	goog$events$fireListener = function(a, b) {
		var c =
			a.listener,
			d = a.handler || a.src;
		a.callOnce && goog$events$unlistenByKey(a);
		return c.call(d, b)
	},
	goog$events$handleBrowserEvent_ = function(a, b) {
		if (a.removed) return !0;
		if (!goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT) {
			var c = b || goog$getObjectByName("window.event");
			b = new goog$events$BrowserEvent(c, this);
			var d = !0;
			if (!(0 > c.keyCode || void 0 != c.returnValue)) {
				a: {
					var e = !1;
					if (0 == c.keyCode) try {
						c.keyCode = -1;
						break a
					} catch (g) {
						e = !0
					}
					if (e || void 0 == c.returnValue) c.returnValue = !0
				}
				c = [];
				for (e = b.currentTarget; e; e = e.parentNode) c.push(e);
				a = a.type;
				for (e = c.length - 1; !b.propagationStopped_ && 0 <= e; e--) {
					b.currentTarget = c[e];
					var f = goog$events$fireListeners_(c[e], a, !0, b),
						d = d && f
				}
				for (e = 0; !b.propagationStopped_ && e < c.length; e++) b.currentTarget = c[e],
				f = goog$events$fireListeners_(c[e], a, !1, b),
				d = d && f
			}
			return d
		}
		return goog$events$fireListener(a, new goog$events$BrowserEvent(b, this))
	},
	goog$events$getListenerMap_ = function(a) {
		a = a[goog$events$LISTENER_MAP_PROP_];
		return a instanceof goog$events$ListenerMap ? a : null
	},
	goog$events$LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" +
	(1E9 * Math.random() >>> 0),
	goog$events$wrapListener = function(a) {
		goog$asserts$assert(a, "Listener can not be null.");
		if (goog$isFunction(a)) return a;
		goog$asserts$assert(a.handleEvent, "An object listener must have handleEvent method.");
		a[goog$events$LISTENER_WRAPPER_PROP_] || (a[goog$events$LISTENER_WRAPPER_PROP_] = function(b) {
			return a.handleEvent(b)
		});
		return a[goog$events$LISTENER_WRAPPER_PROP_]
	};
goog$debug$entryPointRegistry$register(function(a) {
	goog$events$handleBrowserEvent_ = a(goog$events$handleBrowserEvent_)
});
var goog$events$EventHandler = function(a) {
	goog$Disposable.call(this);
	this.handler_ = a;
	this.keys_ = {}
};
goog$inherits(goog$events$EventHandler, goog$Disposable);
var goog$events$EventHandler$typeArray_ = [];
goog$events$EventHandler.prototype.listen = function(a, b, c, d) {
	return this.listen_(a, b, c, d)
};
goog$events$EventHandler.prototype.listen_ = function(a, b, c, d, e) {
	goog$isArray(b) || (b && (goog$events$EventHandler$typeArray_[0] = b.toString()), b = goog$events$EventHandler$typeArray_);
	for (var f = 0; f < b.length; f++) {
		var g = goog$events$listen(a, b[f], c || this.handleEvent, d || !1, e || this.handler_ || this);
		if (!g) break;
		var h = g.key;
		this.keys_[h] = g
	}
	return this
};
goog$events$EventHandler.prototype.listenOnce = function(a, b, c, d) {
	return this.listenOnce_(a, b, c, d)
};
goog$events$EventHandler.prototype.listenOnce_ = function(a, b, c, d, e) {
	if (goog$isArray(b))
		for (var f = 0; f < b.length; f++) this.listenOnce_(a, b[f], c, d, e);
	else {
		a = goog$events$listenOnce(a, b, c || this.handleEvent, d, e || this.handler_ || this);
		if (!a) return this;
		b = a.key;
		this.keys_[b] = a
	}
	return this
};
goog$events$EventHandler.prototype.unlisten = function(a, b, c, d, e) {
	if (goog$isArray(b))
		for (var f = 0; f < b.length; f++) this.unlisten(a, b[f], c, d, e);
	else c = c || this.handleEvent, e = e || this.handler_ || this, c = goog$events$wrapListener(c), d = !!d, e = goog$events$Listenable$isImplementedBy(a) ? a.getListener(b, c, d, e) : a ? (a = goog$events$getListenerMap_(a)) ? a.getListener(b, c, d, e) : null : null, e && (goog$events$unlistenByKey(e), delete this.keys_[e.key]);
	return this
};
goog$events$EventHandler.prototype.removeAll = function() {
	goog$object$forEach(this.keys_, function(a, b) {
		this.keys_.hasOwnProperty(b) && goog$events$unlistenByKey(a)
	}, this);
	this.keys_ = {}
};
goog$events$EventHandler.prototype.disposeInternal = function() {
	goog$events$EventHandler.superClass_.disposeInternal.call(this);
	this.removeAll()
};
goog$events$EventHandler.prototype.handleEvent = function() {
	throw Error("EventHandler.handleEvent not implemented");
};
var goog$events$EventTarget = function() {
	goog$Disposable.call(this);
	this.eventTargetListeners_ = new goog$events$ListenerMap(this);
	this.actualEventTarget_ = this;
	this.parentEventTarget_ = null
};
goog$inherits(goog$events$EventTarget, goog$Disposable);
goog$events$EventTarget.prototype[goog$events$Listenable$IMPLEMENTED_BY_PROP] = !0;
goog$events$EventTarget.prototype.setParentEventTarget = function(a) {
	this.parentEventTarget_ = a
};
goog$events$EventTarget.prototype.addEventListener = function(a, b, c, d) {
	goog$events$listen(this, a, b, c, d)
};
goog$events$EventTarget.prototype.removeEventListener = function(a, b, c, d) {
	goog$events$unlisten(this, a, b, c, d)
};
goog$events$EventTarget.prototype.dispatchEvent = function(a) {
	this.assertInitialized_();
	var b, c = this.parentEventTarget_;
	if (c) {
		b = [];
		for (var d = 1; c; c = c.parentEventTarget_) b.push(c), goog$asserts$assert(1E3 > ++d, "infinite loop")
	}
	c = this.actualEventTarget_;
	d = a.type || a;
	if (goog$isString(a)) a = new goog$events$Event(a, c);
	else if (a instanceof goog$events$Event) a.target = a.target || c;
	else {
		var e = a;
		a = new goog$events$Event(d, c);
		goog$object$extend(a, e)
	}
	var e = !0,
		f;
	if (b)
		for (var g = b.length - 1; !a.propagationStopped_ && 0 <= g; g--) f =
			a.currentTarget = b[g], e = f.fireListeners(d, !0, a) && e;
	a.propagationStopped_ || (f = a.currentTarget = c, e = f.fireListeners(d, !0, a) && e, a.propagationStopped_ || (e = f.fireListeners(d, !1, a) && e));
	if (b)
		for (g = 0; !a.propagationStopped_ && g < b.length; g++) f = a.currentTarget = b[g], e = f.fireListeners(d, !1, a) && e;
	return c = e
};
goog$events$EventTarget.prototype.disposeInternal = function() {
	goog$events$EventTarget.superClass_.disposeInternal.call(this);
	this.removeAllListeners();
	this.parentEventTarget_ = null
};
goog$events$EventTarget.prototype.listen = function(a, b, c, d) {
	this.assertInitialized_();
	return this.eventTargetListeners_.add(String(a), b, !1, c, d)
};
goog$events$EventTarget.prototype.listenOnce = function(a, b, c, d) {
	return this.eventTargetListeners_.add(String(a), b, !0, c, d)
};
goog$events$EventTarget.prototype.unlisten = function(a, b, c, d) {
	return this.eventTargetListeners_.remove(String(a), b, c, d)
};
goog$events$EventTarget.prototype.unlistenByKey = function(a) {
	return this.eventTargetListeners_.removeByKey(a)
};
goog$events$EventTarget.prototype.removeAllListeners = function(a) {
	return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(a) : 0
};
goog$events$EventTarget.prototype.fireListeners = function(a, b, c) {
	a = this.eventTargetListeners_.listeners[String(a)];
	if (!a) return !0;
	a = a.concat();
	for (var d = !0, e = 0; e < a.length; ++e) {
		var f = a[e];
		if (f && !f.removed && f.capture == b) {
			var g = f.listener,
				h = f.handler || f.src;
			f.callOnce && this.unlistenByKey(f);
			d = !1 !== g.call(h, c) && d
		}
	}
	return d && 0 != c.returnValue_
};
goog$events$EventTarget.prototype.getListener = function(a, b, c, d) {
	return this.eventTargetListeners_.getListener(String(a), b, c, d)
};
goog$events$EventTarget.prototype.hasListener = function(a, b) {
	a = goog$isDef(a) ? String(a) : void 0;
	return this.eventTargetListeners_.hasListener(a, b)
};
goog$events$EventTarget.prototype.assertInitialized_ = function() {
	goog$asserts$assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
};
var goog$labs$userAgent$device$isMobile = function() {
	return !(goog$labs$userAgent$util$matchUserAgent("iPad") || goog$labs$userAgent$util$matchUserAgent("Android") && !goog$labs$userAgent$util$matchUserAgent("Mobile") || goog$labs$userAgent$util$matchUserAgent("Silk")) && (goog$labs$userAgent$util$matchUserAgent("iPod") || goog$labs$userAgent$util$matchUserAgent("iPhone") || goog$labs$userAgent$util$matchUserAgent("Android") || goog$labs$userAgent$util$matchUserAgent("IEMobile"))
};
var goog$memoize = function(a, b) {
		var c = b || goog$memoize$simpleSerializer;
		return function() {
			var b = this || goog$global,
				b = b.closure_memoize_cache_ || (b.closure_memoize_cache_ = {}),
				e = c(a[goog$UID_PROPERTY_] || (a[goog$UID_PROPERTY_] = ++goog$uidCounter_), arguments);
			return b.hasOwnProperty(e) ? b[e] : b[e] = a.apply(this, arguments)
		}
	},
	goog$memoize$simpleSerializer = function(a, b) {
		a = [a];
		for (var c = b.length - 1; 0 <= c; --c) a.push(typeof b[c], b[c]);
		return a.join("\x0B")
	};
var goog$async$FreeList = function(a, b, c) {
	this.limit_ = c;
	this.create_ = a;
	this.reset_ = b;
	this.occupants_ = 0;
	this.head_ = null
};
goog$async$FreeList.prototype.get = function() {
	var a;
	0 < this.occupants_ ? (this.occupants_--, a = this.head_, this.head_ = a.next, a.next = null) : a = this.create_();
	return a
};
goog$async$FreeList.prototype.put = function(a) {
	this.reset_(a);
	this.occupants_ < this.limit_ && (this.occupants_++, a.next = this.head_, this.head_ = a)
};
var goog$functions$identity = function(a) {
		return a
	},
	goog$functions$error = function(a) {
		return function() {
			throw Error(a);
		}
	};
var goog$async$throwException = function(a) {
		goog$global.setTimeout(function() {
			throw a;
		}, 0)
	},
	goog$async$nextTick$setImmediate_, goog$async$nextTick$getSetImmediateEmulator_ = function() {
		var a = goog$global.MessageChannel;
		"undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !goog$labs$userAgent$util$matchUserAgent("Presto") && (a = function() {
			var a = document.createElement("IFRAME");
			a.style.display = "none";
			a.src = "";
			document.documentElement.appendChild(a);
			var b = a.contentWindow,
				a = b.document;
			a.open();
			a.write("");
			a.close();
			var c = "callImmediate" + Math.random(),
				d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
				a = goog$bind(function(a) {
					if (("*" == d || a.origin == d) && a.data == c) this.port1.onmessage()
				}, this);
			b.addEventListener("message", a, !1);
			this.port1 = {};
			this.port2 = {
				postMessage: function() {
					b.postMessage(c, d)
				}
			}
		});
		if ("undefined" !== typeof a && !goog$labs$userAgent$util$matchUserAgent("Trident") && !goog$labs$userAgent$util$matchUserAgent("MSIE")) {
			var b = new a,
				c = {},
				d =
				c;
			b.port1.onmessage = function() {
				if (goog$isDef(c.next)) {
					c = c.next;
					var a = c.cb;
					c.cb = null;
					a()
				}
			};
			return function(a) {
				d.next = {
					cb: a
				};
				d = d.next;
				b.port2.postMessage(0)
			}
		}
		return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function(a) {
			var b = document.createElement("SCRIPT");
			b.onreadystatechange = function() {
				b.onreadystatechange = null;
				b.parentNode.removeChild(b);
				b = null;
				a();
				a = null
			};
			document.documentElement.appendChild(b)
		} : function(a) {
			goog$global.setTimeout(a, 0)
		}
	},
	goog$async$nextTick$wrapCallback_ =
	goog$functions$identity;
goog$debug$entryPointRegistry$register(function(a) {
	goog$async$nextTick$wrapCallback_ = a
});
var goog$async$WorkQueue = function() {
		this.workTail_ = this.workHead_ = null
	},
	goog$async$WorkQueue$freelist_ = new goog$async$FreeList(function() {
		return new goog$async$WorkItem
	}, function(a) {
		a.reset()
	}, 100);
goog$async$WorkQueue.prototype.add = function(a, b) {
	var c = this.getUnusedItem_();
	c.set(a, b);
	this.workTail_ ? this.workTail_.next = c : (goog$asserts$assert(!this.workHead_), this.workHead_ = c);
	this.workTail_ = c
};
goog$async$WorkQueue.prototype.remove = function() {
	var a = null;
	this.workHead_ && (a = this.workHead_, this.workHead_ = this.workHead_.next, this.workHead_ || (this.workTail_ = null), a.next = null);
	return a
};
goog$async$WorkQueue.prototype.returnUnused = function(a) {
	goog$async$WorkQueue$freelist_.put(a)
};
goog$async$WorkQueue.prototype.getUnusedItem_ = function() {
	return goog$async$WorkQueue$freelist_.get()
};
var goog$async$WorkItem = function() {
	this.next = this.scope = this.fn = null
};
goog$async$WorkItem.prototype.set = function(a, b) {
	this.fn = a;
	this.scope = b;
	this.next = null
};
goog$async$WorkItem.prototype.reset = function() {
	this.next = this.scope = this.fn = null
};
var goog$async$run = function(a, b) {
		goog$async$run$schedule_ || goog$async$run$initializeRunner_();
		goog$async$run$workQueueScheduled_ || (goog$async$run$schedule_(), goog$async$run$workQueueScheduled_ = !0);
		goog$async$run$workQueue_.add(a, b)
	},
	goog$async$run$schedule_, goog$async$run$initializeRunner_ = function() {
		if (-1 != String(goog$global.Promise).indexOf("[native code]")) {
			var a = goog$global.Promise.resolve(void 0);
			goog$async$run$schedule_ = function() {
				a.then(goog$async$run$processWorkQueue)
			}
		} else goog$async$run$schedule_ =
			function() {
				var a = goog$async$run$processWorkQueue,
					a = goog$async$nextTick$wrapCallback_(a);
				!goog$isFunction(goog$global.setImmediate) || goog$global.Window && goog$global.Window.prototype && !goog$labs$userAgent$util$matchUserAgent("Edge") && goog$global.Window.prototype.setImmediate == goog$global.setImmediate ? (goog$async$nextTick$setImmediate_ || (goog$async$nextTick$setImmediate_ = goog$async$nextTick$getSetImmediateEmulator_()), goog$async$nextTick$setImmediate_(a)) : goog$global.setImmediate(a)
			}
	},
	goog$async$run$workQueueScheduled_ = !1,
	goog$async$run$workQueue_ = new goog$async$WorkQueue,
	goog$async$run$processWorkQueue = function() {
		for (var a; a = goog$async$run$workQueue_.remove();) {
			try {
				a.fn.call(a.scope)
			} catch (b) {
				goog$async$throwException(b)
			}
			goog$async$run$workQueue_.returnUnused(a)
		}
		goog$async$run$workQueueScheduled_ = !1
	};
var goog$Promise = function(a, b) {
		this.state_ = 0;
		this.result_ = void 0;
		this.callbackEntriesTail_ = this.callbackEntries_ = this.parent_ = null;
		this.hadUnhandledRejection_ = this.executing_ = !1;
		if (a != goog$nullFunction) try {
			var c = this;
			a.call(b, function(a) {
				c.resolve_(2, a)
			}, function(a) {
				if (!(a instanceof goog$Promise$CancellationError)) try {
					if (a instanceof Error) throw a;
					throw Error("Promise rejected.");
				} catch (e) {}
				c.resolve_(3, a)
			})
		} catch (d) {
			this.resolve_(3, d)
		}
	},
	goog$Promise$CallbackEntry_ = function() {
		this.next = this.context =
			this.onRejected = this.onFulfilled = this.child = null;
		this.always = !1
	};
goog$Promise$CallbackEntry_.prototype.reset = function() {
	this.context = this.onRejected = this.onFulfilled = this.child = null;
	this.always = !1
};
var goog$Promise$freelist_ = new goog$async$FreeList(function() {
		return new goog$Promise$CallbackEntry_
	}, function(a) {
		a.reset()
	}, 100),
	goog$Promise$getCallbackEntry_ = function(a, b, c) {
		var d = goog$Promise$freelist_.get();
		d.onFulfilled = a;
		d.onRejected = b;
		d.context = c;
		return d
	};
goog$Promise.prototype.then = function(a, b, c) {
	null != a && goog$asserts$assertFunction(a, "opt_onFulfilled should be a function.");
	null != b && goog$asserts$assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
	return this.addChildPromise_(goog$isFunction(a) ? a : null, goog$isFunction(b) ? b : null, c)
};
var ctor$jscomp$inline_204 = goog$Promise;
ctor$jscomp$inline_204.prototype.then = ctor$jscomp$inline_204.prototype.then;
ctor$jscomp$inline_204.prototype.$goog_Thenable = !0;
goog$Promise.prototype.thenVoid = function(a, b, c) {
	null != a && goog$asserts$assertFunction(a, "opt_onFulfilled should be a function.");
	null != b && goog$asserts$assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
	this.addCallbackEntry_(goog$Promise$getCallbackEntry_(a || goog$nullFunction, b || null, c))
};
goog$Promise.prototype.cancel = function(a) {
	0 == this.state_ && goog$async$run(function() {
		var b = new goog$Promise$CancellationError(a);
		this.cancelInternal_(b)
	}, this)
};
goog$Promise.prototype.cancelInternal_ = function(a) {
	0 == this.state_ && (this.parent_ ? (this.parent_.cancelChild_(this, a), this.parent_ = null) : this.resolve_(3, a))
};
goog$Promise.prototype.cancelChild_ = function(a, b) {
	if (this.callbackEntries_) {
		for (var c = 0, d = null, e = null, f = this.callbackEntries_; f && (f.always || (c++, f.child == a && (d = f), !(d && 1 < c))); f = f.next) d || (e = f);
		d && (0 == this.state_ && 1 == c ? this.cancelInternal_(b) : (e ? this.removeEntryAfter_(e) : this.popEntry_(), this.executeCallback_(d, 3, b)))
	}
};
goog$Promise.prototype.addCallbackEntry_ = function(a) {
	this.hasEntry_() || 2 != this.state_ && 3 != this.state_ || this.scheduleCallbacks_();
	this.queueEntry_(a)
};
goog$Promise.prototype.addChildPromise_ = function(a, b, c) {
	var d = goog$Promise$getCallbackEntry_(null, null, null);
	d.child = new goog$Promise(function(e, f) {
		d.onFulfilled = a ? function(b) {
			try {
				var d = a.call(c, b);
				e(d)
			} catch (k) {
				f(k)
			}
		} : e;
		d.onRejected = b ? function(a) {
			try {
				var d = b.call(c, a);
				!goog$isDef(d) && a instanceof goog$Promise$CancellationError ? f(a) : e(d)
			} catch (k) {
				f(k)
			}
		} : f
	});
	d.child.parent_ = this;
	this.addCallbackEntry_(d);
	return d.child
};
goog$Promise.prototype.unblockAndFulfill_ = function(a) {
	goog$asserts$assert(1 == this.state_);
	this.state_ = 0;
	this.resolve_(2, a)
};
goog$Promise.prototype.unblockAndReject_ = function(a) {
	goog$asserts$assert(1 == this.state_);
	this.state_ = 0;
	this.resolve_(3, a)
};
goog$Promise.prototype.resolve_ = function(a, b) {
	if (0 == this.state_) {
		this === b && (a = 3, b = new TypeError("Promise cannot resolve to itself"));
		this.state_ = 1;
		var c;
		a: {
			var d = b,
				e = this.unblockAndFulfill_,
				f = this.unblockAndReject_;
			if (d instanceof goog$Promise) d.thenVoid(e, f, this),
			c = !0;
			else {
				var g;
				if (d) try {
					g = !!d.$goog_Thenable
				} catch (k) {
					g = !1
				} else g = !1;
				if (g) d.then(e, f, this), c = !0;
				else {
					if (goog$isObject(d)) try {
						var h = d.then;
						if (goog$isFunction(h)) {
							goog$Promise$tryThen_(d, h, e, f, this);
							c = !0;
							break a
						}
					} catch (k) {
						f.call(this, k);
						c = !0;
						break a
					}
					c = !1
				}
			}
		}
		c || (this.result_ = b, this.state_ = a, this.parent_ = null, this.scheduleCallbacks_(), 3 != a || b instanceof goog$Promise$CancellationError || goog$Promise$addUnhandledRejection_(this, b))
	}
};
var goog$Promise$tryThen_ = function(a, b, c, d, e) {
	var f = !1,
		g = function(a) {
			f || (f = !0, c.call(e, a))
		},
		h = function(a) {
			f || (f = !0, d.call(e, a))
		};
	try {
		b.call(a, g, h)
	} catch (k) {
		h(k)
	}
};
goog$Promise.prototype.scheduleCallbacks_ = function() {
	this.executing_ || (this.executing_ = !0, goog$async$run(this.executeCallbacks_, this))
};
goog$Promise.prototype.hasEntry_ = function() {
	return !!this.callbackEntries_
};
goog$Promise.prototype.queueEntry_ = function(a) {
	goog$asserts$assert(null != a.onFulfilled);
	this.callbackEntriesTail_ ? this.callbackEntriesTail_.next = a : this.callbackEntries_ = a;
	this.callbackEntriesTail_ = a
};
goog$Promise.prototype.popEntry_ = function() {
	var a = null;
	this.callbackEntries_ && (a = this.callbackEntries_, this.callbackEntries_ = a.next, a.next = null);
	this.callbackEntries_ || (this.callbackEntriesTail_ = null);
	null != a && goog$asserts$assert(null != a.onFulfilled);
	return a
};
goog$Promise.prototype.removeEntryAfter_ = function(a) {
	goog$asserts$assert(this.callbackEntries_);
	goog$asserts$assert(null != a);
	a.next == this.callbackEntriesTail_ && (this.callbackEntriesTail_ = a);
	a.next = a.next.next
};
goog$Promise.prototype.executeCallbacks_ = function() {
	for (var a; a = this.popEntry_();) this.executeCallback_(a, this.state_, this.result_);
	this.executing_ = !1
};
goog$Promise.prototype.executeCallback_ = function(a, b, c) {
	3 == b && a.onRejected && !a.always && this.removeUnhandledRejection_();
	if (a.child) a.child.parent_ = null, goog$Promise$invokeCallback_(a, b, c);
	else try {
		a.always ? a.onFulfilled.call(a.context) : goog$Promise$invokeCallback_(a, b, c)
	} catch (d) {
		goog$Promise$handleRejection_.call(null, d)
	}
	goog$Promise$freelist_.put(a)
};
var goog$Promise$invokeCallback_ = function(a, b, c) {
	2 == b ? a.onFulfilled.call(a.context, c) : a.onRejected && a.onRejected.call(a.context, c)
};
goog$Promise.prototype.removeUnhandledRejection_ = function() {
	var a;
	for (a = this; a && a.hadUnhandledRejection_; a = a.parent_) a.hadUnhandledRejection_ = !1
};
var goog$Promise$addUnhandledRejection_ = function(a, b) {
		a.hadUnhandledRejection_ = !0;
		goog$async$run(function() {
			a.hadUnhandledRejection_ && goog$Promise$handleRejection_.call(null, b)
		})
	},
	goog$Promise$handleRejection_ = goog$async$throwException,
	goog$Promise$CancellationError = function(a) {
		goog$debug$Error.call(this, a)
	};
goog$inherits(goog$Promise$CancellationError, goog$debug$Error);
goog$Promise$CancellationError.prototype.name = "cancel";
var goog$Timer = function(a, b) {
	goog$events$EventTarget.call(this);
	this.interval_ = a || 1;
	this.timerObject_ = b || goog$global;
	this.boundTick_ = goog$bind(this.tick_, this);
	this.last_ = goog$now()
};
goog$inherits(goog$Timer, goog$events$EventTarget);
goog$Timer.prototype.enabled = !1;
goog$Timer.prototype.timer_ = null;
goog$Timer.prototype.setInterval = function(a) {
	this.interval_ = a;
	this.timer_ && this.enabled ? (this.stop(), this.start()) : this.timer_ && this.stop()
};
goog$Timer.prototype.tick_ = function() {
	if (this.enabled) {
		var a = goog$now() - this.last_;
		0 < a && a < .8 * this.interval_ ? this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - a) : (this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null), this.dispatchTick(), this.enabled && (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog$now()))
	}
};
goog$Timer.prototype.dispatchTick = function() {
	this.dispatchEvent("tick")
};
goog$Timer.prototype.start = function() {
	this.enabled = !0;
	this.timer_ || (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog$now())
};
goog$Timer.prototype.stop = function() {
	this.enabled = !1;
	this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null)
};
goog$Timer.prototype.disposeInternal = function() {
	goog$Timer.superClass_.disposeInternal.call(this);
	this.stop();
	delete this.timerObject_
};
var goog$Timer$callOnce = function(a, b, c) {
	if (goog$isFunction(a)) c && (a = goog$bind(a, c));
	else if (a && "function" == typeof a.handleEvent) a = goog$bind(a.handleEvent, a);
	else throw Error("Invalid listener argument");
	return 2147483647 < Number(b) ? -1 : goog$global.setTimeout(a, b || 0)
};
var goog$history$Event = function() {
	goog$events$Event.call(this, "navigate")
};
goog$inherits(goog$history$Event, goog$events$Event);
var goog$History = function(a, b, c, d) {
	goog$events$EventTarget.call(this);
	if (a && !b) throw Error("Can't use invisible history without providing a blank page.");
	var e;
	if (c) e = c;
	else {
		e = "history_state" + goog$History$historyCount_;
		var f = goog$html$SafeHtml$create("input", {
			type: "text",
			name: e,
			id: e,
			style: goog$string$Const$create__googStringSecurityPrivate_("display:none")
		});
		document.write(goog$html$SafeHtml$unwrap(f));
		e = goog$dom$getElement(e)
	}
	this.hiddenInput_ = e;
	c = c ? (c = goog$dom$getOwnerDocument(c)) ? c.parentWindow ||
		c.defaultView : window : window;
	this.window_ = c;
	this.iframeSrc_ = b;
	goog$userAgent$IE && !b && (this.iframeSrc_ = "https" == window.location.protocol ? goog$html$TrustedResourceUrl$createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog$string$Const$unwrap(goog$string$Const$create__googStringSecurityPrivate_("https:///"))) : goog$html$TrustedResourceUrl$createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog$string$Const$unwrap(goog$string$Const$create__googStringSecurityPrivate_('javascript:""'))));
	this.timer_ =
		new goog$Timer(150);
	this.registerDisposable(this.timer_);
	this.userVisible_ = !a;
	this.eventHandler_ = new goog$events$EventHandler(this);
	if (a || goog$History$LEGACY_IE) {
		var g;
		if (d) g = d;
		else {
			a = "history_iframe" + goog$History$historyCount_;
			c = this.iframeSrc_;
			d = {
				id: a,
				style: goog$string$Const$create__googStringSecurityPrivate_("display:none"),
				sandbox: void 0
			};
			c && goog$html$TrustedResourceUrl$unwrap(c);
			b = {};
			b.src = c || null;
			b.srcdoc = null;
			c = {
				sandbox: ""
			};
			e = {};
			for (g in b) goog$asserts$assert(g.toLowerCase() == g, "Must be lower case"),
				e[g] = b[g];
			for (g in c) goog$asserts$assert(g.toLowerCase() == g, "Must be lower case"), e[g] = c[g];
			for (g in d) {
				f = g.toLowerCase();
				if (f in b) throw Error('Cannot override "' + f + '" attribute, got "' + g + '" with value "' + d[g] + '"');
				f in c && delete e[f];
				e[g] = d[g]
			}
			g = e;
			g = goog$html$SafeHtml$createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", g, void 0);
			document.write(goog$html$SafeHtml$unwrap(g));
			g = goog$dom$getElement(a)
		}
		this.iframe_ = g;
		this.unsetIframe_ = !0
	}
	goog$History$LEGACY_IE && (this.eventHandler_.listen(this.window_,
		"load", this.onDocumentLoaded), this.shouldEnable_ = this.documentLoaded = !1);
	this.userVisible_ ? this.setHash_(this.getToken(), !0) : this.setIframeToken_(this.hiddenInput_.value);
	goog$History$historyCount_++
};
goog$inherits(goog$History, goog$events$EventTarget);
goog$History.prototype.enabled_ = !1;
goog$History.prototype.longerPolling_ = !1;
goog$History.prototype.lastToken_ = null;
var goog$History$isOnHashChangeSupported = goog$memoize(function() {
		return goog$userAgent$IE ? 8 <= Number(goog$userAgent$DOCUMENT_MODE) : "onhashchange" in goog$global
	}),
	goog$History$LEGACY_IE = goog$userAgent$IE && !(8 <= Number(goog$userAgent$DOCUMENT_MODE));
goog$History.prototype.lockedToken_ = null;
goog$History.prototype.disposeInternal = function() {
	goog$History.superClass_.disposeInternal.call(this);
	this.eventHandler_.dispose();
	this.setEnabled(!1)
};
goog$History.prototype.setEnabled = function(a) {
	if (a != this.enabled_)
		if (goog$History$LEGACY_IE && !this.documentLoaded) this.shouldEnable_ = a;
		else if (a)
		if (goog$userAgent$OPERA ? this.eventHandler_.listen(this.window_.document, goog$History$INPUT_EVENTS_, this.operaDefibrillator_) : goog$userAgent$GECKO && this.eventHandler_.listen(this.window_, "pageshow", this.onShow_), goog$History$isOnHashChangeSupported() && this.userVisible_) this.eventHandler_.listen(this.window_, "hashchange", this.onHashChange_), this.enabled_ = !0,
			this.dispatchEvent(new goog$history$Event(this.getToken(), !1));
		else {
			if (!goog$userAgent$IE || goog$labs$userAgent$device$isMobile() || this.documentLoaded) this.eventHandler_.listen(this.timer_, "tick", goog$bind(this.check_, this, !0)), this.enabled_ = !0, goog$History$LEGACY_IE || (this.lastToken_ = this.getToken(), this.dispatchEvent(new goog$history$Event(this.getToken(), !1))), this.timer_.start()
		}
	else this.enabled_ = !1, this.eventHandler_.removeAll(), this.timer_.stop()
};
goog$History.prototype.onDocumentLoaded = function() {
	this.documentLoaded = !0;
	this.hiddenInput_.value && this.setIframeToken_(this.hiddenInput_.value, !0);
	this.setEnabled(this.shouldEnable_)
};
goog$History.prototype.onShow_ = function(a) {
	a.event_.persisted && (this.setEnabled(!1), this.setEnabled(!0))
};
goog$History.prototype.onHashChange_ = function() {
	var a = this.getLocationFragment_(this.window_);
	a != this.lastToken_ && this.update_(a, !0)
};
goog$History.prototype.getToken = function() {
	return null != this.lockedToken_ ? this.lockedToken_ : this.userVisible_ ? this.getLocationFragment_(this.window_) : this.getIframeToken_() || ""
};
goog$History.prototype.setToken = function(a, b) {
	this.setHistoryState_(a, !1, b)
};
goog$History.prototype.getLocationFragment_ = function(a) {
	a = a.location.href;
	var b = a.indexOf("#");
	return 0 > b ? "" : a.substring(b + 1)
};
goog$History.prototype.setHistoryState_ = function(a, b, c) {
	this.getToken() != a && (this.userVisible_ ? (this.setHash_(a, b), goog$History$isOnHashChangeSupported() || goog$userAgent$IE && !goog$labs$userAgent$device$isMobile() && this.setIframeToken_(a, b, c), this.enabled_ && this.check_(!1)) : (this.setIframeToken_(a, b), this.lockedToken_ = this.lastToken_ = this.hiddenInput_.value = a, this.dispatchEvent(new goog$history$Event(a, !1))))
};
goog$History.prototype.setHash_ = function(a, b) {
	var c = this.window_.location,
		d = c.href.split("#")[0],
		e = -1 != c.href.indexOf("#");
	if (goog$History$LEGACY_IE || e || a) d += "#" + a;
	d != c.href && (b ? c.replace(d) : c.href = d)
};
goog$History.prototype.setIframeToken_ = function(a, b, c) {
	if (this.unsetIframe_ || a != this.getIframeToken_())
		if (this.unsetIframe_ = !1, a = encodeURIComponent(String(a)), goog$userAgent$IE) {
			var d = goog$dom$getFrameContentDocument(this.iframe_);
			d.open("text/html", b ? "replace" : void 0);
			b = goog$html$SafeHtml$concat(goog$html$SafeHtml$create("title", {}, c || this.window_.document.title), goog$html$SafeHtml$create("body", {}, a));
			d.write(goog$html$SafeHtml$unwrap(b));
			d.close()
		} else if (goog$asserts$assertInstanceof(this.iframeSrc_,
			goog$html$TrustedResourceUrl, "this.iframeSrc_ must be set on calls to setIframeToken_"), d = goog$html$TrustedResourceUrl$unwrap(this.iframeSrc_) + "#" + a, a = this.iframe_.contentWindow) b ? a.location.replace(d) : a.location.href = d
};
goog$History.prototype.getIframeToken_ = function() {
	if (goog$userAgent$IE) {
		var a = goog$dom$getFrameContentDocument(this.iframe_);
		return a.body ? goog$string$urlDecode(a.body.innerHTML) : null
	}
	if (a = this.iframe_.contentWindow) {
		var b;
		try {
			b = goog$string$urlDecode(this.getLocationFragment_(a))
		} catch (c) {
			return this.longerPolling_ || this.setLongerPolling_(!0), null
		}
		this.longerPolling_ && this.setLongerPolling_(!1);
		return b || null
	}
	return null
};
goog$History.prototype.check_ = function(a) {
	if (this.userVisible_) {
		var b = this.getLocationFragment_(this.window_);
		b != this.lastToken_ && this.update_(b, a)
	}
	if (!this.userVisible_ || goog$History$LEGACY_IE)
		if (b = this.getIframeToken_() || "", null == this.lockedToken_ || b == this.lockedToken_) this.lockedToken_ = null, b != this.lastToken_ && this.update_(b, a)
};
goog$History.prototype.update_ = function(a, b) {
	this.lastToken_ = this.hiddenInput_.value = a;
	this.userVisible_ ? (goog$History$LEGACY_IE && this.setIframeToken_(a), this.setHash_(a)) : this.setIframeToken_(a);
	this.dispatchEvent(new goog$history$Event(this.getToken(), b))
};
goog$History.prototype.setLongerPolling_ = function(a) {
	this.longerPolling_ != a && this.timer_.setInterval(a ? 1E4 : 150);
	this.longerPolling_ = a
};
goog$History.prototype.operaDefibrillator_ = function() {
	this.timer_.stop();
	this.timer_.start()
};
var goog$History$INPUT_EVENTS_ = ["mousedown", "keydown", "mousemove"],
	goog$History$historyCount_ = 0;
var goog$string$format = function(a, b) {
		function c(a, b, c, e, f, n, l, q) {
			if ("%" == n) return "%";
			var g = d.shift();
			if ("undefined" == typeof g) throw Error("[goog.string.format] Not enough arguments");
			arguments[0] = g;
			return goog$string$format$demuxes_[n].apply(null, arguments)
		}
		var d = Array.prototype.slice.call(arguments),
			e = d.shift();
		if ("undefined" == typeof e) throw Error("[goog.string.format] Template required");
		var f = /%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g;
		return e.replace(f, c)
	},
	goog$string$format$demuxes_ = {
		s: function(a,
			b, c) {
			return isNaN(c) || "" == c || a.length >= Number(c) ? a : a = -1 < b.indexOf("-", 0) ? a + goog$string$repeat(" ", Number(c) - a.length) : goog$string$repeat(" ", Number(c) - a.length) + a
		},
		f: function(a, b, c, d, e) {
			d = a.toString();
			isNaN(e) || "" == e || (d = parseFloat(a).toFixed(e));
			var f;
			f = 0 > Number(a) ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
			0 <= Number(a) && (d = f + d);
			if (isNaN(c) || d.length >= Number(c)) return d;
			d = isNaN(e) ? Math.abs(Number(a)).toString() : Math.abs(Number(a)).toFixed(e);
			a = Number(c) - d.length - f.length;
			0 <= b.indexOf("-",
				0) ? d = f + d + goog$string$repeat(" ", a) : (b = 0 <= b.indexOf("0", 0) ? "0" : " ", d = f + goog$string$repeat(b, a) + d);
			return d
		},
		d: function(a, b, c, d, e, f, g, h) {
			return goog$string$format$demuxes_.f(parseInt(a, 10), b, c, d, 0, f, g, h)
		}
	};
goog$string$format$demuxes_.i = goog$string$format$demuxes_.d;
goog$string$format$demuxes_.u = goog$string$format$demuxes_.d;
var goog$style$setStyle = function(a, b, c) {
		if (goog$isString(b)) {
			var d = c;
			(b = goog$style$getVendorJsStyleName_(a, b)) && (a.style[b] = d)
		} else
			for (d in b) {
				c = a;
				var e = b[d],
					f = goog$style$getVendorJsStyleName_(c, d);
				f && (c.style[f] = e)
			}
	},
	goog$style$styleNameCache_ = {},
	goog$style$getVendorJsStyleName_ = function(a, b) {
		var c = goog$style$styleNameCache_[b];
		if (!c) {
			var d = goog$string$toCamelCase(b),
				c = d;
			void 0 === a.style[d] && (d = (goog$userAgent$WEBKIT ? "Webkit" : goog$userAgent$GECKO ? "Moz" : goog$userAgent$IE ? "ms" : goog$userAgent$OPERA ?
				"O" : null) + goog$string$toTitleCase(d), void 0 !== a.style[d] && (c = d));
			goog$style$styleNameCache_[b] = c
		}
		return c
	};
var goog$json$isValid = function(a) {
		if (/^\s*$/.test(a)) return !1;
		var b = /\\["\\\/bfnrtu]/g,
			c = /(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,
			d = /(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,
			e = /^[\],:{}\s\u2028\u2029]*$/;
		return e.test(a.replace(b, "@").replace(c, "]").replace(d, ""))
	},
	goog$json$errorLogger_ = goog$nullFunction,
	goog$json$parse = function(a) {
		var b;
		a = String(a);
		if (goog$json$isValid(a)) try {
			var c = eval("(" + a + ")");
			b && goog$json$errorLogger_("Invalid JSON: " +
				a, b);
			return c
		} catch (d) {}
		throw Error("Invalid JSON string: " + a);
	};
var goog$iter$StopIteration = "StopIteration" in goog$global ? goog$global.StopIteration : {
		message: "StopIteration",
		stack: ""
	},
	goog$iter$Iterator = function() {};
goog$iter$Iterator.prototype.next = function() {
	throw goog$iter$StopIteration;
};
goog$iter$Iterator.prototype.__iterator__ = function() {
	return this
};
var goog$structs$Map = function(a, b) {
	this.map_ = {};
	this.keys_ = [];
	this.version_ = this.count_ = 0;
	var c = arguments.length;
	if (1 < c) {
		if (c % 2) throw Error("Uneven number of arguments");
		for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
	} else a && this.addAll(a)
};
goog$structs$Map.prototype.getValues = function() {
	this.cleanupKeysArray_();
	for (var a = [], b = 0; b < this.keys_.length; b++) {
		var c = this.keys_[b];
		a.push(this.map_[c])
	}
	return a
};
goog$structs$Map.prototype.getKeys = function() {
	this.cleanupKeysArray_();
	return this.keys_.concat()
};
goog$structs$Map.prototype.containsKey = function(a) {
	return goog$structs$Map$hasKey_(this.map_, a)
};
goog$structs$Map.prototype.clear = function() {
	this.map_ = {};
	this.version_ = this.count_ = this.keys_.length = 0
};
goog$structs$Map.prototype.remove = function(a) {
	return goog$structs$Map$hasKey_(this.map_, a) ? (delete this.map_[a], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1
};
goog$structs$Map.prototype.cleanupKeysArray_ = function() {
	if (this.count_ != this.keys_.length) {
		for (var a = 0, b = 0; a < this.keys_.length;) {
			var c = this.keys_[a];
			goog$structs$Map$hasKey_(this.map_, c) && (this.keys_[b++] = c);
			a++
		}
		this.keys_.length = b
	}
	if (this.count_ != this.keys_.length) {
		for (var d = {}, b = a = 0; a < this.keys_.length;) c = this.keys_[a], goog$structs$Map$hasKey_(d, c) || (this.keys_[b++] = c, d[c] = 1), a++;
		this.keys_.length = b
	}
};
goog$structs$Map.prototype.get = function(a, b) {
	return goog$structs$Map$hasKey_(this.map_, a) ? this.map_[a] : b
};
goog$structs$Map.prototype.set = function(a, b) {
	goog$structs$Map$hasKey_(this.map_, a) || (this.count_++, this.keys_.push(a), this.version_++);
	this.map_[a] = b
};
goog$structs$Map.prototype.addAll = function(a) {
	var b;
	a instanceof goog$structs$Map ? (b = a.getKeys(), a = a.getValues()) : (b = goog$object$getKeys(a), a = goog$object$getValues(a));
	for (var c = 0; c < b.length; c++) this.set(b[c], a[c])
};
goog$structs$Map.prototype.forEach = function(a, b) {
	for (var c = this.getKeys(), d = 0; d < c.length; d++) {
		var e = c[d],
			f = this.get(e);
		a.call(b, f, e, this)
	}
};
goog$structs$Map.prototype.clone = function() {
	return new goog$structs$Map(this)
};
goog$structs$Map.prototype.__iterator__ = function(a) {
	this.cleanupKeysArray_();
	var b = 0,
		c = this.version_,
		d = this,
		e = new goog$iter$Iterator;
	e.next = function() {
		if (c != d.version_) throw Error("The map has changed since the iterator was created");
		if (b >= d.keys_.length) throw goog$iter$StopIteration;
		var e = d.keys_[b++];
		return a ? e : d.map_[e]
	};
	return e
};
var goog$structs$Map$hasKey_ = function(a, b) {
	return Object.prototype.hasOwnProperty.call(a, b)
};
var goog$structs$getValues = function(a) {
		if (a.getValues && "function" == typeof a.getValues) return a.getValues();
		if (goog$isString(a)) return a.split("");
		if (goog$isArrayLike(a)) {
			for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
			return b
		}
		return goog$object$getValues(a)
	},
	goog$structs$forEach = function(a, b, c) {
		if (a.forEach && "function" == typeof a.forEach) a.forEach(b, c);
		else if (goog$isArrayLike(a) || goog$isString(a)) goog$array$forEach(a, b, c);
		else {
			var d;
			var e = a;
			if (e.getKeys && "function" == typeof e.getKeys) d = e.getKeys();
			else if (e.getValues && "function" == typeof e.getValues) d = void 0;
			else if (goog$isArrayLike(e) || goog$isString(e)) {
				d = [];
				for (var e = e.length, f = 0; f < e; f++) d.push(f)
			} else d = goog$object$getKeys(e);
			for (var e = goog$structs$getValues(a), f = e.length, g = 0; g < f; g++) b.call(c, e[g], d && d[g], a)
		}
	};
var goog$debug$getStacktrace = function(a) {
		var b;
		b = a || goog$debug$getStacktrace;
		var c = Error();
		if (Error.captureStackTrace) Error.captureStackTrace(c, b), b = String(c.stack);
		else {
			try {
				throw c;
			} catch (d) {
				c = d
			}
			b = (b = c.stack) ? String(b) : null
		}
		b || (b = goog$debug$getStacktraceHelper_(a || arguments.callee.caller, []));
		return b
	},
	goog$debug$getStacktraceHelper_ = function(a, b) {
		var c = [];
		if (goog$array$contains(b, a)) c.push("[...circular reference...]");
		else if (a && 50 > b.length) {
			c.push(goog$debug$getFunctionName(a) + "(");
			for (var d =
					a.arguments, e = 0; d && e < d.length; e++) {
				0 < e && c.push(", ");
				var f;
				f = d[e];
				switch (typeof f) {
					case "object":
						f = f ? "object" : "null";
						break;
					case "string":
						break;
					case "number":
						f = String(f);
						break;
					case "boolean":
						f = f ? "true" : "false";
						break;
					case "function":
						f = (f = goog$debug$getFunctionName(f)) ? f : "[fn]";
						break;
					default:
						f = typeof f
				}
				40 < f.length && (f = f.substr(0, 40) + "...");
				c.push(f)
			}
			b.push(a);
			c.push(")\n");
			try {
				c.push(goog$debug$getStacktraceHelper_(a.caller, b))
			} catch (g) {
				c.push("[exception trying to get caller]\n")
			}
		} else a ? c.push("[...long stack...]") :
			c.push("[end]");
		return c.join("")
	},
	goog$debug$getFunctionName = function(a) {
		if (goog$debug$fnNameCache_[a]) return goog$debug$fnNameCache_[a];
		if (goog$debug$fnNameResolver_) {
			var b = goog$debug$fnNameResolver_(a);
			if (b) return goog$debug$fnNameCache_[a] = b
		}
		a = String(a);
		goog$debug$fnNameCache_[a] || ((b = /function ([^\(]+)/.exec(a)) ? (b = b[1], goog$debug$fnNameCache_[a] = b) : goog$debug$fnNameCache_[a] = "[Anonymous]");
		return goog$debug$fnNameCache_[a]
	},
	goog$debug$fnNameCache_ = {};
var goog$debug$LogRecord = function(a, b, c, d, e) {
	this.reset(a, b, c, d, e)
};
goog$debug$LogRecord.prototype.exception_ = null;
var goog$debug$LogRecord$nextSequenceNumber_ = 0;
goog$debug$LogRecord.prototype.reset = function(a, b, c, d, e) {
	"number" == typeof e || goog$debug$LogRecord$nextSequenceNumber_++;
	d || goog$now();
	this.level_ = a;
	this.msg_ = b;
	delete this.exception_
};
goog$debug$LogRecord.prototype.setException = function(a) {
	this.exception_ = a
};
goog$debug$LogRecord.prototype.setLevel = function(a) {
	this.level_ = a
};
var goog$debug$Logger = function(a) {
		this.name_ = a;
		this.handlers_ = this.children_ = this.level_ = this.parent_ = null
	},
	goog$debug$Logger$Level = function(a, b) {
		this.name = a;
		this.value = b
	};
goog$debug$Logger$Level.prototype.toString = function() {
	return this.name
};
var goog$debug$Logger$Level$SEVERE = new goog$debug$Logger$Level("SEVERE", 1E3),
	goog$debug$Logger$Level$WARNING = new goog$debug$Logger$Level("WARNING", 900),
	goog$debug$Logger$Level$INFO = new goog$debug$Logger$Level("INFO", 800),
	goog$debug$Logger$Level$CONFIG = new goog$debug$Logger$Level("CONFIG", 700),
	goog$debug$Logger$Level$FINE = new goog$debug$Logger$Level("FINE", 500),
	goog$debug$Logger$Level$FINER = new goog$debug$Logger$Level("FINER", 400);
goog$debug$Logger.prototype.getName = function() {
	return this.name_
};
goog$debug$Logger.prototype.getParent = function() {
	return this.parent_
};
goog$debug$Logger.prototype.getChildren = function() {
	this.children_ || (this.children_ = {});
	return this.children_
};
goog$debug$Logger.prototype.setLevel = function(a) {
	this.level_ = a
};
goog$debug$Logger.prototype.getEffectiveLevel = function() {
	if (this.level_) return this.level_;
	if (this.parent_) return this.parent_.getEffectiveLevel();
	goog$asserts$fail("Root logger has no level set.");
	return null
};
goog$debug$Logger.prototype.isLoggable = function(a) {
	return a.value >= this.getEffectiveLevel().value
};
goog$debug$Logger.prototype.log = function(a, b, c) {
	this.isLoggable(a) && (goog$isFunction(b) && (b = b()), this.doLogRecord_(this.getLogRecord(a, b, c)))
};
goog$debug$Logger.prototype.getLogRecord = function(a, b, c) {
	a = new goog$debug$LogRecord(a, String(b), this.name_);
	c && a.setException(c);
	return a
};
goog$debug$Logger.prototype.severe = function(a, b) {
	this.log(goog$debug$Logger$Level$SEVERE, a, b)
};
goog$debug$Logger.prototype.warning = function(a, b) {
	this.log(goog$debug$Logger$Level$WARNING, a, b)
};
goog$debug$Logger.prototype.info = function(a, b) {
	this.log(goog$debug$Logger$Level$INFO, a, b)
};
goog$debug$Logger.prototype.fine = function(a, b) {
	this.log(goog$debug$Logger$Level$FINE, a, b)
};
goog$debug$Logger.prototype.doLogRecord_ = function(a) {
	var b = "log:" + a.msg_;
	goog$global.console && (goog$global.console.timeStamp ? goog$global.console.timeStamp(b) : goog$global.console.markTimeline && goog$global.console.markTimeline(b));
	goog$global.msWriteProfilerMark && goog$global.msWriteProfilerMark(b);
	for (b = this; b;) b.callPublish_(a), b = b.getParent()
};
goog$debug$Logger.prototype.callPublish_ = function(a) {
	if (this.handlers_)
		for (var b = 0, c; c = this.handlers_[b]; b++) c(a)
};
goog$debug$Logger.prototype.setParent_ = function(a) {
	this.parent_ = a
};
goog$debug$Logger.prototype.addChild_ = function(a, b) {
	this.getChildren()[a] = b
};
var goog$debug$LogManager$loggers_ = {},
	goog$debug$LogManager$rootLogger_ = null,
	goog$debug$LogManager$getLogger = function(a) {
		goog$debug$LogManager$rootLogger_ || (goog$debug$LogManager$rootLogger_ = new goog$debug$Logger(""), goog$debug$LogManager$loggers_[""] = goog$debug$LogManager$rootLogger_, goog$debug$LogManager$rootLogger_.setLevel(goog$debug$Logger$Level$CONFIG));
		var b = goog$debug$LogManager$loggers_[a];
		if (!b) {
			var b = new goog$debug$Logger(a),
				c = a.lastIndexOf("."),
				d = a.substr(0, c),
				c = a.substr(c + 1),
				d = goog$debug$LogManager$getLogger(d);
			d.addChild_(c, b);
			b.setParent_(d);
			goog$debug$LogManager$loggers_[a] = b
		}
		return b
	};
var goog$log$getLogger = function(a, b) {
		a = goog$debug$LogManager$getLogger(a);
		b && a && a.setLevel(b);
		return a
	},
	goog$log$fine = function(a, b, c) {
		a && a.fine(b, c)
	};
var goog$uri$utils$splitRe_ = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,
	goog$uri$utils$parseQueryData = function(a, b) {
		if (a) {
			a = a.split("&");
			for (var c = 0; c < a.length; c++) {
				var d = a[c].indexOf("="),
					e, f = null;
				0 <= d ? (e = a[c].substring(0, d), f = a[c].substring(d + 1)) : e = a[c];
				b(e, f ? goog$string$urlDecode(f) : "")
			}
		}
	};
var goog$net$XmlHttpFactory = function() {};
goog$net$XmlHttpFactory.prototype.cachedOptions_ = null;
goog$net$XmlHttpFactory.prototype.getOptions = function() {
	return this.cachedOptions_ || (this.cachedOptions_ = this.internalGetOptions())
};
var goog$net$XmlHttp$factory_, goog$net$DefaultXmlHttpFactory = function() {};
goog$inherits(goog$net$DefaultXmlHttpFactory, goog$net$XmlHttpFactory);
goog$net$DefaultXmlHttpFactory.prototype.createInstance = function() {
	var a = this.getProgId_();
	return a ? new ActiveXObject(a) : new XMLHttpRequest
};
goog$net$DefaultXmlHttpFactory.prototype.internalGetOptions = function() {
	var a = this.getProgId_(),
		b = {};
	a && (b[0] = !0, b[1] = !0);
	return b
};
goog$net$DefaultXmlHttpFactory.prototype.getProgId_ = function() {
	if (!this.ieProgId_ && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
		for (var a = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], b = 0; b < a.length; b++) {
			var c = a[b];
			try {
				return new ActiveXObject(c), this.ieProgId_ = c
			} catch (d) {}
		}
		throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
	}
	return this.ieProgId_
};
goog$net$XmlHttp$factory_ = new goog$net$DefaultXmlHttpFactory;
var goog$net$XhrIo = function(a) {
	goog$events$EventTarget.call(this);
	this.headers = new goog$structs$Map;
	this.xmlHttpFactory_ = a || null;
	this.active_ = !1;
	this.xhrOptions_ = this.xhr_ = null;
	this.lastMethod_ = this.lastUri_ = "";
	this.lastErrorCode_ = 0;
	this.lastError_ = "";
	this.inAbort_ = this.inOpen_ = this.inSend_ = this.errorDispatched_ = !1;
	this.timeoutInterval_ = 0;
	this.timeoutId_ = null;
	this.responseType_ = "";
	this.useXhr2Timeout_ = this.progressEventsEnabled_ = this.withCredentials_ = !1
};
goog$inherits(goog$net$XhrIo, goog$events$EventTarget);
goog$net$XhrIo.prototype.logger_ = goog$log$getLogger("goog.net.XhrIo");
var goog$net$XhrIo$HTTP_SCHEME_PATTERN = /^https?$/i,
	goog$net$XhrIo$METHODS_WITH_FORM_DATA = ["POST", "PUT"],
	goog$net$XhrIo$sendInstances_ = [],
	goog$net$XhrIo$send = function(a, b, c, d, e, f, g) {
		var h = new goog$net$XhrIo;
		goog$net$XhrIo$sendInstances_.push(h);
		b && h.listen("complete", b);
		h.listenOnce("ready", h.cleanupSend_);
		f && h.setTimeoutInterval(f);
		g && h.setWithCredentials(g);
		h.send(a, c, d, e);
		return h
	};
goog$net$XhrIo.prototype.cleanupSend_ = function() {
	this.dispose();
	goog$array$remove(goog$net$XhrIo$sendInstances_, this)
};
goog$net$XhrIo.prototype.setTimeoutInterval = function(a) {
	this.timeoutInterval_ = Math.max(0, a)
};
goog$net$XhrIo.prototype.setWithCredentials = function(a) {
	this.withCredentials_ = a
};
goog$net$XhrIo.prototype.send = function(a, b, c, d) {
	if (this.xhr_) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.lastUri_ + "; newUri=" + a);
	b = b ? b.toUpperCase() : "GET";
	this.lastUri_ = a;
	this.lastError_ = "";
	this.lastErrorCode_ = 0;
	this.lastMethod_ = b;
	this.errorDispatched_ = !1;
	this.active_ = !0;
	this.xhr_ = this.createXhr();
	this.xhrOptions_ = this.xmlHttpFactory_ ? this.xmlHttpFactory_.getOptions() : goog$net$XmlHttp$factory_.getOptions();
	this.xhr_.onreadystatechange = goog$bind(this.onReadyStateChange_,
		this);
	this.progressEventsEnabled_ && "onprogress" in this.xhr_ && (this.xhr_.onprogress = goog$bind(function(a) {
		this.onProgressHandler_(a, !0)
	}, this), this.xhr_.upload && (this.xhr_.upload.onprogress = goog$bind(this.onProgressHandler_, this)));
	try {
		goog$log$fine(this.logger_, this.formatMsg_("Opening Xhr")), this.inOpen_ = !0, this.xhr_.open(b, String(a), !0), this.inOpen_ = !1
	} catch (f) {
		goog$log$fine(this.logger_, this.formatMsg_("Error opening Xhr: " + f.message));
		this.error_(5, f);
		return
	}
	a = c || "";
	var e = this.headers.clone();
	d && goog$structs$forEach(d, function(a, b) {
		e.set(b, a)
	});
	d = goog$array$find(e.getKeys(), goog$net$XhrIo$isContentTypeHeader_);
	c = goog$global.FormData && a instanceof goog$global.FormData;
	!goog$array$contains(goog$net$XhrIo$METHODS_WITH_FORM_DATA, b) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
	e.forEach(function(a, b) {
		this.xhr_.setRequestHeader(b, a)
	}, this);
	this.responseType_ && (this.xhr_.responseType = this.responseType_);
	"withCredentials" in this.xhr_ && this.xhr_.withCredentials !==
		this.withCredentials_ && (this.xhr_.withCredentials = this.withCredentials_);
	try {
		this.cleanUpTimeoutTimer_(), 0 < this.timeoutInterval_ && (this.useXhr2Timeout_ = goog$net$XhrIo$shouldUseXhr2Timeout_(this.xhr_), goog$log$fine(this.logger_, this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete, xhr2 " + this.useXhr2Timeout_)), this.useXhr2Timeout_ ? (this.xhr_.timeout = this.timeoutInterval_, this.xhr_.ontimeout = goog$bind(this.timeout_, this)) : this.timeoutId_ = goog$Timer$callOnce(this.timeout_, this.timeoutInterval_,
			this)), goog$log$fine(this.logger_, this.formatMsg_("Sending request")), this.inSend_ = !0, this.xhr_.send(a), this.inSend_ = !1
	} catch (f) {
		goog$log$fine(this.logger_, this.formatMsg_("Send error: " + f.message)), this.error_(5, f)
	}
};
var goog$net$XhrIo$shouldUseXhr2Timeout_ = function(a) {
		return goog$userAgent$IE && goog$userAgent$isVersionOrHigher(9) && goog$isNumber(a.timeout) && goog$isDef(a.ontimeout)
	},
	goog$net$XhrIo$isContentTypeHeader_ = function(a) {
		return "content-type" == a.toLowerCase()
	};
goog$net$XhrIo.prototype.createXhr = function() {
	return this.xmlHttpFactory_ ? this.xmlHttpFactory_.createInstance() : goog$net$XmlHttp$factory_.createInstance()
};
goog$net$XhrIo.prototype.timeout_ = function() {
	"undefined" != typeof goog && this.xhr_ && (this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting", this.lastErrorCode_ = 8, goog$log$fine(this.logger_, this.formatMsg_(this.lastError_)), this.dispatchEvent("timeout"), this.abort(8))
};
goog$net$XhrIo.prototype.error_ = function(a, b) {
	this.active_ = !1;
	this.xhr_ && (this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1);
	this.lastError_ = b;
	this.lastErrorCode_ = a;
	this.dispatchErrors_();
	this.cleanUpXhr_()
};
goog$net$XhrIo.prototype.dispatchErrors_ = function() {
	this.errorDispatched_ || (this.errorDispatched_ = !0, this.dispatchEvent("complete"), this.dispatchEvent("error"))
};
goog$net$XhrIo.prototype.abort = function(a) {
	this.xhr_ && this.active_ && (goog$log$fine(this.logger_, this.formatMsg_("Aborting")), this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1, this.lastErrorCode_ = a || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), this.cleanUpXhr_())
};
goog$net$XhrIo.prototype.disposeInternal = function() {
	this.xhr_ && (this.active_ && (this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1), this.cleanUpXhr_(!0));
	goog$net$XhrIo.superClass_.disposeInternal.call(this)
};
goog$net$XhrIo.prototype.onReadyStateChange_ = function() {
	if (!this.disposed_)
		if (this.inOpen_ || this.inSend_ || this.inAbort_) this.onReadyStateChangeHelper_();
		else this.onReadyStateChangeEntryPoint_()
};
goog$net$XhrIo.prototype.onReadyStateChangeEntryPoint_ = function() {
	this.onReadyStateChangeHelper_()
};
goog$net$XhrIo.prototype.onReadyStateChangeHelper_ = function() {
	if (this.active_ && "undefined" != typeof goog)
		if (this.xhrOptions_[1] && 4 == this.getReadyState() && 2 == this.getStatus()) goog$log$fine(this.logger_, this.formatMsg_("Local request error detected and ignored"));
		else if (this.inSend_ && 4 == this.getReadyState()) goog$Timer$callOnce(this.onReadyStateChange_, 0, this);
	else if (this.dispatchEvent("readystatechange"), this.isComplete()) {
		goog$log$fine(this.logger_, this.formatMsg_("Request complete"));
		this.active_ = !1;
		try {
			this.isSuccess() ? (this.dispatchEvent("complete"), this.dispatchEvent("success")) : (this.lastErrorCode_ = 6, this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]", this.dispatchErrors_())
		} finally {
			this.cleanUpXhr_()
		}
	}
};
goog$net$XhrIo.prototype.onProgressHandler_ = function(a, b) {
	goog$asserts$assert("progress" === a.type, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");
	this.dispatchEvent(goog$net$XhrIo$buildProgressEvent_(a, "progress"));
	this.dispatchEvent(goog$net$XhrIo$buildProgressEvent_(a, b ? "downloadprogress" : "uploadprogress"))
};
var goog$net$XhrIo$buildProgressEvent_ = function(a, b) {
	return {
		type: b,
		lengthComputable: a.lengthComputable,
		loaded: a.loaded,
		total: a.total
	}
};
goog$net$XhrIo.prototype.cleanUpXhr_ = function(a) {
	if (this.xhr_) {
		this.cleanUpTimeoutTimer_();
		var b = this.xhr_,
			c = this.xhrOptions_[0] ? goog$nullFunction : null;
		this.xhrOptions_ = this.xhr_ = null;
		a || this.dispatchEvent("ready");
		try {
			b.onreadystatechange = c
		} catch (d) {
			(a = this.logger_) && a.severe("Problem encountered resetting onreadystatechange: " + d.message, void 0)
		}
	}
};
goog$net$XhrIo.prototype.cleanUpTimeoutTimer_ = function() {
	this.xhr_ && this.useXhr2Timeout_ && (this.xhr_.ontimeout = null);
	goog$isNumber(this.timeoutId_) && (goog$global.clearTimeout(this.timeoutId_), this.timeoutId_ = null)
};
goog$net$XhrIo.prototype.isComplete = function() {
	return 4 == this.getReadyState()
};
goog$net$XhrIo.prototype.isSuccess = function() {
	var a = this.getStatus(),
		b;
	a: switch (a) {
		case 200:
		case 201:
		case 202:
		case 204:
		case 206:
		case 304:
		case 1223:
			b = !0;
			break a;
		default:
			b = !1
	}
	return b || 0 === a && !this.isLastUriEffectiveSchemeHttp_()
};
goog$net$XhrIo.prototype.isLastUriEffectiveSchemeHttp_ = function() {
	var a;
	a = String(this.lastUri_).match(goog$uri$utils$splitRe_)[1] || null;
	!a && goog$global.self && goog$global.self.location && (a = goog$global.self.location.protocol, a = a.substr(0, a.length - 1));
	a = a ? a.toLowerCase() : "";
	return goog$net$XhrIo$HTTP_SCHEME_PATTERN.test(a)
};
goog$net$XhrIo.prototype.getReadyState = function() {
	return this.xhr_ ? this.xhr_.readyState : 0
};
goog$net$XhrIo.prototype.getStatus = function() {
	try {
		return 2 < this.getReadyState() ? this.xhr_.status : -1
	} catch (a) {
		return -1
	}
};
goog$net$XhrIo.prototype.getStatusText = function() {
	try {
		return 2 < this.getReadyState() ? this.xhr_.statusText : ""
	} catch (a) {
		return goog$log$fine(this.logger_, "Can not get status: " + a.message), ""
	}
};
goog$net$XhrIo.prototype.getResponseText = function() {
	try {
		return this.xhr_ ? this.xhr_.responseText : ""
	} catch (a) {
		return goog$log$fine(this.logger_, "Can not get responseText: " + a.message), ""
	}
};
goog$net$XhrIo.prototype.getResponseJson = function(a) {
	if (this.xhr_) {
		var b = this.xhr_.responseText;
		a && 0 == b.indexOf(a) && (b = b.substring(a.length));
		return goog$json$parse(b)
	}
};
goog$net$XhrIo.prototype.getResponseHeader = function(a) {
	if (this.xhr_ && this.isComplete()) return a = this.xhr_.getResponseHeader(a), null === a ? void 0 : a
};
goog$net$XhrIo.prototype.getAllResponseHeaders = function() {
	return this.xhr_ && this.isComplete() ? this.xhr_.getAllResponseHeaders() : ""
};
goog$net$XhrIo.prototype.formatMsg_ = function(a) {
	return a + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]"
};
goog$debug$entryPointRegistry$register(function(a) {
	goog$net$XhrIo.prototype.onReadyStateChangeEntryPoint_ = a(goog$net$XhrIo.prototype.onReadyStateChangeEntryPoint_)
});
var goog$Uri = function(a, b) {
	this.domain_ = this.userInfo_ = this.scheme_ = "";
	this.port_ = null;
	this.fragment_ = this.path_ = "";
	this.ignoreCase_ = this.isReadOnly_ = !1;
	var c;
	a instanceof goog$Uri ? (this.ignoreCase_ = goog$isDef(b) ? b : a.ignoreCase_, this.setScheme(a.scheme_), this.setUserInfo(a.userInfo_), this.setDomain(a.domain_), this.setPort(a.port_), this.setPath(a.path_), this.setQueryData(a.queryData_.clone()), this.setFragment(a.fragment_)) : a && (c = String(a).match(goog$uri$utils$splitRe_)) ? (this.ignoreCase_ = !!b, this.setScheme(c[1] ||
		"", !0), this.setUserInfo(c[2] || "", !0), this.setDomain(c[3] || "", !0), this.setPort(c[4]), this.setPath(c[5] || "", !0), this.setQueryData(c[6] || "", !0), this.setFragment(c[7] || "", !0)) : (this.ignoreCase_ = !!b, this.queryData_ = new goog$Uri$QueryData(null, null, this.ignoreCase_))
};
goog$Uri.prototype.toString = function() {
	var a = [],
		b = this.scheme_;
	b && a.push(goog$Uri$encodeSpecialChars_(b, goog$Uri$reDisallowedInSchemeOrUserInfo_, !0), ":");
	var c = this.domain_;
	if (c || "file" == b) a.push("//"), (b = this.userInfo_) && a.push(goog$Uri$encodeSpecialChars_(b, goog$Uri$reDisallowedInSchemeOrUserInfo_, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.port_, null != c && a.push(":", String(c));
	if (c = this.path_) this.hasDomain() && "/" != c.charAt(0) && a.push("/"), a.push(goog$Uri$encodeSpecialChars_(c,
		"/" == c.charAt(0) ? goog$Uri$reDisallowedInAbsolutePath_ : goog$Uri$reDisallowedInRelativePath_, !0));
	(c = this.getEncodedQuery()) && a.push("?", c);
	(c = this.fragment_) && a.push("#", goog$Uri$encodeSpecialChars_(c, goog$Uri$reDisallowedInFragment_));
	return a.join("")
};
goog$Uri.prototype.resolve = function(a) {
	var b = this.clone(),
		c = a.hasScheme();
	c ? b.setScheme(a.scheme_) : c = a.hasUserInfo();
	c ? b.setUserInfo(a.userInfo_) : c = a.hasDomain();
	c ? b.setDomain(a.domain_) : c = a.hasPort();
	var d = a.path_;
	if (c) b.setPort(a.port_);
	else if (c = a.hasPath()) {
		if ("/" != d.charAt(0))
			if (this.hasDomain() && !this.hasPath()) d = "/" + d;
			else {
				var e = b.path_.lastIndexOf("/"); - 1 != e && (d = b.path_.substr(0, e + 1) + d)
			}
		if (".." == d || "." == d) d = "";
		else if (-1 != d.indexOf("./") || -1 != d.indexOf("/.")) {
			for (var e = 0 == d.lastIndexOf("/",
					0), d = d.split("/"), f = [], g = 0; g < d.length;) {
				var h = d[g++];
				"." == h ? e && g == d.length && f.push("") : ".." == h ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(), e && g == d.length && f.push("")) : (f.push(h), e = !0)
			}
			d = f.join("/")
		}
	}
	c ? b.setPath(d) : c = a.hasQuery();
	c ? b.setQueryData(a.queryData_.clone()) : c = a.hasFragment();
	c && b.setFragment(a.fragment_);
	return b
};
goog$Uri.prototype.clone = function() {
	return new goog$Uri(this)
};
goog$Uri.prototype.setScheme = function(a, b) {
	this.enforceReadOnly();
	if (this.scheme_ = b ? goog$Uri$decodeOrEmpty_(a, !0) : a) this.scheme_ = this.scheme_.replace(/:$/, "");
	return this
};
goog$Uri.prototype.hasScheme = function() {
	return !!this.scheme_
};
goog$Uri.prototype.setUserInfo = function(a, b) {
	this.enforceReadOnly();
	this.userInfo_ = b ? goog$Uri$decodeOrEmpty_(a) : a;
	return this
};
goog$Uri.prototype.hasUserInfo = function() {
	return !!this.userInfo_
};
goog$Uri.prototype.setDomain = function(a, b) {
	this.enforceReadOnly();
	this.domain_ = b ? goog$Uri$decodeOrEmpty_(a, !0) : a;
	return this
};
goog$Uri.prototype.hasDomain = function() {
	return !!this.domain_
};
goog$Uri.prototype.setPort = function(a) {
	this.enforceReadOnly();
	if (a) {
		a = Number(a);
		if (isNaN(a) || 0 > a) throw Error("Bad port number " + a);
		this.port_ = a
	} else this.port_ = null;
	return this
};
goog$Uri.prototype.hasPort = function() {
	return null != this.port_
};
goog$Uri.prototype.setPath = function(a, b) {
	this.enforceReadOnly();
	this.path_ = b ? goog$Uri$decodeOrEmpty_(a, !0) : a;
	return this
};
goog$Uri.prototype.hasPath = function() {
	return !!this.path_
};
goog$Uri.prototype.hasQuery = function() {
	return "" !== this.queryData_.toString()
};
goog$Uri.prototype.setQueryData = function(a, b) {
	this.enforceReadOnly();
	a instanceof goog$Uri$QueryData ? (this.queryData_ = a, this.queryData_.setIgnoreCase(this.ignoreCase_)) : (b || (a = goog$Uri$encodeSpecialChars_(a, goog$Uri$reDisallowedInQuery_)), this.queryData_ = new goog$Uri$QueryData(a, null, this.ignoreCase_));
	return this
};
goog$Uri.prototype.getEncodedQuery = function() {
	return this.queryData_.toString()
};
goog$Uri.prototype.setParameterValue = function(a, b) {
	this.enforceReadOnly();
	this.queryData_.set(a, b);
	return this
};
goog$Uri.prototype.setFragment = function(a, b) {
	this.enforceReadOnly();
	this.fragment_ = b ? goog$Uri$decodeOrEmpty_(a) : a;
	return this
};
goog$Uri.prototype.hasFragment = function() {
	return !!this.fragment_
};
goog$Uri.prototype.makeUnique = function() {
	this.enforceReadOnly();
	this.setParameterValue("zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog$now()).toString(36));
	return this
};
goog$Uri.prototype.enforceReadOnly = function() {
	if (this.isReadOnly_) throw Error("Tried to modify a read-only Uri");
};
goog$Uri.prototype.setIgnoreCase = function(a) {
	this.ignoreCase_ = a;
	this.queryData_ && this.queryData_.setIgnoreCase(a);
	return this
};
var goog$Uri$decodeOrEmpty_ = function(a, b) {
		return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
	},
	goog$Uri$encodeSpecialChars_ = function(a, b, c) {
		return goog$isString(a) ? (a = encodeURI(a).replace(b, goog$Uri$encodeChar_), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
	},
	goog$Uri$encodeChar_ = function(a) {
		a = a.charCodeAt(0);
		return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
	},
	goog$Uri$reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g,
	goog$Uri$reDisallowedInRelativePath_ = /[\#\?:]/g,
	goog$Uri$reDisallowedInAbsolutePath_ =
	/[\#\?]/g,
	goog$Uri$reDisallowedInQuery_ = /[\#\?@]/g,
	goog$Uri$reDisallowedInFragment_ = /#/g,
	goog$Uri$QueryData = function(a, b, c) {
		this.count_ = this.keyMap_ = null;
		this.encodedQuery_ = a || null;
		this.ignoreCase_ = !!c
	};
goog$Uri$QueryData.prototype.ensureKeyMapInitialized_ = function() {
	if (!this.keyMap_ && (this.keyMap_ = new goog$structs$Map, this.count_ = 0, this.encodedQuery_)) {
		var a = this;
		goog$uri$utils$parseQueryData(this.encodedQuery_, function(b, c) {
			a.add(goog$string$urlDecode(b), c)
		})
	}
};
goog$Uri$QueryData.prototype.add = function(a, b) {
	this.ensureKeyMapInitialized_();
	this.invalidateCache_();
	a = this.getKeyName_(a);
	var c = this.keyMap_.get(a);
	c || this.keyMap_.set(a, c = []);
	c.push(b);
	this.count_ = goog$asserts$assertNumber(this.count_) + 1;
	return this
};
goog$Uri$QueryData.prototype.remove = function(a) {
	this.ensureKeyMapInitialized_();
	a = this.getKeyName_(a);
	return this.keyMap_.containsKey(a) ? (this.invalidateCache_(), this.count_ = goog$asserts$assertNumber(this.count_) - this.keyMap_.get(a).length, this.keyMap_.remove(a)) : !1
};
goog$Uri$QueryData.prototype.clear = function() {
	this.invalidateCache_();
	this.keyMap_ = null;
	this.count_ = 0
};
goog$Uri$QueryData.prototype.containsKey = function(a) {
	this.ensureKeyMapInitialized_();
	a = this.getKeyName_(a);
	return this.keyMap_.containsKey(a)
};
goog$Uri$QueryData.prototype.getKeys = function() {
	this.ensureKeyMapInitialized_();
	for (var a = this.keyMap_.getValues(), b = this.keyMap_.getKeys(), c = [], d = 0; d < b.length; d++)
		for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
	return c
};
goog$Uri$QueryData.prototype.getValues = function(a) {
	this.ensureKeyMapInitialized_();
	var b = [];
	if (goog$isString(a)) this.containsKey(a) && (b = goog$array$concat(b, this.keyMap_.get(this.getKeyName_(a))));
	else {
		a = this.keyMap_.getValues();
		for (var c = 0; c < a.length; c++) b = goog$array$concat(b, a[c])
	}
	return b
};
goog$Uri$QueryData.prototype.set = function(a, b) {
	this.ensureKeyMapInitialized_();
	this.invalidateCache_();
	a = this.getKeyName_(a);
	this.containsKey(a) && (this.count_ = goog$asserts$assertNumber(this.count_) - this.keyMap_.get(a).length);
	this.keyMap_.set(a, [b]);
	this.count_ = goog$asserts$assertNumber(this.count_) + 1;
	return this
};
goog$Uri$QueryData.prototype.get = function(a, b) {
	a = a ? this.getValues(a) : [];
	return 0 < a.length ? String(a[0]) : b
};
goog$Uri$QueryData.prototype.setValues = function(a, b) {
	this.remove(a);
	0 < b.length && (this.invalidateCache_(), this.keyMap_.set(this.getKeyName_(a), goog$array$toArray(b)), this.count_ = goog$asserts$assertNumber(this.count_) + b.length)
};
goog$Uri$QueryData.prototype.toString = function() {
	if (this.encodedQuery_) return this.encodedQuery_;
	if (!this.keyMap_) return "";
	for (var a = [], b = this.keyMap_.getKeys(), c = 0; c < b.length; c++)
		for (var d = b[c], e = encodeURIComponent(String(d)), d = this.getValues(d), f = 0; f < d.length; f++) {
			var g = e;
			"" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
			a.push(g)
		}
	return this.encodedQuery_ = a.join("&")
};
goog$Uri$QueryData.prototype.invalidateCache_ = function() {
	this.encodedQuery_ = null
};
goog$Uri$QueryData.prototype.clone = function() {
	var a = new goog$Uri$QueryData;
	a.encodedQuery_ = this.encodedQuery_;
	this.keyMap_ && (a.keyMap_ = this.keyMap_.clone(), a.count_ = this.count_);
	return a
};
goog$Uri$QueryData.prototype.getKeyName_ = function(a) {
	a = String(a);
	this.ignoreCase_ && (a = a.toLowerCase());
	return a
};
goog$Uri$QueryData.prototype.setIgnoreCase = function(a) {
	var b = a && !this.ignoreCase_;
	b && (this.ensureKeyMapInitialized_(), this.invalidateCache_(), this.keyMap_.forEach(function(a, b) {
		var c = b.toLowerCase();
		b != c && (this.remove(b), this.setValues(c, a))
	}, this));
	this.ignoreCase_ = a
};
goog$Uri$QueryData.prototype.extend = function(a) {
	for (var b = 0; b < arguments.length; b++) {
		var c = arguments[b];
		goog$structs$forEach(c, function(a, b) {
			this.add(b, a)
		}, this)
	}
};
var GCJ = {},
	parts$jscomp$inline_599 = ["GCJ"],
	cur$jscomp$inline_600 = goog$global;
parts$jscomp$inline_599[0] in cur$jscomp$inline_600 || !cur$jscomp$inline_600.execScript || cur$jscomp$inline_600.execScript("var " + parts$jscomp$inline_599[0]);
for (var part$jscomp$inline_601; parts$jscomp$inline_599.length && (part$jscomp$inline_601 = parts$jscomp$inline_599.shift());) !parts$jscomp$inline_599.length && goog$isDef(GCJ) ? cur$jscomp$inline_600[part$jscomp$inline_601] = GCJ : cur$jscomp$inline_600 = cur$jscomp$inline_600[part$jscomp$inline_601] && cur$jscomp$inline_600[part$jscomp$inline_601] !== Object.prototype[part$jscomp$inline_601] ? cur$jscomp$inline_600[part$jscomp$inline_601] : cur$jscomp$inline_600[part$jscomp$inline_601] = {};
GCJ.MAX_CONSECUTIVE_POLLING_FAILURES = 5;
var JSCompiler_inline_result$jscomp$41;
JSCompiler_inline_result$jscomp$41 = 'Please try again.  If the problem happens again, please hold shift and reload the page, then try again.  If that fails, please <a href="#s=q">contact us</a>.  If that link is broken, <a href="mailto:codejam@google.com">email us</a>.';
GCJ.PLEASE_TRY_AGAIN_MESSAGE = JSCompiler_inline_result$jscomp$41;
GCJ.e = function(a) {
	return goog$dom$getElement(a)
};
GCJ.createElementUnder = function(a, b, c, d) {
	var e = [a, c];
	goog$array$extend(e, goog$array$slice(arguments, 3));
	e = goog$dom$createDom.apply(this, e);
	b.appendChild(e);
	return e
};
GCJ.listenExclusively = function(a, b, c) {
	goog$isString(a) && (a = goog$dom$getElement(a));
	goog$events$removeAll(a, b);
	goog$events$listen(a, b, c)
};
GCJ.formatSecondsTime = function(a) {
	if (0 > a) return "";
	if (0 == a) return "0";
	var b = Math.floor(a / 60);
	a -= 60 * b;
	a = ":" + (10 > a ? "0" : "") + a;
	if (60 > b) return "" + b + a;
	var c = Math.floor(b / 60),
		b = b - 60 * c;
	return "" + c + ":" + (10 > b ? "0" : "") + b + a
};
GCJ.IO_TYPES = ["-small", "-large", "-testrun"];
GCJ.IO_TIMELIMITS = [4, 8];
GCJ.IO_DISTRIBUTED_TIMEOUTS = [2, 0, 5];
GCJ.getContestPageUrl = function(a, b, c) {
	return a + "/" + b + "/" + c
};
GCJ.alternateTableRowClasses = function(a) {
	a = goog$dom$getFirstElementChild(a);
	for (var b = !0; a;) b && (a.className = a.className ? a.className + " oddrow" : "oddrow"), a = goog$isDef(a.nextElementSibling) ? a.nextElementSibling : goog$dom$getNextElementNode_(a.nextSibling, !0), b = !b
};
GCJ.findPosition = function(a) {
	var b = 0,
		c = 0;
	if (a.offsetParent)
		for (b = a.offsetLeft, c = a.offsetTop; a = a.offsetParent;) b += a.offsetLeft, c += a.offsetTop;
	return [b, c]
};
GCJ.grayOutTextarea = function(a) {
	a.style.color = "gray";
	a.value = a.defaultValue
};
GCJ.clearTextareaIfGrayed = function(a) {
	"gray" == a.style.color && (a.style.color = "", a.value = "")
};
GCJ.makeInvisible = function(a) {
	a.style.visibility = "hidden"
};
GCJ.makeVisible = function(a) {
	a.style.visibility = "visible"
};
GCJ.changeDisplayMode = function(a, b) {
	goog$isString(a) && (a = goog$dom$getElement(a));
	a && goog$style$setStyle(a, "display", b)
};
GCJ.show = function(a) {
	GCJ.changeDisplayMode(a, "block")
};
GCJ.hide = function(a) {
	GCJ.changeDisplayMode(a, "none")
};
GCJ.displayElementsByClass = function(a, b) {
	a = goog$dom$getElementsByTagNameAndClass_(document, null, a, void 0);
	for (var c = 0; c < a.length; ++c) GCJ.changeDisplayMode(a[c], b)
};
GCJ.toggleVisibility = function(a, b, c, d) {
	a = GCJ.e(a);
	a.style.display && "none" != a.style.display ? (GCJ.hide(a), a = "close") : (GCJ.show(a), a = "open");
	b && (b = GCJ.e(b), b.src = "open" == a ? c : d)
};
GCJ.addEvent = function(a, b, c) {
	a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
};
GCJ.paramsToUrl_ = function(a, b) {
	return (b = GCJ.urlEscapeParams_(b)) ? a + "?" + b : a
};
GCJ.getCsrfToken = function() {
	return GCJ.csrfMiddlewareToken
};
GCJ.urlEscapeParams_ = function(a) {
	var b = [],
		c;
	for (c in a) b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
	return b.join("&")
};
GCJ.isRequestSuccessful = function(a) {
	switch (a) {
		case 200:
		case 201:
		case 202:
		case 204:
		case 304:
		case 1223:
			return !0;
		default:
			return !1
	}
};
GCJ.failurePolicyRetryThreeTimes = function(a, b) {
	if (2 < b) return {
		tryAgain: !1
	};
	a = {
		tryAgain: !0
	};
	a.retrySeconds = 0 == b ? 1 : 2;
	return a
};
GCJ.failurePolicyRetryContestInfoV0 = function(a, b) {
	if (404 == a) return 0 == b ? {
		tryAgain: !0,
		retrySeconds: 2
	} : {
		tryAgain: !1
	};
	switch (b) {
		case 0:
			return {
				tryAgain: !0,
				retrySeconds: 5
			};
		case 1:
		case 2:
			return {
				tryAgain: !0,
				retrySeconds: 10
			};
		default:
			return {
				tryAgain: !1
			}
	}
};
GCJ.retryFailurePolicyFactory = function(a, b) {
	return function(c, d) {
		return d < b ? {
			tryAgain: !0,
			retrySeconds: a
		} : {
			tryAgain: !1
		}
	}
};
GCJ.failurePolicyRetryContestInfo = function(a, b) {
	if (404 == a) return 0 == b ? {
		tryAgain: !0,
		retrySeconds: 2
	} : {
		tryAgain: !1
	};
	if (20 <= b) return {
		tryAgain: !1
	};
	a = {
		tryAgain: !0
	};
	a.retrySeconds = 5 > b ? 2 : 10 > b ? 4 : 10;
	return a
};
GCJ.ajaxRequest = function(a, b, c, d, e) {
	var f, g, h = d || {},
		h = goog$cloneObject(h);
	h.method = h.method || "GET";
	void 0 === h.csrfProtect && (h.csrfProtect = !0);
	h.failurePolicy = h.failurePolicy || GCJ.failurePolicyRetryThreeTimes;
	void 0 === h.treatResponseAsJson && (h.treatResponseAsJson = !1);
	e = e || 0;
	h.csrfProtect && (b.csrfmiddlewaretoken = GCJ.getCsrfToken());
	"GET" === h.method ? f = GCJ.paramsToUrl_(a, b) : (f = a, g = GCJ.urlEscapeParams_(b));
	goog$net$XhrIo$send(f, function(f) {
		f = f.target;
		var g = f.getStatus(),
			k = "";
		if (200 == g) {
			var n = !1;
			try {
				h.treatResponseAsJson &&
					(k = f.getResponseJson())
			} catch (l) {
				n = !0, g = 306
			}
			if (!n) {
				h.treatResponseAsJson || (k = f.getResponseText());
				c(k, g);
				return
			}
		}
		k = h.failurePolicy(g, e);
		h.failureCallback && h.failureCallback(g, e);
		k.tryAgain ? (f = k.retrySeconds, goog$global.setTimeout(goog$partial(GCJ.ajaxRequest, a, b, c, d, e + 1), 1E3 * f)) : (k = f.getResponseText(), c(k, g))
	}, h.method, g)
};
GCJ.ajaxJsonRequest = function(a, b, c, d) {
	d = d || {};
	d = goog$cloneObject(d);
	d.treatResponseAsJson = !0;
	GCJ.ajaxRequest(a, b, c, d)
};
GCJ.ajaxForward = function(a, b) {
	b.csrfmiddlewaretoken = GCJ.getCsrfToken();
	window.location = GCJ.paramsToUrl_(a, b)
};
GCJ.timerDeadlines = {};
GCJ.timerCallbacks = {};
GCJ.startTimer = function(a, b, c) {
	GCJ.timerDeadlines[a] = new Date((new Date).getTime() + b);
	GCJ.timerCallbacks[a] = c ? c : function() {};
	GCJ.updateTimeLeft_(a)
};
GCJ.stopTimer = function(a) {
	delete GCJ.timerDeadlines[a];
	delete GCJ.timerCallbacks[a]
};
GCJ.updateTimerDuration = function(a, b, c) {
	if (0 > b) GCJ.stopTimer(a);
	else {
		b = new Date((new Date).getTime() + b);
		var d = GCJ.timerDeadlines[a];
		d && (c && b > d || (GCJ.timerDeadlines[a] = b))
	}
};
GCJ.getTimeLeft = function(a) {
	return (a = GCJ.timerDeadlines[a]) ? a.getTime() - (new Date).getTime() : 0
};
GCJ.updateTimeLeft_ = function(a) {
	var b;
	if (b = GCJ.timerDeadlines[a]) b = b.getTime() - (new Date).getTime(), null != GCJ.e(a) && (0 >= b ? (GCJ.e(a).innerHTML = "Time expired", GCJ.timerCallbacks[a](), GCJ.stopTimer(a)) : (GCJ.e(a).innerHTML = GCJ.formatTime(b), goog$global.setTimeout(goog$partial(GCJ.updateTimeLeft_, a), 1E3)))
};
GCJ.formatTime = function(a) {
	var b = a / 1E3,
		c = Math.floor(b) % 60;
	a = Math.floor(b / 60) % 60;
	var b = Math.floor(b / 60 / 60),
		d = Math.floor(b / 24),
		b = b % 24,
		c = (10 > c ? "0" : "") + c,
		e = function(a) {
			return 0 >= a ? "" : 1 == a ? "1 day" : a += " days"
		},
		f = function(a, b, c, d) {
			return 0 < a ? 1 == b ? "1 hour" : a = b + " hours" : 0 < b ? 1 == b ? a = "1 hour " + (c + "min") : a = b + (" hours " + (c + " min")) : a = c + ("min " + (d + "sec"))
		},
		e = e(d),
		g = "" == e ? "" : " ";
	a = f(d, b, a, c);
	return e + g + a
};
GCJ.initHistory = function() {
	GCJ.history = new goog$History;
	goog$events$listen(GCJ.history, "navigate", GCJ.historyNavCallback)
};
GCJ.historyNavCallback = function() {};
GCJ.changeHistoryState = function(a, b) {
	var c = GCJ.history.getToken(),
		c = new goog$Uri$QueryData(c);
	c.set(a, "" + b);
	GCJ.history.setToken(c.toString())
};
GCJ.changeHistoryStateOnEnter = function(a, b, c) {
	c = String.fromCharCode(c.keyCode);
	"\r" != c && "\n" != c || GCJ.changeHistoryState(a, b)
};
GCJ.sharedMessages = {};
GCJ.sharedMessages.pointsForProblemShort = function(a) {
	return a += "pt"
};
GCJ.sharedMessages.remainingTime = function(a) {
	return a = "<b>Time Remaining:</b> " + a
};
GCJ.sharedMessages.MSG_PROBLEM_STATUS_LARGE_TIMEOUT = "Time expired";
var goog$debug$RelativeTimeProvider = function() {
	this.relativeTimeStart_ = goog$now()
};
new goog$debug$RelativeTimeProvider;
goog$debug$RelativeTimeProvider.prototype.set = function(a) {
	this.relativeTimeStart_ = a
};
goog$debug$RelativeTimeProvider.prototype.reset = function() {
	this.set(goog$now())
};
goog$debug$RelativeTimeProvider.prototype.get = function() {
	return this.relativeTimeStart_
};
var goog$net$IframeIo = function() {
		goog$events$EventTarget.call(this);
		this.name_ = "closure_frame" + goog$net$IframeIo$counter_++;
		this.iframesForDisposal_ = [];
		goog$net$IframeIo$instances_[this.name_] = this
	},
	goog$net$IframeIo$form_;
goog$inherits(goog$net$IframeIo, goog$events$EventTarget);
var goog$net$IframeIo$instances_ = {},
	goog$net$IframeIo$counter_ = 0,
	goog$net$IframeIo$addFormInputs_ = function(a, b) {
		var c = goog$dom$getDomHelper(a);
		goog$structs$forEach(b, function(b, e) {
			goog$isArray(b) || (b = [b]);
			goog$array$forEach(b, function(b) {
				b = c.createDom("INPUT", {
					type: "hidden",
					name: e,
					value: b
				});
				a.appendChild(b)
			})
		})
	};
goog$net$IframeIo.prototype.logger_ = goog$log$getLogger("goog.net.IframeIo");
goog$net$IframeIo.prototype.form_ = null;
goog$net$IframeIo.prototype.iframe_ = null;
goog$net$IframeIo.prototype.iframeName_ = null;
goog$net$IframeIo.prototype.nextIframeId_ = 0;
goog$net$IframeIo.prototype.active_ = !1;
goog$net$IframeIo.prototype.complete_ = !1;
goog$net$IframeIo.prototype.success_ = !1;
goog$net$IframeIo.prototype.lastUri_ = null;
goog$net$IframeIo.prototype.lastContent_ = null;
goog$net$IframeIo.prototype.lastErrorCode_ = 0;
goog$net$IframeIo.prototype.iframeDisposalTimer_ = null;
goog$net$IframeIo.prototype.ignoreResponse_ = !1;
goog$net$IframeIo.prototype.send = function(a, b, c, d) {
	if (this.active_) throw Error("[goog.net.IframeIo] Unable to send, already active.");
	this.lastUri_ = a = new goog$Uri(a);
	b = b ? b.toUpperCase() : "GET";
	c && a.makeUnique();
	(c = this.logger_) && c.info("Sending iframe request: " + a + " [" + b + "]", void 0);
	goog$net$IframeIo$form_ || (goog$net$IframeIo$form_ = goog$dom$createDom("FORM"), goog$net$IframeIo$form_.acceptCharset = "utf-8", c = goog$net$IframeIo$form_.style, c.position = "absolute", c.visibility = "hidden", c.top = c.left = "-10px",
		c.width = c.height = "10px", c.overflow = "hidden", document.body.appendChild(goog$net$IframeIo$form_));
	this.form_ = c = goog$net$IframeIo$form_;
	"GET" == b && goog$net$IframeIo$addFormInputs_(this.form_, a.queryData_);
	d && goog$net$IframeIo$addFormInputs_(this.form_, d);
	this.form_.action = a.toString();
	this.form_.method = b;
	this.sendFormInternal_();
	this.clearForm_()
};
goog$net$IframeIo.prototype.sendFromForm = function(a, b, c) {
	if (this.active_) throw Error("[goog.net.IframeIo] Unable to send, already active.");
	b = new goog$Uri(b || a.action);
	c && b.makeUnique();
	(c = this.logger_) && c.info("Sending iframe request from form: " + b, void 0);
	this.lastUri_ = b;
	this.form_ = a;
	this.form_.action = b.toString();
	this.sendFormInternal_()
};
goog$net$IframeIo.prototype.abort = function(a) {
	if (this.active_) {
		var b = this.logger_;
		b && b.info("Request aborted", void 0);
		b = this.getRequestIframe();
		goog$asserts$assert(b);
		goog$events$removeAll(b);
		this.success_ = this.active_ = this.complete_ = !1;
		this.lastErrorCode_ = a || 7;
		this.dispatchEvent("abort");
		this.makeReady_()
	}
};
goog$net$IframeIo.prototype.disposeInternal = function() {
	goog$log$fine(this.logger_, "Disposing iframeIo instance");
	this.active_ && (goog$log$fine(this.logger_, "Aborting active request"), this.abort());
	goog$net$IframeIo.superClass_.disposeInternal.call(this);
	this.iframe_ && this.scheduleIframeDisposal_();
	this.disposeForm_();
	delete this.errorChecker_;
	this.lastUri_ = this.lastContent_ = this.form_ = null;
	this.lastErrorCode_ = 0;
	delete goog$net$IframeIo$instances_[this.name_]
};
goog$net$IframeIo.prototype.isComplete = function() {
	return this.complete_
};
goog$net$IframeIo.prototype.isSuccess = function() {
	return this.success_
};
goog$net$IframeIo.prototype.getResponseText = function() {
	return this.lastContent_
};
goog$net$IframeIo.prototype.getResponseJson = function() {
	return goog$json$parse(this.lastContent_)
};
goog$net$IframeIo.prototype.sendFormInternal_ = function() {
	this.active_ = !0;
	this.complete_ = !1;
	this.lastErrorCode_ = 0;
	this.createIframe_();
	if (goog$userAgent$IE && !goog$userAgent$isVersionOrHigher("11")) {
		this.form_.target = this.iframeName_ || "";
		this.appendIframe_();
		this.ignoreResponse_ || goog$events$listen(this.iframe_, "readystatechange", this.onIeReadyStateChange_, !1, this);
		try {
			this.errorHandled_ = !1, this.form_.submit()
		} catch (x) {
			this.ignoreResponse_ || goog$events$unlisten(this.iframe_, "readystatechange", this.onIeReadyStateChange_, !1, this), this.handleError_(1)
		}
	} else {
		goog$log$fine(this.logger_, "Setting up iframes and cloning form");
		this.appendIframe_();
		var a = this.iframeName_ + "_inner",
			b = goog$dom$getFrameContentDocument(this.iframe_),
			c;
		document.baseURI ? (c = goog$string$htmlEscape(a), c = goog$html$uncheckedconversions$safeHtmlFromStringKnownToSatisfyTypeContract(goog$string$Const$create__googStringSecurityPrivate_("Short HTML snippet, input escaped, safe URL, for performance"), '<head><base href="' + goog$string$htmlEscape(document.baseURI) +
			'"></head><body><iframe id="' + c + '" name="' + c + '"></iframe>')) : (c = goog$string$htmlEscape(a), c = goog$html$uncheckedconversions$safeHtmlFromStringKnownToSatisfyTypeContract(goog$string$Const$create__googStringSecurityPrivate_("Short HTML snippet, input escaped, for performance"), '<body><iframe id="' + c + '" name="' + c + '"></iframe>'));
		if (goog$userAgent$OPERA && !goog$userAgent$WEBKIT) {
			var d = b.documentElement,
				e = d.tagName.toUpperCase();
			if (goog$dom$safe$SET_INNER_HTML_DISALLOWED_TAGS_[e]) throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " +
				d.tagName + ".");
			d.innerHTML = goog$html$SafeHtml$unwrap(c)
		} else b.write(goog$html$SafeHtml$unwrap(c));
		this.ignoreResponse_ || goog$events$listen(b.getElementById(a), "load", this.onIframeLoaded_, !1, this);
		e = goog$dom$getElementsByTagName("TEXTAREA", goog$asserts$assert(this.form_));
		c = 0;
		for (d = e.length; c < d; c++) {
			var f = e[c].value,
				g;
			g = [];
			goog$dom$getTextContent_(e[c], g, !1);
			g = g.join("");
			if (g != f) {
				g = e[c];
				var h = f;
				goog$asserts$assert(null != g, "goog.dom.setTextContent expects a non-null value for node");
				if ("textContent" in
					g) g.textContent = h;
				else if (3 == g.nodeType) g.data = h;
				else if (g.firstChild && 3 == g.firstChild.nodeType) {
					for (; g.lastChild != g.firstChild;) g.removeChild(g.lastChild);
					g.firstChild.data = h
				} else {
					goog$dom$removeChildren(g);
					var k = goog$dom$getOwnerDocument(g);
					g.appendChild(k.createTextNode(String(h)))
				}
				e[c].value = f
			}
		}
		e = b.importNode(this.form_, !0);
		e.target = a;
		e.action = this.form_.action;
		b.body.appendChild(e);
		f = goog$dom$getElementsByTagName("SELECT", goog$asserts$assert(this.form_));
		g = goog$dom$getElementsByTagName("SELECT",
			e);
		c = 0;
		for (d = f.length; c < d; c++)
			for (var h = goog$dom$getElementsByTagName("OPTION", f[c]), k = goog$dom$getElementsByTagName("OPTION", g[c]), m = 0, p = h.length; m < p; m++) k[m].selected = h[m].selected;
		f = goog$dom$getElementsByTagName("INPUT", goog$asserts$assert(this.form_));
		g = goog$dom$getElementsByTagName("INPUT", e);
		c = 0;
		for (d = f.length; c < d; c++)
			if ("file" == f[c].type && f[c].value != g[c].value) {
				goog$log$fine(this.logger_, "File input value not cloned properly.  Will submit using original form.");
				this.form_.target = a;
				e = this.form_;
				break
			}
		goog$log$fine(this.logger_, "Submitting form");
		try {
			this.errorHandled_ = !1, e.submit(), b.close(), goog$userAgent$GECKO && goog$Timer$callOnce(this.testForFirefoxSilentError_, 250, this)
		} catch (x) {
			c = this.logger_;
			var n;
			try {
				var l;
				var d = x,
					q = goog$getObjectByName("window.location.href");
				if (goog$isString(d)) l = {
					message: d,
					name: "Unknown error",
					lineNumber: "Not available",
					fileName: q,
					stack: "Not available"
				};
				else {
					var r, t, e = !1;
					try {
						r = d.lineNumber || d.line || "Not available"
					} catch (w) {
						r = "Not available", e = !0
					}
					try {
						t = d.fileName ||
							d.filename || d.sourceURL || goog$global.$googDebugFname || q
					} catch (w) {
						t = "Not available", e = !0
					}
					l = !e && d.lineNumber && d.fileName && d.stack && d.message && d.name ? d : {
						message: d.message || "Not available",
						name: d.name || "UnknownError",
						lineNumber: r,
						fileName: t,
						stack: d.stack || "Not available"
					}
				}
				var u;
				var v = l.fileName;
				null != v || (v = "");
				if (/^https?:\/\//i.test(v)) {
					var z = goog$html$SafeUrl$sanitize(v),
						y = goog$string$Const$create__googStringSecurityPrivate_("view-source scheme plus HTTP/HTTPS URL"),
						A = "view-source:" + goog$html$SafeUrl$unwrap(z);
					goog$asserts$assertString(goog$string$Const$unwrap(y), "must provide justification");
					goog$asserts$assert(!/^[\s\xa0]*$/.test(goog$string$Const$unwrap(y)), "must provide non-empty justification");
					u = goog$html$SafeUrl$createSafeUrlSecurityPrivateDoNotAccessOrElse(A)
				} else u = goog$html$SafeUrl$createSafeUrlSecurityPrivateDoNotAccessOrElse(goog$string$Const$unwrap(goog$string$Const$create__googStringSecurityPrivate_("sanitizedviewsrc")));
				var B = goog$html$SafeHtml$concat(goog$html$SafeHtml$htmlEscapePreservingNewlinesAndSpaces("Message: " +
					l.message + "\nUrl: "), goog$html$SafeHtml$create("a", {
					href: u,
					target: "_new"
				}, l.fileName), goog$html$SafeHtml$htmlEscapePreservingNewlinesAndSpaces("\nLine: " + l.lineNumber + "\n\nBrowser stack:\n" + l.stack + "-> [end]\n\nJS stack traversal:\n" + goog$debug$getStacktrace(void 0) + "-> "));
				n = B
			} catch (w) {
				n = goog$html$SafeHtml$htmlEscapePreservingNewlinesAndSpaces("Exception trying to expose exception! You win, we lose. " + w)
			}
			n = goog$html$SafeHtml$unwrap(n);
			c && c.severe("Error when submitting form: " + n, void 0);
			this.ignoreResponse_ ||
				goog$events$unlisten(b.getElementById(a), "load", this.onIframeLoaded_, !1, this);
			b.close();
			this.handleError_(2)
		}
	}
};
goog$net$IframeIo.prototype.onIeReadyStateChange_ = function() {
	if ("complete" == this.iframe_.readyState) {
		goog$events$unlisten(this.iframe_, "readystatechange", this.onIeReadyStateChange_, !1, this);
		var a;
		try {
			if (a = goog$dom$getFrameContentDocument(this.iframe_), goog$userAgent$IE && "about:blank" == a.location && !navigator.onLine) {
				this.handleError_(9);
				return
			}
		} catch (b) {
			this.handleError_(1);
			return
		}
		this.handleLoad_(a)
	}
};
goog$net$IframeIo.prototype.onIframeLoaded_ = function() {
	if (!goog$userAgent$OPERA || goog$userAgent$WEBKIT || "about:blank" != this.getContentDocument_().location) {
		goog$events$unlisten(this.getRequestIframe(), "load", this.onIframeLoaded_, !1, this);
		try {
			this.handleLoad_(this.getContentDocument_())
		} catch (a) {
			this.handleError_(1)
		}
	}
};
goog$net$IframeIo.prototype.handleLoad_ = function(a) {
	goog$log$fine(this.logger_, "Iframe loaded");
	this.complete_ = !0;
	this.active_ = !1;
	var b;
	try {
		var c = a.body;
		this.lastContent_ = c.textContent || c.innerText
	} catch (e) {
		b = 1
	}
	var d;
	b || "function" != typeof this.errorChecker_ || (d = this.errorChecker_(a)) && (b = 4);
	(a = this.logger_) && a.log(goog$debug$Logger$Level$FINER, "Last content: " + this.lastContent_, void 0);
	(a = this.logger_) && a.log(goog$debug$Logger$Level$FINER, "Last uri: " + this.lastUri_, void 0);
	b ? (goog$log$fine(this.logger_,
		"Load event occurred but failed"), this.handleError_(b, d)) : (goog$log$fine(this.logger_, "Load succeeded"), this.success_ = !0, this.lastErrorCode_ = 0, this.dispatchEvent("complete"), this.dispatchEvent("success"), this.makeReady_())
};
goog$net$IframeIo.prototype.handleError_ = function(a, b) {
	this.errorHandled_ || (this.active_ = this.success_ = !1, this.complete_ = !0, this.lastErrorCode_ = a, 4 == a && goog$asserts$assert(goog$isDef(b)), this.dispatchEvent("complete"), this.dispatchEvent("error"), this.makeReady_(), this.errorHandled_ = !0)
};
goog$net$IframeIo.prototype.makeReady_ = function() {
	var a = this.logger_;
	a && a.info("Ready for new requests", void 0);
	this.scheduleIframeDisposal_();
	this.disposeForm_();
	this.dispatchEvent("ready")
};
goog$net$IframeIo.prototype.createIframe_ = function() {
	goog$log$fine(this.logger_, "Creating iframe");
	this.iframeName_ = this.name_ + "_" + (this.nextIframeId_++).toString(36);
	var a = {
		name: this.iframeName_,
		id: this.iframeName_
	};
	goog$userAgent$IE && 7 > Number(goog$userAgent$VERSION) && (a.src = 'javascript:""');
	this.iframe_ = goog$dom$getDomHelper(this.form_).createDom("IFRAME", a);
	a = this.iframe_.style;
	a.visibility = "hidden";
	a.width = a.height = "10px";
	a.display = "none";
	goog$userAgent$WEBKIT ? a.marginTop = a.marginLeft = "-10px" :
		(a.position = "absolute", a.top = a.left = "-10px")
};
goog$net$IframeIo.prototype.appendIframe_ = function() {
	goog$dom$getDomHelper(this.form_).document_.body.appendChild(this.iframe_)
};
goog$net$IframeIo.prototype.scheduleIframeDisposal_ = function() {
	var a = this.iframe_;
	a && (a.onreadystatechange = null, a.onload = null, a.onerror = null, this.iframesForDisposal_.push(a));
	this.iframeDisposalTimer_ && (goog$global.clearTimeout(this.iframeDisposalTimer_), this.iframeDisposalTimer_ = null);
	goog$userAgent$GECKO || goog$userAgent$OPERA && !goog$userAgent$WEBKIT ? this.iframeDisposalTimer_ = goog$Timer$callOnce(this.disposeIframes_, 2E3, this) : this.disposeIframes_();
	this.iframeName_ = this.iframe_ = null
};
goog$net$IframeIo.prototype.disposeIframes_ = function() {
	this.iframeDisposalTimer_ && (goog$global.clearTimeout(this.iframeDisposalTimer_), this.iframeDisposalTimer_ = null);
	for (; 0 != this.iframesForDisposal_.length;) {
		var a = this.iframesForDisposal_.pop(),
			b = this.logger_;
		b && b.info("Disposing iframe", void 0);
		goog$dom$removeNode(a)
	}
};
goog$net$IframeIo.prototype.clearForm_ = function() {
	this.form_ && this.form_ == goog$net$IframeIo$form_ && goog$dom$removeChildren(this.form_)
};
goog$net$IframeIo.prototype.disposeForm_ = function() {
	this.clearForm_();
	this.form_ = null
};
goog$net$IframeIo.prototype.getContentDocument_ = function() {
	return this.iframe_ ? goog$dom$getFrameContentDocument(this.getRequestIframe()) : null
};
goog$net$IframeIo.prototype.getRequestIframe = function() {
	return this.iframe_ ? goog$userAgent$IE && !goog$userAgent$isVersionOrHigher("11") ? this.iframe_ : goog$dom$getFrameContentDocument(this.iframe_).getElementById(this.iframeName_ + "_inner") : null
};
goog$net$IframeIo.prototype.testForFirefoxSilentError_ = function() {
	if (this.active_) {
		var a = this.getContentDocument_();
		a && !goog$reflect$canAccessProperty(a, "documentUri") ? (this.ignoreResponse_ || goog$events$unlisten(this.getRequestIframe(), "load", this.onIframeLoaded_, !1, this), navigator.onLine ? ((a = this.logger_) && a.warning("Silent Firefox error detected", void 0), this.handleError_(3)) : ((a = this.logger_) && a.warning("Firefox is offline so report offline error instead of silent error", void 0), this.handleError_(9))) :
			goog$Timer$callOnce(this.testForFirefoxSilentError_, 250, this)
	}
};
var goog$dom$classlist$get = function(a) {
		if (a.classList) return a.classList;
		a = a.className;
		return goog$isString(a) && a.match(/\S+/g) || []
	},
	goog$dom$classlist$contains = function(a, b) {
		return a.classList ? a.classList.contains(b) : goog$array$contains(goog$dom$classlist$get(a), b)
	},
	goog$dom$classlist$add = function(a, b) {
		a.classList ? a.classList.add(b) : goog$dom$classlist$contains(a, b) || (a.className += 0 < a.className.length ? " " + b : b)
	},
	goog$dom$classlist$remove = function(a, b) {
		a.classList ? a.classList.remove(b) : goog$dom$classlist$contains(a,
			b) && (a.className = goog$array$filter(goog$dom$classlist$get(a), function(a) {
			return a != b
		}).join(" "))
	};
var goog$ui$IdGenerator = function() {};
goog$addSingletonGetter(goog$ui$IdGenerator);
goog$ui$IdGenerator.prototype.nextId_ = 0;
goog$ui$IdGenerator.prototype.getNextUniqueId = function() {
	return ":" + (this.nextId_++).toString(36)
};
var goog$ui$Component = function(a) {
	goog$events$EventTarget.call(this);
	this.dom_ = a || goog$dom$getDomHelper();
	this.id_ = null;
	this.inDocument_ = !1;
	this.element_ = null;
	this.googUiComponentHandler_ = void 0;
	this.childIndex_ = this.children_ = this.parent_ = null;
	this.wasDecorated_ = !1
};
goog$inherits(goog$ui$Component, goog$events$EventTarget);
goog$ui$Component.prototype.idGenerator_ = goog$ui$IdGenerator.getInstance();
goog$ui$Component.prototype.getId = function() {
	return this.id_ || (this.id_ = this.idGenerator_.getNextUniqueId())
};
goog$ui$Component.prototype.getElement = function() {
	return this.element_
};
goog$ui$Component.prototype.getHandler = function() {
	var a = this;
	a.googUiComponentHandler_ || (a.googUiComponentHandler_ = new goog$events$EventHandler(a));
	return a.googUiComponentHandler_
};
goog$ui$Component.prototype.setParent = function(a) {
	if (this == a) throw Error("Unable to set parent component");
	if (a && this.parent_ && this.id_ && this.parent_.getChild(this.id_) && this.parent_ != a) throw Error("Unable to set parent component");
	this.parent_ = a;
	goog$ui$Component.superClass_.setParentEventTarget.call(this, a)
};
goog$ui$Component.prototype.getParent = function() {
	return this.parent_
};
goog$ui$Component.prototype.setParentEventTarget = function(a) {
	if (this.parent_ && this.parent_ != a) throw Error("Method not supported");
	goog$ui$Component.superClass_.setParentEventTarget.call(this, a)
};
goog$ui$Component.prototype.createDom = function() {
	this.element_ = this.dom_.createElement("DIV")
};
goog$ui$Component.prototype.decorate = function(a) {
	if (this.inDocument_) throw Error("Component already rendered");
	if (a && this.canDecorate(a)) {
		this.wasDecorated_ = !0;
		var b = goog$dom$getOwnerDocument(a);
		this.dom_ && this.dom_.document_ == b || (this.dom_ = goog$dom$getDomHelper(a));
		this.decorateInternal(a);
		this.enterDocument()
	} else throw Error("Invalid element to decorate");
};
goog$ui$Component.prototype.canDecorate = function() {
	return !0
};
goog$ui$Component.prototype.decorateInternal = function(a) {
	this.element_ = a
};
goog$ui$Component.prototype.enterDocument = function() {
	this.inDocument_ = !0;
	this.forEachChild(function(a) {
		!a.inDocument_ && a.getElement() && a.enterDocument()
	})
};
goog$ui$Component.prototype.exitDocument = function() {
	this.forEachChild(function(a) {
		a.inDocument_ && a.exitDocument()
	});
	this.googUiComponentHandler_ && this.googUiComponentHandler_.removeAll();
	this.inDocument_ = !1
};
goog$ui$Component.prototype.disposeInternal = function() {
	this.inDocument_ && this.exitDocument();
	this.googUiComponentHandler_ && (this.googUiComponentHandler_.dispose(), delete this.googUiComponentHandler_);
	this.forEachChild(function(a) {
		a.dispose()
	});
	!this.wasDecorated_ && this.element_ && goog$dom$removeNode(this.element_);
	this.parent_ = this.element_ = this.childIndex_ = this.children_ = null;
	goog$ui$Component.superClass_.disposeInternal.call(this)
};
goog$ui$Component.prototype.getChild = function(a) {
	if (this.childIndex_ && a) {
		var b = this.childIndex_;
		a = null !== b && a in b ? b[a] : void 0;
		a = a || null
	} else a = null;
	return a
};
goog$ui$Component.prototype.forEachChild = function(a, b) {
	this.children_ && goog$array$forEach(this.children_, a, b)
};
goog$ui$Component.prototype.removeChild = function(a, b) {
	if (a) {
		var c = goog$isString(a) ? a : a.getId();
		a = this.getChild(c);
		if (c && a) {
			var d = this.childIndex_;
			c in d && delete d[c];
			goog$array$remove(this.children_, a);
			b && (a.exitDocument(), a.element_ && goog$dom$removeNode(a.element_));
			a.setParent(null)
		}
	}
	if (!a) throw Error("Child is not in parent component");
	return a
};
var goog$ui$TableSorter = function(a) {
	goog$ui$Component.call(this, a);
	this.header_ = null;
	this.reversed_ = !1;
	this.defaultSortFunction_ = goog$ui$TableSorter$numericSort;
	this.sortFunctions_ = []
};
goog$inherits(goog$ui$TableSorter, goog$ui$Component);
goog$ui$TableSorter.prototype.sortableHeaderRowIndex_ = 0;
goog$ui$TableSorter.prototype.canDecorate = function(a) {
	return "TABLE" == a.tagName
};
goog$ui$TableSorter.prototype.enterDocument = function() {
	goog$ui$TableSorter.superClass_.enterDocument.call(this);
	var a = this.getElement(),
		a = a.tHead.rows[this.sortableHeaderRowIndex_];
	this.getHandler().listen(a, "click", this.sort_)
};
goog$ui$TableSorter.prototype.setDefaultSortFunction = function(a) {
	this.defaultSortFunction_ = a
};
goog$ui$TableSorter.prototype.getSortFunction = function(a) {
	return this.sortFunctions_[a] || this.defaultSortFunction_
};
goog$ui$TableSorter.prototype.setSortFunction = function(a, b) {
	this.sortFunctions_[a] = b
};
goog$ui$TableSorter.prototype.sort_ = function(a) {
	a = a.target;
	a = goog$dom$getAncestorByTagNameAndClass(a, "TH");
	var b = a == this.header_ ? !this.reversed_ : !1;
	this.dispatchEvent("beforesort") && this.sort(a.cellIndex, b) && this.dispatchEvent("sort")
};
goog$ui$TableSorter.prototype.sort = function(a, b) {
	var c = this.getSortFunction(a);
	if (c === goog$ui$TableSorter$noSort) return !1;
	this.header_ && goog$dom$classlist$remove(this.header_, this.reversed_ ? "goog-tablesorter-sorted-reverse" : "goog-tablesorter-sorted");
	var d = (this.reversed_ = !!b) ? -1 : 1,
		e = function(a, b) {
			return d * c(a[0], b[0]) || a[1] - b[1]
		},
		f = this.getElement();
	goog$array$forEach(f.tBodies, function(b) {
		var c = goog$array$map(b.rows, function(b, c) {
			var d;
			d = b.cells[a];
			if (goog$dom$BrowserFeature$CAN_USE_INNER_TEXT &&
				null !== d && "innerText" in d) d = d.innerText.replace(/(\r\n|\r|\n)/g, "\n");
			else {
				var e = [];
				goog$dom$getTextContent_(d, e, !0);
				d = e.join("")
			}
			d = d.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
			d = d.replace(/\u200B/g, "");
			goog$dom$BrowserFeature$CAN_USE_INNER_TEXT || (d = d.replace(/ +/g, " "));
			" " != d && (d = d.replace(/^\s*/, ""));
			return [d, c, b]
		});
		c.sort(e || goog$array$defaultCompare);
		var d = b.nextSibling;
		f.removeChild(b);
		goog$array$forEach(c, function(a) {
			b.appendChild(a[2])
		});
		f.insertBefore(b, d)
	});
	this.header_ = f.tHead.rows[this.sortableHeaderRowIndex_].cells[a];
	goog$dom$classlist$add(this.header_, this.reversed_ ? "goog-tablesorter-sorted-reverse" : "goog-tablesorter-sorted");
	return !0
};
var goog$ui$TableSorter$noSort = goog$functions$error("no sort"),
	goog$ui$TableSorter$numericSort = function(a, b) {
		a = parseFloat(a);
		b = parseFloat(b);
		return a == a ? b == b ? a - b : -1 : b == b ? 1 : 0
	};
GCJ.AGENT_ = "website";
GCJ.contest = {};
GCJ.contest.state = 0;
GCJ.isQualified = !1;
GCJ.contestFinished = !1;
GCJ.practiceOpen = !1;
GCJ.canAskClarifications = !0;
GCJ.pageLoaded = "";
GCJ.dashboardActionPage = function() {
	return GCJ.getContestPageUrl(GCJ.base_url, GCJ.contest.id, "dashboard/do")
};
GCJ.dashboardContestInfoPage = function() {
	return GCJ.getContestPageUrl(GCJ.base_url, GCJ.contest.id, "dashboard/ContestInfo")
};
GCJ.problems = [];
GCJ.clarifications = {};
GCJ.sortedClarKeys = [];
GCJ.lastClarTime = 0;
GCJ.lastClarSeenTime = 0;
GCJ.unreadClar = 0;
GCJ.selectedProblem = null;
GCJ.ORANGE_COLOR = "#faeca5";
GCJ.MAX_NAME_LENGTH = 20;
GCJ.PRE_CONTEST_POLLING_FREQUENCY_SECONDS = 120;
GCJ.counter = 0;
GCJ.statusMessageTimeoutId = null;
GCJ.timerProb = {};
GCJ.timerInd = {};
GCJ.pollEventsTimer = null;
GCJ.PENDING_CLARIFICATIONS_LIMIT = 8;
GCJ.NUM_SCOREBOARD_ROWS_TO_SHOW = 10;
GCJ.DEFAULT_POLLING_INTERVAL = 6E4;
GCJ.postContestPollingInterval = 1;
GCJ.lastActionTime = (new Date).getTime();
GCJ.SERVER_ERROR_MESSAGE = "Error communicating with the server. Make sure you're logged in, and refresh the page.";
GCJ.isDistributedProblem = function(a) {
	return "distributed" === a.type
};
GCJ.isTestRun = function(a) {
	return 2 === a.difficulty
};
GCJ.HAS_MULTIPLE_SMALL_IOS = "*";
GCJ.numSubmissions = 0;
GCJ.submissionKey2RowId = {};
GCJ.hasAnalysis = !1;
GCJ.selectedAnalysis = 0;
GCJ.scoreboardRowsShown = 0;
GCJ.getTranslatedDifficulty = function(a, b) {
	var c = "Large" + ("" != b ? "-" + b : ""),
		d = "Small" + ("" != b ? "-" + b : "");
	b = "TestRun" + ("" != b ? "-" + b : "");
	return 2 == a ? b : 1 == a ? c : d
};
GCJ.getProblemName = function(a) {
	if ("_" == a) return "[General]";
	for (var b = 0; GCJ.problems[b]; ++b)
		if (GCJ.problems[b].key == a) return GCJ.problems[b].name;
	return "[Unknown]"
};
GCJ.inputFileName = function(a, b) {
	b = GCJ.problems[a].io[b];
	a = String.fromCharCode(65 + a);
	a += GCJ.IO_TYPES[b.difficulty];
	var c = GCJ.contestFinished ? "-practice" : "",
		d = b.suffix ? "-" + b.suffix : "";
	b = 1 == b.difficulty || GCJ.contestFinished ? "" : "-attempt" + b.attempts;
	return a + c + d + b + ".in"
};
GCJ.showStatusMessage = function(a, b, c) {
	c = c || !1;
	var d = goog$dom$getElement("dsb-status-msg-wrapper"),
		e = goog$dom$getElement("dsb-status-msg-text");
	e.innerHTML = a;
	a = goog$dom$getElement("dsb-view-sub-link");
	c ? (e.innerHTML += " ", goog$style$setStyle(a, "display", "inline")) : goog$style$setStyle(a, "display", "none");
	GCJ.makeVisible(d);
	GCJ.statusMessageTimeoutId && goog$global.clearTimeout(GCJ.statusMessageTimeoutId);
	b && (GCJ.statusMessageTimeoutId = goog$global.setTimeout(function() {
		GCJ.hideStatusMessage()
	}, 1E3 * b))
};
GCJ.hideStatusMessage = function() {
	GCJ.makeInvisible(goog$dom$getElement("dsb-status-msg-wrapper"))
};
GCJ.hideCurrentSelection = function() {
	var a = GCJ.selectedProblem;
	0 <= a ? GCJ.hide("dsb-problem-page" + a) : -3 == a ? GCJ.hide("dsb-analysis-page") : -1 == a ? GCJ.hide("dsb-clarification-page") : -2 == a && GCJ.hide("dsb-submissions-page")
};
GCJ.showProblem = function(a) {
	var b = '<span style="color:#666">Problem ' + (String.fromCharCode(65 + a) + (".</span> " + GCJ.problems[a].name));
	GCJ.userActionHandler();
	GCJ.hideCurrentSelection();
	GCJ.show("dsb-problem-page" + a);
	GCJ.selectedProblem = a;
	a = goog$dom$getElement("dsb-problem-title-div");
	a.innerHTML = b;
	GCJ.repaintProblemSelectionMenu()
};
GCJ.showAnalysisPage = function() {
	if (-3 != GCJ.selectedProblem) {
		GCJ.hideCurrentSelection();
		var a = goog$dom$getElement("dsb-problem-title-div");
		GCJ.selectedProblem = -3;
		GCJ.repaintProblemSelectionMenu();
		a.innerHTML = "Contest Analysis";
		GCJ.show("dsb-analysis-page")
	}
};
GCJ.showAnalysis = function(a) {
	var b = GCJ.selectedAnalysis;
	GCJ.hasAnalysis && b != a && (GCJ.hide("dsb-problem-analysis-div" + b), goog$dom$getElement("dsb-analysis-selection-p" + b).className = "dsb-analysis-not-selected", goog$dom$getElement("dsb-analysis-selection-p" + a).className = "dsb-analysis-selected", GCJ.show("dsb-problem-analysis-div" + a), GCJ.selectedAnalysis = a)
};
GCJ.showClarificationPage = function() {
	GCJ.userActionHandler();
	if (-1 != GCJ.selectedProblem) {
		GCJ.hideCurrentSelection();
		var a = goog$dom$getElement("dsb-problem-title-div");
		GCJ.selectedProblem = -1;
		GCJ.repaintProblemSelectionMenu();
		a.innerHTML = "Questions and answers";
		GCJ.repaintClarifications();
		GCJ.show("dsb-clarification-page");
		GCJ.hideStatusMessage();
		GCJ.isLoggedIn && GCJ.lastClarSeenTime < GCJ.lastClarTime && (GCJ.lastClarSeenTime = GCJ.lastClarTime, a = {
				cmd: "SetClarificationLastSeenTime",
				clar_last_seen_time: GCJ.lastClarSeenTime
			},
			GCJ.ajaxRequest(GCJ.dashboardActionPage(), a, function() {}))
	}
};
GCJ.showSubmissionsPage = function() {
	if (-2 != GCJ.selectedProblem) {
		GCJ.hideCurrentSelection();
		var a = goog$dom$getElement("dsb-problem-title-div");
		GCJ.selectedProblem = -2;
		GCJ.repaintProblemSelectionMenu();
		a.innerHTML = "Submission History";
		GCJ.show("dsb-submissions-page")
	}
};
GCJ.updateSubmissionList = function(a) {
	for (var b = goog$dom$getElement("dsb-submissions-table"), c = goog$dom$getElement("dsb-submissions-rows"), d, e = 0; e < a.length; ++e) {
		var f = a[e],
			g = f.k,
			h = goog$dom$getElement("sub-" + g),
			k;
		h ? k = GCJ.submissionKey2RowId[g] : (++GCJ.numSubmissions, k = GCJ.numSubmissions, GCJ.submissionKey2RowId[g] = k, h = goog$dom$createDom("TR", {
				id: "sub-" + g,
				"class": 0 == k % 2 ? "dsb-sub-even-row" : "dsb-sub-odd-row"
			}), (d = goog$dom$getFirstElementChild(c)) ? d.parentNode && d.parentNode.insertBefore(h, d) : c.appendChild(h),
			GCJ.createElementUnder("td", h, {
				"class": "dsb-sub-row-id-width"
			}, "" + k), GCJ.createElementUnder("td", h, {
				"class": "dsb-sub-name-width"
			}, GCJ.getProblemName(f.p)), GCJ.createElementUnder("td", h, {
				"class": "dsb-sub-difficulty-width"
			}, GCJ.getTranslatedDifficulty(f.d, f.u)), d = GCJ.createElementUnder("td", h, {
				"class": "dsb-sub-input-width"
			}), "distributed" == f.y ? GCJ.createElementUnder("span", d, {
				id: "sub-" + g + "-input-link",
				"class": "dsb-sub-download-link-disabled-span"
			}) : (d = GCJ.createElementUnder("span", d, {
					"class": "dsb-sub-download-link-span"
				}),
				GCJ.createElementUnder("img", d, {
					src: GCJ.base_url + "/static/download.png"
				}), goog$events$listen(d, "click", goog$partial(GCJ.requestSubmissionFile, "GetInput", k, g))), d = GCJ.createElementUnder("td", h, {
				"class": "dsb-sub-output-width"
			}), GCJ.createElementUnder("span", d, {
				id: "sub-" + g + "-output-link",
				"class": "dsb-sub-download-link-disabled-span"
			}), d = GCJ.createElementUnder("td", h, {
				"class": "dsb-sub-source-width"
			}), GCJ.createElementUnder("span", d, {
				id: "sub-" + g + "-source-link",
				"class": "dsb-sub-download-link-disabled-span"
			}),
			GCJ.createElementUnder("td", h, {
				id: "sub-" + g + "-status",
				"class": "dsb-sub-status-width"
			}), GCJ.createElementUnder("td", h, {
				id: "sub-" + g + "-time",
				"class": "dsb-sub-status-width"
			}, f.t));
		d = goog$dom$getElement("sub-" + g + "-output-link");
		1 != f.a || goog$dom$getFirstElementChild(d) || (d.className = "dsb-sub-download-link-span", GCJ.createElementUnder("img", d, {
			src: GCJ.base_url + "/static/download.png"
		}), goog$events$listen(d, "click", goog$partial(GCJ.requestSubmissionFile, "GetOutput", k, g)));
		d = goog$dom$getElement("sub-" + g + "-source-link");
		1 != f.c || goog$dom$getFirstElementChild(d) || (d.className = "dsb-sub-download-link-span", GCJ.createElementUnder("img", d, {
			src: GCJ.base_url + "/static/download.png"
		}), goog$events$listen(d, "click", goog$partial(GCJ.requestSubmissionFile, "GetSource", k, g)));
		d = goog$dom$getElement("sub-" + g + "-status");
		d.innerHTML = f.s
	}
	0 == GCJ.numSubmissions ? GCJ.hide(b) : (GCJ.show(b), GCJ.sortSubmissions(b));
	a = goog$dom$getElement("dsb-submissions-status");
	1 == GCJ.numSubmissions ? a.innerHTML = "You have 1 submission." : (b = "You have " + (GCJ.numSubmissions +
		" submissions."), a.innerHTML = b)
};
GCJ.sortSubmissions = function(a) {
	if (a) {
		var b = new goog$ui$TableSorter;
		b.decorate(a);
		b.setDefaultSortFunction(goog$ui$TableSorter$noSort);
		var c = goog$dom$getElementByClass("dsb-sub-time-width", a);
		if (c && c.cellIndex && (c = c.cellIndex, b.setSortFunction(c, GCJ.submissionTimeSort_), b.sort(c, !0), b.setSortFunction(c, goog$ui$TableSorter$noSort), (a = goog$dom$getElement("dsb-submissions-rows", a)) && a.rows)) {
			a = a.rows;
			for (var b = a.length, c = 0, d; d = a[c++]; b--) {
				var e = goog$dom$getElementByClass("dsb-sub-row-id-width", d);
				e &&
					(e.innerHTML = "" + b);
				d.className = b % 2 ? "dsb-sub-odd-row" : "dsb-sub-even-row"
			}
		}
	}
};
GCJ.submissionTimeSort_ = function(a, b) {
	if (a === b) return 0;
	a = GCJ.getSubmissionTimeFromString_(a);
	b = GCJ.getSubmissionTimeFromString_(b);
	return a - b
};
GCJ.getSubmissionTimeFromString_ = function(a) {
	a = /(?:(\d+)h )*(?:(\d+)m )*(?:(\d+)s)*/.exec(a);
	for (var b = 0, c = 1; 3 >= c; ++c) a[c] && (b = 60 * b + parseInt(a[c]));
	return b
};
GCJ.requestSubmissionFile = function(a, b, c) {
	a = {
		cmd: a,
		row_id: b,
		s: c
	};
	GCJ.ajaxForward(GCJ.base_url + "/submissions", a)
};
GCJ.metIOPrerequisitesDuringContest = function(a, b) {
	a = GCJ.problems[a];
	for (var c = 0; c < b; c++) {
		var d = a.io[c];
		if (0 == d.difficulty && 0 > d.secsSolved) return !1
	}
	return !0
};
GCJ.getIOPrerequisiteSuffixDuringContest = function(a, b) {
	a = GCJ.problems[a];
	for (var c = 0, d = 0; d <= b && 2 > c; d++) {
		var e = a.io[d];
		0 == e.difficulty && c++
	}
	return 1 < c ? 1 == a.io[b].difficulty ? GCJ.HAS_MULTIPLE_SMALL_IOS : " " + a.io[b - 1].suffix : ""
};
GCJ.updateInputForm = function(a, b) {
	if (GCJ.isDistributedProblem(GCJ.problems[a])) GCJ.updateDistributedInputForm(a, b);
	else {
		var c = GCJ.problems[a].io[b],
			d = a + "-" + b,
			e = goog$dom$getElement("dsb-input-table-caption" + d),
			f = goog$dom$getElement("dsb-resubmit-caption" + d),
			g = !0,
			h = !1;
		GCJ.show(e);
		GCJ.hide(f);
		GCJ.contestFinished ? GCJ.practiceOpen ? c.userToggle || !c.lastResponse ? (goog$dom$removeChildren(e), e.style.display = "none") : (f = "Judge's response for last submission: " + c.lastResponse, e.innerHTML = f) : (e.innerHTML = "The contest is finished.",
				g = !1) : GCJ.isQualified ? 0 <= c.secsPassed ? (goog$dom$removeChildren(e), e.style.display = "none", h = !0, 1 != c.difficulty || c.userToggle || GCJ.show(f)) : 0 <= c.secsSolved ? (e.innerHTML = "You have solved this input set.", g = !1) : 1 == c.difficulty && 0 < c.attempts ? (e.innerHTML = c.submitted ? "You have already tried this input set. (Judged at the end of the contest.)" : "Your time has expired for this input set.", g = !1) : GCJ.metIOPrerequisitesDuringContest(a, b) ? e.innerHTML = 1 == c.difficulty ? "You have 8 minutes to solve 1 input file. (Judged after contest.)" :
			"You may try multiple times, with penalties for wrong submissions." : (g = GCJ.getIOPrerequisiteSuffixDuringContest(a, b), f = "You must solve small input " + (g + " first."), g = g == GCJ.HAS_MULTIPLE_SMALL_IOS ? "You must solve all small inputs first." : "" != g ? f : "You must solve the small input first.", e.innerHTML = g + "<br/>" + (1 == c.difficulty ? "You have 8 minutes to solve 1 input file. (Judged after contest.)" : "You may try multiple times, with penalties for wrong submissions."), g = !1) : (e.innerHTML = "Only contestants can download the input.",
				g = !1);
		e = goog$dom$getElement("dsb-input-wrapper" + d);
		g ? (e.style.display = "inline", e = goog$dom$getElement("dsb-input-link-plain-text" + d), f = GCJ.inputFileName(a, b), g = "Download " + f, f = "Redownload " + f, GCJ.contestFinished ? (e.innerHTML = g, h = GCJ.redownloadInput) : h ? (e.innerHTML = f, h = GCJ.redownloadInput) : (e.innerHTML = g, h = GCJ.activateInput), GCJ.listenExclusively("dsb-input-link-plain" + d, "click", goog$partial(h, a, b)), d = goog$dom$getElement("dsb-input-start-button" + d), GCJ.contestFinished ? GCJ.listenExclusively(d, "click",
			goog$partial(GCJ.onSubmissionBoxToggle, a, b, !0)) : GCJ.listenExclusively(d, "click", goog$partial(GCJ.activateInput, a, b))) : e.style.display = "none";
		GCJ.practiceOpen ? c.userToggle ? GCJ.openInputForm(a, b) : GCJ.closeInputForm(a, b) : !GCJ.contestFinished && 0 <= c.secsPassed ? (0 == c.difficulty || c.userToggle ? GCJ.openInputForm(a, b) : GCJ.closeInputForm(a, b), c.inProgress = !0) : (GCJ.closeInputForm(a, b), c.inProgress = !1)
	}
};
GCJ.updateDistributedInputForm = function(a, b) {
	var c = GCJ.problems[a].io[b],
		d = a + "-" + b,
		e = goog$dom$getElement("dsb-input-table-caption" + d),
		f = goog$dom$getElement("dsb-resubmit-caption" + d),
		g = !0;
	GCJ.show(e);
	GCJ.hide(f);
	GCJ.contestFinished ? (e.innerHTML = "The contest is finished.", g = !1) : GCJ.isQualified ? 0 <= c.secsPassed ? (g = 60 * GCJ.IO_DISTRIBUTED_TIMEOUTS[c.difficulty], GCJ.showCooldownTimer(d), GCJ.startTimer("dsb-cooldown-timer" + d, 1E3 * (g - c.secsPassed), goog$partial(GCJ.hideCooldownTimer, d)), e.innerHTML = 'Your submission is being tested now.<br/> After the timeout has expired you can check the result by clicking "View my submissions" and you will be able to resubmit.',
		g = !1) : 1 == c.difficulty && 0 < c.attempts || 0 == c.difficulty && 0 <= c.secsSolved ? (c.userToggle || GCJ.show(f), e.style.display = "none", g = !1) : GCJ.metIOPrerequisitesDuringContest(a, b) || GCJ.isTestRun(c) ? e.innerHTML = 0 === c.difficulty ? "You may submit multiple times, with penalties for wrong submissions." : 1 === c.difficulty ? "You may submit multiple times but only the last submission will be scored. (Judged after contest)" : "You may submit as many tests as you need. Test runs will not count towards your final score." : (g = GCJ.getIOPrerequisiteSuffixDuringContest(a,
		b), f = "You must solve small input " + (g + " first."), g = g == GCJ.HAS_MULTIPLE_SMALL_IOS ? "You must solve all small inputs first." : "" != g ? f : "You must solve the small input first.", e.innerHTML = g + "<br/>", e.innerHTML = 0 === c.difficulty ? e.innerHTML + "You may try multiple times, with penalties for wrong submissions." : e.innerHTML + "You may submit multiple times, but only your last submission will be considered. (Judged after contest.)", g = !1) : (e.innerHTML = "Only contestants can submit solutions.", g = !1);
	f = goog$dom$getElement("dsb-input-wrapper" +
		d);
	f.style.display = "inline";
	d = goog$dom$getElement("dsb-input-start-button" + d);
	GCJ.contestFinished ? GCJ.listenExclusively(d, "click", goog$partial(GCJ.onSubmissionBoxToggle, a, b, !0)) : GCJ.listenExclusively(d, "click", goog$partial(GCJ.activateInput, a, b));
	if (!g || c.userToggle) f.style.display = "none";
	c.userToggle ? (e.style.display = "none", GCJ.openInputForm(a, b)) : GCJ.closeInputForm(a, b);
	c.inProgress = 0 <= c.secsPassed
};
GCJ.updateAllInputForms = function() {
	for (var a = 0; a < GCJ.problems.length; ++a)
		for (var b = 0; b < GCJ.problems[a].io.length; ++b) GCJ.updateInputForm(a, b)
};
GCJ.openInputForm = function(a, b) {
	a = a + "-" + b;
	goog$dom$getElement("dsb-action-box-wrap" + a).className = "dsb-action-box-open";
	b = goog$dom$getElement("dsb-submit-form-div" + a);
	GCJ.changeDisplayMode(b, "block");
	goog$dom$getElement("submit-button" + b.timerId_) && (goog$dom$getElement("submit-button" + b.timerId_).disabled = !1);
	GCJ.changeDisplayMode("dsb-input-link-plain" + a, "inline");
	GCJ.hide("dsb-input-start-button" + a)
};
GCJ.closeInputForm = function(a, b) {
	var c = a + "-" + b;
	GCJ.hide("dsb-submit-form-div" + c);
	goog$dom$getElement("dsb-action-box-wrap" + c).className = "";
	var d = !GCJ.contestFinished && 0 <= GCJ.problems[a].io[b].secsPassed;
	GCJ.isDistributedProblem(GCJ.problems[a]) && (0 == GCJ.problems[a].io[b].difficulty && 0 > GCJ.problems[a].io[b].secsSolved && (goog$dom$getElement("dsb-input-table-caption" + c).style.display = "block"), d = !1);
	GCJ.changeDisplayMode("dsb-input-link-plain" + c, d ? "inline" : "none");
	GCJ.changeDisplayMode("dsb-input-start-button" +
		c, d ? "none" : "inline")
};
GCJ.onSubmissionBoxToggle = function(a, b, c) {
	GCJ.problems[a].io[b].userToggle = c;
	GCJ.updateInputForm(a, b)
};
GCJ.repaintProblemSelectionMenu = function() {
	for (var a = GCJ.selectedProblem, b = 0; b < GCJ.problems.length; ++b) {
		var c = goog$dom$getElement("dsb-problem-tab" + b),
			d = "dsb-problem-tab" + (b == a ? "-open" : "-close");
		c.className != d && (c.className = d)
	}
	b = goog$dom$getElement("dsb-ask-question-button");
	b.className = "dsb-clar-tab-" + (-1 == a ? "open" : "close");
	b = goog$dom$getElement("dsb-submissions-button");
	b.className = "dsb-submissions-tab-" + (-2 == a ? "open" : "close");
	b = goog$dom$getElement("dsb-analysis-button");
	b.className = "dsb-analysis-tab-" +
		(-3 == a ? "open" : "close");
	b = goog$dom$getElement("main-panel-border");
	b.className = 0 > a ? "dsb-green-border" : "dsb-blue-border"
};
GCJ.repaintInputStats = function(a) {
	for (var b = 0; b < GCJ.problems[a].io.length; ++b) {
		var c = GCJ.problems[a].io[b],
			d = GCJ.isDistributedProblem(GCJ.problems[a]),
			e = goog$dom$getElement("inputName" + a + "_" + b),
			f = goog$dom$getElement("selfStat" + a + "_" + b),
			g = goog$dom$getElement("globalStat" + a + "_" + b);
		if (null === c.num_attempts) break;
		var h = c.num_attempts,
			k = c.num_solved,
			m = c.first_solved,
			m = -2 == m,
			p = !1;
		d && GCJ.isTestRun(c) ? (d = "N/A", e.innerHTML = d) : e.innerHTML = GCJ.sharedMessages.pointsForProblemShort(c.points);
		var e = "Correct",
			d =
			"Not attempted",
			n = "1 incorrect attempt",
			l = c.attempts + " incorrect attempts",
			q = "Submitted",
			r = "Not attempted",
			t = "Incorrect";
		c.inProgress && !GCJ.contestFinished ? c.submitted && 1 == c.difficulty ? (p = "Submitted<br/><small>(You can still resubmit)</small>", f.innerHTML = p, p = !0) : (e = "In progress...", f.innerHTML = e) : 0 == c.difficulty ? (q = 0 <= c.secsSolved) ? (f.innerHTML = e, p = !0) : f.innerHTML = 0 == c.attempts ? d : 1 == c.attempts ? n : l : m ? c.submitted ? (f.innerHTML = q, p = !0) : f.innerHTML = c.attempts ? GCJ.sharedMessages.MSG_PROBLEM_STATUS_LARGE_TIMEOUT :
			r : f.innerHTML = 0 < c.secsSolved ? e : c.submitted ? t : c.attempts ? GCJ.sharedMessages.MSG_PROBLEM_STATUS_LARGE_TIMEOUT : r;
		f.className = "dsb-mini-status-" + (p ? "" : "non-") + "highlight";
		c = 1 == c.difficulty;
		c = !c || !m;
		f = 0 < h;
		goog$dom$removeChildren(g);
		f ? (h = c ? "<b>" + (k + ("/" + (h + (" users</b> correct (" + ((h ? Math.round(k / h * 100) : 0) + "%)"))))) : "<b>" + (h + " users</b> attempted"), g.innerHTML = h, GCJ.show(g)) : GCJ.hide(g)
	}
};
GCJ.wantToShowStatus = function() {
	if (GCJ.contestFinished) return !0;
	for (var a = 0; a < GCJ.problems.length; ++a)
		for (var b = 0; b < GCJ.problems[a].io.length; ++b) {
			var c = GCJ.problems[a].io[b];
			if (c.num_attempts || c.attempts) return !0
		}
	return !1
};
GCJ.toggleStatusPanelVisibility = function() {
	GCJ.toggleVisibility("dsb-status-tab", "dsb-status-panel-button", GCJ.base_url + "/static/minus.gif", GCJ.base_url + "/static/plus.gif")
};
GCJ.repaintInputStatsAll = function() {
	for (var a = 0; a < GCJ.problems.length; ++a) GCJ.repaintInputStats(a)
};
GCJ.updateFormDivTimer = function(a, b) {
	var c = "" + a + "-" + b,
		c = goog$dom$getElement("dsb-submit-form-div" + c);
	if (c = c.timerId_) a = GCJ.problems[a].io[b], 0 > a.secsPassed || (b = a.difficulty, b = 60 * GCJ.IO_TIMELIMITS[b], a = 1E3 * (b - a.secsPassed), GCJ.updateTimerDuration(c, a, !0))
};
GCJ.createFormDiv = function(a, b) {
	if (GCJ.isDistributedProblem(GCJ.problems[a])) GCJ.createDistributedFormDiv(a, b);
	else {
		var c = "" + a + "-" + b,
			d = goog$dom$getElement("dsb-submit-form-div" + c),
			e = GCJ.problems[a].io[b],
			f = e.difficulty,
			g = 60 * GCJ.IO_TIMELIMITS[f],
			g = 1E3 * (g - e.secsPassed),
			h = GCJ.inputFileName(a, b);
		d.timerId_ && (GCJ.clearEventsForSubmitForm(d.timerId_), GCJ.stopTimer("dsb-resubmit-timer" + c));
		if (!GCJ.practiceOpen) {
			var k = GCJ.timerDeadlines.contestTimer;
			if (GCJ.contestFinished || !k) return;
			k = k.getTime() - (new Date).getTime();
			k < g && (g = k)
		}
		k = GCJ.counter++;
		d.timerId_ = "io_timer_" + k;
		GCJ.timerProb[d.timerId_] = a;
		GCJ.timerInd[d.timerId_] = b;
		k = d.timerId_;
		f = 0 == f ? "<b>Input:</b> " + (h + ".") : "You may resubmit this multiple times within the remaining time-frame. Only your last submission will count.";
		h = "";
		GCJ.practiceOpen && (h = '&nbsp;&nbsp;<input id="dsb-hide-submission' + k + '" type="button" value="Hide" />');
		var m = "your output file:" + ('<input id="output-file' + k + '" type="file" name="answer" class="submitFormFile" />'),
			f = [GCJ.contestFinished ?
				'<div style="display:none">' : "<div>", GCJ.sharedMessages.remainingTime('<span id="' + k + '"></span>'), "&nbsp;&nbsp;", "</div>", GCJ.contestFinished ? '<div style="display:none">' : "<div>", f, "</div>", '<form id="submit-form', k, '" action="', GCJ.base_url, "/", GCJ.contest.id, '/dashboard/do" enctype="multipart/form-data"', ' method="post">', '<input type="hidden" name="csrfmiddlewaretoken" value="', GCJ.getCsrfToken("SubmitAnswer"), '" />', '<div class="dsb-submit-form-separator">', m, "</div>", GCJ.contestFinished ? '<div style="display: none">' :
				'<div class="dsb-submit-form-separator">', '<table class="dsb-source-code-table"><tr>', '<td style="padding:0.4em 0.2em 0 0">', "source code:", "&nbsp;&nbsp;", "</td>", '<td><div id="source-files', k, '"></div>', '<span id="add-source-file', k, '" class="dsb-submit-form-links">', "Add another file", "</span></td>", "</tr></table></div>", GCJ.contestFinished ? '<div class="dsb-submit-form-separator" style="color:gray">source file(s): &nbsp;&nbsp;&nbsp;not needed for the practice contest</div>' : "", GCJ.contestFinished ?
				'<div class="dsb-submit-form-separator" style="text-align:center">' : '<div class="dsb-submit-form-separator" style="text-align:right">', '<input id="submit-button', k, GCJ.contestFinished ? '" type="button" value="Submit file" />' : '" type="button" value="Submit files" />', h, "</div>", '<div id="source-file-names', k, '"></div>', '<input type="hidden" name="cmd" value="SubmitAnswer" />', '<input type="hidden" name="problem" value="', GCJ.problems[a].id, '" />', '<input type="hidden" name="input_id" value="', b, '"/>',
				'<input type="hidden" name="num_source_files" id="num-source-files', k, '" value="0"/>', '<input type="hidden" name="agent" value="', GCJ.AGENT_, '"/>', "</form>"
			];
		d.innerHTML = f.join("");
		GCJ.addSourceFile(d.timerId_);
		GCJ.contestFinished || (GCJ.startTimer(d.timerId_, g, goog$partial(GCJ.submissionTimeOut, a, b)), GCJ.startTimer("dsb-resubmit-timer" + c, g, goog$partial(GCJ.hide, "dsb-resubmit-caption" + c)));
		goog$events$listen(goog$dom$getElement("submit-button" + d.timerId_), "click", goog$partial(GCJ.submitOutput, d.timerId_));
		goog$events$listen(goog$dom$getElement("add-source-file" + d.timerId_), "click", goog$partial(GCJ.addSourceFile, d.timerId_));
		GCJ.practiceOpen && goog$events$listen(goog$dom$getElement("dsb-hide-submission" + d.timerId_), "click", goog$partial(GCJ.onSubmissionBoxToggle, a, b, !1));
		e.userToggle = !GCJ.contestFinished && !e.submitted
	}
};
GCJ.createDistributedFormDiv = function(a, b) {
	var c = a + "-" + b,
		c = goog$dom$getElement("dsb-submit-form-div" + c),
		d = GCJ.problems[a].io[b],
		e = d.difficulty,
		f = GCJ.counter++;
	c.timerId_ = "io_timer_" + f;
	GCJ.timerProb[c.timerId_] = a;
	GCJ.timerInd[c.timerId_] = b;
	var f = c.timerId_,
		e = 0 == e ? "You may try multiple times, with penalties for wrong submissions." : 1 === e ? "You may resubmit this multiple times before the end of the contest.<br>Only your last submission will be judged." : "You may submit any number of test runs.<br>They do not count towards your final score.",
		g;
	g = '&nbsp;&nbsp;<input id="dsb-hide-submission' + f + '" type="button" value="Hide" />';
	f = [GCJ.contestFinished ? '<div style="display:none">' : "<div><b>", e, "</b></div>", '<form id="submit-form', f, '" action="', GCJ.base_url, "/", GCJ.contest.id, '/dashboard/do" enctype="multipart/form-data"', ' method="post">', '<input type="hidden" name="csrfmiddlewaretoken" value="', GCJ.getCsrfToken("SubmitDistributedSolution"), '" />', GCJ.contestFinished ? '<div style="display: none">' : '<div class="dsb-submit-form-separator">',
		'<table class="dsb-source-code-table"><tr>', '<td style="padding:0.4em 0.2em 0 0">', "Source code:", "&nbsp;&nbsp;", "</td>", '<td><div id="source-files', f, '"></div>', '<div id="add-compiler">', '&nbsp;&nbsp;<select id="add-compiler', f, '" name="language">', '<option value="None" selected="selected">', "Choose language", "</option>", '<option value="CPP">C++</option>', '<option value="JAVA">Java</option>', "</select>", "<div></td></tr>", "</table></div>", GCJ.isTestRun(GCJ.problems[a].io[b]) ? '<div class="dsb-submit-form-separator">' :
		'<div style="display: none">', '<table class="dsb-source-code-table"><tr>', '<td style="padding:0.4em 0.2em 0 0">', "Library file:", "&nbsp;&nbsp;", "</td>", '<td><div id="library-files', f, '">', '<span id="library-file', f, '">', '<input class="submitFormFile" type="file" name="library-file0"></input>', "</span>", "</div></td>", "</table></div>", '<div class="dsb-submit-form-separator" style="text-align:right">', '<input id="submit-button', f, '" type="button" value="Submit solution" />', g, "</div>", '<div id="source-file-names',
		f, '"></div>', '<input type="hidden" name="cmd" value="SubmitDistributedSolution" />', '<input type="hidden" name="problem" value="', GCJ.problems[a].id, '" />', '<input type="hidden" name="problem_index" value="', a, '" />', '<input type="hidden" name="input_id" value="', b, '"/>', '<input type="hidden" name="num_source_files" id="num-source-files', f, '" value="0"/>', '<input type="hidden" name="agent" value="', GCJ.AGENT_, '"/>', "</form>"
	];
	c.innerHTML = f.join("");
	GCJ.addSourceFile(c.timerId_);
	goog$events$listen(goog$dom$getElement("dsb-hide-submission" +
		c.timerId_), "click", goog$partial(GCJ.onSubmissionBoxToggle, a, b, !1));
	goog$events$listen(goog$dom$getElement("submit-button" + c.timerId_), "click", goog$partial(GCJ.submitDistributedSolution, c.timerId_, d));
	d.userToggle = !GCJ.contestFinished && -1 == d.secsPassed
};
GCJ.clearEventsForSubmitForm = function(a) {
	GCJ.stopTimer(a);
	goog$events$removeAll(goog$dom$getElement("submit-button" + a));
	goog$events$removeAll(goog$dom$getElement("add-source-file" + a));
	var b = goog$dom$getElement("dsb-hide-submission" + a);
	b && goog$events$removeAll(b);
	for (var b = GCJ.getNumSourceFiles(a), c = 0; c < b; ++c) goog$events$removeAll(goog$dom$getElement("remove-source-file" + a + "-" + String(c)))
};
GCJ.redownloadInput = function(a, b) {
	GCJ.userActionHandler();
	var c = GCJ.inputFileName(a, b);
	a = {
		cmd: "GetInputFile",
		problem: GCJ.problems[a].id,
		input_id: b,
		filename: c,
		redownload_last: 1,
		agent: GCJ.AGENT_
	};
	GCJ.ajaxForward(GCJ.dashboardActionPage() + "/" + c, a)
};
GCJ.languageExtension = function(a) {
	switch (a) {
		case "CPP":
			return ".h";
		case "Java":
			return ".java";
		default:
			return ".txt"
	}
};
GCJ.downloadSampleInput = function(a, b, c) {
	GCJ.userActionHandler();
	var d = GCJ.problems[a].name + GCJ.languageExtension(c);
	a = {
		cmd: "GetSampleInput",
		problem: GCJ.problems[a].id,
		sample_id: b,
		language: c,
		filename: d,
		agent: GCJ.AGENT_
	};
	GCJ.ajaxForward(GCJ.dashboardActionPage() + "/" + d, a)
};
GCJ.getNumSourceFiles = function(a) {
	return Number(goog$dom$getElement("num-source-files" + a).value)
};
GCJ.getSourceFileName = function(a, b) {
	a = goog$dom$getElement("source-file" + a + "-" + String(b));
	return goog$dom$getFirstElementChild(a).value
};
GCJ.addSourceFile = function(a) {
	var b = goog$dom$getElement("num-source-files" + a),
		c = Number(b.value),
		d = goog$dom$getElement("source-files" + a),
		d = GCJ.createElementUnder("div", d, {
			id: "input-file-div" + a + "-" + String(c),
			clase: "input-file-div"
		}),
		e = GCJ.createElementUnder("span", d, {
			id: "source-file" + a + "-" + String(c)
		});
	GCJ.createElementUnder("input", e, {
		type: "file",
		name: "source-file" + String(c),
		"class": "submitFormFile"
	});
	d = GCJ.createElementUnder("span", d, {
			id: "remove-source-file" + a + "-" + String(c),
			"class": "dsb-submit-form-links"
		},
		"remove");
	goog$events$listen(d, "click", goog$partial(GCJ.removeSourceFile, a, c));
	c++;
	a = goog$dom$getElement("remove-source-file" + a + "-0");
	1 == c ? GCJ.makeInvisible(a) : GCJ.makeVisible(a);
	b.value = String(c)
};
GCJ.removeSourceFile = function(a, b) {
	for (var c = GCJ.getNumSourceFiles(a), d = goog$dom$getElement("source-file" + a + "-" + String(b)); b < c - 1; ++b) {
		var e = goog$dom$getElement("source-file" + a + "-" + String(b + 1)),
			f = goog$dom$getFirstElementChild(e);
		goog$dom$removeChildren(d);
		d.appendChild(f);
		goog$dom$setProperties(f, {
			name: "source-file" + String(b)
		});
		d = e
	}
	1 < c && (goog$events$removeAll(goog$dom$getElement("remove-source-file" + a + "-" + String(c - 1))), goog$dom$removeNode(goog$dom$getElement("input-file-div" + a + "-" + String(c - 1))), goog$dom$getElement("num-source-files" +
		a).value = String(c - 1), c--);
	a = goog$dom$getElement("remove-source-file" + a + "-0");
	1 == c ? GCJ.makeInvisible(a) : GCJ.makeVisible(a)
};
GCJ.removeEmptySourceFiles = function(a) {
	for (var b = GCJ.getNumSourceFiles(a), b = b - 1; 0 <= b; --b) "" == GCJ.getSourceFileName(a, b) && GCJ.removeSourceFile(a, b)
};
GCJ.setSourceFileNames = function(a) {
	var b = GCJ.getNumSourceFiles(a),
		c = goog$dom$getElement("source-file-names" + a);
	goog$dom$removeChildren(c);
	for (var d = 0; d < b; ++d) {
		var e = GCJ.getSourceFileName(a, d);
		GCJ.createElementUnder("input", c, {
			type: "hidden",
			name: "source-file-name" + String(d),
			value: e
		})
	}
};
GCJ.activateInput = function(a, b) {
	GCJ.userActionHandler();
	var c = GCJ.problems[a].io[b],
		d = c.difficulty,
		e = GCJ.problems[a],
		f = GCJ.IO_TIMELIMITS[d],
		e = GCJ.isDistributedProblem(e),
		d = 1 != d ? "You will have " + (f + (" minutes to submit your answer for " + (String.fromCharCode(65 + a) + GCJ.IO_TYPES[d] + "."))) : "You have one chance, lasting " + (f + (" minutes, to submit your answer to " + (String.fromCharCode(65 + a) + GCJ.IO_TYPES[d] + ". You may resubmit during that time. Only your last submission counts.")));
	if (e || confirm(d)) e || (c.secsPassed =
		0), GCJ.createFormDiv(a, b), GCJ.updateInputForm(a, b), GCJ.repaintInputStats(a), e || GCJ.contestFinished || (c = GCJ.inputFileName(a, b), a = {
		cmd: "GetInputFile",
		problem: GCJ.problems[a].id,
		input_id: b,
		filename: c,
		agent: GCJ.AGENT_
	}, GCJ.ajaxForward(GCJ.dashboardActionPage() + "/" + c, a))
};
GCJ.submitOutput = function(a) {
	GCJ.userActionHandler();
	if ("" == goog$dom$getElement("output-file" + a).value) alert("No output file.");
	else {
		if (!GCJ.contestFinished) {
			GCJ.removeEmptySourceFiles(a);
			if ("" == GCJ.getSourceFileName(a, 0)) {
				alert("No source file(s).");
				return
			}
			GCJ.setSourceFileNames(a)
		}
		goog$dom$getElement("submit-button" + a).disabled = !0;
		var b = new goog$net$IframeIo;
		goog$events$listen(b, "complete", goog$partial(GCJ.onSubmissionComplete, b, a));
		b.sendFromForm(goog$dom$getElement("submit-form" + a))
	}
};
GCJ.submitDistributedSolution = function(a, b) {
	GCJ.userActionHandler();
	1 == b.difficulty && (b.secsPassed = 0);
	GCJ.removeEmptySourceFiles(a);
	"" == GCJ.getSourceFileName(a, 0) ? alert("No source file(s).") : "None" === goog$dom$getElement("add-compiler" + a).value ? alert("Please select a language.") : (GCJ.setSourceFileNames(a), goog$dom$getElement("submit-button" + a).disabled = !0, b = new goog$net$IframeIo, goog$events$listen(b, "complete", goog$partial(GCJ.onSubmissionComplete, b, a)), b.sendFromForm(goog$dom$getElement("submit-form" +
		a)))
};
GCJ.showCorrectSolutionMessage = function(a) {
	a = "Judged response for input " + (a + ": <font color=green><b>Correct!</b></font>");
	GCJ.showStatusMessage(a, 60)
};
GCJ.showIncorrectSolutionMessage = function(a, b) {
	b = b || !1;
	a = "Judged response for input " + (a + ": <font color=red><b>Incorrect.</b></font>");
	GCJ.showStatusMessage(a, 60, b)
};
GCJ.showIgnoredSolutionMessage = function(a, b) {
	var c = GCJ.getSplashPage();
	a = "Submission for input " + (a + (" Rejected: <b>" + (b + ("</b><br/>You can learn more about rejections like this in our " + ('<a href="' + c + '/faq.html#rejection_reasons" target="_blank">FAQ</a>.')))));
	GCJ.showStatusMessage(a, 60)
};
GCJ.onSubmissionComplete = function(a, b) {
	var c = GCJ.timerProb[b],
		d = GCJ.timerInd[b],
		e = GCJ.problems[c].io[d].difficulty,
		f = String.fromCharCode(65 + c),
		e = f + GCJ.IO_TYPES[e],
		f = null,
		g = 200;
	try {
		a.isSuccess() ? f = a.getResponseJson() : g = a.lastErrorCode_
	} catch (h) {
		f = null, a = a.getResponseText(), g = 0 == a.length || -1 != a.search("502") ? 502 : 500
	}
	200 == g ? f.hasAnswer ? GCJ.isDistributedProblem(GCJ.problems[c]) ? (GCJ.showStatusMessage(f.msg, 15, !1), GCJ.pollForEvents()) : GCJ.contestFinished ? (f.ok ? (GCJ.showCorrectSolutionMessage(e), GCJ.problems[c].io[d].lastResponse =
		"Correct.") : (GCJ.showIncorrectSolutionMessage(e), GCJ.problems[c].io[d].lastResponse = "Incorrect."), GCJ.onSubmissionBoxToggle(c, d, !1)) : (GCJ.problems[c].io[d].attempts++, 0 == GCJ.problems[c].io[d].difficulty ? (GCJ.stopTimer(b), GCJ.problems[c].io[d].secsPassed = -1, f.ok ? (GCJ.problems[c].io[d].secsSolved = 13, GCJ.showCorrectSolutionMessage(e)) : GCJ.showIncorrectSolutionMessage(e, !0)) : (GCJ.showStatusMessage(f.msg, 60, !0), GCJ.onSubmissionBoxToggle(c, d, !1)), GCJ.pollEventsTimer && (goog$global.clearTimeout(GCJ.pollEventsTimer),
		GCJ.pollEventsTimer = null), GCJ.pollEventsTimer = goog$global.setTimeout(GCJ.pollForEvents, 0), GCJ.updateInputForm(c, d)) : GCJ.showIgnoredSolutionMessage(e, f.msg) : (502 == g ? (c = GCJ.getSplashPage(), c = "An HTTP 502 error <em>probably</em> occurred when you tried to submit.  Retrying will probably <b>not</b> work.  Please read our " + ('<a href="' + c + '/faq.html#502" target="_blank">FAQ</a>\'s section about 502 errors.')) : c = "There was an error while submitting your data. " + GCJ.PLEASE_TRY_AGAIN_MESSAGE, GCJ.showStatusMessage(c,
		60));
	goog$dom$getElement("submit-button" + b) && (goog$dom$getElement("submit-button" + b).disabled = !1);
	GCJ.repaintInputStatsAll()
};
GCJ.submissionTimeOut = function(a, b) {
	var c = GCJ.problems[a].io[b];
	c.secsPassed = -1;
	GCJ.contestFinished || c.attempts++;
	GCJ.updateInputForm(a, b);
	GCJ.repaintInputStatsAll()
};
GCJ.needToRefreshPage = function(a) {
	return a.v != GCJ.contest.version || a.l != GCJ.isLoggedIn || a.q != GCJ.isQualified
};
GCJ.tryToRefreshPage = function() {
	if (GCJ.contestFinished) GCJ.refreshPage();
	else {
		for (var a = [0, 48E4], b = 0; b < GCJ.problems.length; ++b)
			for (var c = 0; c < GCJ.problems[b].io.length; ++c)
				if (GCJ.problems[b].io[c].inProgress) {
					var d = goog$dom$getElement("dsb-submit-form-div" + b + "-" + c);
					a.push(GCJ.getTimeLeft(d.timerId_))
				}
		a.sort();
		for (b = 0; b < a.length; ++b)
			if (b == a.length - 1 || a[b] + 35E3 < a[b + 1]) {
				if (0 >= a[b]) {
					GCJ.refreshPage();
					break
				}
				window.setTimeout(GCJ.refreshPage, a[b] + 5E3);
				break
			}
	}
};
GCJ.refreshPage = function() {
	window.location.reload()
};
GCJ.repaintScoreboard = function(a) {
	for (var b = GCJ.NUM_SCOREBOARD_ROWS_TO_SHOW, c = 0; c < b; ++c) {
		var d = goog$dom$getElement("sbName_" + c),
			e = goog$dom$getElement("sbScore_" + c);
		if (a.rows[c]) {
			c >= GCJ.scoreboardRowsShown && (GCJ.scoreboardRowsShown = c + 1, GCJ.show("sbRow_" + c));
			var f = a.rows[c],
				g;
			g = f.n;
			var h = GCJ.MAX_NAME_LENGTH;
			g.length > h && (g = g.substring(0, h - 3) + "...");
			h = f.p;
			"t" == f.m && (g = "<strong>" + g + "</strong>", h = "<strong>" + h + "</strong>");
			d.innerHTML = g;
			f.n.length > GCJ.MAX_NAME_LENGTH && goog$dom$setProperties(d, {
				title: f.n
			});
			e.innerHTML = h
		} else d.innerHTML = "&nbsp;", e.innerHTML = "&nbsp;"
	}
};
GCJ.submitClarification = function(a) {
	var b = {
		cmd: "AskClarification",
		problem: a.problem.value,
		q: a.q.value
	};
	goog$dom$getElement("dsb-submit-clarification-button").disabled = !0;
	GCJ.ajaxJsonRequest(GCJ.dashboardActionPage(), b, function(b, d) {
		goog$dom$getElement("dsb-submit-clarification-button").disabled = !1;
		b && !b.err && 200 == d ? (GCJ.showStatusMessage("Your question has been sent to the contest administrators.", 60), GCJ.updateClarifications([b]), a.q.value = "") : b && b.err ? (b = "Error: " + b.err, GCJ.showStatusMessage(b,
			60)) : GCJ.showStatusMessage("Error: Failed to send clarification. " + GCJ.getPleaseTryAgainMessage(), 60)
	}, {
		method: "POST"
	});
	return !1
};
GCJ.updateClarification = function(a) {
	GCJ.clarifications[a.k] && GCJ.clarifications[a.k] == a.u || (GCJ.clarifications[a.k] || GCJ.sortedClarKeys.push(a.k), GCJ.clarifications[a.k] = a, GCJ.lastClarTime < a.u && (GCJ.lastClarTime = a.u))
};
GCJ.repaintClarifications = function() {
	var a = goog$dom$getElement("dsb-clarification-tbody");
	goog$dom$removeChildren(a);
	GCJ.unreadClar = 0;
	for (var b = GCJ.sortedClarKeys.length - 1; 0 <= b; --b) {
		var c = GCJ.sortedClarKeys[b],
			c = GCJ.clarifications[c],
			d = GCJ.createElementUnder("tr", a);
		d.className = "dsb-clar-tr";
		c.an ? d.className += " dsb-clar-tr-announcement" : 0 != (GCJ.sortedClarKeys.length - b) % 2 && (d.className += " dsb-clar-tr-odd");
		var e = GCJ.createElementUnder("td", d);
		e.className = "clarProbTd";
		e.innerHTML = GCJ.getProblemName(c.p);
		if (c.an) {
			var f = "Announcement";
			e.innerHTML += '<br/><span style="color: #666">' + f + "</span>"
		}
		GCJ.createElementUnder("td", d);
		e = GCJ.createElementUnder("td", d);
		e.className = "clarTimeColumn";
		e.innerHTML = GCJ.formatSecondsTime(c.c - GCJ.contest.start_int);
		GCJ.createElementUnder("td", d);
		e = GCJ.createElementUnder("td", d);
		e.innerHTML = "<i>" + c.q + "</i>";
		GCJ.createElementUnder("td", d);
		e = GCJ.createElementUnder("td", d);
		e.className = "clarTimeColumn";
		e.innerHTML = c.a ? GCJ.formatSecondsTime(c.u - GCJ.contest.start_int) : "";
		GCJ.createElementUnder("td",
			d);
		d = GCJ.createElementUnder("td", d);
		c.a ? d.innerHTML = "<i>" + c.a + "</i>" : (f = "No answer yet.", goog$style$setStyle(d, "color", "#999999"), d.innerHTML = f);
		c.a && c.u > GCJ.lastClarSeenTime && goog$style$setStyle(e, "color", "red");
		c.a && -1 != GCJ.selectedProblem && c.u > GCJ.lastClarSeenTime && GCJ.unreadClar++
	}
	b = goog$dom$getElement("dsb-ask-question-tab");
	a = GCJ.isQualified ? "Ask a question" : "Questions asked";
	GCJ.unreadClar ? (b.className = "dsb-has-new-question-tab", b.innerHTML = a + '<span class="dsb-unread-count">' + GCJ.unreadClar +
		"</span>") : (b.className = "", b.innerHTML = a);
	for (b = a = 0; b < GCJ.sortedClarKeys.length; ++b) c = GCJ.sortedClarKeys[b], c = GCJ.clarifications[c], c.a || ++a;
	a < GCJ.PENDING_CLARIFICATIONS_LIMIT && GCJ.canAskClarifications ? (GCJ.show("dsb-submit-clarification"), GCJ.hide("dsb-cannot-ask-question-text")) : (GCJ.hide("dsb-submit-clarification"), GCJ.show("dsb-cannot-ask-question-text"));
	GCJ.sortedClarKeys.length ? GCJ.show("dsb-clarification-table") : GCJ.hide("dsb-clarification-table")
};
GCJ.updateClarifications = function(a) {
	for (var b = 0; a[b]; ++b) GCJ.updateClarification(a[b]);
	GCJ.repaintClarifications()
};
GCJ.validateSecondsPassed = function(a) {
	var b = a.difficulty,
		b = 60 * GCJ.IO_TIMELIMITS[b];
	a.secsPassed >= b && (a.secsPassed = -1)
};
GCJ.validateDistributedSecondsPassed = function(a) {
	var b = a.difficulty,
		b = 60 * GCJ.IO_DISTRIBUTED_TIMEOUTS[b];
	a.secsPassed >= b && (a.secsPassed = -1)
};
GCJ.updateUserSubmissionInfo = function(a) {
	for (var b = 0, c = 0; c < GCJ.problems.length; ++c)
		for (var d = 0; GCJ.problems[c].io[d]; ++d) {
			var e = GCJ.problems[c].io[d];
			e.attempts = a.a[b];
			e.secsSolved = a.s[b];
			e.secsPassed = a.p[b];
			e.submitted = a.submitted[b];
			GCJ.isDistributedProblem(GCJ.problems[c]) ? GCJ.validateDistributedSecondsPassed(e) : GCJ.validateSecondsPassed(e);
			0 <= e.secsPassed && 0 < e.attempts && (e.attempts--, GCJ.isDistributedProblem(GCJ.problems[c]) && 1 == e.difficulty && e.attempts++);
			if (0 <= e.secsPassed && !e.inProgress) GCJ.createFormDiv(c,
				d), e.inProgress = !0;
			else if (0 > e.secsPassed && e.inProgress) {
				var f = "" + c + "-" + d;
				GCJ.stopTimer(goog$dom$getElement("dsb-submit-form-div" + f).timerId_);
				GCJ.stopTimer("dsb-resubmit-timer" + f);
				e.inProgress = !1
			}
			GCJ.updateFormDivTimer(c, d);
			GCJ.updateInputForm(c, d);
			++b
		}
};
GCJ.updateStatistics = function(a) {
	for (var b = a.stats, c = 0, d = 0; d < GCJ.problems.length; ++d)
		for (var e = 0; GCJ.problems[d].io[e]; ++e) {
			var f = GCJ.problems[d].io[e];
			GCJ.isTestRun(f) || (f.num_attempts = b[c][0], f.num_solved = b[c][1], f.first_solved = b[c][2], ++c)
		}
	GCJ.isQualified && (goog$dom$getElement("dsb-current-score-span").innerHTML = a.pts, goog$dom$getElement("dsb-current-rank-span").innerHTML = a.rank, GCJ.updateUserSubmissionInfo(a));
	GCJ.changeDisplayMode("dsb-status-tab-loading-text", "none");
	GCJ.changeDisplayMode("dsb-status-tab-problems",
		"block")
};
GCJ.pollForEvents = function() {
	var a = new Date,
		a = {
			cmd: "GetEvents",
			zx: a.getTime(),
			page_loaded: GCJ.pageLoaded
		};
	GCJ.EventsLastUpdated && (a.updated_since = GCJ.EventsLastUpdated);
	GCJ.ajaxJsonRequest(GCJ.dashboardActionPage(), a, function(a, c) {
		a && 200 == c ? (GCJ.setContestState(a.cs), a.v && (GCJ.needToRefreshPage(a.v) && GCJ.tryToRefreshPage(), a.v.p != GCJ.contest.problem_version && (GCJ.reloadProblemTexts(), GCJ.contest.problem_version = a.v.p)), a.b && GCJ.repaintScoreboard(a.b), a.c && GCJ.updateClarifications(a.c), a.s && GCJ.updateStatistics(a.s),
			a.a && GCJ.updateSubmissionList(a.a), GCJ.EventsLastUpdated = a.t, !GCJ.canAskClarifications && GCJ.practiceOpen && (GCJ.postContestPollingInterval *= 2, 120 < GCJ.postContestPollingInterval && (GCJ.postContestPollingInterval = 120)), GCJ.repaintInputStatsAll(), GCJ.pollEventsTimer = goog$global.setTimeout(GCJ.pollForEvents, GCJ.calculatePollingInterval())) : GCJ.showStatusMessage(GCJ.SERVER_ERROR_MESSAGE)
	}, {
		failurePolicy: GCJ.retryFailurePolicyFactory(GCJ.calculatePollingInterval() / 1E3, GCJ.MAX_CONSECUTIVE_POLLING_FAILURES)
	})
};
GCJ.fillProblemStatement = function(a) {
	var b = goog$dom$getElement("dsb-problem-content-div" + a);
	b.innerHTML = GCJ.problems[a].body
};
GCJ.reloadAndFillProblemStatement = function(a) {
	var b = {
		cmd: "GetProblemText",
		problem: GCJ.problems[a].id
	};
	GCJ.ajaxRequest(GCJ.dashboardActionPage(), b, function(b, d) {
		200 == d ? (GCJ.problems[a].body = b, GCJ.fillProblemStatement(a)) : GCJ.showStatusMessage(GCJ.SERVER_ERROR_MESSAGE, 60)
	})
};
GCJ.getAnalysisErrors = 0;
GCJ.fillProblemAnalysis = function(a) {
	var b = {
		cmd: "GetContestAnalysis"
	};
	a < GCJ.problems.length && (b.problem = GCJ.problems[a].id);
	GCJ.ajaxRequest(GCJ.dashboardActionPage(), b, function(b, d) {
		200 == d ? goog$dom$getElement("dsb-problem-analysis-div" + a).innerHTML = b : 20 >= GCJ.getAnalysisErrors ? (GCJ.getAnalysisErrors++, window.setTimeout(goog$partial(GCJ.fillProblemAnalysis, a), 5E3)) : GCJ.showStatusMessage("Error in loading the analysis, please try to refresh the page.", 60)
	})
};
GCJ.fillDistributedProblemPage = function(a, b, c) {
	for (var d = 0; d < b.io.length; ++d) {
		var e = b.io[d],
			f = GCJ.createElementUnder("tr", a),
			g = "" + c + "-" + d,
			h = goog$dom$createDom("TD", {
				"class": "dsb-input-table-description"
			});
		f.appendChild(h);
		var k = e.points + " points";
		h.innerHTML = GCJ.isTestRun(e) ? goog$string$trim(e.name + "<br/>Not graded<br/><i>5 minute timeout</i>") : 1 === e.difficulty ? goog$string$trim(e.name + "<br/>" + k + "<br/><i>No timeout</i>") : goog$string$trim(e.name + "<br/>" + k + "<br/><i>2 minute timeout</i>");
		f = GCJ.createElementUnder("td",
			f, {
				"class": "dsb-input-table-linktd"
			});
		f = GCJ.createElementUnder("div", f, {
			id: "dsb-action-box-wrap" + g
		});
		h = GCJ.createElementUnder("div", f, {
			id: "dsb-input-wrapper" + g,
			"class": "dsb-input-wrapper"
		});
		k = "Solve " + (String.fromCharCode(65 + c) + GCJ.IO_TYPES[e.difficulty] + ("" == e.suffix ? "" : "-" + e.suffix));
		GCJ.createElementUnder("button", h, {
			"class": "dsb-input-start-button",
			id: "dsb-input-start-button" + g
		}, k);
		GCJ.createElementUnder("span", f, {
			"class": "dsb-input-table-caption",
			id: "dsb-input-table-caption" + g
		});
		h = GCJ.createElementUnder("span",
			f, {
				"class": "dsb-input-table-caption",
				id: "dsb-cooldown-caption" + g
			}, "Time left:");
		h.style.display = "none";
		GCJ.createElementUnder("span", f, {
			"class": "dsb-input-table-caption",
			id: "dsb-cooldown-timer" + g
		});
		var m = "dsb-resubmit-caption" + g,
			h = "dsb-resubmit-link" + g,
			g = "dsb-resubmit-view-sub-link" + g,
			k = document.createElement("span");
		k.className = "dsb-input-table-caption";
		k.id = m;
		var m = "Your submission was received. You can still " + ('<span class="dsb-input-link-text" id="' + h + '">' + ("resubmit</span>.<br/>Only your last submission counts. " +
				('<span class="dsb-input-link-text" id="' + g + '">View your last submission</span>.'))),
			p = "Your submission was correct. You can still " + ('<span class="dsb-input-link-text" id="' + h + '">' + ("resubmit</span>.<br/>Further submissions will not affect your current score. " + ('<span class="dsb-input-link-text" id="' + g + '">View your last submission</span>.')));
		k.innerHTML = 0 == e.difficulty ? p : m;
		f.appendChild(k);
		goog$events$listen(goog$dom$getElement(h), "click", goog$partial(GCJ.activateInput, c, d));
		goog$events$listen(goog$dom$getElement(g),
			"click", goog$partial(GCJ.changeHistoryState, "s", "s"));
		e = GCJ.createElementUnder("div", f);
		GCJ.createElementUnder("div", e, {
			"class": "dsb-submit-form-div",
			id: "dsb-submit-form-div" + c + "-" + d
		}, "temp")
	}
};
GCJ.fillProblemPages = function() {
	for (var a = 0; a < GCJ.problems.length; ++a) {
		GCJ.fillProblemStatement(a);
		var b = goog$dom$getElement("dsb-input-form-table" + a);
		if (GCJ.isDistributedProblem(GCJ.problems[a])) GCJ.fillDistributedProblemPage(b, GCJ.problems[a], a);
		else
			for (var c = 0; c < GCJ.problems[a].io.length; ++c) {
				var d = GCJ.problems[a].io[c],
					e = GCJ.createElementUnder("tr", b),
					f = "" + a + "-" + c,
					g = goog$dom$createDom("TD", {
						"class": "dsb-input-table-description"
					});
				e.appendChild(g);
				var h = d.points + " points",
					k = "Large input " + d.suffix,
					m = "Small input " + d.suffix;
				g.innerHTML = goog$string$trim(1 == d.difficulty ? k : m) + "<br/>" + h;
				e = GCJ.createElementUnder("td", e, {
					"class": "dsb-input-table-linktd"
				});
				e = GCJ.createElementUnder("div", e, {
					id: "dsb-action-box-wrap" + f
				});
				g = GCJ.createElementUnder("div", e, {
					id: "dsb-input-wrapper" + f,
					"class": "dsb-input-wrapper"
				});
				d = "Solve " + (String.fromCharCode(65 + a) + GCJ.IO_TYPES[d.difficulty] + ("" == d.suffix ? "" : "-" + d.suffix));
				GCJ.createElementUnder("button", g, {
						"class": "dsb-input-start-button",
						id: "dsb-input-start-button" + f
					},
					d);
				d = GCJ.createElementUnder("span", g, {
					"class": "dsb-input-link-span",
					id: "dsb-input-link-plain" + f
				});
				g = GCJ.createElementUnder("img", d, {
					"class": "dsb-input-link-img"
				});
				g.src = GCJ.base_url + "/static/file.gif";
				GCJ.createElementUnder("span", d, {
					"class": "dsb-input-link-text",
					id: "dsb-input-link-plain-text" + f
				});
				GCJ.createElementUnder("span", e, {
					"class": "dsb-input-table-caption",
					id: "dsb-input-table-caption" + f
				});
				g = "dsb-resubmit-caption" + f;
				h = "dsb-resubmit-timer" + f;
				d = "dsb-resubmit-link" + f;
				f = "dsb-resubmit-view-sub-link" +
					f;
				k = document.createElement("span");
				k.className = "dsb-input-table-caption";
				k.id = g;
				g = "Your submission was received. You can still " + ('<span class="dsb-input-link-text" id="' + d + '">' + ("resubmit</span> for " + ('<span id="' + h + '"></span>' + (".<br/>Only your last submission counts. " + ('<span class="dsb-input-link-text" id="' + f + '">View your last submission</span>.')))));
				k.innerHTML = g;
				e.appendChild(k);
				goog$events$listen(goog$dom$getElement(d), "click", goog$partial(GCJ.onSubmissionBoxToggle, a, c, !0));
				goog$events$listen(goog$dom$getElement(f),
					"click", goog$partial(GCJ.changeHistoryState, "s", "s"));
				f = GCJ.createElementUnder("div", e);
				GCJ.createElementUnder("div", f, {
					"class": "dsb-submit-form-div",
					id: "dsb-submit-form-div" + a + "-" + c
				}, "temp")
			}
	}
};
GCJ.requestContestAnalysis = function() {
	for (var a = 0; a <= GCJ.problems.length; ++a) GCJ.fillProblemAnalysis(a)
};
GCJ.reloadProblemTexts = function() {
	for (var a = 0; a < GCJ.problems.length; ++a) GCJ.reloadAndFillProblemStatement(a)
};
GCJ.generateScoreboard = function() {
	for (var a = goog$dom$getElement("dsb-scoreboard-table-wrap"), b = ['<table id="dsb-scoreboard-table">'], c = GCJ.NUM_SCOREBOARD_ROWS_TO_SHOW, d = 0; d < c; ++d) {
		var e = 0 == d % 2 ? "dsb-scoreboard-row-even" : "dsb-scoreboard-row-odd";
		b.push('<tr class="' + e + '" id="sbRow_' + d + '" style="display:none">');
		b.push('<td class="dsb-name-td" id="sbName_' + d + '">&nbsp;</td>');
		b.push('<td class="dsb-score-td" id="sbScore_' + d + '">&nbsp;</td>');
		b.push("</tr>")
	}
	b.push("</table>");
	a.innerHTML = b.join("")
};
GCJ.setupListenersForButton = function(a, b, c) {
	goog$events$listen(goog$dom$getElement(a), "click", goog$partial(GCJ.changeHistoryState, b, c));
	goog$events$listen(goog$dom$getElement(a), "keypress", goog$partial(GCJ.changeHistoryStateOnEnter, b, c))
};
GCJ.setupListeners = function() {
	for (var a = 0; a < GCJ.problems.length; ++a) GCJ.setupListenersForButton("dsb-problem-tab" + a, "s", "p" + a);
	GCJ.setupListenersForButton("dsb-analysis-button", "s", "a");
	GCJ.setupListenersForButton("dsb-ask-question-button", "s", "q");
	GCJ.setupListenersForButton("dsb-view-sub-link", "s", "s");
	goog$events$listen(window, "click", function() {
		GCJ.userActionHandler()
	});
	GCJ.setupListenersForButton("dsb-submissions-button", "s", "s");
	if (GCJ.hasAnalysis)
		for (a = 0; a <= GCJ.problems.length; ++a) GCJ.setupListenersForButton("dsb-analysis-selection-p" +
			a, "a", a)
};
GCJ.hideCooldownTimer = function(a) {
	GCJ.hide("dsb-cooldown-timer" + a);
	GCJ.hide("dsb-cooldown-caption" + a)
};
GCJ.showCooldownTimer = function(a) {
	GCJ.show("dsb-cooldown-timer" + a);
	GCJ.show("dsb-cooldown-caption" + a)
};
GCJ.hideElementsForSpectators = function() {
	GCJ.hide("dsb-current-rank-div");
	GCJ.hide("dsb-current-score-div");
	GCJ.hide("dsb-submissions-button");
	GCJ.stopAskQuestions();
	GCJ.updateAllInputForms()
};
GCJ.finishContest = function() {
	GCJ.contestFinished = !0;
	GCJ.inputPanelHTML = '<span style="color: #666666;">The contest is over.  You will be able to try solving the problems for practice soon.</span>';
	GCJ.fillInputPanel();
	GCJ.updateAllInputForms()
};
GCJ.startPractice = function() {
	GCJ.practiceOpen = !0;
	for (var a = 0; a < GCJ.problems.length; ++a)
		for (var b = 0; b < GCJ.problems[a].io.length; ++b) GCJ.createFormDiv(a, b), GCJ.problems[a].io[b].userToggle = !1;
	a = GCJ.getSplashPage();
	a = "This contest is open for practice.  You can try every problem as many times as you like, though we won't keep track of which problems you solve.  Read the " + ('<a href="' + a + '/quickstart.html" target="_blank">Quick-Start Guide</a> to get started.');
	goog$dom$getElement("dsb-time-remaining").innerHTML =
		"Practice Mode";
	a = '<span style="color: #666666;">' + a + "</span>";
	GCJ.inputPanelHTML = a;
	GCJ.fillInputPanel();
	GCJ.updateAllInputForms();
	GCJ.stopAskQuestions()
};
GCJ.stopAskQuestions = function() {
	GCJ.canAskClarifications = !1;
	goog$dom$getElement("dsb-cannot-ask-question-text").innerHTML = "You cannot ask questions at this time. Please email us at codejam@google.com.";
	GCJ.repaintClarifications()
};
GCJ.userActionHandler = function() {
	if (GCJ.canAskClarifications || !GCJ.practiceOpen) {
		var a = GCJ.calculatePollingInterval() > 1.2 * GCJ.DEFAULT_POLLING_INTERVAL;
		GCJ.lastActionTime = (new Date).getTime();
		a && (GCJ.pollEventsTimer && (goog$global.clearTimeout(GCJ.pollEventsTimer), GCJ.pollEventsTimer = null), GCJ.pollEventsTimer = goog$global.setTimeout(GCJ.pollForEvents, 0))
	}
};
GCJ.calculatePollingInterval = function() {
	if (!GCJ.canAskClarifications && GCJ.practiceOpen) return 6E4 * GCJ.postContestPollingInterval;
	var a = (new Date).getTime() - GCJ.lastActionTime;
	72E5 < a ? a = 18E5 : 18E5 < a ? a = 3E5 : (a = GCJ.DEFAULT_POLLING_INTERVAL, a += 4E3 * Math.random() - 2E3);
	return a
};
GCJ.setContestState = function(a) {
	a != GCJ.contest.state && (a < GCJ.contest.state ? GCJ.tryToRefreshPage() : (GCJ.contest.state = a, 4 == GCJ.contest.state && goog$global.setTimeout(GCJ.startPractice, 0)))
};
GCJ.historyNavCallback = function() {
	var a = GCJ.history.getToken(),
		a = new goog$Uri$QueryData(a),
		b = Number(a.get("a", -1));
	if (0 > b || b > GCJ.problems.length) b = GCJ.problems.length;
	GCJ.showAnalysis(b);
	a = a.get("s", "p0");
	GCJ.pageLoaded = a;
	switch (a) {
		case "a":
			if (GCJ.hasAnalysis) {
				GCJ.showAnalysisPage();
				return
			}
			break;
		case "q":
			GCJ.showClarificationPage();
			return;
		case "s":
			if (GCJ.isQualified) {
				GCJ.showSubmissionsPage();
				return
			}
	}
	a = +a.substring(1);
	if (0 > a || a >= GCJ.problems.length) a = 0;
	GCJ.showProblem(a)
};
GCJ.main = function() {
	GCJ.initContestVariables();
	GCJ.showStatusMessage("Loading contest information...");
	GCJ.getUserInformation()
};
GCJ.getUserInformation = function() {
	var a = new Date,
		a = {
			cmd: "GetInitialValues",
			zx: a.getTime()
		};
	GCJ.ajaxJsonRequest(GCJ.dashboardActionPage(), a, function(a, c) {
		200 == c ? (c = (new Date).getTime(), GCJ.contest.secondsLeft = a.seconds_left, GCJ.lastClarSeenTime = a.clar_last_seen, GCJ.inputPanelHTML = a.input_panel_html, GCJ.adminHTMLSnippet = a.admin_html_snippet, GCJ.insightHTMLSnippet = a.insight_html_snippet, GCJ.isLoggedIn = a.logged_in, GCJ.isQualified = a.qualified, GCJ.loginHTML = a.login_html, GCJ.logoutHTML = a.logout_html, GCJ.email =
			a.email, GCJ.display_name = a.display_name, GCJ.csrfMiddlewareToken = a.csrf_middleware_token, GCJ.contest.name = a.name, GCJ.contest.version = a.version, GCJ.contest.start_int = a.start_int, a = a.seconds_until_start, GCJ.localContestStartTime = c + 1E3 * a, GCJ.localContestEndTime = c + 1E3 * GCJ.contest.secondsLeft, GCJ.onInitialValuesReady()) : GCJ.showStatusMessage("Failed to load the contest.  Please reload this page.")
	})
};
GCJ.fillTitleLinks = function() {
	var a = goog$dom$getElement("dsb-title-links"),
		b = "";
	GCJ.isLoggedIn && (b += "<b>" + GCJ.display_name + "</b> | ");
	GCJ.contest.running && (b += GCJ.scoreboardLink + " | ");
	GCJ.isLoggedIn ? (GCJ.insightHTMLSnippet && (b += GCJ.insightHTMLSnippet + " | "), GCJ.adminHTMLSnippet && (b += GCJ.adminHTMLSnippet + " | "), b += GCJ.logoutHTML) : b += GCJ.loginHTML;
	a.innerHTML = b
};
GCJ.fillInputPanel = function() {
	for (var a = 0; a < GCJ.problems.length; ++a) {
		var b = goog$dom$getElement("dsb-input-panel-text" + a);
		b.innerHTML = GCJ.inputPanelHTML
	}
};
GCJ.onInitialValuesReady = function() {
	GCJ.fillTitleLinks();
	var a = GCJ.localContestStartTime - (new Date).getTime();
	0 < a ? (GCJ.hideStatusMessage(), GCJ.changeVisibilityByCSSClass(!0, !1), a > 1500 * GCJ.PRE_CONTEST_POLLING_FREQUENCY_SECONDS ? (GCJ.startTimer("contestTimer", a), goog$global.setTimeout(GCJ.getUserInformation, 1E3 * GCJ.PRE_CONTEST_POLLING_FREQUENCY_SECONDS)) : GCJ.startTimer("contestTimer", a, GCJ.initializeStartedContest)) : GCJ.initializeStartedContest()
};
GCJ.changeModeForAll = function(a, b) {
	for (var c = 0; c < a.length; c++) GCJ.changeDisplayMode(a[c], b)
};
GCJ.changeVisibilityByCSSClass = function(a, b) {
	var c = goog$dom$getElementsByClass("before-start-only"),
		d = goog$dom$getElementsByClass("before-start-only-inline"),
		e = goog$dom$getElementsByClass("after-start-only"),
		f = goog$dom$getElementsByClass("after-start-only-inline");
	a ? (GCJ.changeModeForAll(c, "block"), GCJ.changeModeForAll(d, "inline")) : (GCJ.changeModeForAll(c, "none"), GCJ.changeModeForAll(d, "none"));
	b ? (GCJ.changeModeForAll(e, "block"), GCJ.changeModeForAll(f, "inline")) : (GCJ.changeModeForAll(e, "none"), GCJ.changeModeForAll(f,
		"none"))
};
GCJ.initializeStartedContest = function() {
	GCJ.showStatusMessage("Loading problem information...");
	var a = GCJ.failurePolicyRetryContestInfoV0,
		b = function(a, b) {
			if (200 == b) {
				GCJ.hasAnalysis = a.has_analysis;
				b = a.problems;
				for (var c, d = 0; d < b.length; d++) {
					c = b[d];
					var e = [];
					if (GCJ.isDistributedProblem(c)) k = 0;
					else var k = 0,
						m;
					for (; m = c.io[k++];) e.push({
						name: m.name,
						suffix: m.suffix,
						difficulty: m.difficulty,
						points: m.points,
						attempts: 0,
						secsSolved: -1,
						secsPassed: -1
					});
					GCJ.problems.push({
						id: c.id,
						key: c.key,
						name: c.name,
						body: c.body,
						io: e,
						type: c.type
					})
				}
				GCJ.contest.problem_version = a.problem_version;
				GCJ.finishInitializingStartedContest()
			} else 404 == b ? (GCJ.showStatusMessage("Fetching problems failed.  Reloading contest information."), goog$global.setTimeout(GCJ.getUserInformation, 2E3)) : GCJ.showStatusMessage("Fetching problems failed.  Please reload this page.")
		},
		c = function(b, c) {
			var d = c + 1;
			c = a(b, c).retrySeconds;
			GCJ.changeVisibilityByCSSClass(!0, !1);
			GCJ.changeDisplayMode("dsb-time-remaining-before", "none");
			b = 404 === b ? "Loading problem information failed.  Trying again in " +
				(c + " seconds.") : "Loading problem information failed (attempt " + (d + ("). Trying again after " + (c + " seconds.")));
			GCJ.showStatusMessage(b)
		},
		c = {
			method: "GET",
			csrfProtect: !1,
			failurePolicy: a,
			failureCallback: c
		};
	GCJ.ajaxJsonRequest(GCJ.dashboardContestInfoPage(), {}, b, c)
};
GCJ.createProblemDivs = function() {
	var a = goog$dom$getElement("dsb-problem-selection-list"),
		b = '<div id="dsb-problem-tab%d" class="dsb-problem-tab-close"    tabindex="0" role="button">  <div id="dsb-problem-title%d" class="dynamic-link">%s. %s  </div></div>',
		c;
	for (c = 0; c < GCJ.problems.length; c++) {
		var d = document.createElement("div");
		d.innerHTML = goog$string$format(b, c, c, String.fromCharCode(65 + c), GCJ.problems[c].name);
		a.appendChild(d)
	}
	c = goog$dom$getElement("dsb-status-tab");
	d = document.createElement("div");
	d.id = "dsb-status-tab-problems";
	d.style.display = "none";
	c.appendChild(d);
	b = '<div id="dsb-problem-status-wrapper%d" class="problem-status-wrapper">  <div class="dsb-status-problem-title">%s</div></div>';
	for (c = 0; c < GCJ.problems.length; c++) {
		var e = document.createElement("div");
		e.innerHTML = goog$string$format(b, c, GCJ.problems[c].name);
		d.appendChild(e);
		e = goog$dom$getElement("dsb-problem-status-wrapper" + c);
		for (a = 0; a < GCJ.problems[c].io.length; a++) {
			var f = document.createElement("div");
			f.innerHTML = goog$string$format('<table class="problemStatus">  <tbody>    <tr class="inputSetStatus">      <td id="inputName%d_%d" class="inputName"></td>      <td class="status">        <div id="selfStat%d_%d" class="selfStat">&nbsp;</div>        <div id="globalStat%d_%d" class="globalStat">&nbsp;</div>      </td>    </tr>  </tbody></table>',
				c, a, c, a, c, a);
			e.appendChild(f)
		}
	}
	d = goog$dom$getElement("dsb-problem-pages");
	b = '\x3c!-- Problem Input File Selection --\x3e<div class="dsb-input-panel-text" id="dsb-input-panel-text%d"></div><table><tbody id="dsb-input-form-table%d"></tbody></table>\x3c!-- Problem Statement --\x3e<div id="dsb-problem-content-div%d"    class="dsb-problem-content-div"></div>';
	for (c = 0; c < GCJ.problems.length; c++) {
		e = document.createElement("div");
		e.id = "dsb-problem-page" + c;
		e.className = "dsb-content-pages";
		if (GCJ.isDistributedProblem(GCJ.problems[c]) &&
			"Testrun" != GCJ.problems[c].name) {
			for (var f = b + "<span> Sample input libraries:", g = ["CPP", "Java"], h, a = 0; 3 > a; a++)
				for (f += "<br/>Sample input for test " + (a + 1) + ": ", h = 0; h < g.length; h++) f += '<a id="dsb-sample-input-' + c + "-" + a + "-" + g[h] + '" class="dsb-download-sample-link">' + GCJ.problems[c].name + GCJ.languageExtension(g[h]) + "</a> [" + g[h] + "] ";
			f += "</span>";
			e.innerHTML = goog$string$format(f, c, c, c)
		} else e.innerHTML = goog$string$format(b, c, c, c);
		d.appendChild(e);
		if (GCJ.isDistributedProblem(GCJ.problems[c]) && "Testrun" !=
			GCJ.problems[c].name)
			for (a = 0; 3 > a; a++)
				for (h = 0; h < g.length; h++) GCJ.listenExclusively("dsb-sample-input-" + c + "-" + a + "-" + g[h], "click", goog$partial(GCJ.downloadSampleInput, c, a, g[h]))
	}
	if (GCJ.hasAnalysis) {
		g = goog$dom$getElement("dsb-analysis-page");
		a = document.createElement("div");
		a.id = "dsb-analysis-selections";
		g.appendChild(a);
		a.innerHTML = '<span id="dsb-analysis-selection-p' + GCJ.problems.length + '"  class="dsb-analysis-selected">Overview</span>';
		b = '&nbsp; | &nbsp;<span id="dsb-analysis-selection-p%d"  class="dsb-analysis-not-selected">Problem %s</span>';
		for (c = 0; c < GCJ.problems.length; c++) a.innerHTML += goog$string$format(b, c, String.fromCharCode(65 + c));
		c = document.createElement("div");
		c.id = "dsb-problem-analysis-div" + GCJ.problems.length;
		c.className = "dsb-problem-content-div";
		c.innerHTML = "Loading contest analysis...";
		g.appendChild(c);
		for (c = 0; c < GCJ.problems.length; c++) b = document.createElement("div"), b.id = "dsb-problem-analysis-div" + c, b.className = "dsb-problem-content-div", b.style.display = "none", a = "Loading problem analysis...", b.innerHTML = a, g.appendChild(b)
	}
	b =
		goog$dom$getElement("dsb-clarification-problem-select");
	for (c = 0; c < GCJ.problems.length; c++) g = document.createElement("option"), g.value = GCJ.problems[c].id, g.innerHTML = String.fromCharCode(65 + c) + ". " + GCJ.problems[c].name, b.appendChild(g);
	for (c = 0; c < GCJ.problems.length; c++) b = goog$dom$getElement("dsb-problem-content-div" + c), b.innerHTML = GCJ.problems[c].body;
	GCJ.fillProblemPages()
};
GCJ.finishInitializingStartedContest = function() {
	GCJ.contest.running = !0;
	GCJ.fillTitleLinks();
	GCJ.hideStatusMessage();
	GCJ.changeVisibilityByCSSClass(!1, !0);
	GCJ.createProblemDivs();
	var a = (new Date).getTime(),
		b = GCJ.localContestEndTime - a;
	0 > b ? GCJ.finishContest() : GCJ.startTimer("contestTimer", b, GCJ.finishContest);
	GCJ.fillInputPanel();
	GCJ.generateScoreboard();
	GCJ.updateAllInputForms();
	GCJ.setupListeners();
	GCJ.isQualified || GCJ.hideElementsForSpectators();
	GCJ.hasAnalysis ? (GCJ.selectedAnalysis = GCJ.problems.length,
		GCJ.requestContestAnalysis(), GCJ.show("dsb-analysis-button")) : GCJ.hide("dsb-analysis-button");
	if (goog$userAgent$IE || goog$userAgent$WEBKIT)
		for (b = 0; b < GCJ.problems.length; ++b) {
			var c = goog$dom$getElement("dsb-problem-content-div" + b);
			c && goog$style$setStyle(c, "width", "40em")
		}
	GCJ.history.setEnabled(!0);
	a -= GCJ.localContestStartTime;
	2E4 <= a ? GCJ.pollForEvents() : (a = Math.random() * (2E4 - a), goog$global.setTimeout(GCJ.pollForEvents, a))
};