(function() {
	var canvas, ctx, width, height, bubbles, animateHeader = true;
	initHeader();
	function initHeader() {
		canvas = document.getElementById('header_canvas');
		window_resize();
		ctx = canvas.getContext('2d');
		//建立泡泡
		bubbles = [];
		var num = width * 0.04;//气泡数量
		for (var i = 0; i < num; i++) {
			var c = new Bubble();
			bubbles.push(c);
		}
		animate();
	}
	function animate() {
		if (animateHeader) {
			ctx.clearRect(0, 0, width, height);
			for (var i in bubbles) {
				bubbles[i].draw();
			}
		}
		requestAnimationFrame(animate);
	}
	function window_resize() {
		//canvas铺满窗口
		//width = window.innerWidth;
		//height = window.innerHeight;

        //如果需要铺满内容可以换下面这个
        var panel = document.getElementById('thumbnail_canvas');
		width=panel ? panel.offsetWidth : 0;
		height=panel ? panel.offsetHeight : 0;

		canvas.width = width;
		canvas.height = height;
	}
    window.onresize = function(){
        window_resize();
    }
	function Bubble() {
		var _this = this;
		(function() {
			_this.pos = {};
			init();
		})();
		function init() {
			_this.pos.x = Math.random() * width;
			_this.pos.y = height + Math.random() * 100;
			_this.alpha = 0.1 + Math.random() * 0.3;//气泡透明度
			_this.alpha_change = 0.0002 + Math.random() * 0.0005;//气泡透明度变化速度
			_this.scale = 0.2 + Math.random() * 0.2;//气泡大小
			_this.scale_change = Math.random() * 0.002;//气泡大小变化速度
			_this.speed = 0.1 + Math.random() * 1.5;//气泡上升速度
		}
		//气泡
		this.draw = function() {
			if (_this.alpha <= 0) {
				init();
			}
			_this.pos.y -= _this.speed;
			_this.alpha -= _this.alpha_change;
			_this.scale += _this.scale_change;
			ctx.beginPath();
			ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
			ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
			ctx.fill();
		}; 
	}
})();