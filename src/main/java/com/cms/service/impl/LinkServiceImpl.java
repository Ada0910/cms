package com.cms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import com.cms.mapper.LinkMapper;
import com.cms.pojo.Link;
import com.cms.service.LinkService;

@Service("linkService")
public class LinkServiceImpl implements LinkService {

    @Autowired
    private LinkMapper linkMapper;

    /**
     * 返回链接列表
     */
    @Override
    public List<Link> list(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return linkMapper.list(map);
    }

    @Override
    public Integer getTotal(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return linkMapper.getTotal(map);
    }

    @Override
    public Integer add(Link link) {
        // TODO Auto-generated method stub
        int i = linkMapper.add(link);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isUse", 1);
        List<Link> linkList = linkMapper.list(map);
        // 刷新缓存
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        ServletContext servletContext = webApplicationContext.getServletContext();
        servletContext.setAttribute("linkList", linkList);
        return i;
    }

    /**
     * 更新
     */
    @Override
    public Integer update(Link link) {
        int i = linkMapper.update(link);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isUse", 1);
        List<Link> linkList = linkMapper.list(map);
        // 刷新缓存 友情 链接
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        ServletContext servletContext = webApplicationContext.getServletContext();
        servletContext.setAttribute("linkList", linkList);

        return i;
    }

    @Override
    public Integer delete(Integer id) {
        int i = linkMapper.delete(id);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isUse", 1);
        List<Link> linkList = linkMapper.list(map);
        // 刷新缓存 友情 链接
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        ServletContext servletContext = webApplicationContext.getServletContext();
        servletContext.setAttribute("linkList", linkList);

        return i;

    }

    @Override
    public Link findById(Integer id) {
        // TODO Auto-generated method stub
        return linkMapper.findById(id);
    }

}
