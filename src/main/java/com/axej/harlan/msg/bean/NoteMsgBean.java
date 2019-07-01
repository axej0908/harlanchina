package com.axej.harlan.msg.bean;

/**
 * @Author: jaywechen
 * @Description: 通知消息
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:01 2017/12/21
 */
public class NoteMsgBean {
    private int msg_id;
    private int user_id;
    private String msg_type;
    private int source_id;
    private String content;
    private String create_time;

    public String getMsg_type() {
        return msg_type;
    }

    public void setMsg_type(String msg_type) {
        this.msg_type = msg_type;
    }

    public int getMsg_id() {
        return msg_id;
    }

    public void setMsg_id(int msg_id) {
        this.msg_id = msg_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getSource_id() {
        return source_id;
    }

    public void setSource_id(int source_id) {
        this.source_id = source_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }
}
