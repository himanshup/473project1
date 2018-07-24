(function (window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function DataBase(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }

  DataBase.prototype.submitBook = function () {
    var template = {
      "Name": $("#title").val(),
      "Author": $("#author").val(),
      "comment": $("#comment").val()
    };
    return $.post(this.serverUrl, template);
  }

  DataBase.prototype.initialize = function (numberOfBooks) {
    var url = this.serverUrl;
    return $.get(url, function (serverResponse) {
      if (serverResponse.length < numberOfBooks) {
        var difference = numberOfBooks - serverResponse.length;
        var template = {
          "bookId": 0,
          "liked": 0,
          "total": 0
        };
        for (var i = 0; i < difference; i++) {
          template.bookId = i;
          $.post(url, template);
        }
      }
    });
  };

  DataBase.prototype.getAll = function () {
    return $.get(this.serverUrl);
  };

  DataBase.prototype.getBookInfo = function (bookId) {
    return $.get(this.serverUrl + "?bookId=" + bookId);
  };

  DataBase.prototype.updateLiked = function (bookId) {
    var url = this.serverUrl;
    $.get(url + "?bookId=" + bookId, function (serverResponse) {
      var id = serverResponse[0].id;
      var liked = serverResponse[0].liked;
      var total = serverResponse[0].total;
      liked++;
      total++;
      var newData = {
        "id": id,
        "liked": liked,
        "total": total
      };
      $.post(url, newData);
    });
  };

  DataBase.prototype.updateDislike = function (bookId) {
    var url = this.serverUrl;
    $.get(url + "?bookId=" + bookId, function (serverResponse) {
      var id = serverResponse[0].id;
      var total = serverResponse[0].total;
      total++;
      var newData = {
        "id": id,
        "total": total
      };
      $.post(url, newData);
    });
  };

  App.DataBase = DataBase;
  window.App = App;
})(window);