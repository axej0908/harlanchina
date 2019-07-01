		var fiveBtn = document.getElementById("five_btn");
		var oD1 = document.getElementById("d1");
		var oD2 = document.getElementById("d2");		
		var oBtn1 = document.getElementById("btn1");
		var oBtn2 = document.getElementById("btn2");
		var oCha1 = document.getElementById("cha1");
		var oCha2 = document.getElementById("cha2");
		
		
		fiveBtn.onclick = function(){
			alert(1);
			oD1.style.display = "block";
			var hideobj=document.getElementById("hidebg"); 
   		    hidebg.style.display="block";  //显示隐藏层 
   		    hidebg.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度 
   			document.getElementById("hidebox").style.display="block";  //显示弹出层 
		}
		
		oBtn1.onclick = function(){
			oD1.style.display = "none";
			oD2.style.display = "block";
		}
		oBtn2.onclick = function(){
			oD2.style.display = "none";
			hidebg.style.display="none";  //显示隐藏层 
		}
		oCha1.onclick = function(){
			oD1.style.display = "none";
			hidebg.style.display="none";  //显示隐藏层 
		}
        oCha2.onclick = function(){
        	oD2.style.display = "none";
        	hidebg.style.display="none";  //显示隐藏层 
        }


//		$("#five_btn").click(function(){  
//         
//              $("#d1").show();  
//        
//      }); 
