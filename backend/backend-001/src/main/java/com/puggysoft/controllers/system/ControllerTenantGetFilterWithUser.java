package com.puggysoft.controllers.system;

import com.puggysoft.dtos.system.DtoTenant;
import com.puggysoft.dtos.system.DtoTenantFilter;
import com.puggysoft.services.system.ServiceTenantGetFilterWithUser;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControllerTenantGetFilterWithUser {

  @Autowired
  private ServiceTenantGetFilterWithUser serviceTenantGetFilterWithUser;

  @PostMapping(path = "/api/v1/tenants/filter/with-users")
  public ResponseEntity<List<DtoTenant>> getTenants(
      @RequestParam int page,
      @RequestParam int size,
      @RequestBody @Valid DtoTenantFilter dtoTenantFilter,
      @RequestParam String username) {
    return serviceTenantGetFilterWithUser.filter(dtoTenantFilter, page, size, username);
  }
}
