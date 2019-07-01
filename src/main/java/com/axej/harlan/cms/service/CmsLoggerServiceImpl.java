package com.axej.harlan.cms.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.axej.harlan.cms.bean.CmsLoggerBean;
import com.axej.harlan.cms.dao.CmsLoggerDao;
import com.axej.harlan.common.task.ThreadPool;
import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.DangerBean;
import com.axej.harlan.goods.bean.GoodsMallBean;
import com.axej.harlan.goods.dao.DangerDao;
import com.axej.harlan.goods.dao.GoodsMallDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class CmsLoggerServiceImpl implements CmsLoggerService{

    @Autowired
    private CmsLoggerDao cmsLoggerDao;

    @Autowired
    private DangerDao dangerDao;

    @Autowired
    private GoodsMallDao goodsMallDao;

    private static final Logger logger = LoggerFactory.getLogger(CmsLoggerServiceImpl.class);

    /*private static final String QUERYURL = "http://www.chinaharlan.com/app/getProductByCas";
    private static final String DELETEURL = "http://www.chinaharlan.com/app/delProductByCas";*/

    @Async("asyncServiceExecutor")
    @Override
    public void executeAsync() {

        logger.info("start executeAsync");
        /*try{
            *//*Thread.sleep(1000);*//*
            List<DangerBean> dangerBeans = dangerDao.queryEntire();
            if(dangerBeans.size() > 0){
                CmsLoggerBean cmsLoggerBean = new CmsLoggerBean();
                for(DangerBean dangerBean : dangerBeans){
                    try {
                        String str = ThreadPool.load(QUERYURL,"cas="+ dangerBean.getCas());
                        Map<String, Object> map = JSON.parseObject(str);
                        if(map != null){
                            if(map.get("code").toString().equals("1")){
                                map = JSON.parseObject(map.get("data").toString());
                                JSONArray jsonArray = JSONArray.parseArray(map.get("list").toString());
                                if(jsonArray.size() > 0){
                                    for(int i = 0; i < jsonArray.size(); i++){
                                        JSONObject jsonObject = jsonArray.getJSONObject(i);
                                        cmsLoggerBean.setCas(jsonObject.get("goodsCas").toString());
                                        cmsLoggerBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
                                        int j = cmsLoggerDao.save(cmsLoggerBean);
                                        if(j > 0){
                                            ThreadPool.load(DELETEURL,"cas="+ cmsLoggerBean.getCas());
                                        }

                                    }
                                    Thread.sleep(1000);
                                }
                            }
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }*/


        List<DangerBean> dangerBeans = dangerDao.queryEntire();
        if(dangerBeans.size() > 0){
            CmsLoggerBean cmsLoggerBean = new CmsLoggerBean();
            for(DangerBean dangerBean : dangerBeans){
                int dangerCas = goodsMallDao.queryDangerCas(dangerBean.getCas());
                if(dangerCas > 0){
                    cmsLoggerBean.setCas(dangerBean.getCas());
                    cmsLoggerBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
                    int i = cmsLoggerDao.save(cmsLoggerBean);
                    if(i > 0){
                        goodsMallDao.deleteDanger(dangerBean.getCas());
                    }
                }
            }
        }
        logger.info("end executeAsync");
    }

    @Override
    public List<CmsLoggerBean> queryList(Query query) {
        return cmsLoggerDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return cmsLoggerDao.queryTotal(query);
    }
}
