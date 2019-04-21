package com.cms.pojo;

import java.util.Date;

public class Blog {
    private Integer id;// id
    private String title;// 标题
    private String content;// 内容
    private String contentNoTag;// 没有标签 的内容
    private String summary;// 摘要

    private String thumbnailImage;// 缩略图

    private String keywords;// 搜索-关键字
    private String description;// 搜索-描述

    private Integer clickHit; // 查看次数
    private Integer replyHit; // 回复次数

    private Integer displayMode;// 展示模式 不同的模式 页面不同
    private String url;
    private Integer createUserId;// 创建人id
    private Integer blogClassifyId;// 分类id

    private Integer isUse;// 是否显示
    private Date createDateTime;// 创建时间
    private Date updateDateTime;// 修改时间

    //////////////////////////
    private User createUser;
    private BlogClassify blogClassify;
    //////////////////////////

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentNoTag() {
        return contentNoTag;
    }

    public void setContentNoTag(String contentNoTag) {
        this.contentNoTag = contentNoTag;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getThumbnailImage() {
        return thumbnailImage;
    }

    public void setThumbnailImage(String thumbnailImage) {
        this.thumbnailImage = thumbnailImage;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getClickHit() {
        return clickHit;
    }

    public void setClickHit(Integer clickHit) {
        this.clickHit = clickHit;
    }

    public Integer getReplyHit() {
        return replyHit;
    }

    public void setReplyHit(Integer replyHit) {
        this.replyHit = replyHit;
    }

    public Integer getDisplayMode() {
        return displayMode;
    }

    public void setDisplayMode(Integer displayMode) {
        this.displayMode = displayMode;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
    }

    public Integer getBlogClassifyId() {
        return blogClassifyId;
    }

    public void setBlogClassifyId(Integer blogClassifyId) {
        this.blogClassifyId = blogClassifyId;
    }

    public Integer getIsUse() {
        return isUse;
    }

    public void setIsUse(Integer isUse) {
        this.isUse = isUse;
    }

    public Date getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(Date createDateTime) {
        this.createDateTime = createDateTime;
    }

    public Date getUpdateDateTime() {
        return updateDateTime;
    }

    public void setUpdateDateTime(Date updateDateTime) {
        this.updateDateTime = updateDateTime;
    }

    public User getCreateUser() {
        return createUser;
    }

    public void setCreateUser(User createUser) {
        this.createUser = createUser;
    }

    public BlogClassify getBlogClassify() {
        return blogClassify;
    }

    public void setBlogClassify(BlogClassify blogClassify) {
        this.blogClassify = blogClassify;
    }

}