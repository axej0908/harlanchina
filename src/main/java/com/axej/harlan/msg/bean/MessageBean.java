package com.axej.harlan.msg.bean;

import java.io.Serializable;

/**
 * Description：消息
 * Package com.axej.harlan.msg.bean
 * Class MessageBean
 * Aauthor：Ning
 * Date：17:27 2018/12/20
 */
public class MessageBean implements Serializable{
    private static final long serialVersionUID = 6678874612382853689L;

    private int mess_id;
    private String mess_type;
    private String title;
    private String content;
    private String create_time;

    /**
     * 冗余字段
     */
    private String status;
    private int user_id;

    public int getMess_id() {
        return mess_id;
    }

    public void setMess_id(int mess_id) {
        this.mess_id = mess_id;
    }

    public String getMess_type() {
        return mess_type;
    }

    public void setMess_type(String mess_type) {
        this.mess_type = mess_type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

}
