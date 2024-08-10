from dataclasses import dataclass


@dataclass
class Holding:
    asset_symbol: str
    quantity: int
    value: float
    name: str
    price: float = 0.0
