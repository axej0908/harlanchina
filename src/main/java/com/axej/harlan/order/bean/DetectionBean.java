package com.axej.harlan.order.bean;

/**
 * Description:付费三方检测订单(区别于免费的三方检测)
 * Created by IntelliJ IDEA
 * @author :jaywechen
 * Date:18:26 2017/12/12
 */
public class DetectionBean {
    private int detect_id;
    /**检测产品名称  */
    private String de_name;
    //提交申请时间
    private String submit_time;
    //检测时间
    private String detect_time;
    //结束时间
    private String finish_time;
    //检测状态(待受理、检测中、已测完）
    private String de_state;
    //检测结果(文件，路径以逗号分隔）
    private String result_path;
    //检测项目(水分、浓度等以逗号分隔）
    private String detect_item;
    //委托人姓名
    private String consignor;
    //委托人移动电话
    private String mobile;
    //委托人所在的公司
    private String corporation;
    //委托人id
    private int user_id;
    //检测所需要费用
    private String total_fee;

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getTotal_fee() {
        return total_fee;
    }

    public void setTotal_fee(String total_fee) {
        this.total_fee = total_fee;
    }

    public int getDetect_id() {
        return detect_id;
    }

    public void setDetect_id(int detect_id) {
        this.detect_id = detect_id;
    }

    public String getDe_name() {
        return de_name;
    }

    public void setDe_name(String de_name) {
        this.de_name = de_name;
    }

    public String getSubmit_time() {
        return submit_time;
    }

    public void setSubmit_time(String submit_time) {
        this.submit_time = submit_time;
    }

    public String getDetect_time() {
        return detect_time;
    }

    public void setDetect_time(String detect_time) {
        this.detect_time = detect_time;
    }

    public String getFinish_time() {
        return finish_time;
    }

    public void setFinish_time(String finish_time) {
        this.finish_time = finish_time;
    }

    public String getDe_state() {
        return de_state;
    }

    public void setDe_state(String de_state) {
        this.de_state = de_state;
    }

    public String getResult_path() {
        return result_path;
    }

    public void setResult_path(String result_path) {
        this.result_path = result_path;
    }

    public String getDetect_item() {
        return detect_item;
    }

    public void setDetect_item(String detect_item) {
        this.detect_item = detect_item;
    }

    public String getConsignor() {
        return consignor;
    }

    public void setConsignor(String consignor) {
        this.consignor = consignor;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getCorporation() {
        return corporation;
    }

    public void setCorporation(String corporation) {
        this.corporation = corporation;
    }
}
