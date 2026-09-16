Feature: Ecommerce Validation

    @regression
    Scenario: Automation of order processing system
    Given The username "standard_user" and password "secret_sauce" and click the Login button
    When The dashboard is displayed and the product "Sauce Labs Backpack" is added to the cart
    Then We can see our cart details and click on the checkout button
    When The Shipping details are entered and the Continue button is pressed
    Then We can see the product summary
    When We click on the Finish button
    Then The order is placed and we get the message: Thank you for your order!