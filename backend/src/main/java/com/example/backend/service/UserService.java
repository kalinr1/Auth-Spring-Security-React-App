package com.example.backend.service;

import com.example.backend.model.dtos.UserDto;
import com.example.backend.model.dtos.binding.UserLoginDTO;
import com.example.backend.model.dtos.binding.UserRegisterDTO;
import com.example.backend.model.entities.UserEntity;
import com.example.backend.model.enums.RoleEnum;
import com.example.backend.model.exceptions.UserNotFoundException;
import com.example.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public UserEntity findUserByEmail(String email){
        return userRepository.findUserByEmail(email).orElseThrow(() -> new UserNotFoundException("User with email " + email + " was not found!"));
    }

    public UserDto findUserDTOByEmail(String email){
        return modelMapper.map(this.findUserByEmail(email), UserDto.class);
    }

    public void registerUser(UserRegisterDTO userRegisterDTO) {
        userRegisterDTO.setPassword(passwordEncoder.encode(userRegisterDTO.getPassword()));
        UserEntity user = modelMapper.map(userRegisterDTO, UserEntity.class);
        user.setRole(RoleEnum.USER);
        userRepository.save(user);
    }

    public UserDto loginUser(UserLoginDTO userLoginDTO){
        UserEntity user = userRepository.findUserByEmail(userLoginDTO.getEmail()).orElseThrow(() -> new UserNotFoundException("User with email " + userLoginDTO.getEmail() + " was not found!"));


        if (passwordEncoder.matches(userLoginDTO.getPassword(), user.getPassword())){
            return modelMapper.map(user, UserDto.class);
        }

        return null;
    }
}
