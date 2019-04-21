

package com.cms.controller.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.cms.pojo.Tree;
import com.cms.pojo.User;
import com.cms.service.TreeService;
import com.cms.service.UserService;
import com.cms.util.MyUtil;
import com.cms.util.ResponseUtil;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Controller
@RequestMapping("/admin/tree")
public class AdminTreeController {

    @Autowired
    private TreeService treeService;

    @Autowired
    private UserService userService;

    @RequestMapping("/getCheckedTreeMenu")
    public String getCheckedTreeMenu(@RequestParam(value = "userId", required = false) String userId,
                                     HttpServletRequest requset, HttpServletResponse response) throws Exception {
        // 先找parent是-1的顶级菜单
        User user = userService.findById(Integer.parseInt(userId));
        //拿到用户中的MenuIds
        String treeIds = user.getMenuIds();
        if (treeIds == null) {
            treeIds = "";//不能这null   会报错。 强制设置一个空str
        }
        //先拿菜单为-1的树
        List<Tree> list = getCheckTreesByParentId(-1, treeIds);
        Gson g = new Gson();
        ResponseUtil.write(response, g.toJson(list));
        return null;
    }

    /**
     * 这个方法是设置权限用的   给菜单添加check 选项
     */
    public List<Tree> getCheckTreesByParentId(Integer father, String treeIds) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();

        map.put("father", father + "");
        List<Tree> list = treeService.getTreesByFatherOrIds(map);//

        for (Tree tree : list) {
            // 如果 是复选框 可以在这里判断
            // tree.setChecked(true);
            if (MyUtil.existStrArr(tree.getId() + "", treeIds.split(","))) {// 判断id
                // 有没有在ids之内，如果返回true
                // 不在false
                tree.setChecked(true);
            }
            if ("open".equals(tree.getState())) {
                continue;
            } else {
                tree.setChildren(getCheckTreesByParentId(tree.getId(), treeIds));
            }
        }
        return list;
    }


    /**
     * 拿菜单
     */
    @RequestMapping("/getMenu")
    public String getMenu(HttpServletResponse response) throws Exception {

        User currentUser = (User) SecurityUtils.getSubject().getSession().getAttribute("currentUser");
        currentUser = userService.findById(currentUser.getId());


        Map<String, Object> map = new HashMap<String, Object>();
        String menuIds = currentUser.getMenuIds();
        if (menuIds == null) {
            menuIds = "";
        }
        List<Integer> ids = MyUtil.Str_ids_To_ListInteger_ids(menuIds);
        map.put("father", -1);
        map.put("ids", ids);
        List<Tree> treeList = getTreesByParentId(map);

        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm").create();
        ResponseUtil.write(response, gson.toJson(treeList));
        return null;
    }

    /**
     * 拿菜单
     */
    public List<Tree> getTreesByParentId(Map<String, Object> map) throws Exception {
        //String parentId,String ids  = map
        List<Tree> list = treeService.getTreesByFatherOrIds(map);
        for (Tree tree : list) {
            //如果 是复选框  可以在这里判断
            //tree.setChecked(true);
            if ("open".equals(tree.getState())) {
                continue;
            } else {
                map.put("father", tree.getId() + "");//更换id不换ids继续查
                tree.setChildren(getTreesByParentId(map));
            }
        }
        return list;
    }


}
