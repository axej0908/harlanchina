package com.axej.harlan.harlaneye.service;

import com.axej.harlan.harlaneye.bean.FactoryAuditBean;

import java.util.List;

public interface FactoryAuditService {

    boolean insertFactoryAudit(FactoryAuditBean factoryAuditBean);

    List<FactoryAuditBean> getFactoryAuditByUserAndStatus(String user_id,int factoryAudit_status);

    FactoryAuditBean getFactoryAuditById(String factoryAudit_id);

    boolean updateFactoryAuditPrice(String factoryAudit_id,double promanagement_fee,double supplier_fee,double englishreport_fee,double others_fee,double travelling_fee,double totle_fee);

    boolean updateFactoryAuditStatus(String factoryAudit_id,int factoryAudit_status);

    boolean uploadFile(String factoryAudit_id, int fileType, String res);

    List<FactoryAuditBean> getTestingByStatus(int factoryAudit_status);
}
