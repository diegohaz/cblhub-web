'use strict';

Polymer({
  is: 'cbl-layout',

  behaviors: [CBLAppBehavior],

  logout: function logout() {
    var _this = this;

    Parse.User.logOut().then(function () {
      _this.user = null;
    });
  }
});