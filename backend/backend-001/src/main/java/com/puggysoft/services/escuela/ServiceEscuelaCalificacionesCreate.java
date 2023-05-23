package com.puggysoft.services.escuela;

import com.puggysoft.dtos.escuela.DtoEscuelaCalificaciones;
import com.puggysoft.entities.escuela.EntityEscuelaCalificaciones;
import com.puggysoft.repositories.escuela.IRepositoryEscuelaCalificaciones;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/** Services for create. */
@Service
public class ServiceEscuelaCalificacionesCreate {

  @Autowired
  private IRepositoryEscuelaCalificaciones repositoryEscuelaCalificaciones;

  /** method for create. */
  public ResponseEntity<String> create(DtoEscuelaCalificaciones dtoEscuelaCalificaciones) {
    try {
      EntityEscuelaCalificaciones entity = repositoryEscuelaCalificaciones.save(dtoEscuelaCalificaciones.dtoToEntity());
      DtoEscuelaCalificaciones dto = DtoEscuelaCalificaciones.entityToDto(entity);
      String idString = String.valueOf(dto.getId());
      return ResponseEntity.status(HttpStatus.CREATED).body(idString);
    } catch (DataAccessException ex) {
      String dbException = ex.getMostSpecificCause().getMessage();
      return ResponseEntity.status(HttpStatus.CONFLICT).body(dbException);
    }
  }
}
