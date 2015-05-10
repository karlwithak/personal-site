'use strict';

$(function(){
	var container = $(".container");
	var HEIGHT = $(window).height();
	var WIDTH = $(window).width();

    function Cloud() {
        this.reset(true);
    }

    Cloud.prototype.display = '<img src="/img/cloud.png"/>';

	Cloud.prototype.displayCloud = function() {
        if (!this.elem) {
            this.elem = $(this.display).appendTo(container);
            var _this = this;
            $(this.elem).mouseover(function() {
                $(this).fadeOut(1000, function() {
                    clearTimeout(_this.timeout);
                    _this.reset(false);
                });
            })
        }
        this.elem.css({
            'top': this.y + 'px',
            'opacity': this.opacity
        });
        $(this.elem).show();
	};

    Cloud.prototype.reset = function(firstTime) {
        this.right = Math.random() < 0.5;
        if (firstTime) {
            this.x = Math.random() * WIDTH;
        } else {
            this.x = (this.right ? -110 : WIDTH + 110);
        }
        this.y = Math.random() * (HEIGHT - 100);
        this.opacity = 0.15 + (Math.random() * 0.3);
        this.speed = (0.5 + Math.random()) * (this.right ? 1 : -1);
        this.displayCloud();
        this.moveCloud();
    };

	Cloud.prototype.moveCloud = function() {
	    this.elem.css("left", this.x + "px");
	    this.x += this.speed;
	    if ((this.right && this.x > WIDTH + 55) || (!this.right && this.x < -111)) {
            clearTimeout(this.timeout);
            this.reset(false);
        }
        var _this = this;
        this.timeout = setTimeout(function () {
            _this.moveCloud();
        }, 40);
    };

    for (var i = 0; i < 6; i++) {
        new Cloud();
    }
});