import {
  __commonJS,
  __require
} from "./chunk-TFWDKVI3.js";

// node_modules/gun/sea.js
var require_sea = __commonJS({
  "node_modules/gun/sea.js"(exports, module) {
    (function() {
      function USE(arg, req) {
        return req ? __require(arg) : arg.slice ? USE[R(arg)] : function(mod, path2) {
          arg(mod = { exports: {} });
          USE[R(path2)] = mod.exports;
        };
        function R(p) {
          return p.split("/").slice(-1).toString().replace(".js", "");
        }
      }
      if (typeof module !== "undefined") {
        var MODULE = module;
      }
      ;
      USE(function(module2) {
        if (typeof self !== "undefined") {
          module2.window = self;
        }
        if (typeof window !== "undefined") {
          module2.window = window;
        }
        var tmp = module2.window || module2, u;
        var SEA = tmp.SEA || {};
        if (SEA.window = module2.window) {
          SEA.window.SEA = SEA;
        }
        try {
          if (u + "" !== typeof MODULE) {
            MODULE.exports = SEA;
          }
        } catch (e) {
        }
        module2.exports = SEA;
      })(USE, "./root");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        try {
          if (SEA.window) {
            if (location.protocol.indexOf("s") < 0 && location.host.indexOf("localhost") < 0 && !/^127\.\d+\.\d+\.\d+$/.test(location.hostname) && location.protocol.indexOf("file:") < 0) {
              console.warn("HTTPS needed for WebCrypto in SEA, redirecting...");
              location.protocol = "https:";
            }
          }
        } catch (e) {
        }
      })(USE, "./https");
      ;
      USE(function(module2) {
        var u;
        if (u + "" == typeof btoa) {
          if (u + "" == typeof Buffer) {
            try {
              global.Buffer = USE("buffer", 1).Buffer;
            } catch (e) {
              console.log("Please `npm install buffer` or add it to your package.json !");
            }
          }
          global.btoa = function(data) {
            return Buffer.from(data, "binary").toString("base64");
          };
          global.atob = function(data) {
            return Buffer.from(data, "base64").toString("binary");
          };
        }
      })(USE, "./base64");
      ;
      USE(function(module2) {
        USE("./base64");
        function SeaArray() {
        }
        Object.assign(SeaArray, { from: Array.from });
        SeaArray.prototype = Object.create(Array.prototype);
        SeaArray.prototype.toString = function(enc, start, end) {
          enc = enc || "utf8";
          start = start || 0;
          const length = this.length;
          if (enc === "hex") {
            const buf = new Uint8Array(this);
            return [...Array((end && end + 1 || length) - start).keys()].map((i) => buf[i + start].toString(16).padStart(2, "0")).join("");
          }
          if (enc === "utf8") {
            return Array.from(
              { length: (end || length) - start },
              (_, i) => String.fromCharCode(this[i + start])
            ).join("");
          }
          if (enc === "base64") {
            return btoa(this);
          }
        };
        module2.exports = SeaArray;
      })(USE, "./array");
      ;
      USE(function(module2) {
        USE("./base64");
        var SeaArray = USE("./array");
        function SafeBuffer(...props) {
          console.warn("new SafeBuffer() is depreciated, please use SafeBuffer.from()");
          return SafeBuffer.from(...props);
        }
        SafeBuffer.prototype = Object.create(Array.prototype);
        Object.assign(SafeBuffer, {
          // (data, enc) where typeof data === 'string' then enc === 'utf8'|'hex'|'base64'
          from() {
            if (!Object.keys(arguments).length || arguments[0] == null) {
              throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            }
            const input = arguments[0];
            let buf;
            if (typeof input === "string") {
              const enc = arguments[1] || "utf8";
              if (enc === "hex") {
                const bytes = input.match(/([\da-fA-F]{2})/g).map((byte) => parseInt(byte, 16));
                if (!bytes || !bytes.length) {
                  throw new TypeError("Invalid first argument for type 'hex'.");
                }
                buf = SeaArray.from(bytes);
              } else if (enc === "utf8" || "binary" === enc) {
                const length2 = input.length;
                const words = new Uint16Array(length2);
                Array.from({ length: length2 }, (_, i) => words[i] = input.charCodeAt(i));
                buf = SeaArray.from(words);
              } else if (enc === "base64") {
                const dec = atob(input);
                const length2 = dec.length;
                const bytes = new Uint8Array(length2);
                Array.from({ length: length2 }, (_, i) => bytes[i] = dec.charCodeAt(i));
                buf = SeaArray.from(bytes);
              } else if (enc === "binary") {
                buf = SeaArray.from(input);
              } else {
                console.info("SafeBuffer.from unknown encoding: " + enc);
              }
              return buf;
            }
            const byteLength = input.byteLength;
            const length = input.byteLength ? input.byteLength : input.length;
            if (length) {
              let buf2;
              if (input instanceof ArrayBuffer) {
                buf2 = new Uint8Array(input);
              }
              return SeaArray.from(buf2 || input);
            }
          },
          // This is 'safe-buffer.alloc' sans encoding support
          alloc(length, fill = 0) {
            return SeaArray.from(new Uint8Array(Array.from({ length }, () => fill)));
          },
          // This is normal UNSAFE 'buffer.alloc' or 'new Buffer(length)' - don't use!
          allocUnsafe(length) {
            return SeaArray.from(new Uint8Array(Array.from({ length })));
          },
          // This puts together array of array like members
          concat(arr) {
            if (!Array.isArray(arr)) {
              throw new TypeError("First argument must be Array containing ArrayBuffer or Uint8Array instances.");
            }
            return SeaArray.from(arr.reduce((ret, item) => ret.concat(Array.from(item)), []));
          }
        });
        SafeBuffer.prototype.from = SafeBuffer.from;
        SafeBuffer.prototype.toString = SeaArray.prototype.toString;
        module2.exports = SafeBuffer;
      })(USE, "./buffer");
      ;
      USE(function(module2) {
        const SEA = USE("./root");
        const api = { Buffer: USE("./buffer") };
        var o = {}, u;
        JSON.parseAsync = JSON.parseAsync || function(t, cb, r) {
          var u2;
          try {
            cb(u2, JSON.parse(t, r));
          } catch (e) {
            cb(e);
          }
        };
        JSON.stringifyAsync = JSON.stringifyAsync || function(v, cb, r, s) {
          var u2;
          try {
            cb(u2, JSON.stringify(v, r, s));
          } catch (e) {
            cb(e);
          }
        };
        api.parse = function(t, r) {
          return new Promise(function(res, rej) {
            JSON.parseAsync(t, function(err, raw) {
              err ? rej(err) : res(raw);
            }, r);
          });
        };
        api.stringify = function(v, r, s) {
          return new Promise(function(res, rej) {
            JSON.stringifyAsync(v, function(err, raw) {
              err ? rej(err) : res(raw);
            }, r, s);
          });
        };
        if (SEA.window) {
          api.crypto = SEA.window.crypto || SEA.window.msCrypto;
          api.subtle = (api.crypto || o).subtle || (api.crypto || o).webkitSubtle;
          api.TextEncoder = SEA.window.TextEncoder;
          api.TextDecoder = SEA.window.TextDecoder;
          api.random = (len) => api.Buffer.from(api.crypto.getRandomValues(new Uint8Array(api.Buffer.alloc(len))));
        }
        if (!api.TextDecoder) {
          const { TextEncoder, TextDecoder } = USE((u + "" == typeof MODULE ? "." : "") + "./lib/text-encoding", 1);
          api.TextDecoder = TextDecoder;
          api.TextEncoder = TextEncoder;
        }
        if (!api.crypto) {
          try {
            var crypto = USE("crypto", 1);
            Object.assign(api, {
              crypto,
              random: (len) => api.Buffer.from(crypto.randomBytes(len))
            });
            const { Crypto: WebCrypto } = USE("@peculiar/webcrypto", 1);
            api.ossl = api.subtle = new WebCrypto({ directory: "ossl" }).subtle;
          } catch (e) {
            console.log("Please `npm install @peculiar/webcrypto` or add it to your package.json !");
          }
        }
        module2.exports = api;
      })(USE, "./shim");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var s = {};
        s.pbkdf2 = { hash: { name: "SHA-256" }, iter: 1e5, ks: 64 };
        s.ecdsa = {
          pair: { name: "ECDSA", namedCurve: "P-256" },
          sign: { name: "ECDSA", hash: { name: "SHA-256" } }
        };
        s.ecdh = { name: "ECDH", namedCurve: "P-256" };
        s.jwk = function(pub, d) {
          pub = pub.split(".");
          var x = pub[0], y = pub[1];
          var jwk = { kty: "EC", crv: "P-256", x, y, ext: true };
          jwk.key_ops = d ? ["sign"] : ["verify"];
          if (d) {
            jwk.d = d;
          }
          return jwk;
        };
        s.keyToJwk = function(keyBytes) {
          const keyB64 = keyBytes.toString("base64");
          const k = keyB64.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
          return { kty: "oct", k, ext: false, alg: "A256GCM" };
        };
        s.recall = {
          validity: 12 * 60 * 60,
          // internally in seconds : 12 hours
          hook: function(props) {
            return props;
          }
          // { iat, exp, alias, remember } // or return new Promise((resolve, reject) => resolve(props)
        };
        s.check = function(t) {
          return typeof t == "string" && "SEA{" === t.slice(0, 4);
        };
        s.parse = async function p(t) {
          try {
            var yes = typeof t == "string";
            if (yes && "SEA{" === t.slice(0, 4)) {
              t = t.slice(3);
            }
            return yes ? await shim.parse(t) : t;
          } catch (e) {
          }
          return t;
        };
        SEA.opt = s;
        module2.exports = s;
      })(USE, "./settings");
      ;
      USE(function(module2) {
        var shim = USE("./shim");
        module2.exports = async function(d, o) {
          var t = typeof d == "string" ? d : await shim.stringify(d);
          var hash = await shim.subtle.digest({ name: o || "SHA-256" }, new shim.TextEncoder().encode(t));
          return shim.Buffer.from(hash);
        };
      })(USE, "./sha256");
      ;
      USE(function(module2) {
        const __shim = USE("./shim");
        const subtle = __shim.subtle;
        const ossl = __shim.ossl ? __shim.ossl : subtle;
        const sha1hash2 = (b) => ossl.digest({ name: "SHA-1" }, new ArrayBuffer(b));
        module2.exports = sha1hash2;
      })(USE, "./sha1");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S = USE("./settings");
        var sha = USE("./sha256");
        var u;
        SEA.work = SEA.work || (async (data, pair, cb, opt) => {
          try {
            var salt = (pair || {}).epub || pair;
            opt = opt || {};
            if (salt instanceof Function) {
              cb = salt;
              salt = u;
            }
            data = typeof data == "string" ? data : await shim.stringify(data);
            if ("sha" === (opt.name || "").toLowerCase().slice(0, 3)) {
              var rsha = shim.Buffer.from(await sha(data, opt.name), "binary").toString(opt.encode || "base64");
              if (cb) {
                try {
                  cb(rsha);
                } catch (e) {
                  console.log(e);
                }
              }
              return rsha;
            }
            salt = salt || shim.random(9);
            var key = await (shim.ossl || shim.subtle).importKey("raw", new shim.TextEncoder().encode(data), { name: opt.name || "PBKDF2" }, false, ["deriveBits"]);
            var work = await (shim.ossl || shim.subtle).deriveBits({
              name: opt.name || "PBKDF2",
              iterations: opt.iterations || S.pbkdf2.iter,
              salt: new shim.TextEncoder().encode(opt.salt || salt),
              hash: opt.hash || S.pbkdf2.hash
            }, key, opt.length || S.pbkdf2.ks * 8);
            data = shim.random(data.length);
            var r = shim.Buffer.from(work, "binary").toString(opt.encode || "base64");
            if (cb) {
              try {
                cb(r);
              } catch (e) {
                console.log(e);
              }
            }
            return r;
          } catch (e) {
            console.log(e);
            SEA.err = e;
            if (SEA.throw) {
              throw e;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module2.exports = SEA.work;
      })(USE, "./work");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S = USE("./settings");
        SEA.name = SEA.name || (async (cb, opt) => {
          try {
            if (cb) {
              try {
                cb();
              } catch (e) {
                console.log(e);
              }
            }
            return;
          } catch (e) {
            console.log(e);
            SEA.err = e;
            if (SEA.throw) {
              throw e;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        SEA.pair = SEA.pair || (async (cb, opt) => {
          try {
            var ecdhSubtle = shim.ossl || shim.subtle;
            var sa = await shim.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]).then(async (keys) => {
              var key = {};
              key.priv = (await shim.subtle.exportKey("jwk", keys.privateKey)).d;
              var pub = await shim.subtle.exportKey("jwk", keys.publicKey);
              key.pub = pub.x + "." + pub.y;
              return key;
            });
            try {
              var dh = await ecdhSubtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveKey"]).then(async (keys) => {
                var key = {};
                key.epriv = (await ecdhSubtle.exportKey("jwk", keys.privateKey)).d;
                var pub = await ecdhSubtle.exportKey("jwk", keys.publicKey);
                key.epub = pub.x + "." + pub.y;
                return key;
              });
            } catch (e) {
              if (SEA.window) {
                throw e;
              }
              if (e == "Error: ECDH is not a supported algorithm") {
                console.log("Ignoring ECDH...");
              } else {
                throw e;
              }
            }
            dh = dh || {};
            var r = {
              pub: sa.pub,
              priv: sa.priv,
              /* pubId, */
              epub: dh.epub,
              epriv: dh.epriv
            };
            if (cb) {
              try {
                cb(r);
              } catch (e) {
                console.log(e);
              }
            }
            return r;
          } catch (e) {
            console.log(e);
            SEA.err = e;
            if (SEA.throw) {
              throw e;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module2.exports = SEA.pair;
      })(USE, "./pair");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S = USE("./settings");
        var sha = USE("./sha256");
        var u;
        SEA.sign = SEA.sign || (async (data, pair, cb, opt) => {
          try {
            opt = opt || {};
            if (!(pair || opt).priv) {
              if (!SEA.I) {
                throw "No signing key.";
              }
              pair = await SEA.I(null, { what: data, how: "sign", why: opt.why });
            }
            if (u === data) {
              throw "`undefined` not allowed.";
            }
            var json = await S.parse(data);
            var check = opt.check = opt.check || json;
            if (SEA.verify && (SEA.opt.check(check) || check && check.s && check.m) && u !== await SEA.verify(check, pair)) {
              var r = await S.parse(check);
              if (!opt.raw) {
                r = "SEA" + await shim.stringify(r);
              }
              if (cb) {
                try {
                  cb(r);
                } catch (e) {
                  console.log(e);
                }
              }
              return r;
            }
            var pub = pair.pub;
            var priv = pair.priv;
            var jwk = S.jwk(pub, priv);
            var hash = await sha(json);
            var sig = await (shim.ossl || shim.subtle).importKey("jwk", jwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]).then((key) => (shim.ossl || shim.subtle).sign({ name: "ECDSA", hash: { name: "SHA-256" } }, key, new Uint8Array(hash)));
            var r = { m: json, s: shim.Buffer.from(sig, "binary").toString(opt.encode || "base64") };
            if (!opt.raw) {
              r = "SEA" + await shim.stringify(r);
            }
            if (cb) {
              try {
                cb(r);
              } catch (e) {
                console.log(e);
              }
            }
            return r;
          } catch (e) {
            console.log(e);
            SEA.err = e;
            if (SEA.throw) {
              throw e;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module2.exports = SEA.sign;
      })(USE, "./sign");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S = USE("./settings");
        var sha = USE("./sha256");
        var u;
        SEA.verify = SEA.verify || (async (data, pair, cb, opt) => {
          try {
            var json = await S.parse(data);
            if (false === pair) {
              var raw = await S.parse(json.m);
              if (cb) {
                try {
                  cb(raw);
                } catch (e) {
                  console.log(e);
                }
              }
              return raw;
            }
            opt = opt || {};
            var pub = pair.pub || pair;
            var key = SEA.opt.slow_leak ? await SEA.opt.slow_leak(pub) : await (shim.ossl || shim.subtle).importKey("jwk", S.jwk(pub), { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
            var hash = await sha(json.m);
            var buf, sig, check, tmp;
            try {
              buf = shim.Buffer.from(json.s, opt.encode || "base64");
              sig = new Uint8Array(buf);
              check = await (shim.ossl || shim.subtle).verify({ name: "ECDSA", hash: { name: "SHA-256" } }, key, sig, new Uint8Array(hash));
              if (!check) {
                throw "Signature did not match.";
              }
            } catch (e) {
              if (SEA.opt.fallback) {
                return await SEA.opt.fall_verify(data, pair, cb, opt);
              }
            }
            var r = check ? await S.parse(json.m) : u;
            if (cb) {
              try {
                cb(r);
              } catch (e) {
                console.log(e);
              }
            }
            return r;
          } catch (e) {
            console.log(e);
            SEA.err = e;
            if (SEA.throw) {
              throw e;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module2.exports = SEA.verify;
        var knownKeys = {};
        var keyForPair = SEA.opt.slow_leak = (pair) => {
          if (knownKeys[pair])
            return knownKeys[pair];
          var jwk = S.jwk(pair);
          knownKeys[pair] = (shim.ossl || shim.subtle).importKey("jwk", jwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
          return knownKeys[pair];
        };
        var O = SEA.opt;
        SEA.opt.fall_verify = async function(data, pair, cb, opt, f) {
          if (f === SEA.opt.fallback) {
            throw "Signature did not match";
          }
          f = f || 1;
          var tmp = data || "";
          data = SEA.opt.unpack(data) || data;
          var json = await S.parse(data), pub = pair.pub || pair, key = await SEA.opt.slow_leak(pub);
          var hash = f <= SEA.opt.fallback ? shim.Buffer.from(await shim.subtle.digest({ name: "SHA-256" }, new shim.TextEncoder().encode(await S.parse(json.m)))) : await sha(json.m);
          var buf;
          var sig;
          var check;
          try {
            buf = shim.Buffer.from(json.s, opt.encode || "base64");
            sig = new Uint8Array(buf);
            check = await (shim.ossl || shim.subtle).verify({ name: "ECDSA", hash: { name: "SHA-256" } }, key, sig, new Uint8Array(hash));
            if (!check) {
              throw "Signature did not match.";
            }
          } catch (e) {
            try {
              buf = shim.Buffer.from(json.s, "utf8");
              sig = new Uint8Array(buf);
              check = await (shim.ossl || shim.subtle).verify({ name: "ECDSA", hash: { name: "SHA-256" } }, key, sig, new Uint8Array(hash));
            } catch (e2) {
              if (!check) {
                throw "Signature did not match.";
              }
            }
          }
          var r = check ? await S.parse(json.m) : u;
          O.fall_soul = tmp["#"];
          O.fall_key = tmp["."];
          O.fall_val = data;
          O.fall_state = tmp[">"];
          if (cb) {
            try {
              cb(r);
            } catch (e) {
              console.log(e);
            }
          }
          return r;
        };
        SEA.opt.fallback = 2;
      })(USE, "./verify");
      ;
      USE(function(module2) {
        var shim = USE("./shim");
        var S = USE("./settings");
        var sha256hash = USE("./sha256");
        const importGen = async (key, salt, opt) => {
          opt = opt || {};
          const combo = key + (salt || shim.random(8)).toString("utf8");
          const hash = shim.Buffer.from(await sha256hash(combo), "binary");
          const jwkKey = S.keyToJwk(hash);
          return await shim.subtle.importKey("jwk", jwkKey, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
        };
        module2.exports = importGen;
      })(USE, "./aeskey");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S = USE("./settings");
        var aeskey = USE("./aeskey");
        var u;
        SEA.encrypt = SEA.encrypt || (async (data, pair, cb, opt) => {
          try {
            opt = opt || {};
            var key = (pair || opt).epriv || pair;
            if (u === data) {
              throw "`undefined` not allowed.";
            }
            if (!key) {
              if (!SEA.I) {
                throw "No encryption key.";
              }
              pair = await SEA.I(null, { what: data, how: "encrypt", why: opt.why });
              key = pair.epriv || pair;
            }
            var msg = typeof data == "string" ? data : await shim.stringify(data);
            var rand = { s: shim.random(9), iv: shim.random(15) };
            var ct = await aeskey(key, rand.s, opt).then((aes) => (
              /*shim.ossl ||*/
              shim.subtle.encrypt({
                // Keeping the AES key scope as private as possible...
                name: opt.name || "AES-GCM",
                iv: new Uint8Array(rand.iv)
              }, aes, new shim.TextEncoder().encode(msg))
            ));
            var r = {
              ct: shim.Buffer.from(ct, "binary").toString(opt.encode || "base64"),
              iv: rand.iv.toString(opt.encode || "base64"),
              s: rand.s.toString(opt.encode || "base64")
            };
            if (!opt.raw) {
              r = "SEA" + await shim.stringify(r);
            }
            if (cb) {
              try {
                cb(r);
              } catch (e) {
                console.log(e);
              }
            }
            return r;
          } catch (e) {
            console.log(e);
            SEA.err = e;
            if (SEA.throw) {
              throw e;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module2.exports = SEA.encrypt;
      })(USE, "./encrypt");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S = USE("./settings");
        var aeskey = USE("./aeskey");
        SEA.decrypt = SEA.decrypt || (async (data, pair, cb, opt) => {
          try {
            opt = opt || {};
            var key = (pair || opt).epriv || pair;
            if (!key) {
              if (!SEA.I) {
                throw "No decryption key.";
              }
              pair = await SEA.I(null, { what: data, how: "decrypt", why: opt.why });
              key = pair.epriv || pair;
            }
            var json = await S.parse(data);
            var buf, bufiv, bufct;
            try {
              buf = shim.Buffer.from(json.s, opt.encode || "base64");
              bufiv = shim.Buffer.from(json.iv, opt.encode || "base64");
              bufct = shim.Buffer.from(json.ct, opt.encode || "base64");
              var ct = await aeskey(key, buf, opt).then((aes) => (
                /*shim.ossl ||*/
                shim.subtle.decrypt({
                  // Keeping aesKey scope as private as possible...
                  name: opt.name || "AES-GCM",
                  iv: new Uint8Array(bufiv),
                  tagLength: 128
                }, aes, new Uint8Array(bufct))
              ));
            } catch (e) {
              if ("utf8" === opt.encode) {
                throw "Could not decrypt";
              }
              if (SEA.opt.fallback) {
                opt.encode = "utf8";
                return await SEA.decrypt(data, pair, cb, opt);
              }
            }
            var r = await S.parse(new shim.TextDecoder("utf8").decode(ct));
            if (cb) {
              try {
                cb(r);
              } catch (e) {
                console.log(e);
              }
            }
            return r;
          } catch (e) {
            console.log(e);
            SEA.err = e;
            if (SEA.throw) {
              throw e;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module2.exports = SEA.decrypt;
      })(USE, "./decrypt");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S = USE("./settings");
        SEA.secret = SEA.secret || (async (key, pair, cb, opt) => {
          try {
            opt = opt || {};
            if (!pair || !pair.epriv || !pair.epub) {
              if (!SEA.I) {
                throw "No secret mix.";
              }
              pair = await SEA.I(null, { what: key, how: "secret", why: opt.why });
            }
            var pub = key.epub || key;
            var epub = pair.epub;
            var epriv = pair.epriv;
            var ecdhSubtle = shim.ossl || shim.subtle;
            var pubKeyData = keysToEcdhJwk(pub);
            var props = Object.assign({ public: await ecdhSubtle.importKey(...pubKeyData, true, []) }, { name: "ECDH", namedCurve: "P-256" });
            var privKeyData = keysToEcdhJwk(epub, epriv);
            var derived = await ecdhSubtle.importKey(...privKeyData, false, ["deriveBits"]).then(async (privKey) => {
              var derivedBits = await ecdhSubtle.deriveBits(props, privKey, 256);
              var rawBits = new Uint8Array(derivedBits);
              var derivedKey = await ecdhSubtle.importKey("raw", rawBits, { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
              return ecdhSubtle.exportKey("jwk", derivedKey).then(({ k }) => k);
            });
            var r = derived;
            if (cb) {
              try {
                cb(r);
              } catch (e) {
                console.log(e);
              }
            }
            return r;
          } catch (e) {
            console.log(e);
            SEA.err = e;
            if (SEA.throw) {
              throw e;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        var keysToEcdhJwk = (pub, d) => {
          var [x, y] = pub.split(".");
          var jwk = d ? { d } : {};
          return [
            // Use with spread returned value...
            "jwk",
            Object.assign(
              jwk,
              { x, y, kty: "EC", crv: "P-256", ext: true }
            ),
            // ??? refactor
            { name: "ECDH", namedCurve: "P-256" }
          ];
        };
        module2.exports = SEA.secret;
      })(USE, "./secret");
      ;
      USE(function(module2) {
        var SEA = USE("./root");
        SEA.certify = SEA.certify || (async (certificants, policy = {}, authority, cb, opt = {}) => {
          try {
            console.log("SEA.certify() is an early experimental community supported method that may change API behavior without warning in any future version.");
            certificants = (() => {
              var data2 = [];
              if (certificants) {
                if ((typeof certificants === "string" || Array.isArray(certificants)) && certificants.indexOf("*") > -1)
                  return "*";
                if (typeof certificants === "string")
                  return certificants;
                if (Array.isArray(certificants)) {
                  if (certificants.length === 1 && certificants[0])
                    return typeof certificants[0] === "object" && certificants[0].pub ? certificants[0].pub : typeof certificants[0] === "string" ? certificants[0] : null;
                  certificants.map((certificant) => {
                    if (typeof certificant === "string")
                      data2.push(certificant);
                    else if (typeof certificant === "object" && certificant.pub)
                      data2.push(certificant.pub);
                  });
                }
                if (typeof certificants === "object" && certificants.pub)
                  return certificants.pub;
                return data2.length > 0 ? data2 : null;
              }
              return;
            })();
            if (!certificants)
              return console.log("No certificant found.");
            const expiry = opt.expiry && (typeof opt.expiry === "number" || typeof opt.expiry === "string") ? parseFloat(opt.expiry) : null;
            const readPolicy = (policy || {}).read ? policy.read : null;
            const writePolicy = (policy || {}).write ? policy.write : typeof policy === "string" || Array.isArray(policy) || policy["+"] || policy["#"] || policy["."] || policy["="] || policy["*"] || policy[">"] || policy["<"] ? policy : null;
            const block = (opt || {}).block || (opt || {}).blacklist || (opt || {}).ban || {};
            const readBlock = block.read && (typeof block.read === "string" || (block.read || {})["#"]) ? block.read : null;
            const writeBlock = typeof block === "string" ? block : block.write && (typeof block.write === "string" || block.write["#"]) ? block.write : null;
            if (!readPolicy && !writePolicy)
              return console.log("No policy found.");
            const data = JSON.stringify({
              c: certificants,
              ...expiry ? { e: expiry } : {},
              // inject expiry if possible
              ...readPolicy ? { r: readPolicy } : {},
              // "r" stands for read, which means read permission.
              ...writePolicy ? { w: writePolicy } : {},
              // "w" stands for write, which means write permission.
              ...readBlock ? { rb: readBlock } : {},
              // inject READ block if possible
              ...writeBlock ? { wb: writeBlock } : {}
              // inject WRITE block if possible
            });
            const certificate = await SEA.sign(data, authority, null, { raw: 1 });
            var r = certificate;
            if (!opt.raw) {
              r = "SEA" + JSON.stringify(r);
            }
            if (cb) {
              try {
                cb(r);
              } catch (e) {
                console.log(e);
              }
            }
            return r;
          } catch (e) {
            SEA.err = e;
            if (SEA.throw) {
              throw e;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module2.exports = SEA.certify;
      })(USE, "./certify");
      ;
      USE(function(module2) {
        var shim = USE("./shim");
        var SEA = USE("./root");
        SEA.work = USE("./work");
        SEA.sign = USE("./sign");
        SEA.verify = USE("./verify");
        SEA.encrypt = USE("./encrypt");
        SEA.decrypt = USE("./decrypt");
        SEA.certify = USE("./certify");
        SEA.random = SEA.random || shim.random;
        SEA.Buffer = SEA.Buffer || USE("./buffer");
        SEA.keyid = SEA.keyid || (async (pub) => {
          try {
            const pb = shim.Buffer.concat(
              pub.replace(/-/g, "+").replace(/_/g, "/").split(".").map((t) => shim.Buffer.from(t, "base64"))
            );
            const id = shim.Buffer.concat([
              shim.Buffer.from([153, pb.length / 256, pb.length % 256]),
              pb
            ]);
            const sha1 = await sha1hash(id);
            const hash = shim.Buffer.from(sha1, "binary");
            return hash.toString("hex", hash.length - 8);
          } catch (e) {
            console.log(e);
            throw e;
          }
        });
        ((SEA.window || {}).GUN || {}).SEA = SEA;
        module2.exports = SEA;
      })(USE, "./sea");
      ;
      USE(function(module2) {
        var SEA = USE("./sea"), Gun, u;
        if (SEA.window) {
          Gun = SEA.window.GUN || { chain: {} };
        } else {
          Gun = USE((u + "" == typeof MODULE ? "." : "") + "./gun", 1);
        }
        SEA.GUN = Gun;
        function User(root) {
          this._ = { $: this };
        }
        User.prototype = function() {
          function F() {
          }
          ;
          F.prototype = Gun.chain;
          return new F();
        }();
        User.prototype.constructor = User;
        Gun.chain.user = function(pub) {
          var gun = this, root = gun.back(-1), user;
          if (pub) {
            pub = SEA.opt.pub((pub._ || "")["#"]) || pub;
            return root.get("~" + pub);
          }
          if (user = root.back("user")) {
            return user;
          }
          var root = root._, at = root, uuid = at.opt.uuid || lex;
          (at = (user = at.user = gun.chain(new User()))._).opt = {};
          at.opt.uuid = function(cb) {
            var id = uuid(), pub2 = root.user;
            if (!pub2 || !(pub2 = pub2.is) || !(pub2 = pub2.pub)) {
              return id;
            }
            id = "~" + pub2 + "/" + id;
            if (cb && cb.call) {
              cb(null, id);
            }
            return id;
          };
          return user;
        };
        function lex() {
          return Gun.state().toString(36).replace(".", "");
        }
        Gun.User = User;
        User.GUN = Gun;
        User.SEA = Gun.SEA = SEA;
        module2.exports = User;
      })(USE, "./user");
      ;
      USE(function(module2) {
        var u, Gun = "" + u != typeof GUN ? GUN || { chain: {} } : USE(("" + u === typeof MODULE ? "." : "") + "./gun", 1);
        Gun.chain.then = function(cb, opt) {
          var gun = this, p = new Promise(function(res, rej) {
            gun.once(res, opt);
          });
          return cb ? p.then(cb) : p;
        };
      })(USE, "./then");
      ;
      USE(function(module2) {
        var User = USE("./user"), SEA = User.SEA, Gun = User.GUN, noop = function() {
        };
        User.prototype.create = function(...args) {
          var pair = typeof args[0] === "object" && (args[0].pub || args[0].epub) ? args[0] : typeof args[1] === "object" && (args[1].pub || args[1].epub) ? args[1] : null;
          var alias = pair && (pair.pub || pair.epub) ? pair.pub : typeof args[0] === "string" ? args[0] : null;
          var pass = pair && (pair.pub || pair.epub) ? pair : alias && typeof args[1] === "string" ? args[1] : null;
          var cb = args.filter((arg) => typeof arg === "function")[0] || null;
          var opt = args && args.length > 1 && typeof args[args.length - 1] === "object" ? args[args.length - 1] : {};
          var gun = this, cat = gun._, root = gun.back(-1);
          cb = cb || noop;
          opt = opt || {};
          if (false !== opt.check) {
            var err;
            if (!alias) {
              err = "No user.";
            }
            if ((pass || "").length < 8) {
              err = "Password too short!";
            }
            if (err) {
              cb({ err: Gun.log(err) });
              return gun;
            }
          }
          if (cat.ing) {
            (cb || noop)({ err: Gun.log("User is already being created or authenticated!"), wait: true });
            return gun;
          }
          cat.ing = true;
          var act = {}, u;
          act.a = function(pubs) {
            act.pubs = pubs;
            if (pubs && !opt.already) {
              var ack = { err: Gun.log("User already created!") };
              cat.ing = false;
              (cb || noop)(ack);
              gun.leave();
              return;
            }
            act.salt = String.random(64);
            SEA.work(pass, act.salt, act.b);
          };
          act.b = function(proof) {
            act.proof = proof;
            pair ? act.c(pair) : SEA.pair(act.c);
          };
          act.c = function(pair2) {
            var tmp;
            act.pair = pair2 || {};
            if (tmp = cat.root.user) {
              tmp._.sea = pair2;
              tmp.is = { pub: pair2.pub, epub: pair2.epub, alias };
            }
            act.data = { pub: pair2.pub };
            act.d();
          };
          act.d = function() {
            act.data.alias = alias;
            act.e();
          };
          act.e = function() {
            act.data.epub = act.pair.epub;
            SEA.encrypt({ priv: act.pair.priv, epriv: act.pair.epriv }, act.proof, act.f, { raw: 1 });
          };
          act.f = function(auth) {
            act.data.auth = JSON.stringify({ ek: auth, s: act.salt });
            act.g(act.data.auth);
          };
          act.g = function(auth) {
            var tmp;
            act.data.auth = act.data.auth || auth;
            root.get(tmp = "~" + act.pair.pub).put(act.data).on(act.h);
            var link = {};
            link[tmp] = { "#": tmp };
            root.get("~@" + alias).put(link).get(tmp).on(act.i);
          };
          act.h = function(data, key, msg, eve) {
            eve.off();
            act.h.ok = 1;
            act.i();
          };
          act.i = function(data, key, msg, eve) {
            if (eve) {
              act.i.ok = 1;
              eve.off();
            }
            if (!act.h.ok || !act.i.ok) {
              return;
            }
            cat.ing = false;
            cb({ ok: 0, pub: act.pair.pub });
            if (noop === cb) {
              pair ? gun.auth(pair) : gun.auth(alias, pass);
            }
          };
          root.get("~@" + alias).once(act.a);
          return gun;
        };
        User.prototype.leave = function(opt, cb) {
          var gun = this, user = gun.back(-1)._.user;
          if (user) {
            delete user.is;
            delete user._.is;
            delete user._.sea;
          }
          if (SEA.window) {
            try {
              var sS = {};
              sS = SEA.window.sessionStorage;
              delete sS.recall;
              delete sS.pair;
            } catch (e) {
            }
            ;
          }
          return gun;
        };
      })(USE, "./create");
      ;
      USE(function(module2) {
        var User = USE("./user"), SEA = User.SEA, Gun = User.GUN, noop = function() {
        };
        User.prototype.auth = function(...args) {
          var pair = typeof args[0] === "object" && (args[0].pub || args[0].epub) ? args[0] : typeof args[1] === "object" && (args[1].pub || args[1].epub) ? args[1] : null;
          var alias = !pair && typeof args[0] === "string" ? args[0] : null;
          var pass = (alias || pair && !(pair.priv && pair.epriv)) && typeof args[1] === "string" ? args[1] : null;
          var cb = args.filter((arg) => typeof arg === "function")[0] || null;
          var opt = args && args.length > 1 && typeof args[args.length - 1] === "object" ? args[args.length - 1] : {};
          var gun = this, cat = gun._, root = gun.back(-1);
          if (cat.ing) {
            (cb || noop)({ err: Gun.log("User is already being created or authenticated!"), wait: true });
            return gun;
          }
          cat.ing = true;
          var act = {}, u, tries = 9;
          act.a = function(data) {
            if (!data) {
              return act.b();
            }
            if (!data.pub) {
              var tmp = [];
              Object.keys(data).forEach(function(k) {
                if ("_" == k) {
                  return;
                }
                tmp.push(data[k]);
              });
              return act.b(tmp);
            }
            if (act.name) {
              return act.f(data);
            }
            act.c((act.data = data).auth);
          };
          act.b = function(list) {
            var get = (act.list = (act.list || []).concat(list || [])).shift();
            if (u === get) {
              if (act.name) {
                return act.err("Your user account is not published for dApps to access, please consider syncing it online, or allowing local access by adding your device as a peer.");
              }
              if (alias && tries--) {
                root.get("~@" + alias).once(act.a);
                return;
              }
              return act.err("Wrong user or password.");
            }
            root.get(get).once(act.a);
          };
          act.c = function(auth) {
            if (u === auth) {
              return act.b();
            }
            if ("string" == typeof auth) {
              return act.c(obj_ify(auth));
            }
            SEA.work(pass, (act.auth = auth).s, act.d, act.enc);
          };
          act.d = function(proof) {
            SEA.decrypt(act.auth.ek, proof, act.e, act.enc);
          };
          act.e = function(half) {
            if (u === half) {
              if (!act.enc) {
                act.enc = { encode: "utf8" };
                return act.c(act.auth);
              }
              act.enc = null;
              return act.b();
            }
            act.half = half;
            act.f(act.data);
          };
          act.f = function(pair2) {
            var half = act.half || {}, data = act.data || {};
            act.g(act.lol = { pub: pair2.pub || data.pub, epub: pair2.epub || data.epub, priv: pair2.priv || half.priv, epriv: pair2.epriv || half.epriv });
          };
          act.g = function(pair2) {
            if (!pair2 || !pair2.pub || !pair2.epub) {
              return act.b();
            }
            act.pair = pair2;
            var user = root._.user, at = user._;
            var tmp = at.tag;
            var upt = at.opt;
            at = user._ = root.get("~" + pair2.pub)._;
            at.opt = upt;
            user.is = { pub: pair2.pub, epub: pair2.epub, alias: alias || pair2.pub };
            at.sea = act.pair;
            cat.ing = false;
            try {
              if (pass && u == (obj_ify(cat.root.graph["~" + pair2.pub].auth) || "")[":"]) {
                opt.shuffle = opt.change = pass;
              }
            } catch (e) {
            }
            opt.change ? act.z() : (cb || noop)(at);
            if (SEA.window && (gun.back("user")._.opt || opt).remember) {
              try {
                var sS = {};
                sS = SEA.window.sessionStorage;
                sS.recall = true;
                sS.pair = JSON.stringify(pair2);
              } catch (e) {
              }
            }
            try {
              if (root._.tag.auth) {
                root._.on("auth", at);
              } else {
                setTimeout(function() {
                  root._.on("auth", at);
                }, 1);
              }
            } catch (e) {
              Gun.log("Your 'auth' callback crashed with:", e);
            }
          };
          act.h = function(data) {
            if (!data) {
              return act.b();
            }
            alias = data.alias;
            if (!alias)
              alias = data.alias = "~" + pair.pub;
            if (!data.auth) {
              return act.g(pair);
            }
            pair = null;
            act.c((act.data = data).auth);
          };
          act.z = function() {
            act.salt = String.random(64);
            SEA.work(opt.change, act.salt, act.y);
          };
          act.y = function(proof) {
            SEA.encrypt({ priv: act.pair.priv, epriv: act.pair.epriv }, proof, act.x, { raw: 1 });
          };
          act.x = function(auth) {
            act.w(JSON.stringify({ ek: auth, s: act.salt }));
          };
          act.w = function(auth) {
            if (opt.shuffle) {
              console.log("migrate core account from UTF8 & shuffle");
              var tmp = {};
              Object.keys(act.data).forEach(function(k) {
                tmp[k] = act.data[k];
              });
              delete tmp._;
              tmp.auth = auth;
              root.get("~" + act.pair.pub).put(tmp);
            }
            root.get("~" + act.pair.pub).get("auth").put(auth, cb || noop);
          };
          act.err = function(e) {
            var ack = { err: Gun.log(e || "User cannot be found!") };
            cat.ing = false;
            (cb || noop)(ack);
          };
          act.plugin = function(name) {
            if (!(act.name = name)) {
              return act.err();
            }
            var tmp = [name];
            if ("~" !== name[0]) {
              tmp[1] = "~" + name;
              tmp[2] = "~@" + name;
            }
            act.b(tmp);
          };
          if (pair) {
            if (pair.priv && pair.epriv)
              act.g(pair);
            else
              root.get("~" + pair.pub).once(act.h);
          } else if (alias) {
            root.get("~@" + alias).once(act.a);
          } else if (!alias && !pass) {
            SEA.name(act.plugin);
          }
          return gun;
        };
        function obj_ify(o) {
          if ("string" != typeof o) {
            return o;
          }
          try {
            o = JSON.parse(o);
          } catch (e) {
            o = {};
          }
          ;
          return o;
        }
      })(USE, "./auth");
      ;
      USE(function(module2) {
        var User = USE("./user"), SEA = User.SEA, Gun = User.GUN;
        User.prototype.recall = function(opt, cb) {
          var gun = this, root = gun.back(-1), tmp;
          opt = opt || {};
          if (opt && opt.sessionStorage) {
            if (SEA.window) {
              try {
                var sS = {};
                sS = SEA.window.sessionStorage;
                if (sS) {
                  root._.opt.remember = true;
                  (gun.back("user")._.opt || opt).remember = true;
                  if (sS.recall || sS.pair)
                    root.user().auth(JSON.parse(sS.pair), cb);
                }
              } catch (e) {
              }
            }
            return gun;
          }
          return gun;
        };
      })(USE, "./recall");
      ;
      USE(function(module2) {
        var User = USE("./user"), SEA = User.SEA, Gun = User.GUN, noop = function() {
        };
        User.prototype.pair = function() {
          var user = this, proxy;
          try {
            proxy = new Proxy({ DANGER: "???" }, { get: function(t, p, r) {
              if (!user.is || !(user._ || "").sea) {
                return;
              }
              return user._.sea[p];
            } });
          } catch (e) {
          }
          return proxy;
        };
        User.prototype.delete = async function(alias, pass, cb) {
          console.log("user.delete() IS DEPRECATED AND WILL BE MOVED TO A MODULE!!!");
          var gun = this, root = gun.back(-1), user = gun.back("user");
          try {
            user.auth(alias, pass, function(ack) {
              var pub = (user.is || {}).pub;
              user.map().once(function() {
                this.put(null);
              });
              user.leave();
              (cb || noop)({ ok: 0 });
            });
          } catch (e) {
            Gun.log("User.delete failed! Error:", e);
          }
          return gun;
        };
        User.prototype.alive = async function() {
          console.log("user.alive() IS DEPRECATED!!!");
          const gunRoot = this.back(-1);
          try {
            await authRecall(gunRoot);
            return gunRoot._.user._;
          } catch (e) {
            const err = "No session!";
            Gun.log(err);
            throw { err };
          }
        };
        User.prototype.trust = async function(user) {
          console.log("`.trust` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
          if (Gun.is(user)) {
            user.get("pub").get((ctx, ev) => {
              console.log(ctx, ev);
            });
          }
          user.get("trust").get(path).put(theirPubkey);
        };
        User.prototype.grant = function(to, cb) {
          console.log("`.grant` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
          var gun = this, user = gun.back(-1).user(), pair = user._.sea, path2 = "";
          gun.back(function(at) {
            if (at.is) {
              return;
            }
            path2 += at.get || "";
          });
          (async function() {
            var enc, sec = await user.get("grant").get(pair.pub).get(path2).then();
            sec = await SEA.decrypt(sec, pair);
            if (!sec) {
              sec = SEA.random(16).toString();
              enc = await SEA.encrypt(sec, pair);
              user.get("grant").get(pair.pub).get(path2).put(enc);
            }
            var pub = to.get("pub").then();
            var epub = to.get("epub").then();
            pub = await pub;
            epub = await epub;
            var dh = await SEA.secret(epub, pair);
            enc = await SEA.encrypt(sec, dh);
            user.get("grant").get(pub).get(path2).put(enc, cb);
          })();
          return gun;
        };
        User.prototype.secret = function(data, cb) {
          console.log("`.secret` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
          var gun = this, user = gun.back(-1).user(), pair = user.pair(), path2 = "";
          gun.back(function(at) {
            if (at.is) {
              return;
            }
            path2 += at.get || "";
          });
          (async function() {
            var enc, sec = await user.get("trust").get(pair.pub).get(path2).then();
            sec = await SEA.decrypt(sec, pair);
            if (!sec) {
              sec = SEA.random(16).toString();
              enc = await SEA.encrypt(sec, pair);
              user.get("trust").get(pair.pub).get(path2).put(enc);
            }
            enc = await SEA.encrypt(data, sec);
            gun.put(enc, cb);
          })();
          return gun;
        };
        module2.exports = User;
      })(USE, "./share");
      ;
      USE(function(module2) {
        var SEA = USE("./sea"), S = USE("./settings"), noop = function() {
        }, u;
        var Gun = (SEA.window || "").GUN || USE(("" + u === typeof MODULE ? "." : "") + "./gun", 1);
        Gun.on("opt", function(at) {
          if (!at.sea) {
            at.sea = { own: {} };
            at.on("put", check, at);
          }
          this.to.next(at);
        });
        function check(msg) {
          var eve = this, at = eve.as, put = msg.put, soul = put["#"], key = put["."], val = put[":"], state = put[">"], id = msg["#"], tmp;
          if (!soul || !key) {
            return;
          }
          if ((msg._ || "").faith && (at.opt || "").faith && "function" == typeof msg._) {
            SEA.opt.pack(put, function(raw) {
              SEA.verify(raw, false, function(data) {
                put["="] = SEA.opt.unpack(data);
                eve.to.next(msg);
              });
            });
            return;
          }
          var no = function(why) {
            at.on("in", { "@": id, err: msg.err = why });
          };
          (msg._ || "").DBG && ((msg._ || "").DBG.c = +new Date());
          if (0 <= soul.indexOf("<?")) {
            tmp = parseFloat(soul.split("<?")[1] || "");
            if (tmp && state < Gun.state() - tmp * 1e3) {
              (tmp = msg._) && tmp.stun && tmp.stun--;
              return;
            }
          }
          if ("~@" === soul) {
            check.alias(eve, msg, val, key, soul, at, no);
            return;
          }
          if ("~@" === soul.slice(0, 2)) {
            check.pubs(eve, msg, val, key, soul, at, no);
            return;
          }
          if (tmp = SEA.opt.pub(soul)) {
            check.pub(eve, msg, val, key, soul, at, no, at.user || "", tmp);
            return;
          }
          if (0 <= soul.indexOf("#")) {
            check.hash(eve, msg, val, key, soul, at, no);
            return;
          }
          check.any(eve, msg, val, key, soul, at, no, at.user || "");
          return;
          eve.to.next(msg);
        }
        check.hash = function(eve, msg, val, key, soul, at, no) {
          SEA.work(val, null, function(data) {
            function hexToBase64(hexStr) {
              let base64 = "";
              for (let i = 0; i < hexStr.length; i++) {
                base64 += !(i - 1 & 1) ? String.fromCharCode(parseInt(hexStr.substring(i - 1, i + 1), 16)) : "";
              }
              return btoa(base64);
            }
            if (data && data === key.split("#").slice(-1)[0]) {
              return eve.to.next(msg);
            } else if (data && data === hexToBase64(key.split("#").slice(-1)[0])) {
              return eve.to.next(msg);
            }
            no("Data hash not same as hash!");
          }, { name: "SHA-256" });
        };
        check.alias = function(eve, msg, val, key, soul, at, no) {
          if (!val) {
            return no("Data must exist!");
          }
          if ("~@" + key === link_is(val)) {
            return eve.to.next(msg);
          }
          no("Alias not same!");
        };
        check.pubs = function(eve, msg, val, key, soul, at, no) {
          if (!val) {
            return no("Alias must exist!");
          }
          if (key === link_is(val)) {
            return eve.to.next(msg);
          }
          no("Alias not same!");
        };
        check.pub = async function(eve, msg, val, key, soul, at, no, user, pub) {
          var tmp;
          const raw = await S.parse(val) || {};
          const verify = (certificate, certificant, cb) => {
            if (certificate.m && certificate.s && certificant && pub)
              return SEA.verify(certificate, pub, (data) => {
                if (u !== data && u !== data.e && msg.put[">"] && msg.put[">"] > parseFloat(data.e))
                  return no("Certificate expired.");
                if (u !== data && data.c && data.w && (data.c === certificant || data.c.indexOf("*") > -1)) {
                  let path2 = soul.indexOf("/") > -1 ? soul.replace(soul.substring(0, soul.indexOf("/") + 1), "") : "";
                  String.match = String.match || Gun.text.match;
                  const w = Array.isArray(data.w) ? data.w : typeof data.w === "object" || typeof data.w === "string" ? [data.w] : [];
                  for (const lex of w) {
                    if (String.match(path2, lex["#"]) && String.match(key, lex["."]) || !lex["."] && String.match(path2, lex["#"]) || !lex["#"] && String.match(key, lex["."]) || String.match(path2 ? path2 + "/" + key : key, lex["#"] || lex)) {
                      if (lex["+"] && lex["+"].indexOf("*") > -1 && path2 && path2.indexOf(certificant) == -1 && key.indexOf(certificant) == -1)
                        return no(`Path "${path2}" or key "${key}" must contain string "${certificant}".`);
                      if (data.wb && (typeof data.wb === "string" || (data.wb || {})["#"])) {
                        var root = eve.as.root.$.back(-1);
                        if (typeof data.wb === "string" && "~" !== data.wb.slice(0, 1))
                          root = root.get("~" + pub);
                        return root.get(data.wb).get(certificant).once((value) => {
                          if (value && (value === 1 || value === true))
                            return no(`Certificant ${certificant} blocked.`);
                          return cb(data);
                        });
                      }
                      return cb(data);
                    }
                  }
                  return no("Certificate verification fail.");
                }
              });
            return;
          };
          if ("pub" === key && "~" + pub === soul) {
            if (val === pub)
              return eve.to.next(msg);
            return no("Account not same!");
          }
          if ((tmp = user.is) && tmp.pub && !raw["*"] && !raw["+"] && (pub === tmp.pub || pub !== tmp.pub && ((msg._.msg || {}).opt || {}).cert)) {
            SEA.opt.pack(msg.put, (packed) => {
              SEA.sign(packed, user._.sea, async function(data) {
                if (u === data)
                  return no(SEA.err || "Signature fail.");
                msg.put[":"] = { ":": tmp = SEA.opt.unpack(data.m), "~": data.s };
                msg.put["="] = tmp;
                if (pub === user.is.pub) {
                  if (tmp = link_is(val))
                    (at.sea.own[tmp] = at.sea.own[tmp] || {})[pub] = 1;
                  JSON.stringifyAsync(msg.put[":"], function(err, s) {
                    if (err) {
                      return no(err || "Stringify error.");
                    }
                    msg.put[":"] = s;
                    return eve.to.next(msg);
                  });
                  return;
                }
                if (pub !== user.is.pub && ((msg._.msg || {}).opt || {}).cert) {
                  const cert = await S.parse(msg._.msg.opt.cert);
                  if (cert && cert.m && cert.s)
                    verify(cert, user.is.pub, (_) => {
                      msg.put[":"]["+"] = cert;
                      msg.put[":"]["*"] = user.is.pub;
                      JSON.stringifyAsync(msg.put[":"], function(err, s) {
                        if (err) {
                          return no(err || "Stringify error.");
                        }
                        msg.put[":"] = s;
                        return eve.to.next(msg);
                      });
                      return;
                    });
                }
              }, { raw: 1 });
            });
            return;
          }
          SEA.opt.pack(msg.put, (packed) => {
            SEA.verify(packed, raw["*"] || pub, function(data) {
              var tmp2;
              data = SEA.opt.unpack(data);
              if (u === data)
                return no("Unverified data.");
              if ((tmp2 = link_is(data)) && pub === SEA.opt.pub(tmp2))
                (at.sea.own[tmp2] = at.sea.own[tmp2] || {})[pub] = 1;
              if (raw["+"] && raw["+"]["m"] && raw["+"]["s"] && raw["*"])
                verify(raw["+"], raw["*"], (_) => {
                  msg.put["="] = data;
                  return eve.to.next(msg);
                });
              else {
                msg.put["="] = data;
                return eve.to.next(msg);
              }
            });
          });
          return;
        };
        check.any = function(eve, msg, val, key, soul, at, no, user) {
          var tmp, pub;
          if (at.opt.secure) {
            return no("Soul missing public key at '" + key + "'.");
          }
          at.on("secure", function(msg2) {
            this.off();
            if (!at.opt.secure) {
              return eve.to.next(msg2);
            }
            no("Data cannot be changed.");
          }).on.on("secure", msg);
          return;
        };
        var valid = Gun.valid, link_is = function(d, l) {
          return "string" == typeof (l = valid(d)) && l;
        }, state_ify = (Gun.state || "").ify;
        var pubcut = /[^\w_-]/;
        SEA.opt.pub = function(s) {
          if (!s) {
            return;
          }
          s = s.split("~");
          if (!s || !(s = s[1])) {
            return;
          }
          s = s.split(pubcut).slice(0, 2);
          if (!s || 2 != s.length) {
            return;
          }
          if ("@" === (s[0] || "")[0]) {
            return;
          }
          s = s.slice(0, 2).join(".");
          return s;
        };
        SEA.opt.stringy = function(t) {
        };
        SEA.opt.pack = function(d, cb, k, n, s) {
          var tmp, f;
          if (SEA.opt.check(d)) {
            return cb(d);
          }
          if (d && d["#"] && d["."] && d[">"]) {
            tmp = d[":"];
            f = 1;
          }
          JSON.parseAsync(f ? tmp : d, function(err, meta) {
            var sig = u !== (meta || "")[":"] && (meta || "")["~"];
            if (!sig) {
              cb(d);
              return;
            }
            cb({ m: { "#": s || d["#"], ".": k || d["."], ":": (meta || "")[":"], ">": d[">"] || Gun.state.is(n, k) }, s: sig });
          });
        };
        var O = SEA.opt;
        SEA.opt.unpack = function(d, k, n) {
          var tmp;
          if (u === d) {
            return;
          }
          if (d && u !== (tmp = d[":"])) {
            return tmp;
          }
          k = k || O.fall_key;
          if (!n && O.fall_val) {
            n = {};
            n[k] = O.fall_val;
          }
          if (!k || !n) {
            return;
          }
          if (d === n[k]) {
            return d;
          }
          if (!SEA.opt.check(n[k])) {
            return d;
          }
          var soul = n && n._ && n._["#"] || O.fall_soul, s = Gun.state.is(n, k) || O.fall_state;
          if (d && 4 === d.length && soul === d[0] && k === d[1] && fl(s) === fl(d[3])) {
            return d[2];
          }
          if (s < SEA.opt.shuffle_attack) {
            return d;
          }
        };
        SEA.opt.shuffle_attack = 15463296e5;
        var fl = Math.floor;
      })(USE, "./index");
    })();
  }
});

export {
  require_sea
};
//# sourceMappingURL=chunk-DRMW4Y32.js.map
