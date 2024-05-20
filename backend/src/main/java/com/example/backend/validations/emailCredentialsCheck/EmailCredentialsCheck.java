package com.example.backend.validations.emailCredentialsCheck;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Constraint(validatedBy = EmailCredentialsChecker.class)
public @interface EmailCredentialsCheck {
    String message() default "Sorry, we can't find an account with this email address.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
