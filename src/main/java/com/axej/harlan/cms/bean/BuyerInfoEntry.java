package com.axej.harlan.cms.bean;

/**
 * @Author: jaywechen
 * @Description: 采购商信息录入 poi
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:00 2018/3/28
 */
public class BuyerInfoEntry {
    private int poi_id;
    private String region;
    private String buyer_name;
    private String credit_rate;
    private String leader;
    private String address;
    private String contact;
    private String landline;
    private String fax;
    private String mailbox;
    private String goods_name;
    private int goods_num;
    private String destination;

    public int getPoi_id() {
        return poi_id;
    }

    public void setPoi_id(int poi_id) {
        this.poi_id = poi_id;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getBuyer_name() {
        return buyer_name;
    }

    public void setBuyer_name(String buyer_name) {
        this.buyer_name = buyer_name;
    }

    public String getCredit_rate() {
        return credit_rate;
    }

    public void setCredit_rate(String credit_rate) {
        this.credit_rate = credit_rate;
    }

    public String getLeader() {
        return leader;
    }

    public void setLeader(String leader) {
        this.leader = leader;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getLandline() {
        return landline;
    }

    public void setLandline(String landline) {
        this.landline = landline;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getMailbox() {
        return mailbox;
    }

    public void setMailbox(String mailbox) {
        this.mailbox = mailbox;
    }

    public String getGoods_name() {
        return goods_name;
    }

    public void setGoods_name(String goods_name) {
        this.goods_name = goods_name;
    }

    public int getGoods_num() {
        return goods_num;
    }

    public void setGoods_num(int goods_num) {
        this.goods_num = goods_num;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
}
