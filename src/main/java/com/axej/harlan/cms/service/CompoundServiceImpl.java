package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.*;
import com.axej.harlan.cms.dao.*;
import com.axej.harlan.common.utils.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Transactional
public class CompoundServiceImpl implements CompoundService{

    @Autowired
    private CompoundDao compoundDao;

    @Autowired
    private SyntheticRouteDao syntheticRouteDao;

    @Autowired
    private UpDownStreamDao upDownStreamDao;

    @Autowired
    private ComplexDao complexDao;

    @Override
    public boolean save(CompoundBean compoundBean) {
        CompoundBean compound = compoundDao.queryObject(compoundBean);
        if(compound != null){
            return false;
        }
        compoundBean.setCpd_time(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        int i = compoundDao.save(compoundBean);
        return i == 1 ? true : false;
    }

    @Override
    public boolean update(CompoundBean compoundBean) {
        compoundBean.setCpd_time(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        int i = compoundDao.update(compoundBean);
        return i == 1 ? true : false;
    }

    @Override
    public boolean delete(int cpd_id) {
        CompoundBean compoundBean = compoundDao.queryObject(cpd_id);
        if(compoundBean == null){
            return false;
        }
        //删除化合物
        int i = compoundDao.delete(cpd_id);
        if(i > 0){
            Map<String , Object> map = new HashMap<>();
            map.put("cpd_id" , compoundBean.getCpd_id());
            /**
             * 合成路线
             */
            List<SyntheticRouteBean> syntheticRouteBeans = syntheticRouteDao.queryList(map);
            if(syntheticRouteBeans.size() > 0){
                //删除合成路线
                syntheticRouteDao.remove(cpd_id);
                for(SyntheticRouteBean syntheticRouteBean : syntheticRouteBeans){
                    complexDao.remove(syntheticRouteBean.getSynthetic_id());
                }
            }
            /**
             * 上下游
             */
            upDownStreamDao.remove(cpd_id);
        }
        return i == 1 ? true : false;
    }

    @Override
    public List<CompoundBean> queryList(Query query) {
        return compoundDao.queryList(query);
    }

    @Override
    public int queryTotal() {
        return compoundDao.queryTotal();
    }

    @Override
    public CompoundBean queryObject(CompoundBean compoundBean) {
        //化合物
        CompoundBean compound = compoundDao.queryObject(compoundBean);
        if(compound != null){
            Map<String , Object> map = new HashMap<>();
            map.put("cpd_id" , compound.getCpd_id());
            //合成路线
            List<SyntheticRouteBean> syntheticRouteBeans = syntheticRouteDao.queryList(map);
            if(syntheticRouteBeans.size() > 0){
                List<SyntheticRouteBean> syntheticRouteBeanList = new ArrayList<>();
                for(SyntheticRouteBean syntheticRouteBean : syntheticRouteBeans){
                    Map<String , Object> complexMap = new HashMap<>();
                    complexMap.put("synthetic_id" , syntheticRouteBean.getSynthetic_id());
                    //合成路线图片
                    List<ComplexBean> complexBeans = complexDao.queryList(complexMap);
                    if(complexBeans.size() > 0){
                        syntheticRouteBean.setComplexBeans(complexBeans);
                    }
                    syntheticRouteBeanList.add(syntheticRouteBean);
                }
                compound.setSyntheticRouteBeans(syntheticRouteBeanList);
            }
            //上游
            List<UpDownStreamBean> upStreams = upDownStreamDao.listType(compound.getCpd_id() , "up");
            if(upStreams.size() > 0){
                compound.setUpStreams(upStreams);
            }

            //下游
            List<UpDownStreamBean> downStreams = upDownStreamDao.listType(compound.getCpd_id() , "down");
            if(downStreams.size() > 0){
                compound.setDownStreams(downStreams);
            }
            return compound;
        }
        return null;
    }

    @Override
    public List<CompoundBean> gather() {
        return compoundDao.gather();
    }
}
