# C4

```dgmo
c4 Internet Banking System

Customer is a person description: A customer of the bank

Internet Banking is a system description: Allows customers to view accounts and make payments
  -Delivers content to [HTTPS]-> Customer
  -Sends emails using [SMTP]-> Email

  containers
    Web App is a container description: SPA for banking features, tech: React
      -Makes API calls [JSON/HTTPS]-> API

    API is a container description: JSON/HTTPS API backend, tech: Node.js
      -Reads from and writes to [SQL/TCP]-> Database

    Database is a container description: Stores account data, tech: PostgreSQL

Email is a system description: Sendgrid email delivery
  ~Sends emails to~> Customer

deployment
  Vercel is a cloud
    container Web App
  Railway
    container API
  Neon is a database
    container Database
```

## Overview

C4 diagrams model software architecture at multiple zoom levels, following the [C4 model](https://c4model.com). Define people, systems, containers, and components — then drill down from context to detail. Relationships use the same arrow syntax as sequence diagrams.

The diagram starts at the **Context** level (people + systems). Click a system to drill into its **Containers**, then click a container to see its **Components**.

## Syntax

```
c4 Diagram Title

Name is a person description: ...
Name is a system description: ...
  -label [technology]-> Target
  ~async label~> Target

  containers
    Name is a container tech: ..., description: ...

      components
        Name is a component tech: ..., description: ...
```

## Element Types

| Type        | Description                     | Example                         |
| ----------- | ------------------------------- | ------------------------------- |
| `person`    | User or actor                   | `Customer is a person`          |
| `system`    | Top-level software system       | `Banking is a system`           |
| `container` | Runtime unit within a system    | `API is a container`            |
| `component` | Logical part within a container | `AuthController is a component` |

Elements are declared with a name followed by `is a <type>`. Add metadata after the type:

```
Analytics Platform is a system description: Multi-tenant analytics, tech: Node.js
```

## Shapes

Shapes can be inferred from the element's technology or name, or declared explicitly:

```
Database is a container is a database
Cache is a container is a cache
Event Bus is a container is a queue
AWS is a system is a cloud
Stripe is a system is an external
```

| Shape      | Inferred from                                             |
| ---------- | --------------------------------------------------------- |
| `database` | `tech: PostgreSQL`, `tech: MySQL`, names ending in `DB`   |
| `cache`    | `tech: Redis`, `tech: Memcache`, names containing `Cache` |
| `queue`    | `tech: RabbitMQ`, `tech: Kafka`, names containing `Queue` |
| `cloud`    | Explicit `is a cloud` only                                |
| `external` | Explicit `is an external` only                            |

## Metadata

Key-value pairs on the same line, or indented below the element:

```
API Gateway is a container tech: Node.js, team: Platform
  description: REST API serving all frontends
```

Or fully inline:

```
API Gateway is a container tech: Node.js, team: Platform, description: REST API
```

## Relationships

### Arrow Types

| Arrow | Meaning                 | Example                  |
| ----- | ----------------------- | ------------------------ |
| `->`  | Synchronous             | `-Makes API calls-> API` |
| `~>`  | Async / fire-and-forget | `~Sends events~> Queue`  |

For bidirectional relationships, use two separate lines:

```
API -Makes API calls-> Database
Database -Returns results-> API
```

### Labeled Relationships

Place the label inside the arrow. Add `[technology]` to annotate the protocol:

```
-Makes API calls [JSON/HTTPS]-> API
-Reads from and writes to [SQL/TCP]-> Database
~Submits analytics queries [AMQP]~> Query Engine
```

### Arrow-Label Syntax

Labels can also be placed inside the arrow:

```
-Makes API calls [JSON/HTTPS]-> API
~Sends events [AMQP]~> Queue
```

## Hierarchy

Systems contain containers (via `containers`), containers contain components (via `components`). Indentation defines the hierarchy:

```
Banking is a system
  containers
    Web App is a container
    API is a container
      components
        AuthController is a component
        PaymentService is a component
```

At the **Context** level, container-level relationships are automatically rolled up to their parent system.

## Groups

Organize containers or components into visual boundaries:

```
containers
  [Frontend]
    Dashboard is a container tech: React
    Admin Console is a container tech: React

  [Backend]
    API Gateway is a container tech: Node.js
    Query Engine is a container tech: Node.js

  [Data]
    Database is a container tech: PostgreSQL
    Cache is a container is a cache tech: Redis
```

## Tag Groups

Color-code elements by technology, team, or any custom category:

```
tag Technology as tech
  React blue
  Node.js green
  PostgreSQL purple
  Redis red

tag Team as t
  Product blue default
  Data orange
  Infrastructure teal
```

Then reference tags in metadata: `API is a container tech: Node.js, t: Product`.

## Deployment

Map containers to infrastructure with the `deployment` section:

```
deployment
  AWS us-east-1 is a cloud
    ECS Cluster
      container API
      container Worker
    RDS is a database
      container Database
    ElastiCache is a cache
      container Cache
```

- Nest deployment nodes to any depth
- Use `container Name` to reference a defined container
- Shapes (`is a database`, `is a cloud`) work on deployment nodes too

## Comments

```
// This line is ignored by the parser
```

## Complete Example

```dgmo
c4 SaaS Analytics Platform

tag Technology as tech
  React blue
  Node.js green
  PostgreSQL purple
  Redis red

tag Team as t
  Product blue default
  Data orange
  Infrastructure teal

End User is a person description: Views dashboards and creates reports
Account Admin is a person description: Manages workspace settings and members

Analytics Platform is a system description: Multi-tenant analytics and reporting
  -Serves dashboards to [HTTPS]-> End User
  -Provides admin console to [HTTPS]-> Account Admin
  ~Sends scheduled reports via [SMTP]~> Email Service

  containers
    [Frontend]
      Dashboard App is a container tech: React, t: Product
        description: Interactive data visualization SPA
        -Fetches data from [JSON/HTTPS]-> API Gateway

      Admin Console is a container tech: React, t: Product
        description: Workspace and user management
        -Manages settings via [JSON/HTTPS]-> API Gateway

    [Backend]
      API Gateway is a container tech: Node.js, t: Product
        description: REST API serving all frontends
        -Reads/writes user data [SQL/TCP]-> App Database
        -Reads/writes sessions [TCP]-> Cache
        ~Submits analytics queries [AMQP]~> Query Engine

      Query Engine is a container tech: Node.js, t: Data
        description: Processes analytics queries asynchronously
        -Runs queries against [SQL/TCP]-> Data Warehouse
        ~Publishes results [AMQP]~> Event Bus

    [Data]
      App Database is a container tech: PostgreSQL, t: Product
        description: Users, workspaces, and dashboard configs

      Data Warehouse is a container tech: PostgreSQL, t: Data
        description: Aggregated analytics data

      Cache is a container is a cache tech: Redis, t: Infrastructure
        description: Session store and rate limiter

      Event Bus is a container tech: RabbitMQ, t: Infrastructure
        description: Async messaging backbone

Email Service is a system description: Transactional email delivery
  ~Delivers report emails to~> End User

deployment
  GCP us-central1 is a cloud
    Cloud Run — Frontend
      container Dashboard App
      container Admin Console
    Cloud Run — Backend
      container API Gateway
      container Query Engine
    Cloud SQL is a database
      container App Database
      container Data Warehouse
    Memorystore is a cache
      container Cache
    Cloud Pub/Sub
      container Event Bus
```
