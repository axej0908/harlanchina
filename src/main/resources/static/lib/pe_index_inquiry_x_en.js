var flag = true;
var limit = 5;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},

        enquiries: [],

        //购物车总量
        gross:0,
        carShow: true
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.currentUser();

            vm.quantity();
        })
    },
    methods: {

        /**
         * 3.query all enquiries from me
         */
        preloadEnquiriesFromMe: function (currPage) {
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
                data: {"buyer_id": vm.user.user_id, "page": currPage + 1, "limit": limit},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                              if (flag) {
                                  $(".pagination").pagination(r.count, {
                                      items_per_page: limit,
                                      num_edge_entries: 1,
                                      num_display_entries: 3,
                                      callback: vm.preloadEnquiriesFromMe
                                  });
                                  flag = false;
                              }
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
                        window.location.href = "login_en.html";
                    }
                }
            })
        },

        /**
         * 1.preload current user info
         */
        currentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                async: false,
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
                            //供应商 隐藏购物车
                            vm.user.biz_type == "buyer_en" ? vm.carShow = true : vm.carShow = false;

                            vm.preloadEnquiriesFromMe();
                        }
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