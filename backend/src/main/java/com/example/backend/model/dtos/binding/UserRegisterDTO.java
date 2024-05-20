package com.example.backend.model.dtos.binding;

import com.example.backend.validations.availableEmailCheck.AvailableEmailCheck;
import com.example.backend.validations.confirmPasswordMatcher.PasswordMatch;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@PasswordMatch
public class UserRegisterDTO {

    @Pattern(regexp = "^[A-Za-z]+$", message = "Please enter a valid first name")
    private String firstName;

    @Pattern(regexp = "^[A-Za-z]+$", message = "Please enter a valid first name")
    private String lastName;

    @Email
    @AvailableEmailCheck
    @Pattern(regexp = "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Please enter a valid email")
    private String email;

    @Size (min = 6, max = 50, message = "Password must be at least 6 characters long")
    private String password;

    private String confirmPassword;
}

