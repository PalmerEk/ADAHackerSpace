import {
  require_gun
} from "./chunk-DC2GYHRT.js";
import "./chunk-TFWDKVI3.js";

// node_modules/gun/lib/then.js
var Gun = typeof window !== "undefined" ? window.Gun : require_gun();
Gun.chain.promise = function(cb) {
  var gun = this, cb = cb || function(ctx) {
    return ctx;
  };
  return new Promise(function(res, rej) {
    gun.once(function(data, key) {
      res({ put: data, get: key, gun: this });
    });
  }).then(cb);
};
Gun.chain.then = function(cb) {
  var gun = this;
  var p = new Promise((res, rej) => {
    gun.once(function(data, key) {
      res(data, key);
    });
  });
  return cb ? p.then(cb) : p;
};
//# sourceMappingURL=gun_lib_then.js.map
