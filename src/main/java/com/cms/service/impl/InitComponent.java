package com.cms.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import com.cms.pojo.Config;
import com.cms.service.ConfigService;

@Component
public class InitComponent implements ServletContextListener, ApplicationContextAware {

    private static ApplicationContext ApplicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.ApplicationContext = applicationContext;
    }

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContext application = sce.getServletContext();
        ConfigService configService = (ConfigService) ApplicationContext.getBean("configService");
        // LinkService linkService=(LinkService)
        // applicationContext.getBean("linkService");
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isUse", 1);
        // List<Link> linkList = linkService.list(map);
        // applicationContext.setAttribute("linkList", linkList);

        Config config = configService.findById(1);
        application.setAttribute("config", config);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // TODO Auto-generated method stub

    }

}
