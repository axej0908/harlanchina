var flag = true;
var limit = 100;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //res of query
        supplys: [],
        //服务
        supply: {}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },

    filters: {
        /**
         * 从规格里获取 单价单位
         */
        getUnit: function (val) {
            if (val == '' || typeof val == "undefined") {
                return val;
            } else {
                return val.split("/")[1];
            }
        }
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
                        window.location.href = 'login_zh.html';
                    } else {
                        vm.supplyChainFinance();
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
         * 上传图片
         * @param event
         */
        uploadImg: function (event, supply_id) {
            var obj = event.target;
            var $file = $(obj);
            var fileObj = $file[0];
            var windowURL = window.URL || window.webkitURL;
            var dataURL;
            var $img = $(obj).parent();
            if(fileObj && fileObj.files && fileObj.files[0]){
                dataURL = windowURL.createObjectURL(fileObj.files[0]);
                $img.css('background-image',"url("+dataURL+")");
            }
            $img.find("span").html("");

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
                    if (inputId == "supply_file") {
                        vm.supply.supply_file = r.data;
                        vm.supply.supply_id = supply_id;
                        vm.editUploadFile();
                    }
                },
                error: function (r, status, e) {
                    alert(e);
                }
            })
        },

        /**
         * 供应链金融
         */
        supplyChainFinance : function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: '/supplyServ/queryList',
                data: {
                    "jsonStr": JSON.stringify({
                        user_id: vm.user.user_id,
                        border_type: "ch",
                        page: currPage + 1,
                        limit: limit
                    })
                },
                type: "post",
                dataType: "json",
                success : function (r) {
                    if (r.code == 0) {
                        /*if (flag) {
                            $("#pagerBar").pagination(r.count, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 5,
                                callback: vm.supplyChainFinance//回调函数
                            });
                            flag = false;
                        }*/
                        vm.supplys = r.data;
                    }
                }
            })
        },


        /**
         * 修改上传文件
         */
        editUploadFile : function () {
            $.ajax({
                url: '/supplyServ/edit',
                data: vm.supply,
                type: "post",
                dataType: "json",
                success : function (r) {
                    if(r.code == 0){
                        alert("上传成功!");
                    }else {
                        alert("上传失败!");
                    }
                }
            })
        }
    }
});

