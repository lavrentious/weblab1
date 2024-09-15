package ru.lavrent.web.lab1.responses;

public class HitCheckResponse extends Response {
  private boolean hit;

  public HitCheckResponse(boolean hit) {
    super();
    this.hit = hit;
  }

  public boolean getHit() {
    return hit;
  }
}
