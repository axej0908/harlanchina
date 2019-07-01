var flag = true;
var limit = 10;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();

        })
    },
    methods: {
        //获取用户信息
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
                        vm.user = data.data;
                        //我参与的易货
                        vm.participantList();
                        //我发起的易货
                        vm.sponsorList();
                    }
                }
            });
        },
        //退出
        logout: function () {
            $.ajax({
                url: "/log/logout",
                type: "post",
                data: {},
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
                        alert("sign out success!");
                        window.location.href = "../login.html";
                    }
                }
            })
        },
        //我参与的易货
        participantList : function (currPage) {
            if(!$.isNumeric(currPage)){
                currPage = 0;
            }
            $.ajax({
                url:"/barter/myInvokeList",
                type:"post",
                data:{"jsonStr": JSON.stringify({"user_id": vm.user.user_id , "barter_state":"2" , "page": currPage + 1, "limit": limit})},
                dataType:"json",
                success : function (data) {
                    if(data.code == 0){
                        if(flag) {
                            $("#page1").pagination(data.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 3,
                                callback: vm.list//回调函数
                            });
                            flag = false;
                        }
                        $(".list1").html("");
                        vm.participantData(data.data.list);
                    }
                }
            })
        },
        participantData : function (data) {
            var str = '';
            for(var i = 0; i < data.length; i++){
                str += '<div class="list_item">';
                str += '    <p class="order_number">订单编号：<span>123456789</span></p>';
                str += '    <div class="mesg">';
                str += '    	<div class="gda">';
                str += '    		<div class="tal_nm">出售物</div>';
                str += '    		<div class="tal">';
                str += '    			<div class="tal_row">';
                str += '    				<div class="tal_a">'+data[i].cargo_name+'</div>';
                str += '    				<div class="tal_line"></div>';
                str += '    				<div class="tal_b">纯度：<span>'+data[i].cargo_purity+'</span></div>';
                str += '    				<div class="tal_line"></div>';
                str += '    				<div class="tal_c">数量：<span>'+data[i].cargo_num+''+data[i].cargo_unit+'</span></div>';
                str += '    				<div class="clear"></div>';
                str += '    			</div>';
                str += '    		</div>';
                str += '    		<div class="clear"></div>';
                str += '    	</div>';
                str += '    	<div class="gdb">';
                str += '    		<div class="tal_nm">兑换物</div>';
                str += '    		<div class="tal">';
                for(var j = 0; j < data[i].barterBeans.length; j++) {
                    str += '    			<div class="tal_row">';
                    str += '    				<div class="tal_a">'+data[i].barterBeans[j].cargo_name+'</div>';
                    str += '    				<div class="tal_line"></div>';
                    str += '    				<div class="tal_b">纯度：<span>'+data[i].barterBeans[j].cargo_purity+'</span></div>';
                    str += '    				<div class="tal_line"></div>';
                    str += '    				<div class="tal_c">数量：<span>'+data[i].barterBeans[j].cargo_num+''+data[i].barterBeans[j].cargo_unit+'</span></div>';
                    str += '    				<div class="clear"></div>';
                    str += '    			</div>';
                }
                str += '    		</div>';
                str += '    		<div class="clear"></div>';
                str += '    	</div>';
                str += '    	<div class="btn_list">';
                str += '    		<div class="btn_a">已参与</div>';
                str += '    		<div class="btn_b" onclick="participantDetails('+data[i].barter_id+')">参与详情</div>';
                str += '    		<div class="clear"></div>';
                str += '    	</div>';
                str += '    </div>';
                str += '    <div class="clear"></div>';
                str += '</div>';
            }
            $(".list1").empty().append(str);
        },
        //我发起的易货
        sponsorList : function (currPage) {
            if(!$.isNumeric(currPage)){
                currPage = 0;
            }
            $.ajax({
                url:"/barter/myPublishList",
                type:"post",
                data:{"jsonStr": JSON.stringify({"user_id": vm.user.user_id , "barter_state":"3" , "page": currPage + 1, "limit": limit})},
                dataType:"json",
                success : function (data) {
                    if(data.code == 0){
                        if(flag) {
                            $("#page2").pagination(data.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 3,
                                callback: vm.list//回调函数
                            });
                            flag = false;
                        }
                        $(".list2").html("");
                        vm.sponsorData(data.data.list);
                    }
                }
            })
        },
        sponsorData : function (data) {
            var str = '';
            for(var i = 0; i < data.length; i++){
                str += '<div class="list_item">';
                str += '	<p class="order_number">订单编号：<span>123456789</span></p>';
                str += '	<div class="mesg">';
                str += '		<div class="gda">';
                str += '			<div class="tal_nm">出售物</div>';
                str += '			<div class="tal">';
                str += '				<div class="tal_row">';
                str += '					<div class="tal_a">'+data[i].cargo_name+'</div>';
                str += '					<div class="tal_line"></div>';
                str += '					<div class="tal_b">纯度：<span>'+data[i].cargo_purity+'</span></div>';
                str += '					<div class="tal_line"></div>';
                str += '					<div class="tal_c">数量：<span>'+data[i].cargo_num+''+data[i].cargo_unit+'</span></div>';
                str += '					<div class="clear"></div>';
                str += '				</div>';
                str += '			</div>';
                str += '			<div class="clear"></div>';
                str += '		</div>';
                str += '		<div class="gdb">';
                str += '			<div class="tal_nm">兑换物</div>';
                str += '			<div class="tal">';
                for(var j = 0; j < data[i].barterBeans.length; j++){
                str += '				<div class="tal_row">';
                str += '					<div class="tal_a">'+data[i].barterBeans[j].cargo_name+'</div>';
                str += '					<div class="tal_line"></div>';
                str += '					<div class="tal_b">纯度：<span>'+data[i].barterBeans[j].cargo_purity+'</span></div>';
                str += '					<div class="tal_line"></div>';
                str += '					<div class="tal_c">数量：<span>'+data[i].barterBeans[j].cargo_num+''+data[i].barterBeans[j].cargo_unit+'</span></div>';
                str += '					<div class="clear"></div>';
                str += '				</div>';
                }
                str += '			</div>';
                str += '			<div class="clear"></div>';
                str += '		</div>';
                str += '		<div class="btn_list_fq">';
                /*str += '			<div class="btn_c" onclick="location.href='h_yhyh_detail_a_close.html'">查看详情</div>';*/
                /*str += '			<div class="btn_d" onclick="location.href='h_yhyh_detail_a_close_jump.html'">查看易货者详情</div>';*/
                str += '			<div class="clear"></div>';
                str += '		</div>';
                str += '	</div>';
                str += '	<div class="clear"></div>';
                str += '</div>';
            }
            $(".list2").empty().append(str);
        }
    }
});
//我参与的易货
function participantDetails(barter_id) {
    window.location.href="h_yhyh_detail_a_entered.html?barter_id="+barter_id;
}