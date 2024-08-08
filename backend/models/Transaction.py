from dataclasses import dataclass
from datetime import datetime

@dataclass
class Transaction:
    tx_id: int
    pm_id: int
    user_id: int
    asset_symbol: str
    quantity: int
    price_per_unit: float
    tx_type: str
    created_at: datetime = datetime.now()
