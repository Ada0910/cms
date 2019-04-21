package com.cms.service;


import com.cms.pojo.User;

import java.util.List;
import java.util.Map;

public interface UserService {

    public Integer add(User user);

    public Integer update(User user);

    public List<User> list(Map<String, Object> map);

    public Integer getTotal(Map<String, Object> map);

    public User findByName(String name);

    public User findById(Integer id);

    public Integer delete(Integer id);

}
