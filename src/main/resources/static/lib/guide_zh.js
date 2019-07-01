var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        supply: {}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    methods: {

        /**
         * 1.to be vip
         */
        toBeVip:function () {
            //pre check1: sign in or not
            if(vm.user!=null){
                window.open("pe_index_vip.html", "_self");
            }else {
                window.open("pe_index_vip2.html", "_self");
            }
        },
        
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentChinaUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if(r.code == 0){
                        if(r.data != null){
                            if(r.data.biz_type == "seller_zh"){
                                vm.user = r.data;
                            }else {
                                vm.user = null;
                            }
                        }else {
                            vm.user = null;
                        }
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

        /**
         * 申请开店
         */
        applyShop : function () {
            if(vm.user == null){
                window.open("register_zh.html", "_self");
            }else {
                window.open("sale_firm_store_flow1.html", "_self");
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

        /**
         * 供应链金融
         */
        before : function () {
            if(vm.user == null || vm.user.user_id == null || typeof vm.user.user_id == "undefined") {
                alert("请重新登录!");
                window.open("login_zh.html", "_self");
                return;
            }else {
                $(".mask").show();
                $(".opacity2").show();
            }
        },

        /**
         * 供应链金融
         */
        submitApplica : function () {
            //联系人姓名
            if (vm.supply.contacts_name == null || typeof vm.supply.contacts_name == "undefined") {
                alert("联系人姓名不能为空!");
                return;
            }
            //联系人电话
            if (vm.supply.contacts_phone == null || typeof vm.supply.contacts_phone == "undefined") {
                alert("联系人电话不能为空!");
                return;
            }
            //身份证号
            if (vm.supply.id_number == null || typeof vm.supply.id_number == "undefined") {
                alert("身份证号不能为空!");
                return;
            }
            //户籍
            if (vm.supply.household_register == null || typeof vm.supply.household_register == "undefined") {
                alert("户籍不能为空!");
                return;
            }
            //现住地
            if (vm.supply.current_residence == null || typeof vm.supply.current_residence == "undefined") {
                alert("现住地不能为空!");
                return;
            }
            //公司名称
            if (vm.supply.company_name == null || typeof vm.supply.company_name == "undefined") {
                alert("公司名称不能为空!");
                return;
            }
            //公司地址
            if (vm.supply.company_site == null || typeof vm.supply.company_site == "undefined") {
                alert("公司地址不能为空!");
                return;
            }
            //公司电话
            if (vm.supply.company_phone == null || typeof vm.supply.company_phone == "undefined") {
                alert("公司座机不能为空!");
                return;
            }
            //审计报告
            if (vm.supply.audit_reports == null || typeof vm.supply.audit_reports == "undefined") {
                alert("审计报告不能为空!");
                return;
            }
            //财务报表
            if (vm.supply.financial_statement == null || typeof vm.supply.financial_statement == "undefined") {
                alert("财务报表不能为空!");
                return;
            }
            //申请额度
            if (vm.supply.apply_amount == null || typeof vm.supply.apply_amount == "undefined") {
                alert("申请额度不能为空!");
                return;
            }
            vm.supply.user_id = vm.user.user_id;
            vm.supply.border_type = 'ch';

            $.ajax({
                url: '/supplyServ/save',
                type: "post",
                data: vm.supply,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("提交成功!");
                        window.open("guide_zh.html", "_self");
                    }else {
                        alert("提交失败!");
                    }
                }
            })
        }
    }
});