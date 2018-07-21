// animateCss function does the animation one time and then something after
$.fn.extend({
	animateCss: function (animationName, callback) {
		var animationEnd = (function (el) {
			var animations = {
				animation: 'animationend',
				OAnimation: 'oAnimationEnd',
				MozAnimation: 'mozAnimationEnd',
				WebkitAnimation: 'webkitAnimationEnd',
			};

			for (var t in animations) {
				if (el.style[t] !== undefined) {
					return animations[t];
				}
			}
		})(document.createElement('div'));

		this.addClass('animated ' + animationName).one(animationEnd, function () {
			$(this).removeClass('animated ' + animationName);

			if (typeof callback === 'function') callback();
		});

		return this;
	},
});

var counter = 0;

(function (window) {
	var $ = window.jQuery;
	var SERVER_URL = 'http://localhost:2403/books';
	var App = window.App;
	var DataBase = App.DataBase;
	var remoteDB = new DataBase(SERVER_URL);

	generateBooks();
	checkClick();

	function generateBooks() {
		$.getJSON('example.json').done(function (result) {
			var numberOfBooks = result.length;
			remoteDB.initialize(numberOfBooks).then(function () {
				remoteDB.getAll().then(function (databaseBooks) {
					for (var i = numberOfBooks - 1; i < numberOfBooks; i--) {
						var book = result[i];
						generateHTML(book);
					}
				});
			});
		});
	}

	function generateHTML(book, bookDB) {
		var $div = $('<div class="tinder-card" id="book' + book.id + '"></div>');
		var $text = '<div class="card" style="width: 20rem; height: 37rem;"><img class="card-img-top" src="' + book.imagePath + '">';
		$text += '<div class="card-body">' + '<h5 class="card-title">' + book.title + "</h5>";
		// $text += '<p class="card-text">' + book.author + "</p>";
		$text += '<h6 class="card-subtitle mb-2 text-muted">' + book.genre + '</h6>' + '</div></div>';
		$div.append($text);
		$("#tinder").append($div);
	}

	function checkNumOfBooks() {
		if (document.getElementsByClassName('tinder-card').length === 0) {
			document.getElementById('no-cards').style.visibility = "visible";
			$('.tinder-buttons').animateCss('fadeOut', function () {
				document.querySelector('.tinder-buttons').style.visibility = "hidden";
			});
			$('.alert').animateCss('fadeOut', function () {
				document.querySelector('.alert').style.visibility = "hidden";
			});
			document.getElementById('reset-button').addEventListener('click', function () {
				window.location.reload();
			});
		}
	}

	function like() {
		document.getElementById('book' + counter).remove();
		counter++;
		remoteDB.updateLiked($('#book').val());
		$('#book').val(function (i, oldval) {
			return ++oldval;
		});
		checkNumOfBooks();
	}

	function dislike() {
		document.getElementById('book' + counter).remove();
		counter++;
		remoteDB.updateDislike($('#book').val());
		$('#book').val(function (i, oldval) {
			return ++oldval;
		});
		checkNumOfBooks();
	}

	function checkClick() {
		document.getElementById('likeBtn').addEventListener('click', function () {
			if (document.getElementsByClassName('tinder-card').length === 2) {
				$('#book' + counter).animateCss('rotateOutUpRight', function () {
					like();
				});
				$('#tinder-shadow').animateCss('rotateOutUpRight', function () {
					document.getElementById('tinder-shadow').remove();
					checkNumOfBooks();
				});
			} else {
				$('#book' + counter).animateCss('rotateOutUpRight', function () {
					like();
				});
			}
		});

		document.getElementById('dislikeBtn').addEventListener('click', function () {
			if (document.getElementsByClassName('tinder-card').length === 2) {
				$('#book' + counter).animateCss('rotateOutUpLeft', function () {
					dislike()
					checkNumOfBooks();
				});
				$('#tinder-shadow').animateCss('rotateOutUpLeft', function () {
					document.getElementById('tinder-shadow').remove();
					checkNumOfBooks();
				});
			} else {
				$('#book' + counter).animateCss('rotateOutUpLeft', function () {
					dislike()
					checkNumOfBooks();
				});
			}
		});
	}

})(window);