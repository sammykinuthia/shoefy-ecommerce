USE Shoefy;
GO

CREATE OR ALTER PROC uspGetProducts AS
BEGIN
    SELECT * FROM products WHERE is_sold = 0
END;
GO

CREATE OR ALTER PROC uspGetProduct(@id VARCHAR(200)) AS
BEGIN
    SELECT * FROM products WHERE id=@id 
END;
GO

CREATE OR ALTER PROC uspGetProductsByCategory(@category_id VARCHAR(200)) AS
BEGIN
    SELECT * FROM products WHERE category=@category_id
END;
GO

CREATE OR ALTER PROC uspCreateProduct(@user_id VARCHAR(200), @id VARCHAR(200), @name VARCHAR(200), @image VARCHAR(200), @description VARCHAR(MAX),@price VARCHAR(200), @category_id VARCHAR(200)) AS
BEGIN
    INSERT INTO products(id,name, category, [image],[description],price,user_id)
    VALUES(@id,@name,@category_id,@image,@description,@price,@user_id)
END;
GO


CREATE OR ALTER PROC uspDeleteProduct(@id VARCHAR(200)) AS
BEGIN
    DELETE FROM products WHERE id=@id
END;
GO

-- carts

CREATE OR ALTER PROC uspAddItemToCart(@user_id VARCHAR(200), @product_id VARCHAR(200)) AS
BEGIN
    INSERT INTO carts(user_id,product_id) VALUES(@user_id,@product_id);
    UPDATE products SET is_sold = 1 WHERE id=@product_id;
END;
GO

CREATE OR ALTER PROC uspRemoveItemFromCart(@user_id VARCHAR(200), @product_id VARCHAR(200)) AS
BEGIN
    DELETE FROM carts WHERE user_id=@user_id and product_id=@product_id;
    UPDATE products SET is_sold = 0 WHERE id=@product_id;
END;
GO

CREATE OR ALTER PROC uspGetUserCartItems(@user_id VARCHAR(200)) AS
BEGIN
    SELECT * FROM carts c
    INNER JOIN products p ON c.product_id = p.id
    WHERE c.user_id=@user_id
END;
GO

-- categories
CREATE OR ALTER PROC uspGetCategories AS
BEGIN
    SELECT * FROM categories
END;
GO


CREATE OR ALTER PROC uspGetCategory(@id VARCHAR(200)) AS
BEGIN
    SELECT * FROM categories WHERE id=@id
END;
GO


CREATE OR ALTER PROC uspCreateCategory(@id VARCHAR(200), @name VARCHAR(200)) AS
BEGIN
    INSERT INTO categories (id, name) VALUES(@id, @name)
END;
GO



