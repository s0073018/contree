angular.module('modService')

.service('persistService',function () {

    function isLS() {
        if (window.localStorage) {
            return true;
        } else {
            return false;
        }
    }

    var get = function (key) {
        var ret = null;

        try{
            if (isLS() == true) {
                var ls = localStorage[key];
                if ((ls != null) && (ls != undefined)) {
                    ret = JSON.parse(ls);
                }
            }
            else {
                var c = getFromCookies(key);
                if (c != null){
                    ret = JSON.parse(c);
                }
            }
        }
        catch(ex){}
        return (ret);
    }

    var set = function (key,val) {
        try{
            if (isLS() == true) {
                localStorage[key] = JSON.stringify(val);
            }
            else {
                addToCookies(key, JSON.stringify(val));
            }
        }
        catch(ex){}
    }

    var remove = function (key) {
        if (isLS() == true) {
            localStorage.removeItem(key);
        }
        else {
            removeFromCookies(key);
        }
    }

    var addToCookies = function (key, value) {

        if (typeof value == "undefined") return false;

        try {
            var delai = 100;
            var expiryDate = new Date();
          if (value === null) {
            delai = -1;
            value = '';
          }
      
          var expiration_date = new Date();
         

          expiryDate.setTime(expiryDate.getTime() + (delai*24*60*60*1000));
          var expiry = "; expires="+expiryDate.toGMTString();
      
          if (!!key) {
              document.cookie = key + "=" + encodeURIComponent(value) + expiry + "; path=/";
          }
        } catch (e) {
          return false;
        }
        return true;
  };

    var getFromCookies = function (key) {
    
    var cookies = document.cookie.split(';');
    for(var i=0;i < cookies.length;i++) {
      var thisCookie = cookies[i];
      while (thisCookie.charAt(0)==' ') {
        thisCookie = thisCookie.substring(1,thisCookie.length);
      }
      if (thisCookie.indexOf(key+'=') === 0) {
        return decodeURIComponent(thisCookie.substring(key.length+1,thisCookie.length));
      }
    }
    return null;
  };

    var removeFromCookies = function (key) {
    addToCookies(key,null);
  };

    return {
          set: set,
          get: get,
          remove: remove
    };

});
