package com.example.backend.controller;

import com.example.backend.config.UserAuthenticationProvider;
import com.example.backend.model.dtos.UserDto;
import com.example.backend.model.dtos.binding.UserLoginDTO;
import com.example.backend.model.dtos.binding.UserRegisterDTO;
import com.example.backend.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class AuthController {

    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    public AuthController(UserService userService, UserAuthenticationProvider userAuthenticationProvider) {
        this.userService = userService;
        this.userAuthenticationProvider = userAuthenticationProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Validated UserRegisterDTO userRegisterDTO,
                         BindingResult bindingResult){

        if (bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        userService.registerUser(userRegisterDTO);
        System.out.println("registered");
        return ResponseEntity.ok("Registration successful");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Validated UserLoginDTO userLoginDTO,
                                   BindingResult bindingResult,
                                   HttpServletResponse response){

        if (bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        UserDto userDto = userService.loginUser(userLoginDTO);

        if (userDto == null){
            bindingResult.rejectValue("password", "Incorrect password", "Incorrect password");
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        String token = userAuthenticationProvider.createToken(userDto);

        Cookie cookie = new Cookie("auth_token", token);

        cookie.setSecure(true);
        cookie.setMaxAge(3600);
        cookie.setDomain("localhost");
        response.addCookie(cookie);


        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/cookie")
    public ResponseEntity<?> cookieTest(HttpServletResponse response){
        response.addCookie(new Cookie("test", "testCookie"));
        return ResponseEntity.ok("123");
    }
}



//@PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody @Validated UserLoginDTO userLoginDTO,
//                                   BindingResult bindingResult){
//
//        if (bindingResult.hasErrors()){
//            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
//        }
//
//        UserDto userDto = userService.loginUser(userLoginDTO);
//
//        if (userDto == null){
//            bindingResult.rejectValue("password", "Incorrect password", "Incorrect password");
//            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
//        }
//
//        userDto.setToken(userAuthenticationProvider.createToken(userDto));
//
//        return ResponseEntity.ok(userDto);
//    }