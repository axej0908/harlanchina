var vm = new Vue({
    el:"#rrapp",
    data:{
        user:{},
        //服务
        fiveSer:{
            five_type: 'har3'
        },
        //标题
        title:null,
        //弹框
        modalLogistic:false,

        //供应链金融服务
        supply: {},

        links: []
    },
    mounted: function() {
        this.$nextTick(function () {
            vm.getCurrentUser();
            vm.linksLoad();
        })
    },
    methods:{
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                async: false,
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
                        window.open("index.html", "_self");
                    }
                }
            })
        },
        
        pop_up : function (val) {
            if (vm.user == null || vm.user.user_id == null || typeof vm.user.user_id == "undefined") {
                alert("please sign in again");
                window.open("login_en.html", "_self");
                return;
            }

            //化浪眼
            if(val == '0'){
                vm.title = "Har Lan Eyes";
                $(".mask").show();
                $(".opacity").show();
            }
            //其他服务
            if(val == 'ser2'){
                vm.title = "Platform Guarantee";
                vm.fiveSer.five_type = val;
                $(".mask").show();
                $(".opacity1").show();
            }
            /*if(val == "ser3"){
                vm.title = "Supply Chain Finance";
                vm.fiveSer.five_type = val;
                $(".mask").show();
                $(".opacity1").show();
            }*/
        },

        /**
         * 化浪眼选择器
         * @param val
         */
        selector : function(val){
            vm.fiveSer.five_type = val;
        },

        //申请服务 提交弹框
        applySer: function (val) {
            //校验数字
            /*if(vm.fiveSer.contact != null || vm.fiveSer.contact != "" || vm.fiveSer.contact != "undefined"){
                var verify = /^[0-9]*$/;
                if(!verify.test(vm.fiveSer.contact)){
                    alert("Please enter the number!");
                    return false;
                }
            }*/
            if(vm.fiveSer.contact == null || vm.fiveSer.contact == "" || vm.fiveSer.contact == "undefined"){
                alert("Please enter the contact person!");
                return false;
            }
            //校验手机号
            /*if(vm.fiveSer.contact_phone != null || vm.fiveSer.contact_phone != "" || vm.fiveSer.contact_phone != "undefined"){
                var verify = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                if(!verify.test(vm.fiveSer.contact_phone)){
                    alert("Please enter a valid mobile phone number!");
                    return false;
                }
            }*/
            if(vm.fiveSer.contact_phone == null || vm.fiveSer.contact_phone == "" || vm.fiveSer.contact_phone == "undefined"){
                alert("Please enter your cell phone number!");
                return false;
            }

            vm.fiveSer.user_id = vm.user.user_id;
            vm.fiveSer.border_type = 'en';
            $.ajax({
                url: "/fiveSer/save",
                type: "post",
                data: vm.fiveSer,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.fiveSer = {};
                        vm.IsShow = false;
                        alert("submit succeed!");
                        /*if(val == '1'){
                            if(vm.user.biz_type == 'seller_en'){
                                window.open("pe_index_b.html", "_self");
                            }else if(vm.user.biz_type == 'buyer_en'){
                                window.open("order_buyer.html", "_self");
                            }
                        }else {
                            window.location.href = "guide_en.html";
                        }*/
                        window.location.href = "guide_en.html";
                    }else {
                        alert("submit failed!");
                        /*window.location.href = "guide_en.html";*/
                    }
                }
            })
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
         * 显示供应链金融弹框
         */
        before : function () {

            if (vm.user == null || vm.user.user_id == null || typeof vm.user.user_id == "undefined") {
                alert("please sign in again");
                window.open("login_en.html", "_self");
                return;
            }else {
                $(".mask").show();
                $(".opacity2").show();
            }
        },


        submitApplica : function () {
            //联系人姓名
            if (vm.supply.contacts_name == null || typeof vm.supply.contacts_name == "undefined") {
                alert("The contact name cannot be empty");
                return;
            }
            //联系人电话
            if (vm.supply.contacts_phone == null || typeof vm.supply.contacts_phone == "undefined") {
                alert("The contact number cannot be empty");
                return;
            }
            //身份证号
            if (vm.supply.id_number == null || typeof vm.supply.id_number == "undefined") {
                alert("ID card number cannot be empty");
                return;
            }
            //户籍
            if (vm.supply.household_register == null || typeof vm.supply.household_register == "undefined") {
                alert("Household registration cannot be empty");
                return;
            }
            //现住地
            if (vm.supply.current_residence == null || typeof vm.supply.current_residence == "undefined") {
                alert("The current residence cannot be empty");
                return;
            }
            //公司名称
            if (vm.supply.company_name == null || typeof vm.supply.company_name == "undefined") {
                alert("The company name cannot be empty");
                return;
            }
            //公司地址
            if (vm.supply.company_site == null || typeof vm.supply.company_site == "undefined") {
                alert("The company address cannot be empty");
                return;
            }
            //公司电话
            if (vm.supply.company_phone == null || typeof vm.supply.company_phone == "undefined") {
                alert("The company phone cannot be empty");
                return;
            }
            //审计报告
            if (vm.supply.audit_reports == null || typeof vm.supply.audit_reports == "undefined") {
                alert("The audit report cannot be empty");
                return;
            }
            //财务报表
            if (vm.supply.financial_statement == null || typeof vm.supply.financial_statement == "undefined") {
                alert("Financial statements cannot be empty");
                return;
            }
            //申请额度
            if (vm.supply.apply_amount == null || typeof vm.supply.apply_amount == "undefined") {
                alert("The applied quota cannot be empty");
                return;
            }
            vm.supply.user_id = vm.user.user_id;
            vm.supply.border_type = 'en';

            $.ajax({
                url: '/supplyServ/save',
                data: vm.supply,
                type: "post",
                dataType: "json",
                success : function (r) {
                    if(r.code == 0){
                        alert("success");
                        if(vm.user.biz_type == 'seller_en'){
                            window.open("pe_index_b.html", "_self");
                        }else if(vm.user.biz_type == 'buyer_en'){
                            window.open("order_buyer.html", "_self");
                        }
                    }else if(code == 500) {
                        alert("fail");
                    }
                }
            })
        },

        linksLoad : function () {
            $.ajax({
                url: '/links/queryList',
                data: {
                    "jsonStr": JSON.stringify({
                        links_type: 'lead',
                        page: 1,
                        limit: 100
                    })
                },
                type: "post",
                dataType: "json",
                success : function (r) {
                    if(r.code == 0){
                        vm.links = r.data;
                    }
                }
            })
        }
    }
});

