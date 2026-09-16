Feature: Error in login validation

    @validation
    Scenario: Error Validation
    Given The wrong username "<username>" and password "<password>" and click the Login button
    Then Check the error message since incorrect username is provided

    Examples:
        | username      | password      |
        | standarduser  | secret_sauce  |