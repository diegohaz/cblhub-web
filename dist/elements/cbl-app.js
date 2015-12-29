"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Parse.initialize("u4Sb7tV4jOqPNqD9nouqVQMgwQwEIemuOl2GPesc", "JWQuSPOojxH8vPHyAi9yNAWtNmgVibcjwoI2EtKu");

var App = (function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, [{
    key: "beforeRegister",
    value: function beforeRegister() {
      this.is = 'cbl-app';
    }
  }, {
    key: "ready",
    value: function ready() {
      var _this = this;

      // routing
      page('*', function (ctx, next) {
        var params = ctx.querystring.split('&').map(function (q) {
          return q.split('=');
        });
        page.params = page.params || {};

        params.forEach(function (p) {
          page.params[p[0]] = p[1];
        });

        next();
      });

      page('/', function () {});

      page('/login', function () {
        if (_this.user) return page.back();

        _this.async(function () {
          _this.$.loginDialog.open();
        }, 1);
      });

      page.exit('/login', function (ctx, next) {
        next();

        _this.async(function () {
          _this.$.loginDialog.close();
        }, 1);
      });

      page('/signup', function () {
        if (_this.user) return page.back();

        _this.async(function () {
          _this.$.signUpDialog.open();
        }, 1);
      });

      page.exit('/signup', function (ctx, next) {
        next();

        _this.async(function () {
          _this.$.signUpDialog.close();
        }, 1);
      });

      page('/challenges/create', function () {
        _this.async(function () {
          _this.$.challengeDialog.open();
        }, 1);
      });

      page.exit('/challenges/create', function (ctx, next) {
        next();

        _this.async(function () {
          _this.$.challengeDialog.close();
        }, 1);
      });

      page();
    }
  }]);

  return App;
})();

Polymer(App);