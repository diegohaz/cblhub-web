'use strict';

Polymer({
  is: 'cbl-grid',

  behaviors: [Polymer.NeonAnimationRunnerBehavior],

  properties: {
    animationConfig: {
      type: Object,
      value: function value() {
        return {
          'entry': [{
            name: 'cascaded-animation',
            animation: 'transform-animation',
            transformFrom: 'translateY(100%)',
            transformTo: 'none'
          }]
        };
      }
    }
  },

  attached: function attached() {
    var _this = this;

    this.arrange();

    this.play();

    window.addEventListener('resize', function () {
      _this.arrange();
    });
  },

  play: function play() {
    this.async(function () {
      var nodeList = Polymer.dom(this).node.children;
      this.animationConfig['entry'][0].nodes = Array.prototype.slice.call(nodeList);
      this.playAnimation('entry');
    });
  },

  arrange: function arrange() {
    Polymer.dom.flush();

    var container = Polymer.dom(this).node;
    var items = container.children;

    var margin = function margin(name, item) {
      var style = window.getComputedStyle(item);
      return parseFloat(style['margin' + name]) || 0;
    };

    var sort = function sort(list) {
      list = list.sort(function (a, b) {
        return bottom(a) === bottom(b) ? x(b) - x(a) : bottom(b) - bottom(a);
      });
    };

    var px = function px(n) {
      return n + 'px';
    };
    var y = function y(item) {
      return parseFloat(item.style.top);
    };
    var x = function x(item) {
      return parseFloat(item.style.left);
    };
    var width = function width(item) {
      return item.clientWidth;
    };
    var height = function height(item) {
      return item.clientHeight;
    };
    var bottom = function bottom(item) {
      return y(item) + height(item) + margin('Bottom', item);
    };
    var right = function right(item) {
      return x(item) + width(item) + margin('Right', item);
    };

    var boundary = [];

    // First item
    if (items.length) {
      items[0].style.top = 0;
      items[0].style.left = 0;
      boundary.push(items[0]);
    }

    // First line
    for (var i = 1; i < items.length; i++) {
      var prev = items[i - 1];
      var item = items[i];
      var hasSpace = right(prev) + width(item) <= width(container);

      if (!hasSpace) break;

      item.style.top = prev.style.top;
      item.style.left = px(right(prev) + margin('Left', item));
      boundary.push(item);
    }

    // Place following elements at the bottom of the smallest column.
    for (; i < items.length; i++) {
      sort(boundary);
      var item = items[i];
      var minItem = boundary.pop();

      item.style.top = px(bottom(minItem) + margin('Top', item));
      item.style.left = px(x(minItem));
      boundary.push(item);
    };

    sort(boundary);

    var maxItem = boundary[0];
    container.style.height = px(bottom(maxItem) + margin('Bottom', maxItem));
  }
});