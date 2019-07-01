var flag = true;
var limit = 10;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},

        enquiries: []
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.currentUser();
        })
    },
    methods: {

        /**
         * 3.query all enquiries to me and by condition processed
         */
        preloadEnquiriesToMe: function (currPage) {
            if (vm.user == null || typeof vm.user.user_id == "undefined") {
                alert("unknown error!");
                return;
            }
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/tarEnquiry/pager",
                type: "post",
                data: {"user_id": vm.user.user_id, "page": currPage + 1, "limit": limit, tar_status: "1"},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        /*      if (flag) {
                                  $(".page").pagination(r.count, {
                                      items_per_page: limit,
                                      num_edge_entries: 1,
                                      num_display_entries: 3,
                                      callback: vm.preloadEnquiriesToMe
                                  });
                                  flag = false;
                              }*/
                        vm.enquiries = r.data;
                    }
                }
            })
        },

        /**
         * 2.sign out
         */
        logout: function () {
            $.ajax({
                url: "/log/logout",
                type: "post",
                data: {},
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
                        alert("sign out success!");
                        window.location.href = "login.html";
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


        /**
         * 1.preload current user info
         */
        currentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.user = r.data;
                        if (vm.user == null) {
                            alert("please sign in again");
                            window.open("login_en.html", "_self");
                            return;
                        } else {
                            vm.preloadEnquiriesToMe();
                        }
                    }
                }
            })
        }
    }
});