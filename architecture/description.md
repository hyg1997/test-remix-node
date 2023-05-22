The user interacts with the user interface, implemented using Next.js and React. This interface is served from a static server, handling the presentation of asset and liability data, enabling their modification, and displaying real-time calculated totals and net worth.

When the user performs an action requiring net worth recalculation, the user interface makes an HTTP request to Google Cloud Functions. These functions run in a Node.js environment with Express.js and TypeScript.

Google Cloud Functions are responsible for receiving HTTP requests, performing necessary calculations, and responding with results. Additionally, if the user switches the currency, the Google Cloud Function makes a call to an external currency conversion API to get the current exchange rate.

Finally, the user interface receives the response from the Google Cloud Function and updates the display with the new totals and the recalculated net worth.

**Assumptions and impact on design**: It's assumed that the external currency conversion API is always available and provides accurate exchange rates. If this were not the case, it could impact the accuracy of the application's calculations. To mitigate this, checking and validation mechanisms for the external API could be introduced.

**Improving Performance**: The application's performance could be improved by using techniques such as lazy loading of components in the frontend, optimizing server functions, and implementing caching techniques both on the frontend and server-side.

**Testing**: The application would be tested at multiple levels. On the frontend, tools like Jest and React Testing Library could be used for unit and integration tests. On the server, unit, integration, and load tests would be used to ensure that the server functions can handle the expected load.

**Security**: To make the service secure, techniques like input validation, protection against XSS and CSRF attacks, and using HTTPS for all communications could be implemented.

**Globalization**: To globalize the application, internationalization and localization would be implemented, allowing users to select their preferred language and number format.

**Resilience**: To make the application more resilient to errors, techniques like error handling and retrying requests in case of failure of the currency conversion API could be implemented.

**HTTP Caching**: HTTP caching could be leveraged to store responses of HTTP requests, both on the frontend and server, to improve performance and reduce load on the server and the currency conversion API.


*Update

For cache improvements, moved to Node.js server