'use strict';

(function () {

  Polymer({

    is: 'cbl-dialog',

    behaviors: [CBLAppBehavior, Polymer.PaperDialogBehavior, Polymer.NeonAnimationRunnerBehavior],

    properties: {
      heading: {
        type: String
      },
      confirmLabel: {
        type: String,
        value: 'Save'
      },
      dismissLabel: {
        type: String,
        value: 'Cancel'
      }
    },

    listeners: {
      'neon-animation-finish': '_onNeonAnimationFinish',
      'iron-overlay-closed': '_onClose'
    },

    ready: function ready() {
      this.animationConfig = {
        'entry': [{
          name: 'transform-animation',
          node: this,
          transformFrom: 'translateY(100%)',
          transformTo: 'translateY(0)',
          timing: { duration: 250 }
        }, {
          name: 'fade-in-animation',
          node: this,
          timing: { duration: 250 }
        }],
        'exit': [{
          name: 'transform-animation',
          node: this,
          transformFrom: 'translateY(0%)',
          transformTo: 'translateY(100%)',
          timing: { duration: 250 }
        }, {
          name: 'fade-out-animation',
          node: this,
          timing: { duration: 250 }
        }]
      };
    },

    confirm: function confirm() {
      this.fire('cbl-dialog-confirm');
    },

    _renderOpened: function _renderOpened() {
      if (this.withBackdrop) {
        this.backdropElement.open();
      }
      this.playAnimation('entry');
    },

    _renderClosed: function _renderClosed() {
      if (this.withBackdrop) {
        this.backdropElement.close();
      }
      this.playAnimation('exit');
    },

    _onNeonAnimationFinish: function _onNeonAnimationFinish() {
      if (this.opened) {
        this._finishRenderOpened();
      } else {
        this._finishRenderClosed();
      }
    },

    _onClose: function _onClose() {
      if (this.closingReason.canceled) {
        this.back();
      }
    },

    back: function back() {
      if (page.params && page.params.overlay && page.params.overlay != page.current) {
        page(page.params.overlay);
      } else {
        page('/');
      }
    }

  });
})();