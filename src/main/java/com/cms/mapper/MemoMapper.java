package com.cms.mapper;


import com.cms.pojo.Memo;

import java.util.List;
import java.util.Map;

public interface MemoMapper {
    public Integer add(Memo memo);

    public Integer update(Memo memo);

    public List<Memo> list(Map<String, Object> map);

    public Integer getTotal(Map<String, Object> map);

    public Memo findById(Integer id);

    public Integer delete(Integer id);
}