package com.axej.harlan.harlaneye.service;

import com.axej.harlan.harlaneye.bean.TestingBean;
import com.axej.harlan.harlaneye.dao.TestingDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TestingServiceImpl implements TestingService{

    @Autowired
    private TestingDao testingDao;

    /**
     * des:根据订单ID查找检测订单
     * @param testing_id
     * @return
     */
    @Override
    public TestingBean getTesting(String testing_id) {

        return testingDao.get(testing_id);
    }

    /**
     * des:插入订单
     * @param testingBean
     * @return
     */
    @Override
    public boolean insert(TestingBean testingBean) {
        if(testingDao.insert(testingBean)>0)
        {
            return true;
        }else{
            return false;
        }


    }

    /**
     * Des:修改订单状态
     * @param testing_id
     * @param testing_status
     * @return
     */
    @Override
    public boolean updateTesting(String testing_id,int testing_status) {
        if(testingDao.update(testing_id,testing_status)>0)
        {
            return true;
        }else{
            return false;
        }

    }


    @Override
    public List<TestingBean> getTestingByUserAndStatus(String user_id, int testing_status) {
        List<TestingBean> testingBeanList=new ArrayList<TestingBean>();
        if(testing_status==0)
        {
            //获取用户所有的检测订单

            return testingDao.getTestingByUser(user_id);
        }else{
            //获取正常状态

            return testingDao.getTestingByUserAndStatus(user_id,testing_status);
        }
    }


    @Override
    public boolean updateTestingPrice(String testing_id, double testing_prep_fee, double sample_prep_fee, double subcontracted_fee, double express_fee, double english_report_fee, double others_fee, double vat_fee, double total_fee,String sample_express_addr) {
        if(testingDao.updateTestingPrice(testing_id,testing_prep_fee,sample_prep_fee,subcontracted_fee,express_fee,english_report_fee,others_fee,vat_fee,total_fee,sample_express_addr)>0)
        {
            return true;
        }else{
            return false;
        }
    }


    @Override
    public boolean uploadFile(String testing_id, int fileType, String filePath) {
        int ret=0;
        if(fileType==1)
        {
            //上传委托单
            ret=testingDao.uploadCommission(testing_id,filePath);
        }else if(fileType==2)
        {
            //上传发票
            ret=testingDao.uploadInvoice(testing_id,filePath);
        }else if(fileType==3)
        {
            //上传报告
            ret=testingDao.uploadReport(testing_id,filePath);
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
    public List<TestingBean> getTestingByStatus(int testing_status) {
        if(testing_status==0)
        {
            //获取全部状态
            return testingDao.getTestingByAllStatus();
        }else
        {
            //获取对应状态下的检测订单
            return testingDao.getTestingByStatus(testing_status);
        }

    }
}
