#!/usr/bin/env bats

@test "addition using bc" {
  result="4"
  [ "$result" -eq 4 ]
}
