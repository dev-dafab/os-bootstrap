#!/usr/bin/env bats


obs_cmd="./build/"

@test "addition using bc" {
  result="4"
  [ "$result" -eq 4 ]
}
