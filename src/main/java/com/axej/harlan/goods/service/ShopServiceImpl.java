package com.axej.harlan.goods.service;

import com.axej.harlan.common.status.ShopCons;
import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.GoodsMallBean;
import com.axej.harlan.goods.bean.ShopBean;
import com.axej.harlan.goods.dao.GoodsMallDao;
import com.axej.harlan.goods.dao.ShopDao;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:22 2018/1/20
 */
@Service
@Transactional
public class ShopServiceImpl implements ShopService {
    @Autowired
    private ShopDao shopDao;
    @Autowired
    private GoodsMallDao goodsMallDao;

    @Override
    public boolean openShop(ShopBean shopBean) {
        shopBean.setShop_state(ShopCons.ShopState.APPLYING.getVal());
        shopBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        return 1 == shopDao.save(shopBean);
    }

    @Override
    public boolean approve(int shop_id) {
        return shopDao.updateStatusById(shop_id, ShopCons.ShopState.NORMAL.getVal(), "not");
    }

    @Override
    public boolean refuse(int shop_id) {
        return shopDao.updateStatusById(shop_id, ShopCons.ShopState.ABNORMAL.getVal(), null);
    }

    @Override
    public ShopBean queryDetail(int user_id) {
        return shopDao.queryObject(user_id);
    }

    @Override
    public List<ShopBean> queryListByName(String searchParam) {
        //step1:符合条件的店铺
        List<ShopBean> shopBeans = shopDao.queryListByName(searchParam);
        //step2:符合条件的热销产品
        if (shopBeans.size() == 0) {
            return shopBeans;
        } else {
            for (ShopBean bean : shopBeans) {
                List<GoodsMallBean> goodsMallBeans = shopDao.selGoodsByShopId(bean.getShop_id());
                if (goodsMallBeans.size() > 0) {
                    bean.setMerchandiseBeans(goodsMallBeans);
                }
            }
        }
        return shopBeans;
    }

    @Override
    public List<ShopBean> queryList(Query query) {
        return shopDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return shopDao.queryTotal(query);
    }

    /**
     * @param goods_id
     * 通过购买的goods_id 找到user_id, 然后查询该用户的所有商品销量, 最后更新用户店铺销量
     * @return
     */
    @Override
    public void syncTotalSaleVolumes(int goods_id) {
        //step1:get user_id by goods_id
        GoodsMallBean goodsParam = new GoodsMallBean();
        goodsParam.setGoods_id(goods_id);
        GoodsMallBean goodsMallBean = goodsMallDao.queryObject(goodsParam);
        if (goodsMallBean == null && goodsMallBean.getUser_id() == 0) {
            throw new RuntimeException("该商品有误或不存在");
        }
        //step2:get total sale volumes
        Map<String, Object> map = new HashMap<>();
        map.put("user_id", goodsMallBean.getUser_id());
        Integer totalVolumes = shopDao.queryTotalVolumes(map);
        //step3:update shop total sale volumes
        ShopBean shopBean = new ShopBean();
        shopBean.setUser_id(goodsMallBean.getUser_id());
        /*if(totalVolumes != null){
            shopBean.setTotal_volumes(totalVolumes);
        }*/
        if(totalVolumes == null){
            //默认值
            totalVolumes = 0;
        }
        shopBean.setTotal_volumes(totalVolumes);
        int i = shopDao.updateTotalVolumes(shopBean);
        if (i != 1) {
            throw new RuntimeException("更新店铺总销量失败");
        }
    }

    @Override
    public boolean alter(ShopBean shopBean) {
        int i = shopDao.alter(shopBean);
        return i == 1 ? true : false;
    }
}
