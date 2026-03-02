create table RsaPrivateKey (
    RsaPrivateKey_id varchar(100),
    user_id varchar(100),
    RsaPrivateKey TEXT,
    created datetime default current_timestamp,

    primary key(RsaPrivateKey_id),
    foreign key(user_id) references Users(user_id)
)