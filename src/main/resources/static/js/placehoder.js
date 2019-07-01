$(function(){
	// 判断浏览器是否支持placeholder属性
	  supportPlaceholder='placeholder'in document.createElement('input'),
	  placeholder=function(input){
	  	var pwd_input;
	  	if(input.attr("type") == "password"){
	  		pwd_input = input
	  		pwd_input.attr("type","text");
	  	}
	  	
	    var text = input.attr('placeholder'),
	    defaultValue = input.defaultValue;
	    if(!defaultValue){
	      input.val(text).addClass("phcolor");
	    }
	    input.focus(function(){
	      pwd_input.attr("type","password");
	      if(input.val() == text){
	        $(this).val("");
	      }
	    });
	    input.blur(function(){
	      if(input.val() == ""){
	        $(this).val(text).addClass("phcolor");
	        pwd_input.attr("type","text");
	      }
	    });
	    //输入的字符不为灰色
	    input.keydown(function(){
	      $(this).removeClass("phcolor");
	      pwd_input.attr("type","password");
	    });
	  };
				 
	  //当浏览器不支持placeholder属性时，调用placeholder函数
	  if(!supportPlaceholder){
	    $('input').each(function(){
	      text = $(this).attr("placeholder");
	        placeholder($(this));
	    });
	  }
				
})
   
