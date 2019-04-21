package com.cms.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.mapper.MemoClassifyMapper;
import com.cms.pojo.MemoClassify;
import com.cms.service.MemoClassifyService;

@Service("memoClassifyService")
public class MemoClassifyServiceImpl implements MemoClassifyService {


    @Autowired
    private MemoClassifyMapper memoClassifyMapper;

    @Override
    public Integer add(MemoClassify classify) {
        // TODO Auto-generated method stub
        return memoClassifyMapper.add(classify);
    }

    @Override
    public Integer update(MemoClassify classify) {
        // TODO Auto-generated method stub
        return memoClassifyMapper.update(classify);
    }

    @Override
    public List<MemoClassify> list(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return memoClassifyMapper.list(map);
    }

    @Override
    public Integer getTotal(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return memoClassifyMapper.getTotal(map);
    }

    @Override
    public Integer delete(Integer id) {
        // TODO Auto-generated method stub
        return memoClassifyMapper.delete(id);
    }

    @Override
    public MemoClassify findById(Integer id) {
        // TODO Auto-generated method stub
        return memoClassifyMapper.findById(id);
    }

}
