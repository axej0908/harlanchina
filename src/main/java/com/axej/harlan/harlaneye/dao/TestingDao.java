package com.axej.harlan.harlaneye.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.harlaneye.bean.TestingBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.io.ResolverUtil;
import org.springframework.stereotype.Repository;

import javax.annotation.security.PermitAll;
import java.util.List;

@Repository
@Mapper
public interface TestingDao extends BaseDao<TestingBean> {

    int insert(TestingBean testingBean);

    TestingBean get(String testing_id);

    int update(@Param("testing_id") String testing_id, @Param("testing_status") int testing_status);

    List<TestingBean> getTestingByUserAndStatus(@Param("user_id") String user_id,@Param("testing_status") int testing_status);

    List<TestingBean> getTestingByUser(@Param("user_id") String user_id);

    int updateTestingPrice(@Param("testing_id") String testing_id, @Param("testing_prep_fee") double testing_prep_fee, @Param("sample_prep_fee") double sample_prep_fee, @Param("subcontracted_fee") double subcontracted_fee, @Param("express_fee") double express_fee, @Param("english_report_fee") double english_report_fee, @Param("others_fee") double others_fee, @Param("vat_fee") double vat_fee, @Param("total_fee") double total_fee,@Param("sample_express_addr") String sample_express_addr);

    //上传委托单
    int uploadCommission(@Param("testing_id") String testing_id,@Param("commission_filepath") String file_path);

    //上传发票
    int uploadInvoice(@Param("testing_id") String testing_id,@Param("invoice_filepath") String file_path);

    //上传报告
    int uploadReport(@Param("testing_id") String testing_id,@Param("report_filepath") String file_path);

    List<TestingBean> getTestingByStatus(@Param("testing_status") int testing_status);

    List<TestingBean> getTestingByAllStatus();
}