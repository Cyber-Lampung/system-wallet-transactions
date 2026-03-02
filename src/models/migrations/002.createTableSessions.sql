create table Sessions (
    user_id varchar(100),
    refreshToken varchar(100),
    created datetime default CURRENT_TIMESTAMP,
    expires datetime,
    PRIMARY KEY(refreshToken),
    FOREIGN KEY(user_id) REFERENCES Users(user_id)
)