package com.axej.harlan.harlaneye.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.harlaneye.bean.FactoryAuditBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import javax.annotation.security.PermitAll;
import java.util.List;


@Repository
@Mapper
public interface FactoryAuditDao extends BaseDao<FactoryAuditBean> {

    int insertFactoryAudit(FactoryAuditBean factoryAuditBean);

    List<FactoryAuditBean> getFactoryAuditUserAll(@Param("user_id") String user_id);

    List<FactoryAuditBean> getFactoryAuditByUserStatus(@Param("user_id") String user_id, @Param("factoryAudit_status") int factoryAudit_status);

    FactoryAuditBean getFactoryAuditById(@Param("factoryAudit_id") String factoryAudit_id);

    int updateFactoryAuditPrice(@Param("factoryAudit_id") String factoryAudit_id, @Param("promanagement_fee") double promanagement_fee, @Param("supplier_fee") double supplier_fee, @Param("englishreport_fee") double englishreport_fee,@Param("others_fee") double others_fee, @Param("travelling_fee") double travelling_fee,@Param("total_fee") double total_fee);

    int updateFactoryAuditStatus(@Param("factoryAudit_id") String factoryAudit_id, @Param("factoryAudit_status") int factoryAudit_status);

    //上传委托单
    int uploadCommission(@Param("factoryAudit_id") String factoryAudit_id,@Param("commission_filepath") String file_path);

    //上传发票
    int uploadInvoice(@Param("factoryAudit_id") String factoryAudit_id,@Param("invoice_filepath") String file_path);

    //上传报告
    int uploadReport(@Param("factoryAudit_id") String factoryAudit_id,@Param("report_filepath") String file_path);

    List<FactoryAuditBean> getTestingByStatus(@Param("factoryAudit_status") int factoryAudit_status);

    List<FactoryAuditBean> getTestingByAllStatus();
}
