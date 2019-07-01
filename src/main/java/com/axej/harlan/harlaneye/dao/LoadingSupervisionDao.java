package com.axej.harlan.harlaneye.dao;

import com.axej.harlan.harlaneye.bean.LoadingSupervisionBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface LoadingSupervisionDao {

    int insertSupervision(LoadingSupervisionBean loadingSupervisionBean);

    List<LoadingSupervisionBean> getSupervisionByUserAndStatus(@Param("user_id") String user_id, @Param("supervision_status") int supervision_status);

    List<LoadingSupervisionBean> getSupervisionAllUserAndStatus(@Param("user_id") String user_id);

    List<LoadingSupervisionBean> getSupervisionByStatus(@Param("supervision_status") int supervision_status);

    LoadingSupervisionBean getSupervisionById(@Param("supervision_id") String supervision_id);

    int updateSupervisionStatusById(@Param("supervision_id") String supervision_id ,@Param("supervision_status") int supervision_status);

    int updateSupervisionPrice(@Param("supervision_id") String supervision_id,@Param("inspection_fee") double inspection_fee,@Param("analysis_fee") double analysis_fee,@Param("paper_fee") double paper_fee,@Param("added_fee") double  added_fee,@Param("others_fee") double others_fee,@Param("travelling_fee") double travelling_fee,@Param("englishreport_fee") double englishreport_fee,@Param("total_fee") double total_fee);

    //上传委托单
    int uploadCommission(@Param("supervision_id") String supervision_id, @Param("commission_filepath") String file_path);

    //上传发票
    int uploadInvoice(@Param("supervision_id") String supervision_id,@Param("invoice_filepath") String file_path);

    //上传报告
    int uploadReport(@Param("supervision_id") String supervision_id,@Param("report_filepath") String file_path);

    List<LoadingSupervisionBean> getSupervisionByAllStatus();

}
