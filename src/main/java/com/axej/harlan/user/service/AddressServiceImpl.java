package com.axej.harlan.user.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.user.bean.AddressBean;
import com.axej.harlan.user.dao.AddressDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Description:地址管理
 * Created by IntelliJ IDEA
 *
 * @author :jaywechen
 * Date:11:22 2017/12/4
 */
@Service
@Transactional
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressDao addressDao;


    /**
     * query - > user_id 用户id
     *
     * @param query
     * @return
     */
    @Override
    public List<AddressBean> queryList(Query query) {
        return addressDao.queryList(query);
    }

    /**
     * query - >user_id 用户id
     *
     * @param query
     * @return
     */
    @Override
    public int queryTotal(Query query) {
        return addressDao.queryTotal(query);
    }

    /**
     * addressBean - > user_id 用户id
     *
     * @param addressBean
     * @return
     */
    @Override
    public AddressBean queryObject(AddressBean addressBean) {
        return addressDao.queryObject(addressBean);
    }

    /**
     * addressBean - > consignee
     * addressBean - > province
     * addressBean - > city
     * addressBean - > area
     * addressBean - > detail
     * addressBean - > mobile
     * addressBean - > landline
     * addressBean - > is_default
     * addressBean - > user_id
     *
     * @param addressBean
     * @return
     */
    @Override
    public boolean save(AddressBean addressBean) {
        //step1:判断添加的数据行是不是默认地址(如果是，当前用户的所有其他地址设置为普通,否则直接添加)
        if (addressBean.isIs_default()) {
            addressDao.updateAsNormal(addressBean.getUser_id());
        }
        int i = addressDao.save(addressBean);
        return i == 1 ? true : false;
    }

    /**
     * addressBean - > addr_id
     *
     * @param addressBean
     * @return
     */
    @Override
    public boolean delete(AddressBean addressBean) {
        int i = addressDao.delete(addressBean);
        return i == 1 ? true : false;
    }

    /**
     * addressBean - > addr_id
     * addressBean - > consignee
     * addressBean - > province
     * addressBean - > city
     * addressBean - > area
     * addressBean - > detail
     * addressBean - > mobile
     * addressBean - > landline
     * addressBean - > is_default
     * addressBean - > user_id
     *
     * @param addressBean
     * @return
     */
    @Override
    public boolean update(AddressBean addressBean) {
        AddressBean dbBean = addressDao.queryObject(addressBean);
        if (dbBean == null) {
            return false;
        }
        //step1:判断修改数据行是不是默认地址(如果是，当前用户的所有其他地址设置为普通,否则直接添加)
        if (addressBean.isIs_default()) {
            addressDao.updateAsNormal(dbBean.getUser_id());
        }
        addressBean.setAddr_id(dbBean.getAddr_id());
        int i = addressDao.update(addressBean);
        return i == 1 ? true : false;
    }

}
