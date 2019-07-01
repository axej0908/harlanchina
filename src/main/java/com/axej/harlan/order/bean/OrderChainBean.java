package com.axej.harlan.order.bean;

import java.io.Serializable;

/**
 * Description：支付方式-供应链金融
 * Tools: IntelliJ IDEA
 * Aauthor：cheungn
 * Date：17:18 2019/3/26
 */
public class OrderChainBean implements Serializable {
    private static final long serialVersionUID = 65774024565071257L;

    private int chain_id;
    private int user_id;
    private String create_time;
    private String contacts_name;
    private String contacts_phone;
    private String id_number;
    private String household_register;
    private String current_residence;
    private String company_name;
    private String company_site;
    private String company_phone;
    private String audit_reports;
    private String financial_statement;
    private String apply_amount;
    private String choose;
    private String upload;
    private String order_id;

    public int getChain_id() {
        return chain_id;
    }

    public void setChain_id(int chain_id) {
        this.chain_id = chain_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public String getContacts_name() {
        return contacts_name;
    }

    public void setContacts_name(String contacts_name) {
        this.contacts_name = contacts_name;
    }

    public String getContacts_phone() {
        return contacts_phone;
    }

    public void setContacts_phone(String contacts_phone) {
        this.contacts_phone = contacts_phone;
    }

    public String getId_number() {
        return id_number;
    }

    public void setId_number(String id_number) {
        this.id_number = id_number;
    }

    public String getHousehold_register() {
        return household_register;
    }

    public void setHousehold_register(String household_register) {
        this.household_register = household_register;
    }

    public String getCurrent_residence() {
        return current_residence;
    }

    public void setCurrent_residence(String current_residence) {
        this.current_residence = current_residence;
    }

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public String getCompany_site() {
        return company_site;
    }

    public void setCompany_site(String company_site) {
        this.company_site = company_site;
    }

    public String getCompany_phone() {
        return company_phone;
    }

    public void setCompany_phone(String company_phone) {
        this.company_phone = company_phone;
    }

    public String getAudit_reports() {
        return audit_reports;
    }

    public void setAudit_reports(String audit_reports) {
        this.audit_reports = audit_reports;
    }

    public String getFinancial_statement() {
        return financial_statement;
    }

    public void setFinancial_statement(String financial_statement) {
        this.financial_statement = financial_statement;
    }

    public String getApply_amount() {
        return apply_amount;
    }

    public void setApply_amount(String apply_amount) {
        this.apply_amount = apply_amount;
    }

    public String getChoose() {
        return choose;
    }

    public void setChoose(String choose) {
        this.choose = choose;
    }

    public String getUpload() {
        return upload;
    }

    public void setUpload(String upload) {
        this.upload = upload;
    }

    public String getOrder_id() {
        return order_id;
    }

    public void setOrder_id(String order_id) {
        this.order_id = order_id;
    }
}
