package com.axej.harlan.harlaneye.service;

import com.axej.harlan.harlaneye.bean.LoadingSupervisionBean;

import java.util.List;

public interface LoadingSupervisionService {

    boolean insertSupervision(LoadingSupervisionBean loadingSupervisionBean);

    List<LoadingSupervisionBean> getSupervisionByUserAndStatus(String user_id, int supervision_status);

    List<LoadingSupervisionBean> getSupervisionByStatus(int supervision_status);

    LoadingSupervisionBean getSupervisionById(String supervision_id);

    boolean updateSupervisionStatusById(String supervision_id ,int supervision_status);

    boolean updateSupervisionPrice(String supervision_id,double inspection_fee,double analysis_fee,double paper_fee,double  added_fee,double others_fee,double travelling_fee,double englishreport_fee,double totle_fee);

    boolean  uploadFiles(String supervision_id, int fileType,  String filesPath);
}
