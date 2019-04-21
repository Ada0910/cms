package com.cms.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.mapper.MemoMapper;
import com.cms.pojo.Memo;
import com.cms.service.MemoService;

@Service("memoService")
public class MemoServiceImpl implements MemoService {

    @Autowired
    private MemoMapper memoMapper;

    @Override
    public Integer add(Memo memo) {
        // TODO Auto-generated method stub
        return memoMapper.add(memo);
    }

    @Override
    public Integer update(Memo memo) {
        // TODO Auto-generated method stub
        return memoMapper.update(memo);
    }

    @Override
    public List<Memo> list(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return memoMapper.list(map);
    }

    @Override
    public Integer getTotal(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return memoMapper.getTotal(map);

    }

    @Override
    public Memo findById(Integer id) {
        // TODO Auto-generated method stub
        return memoMapper.findById(id);
    }

    @Override
    public Integer delete(Integer id) {
        // TODO Auto-generated method stub
        return memoMapper.delete(id);
    }

}
