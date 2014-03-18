/**
	Scrollify helper using keyframes and transforms
	@author Marcin Strazynski
	@date 18.03.2014
*/

;(function () {		
	Element.prototype.scrollify = function (translateStyle, childSelector) {
		var outer = this.clientWidth,
			translateStyle = translateStyle || 'translateX',
			inner = this.querySelector(childSelector || '.inner').scrollWidth,
			scrollifyRegexp = /(scrollify-\d+)/g,
			duration = 10, cssName, time;
		
		if (this.querySelector(childSelector || '.inner').className.match(scrollifyRegexp)) {
			return;
		}

		if (translateStyle === 'translateY') {
			outer = this.clientHeight;
			inner = this.querySelector(childSelector || '.inner').scrollHeight;
		}

		if (inner / outer) {
			time = duration * (inner - outer) / outer;
			cssName = createCSSRule(time, translateStyle);
			this.querySelector(childSelector || '.inner').classList.add(cssName);
			this.querySelector(childSelector || '.inner').classList.add('no-overflow');
		}

		return {
			name: cssName,
			time: time,
			duration: duration,
			inner: inner,
			outer: outer
		}
	};

	Element.prototype.stopScrollify = function (childSelector) {
		var scrollifyRegexp = /(scrollify-\d+)/g,
			child = this.querySelector(childSelector || '.inner'),
			that = this,
			scrollName;

		if (!child.className.match(scrollifyRegexp)) {
			throw new TypeError('This element doesn\'t have scrollify -> ' + child.tagName.toLowerCase() + ': ' + child.className);
		}
		
		scrollName = child.className.match(scrollifyRegexp).toString();

		removeCSSFromHead(scrollName);
		child.classList.remove(scrollName);
		child.classList.remove('no-overflow');		
	};

	function removeCSSFromHead(selector) {
		var head = document.querySelector('head');
		head.removeChild(head.querySelector('#' + selector));
	}

	function createCSSRule(time, translateStyle) {
		var cssAnimation = document.createElement('style'),
			moveFor = translateStyle === 'translateY' ? '-90%' : '-200%',
			singleRule, singleRuleName;
		cssAnimation.type = 'text/css';
		cssAnimation.id = 'scrollify-' + (new Date().getTime());
		singleRuleName = 'scrollify-' + (new Date().getTime());
		singleRule = document.createTextNode('.' + singleRuleName + ' {\n' + 
			'\t-webkit-animation: ' + singleRuleName + ' ' + time + 's;\n' +
			'\t-webkit-animation-iteration-count: infinite;' + 
		'}');
		cssAnimation.appendChild(singleRule);
		singleRule = '@-webkit-keyframes ' + singleRuleName + ' {\n';
		singleRule += '\t0% { \n\t\t -webkit-transform: '+ translateStyle + '(0);\n\t}\n'
		singleRule += '\t50% { \n\t\t -webkit-transform: ' + translateStyle + '(' + moveFor + ');\n\t}\n'
		singleRule += '\t100% { \n\t\t -webkit-transform: ' + translateStyle + '(0);\n\t}\n'
		singleRule += '}';
		singleRule = document.createTextNode(singleRule);
		cssAnimation.appendChild(singleRule);
		document.getElementsByTagName('head')[0].appendChild(cssAnimation);
		return singleRuleName;
	}
})();