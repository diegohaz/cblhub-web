'use strict';

Polymer({
  is: 'cbl-challenge-dialog',

  behaviors: [CBLAppBehavior],

  listeners: {
    'iron-form-presubmit': 'submit',
    'cbl-dialog-confirm': 'submit'
  },

  submit: function submit(event) {
    var _this = this;

    event && event.preventDefault();

    if (!this.$.form.validate()) return;

    if (!this.user) {
      page('/login?overlay=/challenges/create');
      return;
    }

    this.loading = true;
    var challenge = new Parse.Object('Challenge');

    challenge.set('title', this.challenge);
    challenge.set('description', this.description);
    challenge.set('bigIdea', this.bigIdea);
    challenge.set('essentialQuestion', this.essentialQuestion);

    challenge.save().then(function (challenge) {
      page('/challenges/' + challenge.id);
    }, function (error) {
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
  },

  _focus: function _focus(e) {
    var input = e.target;
    var tip = this.$[input.id.replace('Input', 'Tip')];

    tip.show();
  },

  _blur: function _blur(e) {
    var input = e.target;
    var tip = this.$[input.id.replace('Input', 'Tip')];

    tip.hide();
  }
});