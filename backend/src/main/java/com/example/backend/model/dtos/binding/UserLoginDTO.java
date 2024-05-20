package com.example.backend.model.dtos.binding;

import com.example.backend.validations.emailCredentialsCheck.EmailCredentialsCheck;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserLoginDTO {

    @EmailCredentialsCheck
    @Pattern(regexp = "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Please enter a valid email")
    private String email;

    @Size(min = 6, max = 20, message = "Password must be at least 6 characters long")
    private String password;
}
