(function (window) {
    "use strict";
    var $ = window.jQuery;
    var SERVER_URL = "http://localhost/books";
    var App = window.App;
    var DataBase = App.DataBase;
    var remoteDB = new DataBase(SERVER_URL);

    $.getJSON("example.json").done(function (result) {
        var numberOfBooks = result.length;
        remoteDB.initialize(numberOfBooks); //Use this to initialize the database
        for (var i = numberOfBooks - 1; i < numberOfBooks; i--) {
            var book = result[i];
            GenerateHTML(book);
        }
    });

    function GenerateHTML(book) {
        var $div = $('<div class="tinder-card"></div>');
        var $text = '<div class="card" style="width: 20rem; height: 36rem;"><img class="card-img-top" src="/' + book.imagePath + '">';
        $text += '<div class="card-body">' + '<h5 class="card-title">' + book.title + "</h5>";
        // $text += '<p class="card-text">' + book.summary + "</p>";
        $text += '<h6 class="card-subtitle mb-2 text-muted">' + book.genre + '</h6>' + '</div></div>';
        $div.append($text);
        $("#tinder").append($div);
    }

    document.getElementById("dislikeBtn").addEventListener("click", function () {
        remoteDB.updateDislike($("#book").val());
    });
    document.getElementById("likeBtn").addEventListener("click", function () {
        remoteDB.updateLiked($("#book").val());
    });
    
})(window);