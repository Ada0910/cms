<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!-- 导航 -->
<div class="model" style="background-color: #393D49;">
    <div class="content">
        <div id="logo" na="logo" style="float: left; height: 60px; overflow: hidden;">
            <a id="logo" na="logo" style="display: block;" href="/index.html">
                <img id="logo" na="logo" title="${config.indexPageTitle}" src="${config.logo}"/>
            </a>
        </div>

        ${config.navStr}
        <!--content 内部   清除浮动 -->
        <div style=" clear:both;"></div>
    </div>
</div>
<!-- 导航 -->
	

