'use strict';

Polymer({
  is: 'cbl-panel',

  behaviors: [CBLAppBehavior],

  properties: {
    tab: {
      type: Number,
      notify: true,
      value: 0
    },
    items: {
      type: Array,
      value: ['dsahjkdhsajk', 'dsahjkdhjsada', 'dsuiaydiayd7a dad ayd iady ukahdjksa dshakj dhjka ', 'ewqdauh uidhua', 'dsahudhsaiudhsada', 'dsaudhauida', 'dhsauidhwyqeq']
    }
  },

  listeners: {
    'iron-select': '_onIronSelect'
  },

  _onIronSelect: function _onIronSelect() {
    var _this = this;

    this.items = [];
    this.loading = true;

    this.async(function () {
      var lol = [];
      for (var i = 0; i < 30; i++) {
        var haha = 'sdsa d ';
        var rand = Math.random() * 5;
        for (var j = 0; j < rand; j++) {
          haha += haha;
        };

        lol.push(haha);
      }

      _this.items = lol;
      _this.$.grid.arrange();
      _this.$.grid.play();
      _this.loading = false;
    }, 1000);
  }
});