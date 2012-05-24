(function( $ ) {
  $.fn.caesar = function(options) {
    var opts = $.extend($.fn.caesar.defaults, options);
    var encodeLookup = {}
    for(prop in opts.charLookup){
      encodeLookup[opts.charLookup[prop]] = prop;
    }
    return this.each(function() {
      var self, encoded, decoded = "";
      self = $(this);
      if(opts.encode){
        e = encode(self.attr(opts.attr));
        self.attr(opts.attr, e);
      }
      encoded = self.attr(opts.attr) || "";
      decoded = encode(encoded, opts.charLookup);
      self.bind('click', {
        decoded: decoded, 
        encoded: encoded
      }, opts.onClick);
    });
  };
  
  var encode = function(anyString,lookupTable) {
    var encodeStr = '';
    for(i=0;i<anyString.length;i++){
      encodeStr+=lookupTable[anyString[i]] || anyString[i];
    }
    return encodeStr;
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
    }
  }

})( jQuery );