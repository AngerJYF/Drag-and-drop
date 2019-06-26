/*这个库中现在已经封装好了以下函数：
 *$符号的封装；
 *得到兼容性样式的代码
 * 物体移动函数
 *物体抖动的函数; 
 * */

//封装一个$方法
function $(selector,content){
			var fristChar=selector.charAt(0);
			var content=content||document;
			if(fristChar==="#"){
				return document.getElementById(selector.slice(1));
			}else if(fristChar==="."){
				var arr=[];
				var AllElements=content.getElementsByTagName("*");
				for(var i=0;i<AllElements.length;i++){
					var className=AllElements[i].className;
					var classArr=className.split(" ");
					for(var j=0;j<classArr.length;j++){
						if(selector.slice(1)===classArr[j]){
							arr.push(AllElements[i]);
							break;
						}
					};
				};
				return arr;
			}else{
				return content.getElementsByTagName(selector);
			}
		}

//放置一个得到样式的兼容性代码
                function getStyle(obj,attr){
                    if(obj.currentStyle){
                        return obj.currentStyle[attr];
                    }else{
                        return getComputedStyle(obj)[attr];
                    }
               }
//-------------------------------获取位置的函数-----
//获取元素位置
function getPos(obj) {
	var iTop = obj.offsetTop;
	var iLeft = obj.offsetLeft;
	while (obj.offsetParent)
	{
		iTop += obj.offsetParent.offsetTop;
		iLeft += obj.offsetParent.offsetLeft;
		obj = obj.offsetParent;
	}
	return {top:iTop, left:iLeft}	
};//-----------下面是一个运动函数---------------

    function Movejs(obj,attr,speed,target,callBack){
	if(obj.timer) return;
	var num = parseFloat(getStyle( obj,attr )); 
	speed = num > target ? -Math.abs(speed) : Math.abs(speed);
	obj.timer = setInterval(function (){
		num += speed;
		if( speed > 0 && num >= target || speed < 0 && num <= target  ){
			num = target;

			clearInterval(obj.timer);
			obj.timer = null; //设置保存定时器的的值为null
			obj.style[attr] = num + "px";

			(typeof callBack === "function") && callBack();

		}else{
			obj.style[attr] = num + "px";
		}
		

	},30)	
}        
//下面封装一个抖动函数；
	function shake(obj,attr,fudu,rate,callback){
					 if(obj.timer) return;  
					 var arr=[];
					 var ys=parseFloat(getStyle(obj,attr)) ;
					 var n=0;
					 
					 for(var i=fudu;i>0;i-=rate){
						arr.push(-i,i);
					 }
					 arr.push(0);
					 obj.timer=setInterval(function(){
						obj.style[attr]=ys+arr[n]+"px";
						n++;
						if(n>arr.length-1){
							clearInterval(obj.timer);
							obj.timer=null;
							if(typeof callback==="function"){
								callback();
							}
						}
					 },30);
					}

//封装一个倒计时的函数 （参数是数字格式的）
function futureFn(y,m,d,h,min,s){

	if( arguments.length ==3 ){
		h = 0;
		min = 0;
		s = 0;
	}else if(arguments.length ==4){
		min = 0;
		s = 0;
	}else if(arguments.length ==5){
		s = 0;
	}

	var now = new Date();  //当前时间
	var future = new Date(y,m,d,h,min,s); //未来时间

	var chazhi = (future.getTime() - now.getTime())/1000;

	// chazhi<0 倒计时结束了

	var tian = Math.floor(chazhi/86400);	

	var xiaoshi = Math.floor(chazhi%86400/3600);

	var fen = Math.floor(chazhi%86400%3600/60);

	var miao = Math.floor(chazhi%60);

	//return tian + "天" + xiaoshi+"时"+fen+"分"+miao+"秒";

	var onOff = true;
	//如果时间超过了未来设置的时间点，那么把开关关闭掉
	if( chazhi <= 0 ) onOff = false;

		var json = {
			D:tian,
			H:xiaoshi,
			Min:fen,
			S:miao,
			onOff:onOff
			}

		return json;
};
//另一个倒计时的函数封装 (字符串的格式的)
function setTimer(futureTime){
	var now= new Date();
	var future=new Date(futureTime);
	var chazhi=(future.getTime() - now.getTime())/1000;
	var tian=Math.floor(chazhi/86400);
	var xiaoshi =Math.floor(chazhi%86400/3600 );
	var fen =Math.floor(chazhi%86400/3600/60);
	var miao =Math.floor(chazhi%60);
	var onOff=true;
	if(chazhi<=0)onOff=false;//做一个开关去判断是否超时
		var jsonObj={
			D:tian,
			H:xiaoshi,
			Min:fen,
			S:miao,
			onOff:onOff
			}
		return jsonObj;
}
//------------------------------------------------
 function first(element){
                var firstElement = element.firstElementChild || element.firstChild;
                if( !firstElement || firstElement.nodeType !== 1 ){
                    return null
                }else{
                    return firstElement;
                }
            };
            function last(element){
                var lastElement = element.lastElementChild || element.lastChild;
                if( !lastElement || lastElement.nodeType !== 1 ){
                    return null
                }else{
                    return lastElement;
                }
            }
            function next(element){
                var nextElement = element.nextElementSibling || element.nextSibling;
                if( !nextElement || nextElement.nodeType !== 1 ){
                    return null
                }else{
                    return nextElement;
                }
            };
            function prev(element){
                var prevElement = element.previousElementSibling || element.previousSibling;
                if( !prevElement || prevElement.nodeType !== 1 ){
                    return null
                }else{
                    return prevElement;
                }
            }

