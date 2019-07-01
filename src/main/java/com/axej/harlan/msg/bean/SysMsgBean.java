package com.axej.harlan.msg.bean;

/**
 * @Author: jaywechen
 * @Description: 系统消息
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:01 2017/12/21
 */
public class SysMsgBean {

    private String msg_id;
    private String msg_content;
    private String msg_time;
    private String msg_publisher;
    private String domestic;

    public String getDomestic() {
        return domestic;
    }

    public void setDomestic(String domestic) {
        this.domestic = domestic;
    }

    public String getMsg_id() {
        return msg_id;
    }

    public void setMsg_id(String msg_id) {
        this.msg_id = msg_id;
    }

    public String getMsg_content() {
        return msg_content;
    }

    public void setMsg_content(String msg_content) {
        this.msg_content = msg_content;
    }

    public String getMsg_time() {
        return msg_time;
    }

    public void setMsg_time(String msg_time) {
        this.msg_time = msg_time;
    }

    public String getMsg_publisher() {
        return msg_publisher;
    }

    public void setMsg_publisher(String msg_publisher) {
        this.msg_publisher = msg_publisher;
    }
}
