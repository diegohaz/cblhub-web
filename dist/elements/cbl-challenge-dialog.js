'use strict';

Polymer({
  is: 'cbl-challenge-dialog',

  behaviors: [Polymer.CblAppBehavior],

  listeners: {
    'iron-form-presubmit': 'submit',
    'cbl-dialog-confirm': 'submit'
  },

  ready: function ready() {
    var _this = this;

    var helps = ['bigIdeaHelp', 'essentialQuestionHelp', 'challengeHelp'];

    helps.forEach(function (help) {
      _this.$[help].addEventListener('click', function () {
        _this.toggleTip(help.replace('Help', 'Tip'));
      });
    });
  },

  toggleTip: function toggleTip(id) {
    var _this2 = this;

    var tips = ['bigIdeaTip', 'essentialQuestionTip', 'challengeTip'];

    tips.forEach(function (tip) {
      if (tip == id) {
        _this2.$[tip].toggle();
      } else {
        _this2.$[tip].hide();
      }
    });
  },

  submit: function submit(event) {
    var _this3 = this;

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
      _this3.$.toast.open();
    }).always(function () {
      _this3.loading = false;
    });
  },

  open: function open() {
    this.$.dialog.open();
  },

  close: function close() {
    this.$.dialog.close();
  }
});