function getStyle(obj,attr){
                    if(obj.currentStyle){
                        return obj.currentStyle[attr];
                    }else{
                        return getComputedStyle(obj)[attr];
                    }
               }
function  startMove(obj,json,fn){
				clearInterval(obj.timer);
				obj.timer=setInterval(function(){
					var onOff=true;
					//遍历json里面的每一个属性
					for( var attr in json){
						
						var iCur=0;
						if(attr=="opacity"){
						    iCur=parseFloat(getStyle(obj,attr))*100;
						   
						}else{
							iCur=parseInt(getStyle(obj,attr));
						}
						
						
						//初始化的时候的这个对象下的这个属性的值
					//0  	10
					//用目标属性值减去 目前的样式的值，差值 除以8 得到一个小的速度值
						var speed=(json[attr]-iCur)/8;
						
						//进行向上取整 （js中计算的样式的小数值得时候，会进行四舍五入，所以到了某一个
						//值得时候,就会发生停止(四舍五入不上去了)）
						speed=json[attr]-iCur>0 ?  Math.ceil(speed)  : Math.floor(speed);
						//只要有一个属性值没有到目标点，则让开关变成假	
						if(iCur!=json[attr]){
							onOff=false;
						}
						//console.log(iCur+":"+speed);
						//让对象的这个属性等于当前的样式里面的属性值加上  速度（已经处理过了）
						if(attr=="opacity"){
							obj.style.opacity=(iCur+speed)/100;
							obj.style.filter="alpha(opacity="+ (iCur+speed) +")";
						}else{
							obj.style[attr]=iCur+ speed   +"px";
						}
						
						
					}
					//当循环完json的属性的时候，判断这次循环的开关是不是真的，如果是真的，说明
				//	都到目标点了，停止定时器，并且执行回调函数
					if(onOff){
						clearInterval(obj.timer);
						fn&&fn();
					}
					
				},30);
			}
function parabola(obj,target,speed,callback){
	//clearInterval(obj.timer)
	/*if(obj.timer){
		return;
	}
*/	
	obj.timer=null;
	var a=0.001;
	var objPos={
		"left":parseInt(getStyle(obj,"left")),
		"top":parseInt(getStyle(obj,"top"))
	}
	var coord={
		"x":target.left-objPos.left,
		"y":target.top-objPos.top
	}
	var b=(coord.y-a*coord.x*coord.x)/coord.x;
	var num=0;
	obj.timer=setInterval(function(){
		num+=speed;
		obj.style.left=objPos.left+  num  +"px";
		obj.style.top=objPos.top+ a*num*num+b*num  +"px";
		if(num>=coord.x){
			clearInterval(obj.timer);
			obj.timer=null;
			obj.style.left=target.left+"px";
			obj.style.top=target.top+"px";
			callback&&callback();
		}	
	},30)
}
//--------------------------------------------------			
//在这个Movejs中，首先定义了一个得到最终样式的兼容性代码，
//然后，在运动函数中，封装了四个参数，一个为运动对象，一个是其属性，还有速度，还有目标位置，另外定时器的时间也可以随时调整

/*你需要做的是，在你的页面中，添加一些事件和运动对象，然后被js获取，注意：每一个事件之后都需要将定时器清空以及将定时器重置，防止误操作发生问题*/