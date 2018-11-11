#include <eosiolib/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] adeos : public eosio::contract {
  using contract::contract;

  public:


      void start_epoch();

      void pay_dividends() {
        // get total EOS balance of contract
        symbol_type symbol(S(4,EOS));
        const auto& ac = accountstable.get(symbol.name());

        payout_index payouts(_self, _self);
        auto size = std::count(payout_index.cbegin(), payout_index.cend());
        uint64_t amtPerPerson = ac / size;
      }

      void deposit_funds() {
        auto transfer_data = unpack_action_data<st_transfer>();
        const auto from = transfer_data.from;

        // add payee
        payout_index payouts(_self, _self);
        payouts.emplace(_self, [&](auto& payout) {
          payout.payee = N(from);
        });
      }

      void bid_space();

      void claim_dividends();

    struct Space {
      uint64_t id;
      // image associated with ad
      string image_url;
      // the streamer showing the ad
      string streamer;
      // currency balance of the ad
      uint64_t balance;

      uint64_t primary_key() const { return id; }
    };

    void pay_dividends() {
      eosio::token
    }
       
  private: 
  
};
