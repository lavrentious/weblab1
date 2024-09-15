package ru.lavrent.web.lab1.responses;

public class Response {
  private long scriptTime;

  public Response() {
    this.scriptTime = System.nanoTime();
  }

  public long getScriptTime() {
    return scriptTime;
  }
}
