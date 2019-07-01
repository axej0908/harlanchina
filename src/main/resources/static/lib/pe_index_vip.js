var limit = 10;
var flag = true;
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
    filters: {
        serialSel: function (val) {
            return val + "" + new Date().getTime();
        }
    },
    computed: {
    },
    methods: {
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentChinaUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user == null) {
                        alert("请重新登录!");
                        window.open("login_zh.html", "_self");
                    }
                }
            })
        },
        logout: function () {
            $.ajax({
                url: "/log/logout",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("sign out success!");
                        window.open("login_zh.html", "_self");
                    }
                }
            })
        },

        //1.preload 申请服务列表
        preLoadMyServices: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/fiveSer/pager",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        "page": currPage + 1,
                        "limit": limit,
                        "user_id": vm.user.user_id,
                        "five_type": vm.ser.five_type
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        /*          if (flag) {
                                      $("#pagerBarStartSale").pagination(r.data.totalCount, {
                                          items_per_page: limit,
                                          num_edge_entries: 0,
                                          num_display_entries: 2,
                                          callback: vm.preLoadStartSale//回调函数
                                      });
                                      flag = false;
                                  }*/
                        vm.services = r.data.list;
                    }
                }
            })
        }
    }

});


