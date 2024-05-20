//package com.example.backend.service.security;
//
//import com.example.backend.model.entities.RoleEntity;
//import com.example.backend.model.entities.UserEntity;
//import com.example.backend.service.UserService;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//public class ApplicationUserDetailsService implements UserDetailsService {
//
//    private final UserService userService;
//
//    public ApplicationUserDetailsService(UserService userService) {
//        this.userService = userService;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        return mapUserDetails(userService.findUserByEmail(email));
//    }
//
//    private UserDetails mapUserDetails (UserEntity user){
//        return new User(
//                user.getEmail(),
//                user.getPassword(),
//                extractAuthorities(user)
//        );
//    }
//
//    private List<GrantedAuthority> extractAuthorities(UserEntity user){
//        return user.getRoles()
//                .stream()
//                .map(this::mapRole)
//                .collect(Collectors.toList());
//    }
//
//    private GrantedAuthority mapRole (RoleEntity roleEntity){
//        return new SimpleGrantedAuthority("ROLE_" + roleEntity.getRole().name());
//    }
//}
