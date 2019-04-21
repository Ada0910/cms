package com.cms.mapper;


import com.cms.pojo.Tree;

import java.util.List;
import java.util.Map;

public interface TreeMapper {
    /**
     * 根据父节点  找子树  子树必须包含在ids之内
     * map 传 father（-1） 和   ids(1.2.5.6.9.4.4.)
     * <p>
     * map只添加ids参数就行了 ids(1.2.5.6.9.4.4.)    这个方法应该就是用在realm 里面 shire 授权哪里。 根据ids拿tree
     * <p>
     * 根据父节点 拿菜单  没有过虑条件  授权窗口的时候要用
     */
    public List<Tree> getTreesByFatherOrIds(Map<String, Object> map);


    public Tree findById(Integer id);
}