import {
  client_exports
} from "./chunk-FECFGNAG.js";
import {
  computed,
  getCurrentInstance,
  h
} from "./chunk-3JL2R52N.js";
import {
  camelize,
  capitalize
} from "./chunk-XYQ66V4O.js";

// node_modules/vuepress-shared/lib/client/index.js
var nt = ({ name: t = "", color: s = "currentColor" }, { slots: e }) => {
  var r;
  return h("svg", { xmlns: "http://www.w3.org/2000/svg", class: ["icon", `${t}-icon`], viewBox: "0 0 1024 1024", fill: s, "aria-label": `${t} icon` }, (r = e.default) == null ? void 0 : r.call(e));
};
nt.displayName = "IconBase";
var gt = (t, { slots: s }) => {
  var e;
  return ((e = s.default) == null ? void 0 : e.call(s)) || null;
};
var Mt = (t) => {
  const s = getCurrentInstance();
  return typeof (s == null ? void 0 : s.appContext.components) == "object" && (t in s.appContext.components || camelize(t) in s.appContext.components || capitalize(camelize(t)) in s.appContext.components);
};
var Dt = (t) => {
  const s = (0, client_exports.useRouteLocale)();
  return computed(() => t[s.value]);
};
var Ct = (t, s) => {
  let e = 1;
  for (let r = 0; r < t.length; r++)
    e += t.charCodeAt(r), e += e << 10, e ^= e >> 6;
  return e += e << 3, e ^= e >> 11, e % s;
};
var rt = /#.*$/u;
var it = (t) => {
  const s = rt.exec(t);
  return s ? s[0] : "";
};
var G = (t) => decodeURI(t).replace(rt, "").replace(/(index)?\.(md|html)$/, "");
var Ht = (t, s) => {
  if (s === void 0)
    return false;
  const e = G(t.path), r = G(s), w = it(s);
  return w ? w === t.hash && (!r || e === r) : e === r;
};
Object.freeze({}), Object.freeze([]);
var It = (t) => typeof t == "function";
var Et = (t) => typeof t == "string";
var st = (t, ...s) => {
  const e = t.resolve(...s), r = e.matched[e.matched.length - 1];
  if (!(r != null && r.redirect))
    return e;
  const { redirect: w } = r, _ = It(w) ? w(e) : w, g = Et(_) ? { path: _ } : _;
  return st(t, { hash: e.hash, query: e.query, params: e.params, ...g });
};
var R = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var ot = { exports: {} };
(function(t, s) {
  (function(e, r) {
    t.exports = r();
  })(R, function() {
    var e = 1e3, r = 6e4, w = 36e5, _ = "millisecond", g = "second", b = "minute", h2 = "hour", M = "day", A = "week", m = "month", u = "quarter", v = "year", d = "date", n = "Invalid Date", c = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, O = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, S = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, x = function($, a, i) {
      var f = String($);
      return !f || f.length >= a ? $ : "" + Array(a + 1 - f.length).join(i) + $;
    }, I = { s: x, z: function($) {
      var a = -$.utcOffset(), i = Math.abs(a), f = Math.floor(i / 60), o = i % 60;
      return (a <= 0 ? "+" : "-") + x(f, 2, "0") + ":" + x(o, 2, "0");
    }, m: function $(a, i) {
      if (a.date() < i.date())
        return -$(i, a);
      var f = 12 * (i.year() - a.year()) + (i.month() - a.month()), o = a.clone().add(f, m), p = i - o < 0, l = a.clone().add(f + (p ? -1 : 1), m);
      return +(-(f + (i - o) / (p ? o - l : l - o)) || 0);
    }, a: function($) {
      return $ < 0 ? Math.ceil($) || 0 : Math.floor($);
    }, p: function($) {
      return { M: m, y: v, w: A, d: M, D: d, h: h2, m: b, s: g, ms: _, Q: u }[$] || String($ || "").toLowerCase().replace(/s$/, "");
    }, u: function($) {
      return $ === void 0;
    } }, T = "en", H = {};
    H[T] = S;
    var k = function($) {
      return $ instanceof W;
    }, E = function $(a, i, f) {
      var o;
      if (!a)
        return T;
      if (typeof a == "string") {
        var p = a.toLowerCase();
        H[p] && (o = p), i && (H[p] = i, o = p);
        var l = a.split("-");
        if (!o && l.length > 1)
          return $(l[0]);
      } else {
        var Y = a.name;
        H[Y] = a, o = Y;
      }
      return !f && o && (T = o), o || !f && T;
    }, D = function($, a) {
      if (k($))
        return $.clone();
      var i = typeof a == "object" ? a : {};
      return i.date = $, i.args = arguments, new W(i);
    }, y = I;
    y.l = E, y.i = k, y.w = function($, a) {
      return D($, { locale: a.$L, utc: a.$u, x: a.$x, $offset: a.$offset });
    };
    var W = function() {
      function $(i) {
        this.$L = E(i.locale, null, true), this.parse(i);
      }
      var a = $.prototype;
      return a.parse = function(i) {
        this.$d = function(f) {
          var o = f.date, p = f.utc;
          if (o === null)
            return new Date(NaN);
          if (y.u(o))
            return new Date();
          if (o instanceof Date)
            return new Date(o);
          if (typeof o == "string" && !/Z$/i.test(o)) {
            var l = o.match(c);
            if (l) {
              var Y = l[2] - 1 || 0, C = (l[7] || "0").substring(0, 3);
              return p ? new Date(Date.UTC(l[1], Y, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, C)) : new Date(l[1], Y, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, C);
            }
          }
          return new Date(o);
        }(i), this.$x = i.x || {}, this.init();
      }, a.init = function() {
        var i = this.$d;
        this.$y = i.getFullYear(), this.$M = i.getMonth(), this.$D = i.getDate(), this.$W = i.getDay(), this.$H = i.getHours(), this.$m = i.getMinutes(), this.$s = i.getSeconds(), this.$ms = i.getMilliseconds();
      }, a.$utils = function() {
        return y;
      }, a.isValid = function() {
        return this.$d.toString() !== n;
      }, a.isSame = function(i, f) {
        var o = D(i);
        return this.startOf(f) <= o && o <= this.endOf(f);
      }, a.isAfter = function(i, f) {
        return D(i) < this.startOf(f);
      }, a.isBefore = function(i, f) {
        return this.endOf(f) < D(i);
      }, a.$g = function(i, f, o) {
        return y.u(i) ? this[f] : this.set(o, i);
      }, a.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, a.valueOf = function() {
        return this.$d.getTime();
      }, a.startOf = function(i, f) {
        var o = this, p = !!y.u(f) || f, l = y.p(i), Y = function(P, U) {
          var F = y.w(o.$u ? Date.UTC(o.$y, U, P) : new Date(o.$y, U, P), o);
          return p ? F : F.endOf(M);
        }, C = function(P, U) {
          return y.w(o.toDate()[P].apply(o.toDate("s"), (p ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(U)), o);
        }, L = this.$W, z = this.$M, Z = this.$D, j = "set" + (this.$u ? "UTC" : "");
        switch (l) {
          case v:
            return p ? Y(1, 0) : Y(31, 11);
          case m:
            return p ? Y(1, z) : Y(0, z + 1);
          case A:
            var J = this.$locale().weekStart || 0, V = (L < J ? L + 7 : L) - J;
            return Y(p ? Z - V : Z + (6 - V), z);
          case M:
          case d:
            return C(j + "Hours", 0);
          case h2:
            return C(j + "Minutes", 1);
          case b:
            return C(j + "Seconds", 2);
          case g:
            return C(j + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, a.endOf = function(i) {
        return this.startOf(i, false);
      }, a.$set = function(i, f) {
        var o, p = y.p(i), l = "set" + (this.$u ? "UTC" : ""), Y = (o = {}, o[M] = l + "Date", o[d] = l + "Date", o[m] = l + "Month", o[v] = l + "FullYear", o[h2] = l + "Hours", o[b] = l + "Minutes", o[g] = l + "Seconds", o[_] = l + "Milliseconds", o)[p], C = p === M ? this.$D + (f - this.$W) : f;
        if (p === m || p === v) {
          var L = this.clone().set(d, 1);
          L.$d[Y](C), L.init(), this.$d = L.set(d, Math.min(this.$D, L.daysInMonth())).$d;
        } else
          Y && this.$d[Y](C);
        return this.init(), this;
      }, a.set = function(i, f) {
        return this.clone().$set(i, f);
      }, a.get = function(i) {
        return this[y.p(i)]();
      }, a.add = function(i, f) {
        var o, p = this;
        i = Number(i);
        var l = y.p(f), Y = function(z) {
          var Z = D(p);
          return y.w(Z.date(Z.date() + Math.round(z * i)), p);
        };
        if (l === m)
          return this.set(m, this.$M + i);
        if (l === v)
          return this.set(v, this.$y + i);
        if (l === M)
          return Y(1);
        if (l === A)
          return Y(7);
        var C = (o = {}, o[b] = r, o[h2] = w, o[g] = e, o)[l] || 1, L = this.$d.getTime() + i * C;
        return y.w(L, this);
      }, a.subtract = function(i, f) {
        return this.add(-1 * i, f);
      }, a.format = function(i) {
        var f = this, o = this.$locale();
        if (!this.isValid())
          return o.invalidDate || n;
        var p = i || "YYYY-MM-DDTHH:mm:ssZ", l = y.z(this), Y = this.$H, C = this.$m, L = this.$M, z = o.weekdays, Z = o.months, j = function(U, F, q, B) {
          return U && (U[F] || U(f, p)) || q[F].slice(0, B);
        }, J = function(U) {
          return y.s(Y % 12 || 12, U, "0");
        }, V = o.meridiem || function(U, F, q) {
          var B = U < 12 ? "AM" : "PM";
          return q ? B.toLowerCase() : B;
        }, P = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: L + 1, MM: y.s(L + 1, 2, "0"), MMM: j(o.monthsShort, L, Z, 3), MMMM: j(Z, L), D: this.$D, DD: y.s(this.$D, 2, "0"), d: String(this.$W), dd: j(o.weekdaysMin, this.$W, z, 2), ddd: j(o.weekdaysShort, this.$W, z, 3), dddd: z[this.$W], H: String(Y), HH: y.s(Y, 2, "0"), h: J(1), hh: J(2), a: V(Y, C, true), A: V(Y, C, false), m: String(C), mm: y.s(C, 2, "0"), s: String(this.$s), ss: y.s(this.$s, 2, "0"), SSS: y.s(this.$ms, 3, "0"), Z: l };
        return p.replace(O, function(U, F) {
          return F || P[U] || l.replace(":", "");
        });
      }, a.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, a.diff = function(i, f, o) {
        var p, l = y.p(f), Y = D(i), C = (Y.utcOffset() - this.utcOffset()) * r, L = this - Y, z = y.m(this, Y);
        return z = (p = {}, p[v] = z / 12, p[m] = z, p[u] = z / 3, p[A] = (L - C) / 6048e5, p[M] = (L - C) / 864e5, p[h2] = L / w, p[b] = L / r, p[g] = L / e, p)[l] || L, o ? z : y.a(z);
      }, a.daysInMonth = function() {
        return this.endOf(m).$D;
      }, a.$locale = function() {
        return H[this.$L];
      }, a.locale = function(i, f) {
        if (!i)
          return this.$L;
        var o = this.clone(), p = E(i, f, true);
        return p && (o.$L = p), o;
      }, a.clone = function() {
        return y.w(this.$d, this);
      }, a.toDate = function() {
        return new Date(this.valueOf());
      }, a.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, a.toISOString = function() {
        return this.$d.toISOString();
      }, a.toString = function() {
        return this.$d.toUTCString();
      }, $;
    }(), X = W.prototype;
    return D.prototype = X, [["$ms", _], ["$s", g], ["$m", b], ["$H", h2], ["$W", M], ["$M", m], ["$y", v], ["$D", d]].forEach(function($) {
      X[$[1]] = function(a) {
        return this.$g(a, $[0], $[1]);
      };
    }), D.extend = function($, a) {
      return $.$i || ($(a, W, D), $.$i = true), D;
    }, D.locale = E, D.isDayjs = k, D.unix = function($) {
      return D(1e3 * $);
    }, D.en = H[T], D.Ls = H, D.p = {}, D;
  });
})(ot);
var N = ot.exports;
var at = { exports: {} };
(function(t, s) {
  (function(e, r) {
    t.exports = r();
  })(R, function() {
    var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
    return function(r, w, _) {
      var g = w.prototype, b = g.format;
      _.en.formats = e, g.format = function(h2) {
        h2 === void 0 && (h2 = "YYYY-MM-DDTHH:mm:ssZ");
        var M = this.$locale().formats, A = function(m, u) {
          return m.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(v, d, n) {
            var c = n && n.toUpperCase();
            return d || u[n] || e[n] || u[c].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(O, S, x) {
              return S || x.slice(1);
            });
          });
        }(h2, M === void 0 ? {} : M);
        return b.call(this, A);
      };
    };
  });
})(at);
var Ut = at.exports;
var ut = { exports: {} };
(function(t, s) {
  (function(e, r) {
    t.exports = r();
  })(R, function() {
    return function(e, r, w) {
      var _ = r.prototype, g = function(m) {
        var u, v = m.date, d = m.utc, n = {};
        if (!((u = v) instanceof Date) && !(u instanceof Array) && u instanceof Object) {
          if (!Object.keys(v).length)
            return new Date();
          var c = d ? w.utc() : w();
          Object.keys(v).forEach(function(E) {
            var D, y;
            n[D = E, y = _.$utils().p(D), y === "date" ? "day" : y] = v[E];
          });
          var O = n.day || (n.year || n.month >= 0 ? 1 : c.date()), S = n.year || c.year(), x = n.month >= 0 ? n.month : n.year || n.day ? 0 : c.month(), I = n.hour || 0, T = n.minute || 0, H = n.second || 0, k = n.millisecond || 0;
          return d ? new Date(Date.UTC(S, x, O, I, T, H, k)) : new Date(S, x, O, I, T, H, k);
        }
        return v;
      }, b = _.parse;
      _.parse = function(m) {
        m.date = g.bind(this)(m), b.bind(this)(m);
      };
      var h2 = _.set, M = _.add, A = function(m, u, v, d) {
        if (d === void 0 && (d = 1), u instanceof Object) {
          var n = Object.keys(u), c = this;
          return n.forEach(function(O) {
            c = m.bind(c)(u[O] * d, O);
          }), c;
        }
        return m.bind(this)(u * d, v);
      };
      _.set = function(m, u) {
        return u = u === void 0 ? m : u, A.bind(this)(function(v, d) {
          return h2.bind(this)(d, v);
        }, u, m);
      }, _.add = function(m, u) {
        return A.bind(this)(M, m, u);
      }, _.subtract = function(m, u) {
        return A.bind(this)(M, m, u, -1);
      };
    };
  });
})(ut);
var ct = ut.exports;
var ft = { exports: {} };
(function(t, s) {
  (function(e, r) {
    t.exports = r();
  })(R, function() {
    var e = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, r = {};
    return function(w, _, g) {
      var b, h2 = function(u, v, d) {
        d === void 0 && (d = {});
        var n = new Date(u), c = function(O, S) {
          S === void 0 && (S = {});
          var x = S.timeZoneName || "short", I = O + "|" + x, T = r[I];
          return T || (T = new Intl.DateTimeFormat("en-US", { hour12: false, timeZone: O, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: x }), r[I] = T), T;
        }(v, d);
        return c.formatToParts(n);
      }, M = function(u, v) {
        for (var d = h2(u, v), n = [], c = 0; c < d.length; c += 1) {
          var O = d[c], S = O.type, x = O.value, I = e[S];
          I >= 0 && (n[I] = parseInt(x, 10));
        }
        var T = n[3], H = T === 24 ? 0 : T, k = n[0] + "-" + n[1] + "-" + n[2] + " " + H + ":" + n[4] + ":" + n[5] + ":000", E = +u;
        return (g.utc(k).valueOf() - (E -= E % 1e3)) / 6e4;
      }, A = _.prototype;
      A.tz = function(u, v) {
        u === void 0 && (u = b);
        var d = this.utcOffset(), n = this.toDate(), c = n.toLocaleString("en-US", { timeZone: u }), O = Math.round((n - new Date(c)) / 1e3 / 60), S = g(c).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(n.getTimezoneOffset() / 15) - O, true);
        if (v) {
          var x = S.utcOffset();
          S = S.add(d - x, "minute");
        }
        return S.$x.$timezone = u, S;
      }, A.offsetName = function(u) {
        var v = this.$x.$timezone || g.tz.guess(), d = h2(this.valueOf(), v, { timeZoneName: u }).find(function(n) {
          return n.type.toLowerCase() === "timezonename";
        });
        return d && d.value;
      };
      var m = A.startOf;
      A.startOf = function(u, v) {
        if (!this.$x || !this.$x.$timezone)
          return m.call(this, u, v);
        var d = g(this.format("YYYY-MM-DD HH:mm:ss:SSS"));
        return m.call(d, u, v).tz(this.$x.$timezone, true);
      }, g.tz = function(u, v, d) {
        var n = d && v, c = d || v || b, O = M(+g(), c);
        if (typeof u != "string")
          return g(u).tz(c);
        var S = function(H, k, E) {
          var D = H - 60 * k * 1e3, y = M(D, E);
          if (k === y)
            return [D, k];
          var W = M(D -= 60 * (y - k) * 1e3, E);
          return y === W ? [D, y] : [H - 60 * Math.min(y, W) * 1e3, Math.max(y, W)];
        }(g.utc(u, n).valueOf(), O, c), x = S[0], I = S[1], T = g(x).utcOffset(I);
        return T.$x.$timezone = c, T;
      }, g.tz.guess = function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }, g.tz.setDefault = function(u) {
        b = u;
      };
    };
  });
})(ft);
var ht = ft.exports;
var dt = { exports: {} };
(function(t, s) {
  (function(e, r) {
    t.exports = r();
  })(R, function() {
    var e = "minute", r = /[+-]\d\d(?::?\d\d)?/g, w = /([+-]|\d\d)/g;
    return function(_, g, b) {
      var h2 = g.prototype;
      b.utc = function(n) {
        var c = { date: n, utc: true, args: arguments };
        return new g(c);
      }, h2.utc = function(n) {
        var c = b(this.toDate(), { locale: this.$L, utc: true });
        return n ? c.add(this.utcOffset(), e) : c;
      }, h2.local = function() {
        return b(this.toDate(), { locale: this.$L, utc: false });
      };
      var M = h2.parse;
      h2.parse = function(n) {
        n.utc && (this.$u = true), this.$utils().u(n.$offset) || (this.$offset = n.$offset), M.call(this, n);
      };
      var A = h2.init;
      h2.init = function() {
        if (this.$u) {
          var n = this.$d;
          this.$y = n.getUTCFullYear(), this.$M = n.getUTCMonth(), this.$D = n.getUTCDate(), this.$W = n.getUTCDay(), this.$H = n.getUTCHours(), this.$m = n.getUTCMinutes(), this.$s = n.getUTCSeconds(), this.$ms = n.getUTCMilliseconds();
        } else
          A.call(this);
      };
      var m = h2.utcOffset;
      h2.utcOffset = function(n, c) {
        var O = this.$utils().u;
        if (O(n))
          return this.$u ? 0 : O(this.$offset) ? m.call(this) : this.$offset;
        if (typeof n == "string" && (n = function(T) {
          T === void 0 && (T = "");
          var H = T.match(r);
          if (!H)
            return null;
          var k = ("" + H[0]).match(w) || ["-", 0, 0], E = k[0], D = 60 * +k[1] + +k[2];
          return D === 0 ? 0 : E === "+" ? D : -D;
        }(n), n === null))
          return this;
        var S = Math.abs(n) <= 16 ? 60 * n : n, x = this;
        if (c)
          return x.$offset = S, x.$u = n === 0, x;
        if (n !== 0) {
          var I = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          (x = this.local().add(S + I, e)).$offset = S, x.$x.$localOffset = I;
        } else
          x = this.utc();
        return x;
      };
      var u = h2.format;
      h2.format = function(n) {
        var c = n || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return u.call(this, c);
      }, h2.valueOf = function() {
        var n = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
        return this.$d.valueOf() - 6e4 * n;
      }, h2.isUTC = function() {
        return !!this.$u;
      }, h2.toISOString = function() {
        return this.toDate().toISOString();
      }, h2.toString = function() {
        return this.toDate().toUTCString();
      };
      var v = h2.toDate;
      h2.toDate = function(n) {
        return n === "s" && this.$offset ? b(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : v.call(this);
      };
      var d = h2.diff;
      h2.diff = function(n, c, O) {
        if (n && this.$u === n.$u)
          return d.call(this, n, c, O);
        var S = this.local(), x = b(n).local();
        return d.call(S, x, c, O);
      };
    };
  });
})(dt);
var lt = dt.exports;
N.extend(Ut), N.extend(ct), N.extend(lt), N.extend(ht);
var Nt = { name: "zh-cn", weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"), weekdaysShort: "\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split("_"), weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"), months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"), monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"), ordinal: (t, s) => {
  switch (s) {
    case "W":
      return `${t}\u5468`;
    default:
      return `${t}\u65E5`;
  }
}, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY\u5E74M\u6708D\u65E5", LLL: "YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206", LLLL: "YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206", l: "YYYY/M/D", ll: "YYYY\u5E74M\u6708D\u65E5", lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm", llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm" }, relativeTime: { future: "%s\u5185", past: "%s\u524D", s: "\u51E0\u79D2", m: "1 \u5206\u949F", mm: "%d \u5206\u949F", h: "1 \u5C0F\u65F6", hh: "%d \u5C0F\u65F6", d: "1 \u5929", dd: "%d \u5929", M: "1 \u4E2A\u6708", MM: "%d \u4E2A\u6708", y: "1 \u5E74", yy: "%d \u5E74" }, meridiem: (t, s) => {
  const e = t * 100 + s;
  return e < 600 ? "\u51CC\u6668" : e < 900 ? "\u65E9\u4E0A" : e < 1100 ? "\u4E0A\u5348" : e < 1300 ? "\u4E2D\u5348" : e < 1800 ? "\u4E0B\u5348" : "\u665A\u4E0A";
} };
var jt = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") };
N.locale("zh", Nt), N.locale("en", jt), N.extend(ct), N.extend(lt), N.extend(ht);
var K = (t, s) => {
  if (t) {
    if (N(t instanceof Date ? t : t.trim()).isValid()) {
      const r = s ? N(t).tz(s) : N(t), w = r.year(), _ = r.month() + 1, g = r.date(), b = r.hour(), h2 = r.minute(), M = r.second(), A = r.millisecond(), m = b === 0 && h2 === 0 && M === 0 && A === 0;
      return { value: r.toDate(), info: { year: w, month: _, day: g, ...m ? {} : { hour: b, minute: h2, second: M } }, type: m ? "date" : "full" };
    }
    const e = /(?:(\d{2,4})[/-](\d{1,2})[/-](\d{1,2}))?\s*(?:(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/u.exec(t.trim());
    if (e) {
      const [, r, w, _, g, b, h2] = e, M = (c) => typeof c > "u" ? void 0 : Number(c), A = (c) => c && c < 100 ? c + 2e3 : c, m = (c) => g && b && !h2 ? 0 : c, u = { year: A(M(r)), month: M(w), day: M(_), hour: M(g), minute: M(b), second: m(M(h2)) }, v = r === void 0 && w === void 0 && _ === void 0, d = g === void 0 && b === void 0 && h2 === void 0, n = N({ ...u, month: u.month - 1 }).toDate();
      return { value: v ? void 0 : n, info: d ? { year: u.year, month: u.month, day: u.day } : v ? { hour: u.hour, minute: u.minute, second: u.second } : u, type: v ? "time" : d ? "date" : "full" };
    }
  }
  return null;
};
var Zt = (t, s = false) => t ? Array.isArray(t) ? t.map((e) => typeof e == "string" ? { name: e } : e) : typeof t == "string" ? [{ name: t }] : typeof t == "object" && t.name ? [t] : (console.error(`Expect 'author' to be \`AuthorInfo[] | AuthorInfo | string[] | string ${s ? "" : "| false"} | undefined\`, but got`, t), []) : [];
var Ft = (t) => {
  if (t) {
    if (Array.isArray(t))
      return t;
    if (typeof t == "string")
      return [t];
    console.error("Expect 'category' to be `string[] | string | undefined`, but got", t);
  }
  return [];
};
var Pt = (t) => {
  if (t) {
    if (Array.isArray(t))
      return t;
    if (typeof t == "string")
      return [t];
    console.error("Expect 'tag' to be `string[] | string | undefined`, but got", t);
  }
  return [];
};

export {
  nt,
  gt,
  Mt,
  Dt,
  Ct,
  Ht,
  st,
  K,
  Zt,
  Ft,
  Pt
};
//# sourceMappingURL=chunk-RAI7ZBPW.js.map
