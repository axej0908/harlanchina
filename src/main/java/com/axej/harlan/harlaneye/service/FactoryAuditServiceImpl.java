package com.axej.harlan.harlaneye.service;

import com.axej.harlan.harlaneye.bean.FactoryAuditBean;
import com.axej.harlan.harlaneye.dao.FactoryAuditDao;
import com.sun.istack.internal.FinalArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FactoryAuditServiceImpl implements FactoryAuditService {

    @Autowired
    FactoryAuditDao factoryAuditDao;

    @Override
    public boolean insertFactoryAudit(FactoryAuditBean factoryAuditBean) {

        if(factoryAuditDao.insertFactoryAudit(factoryAuditBean)>0)
        {
            return true;
        }else
        {
            return false;
        }

    }

    @Override
    public List<FactoryAuditBean> getFactoryAuditByUserAndStatus(String user_id, int factoryAudit_status) {
        List<FactoryAuditBean> factoryAuditBeanList =new ArrayList<FactoryAuditBean>();
        if(factoryAudit_status==0)
        {
            //获取全部状态
           return factoryAuditBeanList=factoryAuditDao.getFactoryAuditUserAll(user_id);
        }else{
            //获取status对应的状态
            return factoryAuditBeanList=factoryAuditDao.getFactoryAuditByUserStatus(user_id,factoryAudit_status);
        }
    }

    @Override
    public FactoryAuditBean getFactoryAuditById(String factoryAudit_id) {
        return factoryAuditDao.getFactoryAuditById(factoryAudit_id);
    }

    @Override
    public boolean updateFactoryAuditPrice(String factoryAudit_id, double promanagement_fee, double supplier_fee, double englishreport_fee, double others_fee, double travelling_fee, double totle_fee) {
        if(factoryAuditDao.updateFactoryAuditPrice(factoryAudit_id, promanagement_fee, supplier_fee, englishreport_fee, others_fee, travelling_fee, totle_fee)>0)
        {
            return true;
        }else {
            return false;

        }
    }

    @Override
    public boolean updateFactoryAuditStatus(String factoryAudit_id, int factoryAudit_status) {
        if(factoryAuditDao.updateFactoryAuditStatus(factoryAudit_id,factoryAudit_status)>0)
        {
            return true;
        }else{
            return false;
        }
    }


    @Override
    public boolean uploadFile(String factoryAudit_id, int fileType, String res) {
        int ret=0;
        if(fileType==1)
        {
            //上传委托单
            ret=factoryAuditDao.uploadCommission(factoryAudit_id,res);
        }else if(fileType==2)
        {
            //上传发票
            ret=factoryAuditDao.uploadInvoice(factoryAudit_id,res);
        }else if(fileType==3)
        {
            //上传报告
            ret=factoryAuditDao.uploadReport(factoryAudit_id,res);
        }else{
            return false;
        }

        if(ret>0)
        {
            return true;
        }else{
            return false;
        }
    }


    @Override
    public List<FactoryAuditBean> getTestingByStatus(int factoryAudit_status) {
        if(factoryAudit_status==0)
        {
            //获取全部订单
            return factoryAuditDao.getTestingByAllStatus();
        }else{
            //根据状态获取订单
            return factoryAuditDao.getTestingByStatus(factoryAudit_status);
        }

    }
}
