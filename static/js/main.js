import api from "./api.js";
import formService from "./form.js";

function onSubmit(formData, formService) {
  console.log("submitting data: ", formData);
  formService.setSubmitActive(false);
  api
    .checkHit(formData.x, formData.y, formData.r)
    .then(() => {
      formService.resetForm();
    })
    .finally(() => {
      formService.setSubmitActive(true);
    });
}
function onInit() {
  console.log("initializing form");
  formService.initForm(onSubmit);
}

onInit();
