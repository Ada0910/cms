package com.cms.service.impl;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import com.cms.mapper.ConfigMapper;
import com.cms.pojo.Config;
import com.cms.service.ConfigService;

/**
 * @author 谢伟宁 加载layui样式的业务逻辑方法
 */

@Service("configService")
public class ConfigServiceImpl implements ConfigService {

    @Autowired
    private ConfigMapper configMapper;

    @Override
    public Integer update(Config config) {
        int i = configMapper.update(config);
        config = configMapper.findById(1);

        // 刷新缓存
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        ServletContext servletContext = webApplicationContext.getServletContext();
        servletContext.setAttribute("config", config);
        return i;
    }

    @Override
    public Config findById(Integer id) {

        return configMapper.findById(id);
    }

}
