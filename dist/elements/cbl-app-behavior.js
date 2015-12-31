"use strict";

var CBLAppBehavior = {
  properties: {
    user: {
      type: Object,
      notify: true,
      value: function value() {
        return Parse.User.current();
      }
    },

    loading: {
      type: Boolean,
      notify: true,
      value: false
    }
  }
};