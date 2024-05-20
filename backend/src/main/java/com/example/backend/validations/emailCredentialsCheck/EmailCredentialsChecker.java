package com.example.backend.validations.emailCredentialsCheck;

import com.example.backend.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EmailCredentialsChecker implements ConstraintValidator<EmailCredentialsCheck, String> {

    private final UserRepository userRepository;

    public EmailCredentialsChecker(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void initialize(EmailCredentialsCheck constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext constraintValidatorContext) {
        return userRepository.findUserByEmail(email).isPresent();
    }

}
