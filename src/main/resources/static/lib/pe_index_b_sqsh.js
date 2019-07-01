var limit = 10;
var flag = true;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //页面传递接收参数
        order:{}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
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
                    console.log("vm.user:"+JSON.stringify(vm.user));
                    vm.order = JSON.parse(base64.decode(getQueryString("order")));
                    console.log("页面接收参数order："+JSON.stringify(vm.order));
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
                        window.open("index.html","_self");
                    }
                }
            })
        }
    }
});

// global filter
Vue.filter('firmOrderPur', function(value) {
    if(value == 1){
        return "草稿箱";
    }
    if(value == 2){
        return "已发布";
    }
    if(value == 3){
        return "采购中";
    }
    if(value == 4){
        return "已中标";
    }
    if(value == 5){
        return "已完成";
    }
});
