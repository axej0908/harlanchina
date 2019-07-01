package com.axej.harlan.goods.bean;

/**
 * @Author: jaywechen
 * @Description: 五大服务
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 9:56 2018/3/7
 */
public class FiveServBean {

    private int five_id;
    private int user_id;
    private String five_type;
    private String border_type;
    private String com_name;
    private String com_addr;
    private String contact;
    private String contact_phone;
    private String mailbox;
    private String create_time;
    private String appl_status;
    private String postscript;
    private String harlan_file;
    private String supply_file;

    public String getPostscript() {
        return postscript;
    }

    public void setPostscript(String postscript) {
        this.postscript = postscript;
    }

    public int getFive_id() {
        return five_id;
    }

    public void setFive_id(int five_id) {
        this.five_id = five_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getCom_name() {
        return com_name;
    }

    public void setCom_name(String com_name) {
        this.com_name = com_name;
    }

    public String getCom_addr() {
        return com_addr;
    }

    public void setCom_addr(String com_addr) {
        this.com_addr = com_addr;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getContact_phone() {
        return contact_phone;
    }

    public void setContact_phone(String contact_phone) {
        this.contact_phone = contact_phone;
    }

    public String getMailbox() {
        return mailbox;
    }

    public void setMailbox(String mailbox) {
        this.mailbox = mailbox;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public String getAppl_status() {
        return appl_status;
    }

    public void setAppl_status(String appl_status) {
        this.appl_status = appl_status;
    }

    public String getFive_type() {
        return five_type;
    }

    public void setFive_type(String five_type) {
        this.five_type = five_type;
    }

    public String getBorder_type() {
        return border_type;
    }

    public void setBorder_type(String border_type) {
        this.border_type = border_type;
    }

    public String getHarlan_file() {
        return harlan_file;
    }

    public void setHarlan_file(String harlan_file) {
        this.harlan_file = harlan_file;
    }

    public String getSupply_file() {
        return supply_file;
    }

    public void setSupply_file(String supply_file) {
        this.supply_file = supply_file;
    }
}
