package ru.lavrent.web.lab1;

import com.fastcgi.FCGIInterface;
import com.fastcgi.FCGIRequest;
import com.google.gson.Gson;
import ru.lavrent.web.lab1.exceptions.ValidationException;
import ru.lavrent.web.lab1.responses.ErrorResponse;
import ru.lavrent.web.lab1.responses.HitCheckResponse;

public class Main {
  private static Gson gson = new Gson();
  public static final long startTime = System.nanoTime();

  public static void main(String args[]) {
    FCGIInterface fcgiInterface = new FCGIInterface();

    while (fcgiInterface.FCGIaccept() >= 0) {
      processRequest(FCGIInterface.request);
    }
    System.err.println("shut down");
  }

  private static void processRequest(FCGIRequest request) {
    String method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");
    if (!method.equals("GET")) {
      sendError("method %s is not supported".formatted(method));
      return;
    }
    String query = FCGIInterface.request.params.getProperty("QUERY_STRING");
    try {
      int x = HTTPUtils.getInt(query, "x");
      int y = HTTPUtils.getInt(query, "y");
      float r = HTTPUtils.getFloat(query, "r");
      Validator.validate(x, y, r);
      boolean isHit = Validator.checkHit(x, y, r);
      sendHit(isHit);
    } catch (ValidationException e) {
      sendError(e.getMessage());
    }
  }

  private static void sendHit(boolean hit) {
    HTTPUtils.sendResponse(gson.toJson(new HitCheckResponse(hit)), 200);
  }

  private static void sendError(String message) {
    HTTPUtils.sendResponse(gson.toJson(new ErrorResponse(message)), 400);
  }
}
