$(function(){
	//单选按钮点击事件
    $(".radio_div").on("click","input",function(){
    	$(".radio_div").removeClass("check_radio");
    	$(this).parents(".radio_div").addClass("check_radio");
    	var num = $(this).parents(".radio_div").index()
    	if(num == 0){
    		$(".land_btn").html("Register");

		}else{;
			$(".land_btn").html("Next Step");

          	
		}
    })
  	//协议选择

    //发送验证码倒计时
    $(".u_pwd").on("click",".code_pic",function(){
    
    	if($(this).hasClass("code_active")){
    		return;
    	}else{
    		$(this).addClass("code_active");
    		var num = 60;
    		var ds = setInterval(function(){
    			num--;
    			$(".code_pic").html(num+"S");
    			if(num == 0){
    				$(".code_pic").removeClass("code_active").html("重新发送");
    				clearInterval(ds);
    			}
    		},1000)
    		
    		$.ajax({
    			type: "POST",
    			url: "send_mes",
    			data: "memberMobile="+$("#user_mobile").val(),
    			success: function(msg){
    				if(msg=="success"){
    					document.getElementById("error_info").innerHTML="手机验证码已发送，请填写！";
    		        }else if(msg=="fail"){
    		        	document.getElementById("error_info").innerHTML="手机验证码发送失败！";
    		        }
    			}
	    	});
    		
    	}
    })
    //按钮点击事件
    $(".land_btn").on("click",function(){
    	var user_mobile=$("#user_mobile").val().replace(/(^\s*)|(\s*$)/g, "");
		var user_password=$("#user_password").val().replace(/(^\s*)|(\s*$)/g, "");
		if(user_mobile==""||user_password==""){
			document.getElementById("error_info").innerHTML="请填写完整!";
    		return;
    	}
		var mobileReg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
        if(!mobileReg.test(user_mobile)){
        	document.getElementById("error_info").innerHTML="手机号格式不正确!";
        	return;
        }
        if(user_password.length<6||user_password.length>20){
        	document.getElementById("error_info").innerHTML="密码格式不正确!";
        	return;
        }
    	if($(this).html()=="Register"){
    		$.ajax({
    			type: "POST",
    			url: "register_cl",
    			data: "memberMobile="+$("#user_mobile").val()+"&mobileCheckCode="+$("#mobileCheckCode").val()+"&memberPassword="+$("#user_password").val(),
    			success: function(msg){
    				if(msg=="success"){
    					location.href="pe_data_a.html";
    		        }else if(msg=="notIsUnique"){
    		        	document.getElementById("error_info").innerHTML="此手机号已注册!";
    		        }else if(msg=="nomobilecc"){
    		        	document.getElementById("error_info").innerHTML="请先获取手机验证码！";
    		        }else if(msg=="errormobilecc"){
    		        	document.getElementById("error_info").innerHTML="手机验证码错误!";
    		        }else{
    		        	location.href=location.href;
    		        }
    			}
	    	});
    	}else if($(this).html()=="Next Step" ){
    		$.ajax({
    			type: "POST",
    			url: "reg_cl_next",
    			data: "memberMobile="+$("#user_mobile").val()+"&mobileCheckCode="+$("#mobileCheckCode").val()+"&memberPassword="+$("#user_password").val(),
    			success: function(msg){
    				if(msg=="success"){
    					location.href="register_info.html";
    		        }else if(msg=="notIsUnique"){
    		        	document.getElementById("error_info").innerHTML="此手机号已注册!";
    		        }else if(msg=="nomobilecc"){
    		        	document.getElementById("error_info").innerHTML="请先获取手机验证码！";
    		        }else if(msg=="errormobilecc"){
    		        	document.getElementById("error_info").innerHTML="手机验证码错误!";
    		        }else{
    		        	location.href=location.href;
    		        }
    			}
	    	});
    	}
    	
    })
    

})


