var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        auth: {
            id_card:''
        },
        confirmIdCard:''
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    computed:{
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
                    vm.auth.user_id = vm.user.user_id;
                    vm.getAuthInfo();
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
        //获取实名认证信息
        getAuthInfo: function () {
            $.ajax({
                url: "/realNameAuth/detail",
                type: "post",
                data: {"user_id": vm.user.user_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.auth = r.data;
                        //正反面身份证图片显示
                        $("#oppositeBack").css('background-image',"url("+"../"+vm.auth.opposite_pic+")");
                        $("#negativeBack").css('background-image',"url("+"../"+vm.auth.negative_pic+")");
                    }
                }
            })
        },
        //实名认证修改或者
        saveOrUpdate: function () {
            if (typeof vm.auth.user_id == "undefined"){
                alert("error");
                window.open("login_en.html","_self");
                return;
            }
            console.log("保存或者修改的参数："+JSON.stringify(vm.auth));
            $.ajax({
                url: typeof vm.auth.auth_id == "undefined" ? "/realNameAuth/save" : "/realNameAuth/update",
                type: "post",
                data: vm.auth,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("提交成功!");
                    }
                }
            })
        }
    }
});

// 上传文件
function upload(obj) {

    var inputId = obj.id;
    var files = obj.files;
    if (files == null || files.length <= 0) {
        alert("请选择文件！");
        return;
    }
    if (files[0].size <= 0) {
        alert("文件大小为0，请重新选择文件");
        return;
    }
    $.ajaxFileUpload({
        url: "/file/upload",
        data:{
            "user_id":vm.user.user_id
        },
        secureuri: false,
        fileElementId: obj.id,
        dataType: 'json',
        success: function (r, status) {
            if (inputId == "opposite") {
                vm.auth.opposite_pic = r.data;
            }else if (inputId == "negative"){
                vm.auth.negative_pic = r.data;
            }
        },
        error: function (r, status, e) {
            alert(e);
        }
    });

    /**
     * 回显头像图片
     * @type {*|jQuery|HTMLElement}
     */
    var imgURL,FileReader = window.FileReader;
    //chrome
    if (FileReader) {
        var reader = new FileReader();
        reader.onload = function (e) {
            imgURL = e.target.result;
            if (inputId == "opposite") {
                $('#oppositeBack').css('background-image', "url(" + imgURL + ")");
            }else if (inputId == "negative"){
                $('#negativeBack').css('background-image', "url(" + imgURL + ")");
            }
        };
        reader.readAsDataURL(obj.files[0]);
    }
}

