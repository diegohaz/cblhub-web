"use strict";

Parse.initialize("u4Sb7tV4jOqPNqD9nouqVQMgwQwEIemuOl2GPesc", "JWQuSPOojxH8vPHyAi9yNAWtNmgVibcjwoI2EtKu");
Polymer({
  is: 'cbl-app',

  behaviors: [CBLAppBehavior],

  properties: {
    page: {
      type: String,
      notify: true,
      value: '/'
    }
  },

  ready: function ready() {
    var _this = this;

    // routing
    // default
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

    // home
    page('/', function () {});

    // login
    page('/login', function () {
      if (_this.user) return page.back('/');
      _this.async(function () {
        _this.$.loginDialog.open();
      });
    });

    // exit login
    page.exit('/login', function (ctx, next) {
      next();
      _this.async(function () {
        _this.$.loginDialog.close();
      });
    });

    // signup
    page('/signup', function () {
      if (_this.user) return page.back();
      _this.async(function () {
        _this.$.signUpDialog.open();
      });
    });

    // exit signup
    page.exit('/signup', function (ctx, next) {
      next();
      _this.async(function () {
        _this.$.signUpDialog.close();
      });
    });

    // challenges/create
    page('/challenges/create', function () {
      _this.async(function () {
        _this.$.challengeDialog.open();
      });
    });

    // exit callenges/create
    page.exit('/challenges/create', function (ctx, next) {
      next();
      _this.async(function () {
        _this.$.challengeDialog.close();
      });
    });

    page('/questions', function () {});
    page('/activities', function () {});
    page('/resources', function () {});
    page('/contributors', function () {});

    page();
  }
});