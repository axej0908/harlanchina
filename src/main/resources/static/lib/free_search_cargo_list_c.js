var vm = new Vue({
    el: '#rrapp',
    data: {
        user: {},
        cargo: {},
        metal: {},
        quality: {}

    },
    mounted: function () {
        this.$nextTick(function () {
            vm.cargo.cargo_id = getQueryString("cargo_id");
            vm.getCurrentUser();
        })
    },
    methods: {
        selectMyCargo: function () {
            $.ajax({
                url: "/cargo/detail",
                type: "post",
                data: vm.cargo,
                dataType: "json",
                success: function (r) {
                        vm.cargo = r.data;
                        vm.cargo.cargo_state = state(r.data.cargo_state);
                        vm.metal = r.data.metalBean;
                        vm.quality = r.data.qualityBean;
                    $("#supplyCargo").html(r);
                }
            });

        },
        supply: function () {

        },
        //获取用户信息
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if(r.code == 0){
                        vm.user = r.data;
                        console.log("函数内部：" + JSON.stringify(vm.user));
                        vm.selectMyCargo();
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
                success: function (r) {
                    if (r.code == 0) {
                        alert("sign out success!");
                    }
                }
            })
        }
    }

});
/*data---->cargo_state  单项的状态*/
function state(data) {
    if (data == 4) {
        $(".attention").text("请尽快购买...");
        return "有结果";
    }
    if (data == 5) {
        $(".attention").text("已结束");
        return "已取消";
    }
};


