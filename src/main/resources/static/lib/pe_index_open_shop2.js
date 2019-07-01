var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        shop: {
            com_logo: 'imgs/file_pic.png'
        },
        searchParam: null,
        //搜索框搜索类别
        searchType: 'supplier'
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
                    if (vm.user == null) {
                        alert("请重新登录!");
                        window.open("index.html", "_self");
                        return;
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
                        window.open("login_en.html", "_self");
                    }
                }
            })
        },

        //2.导航栏搜索跳转
        redirectSel: function () {
            if (vm.searchType == "product") {
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else if (vm.searchType == "supplier") {
                window.open("master.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else {
                alert("error");
            }
        },
        //1.我要开店
        openShop: function () {
            if (vm.user == null) {
                alert("error");
                window.location.href("login_zh.html");
                return;
            }
            vm.shop.user_id = vm.user.user_id;
            $.ajax({
                url: "/shop/openShop",
                type: "post",
                data: vm.shop,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success");
                        vm.shop = {};
                        window.location.href = "pe_data_a.html";
                    } else {
                        alert("unknown error");
                    }
                }
            })
        }
    }
});

function upload_img(obj) {
    var inputId = obj.id;
    if (!obj.files[0].size > 0) {
        alert("please select file first！");
        return;
    } else {
        $.ajaxFileUpload({
            url: "/file/upload",
            data: {
                "user_id": vm.user.user_id
            },
            secureuri: false,
            fileElementId: obj.id,
            dataType: 'json',
            success: function (r, status) {
                //赋值
                if (inputId == "com_logo") {
                    vm.shop.com_logo = r.data;
                }
            },
            error: function (r, status, e) {
                alert(e);
            }
        })
    }
}