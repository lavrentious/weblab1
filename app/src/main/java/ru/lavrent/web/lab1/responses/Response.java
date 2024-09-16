package ru.lavrent.web.lab1.responses;

import ru.lavrent.web.lab1.Main;

public class Response {
  private long scriptTime;
  private long time;

  public Response() {
    this.scriptTime = (System.nanoTime() - Main.startTime) / 1000000;
    this.time = System.currentTimeMillis();
  }

  public long getScriptTime() {
    return scriptTime;
  }
}
