package com.cms.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.mapper.BlogMapper;
import com.cms.pojo.Blog;
import com.cms.service.BlogService;

@Service("blogService")
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogMapper blogMapper;

    @Override
    public Integer add(Blog blog) {
        // TODO Auto-generated method stub
        return blogMapper.add(blog);
    }

    @Override
    public Integer update(Blog blog) {
        // TODO Auto-generated method stub
        return blogMapper.update(blog);
    }

    @Override
    public List<Blog> list(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return blogMapper.list(map);
    }

    @Override
    public Integer getTotal(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return blogMapper.getTotal(map);
    }

    @Override
    public Blog findById(Integer id) {
        // TODO Auto-generated method stub
        return blogMapper.findById(id);
    }

    @Override
    public Integer delete(Integer id) {
        // TODO Auto-generated method stub
        return blogMapper.delete(id);
    }

    @Override
    public List<Blog> list2(Map<String, Object> map) {
        return blogMapper.list2(map);
    }
}
