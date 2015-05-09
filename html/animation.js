
var url = $(location).attr('href');
url = url.split("?");
if (url[1] == "laser" || (!url[1] && Math.random() > 0.99)) {
	document.getElementById("corner1").style.display = "";
	var canvas = document.getElementById('tutorial');
	canvas.width = window.innerWidth - 10;
	canvas.height = window.innerHeight - 10;
	var ctx = canvas.getContext('2d');
	var WIDTH = canvas.width;
	var HEIGHT = canvas.height;
	var x = 1 + Math.random() * (WIDTH - 2);
	var y = 1 + Math.random() * (HEIGHT - 2);
	var xspeed = ( 8 + Math.random() * 1) * (Math.random > 0.5 ? -1 : 1);
	var yspeed = (8 + Math.random() * 1) * (Math.random > 0.5 ? -1 : 1);
	ctx.strokeStyle = "cyan";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(x, y);
	
	function draw(){
	    if (x > WIDTH - 1 || x < 1) xspeed *= -1;
	    if (y > HEIGHT - 1 || y < 1) yspeed *= -1;  
	    ctx.lineTo(x += xspeed,y += yspeed);
	    ctx.stroke();
	}
	setInterval(draw, 25);
}


else if (url[1] == "clouds" || (!url[1] && Math.random() < 0.99)) {
	$("#corner2").show();
	$("body").css("background", "skyblue");
	var container = $(".container");
	container.css("background", "skyblue");
	container.children("canvas").remove();
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
	    this.display = '<img src="cloud.png"/>';
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
}

//Rainbow scroller
else {
	$("#corner3").show();
	var mainContainer = $(".container");
	mainContainer.children("canvas").remove();
	mainContainer.children().clone().appendTo($("body")).css("font-family", "courier new, monospace");
	mainContainer.remove();
	var HEIGHT = $(window).height();
	mainContainer.height(HEIGHT);
	var container = $("#rainbowContainer");
	$("#rainbowContent").css("display", "");
	$("#rainbowContent").height($(window).height());
	container.scrollTop(50);
	container.scroll(function() {
		 if (container.scrollTop()  > 800) {      
			 var child = container.children(":first");
	   	     container.append(child);
   	    	 container.scrollTop( container.scrollTop()-600);
   		 }    
   		 if (container.scrollTop()  < 50) {
			 var child =  container.children(":last");
			 container.prepend(child);
			 container.scrollTop( container.scrollTop()+600);
  		 }
	});
}
