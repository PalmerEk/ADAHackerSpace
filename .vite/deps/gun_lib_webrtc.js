import {
  require_gun
} from "./chunk-DC2GYHRT.js";
import "./chunk-TFWDKVI3.js";

// node_modules/gun/lib/webrtc.js
(function() {
  var Gun = typeof window !== "undefined" ? window.Gun : require_gun();
  Gun.on("opt", function(root) {
    this.to.next(root);
    var opt = root.opt;
    if (root.once) {
      return;
    }
    if (!Gun.Mesh) {
      return;
    }
    if (false === opt.RTCPeerConnection) {
      return;
    }
    var env;
    if (typeof window !== "undefined") {
      env = window;
    }
    if (typeof global !== "undefined") {
      env = global;
    }
    env = env || {};
    var rtcpc = opt.RTCPeerConnection || env.RTCPeerConnection || env.webkitRTCPeerConnection || env.mozRTCPeerConnection;
    var rtcsd = opt.RTCSessionDescription || env.RTCSessionDescription || env.webkitRTCSessionDescription || env.mozRTCSessionDescription;
    var rtcic = opt.RTCIceCandidate || env.RTCIceCandidate || env.webkitRTCIceCandidate || env.mozRTCIceCandidate;
    if (!rtcpc || !rtcsd || !rtcic) {
      return;
    }
    opt.RTCPeerConnection = rtcpc;
    opt.RTCSessionDescription = rtcsd;
    opt.RTCIceCandidate = rtcic;
    opt.rtc = opt.rtc || { "iceServers": [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun.sipgate.net:3478" }
      /*,
      {urls: "stun:stun.stunprotocol.org"},
      {urls: "stun:stun.sipgate.net:10000"},
      {urls: "stun:217.10.68.152:10000"},
      {urls: 'stun:stun.services.mozilla.com'}*/
    ] };
    opt.rtc.dataChannel = opt.rtc.dataChannel || { ordered: false, maxRetransmits: 2 };
    opt.rtc.sdp = opt.rtc.sdp || { mandatory: { OfferToReceiveAudio: false, OfferToReceiveVideo: false } };
    opt.rtc.max = opt.rtc.max || 55;
    opt.rtc.room = opt.rtc.room || Gun.window && (location.hash.slice(1) || location.pathname.slice(1));
    opt.announce = function(to) {
      opt.rtc.start = +new Date();
      root.$.get("/RTC/" + opt.rtc.room + "<?99").get("+").put(opt.pid, function(ack) {
        if (!ack.ok || !ack.ok.rtc) {
          return;
        }
        open(ack);
      }, { acks: opt.rtc.max }).on(function(last, key, msg) {
        if (last === opt.pid || opt.rtc.start > msg.put[">"]) {
          return;
        }
        open({ "#": "" + msg["#"], ok: { rtc: { id: last } } });
      });
    };
    var mesh = opt.mesh = opt.mesh || Gun.Mesh(root);
    root.on("create", function(at) {
      this.to.next(at);
      setTimeout(opt.announce, 1);
    });
    function open(msg) {
      if (this && this.off) {
        this.off();
      }
      if (!msg.ok) {
        return;
      }
      var rtc = msg.ok.rtc, peer, tmp;
      if (!rtc || !rtc.id || rtc.id === opt.pid) {
        return;
      }
      if (tmp = rtc.answer) {
        if (!(peer = opt.peers[rtc.id] || open[rtc.id]) || peer.remoteSet) {
          return;
        }
        tmp.sdp = tmp.sdp.replace(/\\r\\n/g, "\r\n");
        return peer.setRemoteDescription(peer.remoteSet = new opt.RTCSessionDescription(tmp));
      }
      if (tmp = rtc.candidate) {
        peer = opt.peers[rtc.id] || open[rtc.id] || open({ ok: { rtc: { id: rtc.id } } });
        return peer.addIceCandidate(new opt.RTCIceCandidate(tmp));
      }
      if (open[rtc.id]) {
        return;
      }
      (peer = new opt.RTCPeerConnection(opt.rtc)).id = rtc.id;
      var wire = peer.wire = peer.createDataChannel("dc", opt.rtc.dataChannel);
      open[rtc.id] = peer;
      wire.to = setTimeout(function() {
        delete open[rtc.id];
      }, 1e3 * 60);
      wire.onclose = function() {
        mesh.bye(peer);
      };
      wire.onerror = function(err) {
      };
      wire.onopen = function(e) {
        delete open[rtc.id];
        mesh.hi(peer);
      };
      wire.onmessage = function(msg2) {
        if (!msg2) {
          return;
        }
        mesh.hear(msg2.data || msg2, peer);
      };
      peer.onicecandidate = function(e) {
        if (!e.candidate) {
          return;
        }
        root.on("out", { "@": msg["#"], ok: { rtc: { candidate: e.candidate, id: opt.pid } } });
      };
      peer.ondatachannel = function(e) {
        var rc = e.channel;
        rc.onmessage = wire.onmessage;
        rc.onopen = wire.onopen;
        rc.onclose = wire.onclose;
      };
      if (tmp = rtc.offer) {
        rtc.offer.sdp = rtc.offer.sdp.replace(/\\r\\n/g, "\r\n");
        peer.setRemoteDescription(new opt.RTCSessionDescription(tmp));
        peer.createAnswer(function(answer) {
          peer.setLocalDescription(answer);
          root.on("out", { "@": msg["#"], ok: { rtc: { answer, id: opt.pid } } });
        }, function() {
        }, opt.rtc.sdp);
        return;
      }
      peer.createOffer(function(offer) {
        peer.setLocalDescription(offer);
        root.on("out", { "@": msg["#"], "#": root.ask(open), ok: { rtc: { offer, id: opt.pid } } });
      }, function() {
      }, opt.rtc.sdp);
      return peer;
    }
  });
})();
//# sourceMappingURL=gun_lib_webrtc.js.map
