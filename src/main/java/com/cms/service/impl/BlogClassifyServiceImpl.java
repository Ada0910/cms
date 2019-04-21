package com.cms.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.mapper.BlogClassifyMapper;
import com.cms.pojo.BlogClassify;
import com.cms.service.BlogClassifyService;

@Service("blogClassifyService")
public class BlogClassifyServiceImpl implements BlogClassifyService {

    @Autowired
    private BlogClassifyMapper blogClassifyMapper;

    @Override
    public Integer add(BlogClassify blogClassify) {
        // TODO Auto-generated method stub
        return blogClassifyMapper.add(blogClassify);
    }

    @Override
    public Integer update(BlogClassify blogClassify) {
        // TODO Auto-generated method stub
        return blogClassifyMapper.update(blogClassify);
    }

    @Override
    public List<BlogClassify> list(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return blogClassifyMapper.list(map);
    }

    @Override
    public Integer getTotal(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return blogClassifyMapper.getTotal(map);
    }

    @Override
    public Integer delete(Integer id) {
        // TODO Auto-generated method stub
        return blogClassifyMapper.delete(id);
    }

    @Override
    public BlogClassify findById(Integer id) {
        // TODO Auto-generated method stub
        return blogClassifyMapper.findById(id);
    }

}
