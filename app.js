(function() {
"use strict";

var DEFAULT_ROUTE = 'one';

var template = document.querySelector('#t');

template.pages = [
  {name: 'DD NEWS', hash: 'one',idv: 'https://www.youtube.com/embed/q1PtGqyDpCM'},
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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-61323769-2', 'auto');
ga('send', 'pageview');

