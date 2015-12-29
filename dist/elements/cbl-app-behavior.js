"use strict";

Polymer.CblAppBehavior = {
  properties: {
    user: {
      type: Object,
      notify: true,
      value: function value() {
        return Parse.User.current();
      }
    }
  }
};