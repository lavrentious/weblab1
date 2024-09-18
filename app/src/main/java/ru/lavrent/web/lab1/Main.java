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
    String resource = FCGIInterface.request.params.getProperty("PATH_INFO");
    if (!method.equals("GET")) {
      sendError("method %s is not supported".formatted(method), 405);
      return;
    }
    if (resource != null && !resource.equals("/")) {
      sendError("resource %s is not found".formatted(resource), 404);
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
      sendError(e.getMessage(), 400);
    }
  }

  private static void sendHit(boolean hit) {
    HTTPUtils.sendResponse(gson.toJson(new HitCheckResponse(hit)), 200);
  }

  private static void sendError(String message, int statusCode) {
    HTTPUtils.sendResponse(gson.toJson(new ErrorResponse(message)), statusCode);
  }
}
