create table WalletAccount (
    wallet_id varchar(100),
    user_id varchar(100),
    balance bigint,
    created datetime default CURRENT_TIMESTAMP,
    PRIMARY KEY (wallet_id),
    FOREIGN KEY(user_id) REFERENCES Users(user_id)
)