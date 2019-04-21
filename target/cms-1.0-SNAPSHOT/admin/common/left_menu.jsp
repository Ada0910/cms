·1
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<!-- JSTL -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!-- JSTL -->
<style>


</style>

<!-- left 导航 -->
<div class="layui-side layui-bg-black" id="left_menu" style="top: 60px; ">
    <div class="layui-side-scroll">
        <ul class="layui-nav layui-nav-tree" lay-filter="left_menu">

            <c:forEach var="tree" items="${treeList }">
                <li class="layui-nav-item layui-nav-itemed">
                    <a href="javascript:;">${tree.text}</a>
                    <dl class="layui-nav-child">
                        <c:forEach var="child" items="${tree.children}">
                            <dd id="${child.ddId}" url="${child.url}" type="${child.type}" text="${child.text}"><a
                                    style="cursor:pointer;"><i
                                    class="layui-icon">${child.iconCls }</i>&nbsp; ${child.text}</a></dd>
                        </c:forEach>
                    </dl>
                </li>
            </c:forEach>


        </ul>


    </div>

</div>
<!-- left 导航 结束 div -->

