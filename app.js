(function() {
"use strict";

var DEFAULT_ROUTE = 'one';

var template = document.querySelector('#t');

template.pages = [
  {name: 'DD NEWS', hash: 'one',idv: 'https://www.youtube.com/embed/-XPmCkMIhFw'},
  {name: 'Headlines Today', hash: 'two',idv: 'https://www.youtube.com/embed/lApfFjP5R9g'},
  {name: 'Aajtak', hash: 'three',idv: 'https://www.youtube.com/embed/JckHthtSb5U'},
  // {name: 'Focus News', hash: 'four',idv: 'https://www.youtube.com/embed/iIzNNsebbrk'},
  // {name: 'TEZ', hash: 'five',idv: 'https://www.youtube.com/embed/McaDpXr1VCo'},
  // {name: 'Samachar24', hash: 'six',idv: 'https://www.youtube.com/embed/lKj8otgAGss'},
  // {name: 'RSTV', hash: 'seven',idv: 'https://www.youtube.com/embed/8miLVrBQlIM'},
  // {name: 'Samachar241', hash: 'eight',idv: 'https://www.youtube.com/embed/-XPmCkMIhFw'}
];

template.addEventListener('template-bound', function(e) {
  var keys = document.querySelector('#keys');

  // Allow selecting pages by num keypad. Dynamically add
  // [1, template.pages.length] to key mappings.
  var keysToAdd = Array.apply(null, template.pages).map(function(x, i) {
    return i + 1;
  }).reduce(function(x, y) {
    return x + ' ' + y;
  });
  keys.keys += ' ' + keysToAdd;

  this.route = this.route || DEFAULT_ROUTE; // Select initial route.
});

template.keyHandler = function(e, detail, sender) {
  var pages = document.querySelector('#pages');

  // Select page by num key. 
  var num = parseInt(detail.key);
  if (!isNaN(num) && num <= this.pages.length) {
    pages.selectIndex(num - 1);
    return;
  }

  switch (detail.key) {
    case 'left':
    case 'up':
      pages.selectPrevious();
      break;
    case 'right':
    case 'down':
      pages.selectNext();
      break;
    case 'space':
      detail.shift ? pages.selectPrevious() : pages.selectNext();
      break;
  }
};

template.cyclePages = function(e, detail, sender) {
  // Click clicks should navigate and not cycle pages.
  if (e.path[0].localName == 'a') {
    return;
  }

  e.shiftKey ? sender.selectPrevious(true) : sender.selectNext(true);
};

template.menuItemSelected = function(e, detail, sender) {
  if (detail.isSelected) {
    document.querySelector('#scaffold').closeDrawer();
  }
};

})();



