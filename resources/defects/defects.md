# Defects found while testing Benefits Dashboard

#### DF-001

### Sumary

Benefits Dashboard - Switched first/last name

### Sumary

FE

### Description

Benefits Dashboard has incorect mapping for first and last name.
Values in API are correctly places, but FE is displying them incorectly.

###### Steps to reproduce:

1. Log in to FE
2. On the "Benefits Dashboard" page, click the "Add Employee" button
3. Input any Employee First Name, Last Name & Dependent information.
4. Click the "Submit" button
5. First and Last name are switched

###### Screenshot:

![Preview](../images/001.png)
![Preview](../images/002.png)

### Severity

Hight


#### DF-002

### Sumary

Benefits Dashboard - Login page - invalid credentials

### Type
BE

### Description

Login page for Benefits Dashboard throws HTTP error 405 (Method Not Allowed) after inserting invalid credentails. 
I would expect error message and an option to try again.
It looks like that redirectURL is missing ("_error": "net::ERR_HTTP_RESPONSE_CODE_FAILURE").
If I insert correct username and incorect password, then I get error message. It is potencial vurneability for attacker to get valid usernames at current state.

<       "redirectURL": "",
          "headersSize": -1,
          "bodySize": -1,
          "_transferSize": 438,
          "_error": "net::ERR_HTTP_RESPONSE_CODE_FAILURE",
          "_fetchedViaServiceWorker": false>

HAR: [loginPage.har](../data/loginPage.har)
Date: Sun, 29 Mar 2026 09:44:27 GMT

###### Steps to reproduce:

1. Go to login page
2. Insert invalid credentials and log in
3. HTTP error 405 Method Not Allowed

###### Screenshot:

![Preview](../images/003.png)
![Preview](../images/004.png)

### Severity

Hight


#### DF-003

### Sumary

Benefits Dashboard - Values max lenght

### Sumary

FE

### Description

Limits for First/Last name = max 50 character
Limit for Dependents = 0-32

There are missing error messages at FE Benefits Dashboard for invalid input for First/Last name and Dependents.
It can be confusing for user

HAR: [valueMaxLenght.har](../data/valueMaxLenght.har)
Date: Sun, 29 Mar 2026 11:41:35 GMT

###### Steps to reproduce:

1. Log in to FE
2. On the "Benefits Dashboard" page, click the "Add Employee" button
3. Input Employee First/Last Name longer then 50 characters
4. Input Dependents number lover than 0 or higher than 32
5. Click the "Submit" button
6. Nothing happens on FE

###### Screenshot:

![Preview](../images/005.png)

### Severity

Low-Medium