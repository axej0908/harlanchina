var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //res of query
        queries: [],
        criteria: {page: 1, limit: 100},
        queryShow:1
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },

    filters: {
        /**
         * 从规格里获取 单价单位
         */
        getUnit: function (val) {
            if (val == '' || typeof val == "undefined") {
                return val;
            } else {
                return val.split("/")[1];
            }
        }
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
                        window.location.href = 'login_zh.html';
                    } else {
                        vm.criteria.user_id = vm.user.user_id;
                        //???需要等数据和征信 建表 接口
                        // vm.preloadQueryService(getQueryString("type"))
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
                        window.open("index.html", "_self");
                    }
                }
            })
        },

        /**
         * 1.preload
         */
        preloadQueryService: function (value) {
            vm.criteria.zh_pos = value;
            $.ajax({
                url: "",
                type: "post",
                data: vm.criteria,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.queries = r.data;
                    }
                }
            })
        }
    }
});

