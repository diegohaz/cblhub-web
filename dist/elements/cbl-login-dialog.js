'use strict';

Polymer({
  is: 'cbl-login-dialog',

  behaviors: [Polymer.CblAppBehavior],

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

    Parse.User.logIn(this.email, this.password).then(function () {
      _this.user = Parse.User.current();
      _this.$.dialog.cancel();
    }, function (error) {
      if (error.code == 101) {
        _this.$.emailInput.focus();
        _this.$.emailInput.invalid = true;
        _this.$.passwordInput.invalid = true;
        _this.$.toast.text = 'E-mail or password wrong';
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