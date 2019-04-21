package com.cms.pojo;

import java.util.Date;

public class Memo {
    private Integer id;

    private String title;

    private String content;

    private Integer memoClassifyId;

    private Integer orderNo;

    private Integer createUserId;

    private Date createDateTime;

    private Date updateDateTime;

    private User createUser;

    public User getCreateUser() {
        return createUser;
    }

    public void setCreateUser(User createUser) {
        this.createUser = createUser;
    }

    public MemoClassify getMemoClassify() {
        return memoClassify;
    }

    public void setMemoClassify(MemoClassify memoClassify) {
        this.memoClassify = memoClassify;
    }

    private MemoClassify memoClassify;

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

    public Integer getMemoClassifyId() {
        return memoClassifyId;
    }

    public void setMemoClassifyId(Integer memoClassifyId) {
        this.memoClassifyId = memoClassifyId;
    }

    public Integer getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {
        this.orderNo = orderNo;
    }

    public Integer getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
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


}