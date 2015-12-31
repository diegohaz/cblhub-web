'use strict';

Polymer({
  is: 'cbl-search-bar',

  properties: {
    query: {
      type: String,
      notify: true
    }
  },

  ready: function ready() {
    this.allKeywords = [];
    this._fetchKeywords();
    this.focused = false;
    this.$.keywordsMenu.hidden = true;

    this.$.searchInput.addEventListener('keyup', this._keyup.bind(this));
    this.$.searchInput.addEventListener('keydown', this._keydown.bind(this));
    this.$.searchInput.addEventListener('blur', this._blur.bind(this));
    this.$.searchInput.addEventListener('focus', this._focus.bind(this));
  },

  _fetchKeywords: function _fetchKeywords() {
    var _this = this;

    Parse.Cloud.run('listKeywords').then(function (keywords) {
      _this.allKeywords = keywords.map(function (k) {
        return k.keyword;
      });
      _this._searchKeywords('');
    });
  },

  _focus: function _focus() {
    this.$.keywordsMenu.hidden = false;
    this.focused = true;
  },

  _blur: function _blur() {
    var _this2 = this;

    this.$.keywordsMenu.select(-1);
    this.focused = false;

    this.async(function () {
      if (!_this2.focused) {
        _this2.$.keywordsMenu.hidden = true;
      }
    }, 100);
  },

  _keydown: function _keydown(e) {
    if (e.which == 40 || e.which == 38) {
      e.preventDefault();
    }
  },

  _selection: function _selection(e) {
    var searchInput = this.$.searchInput;
    var keywordsMenu = this.$.keywordsMenu;
    var selectedItem = e.currentTarget;
    var index = Number(keywordsMenu.indexOf(selectedItem));

    keywordsMenu.select(index);
    searchInput.focus();
  },

  _select: function _select(e) {
    var keywordsMenu = this.$.keywordsMenu;
    var selectedItem = e.currentTarget;
    var index = Number(keywordsMenu.indexOf(selectedItem));

    this.query = this.keywords[index];

    this.keywords = [];
    e.stopPropagation();
  },

  _keyup: function _keyup(e) {
    var searchInput = this.$.searchInput;
    var keywordsMenu = this.$.keywordsMenu;
    var selectedItem = keywordsMenu.focusedItem || keywordsMenu.selectedItem;
    var index = 0;

    if (e.which == 40) {
      //down
      if (typeof selectedItem != 'undefined') {
        index = Number(keywordsMenu.indexOf(selectedItem));
        index = Math.min(index + 1, this.keywords.length - 1);
      }

      keywordsMenu.select(index);
      searchInput.focus();
    } else if (e.which == 38) {
      //up
      if (typeof selectedItem != 'undefined') {
        index = Number(keywordsMenu.indexOf(selectedItem));
        index = Math.max(index - 1, -1);
        keywordsMenu.select(index);
      }

      searchInput.focus();
    } else if (e.which == 13) {
      // enter
      if (typeof selectedItem != 'undefined') {
        index = Number(keywordsMenu.indexOf(selectedItem));
        this.query = this.keywords[index];
        this.keywords = [];
        keywordsMenu.select(-1);
      }
    } else {
      // search
      this._searchKeywords(this.query.trim());
    }
  },

  _searchKeywords: function _searchKeywords(term) {
    this.keywords = [];

    if (term == '') {
      this.keywords = this.allKeywords.slice(0, 10);
      return;
    }

    var pattern = new RegExp(term.toLowerCase());

    for (var i = 0; i < this.allKeywords.length; i++) {
      if (this.keywords.length == 10) break;

      var keyword = this.allKeywords[i];

      if (pattern.test(keyword.toLowerCase())) {
        this.push('keywords', keyword);
      }
    }
  }

});