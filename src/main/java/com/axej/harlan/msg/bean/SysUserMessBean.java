package com.axej.harlan.msg.bean;

import java.io.Serializable;
import java.util.List;

/**
 * Description：绑定用户消息
 * Package com.axej.harlan.msg.bean
 * Class SysUserMessBean
 * Aauthor：Ning
 * Date：11:01 2018/12/24
 */
public class SysUserMessBean implements Serializable{
    private static final long serialVersionUID = 7923654721650573063L;

    private int bind_id;
    private int user_id;
    private int mess_id;
    private String status;

    public int getBind_id() {
        return bind_id;
    }

    public void setBind_id(int bind_id) {
        this.bind_id = bind_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getMess_id() {
        return mess_id;
    }

    public void setMess_id(int mess_id) {
        this.mess_id = mess_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
