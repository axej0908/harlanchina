var flag = true;
var limit = 20;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        enquiry:{},
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
                url: "/log/currentChinaUser",
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
                        alert("sign out success!");
                        window.open("../login_zh.html", "_self");
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
            } else if(vm.searchType == "cas"){
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else {
                alert("error");
            }
        },

        /**
         * 1.submit application
         */
        submitEnquiry: function () {
            //pre check1: user_id
            if (vm.user == null) {
                alert(WARN_LOGIN);
                window.open("login_zh.html", "_self");
                return;
            } else {
                vm.enquiry.buyer_id = vm.user.user_id;
            }
            //pre check2: goods_id
            vm.enquiry.zh_pos = getQueryString('type');
            $.ajax({
                url: "/tarEnquiry/save",
                type: "post",
                data: vm.enquiry,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success");
                    } else {
                        alert("failure");
                    }
                    //reset submit data
                    window.location.href = 'see_details.html';
                }
            })
        }

    }
});
