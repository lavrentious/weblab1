package ru.lavrent.web.lab1.responses;

public class ErrorResponse extends Response {
  private String message;

  public ErrorResponse(String message) {
    super();
    this.message = message;
  }

  public String getMessage() {
    return message;
  }
}
