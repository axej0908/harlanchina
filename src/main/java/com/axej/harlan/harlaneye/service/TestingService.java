package com.axej.harlan.harlaneye.service;

import com.axej.harlan.harlaneye.bean.TestingBean;

import java.util.List;

public interface TestingService {

    boolean insert(TestingBean testingBean);

    TestingBean getTesting(String testing_id);

    boolean updateTesting(String testing_id,int testing_status);

    boolean updateTestingPrice(String testing_id,double testing_prep_fee,double sample_prep_fee,double subcontracted_fee,double express_fee,double english_report_fee,double others_fee,double vat_fee,double total_fee,String sample_express_addr);

    List<TestingBean> getTestingByUserAndStatus(String user_id, int testing_status);

    boolean uploadFile(String testing_id,int fileType,String filePath);

    List<TestingBean> getTestingByStatus(int testing_status);


}
