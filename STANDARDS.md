# Gatewoop - Standards

The fields are as follows:
- Responibilities
- Parameter casings
- Directory structure
- Sub-classes
- Scope
- Wiring
---
## Repositories
#### Responsibility
Only for accessing and manipulating data from external DBMS. Methods of a repository should return information packages about the data received or affected.

#### Parameter casing
All snake-cased and upper-cased.

#### Directory structure
All files sit in `src/{resource-name}/repositories`.

#### Sub-classes:
None.

#### Scope
Within resource module.

#### Wiring
Injected as provider in their respective resource modules.

---
## Services
#### Responsibility
Handles business logic, separated from persistence and request/response handling.

#### Parameter casing
All camel-cased.

#### Directory structure
All files sit in `src/{resource-name}/services`.

#### Sub-classes
If some methods of the service do not directly return to a controller, the service is split into `service.internal` and `service.external`, with the external sub-class containing methods used for responses.

#### Scope
Within resource module. Internal services may be global.

#### Wiring
Injected as provider in their respective resource modules. Internal services may be directly imported to another module.

---
## Controllers
#### Responsibility
Request/response handlers for a resource endpoint.

#### Parameter casing
All camel-cased.

#### Directory structure
All files sit in `src/{resource-aname}`

#### Sub-classes
None.

#### Scope
Within resource module.

#### Wiring
Injected as controller in their respective resource modules.

---
## Helpers 
#### Responsibility
Provides additional common methods to a class of a certain type by inheritance.

#### Parameter casing
All camel-cased.

#### Directory structure
All files sit in `src/helpers`

#### Sub-classes
Allowed, no rules.

#### Scope
Globally available.

#### Wiring
None. 

---
## Common providers
#### Responsibility
Provides interfaces and implementations of third-party services or libraries.

#### Parameter casing
No rules, dependent on third-party service/library.

#### Directory structure
All files sit in `src/common`. If implementation is verbose or complex, they may be located in `src/common/{name}`

#### Sub-classes
Allowed, no rules.

#### Scope
Globally available.

#### Wiring
Injected globally in the App Module

---
## Auth
#### Responsibility
Provides implementations of `passport-jwt` and `passport-local`, with logic and options for authentication.

#### Parameter casing
No rules, dependent on third-party library.

#### Directory structure
All files sit in `src/auth`.

#### Sub-classes
No rules, dependent on third-party library.

#### Scope
Globally available.

#### Wiring
Injected globally in the App Module.