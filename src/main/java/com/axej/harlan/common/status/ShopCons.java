package com.axej.harlan.common.status;

/**
 * @Author: jaywechen
 * @Description: 店铺变量以及状态
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 17:01 2018/1/20
 */
public class ShopCons {

    public enum ShopState{
        /**
         * 申请中
         */
        APPLYING("1"),

        /**
         * 正常运营
         */
        NORMAL("2"),

        /**
         * 关闭(包含申请驳回，后台关闭)
         */
        ABNORMAL("3");

        private String val;

        public String getVal() {
            return val;
        }

        private ShopState(String val){
            this.val = val;
        }
    }
}
