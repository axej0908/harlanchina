package com.axej.harlan.user.service;

import com.axej.harlan.user.bean.AuthBean;
import com.axej.harlan.user.dao.AuthDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Description:实名认证
 * Created by IntelliJ IDEA
 * @author : jaywechen
 * Date:10:53 2017/12/4
 */
@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthDao authDao;

    /**
     * 提交认证
     * authBean -> real_name
     * authBean -> id_card
     * authBean -> opposite_pic
     * authBean -> negative_pic
     * authBean -> is_audit
     * authBean -> user_id
     * @param authBean
     * @return
     */
    @Override
    public boolean submitAuth(AuthBean authBean){
        //1.查库
        AuthBean dbBean = authDao.queryObject(authBean);
        //2.判断更新或者保存
        int i = 0;
        if (dbBean == null){
            i = authDao.save(authBean);
        }else {
            authBean.setAuth_id(dbBean.getAuth_id());
            i = authDao.update(authBean);
        }
        return i == 1 ? true : false;
    }

    /**
     * 查看认证详情
     * authBean -> user_id
     * @param authBean
     * @return
     */
    @Override
    public AuthBean detail(AuthBean authBean) {
        return authDao.queryObject(authBean);
    }

    @Override
    public boolean updateById(AuthBean idAuthBean) {
        AuthBean param = new AuthBean();
        param.setAuth_id(idAuthBean.getAuth_id());
        AuthBean dbIDAuth = authDao.queryObject(param);
        if (dbIDAuth == null){
            return false;
        }
        int i = authDao.update(idAuthBean);
        return i == 1 ? true : false;
    }
}
