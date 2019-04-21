package com.cms.service.impl;

import com.cms.mapper.UserMapper;
import com.cms.pojo.User;
import com.cms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


/**
 * @Author:谢伟宁
 * @Date:2018/11/13 12:06
 * @Description:用户逻辑业务方法
 * @Param:
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public Integer add(User user) {
        return userMapper.add(user);
    }

    @Override
    public Integer update(User user) {
        return userMapper.update(user);
    }

    @Override
    public List<User> list(Map<String, Object> map) {
        return userMapper.list(map);
    }

    @Override
    public Integer getTotal(Map<String, Object> map) {
        return userMapper.getTotal(map);
    }

    @Override
    public User findByName(String name) {
        return userMapper.findByName(name);
    }

    @Override
    public User findById(Integer id) {
        return userMapper.findById(id);
    }

    @Override
    public Integer delete(Integer id) {
        return userMapper.delete(id);
    }
}
