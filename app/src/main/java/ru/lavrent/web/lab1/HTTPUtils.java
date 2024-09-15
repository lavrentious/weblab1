package ru.lavrent.web.lab1;

import ru.lavrent.web.lab1.exceptions.ValidationException;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class HTTPUtils {
  public static Map<String, String> parseQueryParamsString(String query) {
    Map<String, String> queryPairs = new HashMap<>();

    String[] pairs = query.split("&");
    for (String pair : pairs) {
      String[] keyValue = pair.split("=");
      String key = URLDecoder.decode(keyValue[0], StandardCharsets.UTF_8);
      String value = keyValue.length > 1 ? URLDecoder.decode(keyValue[1], StandardCharsets.UTF_8) : "";
      queryPairs.put(key, value);
    }
    return queryPairs;
  }

  public static void sendResponse(String json) {
    System.out.println("Content-type: application/json\n\n");
    System.out.println(json);
  }

  public static int getInt(String query, String key) {
    Map<String, String> map = parseQueryParamsString(query);
    if (!map.containsKey(key)) {
      throw new ValidationException("no %s parameter provided".formatted(key));
    }
    String value = map.get(key);
    try {
      return Integer.parseInt(value);
    } catch (NumberFormatException e) {
      throw new ValidationException("key %s is not an int: %s".formatted(key, value));
    }
  }

  public static float getFloat(String query, String key) {
    Map<String, String> map = parseQueryParamsString(query);
    if (!map.containsKey(key)) {
      throw new ValidationException("no %s parameter provided".formatted(key));
    }
    String value = map.get(key);
    try {
      return Float.parseFloat(value);
    } catch (NumberFormatException e) {
      throw new ValidationException("key %s is not a float: %s".formatted(key, value));
    }
  }
}
