create table Users (
    user_id varchar(100),
    email varchar(100),
    username varchar(100),
    password varchar(100),
    role VARCHAR(10),
    created datetime default CURRENT_TIMESTAMP,
    PRIMARY KEY(email),
    INDEX(user_id)
)