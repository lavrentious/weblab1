package ru.lavrent.web.lab1.responses;

import ru.lavrent.web.lab1.Main;

public class Response {
  private long scriptTime;

  public Response() {
    this.scriptTime = (System.nanoTime() - Main.startTime) / 1000000;
  }

  public long getScriptTime() {
    return scriptTime;
  }
}
