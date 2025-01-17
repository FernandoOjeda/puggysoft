import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CommonLoading from "../../components-level-1/CommonLoading";
import i18n from "../../i18n/i18n";
import useInput from "../../hooks/useInput";
import {
  handleAddRequest,
  handleEditRequest
} from "../../actions/HandleManager";
import {
  handleValidation,
  classNameFormTextNew
} from "../../validations/alcaldia/HandleAlcaldiaRecursosMunicipalesFormValidations";
import CommonMessage from "../../components-level-1/CommonMessage";

import "./../css/all-forms.css";

function AlcaldiaRecursosMunicipalesForm () {
  const history = useHistory();
  const isEditDefaultValue =
    history && history.location && history.location.state;
  const [isEdit, setIsEdit] = useState(isEditDefaultValue);
  const [classNameFormText, setClassNameFormText] =
    useState(classNameFormTextNew);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  // Message states
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");

  // Put default values:
  const id = isEdit && isEdit.data.id !== null ? isEdit.data.id : "";
  const codigo =
    isEdit && isEdit.data.codigo !== null ? isEdit.data.codigo : "";
  const name = isEdit && isEdit.data.name !== null ? isEdit.data.name : "";
  const precio =
    isEdit && isEdit.data.precio !== null ? isEdit.data.precio : "";

  // Use custom hook
  const {
    value: valueCodigo,
    onChange: onChangeCodigo,
    reset: resetCodigo
  } = useInput(codigo);
  const {
    value: valueName,
    onChange: onChangeName,
    reset: resetName
  } = useInput(name);
  const {
    value: valuePrecio,
    onChange: onChangePrecio,
    reset: resetPrecio
  } = useInput(precio);

  const handleReset = () => {
    resetCodigo();
    resetName();
    resetPrecio();
  };

  const getBody = useCallback(
    function () {
      const username = window.sessionStorage.getItem("username");
      const tenant = window.sessionStorage.getItem("tenant");
      const body = {
        codigo: valueCodigo,
        name: valueName,
        precio: valuePrecio,
        tenant,
        createdBy: username,
        updatedBy: username
      };
      return body;
    },
    [valueCodigo, valueName, valuePrecio]
  );

  const handleAfterAdd = function (newEntityId) {
    handleReset();
    const body = getBody();
    handleValidation(body, setClassNameFormText);
    setIsRequestInProgress(false);
  };

  const handleAfterEdit = function () {
    handleReset();
    setIsEdit(undefined);
    const body = getBody();
    handleValidation(body, setClassNameFormText);
    setIsRequestInProgress(false);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const body = getBody();
    const isValid = handleValidation(body, setClassNameFormText);
    if (isValid) {
      setIsRequestInProgress(true);
      if (isEdit) {
        handleEditRequest(
          "alcaldia-recursos-municipales/",
          body,
          id,
          handleAfterEdit
        );
      } else {
        handleAddRequest(
          "alcaldia-recursos-municipales/",
          body,
          handleAfterAdd
        );
      }
    } else {
      setMessageTitle(i18n.errorMessages.validationErrorTitle);
      setMessageText(i18n.errorMessages.validationError);
      setIsMessageVisible(true);
    }
  };

  useEffect(() => {
    const body = getBody();
    handleValidation(body, setClassNameFormText);
  }, [getBody]);

  if (isRequestInProgress) {
    return <CommonLoading></CommonLoading>;
  }

  return (
    <div className="puggysoft-form-thirty-with">
      <CommonMessage
        isVisible={isMessageVisible}
        setIsVisible={setIsMessageVisible}
        titleText={messageTitle}
        bodyText={messageText}
        variant="danger"
      />
      <Card>
        <Card.Header as="h3">
          {i18n.alcaldiaRecursosMunicipalesForm.title}
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="codigo">
              <Form.Label>
                {i18n.alcaldiaRecursosMunicipalesForm.fieldCodigo}
              </Form.Label>
              <Form.Control
                onChange={onChangeCodigo}
                value={valueCodigo}
                type="text"
                placeholder={i18n.alcaldiaRecursosMunicipalesForm.fieldCodigo}
              />
              <Form.Text muted className={classNameFormText.codigo}>
                {i18n.alcaldiaRecursosMunicipalesForm.fieldCodigoText}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>
                {i18n.alcaldiaRecursosMunicipalesForm.fieldName}
              </Form.Label>
              <Form.Control
                onChange={onChangeName}
                value={valueName}
                type="text"
                placeholder={i18n.alcaldiaRecursosMunicipalesForm.fieldName}
              />
              <Form.Text muted className={classNameFormText.name}>
                {i18n.alcaldiaRecursosMunicipalesForm.fieldNameText}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="precio">
              <Form.Label>
                {i18n.alcaldiaRecursosMunicipalesForm.fieldPrecio}
              </Form.Label>
              <Form.Control
                onChange={onChangePrecio}
                value={valuePrecio}
                type="number"
                placeholder={i18n.alcaldiaRecursosMunicipalesForm.fieldPrecio}
              />
              <Form.Text muted className={classNameFormText.precio}>
                {i18n.alcaldiaRecursosMunicipalesForm.fieldPrecioText}
              </Form.Text>
            </Form.Group>
            <Button onClick={handleAdd} variant="primary" type="button">
              {i18n.commonForm.saveButton}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AlcaldiaRecursosMunicipalesForm;
