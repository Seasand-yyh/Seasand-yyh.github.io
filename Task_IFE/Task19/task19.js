/**
 * task18.js
 */

//定义一个类，模拟队列
function Queue(){
	var array = [];
	//利用参数作为队列元素
	for(var i = 0;i < arguments.length;i++){
		array.push(parseInt(arguments[i]));
	}
	this.arr = array;
}

Queue.prototype.leftIn = function(x){
	this.arr.unshift(x);
};
Queue.prototype.leftOut = function(){
	this.arr.shift();
};
Queue.prototype.rightIn = function(x){
	this.arr.push(x);
};
Queue.prototype.rightOut = function(){
	this.arr.pop();
};
Queue.prototype.deleteAny = function(index){
	var newArr = [];
	for(var i = 0;i < this.arr.length;i++){
		if(i == index) continue;
		newArr.push(this.arr[i]);
	}
	this.arr = newArr;
};

//===========================================================================================

var queue;

//用于在页面上显示队列
function displayQueue(){
	var eleStr = '';
	for(var i = 0;i < queue.arr.length;i++){
		eleStr += '<div style="height:'+queue.arr[i]+'px;">'+queue.arr[i]+'</div>';
	}
	document.getElementById("queueWrapper").innerHTML = eleStr;
}

function validate(s){
	return /^([1-9][0-9]|100)$/.test(s);	//限制数字为10-100
}

function init(){
	queue = new Queue(11,77,22,33,44,55,66,77,88,99);
	displayQueue();

	//获取页面上的元素
	var btnLeftIn = document.getElementById("leftIn");
	var btnLeftOut = document.getElementById("leftOut");
	var btnRightIn = document.getElementById("rightIn");
	var btnRightOut = document.getElementById("rightOut");
	var btnSort = document.getElementById("sort");
	var inputText = document.getElementById("inputText");

	btnLeftIn.onclick = function(){
		if(validate(inputText.value)){
			if(queue.arr.length >= 60){
				alert("队列元素数量最多限制为60个!");
				return;
			}
			queue.leftIn(parseInt(inputText.value));
			displayQueue();
		}
		inputText.value = "";
	};	

	btnLeftOut.onclick = function(){
		queue.leftOut();
		displayQueue();
	};	

	btnRightIn.onclick = function(){
		if(validate(inputText.value)){
			if(queue.arr.length >= 60){
				alert("队列元素数量最多限制为60个!");
				return;
			}
			queue.rightIn(parseInt(inputText.value));
			displayQueue();
		}
		inputText.value = "";
	};	

	btnRightOut.onclick = function(){
		queue.rightOut();
		displayQueue();
	};	

	document.getElementById("queueWrapper").onclick = function(evt){
		var target = evt.target || window.target;		
		var divs = document.getElementById("queueWrapper").getElementsByTagName("div");
		for(var i = 0; i < divs.length; i++){	
			if(target===divs[i]){
				queue.deleteAny(i);
				displayQueue();
			}
		}
	};	

	btnSort.onclick = function(){
		queue.arr.sort(function(pre,next){
			return pre - next;
		});
		displayQueue();
	};
}

init();
