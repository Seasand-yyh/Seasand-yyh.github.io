/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

//为String增加一个trim方法
String.prototype.trim = function(){
  var head = 0;
  var tail = this.length-1;
  if(this.length==1){
    return this;
  }
  while(this.charAt(head) === " "){
    head++;
  }
  while(this.charAt(tail) === " "){
    tail--;
  }
  if(head>=tail){
    return " ";
  }else{
    return this.slice(head,tail+1);
  }
};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var aqi_city_input = document.getElementById("aqi-city-input").value;
  var aqi_value_input = document.getElementById("aqi-value-input").value;

  aqi_city_input = aqi_city_input.trim();
  aqi_value_input = aqi_value_input.trim();

  if(!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(aqi_city_input)){
    alert("输入的城市名必须为中英文字符");
    return;
  }
  if(!/^[1-9][0-9]*$/.test(aqi_value_input)){
    alert("空气质量指数必须为整数");
    return;
  }

  aqiData[aqi_city_input] = aqi_value_input;

  document.getElementById("aqi-city-input").value = "";
  document.getElementById("aqi-value-input").value = "";
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var aqi_table = document.getElementById("aqi-table");
  var res = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
  for(var p in aqiData){
    res += '<tr><td>'+p+'</td><td>'+aqiData[p]+'</td><td><button>删除</button></td></tr>';
  }
  aqi_table.innerHTML = res;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
  if(!window.confirm("确定要删除吗？")) return;

  var trNode = target.parentNode.parentNode;
  var cityName = trNode.getElementsByTagName("td")[0].innerText;
  for(var p in aqiData){
    if(p === cityName){
      delete aqiData[p];
      break;
    }
  }
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.getElementById("add-btn");
  if(addBtn.addEventListener){
    addBtn.addEventListener('click',addBtnHandle,false);
  }else{
    addBtn.attachEvent('onclick',addBtnHandle);
  }

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var aqi_table = document.getElementById("aqi-table");
  aqi_table.onclick = function(evt){
    var event = evt || window.event,
        target = event.target || event.srcElement;

    if (target && target.tagName === "BUTTON") {
        delBtnHandle(target);
    }
  };
}

init();
