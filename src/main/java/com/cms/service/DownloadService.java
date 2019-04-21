package com.cms.service;

import java.util.List;
import java.util.Map;

import com.cms.pojo.Down;

public interface DownloadService {
    public Integer add(Down down);

    public Integer update(Down down);

    public List<Down> list(Map<String, Object> map);

    public Integer getTotal(Map<String, Object> map);

    public Down findById(Integer id);

    public Integer delete(Integer id);

}
