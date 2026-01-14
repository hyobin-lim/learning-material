//Metal Reflection
$(function() {
	
	function metMouseMoveX(argSelector, argSpedX) {
		const metalSelector = document.querySelectorAll(argSelector);

		metalSelector.forEach( function (item) {
			var metItemWidth = item.clientWidth;
			item.addEventListener('mousemove', function (event) {
				var metalTransX = event.clientX - metItemWidth;

				const metalTranslateXParallax = item.children;
				const metalTranslateX = $('.faux-metal');
				//xPercent = parseInt(event.clientX / item.offsetWidth * 100);
				var relX = event.pageX - $(this).offset().left;
				var relY = event.pageY - $(this).offset().top;
				var xPercent = relX / $(this).outerWidth(true) * 100;
				var yPercent = relY / $(this).outerHeight(true) * 100;

				for (var i = 0; i < metalTranslateX.length; i++) {
					//metalTranslateX[i].style.transform = 'translateX(' + metalTransX / (argSpedX * (metalTranslateX.length - i)) + 'px)  rotate(0.01deg)';
					//metalTranslateX[i].style.backgroundPosition = metalTransX / (argSpedX * (metalTranslateX.length - i) + argSpedX + 15) + '% 100%';
					metalTranslateX[i].style.backgroundPosition = xPercent + '% 100%';
					metalTranslateX[i].style.transform = 'rotate(0.01deg)';
					//metalTranslateXParallax[i].style.transform = 'translateX(' + metalTransX / (argSpedX * (metalTranslateXParallax.length - i)) + 'px)  rotate(0.01deg)';
					item.classList.add('active');
				}
			});
			
			item.addEventListener('mouseout', function (event) {
				const metalTranslateXParallax = item.children;
				var metalTransX = event.clientX - metItemWidth;
				//const metalTranslateX = item.children;
				
				const metalTranslateX = $('.faux-metal');
				for (var i = 0; i < metalTranslateX.length; i++) {
					item.classList.remove('active');
					metalTranslateX[i].style.backgroundPosition = '100% 100%';
					metalTranslateX[i].style.transform = 'rotate(0.00deg)';
					//metalTranslateXParallax[i].style.transform = 'translateX(0px) rotate(0.00deg)';
				}
			});
		});
    }

    metMouseMoveX('.faux-metal', -75);
});