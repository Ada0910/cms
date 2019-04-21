package com.cms.pojo;

public class Config {
    private Integer id;

    private String webName;// 网站名称

    private String stationName;// 公司名称

    private String webSite;// 网址

    private String backstageLogo;// 后台logo

    private String publicNumber;// 公众号

    private String personalCode;// 个人二维码

    private String logo;// 导航左边的logo图片


    private String indexPageTitle;// 首页 标题

    private String indexPageKeywords;// 首页 关键词

    private String indexPageDescription;// 首页 描述 摘要

    private String record;// 备案信息

    private Integer version;// 记录这个软件 的版本号,根据不同的版本 更新不同的功能

    private String headStr;// head头里面的东西

    private String layuiStr;// layui 版本

    private String countStr;// 统计代码 统计访问的代码

    private String foodInfo;// 页面底部内容

    private String navStr;// 导航 字符串 导航内容

    public String getHeadStr() {
        return headStr;
    }

    public void setHeadStr(String headStr) {
        this.headStr = headStr;
    }

    public String getLayuiStr() {
        return layuiStr;
    }

    public void setLayuiStr(String layuiStr) {
        this.layuiStr = layuiStr;
    }

    public String getCountStr() {
        return countStr;
    }

    public void setCountStr(String countStr) {
        this.countStr = countStr;
    }

    public String getFoodInfo() {
        return foodInfo;
    }

    public void setFoodInfo(String foodInfo) {
        this.foodInfo = foodInfo;
    }

    public String getNavStr() {
        return navStr;
    }

    public void setNavStr(String navStr) {
        this.navStr = navStr;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getWebName() {
        return webName;
    }

    public void setWebName(String webName) {
        this.webName = webName == null ? null : webName.trim();
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName == null ? null : stationName.trim();
    }

    public String getWebSite() {
        return webSite;
    }

    public void setWebSite(String webSite) {
        this.webSite = webSite == null ? null : webSite.trim();
    }

    public String getBackstageLogo() {
        return backstageLogo;
    }

    public void setBackstageLogo(String backstageLogo) {
        this.backstageLogo = backstageLogo == null ? null : backstageLogo.trim();
    }

    public String getpublicNumber() {
        return publicNumber;
    }

    public void setpublicNumber(String publicNumber) {
        this.publicNumber = publicNumber == null ? null : publicNumber.trim();
    }

    public String getPersonalCode() {
        return personalCode;
    }

    public void setPersonalCode(String personalCode) {
        this.personalCode = personalCode == null ? null : personalCode.trim();
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo == null ? null : logo.trim();
    }

    public String getIndexPageTitle() {
        return indexPageTitle;
    }

    public void setIndexPageTitle(String indexPageTitle) {
        this.indexPageTitle = indexPageTitle == null ? null : indexPageTitle.trim();
    }

    public String getIndexPageKeywords() {
        return indexPageKeywords;
    }

    public void setIndexPageKeywords(String indexPageKeywords) {
        this.indexPageKeywords = indexPageKeywords == null ? null : indexPageKeywords.trim();
    }

    public String getIndexPageDescription() {
        return indexPageDescription;
    }

    public void setIndexPageDescription(String indexPageDescription) {
        this.indexPageDescription = indexPageDescription == null ? null : indexPageDescription.trim();
    }

    public String getRecord() {
        return record;
    }

    public void setRecord(String record) {
        this.record = record == null ? null : record.trim();
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}