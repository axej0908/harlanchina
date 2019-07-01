package com.axej.harlan.goods.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.GoodsMallBean;
import com.axej.harlan.goods.bean.ShopBean;
import com.axej.harlan.order.bean.OrderBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:29 2018/1/20
 */
@Repository
@Mapper
public interface ShopDao extends BaseDao<ShopBean> {
    boolean updateStatusById(@Param("shop_id") int shop_id, @Param("shop_state") String shop_state, @Param("domestic") String domestic);

    List<OrderBean> queryMyCartsList(Query query);

    int queryMyCartsTotal(Query query);

    List<ShopBean> queryListByName(@Param("searchParam") String searchParam);

    List<GoodsMallBean> selGoodsByShopId(@Param("shop_id") int shop_id);

    List<ShopBean> queryHotSuppliers(Query query);
    List<ShopBean> listHotSuppliers();

    Integer queryTotalVolumes(Map<String, Object> map);

    int updateTotalVolumes(ShopBean shopBean);

    int alter(ShopBean shopBean);
}
