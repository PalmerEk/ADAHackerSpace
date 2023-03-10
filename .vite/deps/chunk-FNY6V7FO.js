import {
  require_gun
} from "./chunk-DC2GYHRT.js";
import {
  require_radix
} from "./chunk-CDMFTHRR.js";
import {
  __commonJS,
  __require
} from "./chunk-TFWDKVI3.js";

// node_modules/gun/lib/yson.js
var require_yson = __commonJS({
  "node_modules/gun/lib/yson.js"(exports, module) {
    (function() {
      var yson = {}, u, sI = setTimeout.turn || typeof setImmediate != "" + u && setImmediate || setTimeout;
      yson.parseAsync = function(text, done, revive, M) {
        if ("string" != typeof text) {
          try {
            done(u, JSON.parse(text));
          } catch (e) {
            done(e);
          }
          return;
        }
        var ctx = { i: 0, text, done, l: text.length, up: [] };
        M = M || 1024 * 32;
        parse();
        function parse() {
          var s = ctx.text;
          var i = ctx.i, l = ctx.l, j = 0;
          var w = ctx.w, b, tmp;
          while (j++ < M) {
            var c = s[i++];
            if (i > l) {
              ctx.end = true;
              break;
            }
            if (w) {
              i = s.indexOf('"', i - 1);
              c = s[i];
              tmp = 0;
              while ("\\" == s[i - ++tmp]) {
              }
              ;
              tmp = !(tmp % 2);
              b = b || tmp;
              if ('"' == c && !tmp) {
                w = u;
                tmp = ctx.s;
                if (ctx.a) {
                  tmp = s.slice(ctx.sl, i);
                  if (b || 1 + tmp.indexOf("\\")) {
                    tmp = JSON.parse('"' + tmp + '"');
                  }
                  if (ctx.at instanceof Array) {
                    ctx.at.push(ctx.s = tmp);
                  } else {
                    if (!ctx.at) {
                      ctx.end = j = M;
                      tmp = u;
                    }
                    (ctx.at || {})[ctx.s] = ctx.s = tmp;
                  }
                  ctx.s = u;
                } else {
                  ctx.s = s.slice(ctx.sl, i);
                  if (b || 1 + ctx.s.indexOf("\\")) {
                    ctx.s = JSON.parse('"' + ctx.s + '"');
                  }
                }
                ctx.a = b = u;
              }
              ++i;
            } else {
              switch (c) {
                case '"':
                  ctx.sl = i;
                  w = true;
                  break;
                case ":":
                  ctx.ai = i;
                  ctx.a = true;
                  break;
                case ",":
                  if (ctx.a || ctx.at instanceof Array) {
                    if (tmp = s.slice(ctx.ai, i - 1)) {
                      if (u !== (tmp = value(tmp))) {
                        if (ctx.at instanceof Array) {
                          ctx.at.push(tmp);
                        } else {
                          ctx.at[ctx.s] = tmp;
                        }
                      }
                    }
                  }
                  ctx.a = u;
                  if (ctx.at instanceof Array) {
                    ctx.a = true;
                    ctx.ai = i;
                  }
                  break;
                case "{":
                  ctx.up.push(ctx.at || (ctx.at = {}));
                  if (ctx.at instanceof Array) {
                    ctx.at.push(ctx.at = {});
                  } else if (u !== (tmp = ctx.s)) {
                    ctx.at[tmp] = ctx.at = {};
                  }
                  ctx.a = u;
                  break;
                case "}":
                  if (ctx.a) {
                    if (tmp = s.slice(ctx.ai, i - 1)) {
                      if (u !== (tmp = value(tmp))) {
                        if (ctx.at instanceof Array) {
                          ctx.at.push(tmp);
                        } else {
                          if (!ctx.at) {
                            ctx.end = j = M;
                            tmp = u;
                          }
                          (ctx.at || {})[ctx.s] = tmp;
                        }
                      }
                    }
                  }
                  ctx.a = u;
                  ctx.at = ctx.up.pop();
                  break;
                case "[":
                  if (u !== (tmp = ctx.s)) {
                    ctx.up.push(ctx.at);
                    ctx.at[tmp] = ctx.at = [];
                  } else if (!ctx.at) {
                    ctx.up.push(ctx.at = []);
                  }
                  ctx.a = true;
                  ctx.ai = i;
                  break;
                case "]":
                  if (ctx.a) {
                    if (tmp = s.slice(ctx.ai, i - 1)) {
                      if (u !== (tmp = value(tmp))) {
                        if (ctx.at instanceof Array) {
                          ctx.at.push(tmp);
                        } else {
                          ctx.at[ctx.s] = tmp;
                        }
                      }
                    }
                  }
                  ctx.a = u;
                  ctx.at = ctx.up.pop();
                  break;
              }
            }
          }
          ctx.s = u;
          ctx.i = i;
          ctx.w = w;
          if (ctx.end) {
            tmp = ctx.at;
            if (u === tmp) {
              try {
                tmp = JSON.parse(text);
              } catch (e) {
                return ctx.done(e);
              }
            }
            ctx.done(u, tmp);
          } else {
            sI(parse);
          }
        }
      };
      function value(s) {
        var n = parseFloat(s);
        if (!isNaN(n)) {
          return n;
        }
        s = s.trim();
        if ("true" == s) {
          return true;
        }
        if ("false" == s) {
          return false;
        }
        if ("null" == s) {
          return null;
        }
      }
      yson.stringifyAsync = function(data, done, replacer, space, ctx) {
        ctx = ctx || {};
        ctx.text = ctx.text || "";
        ctx.up = [ctx.at = { d: data }];
        ctx.done = done;
        ctx.i = 0;
        var j = 0;
        ify();
        function ify() {
          var at = ctx.at, data2 = at.d, add = "", tmp;
          if (at.i && at.i - at.j > 0) {
            add += ",";
          }
          if (u !== (tmp = at.k)) {
            add += JSON.stringify(tmp) + ":";
          }
          switch (typeof data2) {
            case "boolean":
              add += "" + data2;
              break;
            case "string":
              add += JSON.stringify(data2);
              break;
            case "number":
              add += isNaN(data2) ? "null" : data2;
              break;
            case "object":
              if (!data2) {
                add += "null";
                break;
              }
              if (data2 instanceof Array) {
                add += "[";
                at = { i: -1, as: data2, up: at, j: 0 };
                at.l = data2.length;
                ctx.up.push(ctx.at = at);
                break;
              }
              if ("function" != typeof (data2 || "").toJSON) {
                add += "{";
                at = { i: -1, ok: Object.keys(data2).sort(), as: data2, up: at, j: 0 };
                at.l = at.ok.length;
                ctx.up.push(ctx.at = at);
                break;
              }
              if (tmp = data2.toJSON()) {
                add += tmp;
                break;
              }
            case "function":
              if (at.as instanceof Array) {
                add += "null";
                break;
              }
            default:
              add = "";
              at.j++;
          }
          ctx.text += add;
          while (1 + at.i >= at.l) {
            ctx.text += at.ok ? "}" : "]";
            at = ctx.at = at.up;
          }
          if (++at.i < at.l) {
            if (tmp = at.ok) {
              at.d = at.as[at.k = tmp[at.i]];
            } else {
              at.d = at.as[at.i];
            }
            if (++j < 9) {
              return ify();
            } else {
              j = 0;
            }
            sI(ify);
            return;
          }
          ctx.done(u, ctx.text);
        }
      };
      if (typeof window != "" + u) {
        window.YSON = yson;
      }
      try {
        if (typeof module != "" + u) {
          module.exports = yson;
        }
      } catch (e) {
      }
      if (typeof JSON != "" + u) {
        JSON.parseAsync = yson.parseAsync;
        JSON.stringifyAsync = yson.stringifyAsync;
      }
    })();
  }
});

