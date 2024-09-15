const R_VALUES = [1, 1.5, 2, 2.5, 3];

export default {
  setSubmitActive(isActive) {
    if (isActive)
      document.getElementById("submitButton").removeAttribute("disabled");
    else document.getElementById("submitButton").setAttribute("disabled", "");
  },
  isInt(value) {
    return (
      value !== "" &&
      !isNaN(+value) &&
      parseInt(Number(+value)) == +value &&
      !isNaN(parseInt(+value, 10))
    );
  },
  validateX() {
    this.resetX();
    const xInput = document.getElementById("xInput");
    const x = xInput.value;
    const isValid = this.isInt(x) && -3 <= x && x <= 3;
    xInput.classList.add(isValid ? "valid" : "invalid");
    this.setSubmitActive(isValid);
    return isValid;
  },
  validateY() {
    this.resetY();
    const yInput = document.getElementById("yInput");
    const y = yInput.value;
    const isValid = this.isInt(y) && -5 <= y && y <= 5;
    yInput.classList.add(isValid ? "valid" : "invalid");
    this.setSubmitActive(isValid);
    return isValid;
  },
  validateR() {
    this.resetR();
    const rValues = this.getRValues();
    const isValid = rValues.length == 1;
    formRFieldset.classList.add(isValid ? "valid" : "invalid");
    this.setSubmitActive(isValid);
    return isValid;
  },
  getRValues() {
    return Array.from(
      document.querySelectorAll('input[name="rValue"]:checked')
    ).map((input) => input.value);
  },
  resetX() {
    xInput.classList.remove("valid");
    xInput.classList.remove("invalid");
  },
  resetY() {
    yInput.classList.remove("valid");
    yInput.classList.remove("invalid");
  },
  resetR() {
    formRFieldset.classList.remove("valid");
    formRFieldset.classList.remove("invalid");
  },
  validate() {
    return +this.validateX() + this.validateY() + this.validateR() === 3;
  },
  getFormData() {
    if (this.validate())
      return {
        x: document.getElementById("xInput").value,
        y: document.getElementById("yInput").value,
        r: this.getRValues()[0],
      };
  },
  initForm(onSubmit) {
    const xInput = document.getElementById("xInput");
    const yInput = document.getElementById("yInput");
    const formRFieldset = document.getElementById("formRFieldset");
    R_VALUES.forEach((value, i) => {
      const li = document.createElement("li");
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = "rValue";
      input.value = value;

      label.appendChild(input);
      label.appendChild(document.createTextNode(value));
      li.appendChild(label);
      formRFieldset.appendChild(li);
    });

    xInput.addEventListener("focus", () => {
      this.resetX();
    });
    xInput.addEventListener("blur", () => {
      this.validateX();
    });
    yInput.addEventListener("focus", () => {
      this.resetY();
    });
    yInput.addEventListener("blur", () => {
      this.validateY();
    });
    formRFieldset.addEventListener("change", () => {
      this.validateR();
    });

    const form = document.getElementById("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = this.getFormData();
      console.log(formData);
      if (!formData) return;
      onSubmit(formData, this);
    });
  },
  resetForm() {
    document.getElementById("xInput").value = "";
    document.getElementById("yInput").value = "";
    Array.from(
      document.querySelectorAll('input[name="rValue"]:checked')
    ).forEach((input) => (input.checked = false));
    this.resetX();
    this.resetY();
    this.resetR();
  },
};
