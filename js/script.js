window.onload = function(){
	var container = document.getElementById('container');
	var list = document.getElementById("list");
	var buttons =document.getElementById("buttons").getElementsByTagName('span');
	var left = document.getElementById("left");
	var right = document.getElementById("right");
	var index = 1;
	var animated = false;
	var timer;
	
	//显示对应小圆点
	function showButton(){
		for(var i = 0 ; i < buttons.length ; i++){
			if(buttons[i].className== 'on'){
				buttons[i].className = '';
				break;
			}
		}
		buttons[index - 1].className = ('on');
	}
	
	//切换图片
	function animate(offset){
		animated = true;
		var newLeft = parseInt(list.style.left) + offset
		var time = 600; //位移总时间
		var interval = 15; //位移间隔时间
		var speed = offset/(time/interval);  //每次的位移量
		
		function go(){
			if((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)){
				list.style.left = parseInt(list.style.left) + speed  + 'px';
				
				setTimeout(go,interval);
			}
			else{
				animated = false;
				list.style.left = newLeft + 'px';
				if(newLeft > -800){
					list.style.left = -4000 +'px';
				}
				if(newLeft < -4000){
					list.style.left = -800 +'px';
				}
			}
		}
		go();
	}
	
	//点击左右箭头切换图片
	right.onclick = function(){
		if(index == 5){
			index = 1;
		}else{
			index += 1;
		}
		showButton();
		if(!animated){
			animate(-800);
		}
	}
	left.onclick = function(){
		if(index == 1){
			index = 5;
		}else{
			index -= 1;
		}
		showButton();
		if(!animated){
			animate(800);
		}
	}
	
	//点击圆点跳转对应图片
	for(var i = 0; i < buttons.length; i++){
		buttons[i].onclick = function(){
			if(this.className == 'on'){
				return;
			}
			var myIndex = parseInt(this.getAttribute('index'));
			var offset = -800 * (myIndex - index);
			
			if(!animated){
				animate(offset);
			}
			index = myIndex;
			showButton();
		}
	}
	
	//自动播放
	function play(){
		timer = setInterval(function(){
			right.onclick();
		},3000)
	}
	function stop(){
		clearInterval(timer);
	}
	container.onmouseover = stop;
	container.onmouseout = play;
	play();
	
}




















