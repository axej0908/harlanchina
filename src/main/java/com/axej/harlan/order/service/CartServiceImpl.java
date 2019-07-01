package com.axej.harlan.order.service;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.ShopBean;
import com.axej.harlan.order.bean.CartBean;
import com.axej.harlan.order.dao.CartDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * @Author: jaywechen
 * @Description: 购物车biz
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 11:41 2018/2/26
 */
@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    private CartDao cartDao;

    /**
     * 1.加入购物车
     *
     * @param cartBean
     */
    public void save(CartBean cartBean) {

    }

    /**
     * r1.查询我的订单列表
     *
     * @param query
     * @return
     */
    @Override
    public List<ShopBean> queryMyCartList(Query query) {
        return cartDao.queryMyCartList(query);
    }

    @Override
    public int queryMyCartTotal(Query query) {
        return cartDao.queryMyCartTotal(query);
    }

    /**
     * c1 添加商品到购物车
     *
     * @param cartBean
     * @return
     */
    @Override
    public boolean saveToCart(CartBean cartBean) {
        cartBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        return (1 == cartDao.save(cartBean));
    }

    @Override
    public boolean update(CartBean cartBean) {
        return 1 == cartDao.update(cartBean);
    }

    @Override
    public CartBean queryObject(CartBean bean) {
        return cartDao.queryObject(bean);
    }

    @Override
    public void delete(CartBean bean) {
        cartDao.delete(bean);
    }

}
