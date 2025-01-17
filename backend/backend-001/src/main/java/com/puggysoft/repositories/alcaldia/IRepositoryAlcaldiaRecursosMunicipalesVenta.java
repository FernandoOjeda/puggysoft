package com.puggysoft.repositories.alcaldia;

import com.puggysoft.entities.alcaldia.EntityAlcaldiaRecursosMunicipalesVenta;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IRepositoryAlcaldiaRecursosMunicipalesVenta
    extends JpaRepository<EntityAlcaldiaRecursosMunicipalesVenta, Long> {

  @Query(value = "SELECT COUNT(*) FROM alcaldia_recursos_municipales_venta;", nativeQuery = true)
  Long findSize();

  @Query(value = "SELECT * FROM alcaldia_recursos_municipales_venta LIMIT ?1, ?2", nativeQuery = true)
  List<EntityAlcaldiaRecursosMunicipalesVenta> findAlcaldiaRecursosMunicipalesVentaByPagination(int off, int size);

}