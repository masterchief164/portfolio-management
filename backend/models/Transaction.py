from dataclasses import dataclass


@dataclass
class Transaction:
    tx_id: int
    pm_id: int
    user_id: int
    asset_symbol: str
    quantity: int
    price_per_unit: float
    tx_type: str
    value: float
    created_at: str
