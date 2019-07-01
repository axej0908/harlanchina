var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},

        //购物车总量
        gross: 0,
        carShow: true
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
            vm.quantity();
        })
    },
    filters:{},
    methods: {
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                async: false,
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user == null) {
                        window.location.href = "login_en.html";
                    }else {
                        //供应商 隐藏购物车
                        vm.user.biz_type == "buyer_en" ? vm.carShow = true : vm.carShow = false;
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
        //修改用户信息
        saveUserInfo: function () {
            if(typeof vm.user.user_id == "undefined"){
                alert("error");
                return;
            }
            //判断全名不能为空
            if(vm.user.real_name == "" || vm.user.real_name == null){
                alert("full name can not be blank");
                return;
            }else {
                var re = /^[\u4E00-\u9FA5A-Za-z].{2,20}$/;
                r = re.test(vm.user.real_name);
                if(!r){
                    alert("Only letters and characters can be entered");
                    return;
                }
            }
            //判断性别不能为空
            /*if(vm.user.user_gender == "" || vm.user.user_gender == null){
                alert("Unselected gender");
                return;
            }*/
            //判断地址不能为空
            if(vm.user.company_address == "" || vm.user.company_address == null){
                alert("The address cannot be empty");
                return;
            }
            var user = {
                user_id:vm.user.user_id,
                real_name:vm.user.real_name,
                user_gender:vm.user.user_gender,
                contact_phone:vm.user.contact_phone,
                company_address:vm.user.company_address
            };

            $.ajax({
                url: "/user/update",
                type: "post",
                data: user,
                dataType: "json",
                asycn:false,
                success: function (r) {
                    if (r.code == 0) {
                        alert("success!");
                        /*vm.logout();*/
                        window.open("buyer_info.html", "_self");
                    }
                }
            })
        },

        /**
         * 购物车总量
         */
        quantity : function () {
            if(vm.user != null){
                $.ajax({
                    url: '/cart/quantity',
                    async: false,
                    data: {
                        jsonStr: JSON.stringify({"user_id": vm.user.user_id, "page": 1, limit: "10"})
                    },
                    type: "post",
                    datatype: "json",
                    success : function (r) {
                        if(r.code == 0){
                            vm.gross = r.data;
                        }
                    }
                })
            }
        },
    }
});

// 上传文件
function upload(obj) {
    /**
     * 回显头像图片
     * @type {*|jQuery|HTMLElement}
     */
    if (!obj.files[0].size > 0) {
        alert("请选择文件");
        return;
    } else {
        $.ajaxFileUpload({
            url: "/file/upload",
            type: "post",
            data:{
                "user_id":vm.user.user_id
            },
            secureuri: false,
            fileElementId: obj.id,
            dataType: 'json',
            success: function (r, status) {
                //文件路径
                vm.user.user_photo = r.data;
            },
            error: function (r, status, e) {
                alert(e);
            }
        })
    }
    var imgURL, FileReader = window.FileReader;
    //chrome
    if (FileReader) {
        var reader = new FileReader();
        reader.onload = function (e) {
            imgURL = e.target.result;
            $(".head_pic").css('background-image', "url(" + imgURL + ")");
        };
        reader.readAsDataURL(obj.files[0]);

    }

}

