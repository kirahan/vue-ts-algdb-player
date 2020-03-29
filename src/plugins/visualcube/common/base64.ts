export default class Base64 {
    private static readonly _KEYS: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  
    public static encode(input: string): string {
      let output = "";
      let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      let i = 0;
  
      input = Base64._utf8_encode(input);
  
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
  
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
  
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output + Base64._KEYS.charAt(enc1) + Base64._KEYS.charAt(enc2) + Base64._KEYS.charAt(enc3) + Base64._KEYS.charAt(enc4);
      }
  
      return output;
    }
  
    public static decode(input: string): string {
      let output = "";
      let chr1, chr2, chr3;
      let enc1, enc2, enc3, enc4;
      let i = 0;
  
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  
      while (i < input.length) {
        enc1 = Base64._KEYS.indexOf(input.charAt(i++));
        enc2 = Base64._KEYS.indexOf(input.charAt(i++));
        enc3 = Base64._KEYS.indexOf(input.charAt(i++));
        enc4 = Base64._KEYS.indexOf(input.charAt(i++));
  
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
  
        output = output + String.fromCharCode(chr1);
  
        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
  
      output = Base64._utf8_decode(output);
  
      return output;
    }
  
    public static _utf8_encode(input: string): string {
      input = input.replace(/\r\n/g, "\n");
      let utftext = "";
  
      for (let n = 0; n < input.length; n++) {
        const c = input.charCodeAt(n);
  
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }
  
      return utftext;
    }
  
    public static _utf8_decode(input: string): string {
      let string = "";
      let i = 0;
      let c = 0;
      const c1 = 0;
      let c2 = 0;
      let c3 = 0;
  
      while (i < input.length) {
        c = input.charCodeAt(i);
  
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if (c > 191 && c < 224) {
          c2 = input.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = input.charCodeAt(i + 1);
          c3 = input.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
  
      return string;
    }
  }