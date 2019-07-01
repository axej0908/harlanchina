var flag = true;
var limit = 10;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        state:"-1",
        enquiries: []
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.currentUser();
        })
    },
    methods: {

        /**
         * 4.supplier handle inquiry
         */
        processInquiry: function (en_id) {
            if (en_id == 0 || typeof en_id == "undefined"){
                alert("error");
                return;
            }

            $.ajax({
                url: "/tarEnquiry/update",
                type: "post",
                data: {en_id:en_id,tar_status:"1"},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success!");
                        vm.preloadEnquiriesToMe();
                    }
                }
            })
        },

        /**
         * 3.query all enquiries to me
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
                data: {"user_id": vm.user.user_id, "page": currPage + 1, "limit": limit,"tar_status":vm.state},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                              if (flag) {
                                  $("#page").pagination(r.count, {
                                      items_per_page: limit,
                                      num_edge_entries: 1,
                                      num_display_entries: 3,
                                      callback: vm.preloadEnquiriesToMe
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
                        window.location.href = "login_zh.html";
                    }
                }
            })
        },

        /**
         * 1.preload current user info
         */
        currentUser: function () {
            $.ajax({
                url: "/log/currentChinaUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.user = r.data;
                        if (vm.user == null) {
                            alert("please sign in again");
                            window.open("login_zh.html", "_self");
                            return;
                        } else {
                            vm.preloadEnquiriesToMe();
                        }
                    }
                }
            })
        },

        getUrlParam:function(name) {
             var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
             var r = window.location.search.substr(1).match(reg);  //匹配目标参数
             if (r != null) return unescape(r[2]); return null; //返回参数值
        }
    }
});