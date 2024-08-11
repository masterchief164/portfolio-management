from dataclasses import dataclass


@dataclass
class Watchlist:
    wishlist_id: int
    user_id: int
    asset_symbol: str
    price_per_unit: float
    created_at: str
    name: str = None
    sector: str = None
    asset_type: str = None
    symbol: str = None
    price: float = 0.0
    tx_type: str = None
    fname: str = None
    lname: str = None
    age: int = None
    ispm: bool = False
