import {
  require_gun
} from "./chunk-DC2GYHRT.js";
import {
  __commonJS
} from "./chunk-TFWDKVI3.js";

// node_modules/gun/lib/rindexed.js
var require_rindexed = __commonJS({
  "node_modules/gun/lib/rindexed.js"(exports, module) {
    (function() {
      function Store(opt) {
        opt = opt || {};
        opt.file = String(opt.file || "radata");
        var store = Store[opt.file], db = null, u;
        if (store) {
          console.log("Warning: reusing same IndexedDB store and options as 1st.");
          return Store[opt.file];
        }
        store = Store[opt.file] = function() {
        };
        try {
          opt.indexedDB = opt.indexedDB || Store.indexedDB || indexedDB;
        } catch (e) {
        }
        try {
          if (!opt.indexedDB || "file:" == location.protocol) {
            var s = store.d || (store.d = {});
            store.put = function(f, d, cb) {
              s[f] = d;
              setTimeout(function() {
                cb(null, 1);
              }, 250);
            };
            store.get = function(f, cb) {
              setTimeout(function() {
                cb(null, s[f] || u);
              }, 5);
            };
            console.log("Warning: No indexedDB exists to persist data to!");
            return store;
          }
        } catch (e) {
        }
        store.start = function() {
          var o = indexedDB.open(opt.file, 1);
          o.onupgradeneeded = function(eve) {
            eve.target.result.createObjectStore(opt.file);
          };
          o.onsuccess = function() {
            db = o.result;
          };
          o.onerror = function(eve) {
            console.log(eve || 1);
          };
        };
        store.start();
        store.put = function(key, data, cb) {
          if (!db) {
            setTimeout(function() {
              store.put(key, data, cb);
            }, 1);
            return;
          }
          var tx = db.transaction([opt.file], "readwrite");
          var obj = tx.objectStore(opt.file);
          var req = obj.put(data, "" + key);
          req.onsuccess = obj.onsuccess = tx.onsuccess = function() {
            cb(null, 1);
          };
          req.onabort = obj.onabort = tx.onabort = function(eve) {
            cb(eve || "put.tx.abort");
          };
          req.onerror = obj.onerror = tx.onerror = function(eve) {
            cb(eve || "put.tx.error");
          };
        };
        store.get = function(key, cb) {
          if (!db) {
            setTimeout(function() {
              store.get(key, cb);
            }, 9);
            return;
          }
          var tx = db.transaction([opt.file], "readonly");
          var obj = tx.objectStore(opt.file);
          var req = obj.get("" + key);
          req.onsuccess = function() {
            cb(null, req.result);
          };
          req.onabort = function(eve) {
            cb(eve || 4);
          };
          req.onerror = function(eve) {
            cb(eve || 5);
          };
        };
        setInterval(function() {
          db && db.close();
          db = null;
          store.start();
        }, 1e3 * 15);
        return store;
      }
      if (typeof window !== "undefined") {
        (Store.window = window).RindexedDB = Store;
        Store.indexedDB = window.indexedDB;
      } else {
        try {
          module.exports = Store;
        } catch (e) {
        }
      }
      try {
        var Gun = Store.window.Gun || require_gun();
        Gun.on("create", function(root) {
          this.to.next(root);
          root.opt.store = root.opt.store || Store(root.opt);
        });
      } catch (e) {
      }
    })();
  }
});
export default require_rindexed();
//# sourceMappingURL=gun_lib_rindexed.js.map
