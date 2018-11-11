

## Test Credentials

```
http://faucet.cryptokylin.io/create_account?adeosamigos1

{
"msg": "succeeded",
"keys": {
"active_key": {
"public": "EOS6vf9twM4hHrHRqkdFdyT5vJgrfree5xGStJPGeTMyEBmTpT7U7",
"private": "5JFbo1LE4N1aKzzbo4jjhptmw238kaUUya27Ba9UoxEgjqAX43f"
},
"owner_key": {
"public": "EOS7SMMB7mmrF867tN4oRHYESB9a2Fe6KAyjtADHqEiEdsht4YS2d",
"private": "5KJEPJmULDPGzwvos6BQzgr9Lnx4mwC7gPRnPSBgXSv5tDcrEpF"
}
},
"account": "adeosamigos1"
}
```

PW5JGAsbwLpvdXkKNNc8dcLAunxvsees35h912ffBsoE3PFxz8y2k


docker run --name eosio \
  --publish 7777:7777 \
  --publish 127.0.0.1:5555:5555 \
  --volume /Users/ian/proj/macalinao/adeos/contracts:/Users/ian/proj/macalinao/adeos/contracts \
  --detach \
  eosio/eos:v1.4.2 \
  /bin/bash -c \
  "keosd --http-server-address=0.0.0.0:5555 & exec nodeos -e -p eosio --plugin eosio::producer_plugin --plugin eosio::chain_api_plugin --plugin eosio::history_plugin --plugin eosio::history_api_plugin --plugin eosio::http_plugin -d /mnt/dev/data --config-dir /mnt/dev/config --http-server-address=0.0.0.0:7777 --access-control-allow-origin=* --contracts-console --http-validate-host=false --filter-on='*'"



EOS6Za5pU4cKqPzz72qxBX1KsWt9qFzYvQC5MMEcuwF9fDnHDNCqa
5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
