erDiagram
    User {
        Int id PK
        String email "UNIQUE"
        String firstName
        String lastName
        DateTime createdAt
        DateTime updatedAt
    }
    UserPreference {
        Int id PK
        Int user_id FK
        Boolean receiveEmail
        DateTime createdAt
        DateTime updatedAt
    }
    Product {
        Int id PK
        String name
        String description
        String category
        Float price
        Int stock
        DateTime createdAt
        DateTime updatedAt
    }
    Order {
        Int id PK
        Int user_id FK
        Int product_id FK
        String status
        DateTime createdAt
        DateTime updatedAt
    }

    User ||--|| UserPreference : "회원가입"
    User ||--o{ Order : "주문시"
    Order }o--o{ Product : "주문시"