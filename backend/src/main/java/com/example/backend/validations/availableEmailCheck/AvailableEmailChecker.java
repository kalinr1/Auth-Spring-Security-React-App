package com.example.backend.validations.availableEmailCheck;

import com.example.backend.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class AvailableEmailChecker implements ConstraintValidator<AvailableEmailCheck, String> {

    private final UserRepository userRepository;

    public AvailableEmailChecker(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void initialize(AvailableEmailCheck constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext constraintValidatorContext) {
        return userRepository.findUserByEmail(email).isEmpty();
    }

}
