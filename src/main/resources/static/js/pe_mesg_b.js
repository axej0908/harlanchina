$(function(){
	//点击回复出现消息输入框按钮
	$(".yhxx_item").on("click",".yhxx_op",function(){
		console.log("111111111111")
		$(this).parents(".yhxx_fk").siblings(".con_xiaoxi").show();
	})
	//点击输入框下的去请按钮
	$(".yhxx_item").on("click",".input_btn",function(){
		//获取输入框里的内容
		var mesg_con = $(this).siblings(".mesg_input").find("input").val()
		$(this).parents(".con_xiaoxi").hide();
		$(this).parent(".con_xiaoxi").siblings(".con_xiaoxi_show").show().find(".mesg_show_area").html(mesg_con);
		
	})
})
