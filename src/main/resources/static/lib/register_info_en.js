var vm = new Vue({
    el: "#rrapp",
    data: {
        user_type: 'per',
        user: {
            user_type: 'per'
        },
        users: {}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.user.user_id = getQueryString("user_id");
            vm.users.user_id = getQueryString("user_id");
        })
    },
    watch: {
        user_type: function (val, oldVal) {
            var user_id = vm.user.user_id;
            vm.user = {};
            vm.user.user_id = user_id;
            vm.user.user_type = val;
        }
    },
    methods: {
        /**
         * 1.注册- 完善信息
         */
        register: function () {
            if (typeof vm.user.user_id == "undefined"){
                alert("error");
                return;
            }else {
                vm.user.user_state = 'normal';
            }
            console.log("注册完善的用户信息："+JSON.stringify(vm.user));
            $.ajax({
                url: '/user/update',
                async: false,
                data: vm.user,
                type: "post",
                dataType: "json",
                success : function (r) {
                    if(r.code == 0){
                        vm.detail();
                    }
                }
            })
        },

        detail : function () {
            $.ajax({
                url: '/user/detail',
                async: false,
                data: {
                    user_id: vm.users.user_id
                },
                type: "post",
                dataType: "json",
                success : function (r) {
                    if(r.code == 0){
                        vm.users = r.result;
                        vm.login();
                    }
                }
            })
        },

        login : function () {
            $.ajax({
                url: '/log/login',
                async: false,
                data: {
                    user_phone: vm.users.user_phone,
                    user_password: vm.users.user_password
                },
                type: "post",
                datatype: "json",
                success : function (r) {
                    if(r.code == 0){
                        if(r.data.biz_type == "seller_en"){
                            vm.shop(r.data.user_id);
                        }
                    }else {
                        alert("username or password error");
                        return false;
                    }
                }
            })
        },
        
        shop : function (user_id) {
            $.ajax({
                url: '/shop/detail',
                async: false,
                data: {
                    user_id: user_id
                },
                type: "post",
                dataType: "json",
                success : function (r) {
                    if(r.data != null){
                        window.location.href = "index.html";
                    }else {
                        if(vm.users.user_type == "per"){
                            window.location.href = "sale_person_store_flow.html";
                        }else if(vm.users.user_type == "com"){
                            window.location.href = "sale_firm_store_flow.html";
                        }
                    }
                }
            })
        }
    }
});

function upload_img(obj) {
    var $file = $(obj);
    var fileObj = $file[0];
    var windowURL = window.URL || window.webkitURL;
    var dataURL;
    var $img = $(obj).parent();
    if (fileObj && fileObj.files && fileObj.files[0]) {
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
        $img.css('background-image', "url(" + dataURL + ")");
    }
    $img.find("span").html("");

    var inputId = obj.id;
    console.log("file ID:"+inputId);
    if (!obj.files[0].size > 0) {
        alert("请选择文件！");
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
                if (inputId == "cardo_src") {
                    vm.user.cardo_src = r.data;
                } else if (inputId == "cardn_src") {
                    vm.user.cardn_src = r.data;
                } else if (inputId == "cardh_src") {
                    vm.user.cardh_src = r.data;
                } else if (inputId.substr(0, 10) == "attachment") {
                    vm.user.attachment = r.data;
                } else if (inputId == "license_src") {
                    vm.user.license_src = r.data;
                }
            },
            error: function (r, status, e) {
                alert(e);
            }
        })
    }
}


