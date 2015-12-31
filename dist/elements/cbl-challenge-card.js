'use strict';

Polymer({
  is: 'cbl-challenge-card',

  behaviors: [Polymer.NeonAnimationRunnerBehavior, CBLAppBehavior],

  properties: {
    challenge: {
      type: String
    }
  }
});