from dataclasses import dataclass

@dataclass
class Asset:

    asset_id: int
    symbol: str
    sector: str
    asset_type: str