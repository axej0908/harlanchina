package com.axej.harlan.harlaneye.service;

import com.axej.harlan.harlaneye.bean.LoadingSupervisionBean;
import com.axej.harlan.harlaneye.dao.LoadingSupervisionDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoadingSupervisionServiceImpl implements LoadingSupervisionService {

    @Autowired
    LoadingSupervisionDao loadingSupervisionDao;

    @Override
    public boolean insertSupervision(LoadingSupervisionBean loadingSupervisionBean) {
        if(loadingSupervisionDao.insertSupervision(loadingSupervisionBean)>0)
        {
            return true;
        }else{
            return false;
        }
    }

    @Override
    public boolean updateSupervisionPrice(String supervision_id, double inspection_fee, double analysis_fee, double paper_fee, double added_fee, double others_fee, double travelling_fee, double englishreport_fee, double totle_fee) {
        if(loadingSupervisionDao.updateSupervisionPrice(supervision_id,inspection_fee, analysis_fee, paper_fee, added_fee, others_fee, travelling_fee, englishreport_fee, totle_fee)>0)
        {
            return true;
        }else
        {
            return false;
        }
    }

    @Override
    public boolean updateSupervisionStatusById(String supervision_id, int supervision_status) {

        if(loadingSupervisionDao.updateSupervisionStatusById(supervision_id,supervision_status)>0)
        {
            return true;
        }else
        {
            return false;
        }

    }

    @Override
    public boolean uploadFiles(String supervision_id, int fileType, String filesPath) {
        int ret=0;
        if(fileType==1)
        {
            //上传委托单
            ret= loadingSupervisionDao.uploadCommission(supervision_id,filesPath);
        }else if(fileType==2)
        {
            //上传发票
            ret= loadingSupervisionDao.uploadInvoice(supervision_id,filesPath);
        }else if(fileType==3)
        {
            //上传报告
            ret= loadingSupervisionDao.uploadReport(supervision_id,filesPath);
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
    public List<LoadingSupervisionBean> getSupervisionByStatus(int supervision_status) {
        if(supervision_status==0)
        {
            //获取所有的状态数据
            return loadingSupervisionDao.getSupervisionByAllStatus();
        }else{
            return loadingSupervisionDao.getSupervisionByStatus(supervision_status);
        }

    }

    @Override
    public List<LoadingSupervisionBean> getSupervisionByUserAndStatus(String user_id, int supervision_status) {
        if(supervision_status==0)
        {
            //获取该用户下的所有状态监装订单
            return loadingSupervisionDao.getSupervisionAllUserAndStatus(user_id);
        }else{

            //获取用户对应状态下的监装订单
            return loadingSupervisionDao.getSupervisionByUserAndStatus(user_id, supervision_status);
        }
    }

    @Override
    public LoadingSupervisionBean getSupervisionById(String supervision_id) {
        return loadingSupervisionDao.getSupervisionById(supervision_id);
    }
}
