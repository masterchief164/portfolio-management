from dataclasses import dataclass


@dataclass
class Holding:
    symbol: str
    quantity: int
    name: str
    value: float = 0.0
    price: float = 0.0
