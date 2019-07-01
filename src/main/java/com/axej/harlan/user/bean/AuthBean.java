package com.axej.harlan.user.bean;

/**
 * Description:实名认证 bean
 * Created by IntelliJ IDEA
 * @author :jaywechen
 * Date:12:27 2017/12/2
 */
public class AuthBean {
    //主键 自增长
    private int auth_id;
    //真实姓名
    private String real_name;
    //身份证号
    private String id_card;
    //身份证正面 文件路径
    private String opposite_pic;
    //身份证反面 文件路径
    private String negative_pic;
    //是否审核 mysql缺省 0:待审核,1:审核通过
    private String is_audit;
    //外键 userid
    private int user_id;

    public int getAuth_id() {
        return auth_id;
    }

    public void setAuth_id(int auth_id) {
        this.auth_id = auth_id;
    }

    public String getReal_name() {
        return real_name;
    }

    public void setReal_name(String real_name) {
        this.real_name = real_name;
    }

    public String getId_card() {
        return id_card;
    }

    public void setId_card(String id_card) {
        this.id_card = id_card;
    }

    public String getOpposite_pic() {
        return opposite_pic;
    }

    public void setOpposite_pic(String opposite_pic) {
        this.opposite_pic = opposite_pic;
    }

    public String getNegative_pic() {
        return negative_pic;
    }

    public void setNegative_pic(String negative_pic) {
        this.negative_pic = negative_pic;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getIs_audit() {
        return is_audit;
    }

    public void setIs_audit(String is_audit) {
        this.is_audit = is_audit;
    }

}
