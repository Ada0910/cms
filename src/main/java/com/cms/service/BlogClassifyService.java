package com.cms.service;

import java.util.List;
import java.util.Map;

import com.cms.pojo.BlogClassify;

public interface BlogClassifyService {


    public Integer add(BlogClassify blogClassify);

    public Integer update(BlogClassify blogClassify);

    public List<BlogClassify> list(Map<String, Object> map);

    public Integer getTotal(Map<String, Object> map);

    public Integer delete(Integer id);

    public BlogClassify findById(Integer id);


}
