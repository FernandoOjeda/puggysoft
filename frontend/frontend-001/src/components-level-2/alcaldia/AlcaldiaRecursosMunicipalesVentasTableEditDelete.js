import React from "react";
import { useHistory } from "react-router";
import i18n from "../../i18n/i18n";
import enumPaths from "../../models/enumPaths";
import { handleFilterRequest } from "../../actions/HandleManager";
import AlcaldiaRecursosMunicipalesVentasGenericTable from "./generic/AlcaldiaRecursosMunicipalesVentasGenericTable";
import enumTableColumnsToShow from "../../models/enumTableColumnsToShow";

function AlcaldiaRecursosMunicipalesVentasTable () {
  const tableTitle = i18n.alcaldiaRecursosMunicipalesVentasTable.title;
  const pageSize = 7;
  const numberPagesToShow = 7;

  const history = useHistory();

  function handleGetData (activePage, filterBody, updateArrayData) {
    handleFilterRequest(`alcaldia-recursos-municipales-ventas/filter?page=${activePage - 1}&size=${pageSize}`, filterBody, updateArrayData);
  }

  function handleGetSize (filterBody, setTotalPages) {
    handleFilterRequest(`alcaldia-recursos-municipales-ventas/filter/size/${pageSize}`, filterBody, setTotalPages);
  }

  function handleEdit (data) {
    history.push({
      pathname: enumPaths.ALCALDIA_RECURSOS_MUNICIPALES_VENTAS_FORM,
      state: {
        data,
        edit: true
      }
    });
  }

  const tableArrayCustomRowButtons = [
    {
      variant: "success",
      handleCustom: handleEdit,
      text: i18n.commonTable.editButton
    }
  ];

  return (
    <AlcaldiaRecursosMunicipalesVentasGenericTable
      tableTitle={tableTitle}
      numberPagesToShow={numberPagesToShow}
      handleGetData={handleGetData}
      handleGetSize={handleGetSize}
      tableArrayCustomRowButtons={tableArrayCustomRowButtons}
      columnsToShow={enumTableColumnsToShow.FULL}
    >
    </AlcaldiaRecursosMunicipalesVentasGenericTable>
  );
}

export default AlcaldiaRecursosMunicipalesVentasTable;
