var limit = 10;
var flag = true;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        noteMsgs: []
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
            vm.preLoadNoteMsg();
        })
    },
    filters:{
        toMsgType:function (value) {
            if (value == 1){
                return "实单竞价";
            }
            if (value == 2){
                return "实单采购";
            }
            if (value == 3){
                return "免费找货";
            }
        }
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
                    vm.preLoadNoteMsg();
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
        //预加载通知消息列表
        preLoadNoteMsg: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/msg/note/list",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        "page": 1,
                        "limit": 10,
                        "user_id":vm.user.user_id
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBarP").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadPurList//回调函数
                            });
                            flag = false;
                        }
                        vm.noteMsgs = r.data.list;
                        console.log("预加载系统消息列表---：" + JSON.stringify(vm.noteMsgs));
                    }
                }
            })
        }
    }
});