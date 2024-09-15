package ru.lavrent.web.lab1;

import ru.lavrent.web.lab1.exceptions.ValidationException;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class Validator {
  public static Set<Float> rValues = new HashSet<>(Arrays.asList(1f, 1.5f, 2f, 2.5f, 3f));

  public static void validate(int x, int y, float r) {
    if (!(-3 <= x && x <= 3)) {
      throw new ValidationException("x must be between -3 and 3");
    }
    if (!(-5 <= y && y <= 5)) {
      throw new ValidationException("y must be between -5 and 5");
    }
    if (!rValues.contains(r)) {
      throw new ValidationException(
          "r must be in set " + rValues.stream()
              .map(String::valueOf)
              .collect(Collectors.joining(", ")));
    }
  }

  public static boolean checkHit(int x, int y, float r) {
    if (x <= 0 && y >= 0) {
      if (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r / 2, 2)) {
        return true;
      }
    }
    if ((0 <= x && x <= r) && (0 <= y && y <= r / 2)) {
      return true;
    }
    if (x >= 0 && y <= 0 && y >= x - r / 2) {
      return true;
    }
    return false;
  }
}