// node_modules/gun/lib/radmigtmp.js
var require_radmigtmp = __commonJS({
  "node_modules/gun/lib/radmigtmp.js"(exports, module) {
    module.exports = function(r) {
      var Radix = require_radix();
      r.find("a", function() {
        var l = [];
        Radix.map(r.list, function(v2, f2) {
          if (!(f2.indexOf("%1B") + 1)) {
            return;
          }
          if (!v2) {
            return;
          }
          l.push([f2, v2]);
        });
        if (l.length) {
          console.log("\n! ! ! WARNING ! ! !\nRAD v0.2020.x has detected OLD v0.2019.x data & automatically migrating. Automatic migration will be turned OFF in future versions! If you are just developing/testing, we recommend you reset your data. Please contact us if you have any concerns.\nThis message should only log once.");
        }
        var f, v;
        l.forEach(function(a) {
          f = a[0];
          v = a[1];
          r.list(decodeURIComponent(f), v);
          r.list(f, 0);
        });
        if (!f) {
          return;
        }
        r.find.bad(f);
      });
    };
  }
});

// node_modules/gun/lib/radisk.js
var require_radisk = __commonJS({
  "node_modules/gun/lib/radisk.js"(exports, module) {
    (function() {
      function Radisk(opt) {
        opt = opt || {};
        opt.log = opt.log || console.log;
        opt.file = String(opt.file || "radata");
        var has = (Radisk.has || (Radisk.has = {}))[opt.file];
        if (has) {
          return has;
        }
        opt.max = opt.max || (opt.memory ? opt.memory * 999 * 999 : 3e8) * 0.3;
        opt.until = opt.until || opt.wait || 250;
        opt.batch = opt.batch || 10 * 1e3;
        opt.chunk = opt.chunk || 1024 * 1024 * 1;
        opt.code = opt.code || {};
        opt.code.from = opt.code.from || "!";
        opt.jsonify = true;
        function ename(t) {
          return encodeURIComponent(t).replace(/\*/g, "%2A");
        }
        function atomic(v) {
          return u !== v && (!v || "object" != typeof v);
        }
        var timediate = "" + u === typeof setImmediate ? setTimeout : setImmediate;
        var puff = setTimeout.turn || timediate, u;
        var map = Radix.object;
        var ST = 0;
        if (!opt.store) {
          return opt.log("ERROR: Radisk needs `opt.store` interface with `{get: fn, put: fn (, list: fn)}`!");
        }
        if (!opt.store.put) {
          return opt.log("ERROR: Radisk needs `store.put` interface with `(file, data, cb)`!");
        }
        if (!opt.store.get) {
          return opt.log("ERROR: Radisk needs `store.get` interface with `(file, cb)`!");
        }
        if (!opt.store.list) {
        }
        if ("" + u != typeof __require) {
          require_yson();
        }
        var parse = JSON.parseAsync || function(t, cb, r2) {
          var u2;
          try {
            cb(u2, JSON.parse(t, r2));
          } catch (e) {
            cb(e);
          }
        };
        var json = JSON.stringifyAsync || function(v, cb, r2, s) {
          var u2;
          try {
            cb(u2, JSON.stringify(v, r2, s));
          } catch (e) {
            cb(e);
          }
        };
        var r = function(key, data, cb, tag, DBG) {
          if ("function" === typeof data) {
            var o = cb || {};
            cb = data;
            r.read(key, cb, o, DBG || tag);
            return;
          }
          r.save(key, data, cb, tag, DBG);
        };
        r.save = function(key, data, cb, tag, DBG) {
          var s = { key }, tags, f, d, q;
          s.find = function(file) {
            var tmp;
            s.file = file || (file = opt.code.from);
            DBG && (DBG = DBG[file] = DBG[file] || {});
            DBG && (DBG.sf = DBG.sf || +new Date());
            if (tmp = r.disk[file]) {
              s.mix(u, tmp);
              return;
            }
            r.parse(file, s.mix, u, DBG);
          };
          s.mix = function(err, disk) {
            DBG && (DBG.sml = +new Date());
            DBG && (DBG.sm = DBG.sm || +new Date());
            if (s.err = err || s.err) {
              cb(err);
              return;
            }
            var file = s.file = (disk || "").file || s.file, tmp;
            if (!disk && file !== opt.code.from) {
              r.find.bad(file);
              r.save(key, data, cb, tag);
              return;
            }
            (disk = r.disk[file] || (r.disk[file] = disk || Radix())).file || (disk.file = file);
            if (opt.compare) {
              data = opt.compare(disk(key), data, key, file);
              if (u === data) {
                cb(err, -1);
                return;
              }
            }
            (s.disk = disk)(key, data);
            if (tag) {
              (tmp = (tmp = disk.tags || (disk.tags = {}))[tag] || (tmp[tag] = r.tags[tag] || (r.tags[tag] = {})))[file] || (tmp[file] = r.one[tag] || (r.one[tag] = cb));
              cb = null;
            }
            DBG && (DBG.st = DBG.st || +new Date());
            if (disk.Q) {
              cb && disk.Q.push(cb);
              return;
            }
            disk.Q = cb ? [cb] : [];
            disk.to = setTimeout(s.write, opt.until);
          };
          s.write = function() {
            DBG && (DBG.sto = DBG.sto || +new Date());
            var file = f = s.file, disk = d = s.disk;
            q = s.q = disk.Q;
            tags = s.tags = disk.tags;
            delete disk.Q;
            delete r.disk[file];
            delete disk.tags;
            r.write(file, disk, s.ack, u, DBG);
          };
          s.ack = function(err, ok) {
            DBG && (DBG.sa = DBG.sa || +new Date());
            DBG && (DBG.sal = q.length);
            var ack, tmp;
            for (var id in r.tags) {
              if (!r.tags.hasOwnProperty(id)) {
                continue;
              }
              var tag2 = r.tags[id];
              if ((tmp = r.disk[f]) && (tmp = tmp.tags) && tmp[tag2]) {
                continue;
              }
              ack = tag2[f];
              delete tag2[f];
              var ne;
              for (var k in tag2) {
                if (tag2.hasOwnProperty(k)) {
                  ne = true;
                  break;
                }
              }
              if (ne) {
                continue;
              }
              delete r.tags[tag2];
              ack && ack(err, ok);
            }
            !q && (q = "");
            var l = q.length, i = 0;
            var S = +new Date();
            for (; i < l; i++) {
              (ack = q[i]) && ack(err, ok);
            }
            console.STAT && console.STAT(S, +new Date() - S, "rad acks", ename(s.file));
            console.STAT && console.STAT(S, q.length, "rad acks #", ename(s.file));
          };
          cb || (cb = function(err, ok) {
            if (!err) {
              return;
            }
          });
          r.find(key, s.find);
        };
        r.disk = {};
        r.one = {};
        r.tags = {};
        var RWC = 0;
        r.write = function(file, rad, cb, o, DBG) {
          if (!rad) {
            cb("No radix!");
            return;
          }
          o = "object" == typeof o ? o : { force: o };
          var f = function Fractal() {
          }, a, b;
          f.text = "";
          f.file = file = rad.file || (rad.file = file);
          if (!file) {
            cb("What file?");
            return;
          }
          f.write = function() {
            var text = rad.raw = f.text;
            r.disk[file = rad.file || f.file || file] = rad;
            var S = +new Date();
            DBG && (DBG.wd = S);
            r.find.add(file, function add(err) {
              DBG && (DBG.wa = +new Date());
              if (err) {
                cb(err);
                return;
              }
              opt.store.put(ename(file), text, function safe(err2, ok) {
                DBG && (DBG.wp = +new Date());
                console.STAT && console.STAT(S, ST = +new Date() - S, "wrote disk", JSON.stringify(file), ++RWC, "total all writes.");
                cb(err2, ok || 1);
                if (!rad.Q) {
                  delete r.disk[file];
                }
              });
            });
          };
          f.split = function() {
            var S = +new Date();
            DBG && (DBG.wf = S);
            f.text = "";
            if (!f.count) {
              f.count = 0;
              Radix.map(rad, function count() {
                f.count++;
              });
            }
            DBG && (DBG.wfc = f.count);
            f.limit = Math.ceil(f.count / 2);
            var SC = f.count;
            f.count = 0;
            DBG && (DBG.wf1 = +new Date());
            f.sub = Radix();
            Radix.map(rad, f.slice, { reverse: 1 });
            DBG && (DBG.wf2 = +new Date());
            r.write(f.end, f.sub, f.both, o);
            DBG && (DBG.wf3 = +new Date());
            f.hub = Radix();
            Radix.map(rad, f.stop);
            DBG && (DBG.wf4 = +new Date());
            r.write(rad.file, f.hub, f.both, o);
            DBG && (DBG.wf5 = +new Date());
            console.STAT && console.STAT(S, +new Date() - S, "rad split", ename(rad.file), SC);
            return true;
          };
          f.slice = function(val, key) {
            f.sub(f.end = key, val);
            if (f.limit <= ++f.count) {
              return true;
            }
          };
          f.stop = function(val, key) {
            if (key >= f.end) {
              return true;
            }
            f.hub(key, val);
          };
          f.both = function(err, ok) {
            DBG && (DBG.wfd = +new Date());
            if (b) {
              cb(err || b);
              return;
            }
            if (a) {
              cb(err, ok);
              return;
            }
            a = true;
            b = err;
          };
          f.each = function(val, key, k, pre) {
            if (u !== val) {
              f.count++;
            }
            if (opt.max <= (val || "").length) {
              return cb("Data too big!"), true;
            }
            var enc = Radisk.encode(pre.length) + "#" + Radisk.encode(k) + (u === val ? "" : ":" + Radisk.encode(val)) + "\n";
            if (opt.chunk < f.text.length + enc.length && 1 < f.count && !o.force) {
              return f.split();
            }
            f.text += enc;
          };
          if (opt.jsonify) {
            r.write.jsonify(f, rad, cb, o, DBG);
            return;
          }
          if (!Radix.map(rad, f.each, true)) {
            f.write();
          }
        };
        r.write.jsonify = function(f, rad, cb, o, DBG) {
          var raw;
          var S = +new Date();
          DBG && (DBG.w = S);
          try {
            raw = JSON.stringify(rad.$);
          } catch (e) {
            cb("Cannot radisk!");
            return;
          }
          DBG && (DBG.ws = +new Date());
          console.STAT && console.STAT(S, +new Date() - S, "rad stringified JSON");
          if (opt.chunk < raw.length && !o.force) {
            var c = 0;
            Radix.map(rad, function() {
              if (c++) {
                return true;
              }
            });
            if (c > 1) {
              return f.split();
            }
          }
          f.text = raw;
          f.write();
        };
        r.range = function(tree, o) {
          if (!tree || !o) {
            return;
          }
          if (u === o.start && u === o.end) {
            return tree;
          }
          if (atomic(tree)) {
            return tree;
          }
          var sub = Radix();
          Radix.map(tree, function(v, k) {
            sub(k, v);
          }, o);
          return sub("");
        };
        (function() {
          r.read = function(key, cb, o, DBG) {
            o = o || {};
            var g = { key };
            g.find = function(file) {
              var tmp;
              g.file = file || (file = opt.code.from);
              DBG && (DBG = DBG[file] = DBG[file] || {});
              DBG && (DBG.rf = DBG.rf || +new Date());
              if (tmp = r.disk[g.file = file]) {
                g.check(u, tmp);
                return;
              }
              r.parse(file, g.check, u, DBG);
            };
            g.get = function(err, disk, info) {
              DBG && (DBG.rgl = +new Date());
              DBG && (DBG.rg = DBG.rg || +new Date());
              if (g.err = err || g.err) {
                cb(err);
                return;
              }
              var file = g.file = (disk || "").file || g.file;
              if (!disk && file !== opt.code.from) {
                r.find.bad(file);
                r.read(key, cb, o);
                return;
              }
              disk = r.disk[file] || (r.disk[file] = disk);
              if (!disk) {
                cb(file === opt.code.from ? u : "No file!");
                return;
              }
              disk.file || (disk.file = file);
              var data = r.range(disk(key), o);
              DBG && (DBG.rr = +new Date());
              o.unit = disk.unit;
              o.chunks = (o.chunks || 0) + 1;
              o.parsed = (o.parsed || 0) + ((info || "").parsed || o.chunks * opt.chunk);
              o.more = 1;
              o.next = u;
              Radix.map(r.list, function next2(v, f) {
                if (!v || file === f) {
                  return;
                }
                o.next = f;
                return 1;
              }, o.reverse ? { reverse: 1, end: file } : { start: file });
              DBG && (DBG.rl = +new Date());
              if (!o.next) {
                o.more = 0;
              }
              if (o.next) {
                if (!o.reverse && (key < o.next && 0 != o.next.indexOf(key) || u !== o.end && (o.end || "???") < o.next)) {
                  o.more = 0;
                }
                if (o.reverse && (key > o.next && 0 != key.indexOf(o.next) || u !== o.start && (o.start || "") > o.next && file <= o.start)) {
                  o.more = 0;
                }
              }
              if (!o.more) {
                cb(g.err, data, o);
                return;
              }
              if (data) {
                cb(g.err, data, o);
              }
              if (o.parsed >= o.limit) {
                return;
              }
              var S = +new Date();
              DBG && (DBG.rm = S);
              var next = o.next;
              timediate(function() {
                console.STAT && console.STAT(S, +new Date() - S, "rad more");
                r.parse(next, g.check);
              }, 0);
            };
            g.check = function(err, disk, info) {
              g.get(err, disk, info);
              if (!disk || disk.check) {
                return;
              }
              disk.check = 1;
              var S = +new Date();
              (info || (info = {})).file || (info.file = g.file);
              Radix.map(disk, function(val, key2) {
                r.find(key2, function(file) {
                  if ((file || (file = opt.code.from)) === info.file) {
                    return;
                  }
                  var id = ("" + Math.random()).slice(-3);
                  puff(function() {
                    r.save(key2, val, function ack(err2, ok) {
                      if (err2) {
                        r.save(key2, val, ack);
                        return;
                      }
                      console.STAT && console.STAT("MISLOCATED DATA CORRECTED", id, ename(key2), ename(info.file), ename(file));
                    });
                  }, 0);
                });
              });
              console.STAT && console.STAT(S, +new Date() - S, "rad check");
            };
            r.find(key || (o.reverse ? o.end || "" : o.start || ""), g.find);
          };
          function rev(a, b) {
            return b;
          }
          var revo = { reverse: true };
        })();
        ;
        (function() {
          var RPC = 0;
          var Q = {}, s = String.fromCharCode(31);
          r.parse = function(file, cb, raw, DBG) {
            var q;
            if (!file) {
              return cb();
            }
            if (q = Q[file]) {
              q.push(cb);
              return;
            }
            q = Q[file] = [cb];
            var p = function Parse() {
            }, info = { file };
            (p.disk = Radix()).file = file;
            p.read = function(err, data) {
              var tmp;
              DBG && (DBG.rpg = +new Date());
              console.STAT && console.STAT(S, +new Date() - S, "read disk", JSON.stringify(file), ++RPC, "total all parses.");
              if ((p.err = err) || (p.not = !data)) {
                delete Q[file];
                p.map(q, p.ack);
                return;
              }
              if ("string" !== typeof data) {
                try {
                  if (opt.max <= data.length) {
                    p.err = "Chunk too big!";
                  } else {
                    data = data.toString();
                  }
                } catch (e) {
                  p.err = e;
                }
                if (p.err) {
                  delete Q[file];
                  p.map(q, p.ack);
                  return;
                }
              }
              info.parsed = data.length;
              DBG && (DBG.rpl = info.parsed);
              DBG && (DBG.rpa = q.length);
              S = +new Date();
              if (!(opt.jsonify || "{" === data[0])) {
                p.radec(err, data);
                return;
              }
              parse(data, function(err2, tree) {
                if (!err2) {
                  delete Q[file];
                  p.disk.$ = tree;
                  console.STAT && (ST = +new Date() - S) > 9 && console.STAT(S, ST, "rad parsed JSON");
                  DBG && (DBG.rpd = +new Date());
                  p.map(q, p.ack);
                  return;
                }
                if ("{" === data[0]) {
                  delete Q[file];
                  p.err = tmp || "JSON error!";
                  p.map(q, p.ack);
                  return;
                }
                p.radec(err2, data);
              });
            };
            p.map = function() {
              if (!q || !q.length) {
                return;
              }
              var S2 = +new Date();
              var err = p.err, data = p.not ? u : p.disk;
              var i = 0, ack;
              while (i < 9 && (ack = q[i++])) {
                ack(err, data, info);
              }
              console.STAT && console.STAT(S2, +new Date() - S2, "rad packs", ename(file));
              console.STAT && console.STAT(S2, i, "rad packs #", ename(file));
              if (!(q = q.slice(i)).length) {
                return;
              }
              puff(p.map, 0);
            };
            p.ack = function(cb2) {
              if (!cb2) {
                return;
              }
              if (p.err || p.not) {
                cb2(p.err, u, info);
                return;
              }
              cb2(u, p.disk, info);
            };
            p.radec = function(err, data) {
              delete Q[file];
              S = +new Date();
              var tmp = p.split(data), pre = [], i, k, v;
              if (!tmp || 0 !== tmp[1]) {
                p.err = "File '" + file + "' does not have root radix! ";
                p.map(q, p.ack);
                return;
              }
              while (tmp) {
                k = v = u;
                i = tmp[1];
                tmp = p.split(tmp[2]) || "";
                if ("#" == tmp[0]) {
                  k = tmp[1];
                  pre = pre.slice(0, i);
                  if (i <= pre.length) {
                    pre.push(k);
                  }
                }
                tmp = p.split(tmp[2]) || "";
                if ("\n" == tmp[0]) {
                  continue;
                }
                if ("=" == tmp[0] || ":" == tmp[0]) {
                  v = tmp[1];
                }
                if (u !== k && u !== v) {
                  p.disk(pre.join(""), v);
                }
                tmp = p.split(tmp[2]);
              }
              console.STAT && console.STAT(S, +new Date() - S, "parsed RAD");
              p.map(q, p.ack);
            };
            p.split = function(t) {
              if (!t) {
                return;
              }
              var l = [], o = {}, i = -1, a = "", b, c;
              i = t.indexOf(s);
              if (!t[i]) {
                return;
              }
              a = t.slice(0, i);
              l[0] = a;
              l[1] = b = Radisk.decode(t.slice(i), o);
              l[2] = t.slice(i + o.i);
              return l;
            };
            if (r.disk) {
              raw || (raw = (r.disk[file] || "").raw);
            }
            var S = +new Date(), SM, SL;
            DBG && (DBG.rp = S);
            if (raw) {
              return puff(function() {
                p.read(u, raw);
              }, 0);
            }
            opt.store.get(ename(file), p.read);
          };
        })();
        ;
        (function() {
          var dir, f = String.fromCharCode(28), Q;
          r.find = function(key, cb) {
            if (!dir) {
              if (Q) {
                Q.push([key, cb]);
                return;
              }
              Q = [[key, cb]];
              r.parse(f, init);
              return;
            }
            Radix.map(r.list = dir, function(val, key2) {
              if (!val) {
                return;
              }
              return cb(key2) || true;
            }, { reverse: 1, end: key }) || cb(opt.code.from);
          };
          r.find.add = function(file, cb) {
            var has2 = dir(file);
            if (has2 || file === f) {
              cb(u, 1);
              return;
            }
            dir(file, 1);
            cb.found = (cb.found || 0) + 1;
            r.write(f, dir, function(err, ok) {
              if (err) {
                cb(err);
                return;
              }
              cb.found = (cb.found || 0) - 1;
              if (0 !== cb.found) {
                return;
              }
              cb(u, 1);
            }, true);
          };
          r.find.bad = function(file, cb) {
            dir(file, 0);
            r.write(f, dir, cb || noop);
          };
          function init(err, disk) {
            if (err) {
              opt.log("list", err);
              setTimeout(function() {
                r.parse(f, init);
              }, 1e3);
              return;
            }
            if (disk) {
              drain(disk);
              return;
            }
            dir = dir || disk || Radix();
            if (!opt.store.list) {
              drain(dir);
              return;
            }
            opt.store.list(function(file) {
              if (!file) {
                drain(dir);
                return;
              }
              r.find.add(file, noop);
            });
          }
          function drain(rad, tmp) {
            dir = dir || rad;
            dir.file = f;
            tmp = Q;
            Q = null;
            map(tmp, function(arg) {
              r.find(arg[0], arg[1]);
            });
          }
        })();
        try {
          !Gun.window && require_radmigtmp()(r);
        } catch (e) {
        }
        var noop = function() {
        }, RAD, u;
        Radisk.has[opt.file] = r;
        return r;
      }
      ;
      (function() {
        var _ = String.fromCharCode(31), u;
        Radisk.encode = function(d, o, s) {
          s = s || _;
          var t = s, tmp;
          if (typeof d == "string") {
            var i = d.indexOf(s);
            while (i != -1) {
              t += s;
              i = d.indexOf(s, i + 1);
            }
            return t + '"' + d + s;
          } else if (d && d["#"] && 1 == Object.keys(d).length) {
            return t + "#" + tmp + t;
          } else if ("number" == typeof d) {
            return t + "+" + (d || 0) + t;
          } else if (null === d) {
            return t + " " + t;
          } else if (true === d) {
            return t + "+" + t;
          } else if (false === d) {
            return t + "-" + t;
          }
        };
        Radisk.decode = function(t, o, s) {
          s = s || _;
          var d = "", i = -1, n = 0, c, p;
          if (s !== t[0]) {
            return;
          }
          while (s === t[++i]) {
            ++n;
          }
          p = t[c = n] || true;
          while (--n >= 0) {
            i = t.indexOf(s, i + 1);
          }
          if (i == -1) {
            i = t.length;
          }
          d = t.slice(c + 1, i);
          if (o) {
            o.i = i + 1;
          }
          if ('"' === p) {
            return d;
          } else if ("#" === p) {
            return { "#": d };
          } else if ("+" === p) {
            if (0 === d.length) {
              return true;
            }
            return parseFloat(d);
          } else if (" " === p) {
            return null;
          } else if ("-" === p) {
            return false;
          }
        };
      })();
      if (typeof window !== "undefined") {
        var Gun = window.Gun;
        var Radix = window.Radix;
        window.Radisk = Radisk;
      } else {
        var Gun = require_gun();
        var Radix = require_radix();
        try {
          module.exports = Radisk;
        } catch (e) {
        }
      }
      Radisk.Radix = Radix;
    })();
  }
});

export {
  require_radisk
};
//# sourceMappingURL=chunk-FNY6V7FO.js.map
