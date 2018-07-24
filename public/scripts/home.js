$(document).ready(function () {
	window.sr = ScrollReveal({
		reset: true,
		delay: 200,
		mobile: true,
		easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
	});
	sr.reveal('.foo');
	sr.reveal('.bar');
});