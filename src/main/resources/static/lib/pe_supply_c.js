var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //搜索框搜索类别
        searchType: 'supplier',
        //输入的商品名称或者供应商
        searchParam: null,

        supply: {}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
            vm.supply.supply_id = getQueryString("supply_id");
            vm.detailSupply();

        })
    },
    methods: {
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentChinaUser",
                async: false,
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user == null) {
                        /*window.open("../login_en.html" , "_self");*/
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
                        alert("请重新登录!");
                        window.open("login_zh.html", "_self");
                    }
                }
            })
        },

        //导航栏搜索跳转
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
         * 上传图片
         * @param event
         */
        uploadImg: function (event) {
            var obj = event.target;
            /*var $file = $(obj);
            var fileObj = $file[0];
            var windowURL = window.URL || window.webkitURL;
            var dataURL;
            var $img = $(obj).parent();
            if(fileObj && fileObj.files && fileObj.files[0]){
                dataURL = windowURL.createObjectURL(fileObj.files[0]);
                $img.css('background-image',"url("+dataURL+")");
            }
            $img.find("span").html("");*/

            var inputId = obj.id;
            //根据id判断生产环境还是办公环境
            $.ajaxFileUpload({
                url: "/file/upload",
                type: "post",
                data: {
                    "user_id": vm.user.user_id
                },
                secureuri: false,
                fileElementId: obj.id,
                dataType: 'json',
                success: function (r, status) {
                    //文件路径
                    if (inputId == "audit_reports") {
                        vm.supply.audit_reports = r.data;
                    }else if (inputId == "financial_statement"){
                        vm.supply.financial_statement = r.data;
                    }
                    alert("success");
                },
                error: function (r, status, e) {
                    alert(e);
                }
            })
        },


        detailSupply : function(){
            $.ajax({
                url: '/supplyServ/detail',
                data: {
                    "supply_id": vm.supply.supply_id
                },
                type: "post",
                dataType: "json",
                success : function (r) {
                    if(r.code == 0){
                        vm.supply = r.data;
                    }
                }
            })
        },

        editSupply : function(){
            vm.supply.supply_state = '0';
            $.ajax({
                url: '/supplyServ/edit',
                data: vm.supply,
                type: "post",
                dataType: "json",
                success : function (r) {
                    if(r.code == 0){
                        alert("成功");
                        window.open("pe_index_supply_zh.html", "_self ");
                    }else {
                        alert("失败");
                    }
                }
            })
        },


        orderChainState : function (val) {
            if(val == '0'){
                return "to audit";
            }
            if(val == "1"){
                return "pass";
            }
            if(val == "-1"){
                return "reject"
            }
        }

    }
});
