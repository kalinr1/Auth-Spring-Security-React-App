//package com.example.backend.model.entities;
//
//import com.example.backend.model.enums.RoleEnum;
//import jakarta.persistence.*;
//import lombok.*;
//
//import java.util.List;
//
//@Entity
//@Table(name = "auth_roles")
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//public class RoleEntity extends BaseEntity{
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private RoleEnum role;
//
//    @ManyToMany(mappedBy = "roles")
//    private List<UserEntity> users;
//}
