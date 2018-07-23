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

	function generateBooks() {
		$.getJSON("books.json").done(function (result) {
			var numberOfBooks = result.length;
			//var percentage=0;

			remoteDB.initialize(numberOfBooks).then(function () {
				remoteDB.getAll().then(function (databaseBooks) {
					for (var i = 0; i < numberOfBooks; i++) {
						var book = result[i];
						var bookDB = databaseBooks[i];
						if (bookDB["total"] === 0) {
							percentage = 0;
						} else {
							percentage = Math.floor((bookDB["liked"] / bookDB["total"]) * 100)
						}
						generateHTML(book, percentage);
					}
				});
			});
		});
	}

	function generateHTML(book, percentage) {
		var $div = $('<div class="col-12 col-sm-6 col-md-4 col-lg-4 d-flex align-items-stretch"></div>');
		var $text = '<div class="card w-100 shadow"><img class="card-img-top example-card" src="' + book.imagePath + '"><div class="card-body"><h5 class="card-title bookTitle">' + book.title + '</h5><h6 class="card-subtitle mb-2 text-muted bookGenre">' + book.genre + '</h6></div><div class="card-footer"><small class="text-muted">' + percentage + '% liked this book</small></div></div></div>'
		$div.append($text);
		$(".row").append($div);
	}

})(window);