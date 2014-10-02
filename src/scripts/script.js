/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransitions-cssclasses-testprop-testallprops-domprefixes
 */
;window.Modernizr=function(a,b,c){function x(a){j.cssText=a}function y(a,b){return x(prefixes.join(a+";")+(b||""))}function z(a,b){return typeof a===b}function A(a,b){return!!~(""+a).indexOf(b)}function B(a,b){for(var d in a){var e=a[d];if(!A(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function C(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:z(f,"function")?f.bind(d||b):f}return!1}function D(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return z(b,"string")||z(b,"undefined")?B(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),C(e,b,c))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v={}.hasOwnProperty,w;!z(v,"undefined")&&!z(v.call,"undefined")?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&z(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.csstransitions=function(){return D("transition")};for(var E in p)w(p,E)&&(u=E.toLowerCase(),e[u]=p[E](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)w(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},x(""),i=k=null,e._version=d,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return B([a])},e.testAllProps=D,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+s.join(" "):""),e}(this,this.document);

$(document).ready(function() {
  var feed_masonry_options = {
    columnWidth: '.post-narrow',
    itemSelector: '.post',
    gutter: '.post-gutter'
  };

  $('.profile-cover-image').on('dragstart', function(event) {
    event.preventDefault();
  });

  $('.miniprof-toggle').click(function(event) {
    $('body').toggleClass('miniprof-visible');
    event.preventDefault();
    if (!Modernizr.csstransitions) {
      $('.feed').masonry(feed_masonry_options);
    }
  });

  $('.main-content').on('transitionend', function() {
    $('.feed').masonry(feed_masonry_options);
  });

  $('.miniprof-photos-slider').bxSlider({
    slideMargin: 10,
    auto: false,
    slideWidth: 40,
    minSlides: 4,
    maxSlides: 5,
    moveSlides: 1,
    pager: false,
    prevText: '&lt;',
    nextText: '&gt;'
  });

  $('.miniprof-video-slider').bxSlider({
    auto: false,
    pager: false,
    prevText: '&lt;',
    nextText: '&gt;'
  });

  $('.feed').masonry(feed_masonry_options);

  $('.feed').masonry('bindResize');

  imagesLoaded('.feed', function() {
    $('.feed').masonry(feed_masonry_options);
  });

  function reclampExtLink(narrow) {
    $('.ext-link-title').each(function(index, element) {
      if ($(element).parents('.post-wide').length) {
        $clamp(element, { clamp: narrow ? 'auto' : 2, useNativeClamp: false });
      }
    });

    $('.ext-link-desc').each(function(index, element) {
      if ($(element).parents('.post-wide').length) {
        $clamp(element, { clamp: narrow ? 'auto' : 3, useNativeClamp: false });
      }
    });
  }

  if (window.matchMedia) {
    var mq = window.matchMedia('(max-width: 700px)');
    mq.addListener(onExtLinkBreakpoint);
    onExtLinkBreakpoint(mq);
  } else {
    reclampExtLink();
  }

  function onExtLinkBreakpoint(mq) {
    reclampExtLink(mq.matches);
  }
});

