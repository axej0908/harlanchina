package com.axej.harlan.cms.bean;

import java.io.Serializable;
import java.util.List;

/**
 * Description：化合物
 * Package com.axej.harlan.cms.bean
 * Class CompoundBean
 * Aauthor：Ning
 * Date：10:13 2018/8/9
 */
public class CompoundBean implements Serializable{

    private static final long serialVersionUID = 7420289961566215491L;

    private int cpd_id;
    private String cpd_type;
    private String cpd_time;
    private String cpd_name_en;
    private String cpd_name_zh;
    private String cpd_picture;
    private String cpd_alias_en;
    private String cpd_alias_zh;
    private String cas;
    private String precise_quality;
    private String molecular_formula;
    private String logp;
    private String molecular_weight;
    private String psa;
    private String reference_price;
    private String cpd_intro;
    private String basic_data;
    private String property;
    private String safety_data;
    private String produce_use;
    private String sds_zh;
    private String sds_en;
    private String msds;
    private String custom_data;
    private String atlas;
    private String toxicity;

    private String operator;

    private int goods_id;

    /**
     * 冗余参数
     */
    private String one_type;
    private String two_type;

    /**
     * 合成路线
     */
    private List<SyntheticRouteBean> syntheticRouteBeans;

    /**
     * 上下游
     */
    private List<UpDownStreamBean> upDownStreamBeans;

    //上游
    private List<UpDownStreamBean> upStreams;

    //下游
    private List<UpDownStreamBean> downStreams;


    public int getCpd_id() {
        return cpd_id;
    }

    public void setCpd_id(int cpd_id) {
        this.cpd_id = cpd_id;
    }

    public String getCpd_type() {
        return cpd_type;
    }

    public void setCpd_type(String cpd_type) {
        this.cpd_type = cpd_type;
    }

    public String getCpd_time() {
        return cpd_time;
    }

    public void setCpd_time(String cpd_time) {
        this.cpd_time = cpd_time;
    }

    public String getCpd_name_en() {
        return cpd_name_en;
    }

    public void setCpd_name_en(String cpd_name_en) {
        this.cpd_name_en = cpd_name_en;
    }

    public String getCpd_name_zh() {
        return cpd_name_zh;
    }

    public void setCpd_name_zh(String cpd_name_zh) {
        this.cpd_name_zh = cpd_name_zh;
    }

    public String getCpd_picture() {
        return cpd_picture;
    }

    public void setCpd_picture(String cpd_picture) {
        this.cpd_picture = cpd_picture;
    }

    public String getCpd_alias_en() {
        return cpd_alias_en;
    }

    public void setCpd_alias_en(String cpd_alias_en) {
        this.cpd_alias_en = cpd_alias_en;
    }

    public String getCpd_alias_zh() {
        return cpd_alias_zh;
    }

    public void setCpd_alias_zh(String cpd_alias_zh) {
        this.cpd_alias_zh = cpd_alias_zh;
    }

    public String getCas() {
        return cas;
    }

    public void setCas(String cas) {
        this.cas = cas;
    }

    public String getPrecise_quality() {
        return precise_quality;
    }

    public void setPrecise_quality(String precise_quality) {
        this.precise_quality = precise_quality;
    }

    public String getMolecular_formula() {
        return molecular_formula;
    }

    public void setMolecular_formula(String molecular_formula) {
        this.molecular_formula = molecular_formula;
    }

    public String getLogp() {
        return logp;
    }

    public void setLogp(String logp) {
        this.logp = logp;
    }

    public String getMolecular_weight() {
        return molecular_weight;
    }

    public void setMolecular_weight(String molecular_weight) {
        this.molecular_weight = molecular_weight;
    }

    public String getPsa() {
        return psa;
    }

    public void setPsa(String psa) {
        this.psa = psa;
    }

    public String getReference_price() {
        return reference_price;
    }

    public void setReference_price(String reference_price) {
        this.reference_price = reference_price;
    }

    public String getCpd_intro() {
        return cpd_intro;
    }

    public void setCpd_intro(String cpd_intro) {
        this.cpd_intro = cpd_intro;
    }

    public String getBasic_data() {
        return basic_data;
    }

    public void setBasic_data(String basic_data) {
        this.basic_data = basic_data;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public String getSafety_data() {
        return safety_data;
    }

    public void setSafety_data(String safety_data) {
        this.safety_data = safety_data;
    }

    public String getProduce_use() {
        return produce_use;
    }

    public void setProduce_use(String produce_use) {
        this.produce_use = produce_use;
    }

    public String getSds_zh() {
        return sds_zh;
    }

    public void setSds_zh(String sds_zh) {
        this.sds_zh = sds_zh;
    }

    public String getSds_en() {
        return sds_en;
    }

    public void setSds_en(String sds_en) {
        this.sds_en = sds_en;
    }

    public String getMsds() {
        return msds;
    }

    public void setMsds(String msds) {
        this.msds = msds;
    }

    public String getCustom_data() {
        return custom_data;
    }

    public void setCustom_data(String custom_data) {
        this.custom_data = custom_data;
    }

    public String getAtlas() {
        return atlas;
    }

    public void setAtlas(String atlas) {
        this.atlas = atlas;
    }

    public String getToxicity() {
        return toxicity;
    }

    public void setToxicity(String toxicity) {
        this.toxicity = toxicity;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public int getGoods_id() {
        return goods_id;
    }

    public void setGoods_id(int goods_id) {
        this.goods_id = goods_id;
    }

    public String getOne_type() {
        return one_type;
    }

    public void setOne_type(String one_type) {
        this.one_type = one_type;
    }

    public String getTwo_type() {
        return two_type;
    }

    public void setTwo_type(String two_type) {
        this.two_type = two_type;
    }

    public List<SyntheticRouteBean> getSyntheticRouteBeans() {
        return syntheticRouteBeans;
    }

    public void setSyntheticRouteBeans(List<SyntheticRouteBean> syntheticRouteBeans) {
        this.syntheticRouteBeans = syntheticRouteBeans;
    }

    public List<UpDownStreamBean> getUpDownStreamBeans() {
        return upDownStreamBeans;
    }

    public void setUpDownStreamBeans(List<UpDownStreamBean> upDownStreamBeans) {
        this.upDownStreamBeans = upDownStreamBeans;
    }

    public List<UpDownStreamBean> getUpStreams() {
        return upStreams;
    }

    public void setUpStreams(List<UpDownStreamBean> upStreams) {
        this.upStreams = upStreams;
    }

    public List<UpDownStreamBean> getDownStreams() {
        return downStreams;
    }

    public void setDownStreams(List<UpDownStreamBean> downStreams) {
        this.downStreams = downStreams;
    }
}
