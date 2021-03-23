## Creating tables

CREATE TABLE products (
    _id VARCHAR(10) PRIMARY KEY, 
    price FLOAT,
    stock INT, 
    created_at VARCHAR(10), 
    last_updated VARCHAR(10), 
    user_updated VARCHAR(10)
); 

CREATE TABLE products_infos (
    _id VARCHAR(10) PRIMARY KEY, 
    name VARCHAR(255), 
    description TEXT, 
    volume FLOAT, 
    weight FLOAT, 
    brand VARCHAR(255), 
    model VARCHAR(255)
);

CREATE TABLE users (
    uid SERIAL,
    username VARCHAR(10) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    is_admin INT,
    PRIMARY KEY (uid)
);