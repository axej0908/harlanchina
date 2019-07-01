var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},

        //最新商品推荐
        guessYourLikes: []
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    filters:{
        /**
         * 从规格里获取 单价单位
         */
        getUnit:function (val) {
            if (val =='' || typeof val == "undefined"){
                return val;
            }else {
                return val.split("/")[1];
            }
        }
    },
    methods: {
        /**
         * 商品最新报价
         */
        preLoadGuessYouLike: function () {
            $.ajax({
                url: "/Merchandise/guessYouLike",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        user_id: vm.user.user_id,
                        page: 1,
                        limit: 100
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.guessYourLikes = r.data;
                    }
                }
            })
        },

        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user != null) {
                        vm.preLoadGuessYouLike();
                    }
                    //加载用户头像地址
                    if (vm.user.user_photo != null) {
                        var imgUrl = "../" + vm.user.user_photo;
                        $(".head_pic").css('background-image', "url(" + imgUrl + ")");
                    }
                    //加载用户所在的地区
                    var area = vm.user.user_area.split(",");
                    var province = area[0];
                    $(".city-picker-selector").find(".province a").html(province);
                    var city = area[1];
                    $(".city-picker-selector").find(".city a").html(city);
                    var district = area[2];
                    $(".city-picker-selector").find(".district a").html(district);
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
            var province = $(".city-picker-selector").find(".province a").html();
            var city = $(".city-picker-selector").find(".city a").html();
            var district = $(".city-picker-selector").find(".district a").html();
            vm.user.user_area = province + "," + city + "," + district;
            $.ajax({
                url: "/user/update",
                type: "post",
                data: vm.user,
                dataType: "json",
                asycn:false,
                success: function (r) {
                    if (r.code == 0) {
                        alert("修改成功,请重新登录确保信息及时更新！");
                        vm.logout();
                    }
                }
            })
        },

        /**
         * 我要开店
         * step1:查找是否已经开店
         * step2:已开,跳转到店铺详情页面；反之，跳转到新开店铺填写页面
         */
        preOpenShop:function () {
            if (vm.user.user_id == null || typeof vm.user.user_id == "undefined"){
                alert("please sign in again");
                window.open("login_en.html","_self");
            }
            $.ajax({
                url: "/shop/detail",
                type: "post",
                data: {user_id:vm.user.user_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        //跳转到店铺详情页面
                        var shop = base64.encode(JSON.stringify(r.data));
                        window.open("shop_detail2.html?shop="+shop,"_self");
                    }else if (r.code == 500){
                        //跳转到开店页面
                        window.open("pe_index_open_shop2.html","_self");
                    }
                }
            })
        }
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

