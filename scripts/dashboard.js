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

// animateCss function will do something after the animation
$('#tinder').animateCss('fadeIn');
$('#likeBtn').animateCss('bounceInUp');
$('#dislikeBtn').animateCss('bounceInUp');
$('.alert-secondary').animateCss('fadeInUpBig');

$('#likeBtn').click(function () {
    if (document.getElementsByClassName("tinder-card").length === 2) {
        $("#card1").animateCss("rotateOutUpRight", function () {
            $("#card1").remove();
            $("#card1").animateCss("rotateOutUpRight");
        });
        $(".tinder-shadow").remove();
    } else {
        $("#card1").animateCss("rotateOutUpRight", function () {
            $("#card1").remove();
            $("#card1").animateCss("rotateOutUpRight");
        });
    }
});

$('#dislikeBtn').click(function () {
    $("#card1").animateCss("rotateOutUpLeft", function () {
        $("#card1").remove();
    });
});
