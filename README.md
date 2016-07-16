# Dasher-Toggle

Dasher-Toggle is a very simple adaptation of Dasher designed to toggle between multiple actions for HTTP requests.
This is simply a state that changes on each button press dictating that the next state will act differently.
For setup instructions, see the original dasher. The example in this fork includes an updated secondary and tertiary action field.
Non-toggle actions still work as expected, and cases where a second but no third action are specified work as well.
Expanding this to work with even more states is trivial. The goal here was up to 3 states for an off/dim/bright configuration.

Inspiration for this fork is the limitations of Wink shortcuts and their integration into IFTTT.
