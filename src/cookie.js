function encode(val) {
  return encodeURIComponent(val);
}

function decode(val) {
  return decodeURIComponent(val);
}

function type(obj) {
  return Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase();
}

function isJson(str) {
  try {
    str = JSON.parse(str);
    if (type(str) === 'object') {
      return true;
    }
  } catch (e) {
    return false;
  }

  return false;
}

export default {
  set(key, value, options = {}) {
    if (type(key) === 'object') {
      Object.keys(key).forEach(element => {
        this.set(element, key[element], value);
      });
    } else {
      // value to json
      if (type(value) === 'object') {
        try {
          value = JSON.stringify(value);
        } catch (e) {
          console.error('value should be string');
        }
      }

      let cookieText = encode(key) + '=' + encode(value);

      // IE8 不支持 max-age
      if (options.expires) {
        let expires;
        let maxAge;
        switch (type(options.expires)) {
          case 'number':
            expires = new Date();
            expires.setTime(expires.getTime() + options.expires * 1000);

            maxAge = options.expires;

            break;
          case 'string':
            expires = new Date(expires);
            maxAge = (expires - new Date()) / 1000;
            break;
          default:
            expires = options.expires;
            maxAge = (options.expires - new Date()) / 1000;
        }

        cookieText +=
          '; expires=' + expires.toUTCString() + '; max-age=' + maxAge;
      }

      if (options.path) {
        cookieText += '; path=' + options.path;
      }

      if (options.domain) {
        cookieText += '; domain=' + options.domain;
      }

      if (options.secure) {
        cookieText += '; secure';
      }

      document.cookie = cookieText;
    }

    return this;
  },

  get(key) {
    const cookies = this.getAll() || {};

    if (type(key) === 'array') {
      const result = {};
      const len = key.length;

      for (let i = 0; i < len; i++) {
        result[key[i]] = cookies[key[i]];
      }

      return result;
    }

    return cookies[key];
  },

  getAll() {
    if (document.cookie === '') return null;

    const cookies = document.cookie.split('; ');
    const len = cookies.length;
    const result = {};

    for (let i = 0; i < len; i++) {
      const cookie = cookies[i].split('=');
      const key = decode(cookie.shift());
      const value = cookie.join('=');

      result[key] = isJson(value) ? JSON.parse(value) : value;
    }

    return result;
  },

  remove(key) {
    if (type(key) === 'array') {
      const len = key.length;

      for (let i = 0; i < len; i++) {
        this.remove(key[i]);
      }
    } else {
      this.set(key, '', {
        maxAge: 0
      });
    }

    return this;
  },

  empty() {
    const cookies = this.getAll() || {};

    this.remove(Object.keys(cookies));
  },

  has(key) {
    const name = encode(key) + '=';

    return document.cookie.indexOf(name) > -1;
  },

  enabled() {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/cookieEnabled
    if (navigator.cookieEnabled) return true;

    const result = this.set('__test__', 'test').get('__test__') === 'test';

    this.remove('__test__');

    return result;
  }
};
