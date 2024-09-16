import api from "./api.js";
import formService from "./form.js";
import historyService from "./history.js";

function onSubmit(formData, formService) {
  console.log("submitting data: ", formData);
  formService.setSubmitActive(false);
  api
    .checkHit(formData.x, formData.y, formData.r)
    .then((res) => {
      historyService.addElement(res);
      historyService.addChild(res);
      formService.resetForm();
    })
    .finally(() => {
      formService.setSubmitActive(true);
    });
}
function onInit() {
  console.log("initializing form");
  formService.init(onSubmit);
  historyService.init();
}

onInit();
