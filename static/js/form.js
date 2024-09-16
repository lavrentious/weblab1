const R_VALUES = [1, 1.5, 2, 2.5, 3];

export default {
  xInput: document.getElementById("xInput"),
  yInput: document.getElementById("yInput"),
  formRFieldset: document.getElementById("formRFieldset"),
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
    const x = this.xInput.value;
    const isValid = this.isInt(x) && -3 <= x && x <= 3;
    this.xInput.classList.add(isValid ? "valid" : "invalid");
    this.setSubmitActive(isValid);
    return isValid;
  },
  validateY() {
    this.resetY();
    const y = this.yInput.value;
    const isValid = this.isInt(y) && -5 <= y && y <= 5;
    this.yInput.classList.add(isValid ? "valid" : "invalid");
    this.setSubmitActive(isValid);
    return isValid;
  },
  validateR() {
    this.resetR();
    const rValues = this.getRValues();
    const isValid = rValues.length == 1;
    this.formRFieldset.classList.add(isValid ? "valid" : "invalid");
    this.setSubmitActive(isValid);
    return isValid;
  },
  getRValues() {
    return Array.from(
      document.querySelectorAll('input[name="rValue"]:checked')
    ).map((input) => input.value);
  },
  resetX() {
    this.xInput.classList.remove("valid");
    this.xInput.classList.remove("invalid");
  },
  resetY() {
    this.yInput.classList.remove("valid");
    this.yInput.classList.remove("invalid");
  },
  resetR() {
    this.formRFieldset.classList.remove("valid");
    this.formRFieldset.classList.remove("invalid");
  },
  validate() {
    return +this.validateX() + this.validateY() + this.validateR() === 3;
  },
  getFormData() {
    if (this.validate())
      return {
        x: this.xInput.value,
        y: this.yInput.value,
        r: this.getRValues()[0],
      };
  },
  init(onSubmit) {
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

    this.xInput.addEventListener("focus", () => {
      this.resetX();
    });
    this.xInput.addEventListener("blur", () => {
      this.validateX();
    });
    this.yInput.addEventListener("focus", () => {
      this.resetY();
    });
    this.yInput.addEventListener("blur", () => {
      this.validateY();
    });
    this.formRFieldset.addEventListener("change", () => {
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
    this.xInput.value = "";
    this.yInput.value = "";
    Array.from(
      document.querySelectorAll('input[name="rValue"]:checked')
    ).forEach((input) => (input.checked = false));
    this.resetX();
    this.resetY();
    this.resetR();
  },
};
