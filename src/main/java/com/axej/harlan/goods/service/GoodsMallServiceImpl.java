package com.axej.harlan.goods.service;

import com.axej.harlan.common.status.GoodsMallCons;
import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.GoodsMallBean;
import com.axej.harlan.goods.bean.ShopBean;
import com.axej.harlan.goods.dao.GoodsMallDao;
import com.axej.harlan.order.bean.OrderBean;
import com.axej.harlan.order.dao.OrderDao;
import com.axej.harlan.user.bean.UserBean;
import com.axej.harlan.user.dao.UserDao;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Description：选择平时购物的商品
 *
 * @author : jaywechen
 */

@Service
@Transactional
public class GoodsMallServiceImpl implements GoodsMallService {

    @Autowired
    private GoodsMallDao goodsMallDao;
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private UserDao userDao;

    private static final String GOODS_TYPE_SELF = "harlan_normal";

    /**
     * 保存选择的购物商品
     *
     * @param goodsMallBean
     * @Method: save
     * @date: 14:11 2017/12/20
     */
    @Override
    public boolean save(GoodsMallBean goodsMallBean) {

        /*GoodsMallBean goodsMallBean1 = goodsMallDao.goodsName(goodsMallBean.getGoods_name() , goodsMallBean.getCas());
        if(goodsMallBean1 == null){*/
        //step1:时间
        goodsMallBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        //产品销量初始化为0
        goodsMallBean.setSales_volume(0);
        //step2:判断商品类型 ，如果是自营 则商品状态直接为上架；如果是用户，则商品状态为待审核
        if (goodsMallBean.getGoods_type().indexOf(GOODS_TYPE_SELF) != -1) {
            //化浪自营
            goodsMallBean.setGoods_state(GoodsMallCons.GoodsStatus.DOWN.getVal());

        }if(goodsMallBean.getGoods_type().equals("enquiry")){
            //免费找货
            goodsMallBean.setGoods_state(GoodsMallCons.GoodsStatus.WAIT_AUDIT.getVal());
        }
        else {
            //三方商户
            goodsMallBean.setGoods_state(GoodsMallCons.GoodsStatus.DOWN.getVal());
            //默认待审核状态
            goodsMallBean.setStatus("0");
        }

        goodsMallBean.setHot_sales("not");
        return (1 == goodsMallDao.save(goodsMallBean));
        /*}else {
            return false;
        }*/

    }


    /**
     * 删除选择的购物商品
     *
     * @param goods_id
     * @Method: delete
     */
    @Override
    public boolean delete(Long goods_id) {
        int i = goodsMallDao.delete(goods_id);
        return i == 1 ? true : false;
    }

    /**
     * 修改选择的购物商品
     *
     * @param shopIntentBean
     * @Method: update
     */
    @Override
    public boolean update(GoodsMallBean shopIntentBean) {
        int i = goodsMallDao.update(shopIntentBean);
        return i == 1 ? true : false;
    }

    /**
     * 查询所有的购物商品
     *
     * @param query
     * @Method: queryList
     * @date: 14:13 2017/12/20
     */
    @Override
    public List<GoodsMallBean> queryList(Query query) {
        return goodsMallDao.queryList(query);
    }

    @Override
    public int queryListTotal(Query query) {
        return goodsMallDao.queryListTotal(query);
    }

    @Override
    public int queryTotal(Query query) {
        return goodsMallDao.queryTotal(query);
    }


    @Override
    public List<GoodsMallBean> queryListGuessYouLike(Query query) {
        //1.先判断用户是否提交过订单
        query.put("buyer_id", query.get("user_id"));
        List<OrderBean> orderBeans = orderDao.queryList(query);

        //2.获取查询的参数
        StringBuffer buffer = new StringBuffer();
        String param = "";
        if (orderBeans.size() == 0) {
            //status1:新用户 - 根据注册时的购物习惯查询
            UserBean userBean = userDao.queryObject(query);
            if (userBean != null) {
                buffer.append(userBean.getTrade_tendency().replaceAll(",", "|"));
                param = buffer.toString();
            } else {
                return null;
            }

        } else {
            //status2:老用户 - 根据订单购物名称模糊匹配
            for (OrderBean orderBean : orderBeans) {
             /*   if (orderBean.getTrade_name() != null && StringUtils.isNotBlank(orderBean.getTrade_name())) {
                    buffer.append(orderBean.getTrade_name()).append("|");
                }*/
            }
            param = buffer.toString().substring(0, buffer.length() - 1);
        }

        //3.查询
        List<GoodsMallBean> list = goodsMallDao.queryListGuessYouLike(param);
        return list;
    }

    @Override
    public GoodsMallBean queryObject(int goods_id) {
        return goodsMallDao.queryObject(goods_id);
    }

    @Override
    public List<GoodsMallBean> queryListByName(Query query) {
        return goodsMallDao.queryListByName(query);
    }

    @Override
    public int queryTotalByName(Query query) {
        return goodsMallDao.queryTotalByName(query);
    }

    @Override
    public List<GoodsMallBean> queryEnquiryList(Query query) {
        return goodsMallDao.queryEnquiryList(query);
    }

    @Override
    public List<GoodsMallBean> searchCas(Query query) {
        return goodsMallDao.searchCas(query);
    }

    @Override
    public int searchCasTotal(Query query) {
        return goodsMallDao.searchCasTotal(query);
    }

    @Override
    public List<GoodsMallBean> searchId(GoodsMallBean goodsMallBean) {
        return goodsMallDao.searchId(goodsMallBean);
    }

    @Override
    public List<GoodsMallBean> queryListByCas(Query query) {
        return goodsMallDao.queryListByCas(query);
    }

    @Override
    public int queryTotalByCas(Query query) {
        return goodsMallDao.queryTotalByCas(query);
    }

    @Override
    public boolean saveTheEnquiries(GoodsMallBean goodsMallBean) {
        goodsMallBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        //产品销量初始化为0
        goodsMallBean.setSales_volume(0);
        //step2:判断商品类型 ，如果是自营 则商品状态直接为上架；如果是用户，则商品状态为待审核
        if (goodsMallBean.getGoods_type().indexOf(GOODS_TYPE_SELF) != -1) {
            //化浪自营
            goodsMallBean.setGoods_state(GoodsMallCons.GoodsStatus.UP.getVal());
        } else {
            //三方商户
            goodsMallBean.setGoods_state(GoodsMallCons.GoodsStatus.WAIT_AUDIT.getVal());
        }
        return (1 == goodsMallDao.save(goodsMallBean));
    }

    @Override
    public List<GoodsMallBean> queryHotSell() {
        return goodsMallDao.queryHotSell();
    }
}
