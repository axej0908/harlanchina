var vm = new Vue({
    el: '#rrapp',
    data: {
        //输入的商品名称或者供应商
        searchParam: null,
        //搜索框搜索类别
        searchType: 'supplier',
        user: {},
        goods:{}
    },
    mounted: function () {
        this.$nextTick(function () {
            var base64 = new Base64();
            vm.getCurrentUser();
        })
    },
    methods: {

        redirectSel: function () {
            if (vm.searchType == "product") {
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else if (vm.searchType == "supplier") {
                window.open("master.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else if(vm.searchType == "cas"){
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else {
                alert("error");
            }
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
                        vm.goods.goods_id = getQueryString("goods_id");
                        vm.getGoodsInfo();
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
        },
        //1.查询商品信息
        getGoodsInfo:function () {
            $.ajax({
                url: "/goodsMall/detail",
                type: "post",
                data: {goods_id:vm.goods.goods_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.goods = r.data;
                    }
                }
            })
        }
    }

});


