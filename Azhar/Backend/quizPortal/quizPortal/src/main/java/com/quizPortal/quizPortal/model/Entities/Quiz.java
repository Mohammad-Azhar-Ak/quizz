package com.quizPortal.quizPortal.model.Entities;

import com.quizPortal.quizPortal.model.BaseTime;

import javax.persistence.*;

@Entity
public class Quiz extends BaseTime {

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "VARCHAR(45)")
    private String title;

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
