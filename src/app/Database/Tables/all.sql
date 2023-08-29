-- CREATE DATABASE Shoefy;
-- GO
USE Shoefy;
GO

CREATE TABLE users(
    id VARCHAR(200) PRIMARY KEY,
    username VARCHAR(200) UNIQUE NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    is_admin BIT DEFAULT 0,
);
GO
SELECT * FROM users
GO
CREATE TABLE categories(
    id VARCHAR(200) PRIMARY KEY,
    name VARCHAR(200) UNIQUE NOT NULL,
);
GO

CREATE TABLE products(
    id VARCHAR(200) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(200) NOT NULL,
    image VARCHAR(200) NOT NULL,
    description VARCHAR(MAX) NOT NULL,
    price FLOAT NOT NULL,
    user_id VARCHAR(200) NOT NULL,
    created_at DATE DEFAULT GETDATE(),
    is_sold BIT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category) REFERENCES categories(id)
);
GO


CREATE TABLE carts(
    product_id VARCHAR(200) NOT NULL,
    user_id    VARCHAR(200) NOT NULL,
    PRIMARY KEY(product_id, user_id),
    FOREIGN KEY(product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
    
);
GO
CREATE TABLE resetCode(
    user_id VARCHAR(200) NOT NULL,
    code VARCHAR(200) NOT NULL,
    is_sent BIT DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
GO
-- DROP TABLE resetCode
 SELECT * FROM resetCode