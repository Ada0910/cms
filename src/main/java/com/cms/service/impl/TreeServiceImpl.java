package com.cms.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.mapper.TreeMapper;
import com.cms.pojo.Tree;
import com.cms.service.TreeService;

@Service("treeService")
public class TreeServiceImpl implements TreeService {

    @Autowired
    private TreeMapper treeMapper;

    @Override
    public List<Tree> getTreesByFatherOrIds(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return treeMapper.getTreesByFatherOrIds(map);
    }

    @Override
    public Tree findById(Integer id) {
        // TODO Auto-generated method stub
        return treeMapper.findById(id);
    }

}
