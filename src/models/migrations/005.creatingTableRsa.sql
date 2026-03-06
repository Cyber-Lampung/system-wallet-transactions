create table RsaPublicKeyVerif (
    RsaPublicKeyId varchar(100),
    user_id varchar(100),
    RsaPublicKey TEXT,
    created datetime default current_timestamp,

    primary key(RsaPublicKeyId),
    foreign key(user_id) references Users(user_id)
)