<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<div class="model" style="background-color: #ece9e9;">
    <div class="content" style="width:100%">
        <div style="padding: 17px 0px 10px 0px; overflow: hidden;">

            <c:forEach var="baseModule" items="${baseModuleList}" varStatus="status">
                <div class="base_module" blogClassifyId="${baseModule.id}" style="    width: 35%;
    float: left;
    padding-left: 10%;
    margin-right: 7px;
    border-radius: 5px;
    margin-bottom: 7px;">
                    <div class="m-tab">
                        <div class="m-tab-title">
                            <h1>${baseModule.name}</h1>
                            <div class="m-tab-title-act">
                                <a href="/blog/classify/get?id=${baseModule.id}"><i></i>更多</a>
                            </div>
                        </div>
                        <div class="m-tab-content" style="font-size: 20px">
                            <ul>
                            </ul>
                        </div>
                    </div>
                </div>
            </c:forEach>

        </div>

        <!--content 内部   清除浮动 -->
        <div style=" clear:both;"></div>
    </div>
</div>
	
	
	