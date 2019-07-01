var flag = true;
var limit = 10;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //my 询盘
        enquiries: [],
        state:"wait_audit",

        //购物车总量
        gross: 0,
        carShow: true
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();

            vm.quantity();
        })
    },
    filters:{
        forEnqState:function (val) {
            if (val == 'wait_audit'){
                return "Processing";
            }else if (val == 'up'){
                return "Processed";
            }else {
                return "error";
            }
        }
    },
    methods: {
        //1.preLoad current user
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                async: false,
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.user = r.data;
                        if (vm.user != null) {
                            //供应商 隐藏购物车
                            vm.user.biz_type == "buyer_en" ? vm.carShow = true : vm.carShow = false;

                            vm.preLoadMyEnquiries(0);
                        } else {
                            alert("please sign in again!");
                            window.open("login_en.html", "_self");
                        }
                    }
                }
            })
        },
        //退出
        logout: function () {
            $.ajax({
                url: "/log/logout",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("please sign in again!");
                        window.open("login_en.html", "_self");
                    }
                }
            })
        },

        /**
         * 20.my harlan link 首页个人中心 订单页面跳转
         * 根据用户类别
         */
        lnkPersonalCenter: function () {
            if (vm.user == null || typeof vm.user == "undefined") {
                alert("error");
                return;
            }
            //stage1:英文采购商
            if (vm.user.biz_type == 'buyer_en') {
                window.location.href = "order_buyer.html";
            }
            //stage2:英文供应商 - 个人
            if (vm.user.biz_type == 'seller_en' && vm.user.user_type == "per") {
                window.location.href = "sale_person_info.html";
            }
            //stage3:英文供应商 - 公司
            if (vm.user.biz_type == 'seller_en' && vm.user.user_type == "com") {
                window.location.href = "sale_firm_info.html";
            }
        },



        //1.preLoad my询盘
        preLoadMyEnquiries: function (currPage) {
            if (vm.user == null) {
                alert("please sign in first");
                window.open("login_en.html", "_self");
                return;
            }
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/goodsMall/list",
                type: "post",
                data: {
                    jsonStr: JSON.stringify({
                        page: currPage + 1,
                        limit: limit,
                        user_id: vm.user.user_id,
                        goods_type: 'enquiry',
                        goods_state:vm.state
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#page_blo").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadMyEnquiries//回调函数
                            });
                            flag = false;
                        }
                        vm.enquiries = r.data.list;
                    }
                }
            })
        },


        /**
         * 购物车总量
         */
        quantity : function () {
            if(vm.user != null){
                $.ajax({
                    url: '/cart/quantity',
                    async: false,
                    data: {
                        jsonStr: JSON.stringify({"user_id": vm.user.user_id, "page": 1, limit: "10"})
                    },
                    type: "post",
                    datatype: "json",
                    success : function (r) {
                        if(r.code == 0){
                            vm.gross = r.data;
                        }
                    }
                })
            }
        }
    }
});