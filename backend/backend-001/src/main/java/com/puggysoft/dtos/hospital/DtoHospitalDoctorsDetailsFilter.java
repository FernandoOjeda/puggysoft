package com.puggysoft.dtos.hospital;

import com.puggysoft.models.EnumCompareOperator;
import javax.validation.constraints.Size;
import lombok.Data;

/**
 * Class.
 */
@Data
public class DtoHospitalDoctorsDetailsFilter {

  // ID
  public String idCriteria;
  public EnumCompareOperator idOperator;
  // USERNAME
  public String userNameCriteria;
  public EnumCompareOperator userNameOperator;
  // SPECIALIZATION
  public String specializationCriteria;
  public EnumCompareOperator specializationOperator;
  // CREATED BY
  @Size(max = 20)
  public String createdByCriteria;
  public EnumCompareOperator createdByOperator;
  // UPDATED BY
  @Size(max = 20)
  public String updatedByCriteria;
  public EnumCompareOperator updatedByOperator;
  // CREATION DATE
  public String creationDateCriteria;
  public EnumCompareOperator creationDateOperator;
  // UPDATED DATE
  public String updateDateCriteria;
  public EnumCompareOperator updateDateOperator;
}