<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>


<%--<!-- 轮播 -->
<div class="model" style="background-color: white;">
    <div class="content">
        <div style="width: 100%; padding: 10px 0px 10px 0px; overflow: hidden;">

            <div style="overflow: hidden; float: left;width: 50%; height: 400px; background-color: #cddc3945;">

                <c:if test="${carouselList[0].type==1}">
                    <a style="display: block;" href="${carouselList[0].url}" title="${carouselList[0].title}">
                        <img alt="${carouselList[0].title}" src="${carouselList[0].imageUrl}"/>
                    </a>
                </c:if>

                <c:if test="${carouselList[0].type==2}">
                    <a target="_blank" style="display: block;" href="${carouselList[0].url}"
                       title="${carouselList[0].title}">
                        <img alt="${carouselList[0].title}" src="${carouselList[0].imageUrl}"/>
                    </a>
                </c:if>

            </div>


            <div style="overflow: hidden; float: left;width: 50%; height: 400px; background-color: #4caf5066;">

                <div style="overflow: hidden;height: 200px; background-color: #cddc397a;">
                    <c:if test="${carouselList[1].type==1}">
                        <a style="display: block;" href="${carouselList[1].url}" title="${carouselList[1].title}">
                            <img alt="${carouselList[1].title}" src="${carouselList[1].imageUrl}"/>
                        </a>
                    </c:if>
                    <c:if test="${carouselList[1].type==2}">
                        <a target="_blank" style="display: block;" href="${carouselList[1].url}"
                           title="${carouselList[1].title}">
                            <img alt="${carouselList[1].title}" src="${carouselList[1].imageUrl}"/>
                        </a>
                    </c:if>
                </div>

                <div style="overflow: hidden;height: 200px; background-color: #4caf5066;">
                    <div style="overflow: hidden;width: 50%; height:100%; float: left; background-color: #673ab77d;">
                        <c:if test="${carouselList[2].type==1}">
                            <a style="display: block;" href="${carouselList[2].url}" title="${carouselList[2].title}">
                                <img alt="${carouselList[2].title}" src="${carouselList[2].imageUrl}"/>
                            </a>
                        </c:if>
                        <c:if test="${carouselList[2].type==2}">
                            <a target="_blank" style="display: block;" href="${carouselList[2].url}"
                               title="${carouselList[2].title}">
                                <img alt="${carouselList[2].title}" src="${carouselList[2].imageUrl}"/>
                            </a>
                        </c:if>
                    </div>

                    <div style="overflow: hidden;width: 50%; height:100%; float: left;">
                        <c:if test="${carouselList[3].type==1}">
                            <a style="display: block;" href="${carouselList[3].url}" title="${carouselList[3].title}">
                                <img alt="${carouselList[3].title}" src="${carouselList[3].imageUrl}"/>
                            </a>
                        </c:if>
                        <c:if test="${carouselList[3].type==2}">
                            <a target="_blank" style="display: block;" href="${carouselList[3].url}"
                               title="${carouselList[3].title}">
                                <img alt="${carouselList[3].title}" src="${carouselList[3].imageUrl}"/>
                            </a>
                        </c:if>
                    </div>


                </div>
            </div>
        </div>
        <!--content 内部   清除浮动 -->
        <div style=" clear:both;"></div>
    </div>
</div>
<!-- 轮播 -->--%>

<div class="layui-carousel" id="test10" style=" width: 80%; height:520px;margin-left: 10%;margin-top: 24px;
    margin-bottom: 24px">
    <div carousel-item="">
        <c:forEach var="c" items="${carouselList}">
            <c:if test="${c.type==1}">
                <div><a href="${c.url}" style="display: block;" ><img src="${c.imageUrl}"
                                                             style=" width: 100%; height:520px;"></a></div>

            </c:if>
            <c:if test="${c.type==2}">
                <div><a href="${c.url}" target="_blank"><img src="${c.imageUrl}"
                                                             style=" width: 100%; height:520px;"></a></div>
            </c:if>
        </c:forEach>

        <%--<div><img src="${carouselList[0].imageUrl}" style=" width: 100%; height:520px;"></div>
        <div><img src="${carouselList[1].imageUrl}" style=" width: 100%; height:520px;"></div>
        <div><img src="${carouselList[2].imageUrl}" style=" width: 100%; height:520px;"></div>
        <div><img src="${carouselList[3].imageUrl}" style=" width: 100%; height:520px;"></div>
        <div><img src="${carouselList[4].imageUrl}" style=" width: 100%; height:520px;"></div>--%>
    </div>
</div>


