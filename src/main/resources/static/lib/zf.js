var flag = true;
var limit = 20;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        user_id: 0,
        user_type:'',
        //the amount of price
        needPay: ''
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
            vm.user_id = format3(getQueryString("user_id"));
            vm.user_type = format3(getQueryString("user_type"));
            vm.user_type == 'supplierZh' ? vm.needPay = 6666 : vm.needPay = 8888;
        })
    },
    methods: {
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
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
                        alert("sign out!");
                        window.open("login_en.html", "_self");
                    }
                }
            })
        },

        /**
         * 1.payfo
         */
        payForVip: function () {
            if (vm.user_id == 0 || typeof vm.user_id == "undefined") {
                alert("error");
                return;
            }
            $.ajax({
                url: "/user/toVip",
                type: "post",
                data: {user_id: vm.user_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success");
                    }
                }
            })
        }

    }
});
