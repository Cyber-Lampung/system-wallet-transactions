create table RiwayatTopUp (
    riwayat_id varchar(100),
    wallet_id varchar(100),
    type_payment VARCHAR(10),
    user_id varchar(100),
    riwayat_topup bigint,
    topup_time datetime default current_timestamp,
        primary key(riwayat_id),
        foreign key(wallet_id) references WalletAccount(wallet_id),
        foreign key(user_id) references Users(user_id)
)