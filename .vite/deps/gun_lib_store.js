import {
  require_radisk
} from "./chunk-FNY6V7FO.js";
import {
  require_gun
} from "./chunk-DC2GYHRT.js";
import "./chunk-CDMFTHRR.js";
import "./chunk-TFWDKVI3.js";

// node_modules/gun/lib/store.js
var Gun = typeof window !== "undefined" ? window.Gun : require_gun();
Gun.on("create", function(root) {
  if (Gun.TESTING) {
    root.opt.file = "radatatest";
  }
  this.to.next(root);
  var opt = root.opt, empty = {}, u;
  if (false === opt.rad || false === opt.radisk) {
    return;
  }
  if (u + "" != typeof process && "false" === "" + (process.env || "").RAD) {
    return;
  }
  var Radisk = Gun.window && Gun.window.Radisk || require_radisk();
  var Radix = Radisk.Radix;
  var dare = Radisk(opt), esc = String.fromCharCode(27);
  var ST = 0;
  root.on("put", function(msg) {
    this.to.next(msg);
    if ((msg._ || "").rad) {
      return;
    }
    var id = msg["#"], put = msg.put, soul = put["#"], key = put["."], val = put[":"], state = put[">"], tmp;
    var DBG = (msg._ || "").DBG;
    DBG && (DBG.sp = DBG.sp || +new Date());
    var S = (msg._ || "").RPS || ((msg._ || "").RPS = +new Date());
    dare(soul + esc + key, { ":": val, ">": state }, function(err, ok) {
      DBG && (DBG.spd = DBG.spd || +new Date());
      console.STAT && console.STAT(S, +new Date() - S, "put");
      if (err) {
        root.on("in", { "@": id, err, DBG });
        return;
      }
      root.on("in", { "@": id, ok, DBG });
    }, false, DBG && (DBG.r = DBG.r || {}));
    DBG && (DBG.sps = DBG.sps || +new Date());
  });
  var count = {}, obj_empty = Object.empty;
  root.on("get", function(msg) {
    this.to.next(msg);
    var ctx = msg._ || "", DBG = ctx.DBG = msg.DBG;
    DBG && (DBG.sg = +new Date());
    var id = msg["#"], get = msg.get, soul = msg.get["#"], has = msg.get["."] || "", o = {}, graph, lex, key, tmp, force;
    if ("string" == typeof soul) {
      key = soul;
    } else if (soul) {
      if (u !== (tmp = soul["*"])) {
        o.limit = force = 1;
      }
      if (u !== soul[">"]) {
        o.start = soul[">"];
      }
      if (u !== soul["<"]) {
        o.end = soul["<"];
      }
      key = force ? "" + tmp : tmp || soul["="];
      force = null;
    }
    if (key && !o.limit) {
      if ("string" == typeof has) {
        key = key + esc + (o.atom = has);
      } else if (has) {
        if (u !== has[">"]) {
          o.start = has[">"];
          o.limit = 1;
        }
        if (u !== has["<"]) {
          o.end = has["<"];
          o.limit = 1;
        }
        if (u !== (tmp = has["*"])) {
          o.limit = force = 1;
        }
        if (key) {
          key = key + esc + (force ? "" + (tmp || "") : tmp || (o.atom = has["="] || ""));
        }
      }
    }
    if ((tmp = get["%"]) || o.limit) {
      o.limit = tmp <= (o.pack || 1e3 * 100) ? tmp : 1;
    }
    if (has["-"] || (soul || {})["-"] || get["-"]) {
      o.reverse = true;
    }
    if ((tmp = (root.next || "")[soul]) && tmp.put) {
      if (o.atom) {
        tmp = (tmp.next || "")[o.atom];
        if (tmp && tmp.rad) {
          return;
        }
      } else if (tmp && tmp.rad) {
        return;
      }
    }
    var now = Gun.state();
    var S = +new Date(), C = 0, SPT = 0;
    DBG && (DBG.sgm = S);
    dare(key || "", function(err, data, info) {
      DBG && (DBG.sgr = +new Date());
      DBG && (DBG.sgi = info);
      try {
        opt.store.stats.get.time[statg % 50] = +new Date() - S;
        ++statg;
        opt.store.stats.get.count++;
        if (err) {
          opt.store.stats.get.err = err;
        }
      } catch (e) {
      }
      console.STAT && console.STAT(S, +new Date() - S, "got", JSON.stringify(key));
      S = +new Date();
      info = info || "";
      var va, ve;
      if (info.unit && data && u !== (va = data[":"]) && u !== (ve = data[">"])) {
        var tmp2 = key.split(esc), so = tmp2[0], ha = tmp2[1];
        (graph = graph || {})[so] = Gun.state.ify(graph[so], ha, ve, va, so);
        root.$.get(so).get(ha)._.rad = now;
      } else if (data) {
        if (typeof data !== "string") {
          if (o.atom) {
            data = u;
          } else {
            Radix.map(data, each, o);
          }
        }
        if (!graph && data) {
          each(data, "");
        }
        if (!o.atom && !has & "string" == typeof soul && !o.limit && !o.more) {
          root.$.get(soul)._.rad = now;
        }
      }
      DBG && (DBG.sgp = +new Date());
      if (console.STAT && (ST = +new Date() - S) > 9) {
        console.STAT(S, ST, "got prep time");
        console.STAT(S, C, "got prep #");
      }
      SPT += ST;
      C = 0;
      S = +new Date();
      var faith = function() {
      };
      faith.faith = true;
      faith.rad = get;
      root.on("in", { "@": id, put: graph, "%": info.more ? 1 : u, err: err ? err : u, _: faith, DBG });
      console.STAT && (ST = +new Date() - S) > 9 && console.STAT(S, ST, "got emit", Object.keys(graph || {}).length);
      graph = u;
    }, o, DBG && (DBG.r = DBG.r || {}));
    DBG && (DBG.sgd = +new Date());
    console.STAT && (ST = +new Date() - S) > 9 && console.STAT(S, ST, "get call");
    function each(val, has2, a, b) {
      C++;
      if (!val) {
        return;
      }
      has2 = (key + has2).split(esc);
      var soul2 = has2.slice(0, 1)[0];
      has2 = has2.slice(-1)[0];
      if (o.limit && o.limit <= o.count) {
        return true;
      }
      var va, ve, so = soul2, ha = has2;
      if ("string" != typeof val) {
        va = val[":"];
        ve = val[">"];
        (graph = graph || {})[so] = Gun.state.ify(graph[so], ha, ve, va, so);
        o.count = (o.count || 0) + ((va || "").length || 9);
        return;
      }
      o.count = (o.count || 0) + val.length;
      var tmp2 = val.lastIndexOf(">");
      var state = Radisk.decode(val.slice(tmp2 + 1), null, esc);
      val = Radisk.decode(val.slice(0, tmp2), null, esc);
      (graph = graph || {})[soul2] = Gun.state.ify(graph[soul2], has2, state, val, soul2);
    }
  });
  var val_is = Gun.valid;
  (opt.store || {}).stats = { get: { time: {}, count: 0 }, put: { time: {}, count: 0 } };
  var statg = 0, statp = 0;
});
//# sourceMappingURL=gun_lib_store.js.map
