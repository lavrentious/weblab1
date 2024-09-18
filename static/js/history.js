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
    const emptyRow = document.getElementById("emptyRow");
    if (emptyRow) {
      emptyRow.parentNode.removeChild(emptyRow);
    }
    const tableBody = document.getElementById("historyTableBody");
    const tr = document.createElement("tr");

    const tdTime = document.createElement("td");
    tdTime.innerHTML = new Date(obj.time).toLocaleString();

    const tdX = document.createElement("td");
    tdX.innerHTML = obj.x;

    const tdY = document.createElement("td");
    tdY.innerHTML = obj.y;

    const tdR = document.createElement("td");
    tdR.innerHTML = obj.r;

    const tdHit = document.createElement("td");
    tdHit.innerHTML = obj.hit ? "✅" : "❌";

    const tdScriptTime = document.createElement("td");
    tdScriptTime.innerHTML = Math.trunc(obj.scriptTime / 100) / 10 + " с";

    [tdTime, tdX, tdY, tdR, tdHit, tdScriptTime].forEach((td) =>
      tr.appendChild(td)
    );

    tr.id = "history-element-" + obj.time;
    tableBody.appendChild(tr);
  },
  init() {
    const history = this.loadHistory();
    this.clearTable();
    history.forEach((obj) => this.addChild(obj));

    historyClearButton.addEventListener("click", () => {
      this.clearTable();
      this.saveHistory([]);
    });
  },
  clearTable() {
    const historyTableBody = document.getElementById("historyTableBody");
    const emptyRow = document.createElement("tr");
    emptyRow.setAttribute("id", "emptyRow");
    const emptyCell = document.createElement("td");
    emptyCell.colSpan = 6;
    emptyCell.innerHTML = "Нет результатов";
    emptyRow.appendChild(emptyCell);
    emptyCell.classList.add("text-muted");
    historyTableBody.replaceChildren([]);
    historyTableBody.appendChild(emptyRow);
  },
};
