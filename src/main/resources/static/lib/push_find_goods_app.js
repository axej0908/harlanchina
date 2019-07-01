var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        goods: {deliver_units:"day",num_units:"kg",price_units:"dollar"}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.user.user_id = format3(getQueryString("user_id"));
            vm.userDetail();
        })
    },
    methods: {

        /**
         * 用户详情
         */
        userDetail : function(){
            $.ajax({
                url: '/user/detail',
                data: {
                    user_id: vm.user.user_id
                },
                type: "post",
                dataType: "json",
                success : function (r) {
                    vm.user = r.result;
                }
            })
        },


        //1.询盘
        enquiry: function () {
            if (vm.goods.goods_name == null || typeof vm.goods.goods_name == "undefined") {
                alert("please complete info product name");
                return;
            }
            if(vm.goods.goods_deliver == null || vm.goods.goods_deliver == "undefined"){
                alert("please complete info delivery");
                return;
            }
            if(vm.goods.deliver_units == null || vm.goods.deliver_units == "undefined"){
                alert("please complete info deliver_units");
                return;
            }
            if(vm.goods.goods_num == null || vm.goods.goods_num == "undefined"){
                alert("please complete info quantity");
                return;
            }
            if(vm.goods.num_units == null || vm.goods.num_units == "undefined"){
                alert("please complete info num_units");
                return;
            }
            if(vm.goods.package_opt == null || vm.goods.package_opt == "undefined"){
                alert("please complete info packing");
                return;
            }
            if(vm.goods.goods_purity == null || vm.goods.goods_purity == "undefined"){
                alert("please complete info purity");
                return;
            }
            if(vm.goods.current_price == null || vm.goods.current_price == "undefined"){
                alert("please complete info price");
                return;
            }
            if(vm.goods.price_units == null || vm.goods.price_units == "undefined"){
                alert("please complete info price_units");
                return;
            }
            if(vm.goods.transport_opt == null || vm.goods.transport_opt == "undefined"){
                alert("please complete info transportation");
                return;
            }
            /*if(vm.goods.payment_opt == null || vm.goods.payment_opt == "undefined"){
                alert("please complete info payment request");
                return;
            }*/
            vm.goods.user_id = vm.user.user_id;
            vm.goods.user_name = vm.user.user_name;
            vm.goods.goods_type = "enquiry";
            $.ajax({
                url: "/findGoods/save",
                type: "post",
                data: vm.goods,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.goods = {};
                        alert("Congratulation ! successful inquiry!");
                    }else {
                        alert("fail");
                    }
                }
            })
        }
    }
});