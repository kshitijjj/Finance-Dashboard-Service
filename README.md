FINANCE DASHBOARD SYSTEM  

Tech Stack -  Node.js , Express.js , MongoDB 

. Built a full stack REST API based finance dashboard system with role-based access where employees can only view the dashboard, finance department personnel can access financial records, and all operations are exclusively managed by the admin.

. Implemented a smart authentication flow where new users receive an OTP on their email for verification and then set their password, while returning users are directly authenticated via email and password — secured end to end using JWT tokens.

. Implemented Role-Based Access Control using user email as the identifier, ensuring each user gets permissions and access levels according to their assigned role across employee, finance and admin levels.

. Implemented a scalable backend architecture using Node.js, Express.js following a structured Routes - Controller - Service pattern, keeping the codebase modular, maintainable and ready for future scalability.

. Integrated Brevo as the email service provider to handle OTP delivery for new user email verification, enabling a seamless and secure onboarding flow.

. Implemented caching mechanisms to reduce redundant database calls, significantly improving API response times across all endpoints.

. Implemented pagination across data-heavy endpoints to limit the amount of data returned per request, improving both performance and usability for large datasets.

. Utilized AI tools for building API documentation, improving logic, debugging errors and implementing validation across the application.


Live - https://finance-dashboard-service.onrender.com/

API Documentation - https://documenter.getpostman.com/view/38959583/2sBXiqEp7N
