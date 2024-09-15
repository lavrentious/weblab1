export default {
  async testFetch() {
    return fetch("http://localhost:8080/fcgi-bin/server.jar").then((response) =>
      response.text()
    );
  },
  async checkHit(x, y, r) {
    return fetch(
      "http://localhost:8080/fcgi-bin/server.jar?" +
        new URLSearchParams({ x, y, r }).toString()
    ).then((response) => response.json());
  },
};
