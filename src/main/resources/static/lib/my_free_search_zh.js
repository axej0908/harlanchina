var flag = true;
var limit = 10;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        state:"wait_audit",
        enquiries: []
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.currentUser();
        })
    },
    filters: {
        formatEnquiryStatus: function (val) {
            if (val == 'up') {
                return '已受理';
            } else if (val == 'wait_audit') {
                return '未受理';
            } else {
                return 'error';
            }
        }
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
                url: "/goodsMall/list",
                type: "post",
                data: {
                    jsonStr: JSON.stringify({"user_id": vm.user.user_id,"goods_type":'enquiry',"page": currPage+1, limit: "10","goods_state":vm.state})
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                              if (flag) {
                                  $("#page").pagination(r.count, {
                                      items_per_page: limit,
                                      num_edge_entries: 1,
                                      num_display_entries: 3,
                                      callback: vm.preloadEnquiriesFromMe
                                  });
                                  flag = false;
                              }
                        vm.enquiries = r.data.list;
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
                            vm.preloadEnquiriesFromMe();
                        }
                    }
                }
            })
        }
    }
});