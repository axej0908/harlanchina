package com.axej.harlan.order.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.ShopBean;
import com.axej.harlan.order.bean.CartBean;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 11:41 2018/2/26
 */
public interface CartService {

    List<ShopBean> queryMyCartList(Query query);
    int queryMyCartTotal(Query query);

    boolean saveToCart(CartBean cartBean);

    boolean update(CartBean cartBean);

    CartBean queryObject(CartBean bean);

    void delete(CartBean bean);

    //是否存在该产品
    boolean isExistGoods(int user_id,int goods_id);

    //修改购物车产品数量
    boolean updateCartGoodsNum(int user_id,int goods_id);
}
