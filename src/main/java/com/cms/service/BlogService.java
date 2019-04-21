package com.cms.service;

import java.util.List;
import java.util.Map;

import com.cms.pojo.Blog;

public interface BlogService {

    public Integer add(Blog blog);

    public Integer update(Blog blog);

    public List<Blog> list(Map<String, Object> map);

    public List<Blog> list2(Map<String, Object> map);

    public Integer getTotal(Map<String, Object> map);

    public Blog findById(Integer id);

    public Integer delete(Integer id);
}
