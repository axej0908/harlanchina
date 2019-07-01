;(function(doc, win) {
    var docEl = doc.documentElement,
	resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
	recalc = function() {
		win.clientWidth = docEl.clientWidth;
		if(!win.clientWidth) return;
		win.base = 40 * (win.clientWidth / 750);
		docEl.style.fontSize = win.base + 'px';
	};
	recalc();
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

