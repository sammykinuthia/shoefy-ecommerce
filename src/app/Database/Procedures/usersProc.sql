USE Shoefy;
GO

CREATE OR ALTER PROC uspRegisterUser (@id VARCHAR(200), @username VARCHAR(200), @email VARCHAR(200), @password VARCHAR(200)) AS
BEGIN
    INSERT INTO users(id, username,email,[password])
    VALUES(@id,@username, @email,@password)
END;
GO

CREATE OR ALTER PROC uspGetUser (@email VARCHAR(200)) AS
BEGIN
    SELECT password, username, email, id from users WHERE email = @email
END;
GO


CREATE OR ALTER PROC uspSaveResetCode (@id VARCHAR(200), @code VARCHAR(200)) AS
BEGIN
    INSERT INTO resetCode(user_id, code) 
    VALUES(@id, @code)
END;
GO

-- SELECT * from resetCode

CREATE  OR ALTER PROC uspCheckVerificationCode(@user_id VARCHAR(200), @code VARCHAR(200)) AS
BEGIN
    SELECT * FROM resetCode
    WHERE code= @code AND user_id = @user_id
END;
GO

CREATE OR ALTER PROC uspChangePassword (@email VARCHAR(200), @password VARCHAR(200)) AS
BEGIN
    UPDATE users
    SET password = @password
    WHERE email = @email
END;
GO