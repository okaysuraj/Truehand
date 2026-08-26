package com.truehand.config;

import com.truehand.model.Product;
import com.truehand.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.truehand.model.User;
import com.truehand.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // Data seeding disabled as per user request (relying on real products)
    }
}
