'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layout = (function () {
  function Layout() {
    _classCallCheck(this, Layout);
  }

  _createClass(Layout, [{
    key: 'beforeRegister',
    value: function beforeRegister() {
      this.is = 'cbl-layout';
      this.behaviors = [Polymer.CblAppBehavior];
    }
  }, {
    key: 'ready',
    value: function ready() {
      console.log(this.user);
    }
  }, {
    key: 'logout',
    value: function logout() {
      var _this = this;

      Parse.User.logOut().then(function () {
        _this.user = null;
      });
    }
  }]);

  return Layout;
})();

Polymer(Layout);