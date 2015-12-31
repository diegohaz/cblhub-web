'use strict';

Polymer({
  is: 'cbl-signup-dialog',

  behaviors: [CBLAppBehavior],

  properties: {
    email: {
      type: String,
      notify: true
    }
  },

  listeners: {
    'iron-form-presubmit': 'submit',
    'cbl-dialog-confirm': 'submit'
  },

  submit: function submit(event) {
    var _this = this;

    if (!this.$.form.validate()) return;

    event && event.preventDefault();

    this.loading = true;
    var user = new Parse.User();

    user.set('name', this.displayName);
    user.set('email', this.email);
    user.set('username', this.email);
    user.set('password', this.password);

    user.signUp().then(function () {
      _this.user = Parse.User.current();
      _this.$.dialog.cancel();
    }, function (error) {
      if (error.code == 202) {
        _this.$.emailInput.focus();
        _this.$.emailInput.invalid = true;
        _this.$.toast.text = 'E-mail already registered';
      }

      _this.$.toast.open();
    }).always(function () {
      _this.loading = false;
    });
  },

  open: function open() {
    this.$.dialog.open();
  },

  close: function close() {
    this.$.dialog.close();
  }
});