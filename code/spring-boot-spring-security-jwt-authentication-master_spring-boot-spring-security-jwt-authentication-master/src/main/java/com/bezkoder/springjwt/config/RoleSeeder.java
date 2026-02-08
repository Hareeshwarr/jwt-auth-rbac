package com.bezkoder.springjwt.config;

import com.bezkoder.springjwt.models.ERole;
import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class RoleSeeder implements CommandLineRunner {

  private final RoleRepository roleRepository;

  public RoleSeeder(RoleRepository roleRepository) {
    this.roleRepository = roleRepository;
  }

  @Override
  public void run(String... args) {
    if (roleRepository.count() == 0) {
      roleRepository.save(new Role(ERole.ROLE_USER));
      roleRepository.save(new Role(ERole.ROLE_MODERATOR));
      roleRepository.save(new Role(ERole.ROLE_ADMIN));
    }
  }
}
