export default {
  loadHistory() {
    const json = localStorage.getItem("history");
    if (json == null) {
      return [];
    }
    try {
      return JSON.parse(json);
    } catch (e) {
      return [];
    }
  },
  saveHistory(history) {
    localStorage.setItem("history", JSON.stringify(history));
  },
  addElement(obj) {
    console.log("adding new element to history", obj);
    this.saveHistory(this.loadHistory().concat([obj]));
  },
  removeElement(scriptTime) {
    console.log("removing element from history", scriptTime);
    const history = this.loadHistory().filter(
      (obj) => obj.scriptTime !== scriptTime
    );
    this.saveHistory(history);
  },
  addChild(obj) {
    const list = document.getElementById("history-list");
    const li = document.createElement("li");
    li.textContent = JSON.stringify(obj);
    li.classList.add("clickable");
    li.classList.add("deletable");
    li.id = "history-element-" + obj.id;
    list.appendChild(li);

    li.addEventListener("click", () => {
      list.removeChild(li);
      this.removeElement(obj.scriptTime);
    });
  },
  init() {
    const history = this.loadHistory();
    history.forEach((obj) => this.addChild(obj));
  },
};
