package com.axej.harlan.goods.bean;

/**
 * @Author: jaywechen
 * @Description: 对指定商品询盘
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 9:40 2018/3/28
 */
public class TarEnquiryBean {

    private int en_id;
    private int goods_id;
    private int buyer_id;
    private String com_name;
    private String com_addr;
    private String com_contacts;
    private String com_number;
    private String com_mailbox;
    private String postscript;
    private String create_time;
    private String tar_status;
    private String zh_pos;

    private String enquiry_file;

    /**
     * 冗余字段
     */
    private String goods_name;
    private String user_photo;

    public String getUser_photo() {
        return user_photo;
    }

    public void setUser_photo(String user_photo) {
        this.user_photo = user_photo;
    }

    public String getGoods_name() {
        return goods_name;
    }

    public void setGoods_name(String goods_name) {
        this.goods_name = goods_name;
    }

    public String getTar_status() {
        return tar_status;
    }

    public void setTar_status(String tar_status) {
        this.tar_status = tar_status;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public int getEn_id() {
        return en_id;
    }

    public void setEn_id(int en_id) {
        this.en_id = en_id;
    }

    public int getGoods_id() {
        return goods_id;
    }

    public void setGoods_id(int goods_id) {
        this.goods_id = goods_id;
    }

    public int getBuyer_id() {
        return buyer_id;
    }

    public void setBuyer_id(int buyer_id) {
        this.buyer_id = buyer_id;
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

    public String getCom_contacts() {
        return com_contacts;
    }

    public void setCom_contacts(String com_contacts) {
        this.com_contacts = com_contacts;
    }

    public String getCom_number() {
        return com_number;
    }

    public void setCom_number(String com_number) {
        this.com_number = com_number;
    }

    public String getCom_mailbox() {
        return com_mailbox;
    }

    public void setCom_mailbox(String com_mailbox) {
        this.com_mailbox = com_mailbox;
    }

    public String getPostscript() {
        return postscript;
    }

    public void setPostscript(String postscript) {
        this.postscript = postscript;
    }

    public String getZh_pos() {
        return zh_pos;
    }

    public void setZh_pos(String zh_pos) {
        this.zh_pos = zh_pos;
    }

    public String getEnquiry_file() {
        return enquiry_file;
    }

    public void setEnquiry_file(String enquiry_file) {
        this.enquiry_file = enquiry_file;
    }
}
