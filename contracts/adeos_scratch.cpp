#include <eosiolib/eosio.hpp>

using namespace eosio;
using namespace std;

class [[eosio::contract]] adeos : public eosio::contract {
  public:
    using contract::contract;

    [[eosio::action]]
    void setimage(name space, string image_url) {
      space_index spaces(_code, _code.value);
      spaces.emplace(space, [&]( auto& row ) {
        row.key = space;
        row.image_url = image_url;
      });
    }

    [[eosio::action]]
    void paydividends() {
      // get total EOS balance of contract
      accounts accountstable("eosio.token"_n, _code.value);
      symbol coresymbol(symbol_code("EOS"), 4);
      const auto& ac = accountstable.get(coresymbol.code());

      // compute payout per person
      payout_index payouts(_self, _self);

      for (auto itr = payouts.begin(); itr != payouts.end(); itr++) {

        auto size = std::count(payout_index.cbegin(), payout_index.cend());
        auto amtPerPerson = ac.balance / size;
   

         action(
        permission_level{ _code, N(active) },
        N(eosio.token), N(transfer),
        std::make_tuple(_code, itr->payee, amtPerPerson, std::string(""))
     ).send();
      }
    }

    [[eosio::action]]
    void depositfunds() {
      auto transfer_data = unpack_action_data<st_transfer>();
      const auto from = transfer_data.from;

      // add payee
      payout_index payouts(_self, _self);
      payouts.emplace(_self, [&](auto& payout) {
        payout.payee = N(from);
      });
    }


  private: 
      struct payout {
        name payee;
      }
    typedef eosio::multi_index< N(payout), payout > payout_index;

    struct account {
      asset    balance;
      uint64_t primary_key()const { return balance.symbol.code(); }
    };
    typedef eosio::multi_index<"accounts"_n, account> accounts;

    struct [[eosio::table]] space {
      name key;
      string image_url;
      uint64_t primary_key() const { return key.value; }
    };
    typedef eosio::multi_index<"space"_n, space> space_index;

  
};

EOSIO_DISPATCH( adeos, (setimage)(paydividends)(depositfunds))
