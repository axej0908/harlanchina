package com.axej.harlan.common.status;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 14:05 2018/4/18
 */
public class FiveSerCons {

    public enum ServiceStatus {
        /**
         * 未受理
         */
        SUSPEND("0"),

        /**
         * 已受理
         */
        SOLVED("1"),

        /**
         * 驳回
         */
        UNSOLVED("-1");

        ServiceStatus(String val) {
            this.val = val;
        }

        private String val;

        public String getVal() {
            return val;
        }

        public void setVal(String val) {
            this.val = val;
        }
    }
}
