(function( $ ) {
  $.fn.caesar = function(options) {
    var opts = $.extend($.fn.caesar.defaults, options);

    if(opts.encode){
      // create reverse lookup table
      var encodeLookup = {}
      for(prop in opts.charLookup){
        encodeLookup[opts.charLookup[prop]] = prop;
      }
      opts = $.extend(opts, {encodeLookup : encodeLookup});
    }

    return this.each(function() {
      var self, encoded, decoded = "";
      self = $(this);
      if(opts.encode) {
        var e = convert(self.attr(opts.attr), opts.encodeLookup);
        self.attr(opts.attr, e);
      }
      encoded = self.attr(opts.attr) || "";
      decoded = convert(encoded, opts.charLookup);

      // call hooks if present
      var args = {decoded: decoded, encoded: encoded};
      if(opts.onClick) {
        self.bind('click', args, opts.onClick);
      }
      if(opts.beforeEncode) {
        opts.beforeEncode.call(self, args);
      }
      if(opts.afterEncode) {
        opts.afterEncode.call(self, args);
      }
      if(opts.beforeDecode) {
        opts.beforeDecode.call(self, args);
      }
      if(opts.afterDecode) {
        opts.afterDecode.call(self, args);
      }
    });
  };

  var convert = function(s, lookupTable) {
    var convertedString = "";
    for(i = 0; i < s.length; i++){
      convertedString += lookupTable[s[i]] || s[i];
    }
    return convertedString;
  }

  $.fn.caesar.defaults = {
    attr: "data-href",
    charLookup: {
      a: "z", b: "a", c: "b", d: "c", e: "d", f: "e", g: "f", h: "g", i: "h", j: "i",
      k: "j", l: "k", m: "l", n: "m", o: "n", p: "o", q: "p", r: "q", s: "r", t: "s",
      u: "t", v: "u", w: "v", x: "w", y: "x", z: "y", 1: "0", 2: "1", 3: "2", 4: "3",
      5: "4", 6: "5", 7: "6", 8: "7", 9: "8", 0: "9"
    },
    encode: false,
    onClick: function(e) {
      this.data("target") == "_blank" ? window.open(e.data.decoded, "_blank") : window.location = e.data.decoded;
    },
    beforeEncode: null,
    afterEncode: null,
    beforeDecode: null,
    afterDecode: null
  }

})( jQuery );