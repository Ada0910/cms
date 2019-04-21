package com.cms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;


import com.cms.pojo.Tree;
import com.cms.pojo.User;
import com.cms.service.PublicService;
import com.cms.service.TreeService;
import com.cms.service.UserService;
import com.cms.util.MyUtil;

/**
 * 左边菜单栏的逻辑方法
 *
 * @author 谢伟宁
 */
@Service("publicService")
public class PublicServiceImpl implements PublicService {


    @Autowired
    private TreeService treeService;

    @Autowired
    private UserService userService;

    @Override
    public void addLeftMenu(ModelAndView mav) {

        //?获取当前的用户
        User currentUser = (User) SecurityUtils.getSubject().getSession().getAttribute("currentUser");
        //查出当前用户在user表中的相关属性
        currentUser = userService.findById(currentUser.getId());

        Map<String, Object> map = new HashMap<String, Object>();
        //获取User表中的Menuids的值
        String menuIds = currentUser.getMenuIds();
        if (menuIds == null) {
            menuIds = "";
        }

        //转换成int型id，
        List<Integer> ids = MyUtil.Str_ids_To_ListInteger_ids(menuIds);
        //通过father=-1查出相关的menuIds的值
        map.put("father", -1);
        map.put("ids", ids);

        if (ids.size() > 0) {

        } else {
            mav.addObject("treeList", null);
        }
        try {
            List<Tree> treeList = getTreesByParentId(map);
            mav.addObject("treeList", treeList);

        } catch (Exception e) {
            e.printStackTrace();

        }
    }


    /**
     * 拿菜单
     */
    public List<Tree> getTreesByParentId(Map<String, Object> map) throws Exception {
        //SQL语句是 select * from tree and father=#{father}  and id in ORDER BY id ASC（即返回结果）
        List<Tree> list = treeService.getTreesByFatherOrIds(map);
        for (Tree tree : list) {
            //如果 是复选框  可以在这里判断
            //tree.setChecked(true);
            if ("open".equals(tree.getState())) {
                continue;
            } else {
                map.put("father", tree.getId() + "");//更换father  不换ids继续查
                tree.setChildren(getTreesByParentId(map));
            }
        }
        return list;
    }

}
