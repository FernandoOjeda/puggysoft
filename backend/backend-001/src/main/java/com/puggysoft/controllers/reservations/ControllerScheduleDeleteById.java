package com.puggysoft.controllers.reservations;

import com.puggysoft.services.reservations.ServiceScheduleDeleteById;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControllerScheduleDeleteById {

  @Autowired
  private ServiceScheduleDeleteById serviceScheduleDeleteById;

  @DeleteMapping(path = "/api/v1/reservations-schedules/{id}")
  public ResponseEntity<String> deleteById(@PathVariable Long id) {
    return serviceScheduleDeleteById.deleteById(id);
  }
}