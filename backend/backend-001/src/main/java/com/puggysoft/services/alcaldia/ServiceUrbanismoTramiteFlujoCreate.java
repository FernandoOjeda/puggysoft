package com.puggysoft.services.alcaldia;

import com.puggysoft.dtos.alcaldia.DtoUrbanismoTramiteFlujo;
import com.puggysoft.entities.alcaldia.EntityUrbanismoTramiteFlujo;
import com.puggysoft.repositories.alcaldia.IRepositoryUrbanismoTramiteFlujo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/** Services for create. */
@Service
public class ServiceUrbanismoTramiteFlujoCreate {

  @Autowired
  private IRepositoryUrbanismoTramiteFlujo repositoryUrbanismoTramiteFlujo;

  /** method for create. */
  public ResponseEntity<String> create(DtoUrbanismoTramiteFlujo dtoUrbanismoTramiteFlujo) {
    try {
      EntityUrbanismoTramiteFlujo entity = repositoryUrbanismoTramiteFlujo
          .save(dtoUrbanismoTramiteFlujo.dtoToEntity());
      DtoUrbanismoTramiteFlujo dto = DtoUrbanismoTramiteFlujo.entityToDto(entity);
      String idString = String.valueOf(dto.getId());
      return ResponseEntity.status(HttpStatus.CREATED).body(idString);
    } catch (DataAccessException ex) {
      String dbException = ex.getMostSpecificCause().getMessage();
      return ResponseEntity.status(HttpStatus.CONFLICT).body(dbException);
    }
  }
}
