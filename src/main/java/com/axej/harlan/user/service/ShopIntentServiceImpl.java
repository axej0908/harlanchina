package com.axej.harlan.user.service;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.user.bean.ShopIntentBean;
import com.axej.harlan.user.dao.ShopIntentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
* Description：选择平时购物的商品
* @author : jaywechen
*/

@Service
@Transactional
public class ShopIntentServiceImpl implements ShopIntentService {

    @Autowired
    private ShopIntentDao shopIntentDao;

    /**
     * 保存选择的购物商品
     *
     * @Method: save
     * @param productBean
     * @date: 14:11 2017/12/20
     */
    @Override
    public boolean save(ShopIntentBean productBean) {
        productBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        int i = shopIntentDao.save(productBean);
        return i == 1 ? true : false;
    }


    /**
     * 删除选择的购物商品
     *
     * @Method: delete
     * @param shopIntent_id
     */
    @Override
    public boolean delete(Long shopIntent_id) {
        int i = shopIntentDao.delete(shopIntent_id);
        return i == 1 ? true : false;
    }

    /**
     * 修改选择的购物商品
     *
     * @Method: update
     * @param shopIntentBean
     */
    @Override
    public boolean update(ShopIntentBean shopIntentBean) {
        int i = shopIntentDao.update(shopIntentBean);
        return i == 1 ? true : false;
    }

    /**
     * 查询所有的购物商品
     *
     * @Method: queryList
     * @param query
     * @date: 14:13 2017/12/20
     */
    @Override
    public List<ShopIntentBean> queryList(Query query) {
        return shopIntentDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return shopIntentDao.queryTotal(query);
    }

    @Override
    public List<ShopIntentBean> queryRandomList(ShopIntentBean shopIntentBean) {
        Map<String,Object> map = new HashMap<>();
        map.put("offset",0);
        map.put("limit",100);
        if (shopIntentBean.getDomestic()!=null){
            map.put("domestic",shopIntentBean.getDomestic());
        }
        List<ShopIntentBean> list= shopIntentDao.queryList(map);
        Collections.shuffle(list);
        if (list.size() >= 12) {
            list = list.subList(0, 12);
        } else {
            list = list.subList(0, list.size());
        }
        return list;
    }

    @Override
    public ShopIntentBean queryObject(ShopIntentBean shopIntentBean) {
        return shopIntentDao.queryObject(shopIntentBean);
    }
}
