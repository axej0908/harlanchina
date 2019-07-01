package com.axej.harlan.user.service;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.TextMsgCode;
import com.axej.harlan.user.bean.CpvcBean;
import com.axej.harlan.user.dao.CpvcDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Random;

/**
 * @author: lava
 * date: 10:26 2018/5/25
 * created by: IntelliJ IDEA
 */
@Service
@Transactional
public class MobileCodeServiceImpl implements MobileCodeService {
    private static final Logger logger = LoggerFactory.getLogger(MobileCodeServiceImpl.class);

    @Autowired
    private CpvcDao cpvcDao;

    /**
     * 1.发送并且修改临时表
     *
     * @param cpvcBean
     */
    @Override
    public void update(CpvcBean cpvcBean) {
        /** 发送验证码 */
        int code = 0;
        Random random = new Random();
        while (code < 100000) {
            code = random.nextInt(999999);
        }
        TextMsgCode.sendCodeMod(cpvcBean.getMobile(), code);

        /** 更新临时表 */
        cpvcBean.setCpvc(String.valueOf(code));
        cpvcBean.setLast_modified(ConcurrentDateUtils.format(new Date()));
        int i = cpvcDao.update(cpvcBean);
        if (i != 1) {
            logger.error(cpvcBean.getMobile()+"更新临时短信验证码失败");
            throw new RuntimeException("更新临时短信验证码失败");
        }
    }

    /**
     * 2.验证验证码
     * @param cpvcBean
     * @return
     */
    @Override
    public boolean verify(CpvcBean cpvcBean) {
        CpvcBean dbBean = cpvcDao.queryObject(cpvcBean);
        if (dbBean == null) {
            return false;
        }
        if (dbBean.getCpvc().equals(cpvcBean.getCpvc())) {
            return true;
        }else {
            return false;
        }
    }
}
