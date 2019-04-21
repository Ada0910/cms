<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!-- 底部 内容 模块 -->
    <div style="padding: 20px 0px 0px 0px; background-color: #0c0d0e; text-align: center">
        ${config.foodInfo}
        <!-- 【友情链接】开始  -->
                <div style="color: #795548">友情连接</div>
                <div class="layui-field-box" style="text-align: center">
                    <div class="link_list">
                        <c:forEach var="link" items="${linkList}" varStatus="status">
                            <a target="_blank" href="${link.url }">${link.name }&nbsp;&nbsp;&nbsp;&nbsp;|  </a>
                        </c:forEach>

                    </div>
                </div>


    </div>


