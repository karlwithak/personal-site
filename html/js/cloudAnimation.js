'use strict';

$(function(){
	$("body").css("background", "skyblue");
	var container = $(".container");
	container.css("background", "skyblue");
	var HEIGHT = $(window).height() - 20;
	var WIDTH = $(window).width() - 20;
	container.height(HEIGHT);

	function displayCloud() {
	    this.elem = $(this.display).appendTo(container).css({
	        'top': this.y + 'px',
	        'opacity': this.opacity
	    });
	    this.moveCloud();
	}

	function Cloud() {
	    this.display = '<img src="../img/cloud.png"/>';
	    this.elem = null;
	    this.y = 50 + (Math.random() * HEIGHT - 100);
	    this.right = (Math.random() < 0.5 ? true : false);
	    this.x = (this.right ? -111 : WIDTH + 111);
	    this.opacity = 0.15 + (Math.random() * 0.5);
	    this.speed = (0.5 + Math.random() * 1.9) * (this.right ? 1 : -1);
	    this.displayCloud = displayCloud;
	    this.moveCloud = moveCloud;
	    this.displayCloud();
	    $(this.elem).mouseover(function() {
	        var that = this;
	        $(this).fadeOut(1000).delay(1000);
	        setTimeout(function(){this.elem.remove();}, 1000);
	        cloudMaker();
		});
	}
	
	function cloudMaker() {
	    new Cloud();
	}
	
	function moveCloud() {
	    this.elem.css("left", this.x + "px");
	    this.x += this.speed;
	    var that = this;
	    if ((this.right && this.x > WIDTH + 55) || (!this.right && this.x < -111)) {
	        this.elem.css("display", "none");
	        this.elem.remove();
	        return;
	    } else {
	        setTimeout(function () {
	            that.moveCloud();
	        }, 40);
	    }
	}
	
	cloudMaker();
	cloudMaker();
	setInterval(function(){
	    cloudMaker();
	}, (WIDTH * 15) + Math.random() * 5000);
});