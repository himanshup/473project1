$(document).ready(function () {
	$('a').click(function () {
		var divId = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(divId).offset().top - 100
		}, 100);
	});

	window.sr = ScrollReveal({
		reset: true,
		delay: 200,
		mobile: true,
		easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
	});
	sr.reveal('.foo');
	sr.reveal('.bar');
});